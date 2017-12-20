'use strict';

(function () {
  var DEFAULT_IMAGE = 'img/upload-default-image.jpg';
  var uploadPhotoButton = document.querySelector('#upload-file');
  var closeOverlayButton = document.querySelector('.upload-form-cancel');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var photoForm = document.querySelector('.upload-form');
  var uploadMessage = document.querySelector('.upload-message');

  var scaleHandlerContainer = document.querySelector('.upload-resize-controls');
  var scaleValue = document.querySelector('.upload-resize-controls-value');
  var imagePreview = document.querySelector('.effect-image-preview');

  var filterElement = document.querySelector('.effect-image-preview');
  var effectPowerContainer = document.querySelector('.upload-effect-level');

  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  var showUploadOverlay = function () {
    readURL(uploadPhotoButton);
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
    var hashtags = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');
    return hashtags.length > 5 ? false : true;
  };

  var checkHashtagDoubles = function () {
    var hashtags = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');
    var testString = hashtags[0];
    for (var i = 1; i < hashtags.length; i++) {
      if (testString === hashtags[i]) {
        return false;
      }
      if (i === hashtags.length - 1 && hashtags.length !== 1) {
        hashtags = hashtags.splice(1, hashtags.length);
        testString = hashtags[0];
      }
    }
    return true;
  };

  var checkHashtagLength = function () {
    var hashtags = document.querySelector('.upload-form-hashtags').value.toLowerCase().split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > 19) {
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
    var hashtags = hashtagBlock.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return false;
      }
      for (var j = 1; j < hashtags[i].length; j++) {
        if (hashtags[i][j] === '#') {
          return false;
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
    scaleValue.setAttribute('value', scale + '%');
  };


  var applyFilter = function (filterName) {
    effectPowerContainer.classList.remove('hidden');
    switch (filterName) {
      case 'effect-chrome':
        filterElement.style.filter = 'grayscale(' + window.data.DEFAULT_EFFECT_VAL / 100 + ')';
        break;
      case 'effect-sepia':
        filterElement.style.filter = 'sepia(' + window.data.DEFAULT_EFFECT_VAL / 100 + ')';
        break;
      case 'effect-marvin':
        filterElement.style.filter = 'invert(' + window.data.DEFAULT_EFFECT_VAL + '%)';
        break;
      case 'effect-phobos':
        filterElement.style.filter = 'blur(' + window.data.DEFAULT_EFFECT_VAL * 3 / 100 + 'px)';
        break;
      case 'effect-heat':
        filterElement.style.filter = 'brightness(' + window.data.DEFAULT_EFFECT_VAL * 3 / 100 + ')';
        break;
      default:
        filterElement.style.filter = 'none';
        effectPowerContainer.classList.add('hidden');
    }
  };

  var resetForm = function () {
    var defaultEffect = document.querySelector('#upload-effect-none');
    var hashtagInput = document.querySelector('.upload-form-hashtags');
    var descriptionInput = document.querySelector('.upload-form-description');
    var effectPowerHandle = document.querySelector('.upload-effect-level-pin');
    var effectPowerLine = document.querySelector('.upload-effect-level-val');
    var effectPowerVal = document.querySelector('.upload-effect-level-value');

    uploadMessage.classList.add('hidden');
    effectPowerContainer.classList.add('hidden');
    imagePreview.setAttribute('src', DEFAULT_IMAGE);
    imagePreview.style = '';
    imagePreview.className = 'effect-image-preview';
    defaultEffect.checked = true;
    hashtagInput.value = '';
    uploadPhotoButton.value = '';
    descriptionInput.value = '';
    scaleValue.value = '100%';
    effectPowerVal.setAttribute('value', window.data.DEFAULT_EFFECT_VAL);
    effectPowerLine.style.width = window.data.DEFAULT_EFFECT_VAL + '%';
    effectPowerHandle.style.left = window.data.DEFAULT_EFFECT_VAL + '%';
  };

  var onLoad = function (message) {
    hideUploadOverlay();
    window.data.showSuccessMessage(message);
    setTimeout(resetForm, 1500);
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
