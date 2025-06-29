import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'react-refresh': reactRefresh,
      prettier: prettier, 
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname, 
      },
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
    },
    settings: {
      react: {
        version: 'detect', 
      },
      'import/resolver': {
        typescript: true, 
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
    rules: {
      'react/jsx-uses-react': 'off', 
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-props-no-spreading': 'off', 
      'react/require-default-props': 'off', 

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/anchor-is-valid': 'off', 

      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off', 

      '@typescript-eslint/explicit-module-boundary-types': 'off', 
      '@typescript-eslint/no-shadow': 'error',
      'no-shadow': 'off',

      'no-unused-vars': 'off', 
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'linebreak-style': 'off',
      'consistent-return': 'off', 

      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
])
