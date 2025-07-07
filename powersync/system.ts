import { PowerSyncDatabase } from "@powersync/react-native";
import { AppSchema } from "./AppSchema";
import { Connector } from "./Connector";
import { OPSqliteOpenFactory } from "@powersync/op-sqlite";

const factory = new OPSqliteOpenFactory({
  dbFilename: "sqlite.db",
});

export const powersync = new PowerSyncDatabase({
  // The schema you defined in the previous step
  schema: AppSchema,
  // For other options see,
  // https://powersync-ja.github.io/powersync-js/web-sdk/globals#powersyncopenfactoryoptions
  database: factory,
});

export const setupPowerSync = async () => {
  // Uses the backend connector that will be created in the next section
  const connector = new Connector();
  powersync.connect(connector);
};
