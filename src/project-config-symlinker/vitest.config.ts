import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',

    // Use the test-specific TypeScript configuration
    typecheck: {
      tsconfig: './tsconfig.test.json'
    },

    // Test file patterns
    include: [
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],

    // Test setup
    setupFiles: ['./tests/setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'tests/setup.ts',
        'tests/fixtures/**',
        'scripts/**',
        'examples/**'
      ],
      // Coverage thresholds
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },

    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000
  },

  // Resolve aliases for testing
  resolve: {
    alias: {
      '@': './src',
      '@tests': './tests'
    }
  }
});