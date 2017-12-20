'use strict';

(function () {
  var MAX_SIZE = 100;
  var MIN_SIZE = 25;
  window.initializeScale = function (handler, callback) {
    if (typeof callback === 'function') {
      var calculateSize = function (evt) {
        evt.preventDefault();
        var currentSizeVal = parseInt(document.querySelector('.upload-resize-controls-value').getAttribute('value').replace('%', ''), 10);
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

        if (size > MAX_SIZE) {
          size = MAX_SIZE;
        } else if (size < MIN_SIZE) {
          size = MIN_SIZE;
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
