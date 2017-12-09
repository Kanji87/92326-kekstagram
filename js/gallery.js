// модуль, который работает с галереей изображений. Использует вспомогательные модули:
// picture.js — модуль для отрисовки миниатюры
// preview.js — модуль для отрисовки увеличенного изображения

'use strict';
(function () {
  window.pictures.picturesContainer.addEventListener('click', window.preview.showPhotoOverlay);
  window.pictures.picturesContainer.addEventListener('keydown', window.preview.showPhotoOverlayOnEnter);
  window.preview.hideOverlayTarget.addEventListener('click', window.preview.hidePhotoOverlay);
})();
