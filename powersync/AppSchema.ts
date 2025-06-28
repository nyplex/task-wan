import { column, Schema, Table } from "@powersync/react-native";

const profiles = new Table({
  id: column.text,
  created_at: column.text,
  username: column.text,
  profession: column.text,
  dob: column.text,
  avatar: column.text,
  email: column.text,
});

export const AppSchema = new Schema({
  profiles,
});

// For types
export type Database = (typeof AppSchema)["types"];
export type ProfileRecord = Database["profiles"];
