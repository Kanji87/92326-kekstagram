// модуль, который работает с галереей изображений. Использует вспомогательные модули:
// picture.js — модуль для отрисовки миниатюры
// preview.js — модуль для отрисовки увеличенного изображения

'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picTemplate = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');
  var pics = window.picture.createPicObjects(25);

  window.picture.createPicList(pics, picTemplate, fragment);
  picturesContainer.appendChild(fragment);
})();
