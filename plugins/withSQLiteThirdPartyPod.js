const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const NEW_KEY = "expo.updates.useThirdPartySQLitePod";
const NEW_VALUE = "true";

const withSQLiteThirdPartyPod = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const filePath = path.join(
        config.modRequest.projectRoot,
        "ios",
        "Podfile.properties.json",
      );

      if (!fs.existsSync(filePath)) {
        console.warn("⚠️ Podfile.properties.json not found.");
        return config;
      }

      const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

      if (json[NEW_KEY] === NEW_VALUE) {
        console.log(
          "ℹ️ [withSQLiteThirdPartyPod] Key already exists. Skipping.",
        );
        return config;
      }

      json[NEW_KEY] = NEW_VALUE;

      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(
        "✅ [withSQLiteThirdPartyPod] Added expo.updates.useThirdPartySQLitePod to Podfile.properties.json",
      );

      return config;
    },
  ]);
};

module.exports = withSQLiteThirdPartyPod;
