self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("fairy-cache").then(c =>
      c.addAll(["./", "./index.html", "./style.css"])
    )
  );
});
