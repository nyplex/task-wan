const withOpSQLiteStaticPod = require("./plugins/withOpSQLiteStaticPod");
const withSQLiteThirdPartyPod = require("./plugins/withSQLiteThirdPartyPod");
const withCustomSQLiteGradleProp = require("./plugins/withCustomSQLiteGradleProp");
const withFirebaseNotificationMetaFix = require("./plugins/withFirebaseNotificationMetaFix");

const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === "development";
const IS_PREVIEW = process.env.EXPO_PUBLIC_APP_VARIANT === "preview";
const IS_STAGING = process.env.EXPO_PUBLIC_APP_VARIANT === "staging";
const GOOGLE_SERVICES = IS_STAGING
  ? process.env.GOOGLE_SERVICES_STAGING
  : process.env.GOOGLE_SERVICES;

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.nyplex.taskwan.dev";
  }

  if (IS_PREVIEW && !IS_STAGING) {
    return "com.nyplex.taskwan.preview";
  }

  if (IS_STAGING) {
    return "com.nyplex.taskwan.staging";
  }

  return "com.nyplex.taskwan";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Task Wan (Dev)";
  }

  if (IS_PREVIEW && !IS_STAGING) {
    return "Task Wan (Preview)";
  }

  if (IS_STAGING) {
    return "Task Wan (Staging)";
  }

  return "Task Wan";
};

export default ({ config }: { config: any }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
    googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST,
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
    googleServicesFile: GOOGLE_SERVICES,
  },
  plugins: [
    ...config.plugins,
    withOpSQLiteStaticPod,
    withSQLiteThirdPartyPod,
    withCustomSQLiteGradleProp,
    withFirebaseNotificationMetaFix,
  ],
});
