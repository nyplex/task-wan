import { PowerSyncDatabase } from "@powersync/react-native";
import { AppSchema, drizzleSchema } from "./AppSchema";
import { Connector } from "./Connector";
import { OPSqliteOpenFactory } from "@powersync/op-sqlite";
import { wrapPowerSyncWithDrizzle } from "@powersync/drizzle-driver";

export const factory = new OPSqliteOpenFactory({
  dbFilename: "sqlite.db",
});

export const powersync = new PowerSyncDatabase({
  schema: AppSchema,
  database: factory,
  retryDelayMs: 1000, // Delay between retries after an error
  // logger: {}
});

export const db = wrapPowerSyncWithDrizzle(powersync, {
  schema: drizzleSchema,
});

export const setupPowerSync = async (token: string) => {
  // Uses the backend connector that will be created in the next section
  const connector = new Connector(token);
  await powersync.connect(connector);

  console.log("POWERSYNC CONNECTED");

  const start = Date.now();
  const timeout = 5000; // ms

  // Wait for PowerSync to be ready
  while (!powersync.ready && Date.now() - start < timeout) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return powersync.ready;
};
