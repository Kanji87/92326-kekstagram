// модуль для отрисовки миниатюры

'use strict';

(function () {
  window.pictures = {
    picturesContainer: document.querySelector('.pictures')
  };

  var fragment = document.createDocumentFragment();
  var picTemplate = document.querySelector('#picture-template').content;
  var pics = window.data.createPicObjects(25);

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

  createPicList(pics, picTemplate, fragment);
  window.pictures.picturesContainer.appendChild(fragment);
})();
