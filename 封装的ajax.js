
var AJAX = AJAX || (function (w, jQuery) {
  //request url
  var URL = '../../Handler/request.ashx';
  function ajax(url, data, onSucc) {

    jQuery.ajax({
      'type': data.type !== undefined ? data.type : "GET",
      'data': data,
      'url': (url ? url : URL) + ((url && (url.indexOf("?") !== -1)) ? "&" : "?") + "temistamp=" + (new Date()).GenerateTimestamp(5),
      'async': data.asy !== undefined ? data.asy : true,
      'dataType': data.dataType ? data.dataType : "json",
      "beforeSend": xhr => {
        xhr.withCredentials = true;
      },
      "crossDomain": true,
      'success': function (msg) {
        onSucc(msg);
      },
      'error': function (error, errorText) {
        var status = error.status,
          message;
        switch (status) {
          case 500:
            console.log(errorText);
          case 502:
            console.log(errorText);
            break;
          default:
            console.log(errorText);
            break;
        }
      },
      'complete': function (XMLHttpRequest, textStatus) {
        ajaxRequest = "";
      }
    });
  }
  return {
    GetData: function (url, data, succ) {
      ajax(url, data, function (msg) {
        succ(msg);
      });
    }
  };
})(window, jQuery);

