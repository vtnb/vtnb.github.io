'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "30195767560c3c3c02b0efe07688dd72",
"/": "30195767560c3c3c02b0efe07688dd72",
"main.dart.js": "219c263a86f822a4f8e75cbc4c811ad0",
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

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
