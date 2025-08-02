const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const LINE_TO_ADD = "expo.modules.updates.EXPO_UPDATES_USE_CUSTOM_SQLITE=true";

const withCustomSQLiteGradleProp = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const gradlePropsPath = path.join(
        config.modRequest.projectRoot,
        "android",
        "gradle.properties"
      );

      if (!fs.existsSync(gradlePropsPath)) {
        console.warn("⚠️ gradle.properties not found.");
        return config;
      }

      const contents = fs.readFileSync(gradlePropsPath, "utf8");

      if (contents.includes(LINE_TO_ADD)) {
        console.log("ℹ️ [withCustomSQLiteGradleProp] Line already exists. Skipping.");
        return config;
      }

      const updated = contents.trimEnd() + `\n${LINE_TO_ADD}\n`;
      fs.writeFileSync(gradlePropsPath, updated);
      console.log("✅ [withCustomSQLiteGradleProp] Patched gradle.properties");

      return config;
    },
  ]);
};

module.exports = withCustomSQLiteGradleProp;
