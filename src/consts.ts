export const resetDuration = process.env.RESET_DURATION
  ? parseInt(process.env.RESET_DURATION)
  : 3600 * 1000 * 6;
export let nextReset = Date.now() + resetDuration;
export let speedFactor = (14 * 24 * 3600 * 1000) / resetDuration;
export const setNextReset = (time: number) => {
  nextReset = time;
};
