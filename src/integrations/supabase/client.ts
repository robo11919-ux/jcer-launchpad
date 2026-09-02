import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SUPABASE_URL"]) ||
  (typeof process !== "undefined" && process.env?.["SUPABASE_URL"]) ||
  ""
).trim();

const SUPABASE_PUBLISHABLE_KEY = (
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SUPABASE_PUBLISHABLE_KEY"]) ||
  (typeof process !== "undefined" && process.env?.["SUPABASE_PUBLISHABLE_KEY"]) ||
  ""
).trim();

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_PUBLISHABLE_KEY &&
  !SUPABASE_URL.includes("your-project") &&
  !SUPABASE_URL.includes("example.com")
);

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function initSupabaseClient() {
  if (!isSupabaseConfigured) {
    console.warn(
      "[Supabase] VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are not configured. Running in Local Broadcast Mode (same-device only).",
    );
    // Safe mock client to prevent null pointer exceptions during local development
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
        upsert: () => Promise.resolve({ data: null, error: null }),
      }),
      channel: () => ({
        on: function () {
          return this;
        },
        subscribe: function (cb?: (status: string) => void) {
          cb?.("CLOSED");
          return this;
        },
      }),
      removeChannel: () => Promise.resolve("ok"),
    } as unknown as ReturnType<typeof createClient<Database>>;
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export const supabase = initSupabaseClient();
