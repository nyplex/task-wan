const { withAndroidManifest } = require("@expo/config-plugins");

const withFirebaseNotificationMetaFix = (config) => {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0];
    if (!application) {
      console.warn("⚠️ <application> tag not found in AndroidManifest.xml");
      return config;
    }

    if (!application["meta-data"]) {
      application["meta-data"] = [];
    }

    // Remove existing entries if they exist
    application["meta-data"] = application["meta-data"].filter((meta) => {
      const name = meta.$["android:name"];
      return ![
        "com.google.firebase.messaging.default_notification_channel_id",
        "com.google.firebase.messaging.default_notification_color",
      ].includes(name);
    });

    // Add new meta-data entries with tools:replace
    application["meta-data"].push(
      {
        $: {
          "android:name": "com.google.firebase.messaging.default_notification_channel_id",
          "android:value": "default",
          "tools:replace": "android:value",
        },
      },
      {
        $: {
          "android:name": "com.google.firebase.messaging.default_notification_color",
          "android:resource": "@color/notification_icon_color",
          "tools:replace": "android:resource",
        },
      }
    );

    console.log("✅ Replaced Firebase notification <meta-data> entries in AndroidManifest.xml");
    return config;
  });
};

module.exports = withFirebaseNotificationMetaFix;
