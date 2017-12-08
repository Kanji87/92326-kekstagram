// модуль для отрисовки миниатюры

'use strict';

(function () {
  var getComments = function () {
    var commentArr = [];
    if (Math.round(Math.random())) {
      commentArr[0] = window.data.comments[window.data.getRandomInt(0, window.data.comments.length - 1)];
      commentArr[1] = window.data.comments[window.data.getRandomInt(0, window.data.comments.length - 1)];
    } else {
      commentArr[0] = window.data.comments[window.data.getRandomInt(0, window.data.comments.length - 1)];
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

  var createDomEl = function (obj, template) {
    var domEl = template.cloneNode(true);
    domEl.querySelector('.picture img').setAttribute('src', obj.url);
    domEl.querySelector('.picture-comments').textContent = obj.comments.length;
    domEl.querySelector('.picture-likes').textContent = obj.likes;
    return domEl;
  };

  window.picture = {
    createPicList: function (arr, template, fragmentVar) {
      for (var i = 0; i < arr.length; i++) {
        fragmentVar.appendChild(createDomEl(arr[i], template));
      }
    },
    createPicObjects: function (picCount) {
      var picArr = [];
      var picIndexArr = createPicIndexArray(picCount);
      var pic;
      for (var i = 0; i < picCount; i++) {
        pic = picIndexArr[window.data.getRandomInt(0, picIndexArr.length)];
        picArr[i] = {
          url: 'photos/' + pic + '.jpg',
          likes: window.data.getRandomInt(15, 200),
          comments: getComments()
        };
        for (var j = 0; j < picIndexArr.length; j++) {
          if (picIndexArr[j] === pic) {
            picIndexArr.splice(j, 1);
          }
        }
      }
      return picArr;
    }
  };
})();
