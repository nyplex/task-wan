import { column, Schema, Table } from "@powersync/react-native";

const users = new Table({
  id: column.text,
  avatar: column.text,
  profession: column.text,
  email: column.text,
  location: column.text,
  dob: column.text,
  username: column.text,
});

export const AppSchema = new Schema({
  users,
});

// For types
export type Database = (typeof AppSchema)["types"];
export type UserRecord = Database["users"];
