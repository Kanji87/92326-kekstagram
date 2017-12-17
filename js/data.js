'use strict';
(function () {
  window.data = {
    ESC_BUTTON: 27,
    ENTER_BUTTON: 13,
    defaultEffectVal: 20,
    createPicObjects: function (picCount) {
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
    },
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
})();
