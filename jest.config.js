module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@gluestack-ui|@legendapp/motion|@reduxjs/toolkit|react-redux)",
  ],
  moduleNameMapper: {
    "^@powersync/drizzle-driver$": "<rootDir>/__mocks__/@powersync/drizzle-driver.ts",
    "^@powersync/op-sqlite$": "<rootDir>/__mocks__/@powersync/op-sqlite.js",
    // add more mappings as needed
  },
  // other config...
};
