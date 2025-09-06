#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PACKAGE_NAME="project-config-symlinker"
NODE_VERSION_REQUIRED="16"

echo -e "${BLUE}🚀 Project Config Symlinker - Build & Test Pipeline${NC}"
echo "=================================================="
echo "Package: $PACKAGE_NAME"
echo "Node.js Required: >= $NODE_VERSION_REQUIRED.0.0"
echo "Timestamp: $(date)"
echo ""

# Function to log steps
log_step() {
    echo -e "${YELLOW}📋 Step $1: $2${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Environment Check
log_step "1" "Checking Environment"

# Check Node.js version
if ! command_exists node; then
    log_error "Node.js is not installed"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "$NODE_VERSION_REQUIRED" ]; then
    log_error "Node.js version $NODE_VERSION_REQUIRED or higher is required. Current: $(node --version)"
    exit 1
fi

# Check npm
if ! command_exists npm; then
    log_error "npm is not installed"
    exit 1
fi

log_success "Environment check passed - Node.js $(node --version), npm $(npm --version)"

# Step 2: Install Dependencies
log_step "2" "Installing Dependencies"

if [ ! -d "node_modules" ]; then
    npm ci
else
    echo "Dependencies already installed, skipping..."
fi

log_success "Dependencies installed"

# Step 3: Type Checking
log_step "3" "Type Checking"

npm run typecheck

log_success "Type checking passed"

# Step 4: Build Project
log_step "4" "Building Project"

# Clean dist directory
if [ -d "dist" ]; then
    rm -rf dist
fi

npm run build

# Verify build outputs
if [ ! -f "dist/cli.js" ]; then
    log_error "CLI build failed - dist/cli.js not found"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    log_error "Library build failed - dist/index.js not found"
    exit 1
fi

# Check if CLI is executable
if [ ! -x "dist/cli.js" ]; then
    chmod +x dist/cli.js
fi

# Verify shebang
if ! head -1 dist/cli.js | grep -q "#!/usr/bin/env node"; then
    log_error "CLI missing shebang line"
    exit 1
fi

log_success "Build completed successfully"

# Step 5: Run Unit Tests
log_step "5" "Running Unit Tests"

if npm run test > /dev/null 2>&1; then
    log_success "Unit tests passed"
else
    log_error "Unit tests failed"
    echo "Running tests with output for debugging:"
    npm run test
    exit 1
fi

# Step 6: Run Package Tests
log_step "6" "Running Package Tests"

npm run test:package

log_success "Package tests passed"

# Step 7: Test CLI Functionality
log_step "7" "Testing CLI Functionality"

# Create temporary test directory
TEST_DIR="./test-cli-temp"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

(
    cd "$TEST_DIR"
    
    # Test help command
    if ! node ../dist/cli.js --help > /dev/null 2>&1; then
        log_error "CLI help command failed"
        exit 1
    fi
    
    # Test version command
    if ! node ../dist/cli.js --version > /dev/null 2>&1; then
        log_error "CLI version command failed"
        exit 1
    fi
    
    # Create test scenario
    mkdir -p source target
    echo '{"test": true}' > source/test.json
    
    cat > setup-config.json << 'EOF'
{
  "configurations": [
    {
      "original": "source/test.json",
      "target": "test.json",
      "type": "files"
    }
  ]
}
EOF
    
    # Test dry-run
    if ! node ../dist/cli.js target --dry-run > /dev/null 2>&1; then
        log_error "CLI dry-run failed"
        exit 1
    fi
    
    # Test actual execution
    if ! node ../dist/cli.js target --force > /dev/null 2>&1; then
        log_error "CLI execution failed"
        exit 1
    fi
    
    # Verify symlink was created
    if [ ! -L "target/test.json" ]; then
        log_error "Symlink not created"
        exit 1
    fi
)

# Cleanup
rm -rf "$TEST_DIR"

log_success "CLI functionality tests passed"

# Step 8: Validate Package Structure
log_step "8" "Validating Package Structure"

# Check required files exist
REQUIRED_FILES=("package.json" "README.md" "LICENSE" "CHANGELOG.md" "dist/cli.js" "dist/index.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        log_error "Required file missing: $file"
        exit 1
    fi
done

# Check examples directory
if [ ! -d "examples" ]; then
    log_error "Examples directory missing"
    exit 1
fi

# Check for example files
EXAMPLE_FILES=("examples/development-setup.json" "examples/ai-assistant-config.json" "examples/README.md")

for file in "${EXAMPLE_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        log_error "Required example file missing: $file"
        exit 1
    fi
done

log_success "Package structure validation passed"

# Step 9: Package Size Check
log_step "9" "Checking Package Size"

# Create tarball to check size
TARBALL=$(npm pack --silent)
SIZE=$(du -h "$TARBALL" | cut -f1)
SIZE_BYTES=$(wc -c < "$TARBALL")

# Remove tarball
rm "$TARBALL"

# Warn if package is too large (>5MB)
MAX_SIZE_BYTES=5242880  # 5MB in bytes
if [ "$SIZE_BYTES" -gt "$MAX_SIZE_BYTES" ]; then
    echo -e "${YELLOW}⚠️  Warning: Package size is large ($SIZE). Consider optimizing.${NC}"
else
    log_success "Package size check passed ($SIZE)"
fi

# Step 10: Security Check (Basic)
log_step "10" "Basic Security Check"

# Check for potential security issues in package.json
if grep -q "\"postinstall\"" package.json; then
    echo -e "${YELLOW}⚠️  Warning: postinstall script detected. Review for security.${NC}"
fi

# Check for suspicious files
SUSPICIOUS_PATTERNS=(".env" "id_rsa" "*.pem" "*.key")

for pattern in "${SUSPICIOUS_PATTERNS[@]}"; do
    if find . -name "$pattern" -not -path "./node_modules/*" | grep -q .; then
        echo -e "${YELLOW}⚠️  Warning: Potentially sensitive files found matching: $pattern${NC}"
    fi
done

log_success "Basic security check completed"

# Final Summary
echo ""
echo -e "${GREEN}🎉 BUILD & TEST PIPELINE COMPLETED SUCCESSFULLY!${NC}"
echo "=============================================="
echo "✅ Environment validated"
echo "✅ Dependencies installed"  
echo "✅ TypeScript compilation passed"
echo "✅ Build completed successfully"
echo "✅ Unit tests passed"
echo "✅ Package tests passed"
echo "✅ CLI functionality verified"
echo "✅ Package structure validated"
echo "✅ Size check completed ($SIZE)"
echo "✅ Security check completed"
echo ""
echo -e "${BLUE}📦 Package is ready for distribution!${NC}"
echo ""
echo "Next steps:"
echo "- Review CHANGELOG.md for release notes"
echo "- Update version with: npm version [major|minor|patch]"
echo "- Publish with: npm publish"
echo "- Create GitHub release with: gh release create"