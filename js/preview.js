// модуль для отрисовки увеличенного изображения

'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    hideOverlayTarget: document.querySelector('.gallery-overlay-close'),
    showPhotoOverlay: function (e) {
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
        window.preview.hideOverlayTarget.addEventListener('keydown', hidePhotoOverlayOnEnter);
      }
      return false;
    },
    showPhotoOverlayOnEnter: function (e) {
      if (e.keyCode === window.data.ENTER_BUTTON) {
        window.preview.showPhotoOverlay(e);
      }
      return false;
    },
    hidePhotoOverlay: function () {
      galleryOverlay.classList.add('hidden');

      document.removeEventListener('click', hidePhotoOverlayOnEsc);
      window.preview.hideOverlayTarget.removeEventListener('keydown', hidePhotoOverlayOnEnter);
    }
  };

  var hidePhotoOverlayOnEsc = function (e) {
    if (e.keyCode === window.data.ESC_BUTTON) {
      window.preview.hidePhotoOverlay();
    }
    return false;
  };

  var hidePhotoOverlayOnEnter = function (e) {
    if (e.keyCode === window.data.ENTER_BUTTON) {
      window.preview.hidePhotoOverlay();
    }
    return false;
  };
})();
