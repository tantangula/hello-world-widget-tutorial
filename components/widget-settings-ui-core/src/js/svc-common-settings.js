angular.module("risevision.widget.common")
  .constant("STORAGE_URL_BASE", "storage.googleapis.com/risemedialibrary-")
  .factory("commonSettings", ["$log", "STORAGE_URL_BASE", function ($log, STORAGE_URL_BASE) {

    var factory = {
      getStorageUrlData: function (url) {
        var storage = {},
          str, arr, params, pair;

        if (url.indexOf(STORAGE_URL_BASE) !== -1) {
          str = url.split(STORAGE_URL_BASE)[1];
          str = decodeURIComponent(str.slice(str.indexOf("/") + 1));
          arr = str.split("/");

          storage.folder = (typeof arr[arr.length - 2] !== "undefined" && arr[arr.length - 2] !== null) ?
            arr[arr.length - 2] : "";
          storage.fileName = arr[arr.length - 1];
        }
        // Check if a folder was selected.
        else {
          params = url.split("?");

          for (var i = 0; i < params.length; i++) {
            pair = params[i].split("=");

            if (pair[0] === "prefix") {
              storage.folder = decodeURIComponent(pair[1]);
              storage.fileName = "";
              break;
            }
          }
        }

        return storage;
      }
    };

    return factory;
  }]);
