// Generated by CoffeeScript 1.3.1
(function() {

  window.service_call = function(method, url, params, data, callback, progress) {
    var k, v;
    progress = progress || callback || data || params;
    callback = callback || data || params;
    data = data || params;
    if (progress === callback) {
      progress = void 0;
    }
    if (arguments.length === 4) {
      data = void 0;
    }
    if (arguments.length === 3) {
      params = void 0;
      data = void 0;
    }
    params = params || {};
    for (k in params) {
      v = params[k];
      if (!(v != null)) {
        delete params[k];
      }
    }
    return $.ajax({
      type: method,
      url: url + '?' + $.param(params),
      contentType: 'application/json',
      accepts: 'application/json',
      dataType: 'json',
      data: data ? JSON.stringify(data) : void 0,
      progress: progress,
      success: function(response) {
        var more;
        if (response.status === 'success') {
          more = void 0;
          if (response.more_cursor) {
            params.cursor = response.more_cursor;
            more = function(callback) {
              return service_call(method, url, params, callback);
            };
          }
          return callback(void 0, response.result, more);
        } else {
          return callback(response);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var error;
        error = {
          error_code: 'ajax_error',
          text_status: textStatus,
          error_thrown: errorThrown,
          jqXHR: jqXHR
        };
        try {
          if (jqXHR.responseText) {
            error = $.parseJSON(jqXHR.responseText);
          }
        } catch (e) {
          error = error;
        }
        LOG('service call error', error);
        return callback(error);
      }
    });
  };

}).call(this);
