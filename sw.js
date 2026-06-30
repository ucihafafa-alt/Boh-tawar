const CACHE = 'bukh-taavar-pro-v31';
const ASSETS = ['./','./index.html','./style.css','./manifest.json','./js/storage.js','./js/ui.js','./js/auth.js','./js/home.js','./js/profile.js','./js/prediction.js','./js/leaderboard.js','./js/admin.js','./js/app.js'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
