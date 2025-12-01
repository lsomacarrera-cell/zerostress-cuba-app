self.addEventListener("install", () => {
  self.skipWaiting(); // activa el nuevo SW al instante
});

self.addEventListener("activate", () => {
  self.clients.claim(); // toma control sin esperar
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => response) // siempre intenta traer lo nuevo
      .catch(() => caches.match(event.request)) // si no hay internet, usa lo último guardado
  );
});
