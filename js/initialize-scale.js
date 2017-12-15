'use strict';

(function () {
  var scaleHandlerContainer = document.querySelector('.upload-resize-controls');
  var imagePreview = document.querySelector('.effect-image-preview');

  var adjustScale = function (evt) {
    evt.preventDefault();
    var currentSizeVal = parseInt(document.querySelector('.upload-resize-controls-value').getAttribute('value').replace('%', ''), 10);
    var maxSize = 100;
    var minSize = 25;
    var step;
    var size;

    if (evt.target.className.indexOf('button-dec') > -1) {
      step = -25;
    } else if (evt.target.className.indexOf('button-inc') > -1) {
      step = +25;
    } else {
      return;
    }

    size = currentSizeVal + step;

    if (size > maxSize) {
      size = maxSize;
    } else if (size < minSize) {
      size = minSize;
    }

    imagePreview.style.transform = 'scale(' + size / 100 + ')';
    document.querySelector('.upload-resize-controls-value').setAttribute('value', size);
  };

  scaleHandlerContainer.addEventListener('click', adjustScale);
})();
