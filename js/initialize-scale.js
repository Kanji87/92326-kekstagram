'use strict';

(function () {
  window.initializeScale = function (handler, callback) {
    if (typeof callback === 'function') {
      var calculateSize = function (evt) {
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
          return false;
        }

        size = currentSizeVal + step;

        if (size > maxSize) {
          size = maxSize;
        } else if (size < minSize) {
          size = minSize;
        }
        callback(size);
        return size;
      };

      handler.addEventListener('click', calculateSize);

      return true;
    }

    return false;
  };
})();
