'use strict';

(function () {
  var setup = function (queryUrl, queryType, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(queryType, queryUrl);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        if (queryType === 'GET') {
          onLoad(xhr.response);
        } else if (queryType === 'POST') {
          onLoad('Данные успешно отправлены');
        }
      } else {
        onError('Сервер ответил с ошибкой: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания ответа сервера');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup('https://1510.dump.academy/kekstagram/data', 'GET', onLoad, onError);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup('https://1510.dump.academy/kekstagram', 'POST', onLoad, onError);
      xhr.send(data);
    }
  };
})();
