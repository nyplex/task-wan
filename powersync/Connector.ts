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

  /**
   * Implement uploadData to send local changes to your backend service.
   * You can omit this method if you only want to sync data from the database to the client
   * See example implementation here:https://docs.powersync.com/client-sdk-references/react-native-and-expo#3-integrate-with-your-backend
   */
  async uploadData(database: AbstractPowerSyncDatabase) {
    /**
     * For batched crud transactions, use data.getCrudBatch(n);
     * https://powersync-ja.github.io/powersync-js/react-native-sdk/classes/SqliteBucketStorage#getcrudbatch
     */
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    for (const op of transaction.crud) {
      // The data that needs to be changed in the remote db
      const record = { ...op.opData, id: op.id };
      switch (op.op) {
        case UpdateType.PUT:
          // TODO: Instruct your backend API to CREATE a record
          console.log(
            "Creating record to table:",
            op.table,
            "with data:",
            record,
          );

          break;
        case UpdateType.PATCH:
          // TODO: Instruct your backend API to PATCH a record
          console.log(
            "Patching record in table:",
            op.table,
            "with data:",
            record,
          );
          break;
        case UpdateType.DELETE:
          //TODO: Instruct your backend API to DELETE a record
          console.log(
            "Deleting record from table:",
            op.table,
            "with id:",
            op.id,
          );
          break;
      }
    }

    // Completes the transaction and moves onto the next one
    await transaction.complete();
  }
}
