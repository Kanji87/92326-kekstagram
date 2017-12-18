'use strict';

(function () {
  window.picture = {
    picturesContainer: document.querySelector('.pictures')
  };

  var fragment = document.createDocumentFragment();
  var picTemplate = document.querySelector('#picture-template').content;

  var createDomEl = function (obj, template) {
    var domEl = template.cloneNode(true);
    domEl.querySelector('.picture img').setAttribute('src', obj.url);
    domEl.querySelector('.picture-comments').textContent = obj.comments.length;
    domEl.querySelector('.picture-likes').textContent = obj.likes;
    return domEl;
  };

  var createPicList = function (arr, template, fragmentVar) {
    for (var i = 0; i < arr.length; i++) {
      fragmentVar.appendChild(createDomEl(arr[i], template));
    }
  };

  var onLoad = function (data) {
    createPicList(data, picTemplate, fragment);
    window.picture.picturesContainer.appendChild(fragment);
  };

  var onError = function (message) {
    window.data.showErrorMessage(message);
  };

  window.backend.load(onLoad, onError);
})();
