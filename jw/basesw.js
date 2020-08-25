var version="7.0.0";var cacheName="jw-cache";var cache=cacheName+"-"+version;var urlsToCache=[];self.addEventListener('install',function(event){console.log('base SW install event');self.skipWaiting();event.waitUntil(caches.delete(cache).then(function(){caches.open(cache).then(function(cacheObj){urlsToCache.push(self.registration.scope+'home/style.css');urlsToCache.push(self.registration.scope+'home/logo.png');urlsToCache.push(self.registration.scope+'images/v3/joget.ico');urlsToCache.push(self.registration.scope+'web/offline');return urlsToCache.map(function(url){return caches.match(url).then(function(checkCache){if(checkCache===undefined){cacheObj.addAll([url]).then(function(){}).catch(function(err){});}else{}})})})}));});self.addEventListener('fetch',function(event){if(event.request.url.indexOf('/web/console/')>0||event.request.url.indexOf('/web/json/console/')>0||event.request.url.indexOf('/web/presence')>0){return;}
var fetchRequest=event.request.clone();event.respondWith(fetch(fetchRequest).then(function(response){if(!response||event.request.method!=='GET'){return response;}else{var responseToCache=response.clone();caches.open(cache).then(function(cache){cache.put(event.request,responseToCache);});}
return response;}).catch(function(){return new Promise(function(resolve,reject){caches.match(event.request).then(function(response){if(response===undefined){caches.match(self.registration.scope+'web/offline').then(function(offlineResponse){resolve(offlineResponse);});}else{resolve(response);}})});}));});self.addEventListener('activate',function(event){console.log('base SW activate event');self.clients.claim();});