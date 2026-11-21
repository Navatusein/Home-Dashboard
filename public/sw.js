const CACHE = "home-dashboard-v2";
const FALLBACK_PAGE = "/home-assistant/home";
const PRECACHE_PAGES = [FALLBACK_PAGE, "/home-assistant/music"];
const NAVIGATION_TIMEOUT = 3000;

self.addEventListener("install", (event) => {
  event.waitUntil(precache().catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || request.headers.has("RSC"))
    return;

  if (url.pathname.startsWith("/_next/static/"))
    event.respondWith(cacheFirst(request));
  else if (request.mode === "navigate")
    event.respondWith(navigation(request));
  else
    event.respondWith(networkFirst(request));
});

function precache() {
  return caches.open(CACHE).then((cache) => Promise.all(PRECACHE_PAGES.map((page) =>
    fetch(page).then((response) => {
      if (!response.ok || response.redirected)
        return;

      return response.clone().text().then((html) => {
        const assets = new Set(html.match(/\/_next\/static\/[^"'\s)\\]+/g));
        return Promise.all([cache.put(page, response), cache.addAll([...assets])]);
      });
    })
  )));
}

function store(request, response) {
  if (response.ok) {
    const copy = response.redirected ? new Response(response.clone().body, response) : response.clone();
    caches.open(CACHE).then((cache) => cache.put(response.redirected ? response.url : request, copy));
  }

  return response;
}

function cacheFirst(request) {
  return caches.match(request)
    .then((cached) => cached || fetch(request).then((response) => store(request, response)));
}

function networkFirst(request) {
  return fetch(request)
    .then((response) => store(request, response))
    .catch(() => caches.match(request));
}

function navigation(request) {
  const network = fetch(request).then((response) => store(request, response));

  const timeout = new Promise((resolve) => setTimeout(resolve, NAVIGATION_TIMEOUT))
    .then(() => caches.match(request))
    .then((cached) => cached || network);

  return Promise.race([network, timeout])
    .catch(() => caches.match(request).then((cached) => cached || caches.match(FALLBACK_PAGE)));
}
