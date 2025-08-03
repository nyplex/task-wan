import {
  DrizzleAppSchema,
  type DrizzleTableWithPowerSyncOptions,
} from "@powersync/drizzle-driver";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// const users = new Table({
//   id: column.text,
//   avatar: column.text,
//   profession: column.text,
//   email: column.text,
//   location: column.text,
//   dob: column.text,
//   username: column.text,
// });

// export const AppSchema = new Schema({
//   users,
// });

// Define a Drizzle table
const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  avatar: text("avatar"),
  profession: text("profession"),
  email: text("email"),
  location: text("location"),
  dob: text("dob"),
  username: text("username"),
});

export const drizzleSchema = {
  users,
};

const listsWithOptions: DrizzleTableWithPowerSyncOptions = {
  tableDefinition: users,
  options: { localOnly: true },
};

export const drizzleSchemaWithOptions = {
  lists: listsWithOptions,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);

// For types
export type Database = (typeof AppSchema)["types"];
export type UserRecord = Database["users"];
