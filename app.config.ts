const withOpSQLiteStaticPod = require("./plugins/withOpSQLiteStaticPod");
const withSQLiteThirdPartyPod = require("./plugins/withSQLiteThirdPartyPod");
const withCustomSQLiteGradleProp = require("./plugins/withCustomSQLiteGradleProp");
const withFirebaseNotificationMetaFix = require("./plugins/withFirebaseNotificationMetaFix");

const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === "development";
const IS_PREVIEW = process.env.EXPO_PUBLIC_APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.nyplex.taskwan.dev";
  }

  if (IS_PREVIEW) {
    return "com.nyplex.taskwan.preview";
  }

  return "com.nyplex.taskwan";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Task Wan (Dev)";
  }

  if (IS_PREVIEW) {
    return "Task Wan (Preview)";
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
    googleServicesFile: process.env.GOOGLE_SERVICES,
  },
  plugins: [
    ...config.plugins,
    withOpSQLiteStaticPod,
    withSQLiteThirdPartyPod,
    withCustomSQLiteGradleProp,
    withFirebaseNotificationMetaFix,
  ],
});
