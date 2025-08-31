import { powersync } from "@/powersync/system";
import { CrudEntry } from "@powersync/common";
import { getProfileApi } from "../slices/apiSlice/endpoints/profile/getProfile";
import store from "@/redux/store";

// Track active watchers to avoid duplicates
const activeWatchers = new Set<string>();

export function handleFailedOp(lastOp: CrudEntry | null) {
  if (!lastOp) return;

  const tableToTag: Record<string, { type: string; endpoint: any }> = {
    users: { type: "Profile", endpoint: getProfileApi },
    // Add other tables here
  };

  const mapping = tableToTag[lastOp.table];
  if (!mapping) return;

  const watcherId = `${lastOp.table}-${lastOp.id}`;
  if (activeWatchers.has(watcherId)) return;
  activeWatchers.add(watcherId);

  powersync.watch(`SELECT * FROM ${lastOp.table} WHERE id = ?`, [lastOp.id], {
    onResult: () => {
      store.dispatch(
        mapping.endpoint.util.invalidateTags([
          { type: mapping.type, id: lastOp.id },
        ]),
      );
    },
  });
}
