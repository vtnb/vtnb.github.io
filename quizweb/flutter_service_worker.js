'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "30195767560c3c3c02b0efe07688dd72",
"/": "30195767560c3c3c02b0efe07688dd72",
"main.dart.js": "e15ae6a4a1dddfa5f815f7f8aa9c8b6d",
"favicon.png": "f8992cf15b8422a33d46ca88c8fe00f1",
"icons/Icon-192.png": "0a99e8e46e429cded211e2522e8af761",
"icons/Icon-512.png": "cc3e638b201de644e1fde57e86cce932",
"manifest.json": "f8b1b1eb18257d030bc35b589da9f84a",
"assets/LICENSE": "4200c0458e63ab44866dfdb212eb2f47",
"assets/AssetManifest.json": "7f3fce05c2f724f3d65032bf14521db6",
"assets/FontManifest.json": "ffd31452116b80a6d5302c34aebfaf44",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/wrong.png": "fbfdb99942a73237b0067245ea68749b",
"assets/assets/images/icon_pdf.png": "b9d9103f7825b06705f6f971d5235e9d",
"assets/assets/images/correct.png": "d4d2634d87bd0a3b3736ab51b44c92c5",
"assets/assets/images/userImage.png": "55a822b76d5900e8ec3a95e02d8e3e8a",
"assets/assets/images/hc_bg.png": "010dacd9ce52e889642db1fa4310a461",
"assets/assets/images/no_answer.png": "edead8124a37e9e82adb9477fd3f01fe",
"assets/assets/images/ic_excel.png": "c5afa836da983f38a25dfebb540cbd87",
"assets/assets/images/logo_vnpt.png": "6cae5e4ce6d941d0969350b290dc887c",
"assets/assets/images/quiz_thumb.png": "8d5e7a96829be7712a1f7def465b53dc",
"assets/assets/images/ic_pdf.png": "fd2357875202bda9164f2491c66496d0",
"assets/assets/images/ic_word.png": "0f7857b539dd5ae39b1bc9ea1ebc6a81",
"assets/assets/images/icon_in_house.png": "b9484e6b8e3070ef2aaa89267df5fcae",
"assets/assets/images/bg_login.png": "1a75370eb6f718c7c0ef94b996dac4cb",
"assets/assets/images/conan.jpg": "0aece85b490f650db509952ee9861f38",
"assets/assets/images/com_thumb.png": "897731be8dc62bfa10b27f0440489845",
"assets/assets/images/ic_pptx.png": "045dd6223d87e30840f869bf0693a70d",
"assets/assets/images/daeaf03c.jpg": "91a684d9b6adeccfe6837447e5a409a0",
"assets/assets/fonts/Roboto-Medium.ttf": "58aef543c97bbaf6a9896e8484456d98",
"assets/assets/fonts/Merriweather-Bold.ttf": "adac1da5dad02caa43140a8ebdce945e",
"assets/assets/fonts/Merriweather-Regular.ttf": "f96a44b40f99ae4b63f275f1142f7c98",
"assets/assets/fonts/OpenSans-Semibold.ttf": "33f225b8f5f7d6b34a0926f58f96c1e9",
"assets/assets/fonts/Roboto-Regular.ttf": "11eabca2251325cfc5589c9c6fb57b46",
"assets/assets/fonts/Lato-Regular.ttf": "3b9b99039cc0a98dd50c3cbfac57ccb2",
"assets/assets/fonts/Lato-SemiBold.ttf": "3c6cfb1aebd888a0eb4c8fba94140fa6",
"assets/assets/fonts/Lato-Light.ttf": "90e1d3559ac52f7f0f77a86e1bfd632d",
"assets/assets/fonts/Lato-Medium.ttf": "863b7dcd5ec2c3923122af25ce0f7e4c",
"assets/assets/fonts/Merriweather-Italic.ttf": "a41ba7b1760546d2396349c85a7d96a7",
"assets/assets/fonts/OpenSans-Regular.ttf": "629a55a7e793da068dc580d184cc0e31",
"assets/assets/fonts/Roboto-Bold.ttf": "e07df86cef2e721115583d61d1fb68a6"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"/",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(CORE);
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

