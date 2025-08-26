import { getTimeLeft } from "../getTimeLeft"; // Adjust import path as needed

describe("getTimeLeft", () => {
  beforeEach(() => {
    // Mock current date to ensure consistent tests
    jest.useFakeTimers();
    // Set mock date to 2024-01-15 12:00:00 (time should be ignored due to setHours)
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Edge Cases", () => {
    it('should return "No deadline" for null input', () => {
      const result = getTimeLeft(null);
      expect(result).toBe("No deadline");
    });

    it('should return "No deadline" for undefined input', () => {
      const result = getTimeLeft(undefined);
      expect(result).toBe("No deadline");
    });

    it('should return "No deadline" for empty string', () => {
      const result = getTimeLeft("");
      expect(result).toBe("No deadline");
    });
  });

  describe("Due Today Cases", () => {
    it('should return "Due today" for same date regardless of time', () => {
      // Test various times on the same day
      const testCases = [
        "2024-01-15T00:00:00Z", // Start of day
        "2024-01-15T12:00:00Z", // Noon
        "2024-01-15T23:59:59Z", // End of day
        "2024-01-15T06:30:45Z", // Random time
      ];

      testCases.forEach((endDate) => {
        const result = getTimeLeft(endDate);
        expect(result).toBe("Due today");
      });
    });

    it('should return "Due today" for date string without time', () => {
      const result = getTimeLeft("2024-01-15");
      expect(result).toBe("Due today");
    });
  });

  describe("Future Dates (Days Left)", () => {
    it("should return correct days left for tomorrow", () => {
      const result = getTimeLeft("2024-01-16T10:00:00Z");
      expect(result).toBe("1 days left");
    });

    it("should return correct days left for multiple days in future", () => {
      const testCases = [
        { endDate: "2024-01-17T00:00:00Z", expected: "2 days left" },
        { endDate: "2024-01-20T15:30:00Z", expected: "5 days left" },
        { endDate: "2024-01-22T23:59:59Z", expected: "7 days left" },
        { endDate: "2024-02-14T12:00:00Z", expected: "30 days left" },
      ];

      testCases.forEach(({ endDate, expected }) => {
        const result = getTimeLeft(endDate);
        expect(result).toBe(expected);
      });
    });

    it("should ignore time component for future dates", () => {
      // Same day but different times should give same result
      const morning = getTimeLeft("2024-01-18T08:00:00Z");
      const evening = getTimeLeft("2024-01-18T20:00:00Z");

      expect(morning).toBe("3 days left");
      expect(evening).toBe("3 days left");
      expect(morning).toBe(evening);
    });
  });

  describe("Past Dates (Overdue)", () => {
    it('should return "⛔ Overdue!" for yesterday', () => {
      const result = getTimeLeft("2024-01-14T10:00:00Z");
      expect(result).toBe("⛔ Overdue!");
    });

    it('should return "⛔ Overdue!" for multiple days in past', () => {
      const testCases = [
        "2024-01-13T00:00:00Z", // 2 days ago
        "2024-01-10T15:30:00Z", // 5 days ago
        "2024-01-08T23:59:59Z", // 7 days ago
        "2023-12-15T12:00:00Z", // 1 month ago
      ];

      testCases.forEach((endDate) => {
        const result = getTimeLeft(endDate);
        expect(result).toBe("⛔ Overdue!");
      });
    });

    it("should ignore time component for past dates", () => {
      // Same past day but different times should give same result
      const morning = getTimeLeft("2024-01-12T08:00:00Z");
      const evening = getTimeLeft("2024-01-12T20:00:00Z");

      expect(morning).toBe("⛔ Overdue!");
      expect(evening).toBe("⛔ Overdue!");
      expect(morning).toBe(evening);
    });
  });

  describe("Different Date Formats", () => {
    it("should handle ISO 8601 date strings", () => {
      const result = getTimeLeft("2024-01-16T00:00:00.000Z");
      expect(result).toBe("1 days left");
    });

    it("should handle date strings without timezone", () => {
      const result = getTimeLeft("2024-01-16T12:00:00");
      expect(result).toBe("1 days left");
    });

    it("should handle simple date format", () => {
      const result = getTimeLeft("2024-01-16");
      expect(result).toBe("1 days left");
    });

    it("should handle timestamptz format (PostgreSQL style)", () => {
      const result = getTimeLeft("2024-01-16 10:30:00+00");
      expect(result).toBe("1 days left");
    });
  });

  describe("Boundary Cases", () => {
    it("should handle leap year correctly", () => {
      // Set current date to Feb 28, 2024 (leap year)
      jest.setSystemTime(new Date("2024-02-28T12:00:00Z"));

      const result = getTimeLeft("2024-02-29T10:00:00Z"); // Feb 29 exists in 2024
      expect(result).toBe("1 days left");
    });

    it("should handle month boundaries correctly", () => {
      // Set current date to end of January
      jest.setSystemTime(new Date("2024-01-31T12:00:00Z"));

      const result = getTimeLeft("2024-02-01T10:00:00Z"); // Next day is February 1st
      expect(result).toBe("1 days left");
    });

    it("should handle year boundaries correctly", () => {
      // Set current date to end of year
      jest.setSystemTime(new Date("2024-12-31T12:00:00Z"));

      const result = getTimeLeft("2025-01-01T10:00:00Z"); // Next day is new year
      expect(result).toBe("1 days left");
    });

    it("should handle timezone differences correctly", () => {
      // Current date set to UTC
      jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));

      // End dates in different timezones but same calendar day
      const utcDate = getTimeLeft("2024-01-16T00:00:00Z");
      const estDate = getTimeLeft("2024-01-16T05:00:00-05:00"); // Same UTC time
      const pstDate = getTimeLeft("2024-01-16T08:00:00-08:00"); // Same UTC time

      expect(utcDate).toBe("1 days left");
      expect(estDate).toBe("1 days left");
      expect(pstDate).toBe("1 days left");
    });
  });

  describe("Invalid Date Handling", () => {
    it("should handle invalid date strings gracefully", () => {
      // Note: This depends on how your function handles invalid dates
      // The Date constructor returns "Invalid Date" for invalid strings
      const result = getTimeLeft("invalid-date-string");

      // This might return "NaN days left" or throw an error
      // Adjust expectation based on your function's actual behavior
      expect(result).toMatch(/NaN|Invalid|Error/i);
    });
  });

  describe("Time Normalization", () => {
    it("should normalize times to midnight for calculation", () => {
      // Mock different times throughout the day
      const testTimes = [
        "2024-01-15T00:01:00Z", // Just after midnight
        "2024-01-15T11:59:59Z", // Just before noon
        "2024-01-15T23:58:00Z", // Just before midnight
      ];

      testTimes.forEach((mockTime) => {
        jest.setSystemTime(new Date(mockTime));

        // All should treat tomorrow the same way
        const result = getTimeLeft("2024-01-16T15:00:00Z");
        expect(result).toBe("1 days left");

        // All should treat today the same way
        const todayResult = getTimeLeft("2024-01-15T09:00:00Z");
        expect(todayResult).toBe("Due today");
      });
    });
  });
});
