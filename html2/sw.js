// �o�[�W������`
var CACHE_VERSION = 'ca-v1';
var DISP_VERSION = 'ca-d-v1';

// �L���b�V���̑Ώۂɂ���f�B���N�g���icss/js�͌ʂŒǉ��j
var resources = [
  '/',
  '/img'
];

// �L���b�V���ǉ�
self.addEventListener('install', function (event) {
  console.log('ServiceWorker Install');
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        console.log('cache.addAll');
        cache.addAll(resources);
      })
  );
});
// �L���b�V���\��
self.addEventListener('fetch', function (event) {
  console.log('ServiceWorker fetch');
  event.respondWith(
    // �L���b�V�������݂��邩�`�F�b�N
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          // �L���b�V�����Ȃ��ꍇ�L���b�V���ɓ����
          return fetch(event.request)
            .then(function (res) {
              return caches.open(DISP_VERSION)
                .then(function (cache) {
                  console.log('cache.put');
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            })
            .catch(function () {
              // �������Ȃ�
            });
        }
      })
  );
});
// �Â��L���b�V�����폜
self.addEventListener('activate', function (event) {
  console.log('activate ServiceWorker');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_VERSION && key !== DISP_VERSION) {
            console.log('cache.delete');
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});