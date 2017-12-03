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
    commentArr[1] = comments[getRandomInt(0, comments.length - 1)];
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

var hideOverlayTarget = document.querySelector('.gallery-overlay-close');
var galleryOverlay = document.querySelector('.gallery-overlay');
var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

var showPhotoOverlay = function (e) {
  var target = e.target;

  target = target.closest('.picture') ? target.closest('.picture') : target;

  if (target.className === 'picture') {
    e.preventDefault();
    var imgSrc = target.querySelector('img').getAttribute('src');
    var likesCount = target.querySelector('.picture-likes').textContent;
    var commentsCount = target.querySelector('.picture-comments').textContent;
    document.querySelector('.gallery-overlay-image').setAttribute('src', imgSrc);
    document.querySelector('.likes-count').textContent = likesCount;
    document.querySelector('.comments-count').textContent = commentsCount;
    galleryOverlay.classList.remove('hidden');

    document.addEventListener('keydown', hidePhotoOverlayOnEsc);
    hideOverlayTarget.addEventListener('keydown', hidePhotoOverlayOnEnter);
  }
  return false;
};

var showPhotoOverlayOnEnter = function (e) {
  if (e.keyCode === ENTER_BUTTON) {
    showPhotoOverlay(e);
  }
  return false;
};

var hidePhotoOverlay = function () {
  galleryOverlay.classList.add('hidden');

  document.removeEventListener('click', hidePhotoOverlayOnEsc);
  hideOverlayTarget.removeEventListener('keydown', hidePhotoOverlayOnEnter);
};

var hidePhotoOverlayOnEsc = function (e) {
  if (e.keyCode === ESC_BUTTON) {
    hidePhotoOverlay();
  }
  return false;
};

var hidePhotoOverlayOnEnter = function (e) {
  if (e.keyCode === ENTER_BUTTON) {
    hidePhotoOverlay();
  }
  return false;
};

document.addEventListener('click', showPhotoOverlay);
document.addEventListener('keydown', showPhotoOverlayOnEnter);

hideOverlayTarget.addEventListener('click', hidePhotoOverlay);

var uploadPhotoButton = document.querySelector('#upload-file');
var closeOverlayButton = document.querySelector('.upload-form-cancel');
var uploadOverlay = document.querySelector('.upload-overlay');
var effectPreviewImage = document.querySelector('.effect-image-preview');
var effectButtonClass = 'upload-effect-label';

var showUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', hideUploadOverlayOnEsc);
  closeOverlayButton.addEventListener('click', hideUploadOverlay);
  closeOverlayButton.addEventListener('keydown', hideUploadOverlayOnEnter);
  document.addEventListener('click', enablePreviewEffect);
};

var hideUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', hideUploadOverlayOnEsc);
  closeOverlayButton.removeEventListener('click', hideUploadOverlay);
  closeOverlayButton.removeEventListener('keydown', hideUploadOverlayOnEnter);
};

var hideUploadOverlayOnEsc = function (e) {
  if (e.keyCode === ESC_BUTTON && e.target.className !== 'upload-form-description') {
    hideUploadOverlay();
  }
};

var hideUploadOverlayOnEnter = function (e) {
  if (e.keyCode === ENTER_BUTTON) {
    hideUploadOverlay();
  }
};

var enablePreviewEffect = function (e) {
  var target = e.target.closest('.upload-effect-label') ? e.target.closest('.upload-effect-label') : e.target;
  if (target.className === 'upload-effect-label') {
    console.log('found it!');
    console.log(target);
  }
};

uploadPhotoButton.addEventListener('change', showUploadOverlay);

