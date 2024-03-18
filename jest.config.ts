import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|scss|png|img)$': 'jest-transform-stub',
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
