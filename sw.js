var cache_name = 'v1';

var cache_files = [
  './',
  './index.html',
  './style.css',
  './dog.jpg'
]

self.addEventListener('install', function(e){
  console.log('SW install:', e);
  e.waitUntil(
    caches.open(cache_name)
    .then(function(cache){
      return cache.addAll(cache_files);
    })
    .then(function(cache){
      console.log('Cache completed');
    })
  )
});

self.addEventListener('activate', function(event) {
  console.log('SW activate:', event);
});

self.addEventListener('fetch', function(e){
  console.log('SW fetch:', e.request.url)

  e.respondWith(
    caches.match(e.request)
    .then(function(cache_response){
      if(cache_response) return cache_response;

      return fetch(e.request)
      .then(function(fetch_response){
        if(fetch_response.status == 404){
          return caches.match('./dog.jpg');
        }

        return fetch_response;
      });
    }).catch(function(err){
      console.log('Cache error', err)
    });
  );
})
