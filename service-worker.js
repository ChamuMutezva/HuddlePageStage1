self.addEventListener('install', event => {
    // I'm a new service worker
    console.log('Service worker installing...');
    self.skipWaiting();
    // Add a call to skipWaiting here
  });
  
  self.addEventListener('activate', event => {
    console.log('Service worker activating...');
  });

  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
  });