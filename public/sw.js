const CACHE = "home-dashboard-v2";
const FALLBACK_PAGE = "/home-assistant/home";
const NAVIGATION_TIMEOUT = 3000;

self.addEventListener("install", () => self.skipWaiting());

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

  if (request.method !== "GET" || url.origin !== self.location.origin || request.headers.has("RSC"))
    return;

  if (url.pathname.startsWith("/_next/static/"))
    event.respondWith(cacheFirst(request));
  else if (request.mode === "navigate")
    event.respondWith(navigation(request));
  else
    event.respondWith(networkFirst(request));
});

function store(request, response) {
  if (response.ok && !response.redirected) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
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
