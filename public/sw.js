const CACHE_NAME = "jcer-launch-controller-v1";

// Static App Shell assets to pre-cache
const STATIC_ASSETS = [
  "/controller",
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/favicon.ico",
];

// Install: pre-cache application shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[PWA ServiceWorker] Pre-cache warning:", err);
      });
    }),
  );
  self.skipWaiting();
});

// Activate: clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch: serve cached shell, NEVER cache Supabase Realtime or dynamic API calls
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. ALWAYS BYPASS CACHE for Supabase Realtime, PostgreSQL APIs, and WebSockets
  if (
    url.hostname.includes("supabase.co") ||
    url.pathname.includes("/realtime/") ||
    url.pathname.includes("/rest/v1/") ||
    url.protocol === "ws:" ||
    url.protocol === "wss:" ||
    request.method !== "GET"
  ) {
    return; // Pass directly to network
  }

  // 2. Navigation requests: Network-first, fallback to cached /controller shell
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/controller");
          return fallback || Response.error();
        }),
    );
    return;
  }

  // 3. Static assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    }),
  );
});
