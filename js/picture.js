'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.picture = {
    picturesContainer: document.querySelector('.pictures')
  };

  var lastTimeout;
  var fragment = document.createDocumentFragment();
  var picTemplate = document.querySelector('#picture-template').content;
  var filtersBlock = document.querySelector('.filters');
  var pictures = [];
  var popularPictures = [];
  var discussedPictures = [];
  var randomPictures = [];
  var recommendButton = document.querySelector('.filters-item[for="filter-recommend"]');
  var popularButton = document.querySelector('.filters-item[for="filter-popular"]');
  var discussedButton = document.querySelector('.filters-item[for="filter-discussed"]');
  var randomButton = document.querySelector('.filters-item[for="filter-random"]');

  var debounce = function (func) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
  };

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
    pictures = data;
    createPicList(pictures, picTemplate, fragment);
    window.picture.picturesContainer.appendChild(fragment);
    filtersBlock.classList.remove('filters-inactive');
  };

  var onError = function (message) {
    window.data.showErrorMessage(message);
  };

  var showRecommend = function () {
    debounce(function () {
      window.picture.picturesContainer.innerHTML = '';
      createPicList(pictures, picTemplate, fragment);
      window.picture.picturesContainer.appendChild(fragment);
    });
  };

  var showPopular = function () {
    debounce(function () {
      window.picture.picturesContainer.innerHTML = '';
      popularPictures = pictures.slice();
      popularPictures.sort(function (first, second) {
        if (first.likes > second.likes) {
          return -1;
        } else if (first.likes < second.likes) {
          return 1;
        } else {
          return 0;
        }
      });
      createPicList(popularPictures, picTemplate, fragment);
      window.picture.picturesContainer.appendChild(fragment);
    });
  };

  var showDiscussed = function () {
    debounce(function () {
      window.picture.picturesContainer.innerHTML = '';
      discussedPictures = pictures.slice();
      discussedPictures.sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return -1;
        } else if (first.comments.length < second.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });
      createPicList(discussedPictures, picTemplate, fragment);
      window.picture.picturesContainer.appendChild(fragment);
    });
  };

  var showRandom = function () {
    debounce(function () {
      window.picture.picturesContainer.innerHTML = '';
      randomPictures = pictures.slice();
      randomPictures.sort(function () {
        return 0.5 - Math.random();
      });
      createPicList(randomPictures, picTemplate, fragment);
      window.picture.picturesContainer.appendChild(fragment);
    });
  };

  window.backend.load(onLoad, onError);
  popularButton.addEventListener('click', showPopular);
  recommendButton.addEventListener('click', showRecommend);
  discussedButton.addEventListener('click', showDiscussed);
  randomButton.addEventListener('click', showRandom);
})();
