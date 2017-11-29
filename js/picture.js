'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getComments = function () {
  var commentArr = [];
  if (Math.round(Math.random())) {
    commentArr[0] = comments[getRandomInt(0, comments.length - 1)];
    commentArr[1] = comments[getRandomInt(0, comments.length - 1)]
  } else {
    commentArr[0] = comments[getRandomInt(0, comments.length - 1)];
  }
  return commentArr;
};

var createPicIndexArray = function (arrLength) {
  var arr = [];
  for (var i = 1; i <= arrLength; i++) {
    arr[i - 1] = i;
  }
  return arr;
};

var createPicObjects = function (picCount) {
  var picArr = [];
  var picIndexArr = createPicIndexArray(picCount);
  var pic;
  for (var i = 0; i < picCount; i++) {
    pic = picIndexArr[getRandomInt(0, picIndexArr.length)];
    picArr[i] = {
      url: 'photos/' + pic + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getComments()
    };
    for (var j = 0; j < picIndexArr.length; j++) {
      if (picIndexArr[j] === pic) {
        picIndexArr.splice(j, 1);
      }
    }
  }
  return picArr;
};

var createDomEl = function (obj, template) {
  var domEl = template.cloneNode(true);
  domEl.querySelector('.picture img').setAttribute('src', obj.url);
  domEl.querySelector('.picture-comments').textContent = obj.comments.length;
  domEl.querySelector('.picture-likes').textContent = obj.likes;
  return domEl;
};

var createPicList = function (arr, template, fragment) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createDomEl(arr[i], template));
  }
};

var fragment = document.createDocumentFragment();
var picTemplate = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var pics = createPicObjects(25);

createPicList(pics, picTemplate, fragment);
picturesContainer.appendChild(fragment);

// document.querySelector('.gallery-overlay').classList.remove('hidden');

var closeOverlayTarget = document.querySelector('.gallery-overlay-close');
var galleryOverlay = document.querySelector('.gallery-overlay');
var photoImg = document.querySelector('.picture');
var ESC_BUTTON = 27;

var showOverlay = function (e) {
  e.preventDefault();
  var photo = e.target;
  var photoLink = photo.parentNode;
  var photoImg = photo.getAttribute('src');
  var photoLikes = photoLink.querySelector('.picture-likes').textContent;
  var photoComments = photoLink.querySelector('.picture-comments').textContent;
  // if (photoLink.className === 'picture') {
    document.querySelector('.gallery-overlay-image').setAttribute('src', photoImg);
    document.querySelector('.likes-count').textContent = photoLikes;
    document.querySelector('.comments-count').textContent = photoComments;
    galleryOverlay.classList.remove('hidden');
  // }
  document.addEventListener('keydown', closeOverlayOnEsc);
};

var closeOverlay = function () {
  galleryOverlay.classList.add('hidden');
};

var closeOverlayOnEsc = function (e) {
  if (e.keyCode === ESC_BUTTON) {
    galleryOverlay.classList.add('hidden');
  }
  document.removeEventListener('keydown', closeOverlay);
};

photoImg.addEventListener('click', showOverlay, true);
closeOverlayTarget.addEventListener('click', closeOverlay);
