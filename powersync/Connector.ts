import { supabase } from "@/lib/supabase";
import {
  AbstractPowerSyncDatabase,
  PowerSyncBackendConnector,
  UpdateType,
} from "@powersync/react-native";

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

    for (const op of transaction.crud) {
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

    // Completes the transaction and moves onto the next one
    await transaction.complete();
  }
}
