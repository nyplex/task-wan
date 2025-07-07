import {
  AbstractPowerSyncDatabase,
  PowerSyncBackendConnector,
  UpdateType,
} from "@powersync/react-native";

export class Connector implements PowerSyncBackendConnector {
  /**
   * Implement fetchCredentials to obtain a JWT from your authentication service.
   * See https://docs.powersync.com/installation/authentication-setup
   * If you're using Supabase or Firebase, you can re-use the JWT from those clients, see:
   * https://docs.powersync.com/installation/authentication-setup/supabase-auth
   * https://docs.powersync.com/installation/authentication-setup/firebase-auth
   */
  async fetchCredentials() {
    return {
      // The PowerSync instance URL or self-hosted endpoint
      endpoint: process.env.EXPO_PUBLIC_POWERSYNC_URL!,
      /**
       * To get started quickly, use a development token, see:
       * Authentication Setup https://docs.powersync.com/installation/authentication-setup/development-tokens) to get up and running quickly
       */
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiI2Y2ZkZTQyYS1mM2Q0LTRiZWItYmNkMS0zMjk1ZTViM2M5N2UiLCJpYXQiOjE3NTE3OTg4NjgsImlzcyI6Imh0dHBzOi8vcG93ZXJzeW5jLWFwaS5qb3VybmV5YXBwcy5jb20iLCJhdWQiOiJodHRwczovLzY4MmExMzliNjgyMTVkODZlZGVjZThlMi5wb3dlcnN5bmMuam91cm5leWFwcHMuY29tIiwiZXhwIjoxNzUxODQyMDY4fQ.h-d9-rwONOsGqhlwOcXaYiMl9CKqzQHGSfgylTZDvaASaZx9ZhzfD1p4uybJlsV1hhF_Os1q-329BbcgyoxDrRZnsGqjeMUriHL5aRu9tKJmSErl0feuKcsrmRGm3yPtS_-ciGTxJZpEyHYjGQrsEoo2yNKqkdF2qqXlqQOk3T62FWpvIUZQjLoRRQ0AFstt2NXsgwTvGOulhhZwG9Pq86VoOtQ0KK7ekCk8VXA0rFYzbHD6ey4d1P0CdbAKsef8i_JtDlgogr0_06ar72Ha0APvQQm9nigMD1_cjecng1GXxlSynpf-r7G-ppeBpum5CnDkO_irWUHUBIloTdkXKQ",
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
          console.log("Creating record to table:", op.table, "with data:", record);

          break;
        case UpdateType.PATCH:
          // TODO: Instruct your backend API to PATCH a record
          console.log("Patching record in table:", op.table, "with data:", record);
          break;
        case UpdateType.DELETE:
          //TODO: Instruct your backend API to DELETE a record
          console.log("Deleting record from table:", op.table, "with id:", op.id);
          break;
      }
    }

    // Completes the transaction and moves onto the next one
    await transaction.complete();
  }
}
