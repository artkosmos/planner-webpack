import type { Config } from 'jest';

process.env.TZ = 'UTC';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|scss|png|img|jpg|jpeg)$': 'jest-transform-stub',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/__mocks__/i18n-jest.ts'],
};

export default config;
