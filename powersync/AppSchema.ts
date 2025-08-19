import {
  DrizzleAppSchema,
  type DrizzleTableWithPowerSyncOptions,
} from "@powersync/drizzle-driver";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Define a Drizzle table
const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  avatar: text("avatar"),
  profession: text("profession"),
  email: text("email"),
  location: text("location"),
  dob: text("dob"),
  name: text("name"),
});

const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title"),
  description: text("description"),
  start_date: text("start_date"),
  end_date: text("end_date"),
  started_on: text("started_on"),
  completed_on: text("completed_on"),
  icon: text("icon"),
});

const subtasks = sqliteTable("subtasks", {
  id: integer("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  task_id: integer("task_id").references(() => tasks.id),
  title: text("title"),
  description: text("description"),
  start_date: text("start_date"),
  end_date: text("end_date"),
  completed_on: text("completed_on"),
});

const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  task_id: integer("task_id").references(() => tasks.id),
  subtask_id: integer("subtask_id").references(() => subtasks.id),
  title: text("title"),
  description: text("description"),
  icon: text("icon"),
  date: text("date"),
  read: integer("read").default(0),
});

export const drizzleSchema = {
  users,
  tasks,
  subtasks,
  notifications,
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
export type TaskRecord = Database["tasks"];
export type SubtaskRecord = Database["subtasks"];
export type NotificationRecord = Database["notifications"];
