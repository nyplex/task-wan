export class DrizzleAppSchema {
  public schema: any;
  constructor(schema: any) {
    this.schema = schema;
  }
}
export const wrapPowerSyncWithDrizzle = jest.fn(() => ({}));
