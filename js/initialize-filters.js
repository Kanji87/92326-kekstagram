'use strict';

(function () {
  window.initializeFilters = function (handler, callback) {
    if (typeof callback === 'function') {
      var effectPowerHandle = document.querySelector('.upload-effect-level-pin');
      var effectPowerVal = document.querySelector('.upload-effect-level-value');
      var effectPowerLine = document.querySelector('.upload-effect-level-val');

      var enablePreviewEffect = function (e) {
        var target = e.target.closest('.upload-effect-label') ? e.target.closest('.upload-effect-label') : e.target;
        if (target.className.indexOf('upload-effect-label') > -1 || target.className === 'upload-effect-label') {
          var effectName = target.getAttribute('for').replace('upload-', '');
          handler.className = 'effect-image-preview';
          handler.classList.add(effectName);
          effectPowerVal.setAttribute('value', window.data.DEFAULT_EFFECT_VAL);
          effectPowerLine.style.width = window.data.DEFAULT_EFFECT_VAL + '%';
          effectPowerHandle.style.left = window.data.DEFAULT_EFFECT_VAL + '%';

          callback(effectName);
        }
      };

      var setEffectPower = function (evt) {
        var varLineWidth = document.querySelector('.upload-effect-level-line').clientWidth;
        var pinLeftPos;

        var startCoords = {
          x: evt.clientX
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

          if (handler.classList.contains('effect-chrome')) {
            handler.style.filter = 'grayscale(' + pinLeftPos / 100 + ')';
          } else if (handler.classList.contains('effect-sepia')) {
            handler.style.filter = 'sepia(' + pinLeftPos / 100 + ')';
          } else if (handler.classList.contains('effect-marvin')) {
            handler.style.filter = 'invert(' + pinLeftPos + '%)';
          } else if (handler.classList.contains('effect-phobos')) {
            handler.style.filter = 'blur(' + pinLeftPos * 3 / 100 + 'px)';
          } else if (handler.classList.contains('effect-heat')) {
            handler.style.filter = 'brightness(' + pinLeftPos * 3 / 100 + ')';
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
      };

      effectPowerHandle.addEventListener('mousedown', setEffectPower);
      document.addEventListener('click', enablePreviewEffect);
      return true;
    }

    return false;
  };
})();
