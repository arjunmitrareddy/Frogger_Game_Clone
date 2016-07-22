/**
 * Created by arjunMitraReddy on 7/22/2016.
 */
var staticCache = 'transport-info-v2';
var imagesCache = 'transport-imgs';

var allCaches = [
    staticCache,
    imagesCache
];

self.addEventListener('install', function(event)  {
    event.waitUntil(
        Promise.all(
            [
                caches.open(staticCache).then(function(cache)  {
                    return cache.addAll([
                        'index.html',
                        'js/app.js',
                        'js/engine.js',
                        'js/eventHandlers.js',
                        'js/resourceLoader.js',
                        'css/style.css'
                    ])
                }),
                caches.open(imagesCache).then(function(cache)  {
                    return cache.addAll([
                        'images/stone-block.png',
                        'images/water-block.png',
                        'images/grass-block.png',
                        'images/enemy-bug.png',
                        'images/char-boy.png',
                        'images/char-cat-girl.png',
                        'images/char-horn-girl.png',
                        'images/char-pink-girl.png',
                        'images/char-princess-girl.png',
                        'images/char-bug.png',
                        'images/frogger.png'
                    ])
                })
            ]
        )
    )
});

self.addEventListener('activate', function(event)  {
    event.waitUntil(
        caches.keys().then(function(cacheNames)  {
            return Promise.all(
                cacheNames.filter(function(cacheName)  {
                    return !allCaches.includes(cacheName);
                }).map(function(cacheName)  {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event)  {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname.endsWith('/')) {
            event.respondWith(serveAssets('/index.html', imagesCache));
            return;
        }
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
//1

self.addEventListener('message', function(event)  {
    if (event.data.skipWait) {
        self.skipWaiting();
    }
});

function serveAssets(request, cacheName) {
    return caches.open(cacheName).then(function(cache)  {
        return cache.match(request).then(function(response)  {
            if (response) return response;
            return fetch(request).then(function(response)  {
                cache.put(request, response.clone());
                return response;
            });
        });
    });
}
