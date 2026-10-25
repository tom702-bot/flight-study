'use strict';
const CACHE='integrated-flight-study-pages-v1';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./index.html'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname)||event.request.mode!=='navigate')return;
 event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match('./index.html'))));
});
