/* jsonp.js, (c) Przemek Sobstel 2012, License: MIT */

var $jsonp = (function(){
  var that = {};

  that.send = function(src, options) {
    var options = options || {},
      callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10,
      uniqid = Math.ceil(Math.random()*1000);

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
      document.getElementById('_id'+uniqid).remove();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
      document.getElementById('_id'+uniqid).remove();
    };
    
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    script.id = '_id'+uniqid;

    document.getElementsByTagName('head')[0].appendChild(script);
  };

  return that;
})();

