import { supabase } from "@/lib/supabase";
import { handleFailedOp } from "@/redux/utils/handleFailedOp";
import {
  AbstractPowerSyncDatabase,
  CrudEntry,
  PowerSyncBackendConnector,
  UpdateType,
} from "@powersync/react-native";

/// Postgres Response codes that we cannot recover from by retrying.
const FATAL_RESPONSE_CODES = [
  // Class 22 — Data Exception
  // Examples include data type mismatch.
  new RegExp("^22...$"),
  // Class 23 — Integrity Constraint Violation.
  // Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
  new RegExp("^23...$"),
  // INSUFFICIENT PRIVILEGE - typically a row-level security violation
  new RegExp("^42501$"),
];

export class Connector implements PowerSyncBackendConnector {
  constructor(private token: string) {}

  async fetchCredentials() {
    return {
      endpoint: process.env.EXPO_PUBLIC_POWERSYNC_URL!,
      token: this.token,
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase) {
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      console.log("No transactions to process");
      return;
    }
    let lastOp: CrudEntry | null = null;

    try {
      for (const op of transaction.crud) {
        lastOp = op;
        const record = { ...op.opData, id: op.id };

        // Handle different CRUD operations
        switch (op.op) {
          // CREATE operation
          case UpdateType.PUT:
            console.log(
              "Creating record to table:",
              op.table,
              "with data:",
              record,
            );
            const { error: insertError } = await supabase
              .from(op.table)
              .insert(op.opData);
            if (insertError) {
              console.error("Insert error:", insertError);
              throw insertError;
            }
            break;

          // UPDATE operation
          case UpdateType.PATCH:
            console.log(
              "Patching record in table:",
              op.table,
              "with data:",
              record,
            );
            const { error: updateError } = await supabase
              .from(op.table)
              .update(op.opData)
              .eq("id", op.id);
            if (updateError) {
              console.error("Update error:", updateError);
              throw updateError;
            }
            break;

          // DELETE operation
          case UpdateType.DELETE:
            console.log(
              "Deleting record from table:",
              op.table,
              "with id:",
              op.id,
            );
            const { error: deleteError } = await supabase
              .from(op.table)
              .delete()
              .eq("id", op.id);
            if (deleteError) {
              console.error("Delete error:", deleteError);
              throw deleteError;
            }
            break;
        }
      }

      // CRITICAL: Complete the transaction only after ALL operations succeed
      await transaction.complete();
      console.log("✅ Transaction completed successfully");
    } catch (ex: any) {
      if (
        typeof ex.code == "string" &&
        FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))
      ) {
        /**
         * Instead of blocking the queue with these errors,
         * discard the (rest of the) transaction.
         *
         * Note that these errors typically indicate a bug in the application.
         * If protecting against data loss is important, save the failing records
         * elsewhere instead of discarding, and/or notify the user.
         */
        console.error("Data upload error - discarding: ", lastOp);

        await transaction.complete();
        handleFailedOp(lastOp);
      } else {
        // Error may be retryable - e.g. network error or temporary server error.
        // Throwing an error here causes this call to be retried after a delay.
        throw ex;
      }
    }
  }
}
