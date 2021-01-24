let staticCache = "static-res";
let resources = ["./", 
    "index.html", 
    "styles/index.css", 
    "scripts/app.js", 
    "scripts/data.js",
    "scripts/register.js",
    "assets/prev.svg",
    "assets/next.svg",
    "assets/covers/mobile/melody_m.jpg", 
    "assets/covers/mobile/bb_m.jpg", 
    "assets/covers/mobile/eminem_m.jpg", 
    "assets/covers/mobile/fsociety_m.png", 
    "assets/covers/mobile/maroon5_m.jpg", 
    "assets/covers/mobile/mr_robot_m.jpg", 
    "assets/covers/mobile/shawn_m.jpg", 
    "assets/covers/mobile/fb.jpg", 
    "assets/covers/mobile/spidey_m.jpg", 
    "assets/covers/mobile/ts_m.jpg",
    "assets/icons/icon.ico",
    "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap",
    "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_ZpC3gnD_vx3rCs.woff2",
    "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZFgrz_PZwjimrqw.woff2",
    "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gnD_vx3rCs.woff2",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(resources);
        })
    );
});

self.addEventListener("activate", event => {
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});
