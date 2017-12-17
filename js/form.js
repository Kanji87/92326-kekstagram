'use strict';

(function () {
  var uploadPhotoButton = document.querySelector('#upload-file');
  var closeOverlayButton = document.querySelector('.upload-form-cancel');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var photoForm = document.querySelector('.upload-form');

  var scaleHandlerContainer = document.querySelector('.upload-resize-controls');
  var scaleValue = document.querySelector('.upload-resize-controls-value');
  var imagePreview = document.querySelector('.effect-image-preview');

  var filterElement = document.querySelector('.effect-image-preview');
  var effectPowerContainer = document.querySelector('.upload-effect-level');

  var showUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', hideUploadOverlayOnEsc);
    closeOverlayButton.addEventListener('click', hideUploadOverlay);
    closeOverlayButton.addEventListener('keydown', hideUploadOverlayOnEnter);
  };

  var hideUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', hideUploadOverlayOnEsc);
    closeOverlayButton.removeEventListener('click', hideUploadOverlay);
    closeOverlayButton.removeEventListener('keydown', hideUploadOverlayOnEnter);
  };

  var hideUploadOverlayOnEsc = function (e) {
    if (e.keyCode === window.data.ESC_BUTTON && e.target.className !== 'upload-form-description') {
      hideUploadOverlay();
    }
  };

  var hideUploadOverlayOnEnter = function (e) {
    if (e.keyCode === window.data.ENTER_BUTTON) {
      hideUploadOverlay();
    }
  };

  var checkHashtagNum = function () {
    var hashtagArr = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');
    return hashtagArr.length > 5 ? false : true;
  };

  var checkHashtagDoubles = function () {
    var hashtagArr = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');
    var testString = hashtagArr[0];
    for (var i = 1; i < hashtagArr.length; i++) {
      if (testString === hashtagArr[i]) {
        return false;
      } else {
        if (i === hashtagArr.length - 1 && hashtagArr.length !== 1) {
          hashtagArr = hashtagArr.splice(1, hashtagArr.length);
          testString = hashtagArr[0];
        }
      }
    }
    return true;
  };

  var checkHashtagLength = function () {
    var hashtagArr = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');

    for (var i = 0; i < hashtagArr.length; i++) {
      if (hashtagArr[i].length > 19) {
        return false;
      }
    }
    return true;
  };

  var checkHashtagHashAndSpaces = function () {
    var hashtagBlock = document.querySelector('.upload-form-hashtags');
    if (hashtagBlock.value === '') {
      return true;
    }
    var hashtagArr = hashtagBlock.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArr.length; i++) {
      if (hashtagArr[i][0] !== '#') {
        return false;
      } else {
        for (var j = 1; j < hashtagArr[i].length; j++) {
          if (hashtagArr[i][j] === '#') {
            return false;
          }
        }
      }
    }
    return true;
  };

  var checkHashtagValidity = function (e) {
    var hashtagBlock = document.querySelector('.upload-form-hashtags');
    if (checkHashtagNum() && checkHashtagDoubles() && checkHashtagLength() && checkHashtagHashAndSpaces()) {
      e.preventDefault();
      var formData = new FormData(photoForm);
      hashtagBlock.style.border = 'none';
      window.backend.save(formData, onLoad, onError);
      return true;
    } else {
      e.preventDefault();
      hashtagBlock.style.border = '1px solid red';
      return false;
    }
  };

  var adjustScale = function (scale) {
    imagePreview.style.transform = 'scale(' + scale / 100 + ')';
    scaleValue.setAttribute('value', scale);
  };


  var applyFilter = function (filterName) {
    effectPowerContainer.classList.remove('hidden');
    switch (filterName) {
      case 'effect-chrome':
        filterElement.style.filter = 'grayscale(' + window.data.defaultEffectVal / 100 + ')';
        break;
      case 'effect-sepia':
        filterElement.style.filter = 'sepia(' + window.data.defaultEffectVal / 100 + ')';
        break;
      case 'effect-marvin':
        filterElement.style.filter = 'invert(' + window.data.defaultEffectVal + '%)';
        break;
      case 'effect-phobos':
        filterElement.style.filter = 'blur(' + window.data.defaultEffectVal * 3 / 100 + 'px)';
        break;
      case 'effect-heat':
        filterElement.style.filter = 'brightness(' + window.data.defaultEffectVal * 3 / 100 + ')';
        break;
      default:
        filterElement.style.filter = 'none';
        effectPowerContainer.classList.add('hidden');
    }
  };

  var onLoad = function (message) {
    hideUploadOverlay();
    window.data.showSuccessMessage(message);
  };

  var onError = function (message) {
    hideUploadOverlay();
    window.data.showErrorMessage(message);
  };

  window.initializeScale(scaleHandlerContainer, adjustScale);
  window.initializeFilters(filterElement, applyFilter);

  uploadPhotoButton.addEventListener('change', showUploadOverlay);
  photoForm.addEventListener('submit', checkHashtagValidity);
})();
