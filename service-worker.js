const filesToCache = [
  '/',
 'main.css',
 'images/bg-desktop.svg',
   'images/bg-mobile.svg',
  'images/errorimage.JPG',
  'images/favicon-32x32.png',
  'images/icon-communities.svg',
  'images/illustration-mockups.svg',
  'images/logo.svg',
  'images/android-chrome-192x192.png',
  'images/android-chrome-512x512.png',
  'images/apple-touch-icon.png',
  'images/mstile-150x150.png',
  'images/safari-pinned-tab.svg',
  'pages/404.html',
 'index.html',
 'manifest.json',
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');
  const cacheWhitelist = [staticCacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)      
      .then(response => {
        // TODO 5 - Respond with custom 404 page
        if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});