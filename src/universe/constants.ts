const oneWeek = 1000 * 3600 * 24 * 7;

// default settings
export const ORIGINAL_MINIMUM_NAVIGATE_TIME = 15;
export const ORIGINAL_MINIMUM_WARP_TIME = 15;
export const ORIGINAL_NAVIGATION_FACTOR = 15;
export const ORIGINAL_WARP_FACTOR = 30;
export const ORIGINAL_BASE_COOLDOWN = 60000;
export const ORIGINAL_POWER_USE_COOLDOWN = 10000;

// fast settings
export const RESET_DURATION = process.env.RESET_DURATION
  ? parseInt(process.env.RESET_DURATION)
  : oneWeek;

export const TIME_FACTOR = RESET_DURATION / oneWeek;

export const MINIMUM_NAVIGATE_TIME =
  ORIGINAL_MINIMUM_NAVIGATE_TIME * TIME_FACTOR;
export const MINIMUM_WARP_TIME = ORIGINAL_MINIMUM_WARP_TIME * TIME_FACTOR;
export const NAVIGATION_FACTOR = ORIGINAL_NAVIGATION_FACTOR * TIME_FACTOR;
export const WARP_FACTOR = ORIGINAL_WARP_FACTOR * TIME_FACTOR;
export const BASE_COOLDOWN = ORIGINAL_BASE_COOLDOWN * TIME_FACTOR;
export const POWER_USE_COOLDOWN = ORIGINAL_POWER_USE_COOLDOWN * TIME_FACTOR;

export const STARTING_MONEY = 175000;

/**
 * Used to determine how much more than the ideal supply of goods a waypoint can have in storage
 */
export const MAX_SUPPLY_MODIFIER = 2;
