'use strict';
(function () {
  window.pictures.picturesContainer.addEventListener('click', window.preview.showPhotoOverlay);
  window.pictures.picturesContainer.addEventListener('keydown', window.preview.showPhotoOverlayOnEnter);
  window.preview.hideOverlayTarget.addEventListener('click', window.preview.hidePhotoOverlay);
})();
