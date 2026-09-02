export const LAUNCH_ROW_ID = "11111111-1111-1111-1111-111111111111";

export const LIVE_ERP_URL = "https://jcererp-system.pages.dev/";

export type LaunchCommand = "READY" | "LAUNCH" | "RESET";

export type ScreenPhase =
  | "READY"
  | "ACTIVATING"
  | "OPENING_CURTAIN"
  | "REVEAL"
  | "OFFICIALLY_LAUNCHED"
  | "LIVE";

/** All ceremony timings in milliseconds. Tune here only. */
export const TIMINGS = {
  activation: 3000,
  curtain: 6000,
  reveal: 1000,
  announcement: 3000,
  transition: 2000,
} as const;

export const TOTAL_DURATION =
  TIMINGS.activation +
  TIMINGS.curtain +
  TIMINGS.reveal +
  TIMINGS.announcement +
  TIMINGS.transition;

export const HEARTBEAT_MS = 5000;
export const PRESENCE_TIMEOUT_MS = 15000;

export interface LaunchControlRow {
  id: string;
  command: LaunchCommand;
  sequence_id: number;
  screen_last_seen: string | null;
  updated_at: string;
}
