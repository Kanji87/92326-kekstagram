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
          effectPowerVal.setAttribute('value', window.data.defaultEffectVal);
          effectPowerLine.style.width = window.data.defaultEffectVal + '%';
          effectPowerHandle.style.left = window.data.defaultEffectVal + '%';

          callback(effectName);
        }
      };

      var setEffectPower = function (evt) {
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

          if (handler.className.indexOf('effect-chrome') > -1) {
            handler.style.filter = 'grayscale(' + pinLeftPos / 100 + ')';
          } else if (handler.className.indexOf('effect-sepia') > -1) {
            handler.style.filter = 'sepia(' + pinLeftPos / 100 + ')';
          } else if (handler.className.indexOf('effect-marvin') > -1) {
            handler.style.filter = 'invert(' + pinLeftPos + '%)';
          } else if (handler.className.indexOf('effect-phobos') > -1) {
            handler.style.filter = 'blur(' + pinLeftPos * 3 / 100 + 'px)';
          } else if (handler.className.indexOf('effect-heat') > -1) {
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