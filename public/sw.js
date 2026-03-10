// sw.js — Improved service worker for RSE Generator (v2).
//
// What was wrong before (v1):
//   - No skipWaiting() call, so the SW waited for ALL tabs to close before
//     activating. On first install, it never took control of the current page,
//     so the CSS/JS assets loaded by the page were never intercepted or cached.
//   - No old-cache cleanup, so stale entries could accumulate.
//   - Assets in /assets/ were treated the same as HTML (network-first), which
//     is inefficient since Vite's asset filenames already include a content hash.
//
// What is fixed here (v2):
//   1. skipWaiting() — SW activates immediately on first install.
//   2. clients.claim() + old cache cleanup in activate — takes control of all
//      open tabs and removes the old v1 cache entries.
//   3. Cache-first for /assets/ — Vite generates immutable hash-named files
//      (e.g. /assets/index-AbCd.js). Cache-first is safe and fast for these.
//   4. Network-first for HTML and everything else — keeps the page fresh while
//      providing a cached fallback when offline.
//   5. Only cache responses with status 200 (response.ok) to avoid caching
//      error pages.

const CACHE_NAME = 'rse-cache-v2'

// ── Install: activate immediately + pre-cache the HTML entry point ────────────
self.addEventListener('install', (event) => {
  // Skip waiting so this SW takes control immediately on first install,
  // rather than waiting for all existing tabs to close first.
  self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache the two files we know by name.
      // Everything else (Vite-hashed CSS/JS/JSON) is cached at runtime on first fetch.
      return cache.addAll(['/', '/manifest.json']).catch(() => {
        // Fail gracefully if offline during install (e.g. slow connection).
      })
    })
  )
})

// ── Activate: clean up old caches + claim all open tabs immediately ───────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        // Delete any cache from an older SW version (e.g. rse-cache-v1)
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => {
        // Take control of all open pages immediately so they use this SW.
        return self.clients.claim()
      })
  )
})

// ── Fetch: differentiated strategy depending on asset type ────────────────────
self.addEventListener('fetch', (event) => {
  // Only handle GET requests.
  if (event.request.method !== 'GET') return

  // Only handle same-origin requests (skip analytics, external fonts, etc.).
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  // ── Strategy A: Cache-first for Vite's hashed static assets ──────────────
  // Vite output files like /assets/index-AbCd1234.js and /assets/index-XyZ.css
  // have content-hash filenames that are unique per build and never change.
  // Cache-first is the correct strategy: serve instantly from cache when available,
  // and fetch + cache when not yet seen.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached

        // Not in cache yet — fetch from network, cache it, return it.
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // ── Strategy B: Network-first for HTML, JSON data, and all other routes ──
  // Try network first so the page stays up to date.
  // On failure (offline), serve the cached version.
  // For navigation requests with no cache entry, fall back to the root HTML.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache any successful response for future offline use.
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached
          // For page navigations (e.g. refreshing), fall back to the cached root HTML.
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
          // For other resources with no cache, return a plain offline signal.
          return new Response('Offline', { status: 503, statusText: 'Offline' })
        })
      )
  )
})
