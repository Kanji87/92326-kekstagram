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

var getComment = function () {
  var commentStr = '';
  if (getRandomInt(0, 1)) {
    commentStr = comments[getRandomInt(0, comments.length - 1)] + ' ' + comments[getRandomInt(0, comments.length - 1)];
  } else {
    commentStr = comments[getRandomInt(0, comments.length - 1)];
  }
  return commentStr;
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
      url: 'phonots/{{' + pic + '}}.jpg',
      likes: getRandomInt(15, 200),
      comments: getComment()
    };
    for (var j = 0; j < picIndexArr.length; j++) {
      if (picIndexArr[j] === pic) {
        picIndexArr.splice(j, 1);
      }
    }
  }
  return picArr;
};

var pics = createPicObjects(25);
