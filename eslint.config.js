import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * ESLint Flat Configuration
 * 
 * ESLint v9.x 의 새로운 설정 형식입니다.
 * 
 * 플러그인:
 * - @typescript-eslint: TypeScript 전용 규칙
 * - eslint-plugin-react-hooks: React Hooks 규칙
 * - eslint-plugin-react-refresh: Vite React Refresh 규칙
 * - eslint-plugin-import: import/export 정렬 및 검증
 * - eslint-plugin-unused-imports: 사용하지 않는 import 제거
 * - eslint-config-prettier: Prettier 와 충돌하는 규칙 비활성화
 * - eslint-plugin-prettier: Prettier 를 ESLint 규칙으로 실행
 */
export default defineConfig([
  // 전역 무시 설정
  globalIgnores([
    'dist',
    'build',
    'node_modules',
    '*.min.js',
    '*.config.js',
    '*.config.ts',
    'coverage',
  ]),
  
  // 기본 JavaScript 설정
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  
  // TypeScript 설정
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettier,
    ],
    plugins: {
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      // Prettier 연동
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      
      // 사용하지 않는 import 자동 제거
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_|^React$',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      
      // Import 정렬
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      
      // TypeScript 권장 규칙
      '@typescript-eslint/no-unused-vars': 'off', // unused-imports 로 대체
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      
      // React Hooks
      'react-hooks/exhaustive-deps': 'warn',
      
      // Console 로그 제한 (에러/경고는 허용)
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      
      // React Compiler 규칙은 warning 으로만 설정 (에러로 처리하지 않음)
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  
  // 설정 파일은 최소 규칙만 적용
  {
    files: ['*.config.js', '*.config.ts'],
    extends: [eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
