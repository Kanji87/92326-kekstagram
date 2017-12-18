'use strict';
(function () {
  window.picture.picturesContainer.addEventListener('click', window.preview.showPhotoOverlay);
  window.picture.picturesContainer.addEventListener('keydown', window.preview.showPhotoOverlayOnEnter);
  window.preview.hideOverlayTarget.addEventListener('click', window.preview.hidePhotoOverlay);
})();
