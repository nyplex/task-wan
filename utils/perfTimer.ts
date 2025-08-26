// utils/perfTimer.ts

const timers: Record<string, number> = {};

/**
 * Start a timer with an ID
 */
export const startTimer = (id: string): void => {
  timers[id] = performance.now();
};

/**
 * Stop a timer with an ID and return the duration in ms
 */
export const stopTimer = (id: string): number => {
  const end = performance.now();
  const start = timers[id];

  if (start === undefined) {
    console.warn(`[PERF] Timer "${id}" was never started.`);
    return 0;
  }

  const duration = end - start;
  console.log(`[PERF] ${id}: ${duration.toFixed(2)} ms`);
  return duration;
};

/**
 * Utility to measure an async function directly
 */
export const measure = async <T>(
  id: string,
  fn: () => Promise<T>,
): Promise<T> => {
  startTimer(id);
  try {
    const result = await fn();
    return result;
  } finally {
    stopTimer(id);
  }
};
