const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;

// Apply withNativeWind first, then withStorybook
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });
const finalConfig = withStorybook(nativeWindConfig);

module.exports = finalConfig;
