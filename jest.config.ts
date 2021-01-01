import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/config/**',
    '!src/**/*.router.ts',
    '!src/**/*.validation.ts',
    '!src/**/*.entity.ts',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
