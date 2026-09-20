const C='medic-air-v25';
const FILES=['./','./index.html','./manifest.webmanifest','./medicair-logo-192.png','./medicair-logo-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  if(r.mode==='navigate'||/manifest|medicair-|versione|config\.js|open-meteo/.test(r.url)){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r.mode==='navigate'?'./index.html':r,c));return res}).catch(()=>caches.match(r.mode==='navigate'?'./index.html':r)));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res})));
});
