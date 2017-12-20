'use strict';
(function () {
  window.data = {
    ESC_BUTTON: 27,
    ENTER_BUTTON: 13,
    DEFAULT_EFFECT_VAL: 20,
    showErrorMessage: function (message) {
      var messageBlock = document.createElement('div');
      var messageContainer = document.querySelector('.upload-message-container');
      messageBlock.textContent = message;
      messageBlock.classList.add('upload-message-error');
      messageContainer.appendChild(messageBlock);
      messageContainer.parentNode.classList.remove('hidden');
    },
    showSuccessMessage: function (message) {
      var messageBlock = document.createElement('div');
      var messageContainer = document.querySelector('.upload-message-container');
      messageBlock.textContent = message;
      messageBlock.classList.add('upload-message');
      messageContainer.appendChild(messageBlock);
      messageContainer.parentNode.classList.remove('hidden');
    }
  };
})();
