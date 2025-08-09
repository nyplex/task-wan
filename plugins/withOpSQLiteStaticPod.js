const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const TARGET_LINE = `podfile_properties = JSON.parse(File.read(File.join(__dir__, 'Podfile.properties.json'))) rescue {}`;

const PATCH = `
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if pod.name.eql?('op-sqlite')
      def pod.build_type
        Pod::BuildType.static_library
      end
    end
  end
end
`;

const withOpSQLiteStaticPod = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.projectRoot,
        "ios",
        "Podfile",
      );
      let contents = fs.readFileSync(podfilePath, "utf-8");

      if (!contents.includes("if pod.name.eql?('op-sqlite')")) {
        const lines = contents.split("\n");
        const targetLineIndex = lines.findIndex((line) =>
          line.includes(TARGET_LINE.trim()),
        );

        if (targetLineIndex !== -1) {
          lines.splice(targetLineIndex + 1, 0, PATCH.trim());
          fs.writeFileSync(podfilePath, lines.join("\n"));
          console.log(
            "✅ [withOpSQLiteStaticPod] Patched Podfile successfully.",
          );
        }
      } else {
        console.log(
          "ℹ️ [withOpSQLiteStaticPod] Podfile already contains patch. Skipping.",
        );
      }

      return config;
    },
  ]);
};

module.exports = withOpSQLiteStaticPod;
