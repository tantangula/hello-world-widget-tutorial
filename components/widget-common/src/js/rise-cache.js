var RiseVision = RiseVision || {};
RiseVision.Common = RiseVision.Common || {};

RiseVision.Common.RiseCache = (function () {
  "use strict";

  function getUrl() {
    return "http://localhost:9494/?url=";
  }

  function ping(callback) {
    var r = new XMLHttpRequest();

    if (callback && typeof callback !== "function") {
      return;
    }

    r.open("GET", "http://localhost:9494/ping", true);
    r.onreadystatechange = function () {
      try {
        if (r.readyState === 4 ) {
          if(r.status === 200){
            callback(true, r.responseText);
          } else {
            console.debug("Rise Cache is not running");
            callback(false, null);
          }
        }
      }
      catch (e) {
        console.debug("Caught exception: ", e.description);
      }

    };
    r.send();
  }

  return {
    ping: ping,
    getUrl:  getUrl
  };

})();
