// модуль для отрисовки увеличенного изображения

'use strict';

(function () {
  var hideOverlayTarget = document.querySelector('.gallery-overlay-close');
  var galleryOverlay = document.querySelector('.gallery-overlay');

  var showPhotoOverlay = function (e) {
    var target = e.target;

    target = target.closest('.picture') ? target.closest('.picture') : target;

    if (target.className === 'picture') {
      e.preventDefault();
      var imgSrc = target.querySelector('img').getAttribute('src');
      var likesCount = target.querySelector('.picture-likes').textContent;
      var commentsCount = target.querySelector('.picture-comments').textContent;
      document.querySelector('.gallery-overlay-image').setAttribute('src', imgSrc);
      document.querySelector('.likes-count').textContent = likesCount;
      document.querySelector('.comments-count').textContent = commentsCount;
      galleryOverlay.classList.remove('hidden');

      document.addEventListener('keydown', hidePhotoOverlayOnEsc);
      hideOverlayTarget.addEventListener('keydown', hidePhotoOverlayOnEnter);
    }
    return false;
  };

  var showPhotoOverlayOnEnter = function (e) {
    if (e.keyCode === window.data.ENTER_BUTTON) {
      showPhotoOverlay(e);
    }
    return false;
  };

  var hidePhotoOverlay = function () {
    galleryOverlay.classList.add('hidden');

    document.removeEventListener('click', hidePhotoOverlayOnEsc);
    hideOverlayTarget.removeEventListener('keydown', hidePhotoOverlayOnEnter);
  };

  var hidePhotoOverlayOnEsc = function (e) {
    if (e.keyCode === window.data.ESC_BUTTON) {
      hidePhotoOverlay();
    }
    return false;
  };

  var hidePhotoOverlayOnEnter = function (e) {
    if (e.keyCode === window.data.ENTER_BUTTON) {
      hidePhotoOverlay();
    }
    return false;
  };

  document.addEventListener('click', showPhotoOverlay);
  document.addEventListener('keydown', showPhotoOverlayOnEnter);
  hideOverlayTarget.addEventListener('click', hidePhotoOverlay);
})();
