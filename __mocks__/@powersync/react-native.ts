module.exports = {
  PowerSyncDatabase: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    ready: true,
  })),
};
