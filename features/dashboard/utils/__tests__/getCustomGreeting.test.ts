import getCustomGreeting from "../getCustomGreeting";

const morningGreeting = [
  "Good morning, ready to tackle the day?",
  "Rise and shine! Let's make today great.",
  "Good morning! Time to seize the day.",
  "Morning! Let's make today productive.",
  "Good morning! What are your plans for today?",
];

const afternoonGreeting = [
  "Good afternoon! How's your day going?",
  "Hope your afternoon is going well!",
  "Good afternoon! Let's keep the momentum going.",
  "Afternoon! What have you accomplished today?",
  "Good afternoon! Ready for the rest of the day?",
];

const eveningGreeting = [
  "Good evening! How was your day?",
  "Hope you had a great day! Good evening!",
  "Good evening! Time to relax and unwind.",
  "Evening! What did you achieve today?",
  "Good evening! Let's reflect on the day.",
];

const nightGreeting = [
  "Late night? Planning tomorrow's tasks?",
  "Night owl? Let's prepare for tomorrow.",
  "Good night! Ready for a fresh start tomorrow?",
  "Nighttime reflection: What went well today?",
  "Good night! Rest well for a productive tomorrow.",
];

describe("getCustomGreeting", () => {
  const RealDate = Date;

  const mockDateWithHour = (hour: number): void => {
    const RealDate = Date;

    global.Date = class extends RealDate {
      constructor(...args: any[]) {
        if (args.length === 0) {
          // Call super with current date (just to satisfy TS)
          super();
          // Return the mocked date
          return new RealDate(
            `2025-01-01T${String(hour).padStart(2, "0")}:00:00`,
          );
        }
        //@ts-ignore
        super(...args);
      }

      static now() {
        return new RealDate(
          `2025-01-01T${String(hour).padStart(2, "0")}:00:00`,
        ).getTime();
      }
    } as unknown as DateConstructor;
  };

  afterEach(() => {
    global.Date = RealDate; // Restore original Date
  });

  it("returns a morning greeting if hour < 12", () => {
    mockDateWithHour(8);
    const greeting = getCustomGreeting();
    expect(morningGreeting).toContain(greeting);
  });

  it("returns an afternoon greeting if 12 <= hour < 18", () => {
    mockDateWithHour(14);
    const greeting = getCustomGreeting();
    expect(afternoonGreeting).toContain(greeting);
  });

  it("returns an evening greeting if 18 <= hour < 22", () => {
    mockDateWithHour(20);
    const greeting = getCustomGreeting();
    expect(eveningGreeting).toContain(greeting);
  });

  it("returns a night greeting if hour >= 22", () => {
    mockDateWithHour(23);
    const greeting = getCustomGreeting();
    expect(nightGreeting).toContain(greeting);
  });

  it("always returns a string", () => {
    mockDateWithHour(10);
    const greeting = getCustomGreeting();
    expect(typeof greeting).toBe("string");
  });
});
