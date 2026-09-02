export const LAUNCH_ROW_ID: number | string = 1;

export const LIVE_ERP_URL = "https://jcererp-system.pages.dev/";

export type LaunchCommand = "READY" | "LAUNCH" | "RESET";

export type ScreenPhase =
  | "READY"
  | "COUNTDOWN"
  | "OPENING_CURTAIN"
  | "CELEBRATING"
  | "LIVE";

/** Grand ceremony timing in milliseconds. */
export const TIMINGS = {
  countdown: 10500,    // 10-second circular countdown (10 -> 0) + 500ms hold
  curtain: 10000,      // 10s grand slow cinematic theatre curtain opening
  celebration: 6500,   // 6.5s continuous flower petal celebration shower
} as const;

export const TOTAL_DURATION =
  TIMINGS.countdown + TIMINGS.curtain + TIMINGS.celebration;

export const HEARTBEAT_MS = 4000;
export const PRESENCE_TIMEOUT_MS = 14000;

export interface LaunchControlRow {
  id: number | string;
  command: LaunchCommand;
  sequence_id: number;
  screen_last_seen: string | null;
  updated_at: string;
}
