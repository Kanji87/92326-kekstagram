// модуль, который работает с формой редактирования изображения

'use strict';

(function () {
  var uploadPhotoButton = document.querySelector('#upload-file');
  var closeOverlayButton = document.querySelector('.upload-form-cancel');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var photoForm = document.querySelector('.upload-form');
  var increaseButton = document.querySelector('.upload-resize-controls-button-inc');
  var decreaseButton = document.querySelector('.upload-resize-controls-button-dec');
  var effectPowerContainer = document.querySelector('.upload-effect-level');
  var effectPowerHandle = document.querySelector('.upload-effect-level-pin');
  var effectPowerVal = document.querySelector('.upload-effect-level-value');
  var effectPowerLine = document.querySelector('.upload-effect-level-val');
  var effectPreviewImage = document.querySelector('.effect-image-preview');
  var defaultEffectVal = 20;

  effectPowerVal.classList.add('hidden');
  effectPowerContainer.classList.add('hidden');

  var showUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', hideUploadOverlayOnEsc);
    closeOverlayButton.addEventListener('click', hideUploadOverlay);
    closeOverlayButton.addEventListener('keydown', hideUploadOverlayOnEnter);
    document.addEventListener('click', enablePreviewEffect);
    increaseButton.addEventListener('click', increaseImageSize);
    decreaseButton.addEventListener('click', decreaseImageSize);
  };

  var hideUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', hideUploadOverlayOnEsc);
    closeOverlayButton.removeEventListener('click', hideUploadOverlay);
    closeOverlayButton.removeEventListener('keydown', hideUploadOverlayOnEnter);
    document.removeEventListener('click', enablePreviewEffect);
    increaseButton.removeEventListener('click', increaseImageSize);
    decreaseButton.removeEventListener('click', decreaseImageSize);
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

  var enablePreviewEffect = function (e) {
    var target = e.target.closest('.upload-effect-label') ? e.target.closest('.upload-effect-label') : e.target;
    if (target.className.indexOf('upload-effect-label') > -1 || target.className === 'upload-effect-label') {
      var effectName = target.getAttribute('for').replace('upload-', '');
      effectPreviewImage.className = '';
      effectPreviewImage.classList.add('effect-image-preview');
      effectPreviewImage.classList.add(effectName);
      effectPowerVal.setAttribute('value', defaultEffectVal);
      effectPowerLine.style.width = defaultEffectVal + '%';
      effectPowerHandle.style.left = defaultEffectVal + '%';
      effectPowerContainer.classList.remove('hidden');
      switch (effectName) {
        case 'effect-chrome':
          effectPreviewImage.style.filter = 'grayscale(' + defaultEffectVal / 100 + ')';
          break;
        case 'effect-sepia':
          effectPreviewImage.style.filter = 'sepia(' + defaultEffectVal / 100 + ')';
          break;
        case 'effect-marvin':
          effectPreviewImage.style.filter = 'invert(' + defaultEffectVal + '%)';
          break;
        case 'effect-phobos':
          effectPreviewImage.style.filter = 'blur(' + defaultEffectVal * 3 / 100 + 'px)';
          break;
        case 'effect-heat':
          effectPreviewImage.style.filter = 'brightness(' + defaultEffectVal * 3 / 100 + ')';
          break;
        default:
          effectPreviewImage.style.filter = 'none';
          effectPowerContainer.classList.add('hidden');
          break;
      }
    }
  };

  var decreaseImageSize = function () {
    var imagePreview = document.querySelector('.effect-image-preview');
    var currentSizeVal = parseInt(document.querySelector('.upload-resize-controls-value').getAttribute('value').replace('%', ''), 10);
    var minSize = 25;
    var step = 25;
    var newSize = currentSizeVal - step;
    if (newSize < minSize) {
      imagePreview.style.transform = 'scale(' + minSize / 100 + ')';
      document.querySelector('.upload-resize-controls-value').setAttribute('value', minSize);
    } else if (currentSizeVal > minSize) {
      imagePreview.style.transform = 'scale(' + newSize / 100 + ')';
      document.querySelector('.upload-resize-controls-value').setAttribute('value', newSize);
    }
    return false;
  };

  var increaseImageSize = function () {
    var imagePreview = document.querySelector('.effect-image-preview');
    var currentSizeVal = parseInt(document.querySelector('.upload-resize-controls-value').getAttribute('value').replace('%', ''), 10);
    var maxSize = 100;
    var step = 25;
    var newSize = currentSizeVal + step;
    if (newSize > maxSize) {
      imagePreview.style.transform = 'scale(' + maxSize / 100 + ')';
      document.querySelector('.upload-resize-controls-value').setAttribute('value', maxSize);
    } else if (currentSizeVal < maxSize) {
      imagePreview.style.transform = 'scale(' + newSize / 100 + ')';
      document.querySelector('.upload-resize-controls-value').setAttribute('value', newSize);
    }
    return false;
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
      return true;
    } else {
      e.preventDefault();
      hashtagBlock.style.border = '1px solid red';
      return false;
    }
  };

  uploadPhotoButton.addEventListener('change', showUploadOverlay);
  photoForm.addEventListener('submit', checkHashtagValidity);

  effectPowerHandle.addEventListener('mousedown', function (evt) {
    var varLineWidth = document.querySelector('.upload-effect-level-line').clientWidth;
    var pinLeftPos;

    var startCoords = {
      x: evt.clientX
      // y: evt.clientY
    };

    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      var shiftCoords = {
        x: startCoords.x - mouseMoveEvt.clientX
      };

      startCoords = {
        x: mouseMoveEvt.clientX
      };

      if (effectPowerHandle.offsetLeft - shiftCoords.x > varLineWidth) {
        pinLeftPos = 100;
        document.removeEventListener('mousemove', onMouseMove);
      } else if (effectPowerHandle.offsetLeft - shiftCoords.x < 0) {
        pinLeftPos = 0;
        document.removeEventListener('mousemove', onMouseMove);
      } else {
        pinLeftPos = ((effectPowerHandle.offsetLeft - shiftCoords.x) * 100 / varLineWidth);
      }

      effectPowerHandle.style.left = pinLeftPos + '%';
      effectPowerLine.style.width = pinLeftPos + '%';

      if (effectPreviewImage.className.indexOf('effect-chrome') > -1) {
        effectPreviewImage.style.filter = 'grayscale(' + pinLeftPos / 100 + ')';
      } else if (effectPreviewImage.className.indexOf('effect-sepia') > -1) {
        effectPreviewImage.style.filter = 'sepia(' + pinLeftPos / 100 + ')';
      } else if (effectPreviewImage.className.indexOf('effect-marvin') > -1) {
        effectPreviewImage.style.filter = 'invert(' + pinLeftPos + '%)';
      } else if (effectPreviewImage.className.indexOf('effect-phobos') > -1) {
        effectPreviewImage.style.filter = 'blur(' + pinLeftPos * 3 / 100 + 'px)';
      } else if (effectPreviewImage.className.indexOf('effect-heat') > -1) {
        effectPreviewImage.style.filter = 'brightness(' + pinLeftPos * 3 / 100 + ')';
      } else {
        document.removeEventListener('mousemove', onMouseMove);
      }

      effectPowerVal.setAttribute('value', Math.floor(pinLeftPos));
    };

    var onMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
