// 설치형 앱 조건을 맞추기 위한 최소 서비스 워커. 화면 파일만 보관하고, 출석부 자체는 항상 최신으로 열린다.
var CACHE = 'ydw-shell-v1';
var FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request, { ignoreSearch: true }); }));
});
