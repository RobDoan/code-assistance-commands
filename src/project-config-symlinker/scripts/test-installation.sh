#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test configuration
TEST_DIR="/tmp/symlinker-test-$$"
PACKAGE_DIR="$(pwd)"
PACKAGE_NAME="project-config-symlinker"

echo -e "${YELLOW}🧪 Testing Project Config Symlinker Installation${NC}"
echo "=========================================="
echo "Package: $PACKAGE_NAME"
echo "Test Directory: $TEST_DIR"
echo ""

# Cleanup function
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up test environment...${NC}"
    rm -rf "$TEST_DIR" || true
    npm uninstall -g "$PACKAGE_NAME" 2>/dev/null || true
}

# Set up cleanup trap
trap cleanup EXIT

# Create test environment
echo -e "${YELLOW}📁 Setting up test environment...${NC}"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Test 1: Build the package
echo -e "${YELLOW}🔨 Test 1: Building package...${NC}"
cd "$PACKAGE_DIR"
npm run build

if [ ! -f "dist/cli.js" ]; then
    echo -e "${RED}❌ Build failed - CLI binary not found${NC}"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ Build failed - Library entry not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Package built successfully${NC}"

# Test 2: Pack the package
echo -e "${YELLOW}📦 Test 2: Packing package...${NC}"
TARBALL=$(npm pack --silent)

if [ ! -f "$TARBALL" ]; then
    echo -e "${RED}❌ Package packing failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Package packed: $TARBALL${NC}"

# Test 3: Install globally from tarball
echo -e "${YELLOW}🌍 Test 3: Installing package globally...${NC}"
npm install -g "$PACKAGE_DIR/$TARBALL"

# Verify global installation
if ! command -v symlinker &> /dev/null; then
    echo -e "${RED}❌ Global installation failed - 'symlinker' command not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Package installed globally${NC}"

# Test 4: Basic CLI functionality
echo -e "${YELLOW}🔧 Test 4: Testing CLI functionality...${NC}"
cd "$TEST_DIR"

# Test help command
if ! symlinker --help > /dev/null 2>&1; then
    echo -e "${RED}❌ CLI help command failed${NC}"
    exit 1
fi

# Test version command  
if ! symlinker --version > /dev/null 2>&1; then
    echo -e "${RED}❌ CLI version command failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ CLI commands working${NC}"

# Test 5: Create test scenario
echo -e "${YELLOW}🏗️ Test 5: Creating test scenario...${NC}"

# Create source configuration structure
mkdir -p source/{.vscode,configs}
echo '{"test": true}' > source/.vscode/settings.json
echo 'module.exports = {};' > source/configs/eslint.js
echo 'print_width = 80' > source/configs/.prettierrc

# Create test configuration file
cat > setup-config.json << 'EOF'
{
  "configurations": [
    {
      "original": "source/.vscode",
      "target": ".vscode",
      "type": "folder"
    },
    {
      "original": "source/configs",
      "target": "configs",
      "type": "files"
    }
  ]
}
EOF

# Create target directory
mkdir -p target

echo -e "${GREEN}✅ Test scenario created${NC}"

# Test 6: Dry run functionality
echo -e "${YELLOW}🔍 Test 6: Testing dry-run mode...${NC}"
if ! symlinker target --dry-run --verbose > /dev/null 2>&1; then
    echo -e "${RED}❌ Dry-run mode failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dry-run mode working${NC}"

# Test 7: Actual symlink creation
echo -e "${YELLOW}🔗 Test 7: Testing symlink creation...${NC}"
if ! symlinker target --force > /dev/null 2>&1; then
    echo -e "${RED}❌ Symlink creation failed${NC}"
    exit 1
fi

# Verify symlinks were created
if [ ! -L "target/.vscode" ]; then
    echo -e "${RED}❌ Folder symlink not created${NC}"
    exit 1
fi

if [ ! -L "target/configs/eslint.js" ]; then
    echo -e "${RED}❌ File symlink not created${NC}"
    exit 1
fi

if [ ! -L "target/configs/.prettierrc" ]; then
    echo -e "${RED}❌ Hidden file symlink not created${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Symlinks created successfully${NC}"

# Test 8: Verify symlink targets
echo -e "${YELLOW}🎯 Test 8: Verifying symlink targets...${NC}"

TARGET_VSCODE=$(readlink target/.vscode)
TARGET_ESLINT=$(readlink target/configs/eslint.js)

if [[ ! "$TARGET_VSCODE" == *"source/.vscode" ]]; then
    echo -e "${RED}❌ Folder symlink target incorrect: $TARGET_VSCODE${NC}"
    exit 1
fi

if [[ ! "$TARGET_ESLINT" == *"source/configs/eslint.js" ]]; then
    echo -e "${RED}❌ File symlink target incorrect: $TARGET_ESLINT${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Symlink targets verified${NC}"

# Test 9: Test custom config file
echo -e "${YELLOW}⚙️ Test 9: Testing custom config file...${NC}"

cat > custom-config.json << 'EOF'
{
  "configurations": [
    {
      "original": "source/configs/.prettierrc",
      "target": ".prettierrc",
      "type": "files"
    }
  ]
}
EOF

mkdir -p target2
if ! symlinker target2 --config custom-config.json --force > /dev/null 2>&1; then
    echo -e "${RED}❌ Custom config file test failed${NC}"
    exit 1
fi

if [ ! -L "target2/.prettierrc" ]; then
    echo -e "${RED}❌ Custom config symlink not created${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Custom config file working${NC}"

# Test 10: Error handling
echo -e "${YELLOW}🚨 Test 10: Testing error handling...${NC}"

# Test with non-existent target
if symlinker non-existent-target 2>/dev/null; then
    echo -e "${RED}❌ Error handling failed - should reject non-existent target${NC}"
    exit 1
fi

# Test with non-existent config file
if symlinker target --config non-existent-config.json 2>/dev/null; then
    echo -e "${RED}❌ Error handling failed - should reject non-existent config${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Error handling working${NC}"

echo ""
echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
echo "=========================================="
echo "✅ Package builds correctly"
echo "✅ Package installs globally" 
echo "✅ CLI commands functional"
echo "✅ Symlink creation working"
echo "✅ Configuration handling working"
echo "✅ Error handling working"
echo "✅ Ready for distribution!"