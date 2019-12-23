self.addEventListener('install', event => {
    // I'm a new service worker
    console.log('Service worker installing...');
    // Add a call to skipWaiting here
  });
  
  self.addEventListener('activate', event => {
    console.log('Service worker activating...');
  });