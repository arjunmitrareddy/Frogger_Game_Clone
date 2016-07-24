(function() {
    var imageCache = [];
    var loading = [];
    var readyCallbacks = [];
    function load(singleOrMulti) { //accepts multiple image strings or single image string
        if (singleOrMulti instanceof Array) { //if array (multiple)
            singleOrMulti.forEach(function (imageStr) {
                _load(imageStr);
            })
        }
        else {
            _load(singleOrMulti);
        }
    }
    function _load(url) {
        if (imageCache[url]) {
            return imageCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                imageCache[url] = img;
                if (isReady()) {
                    readyCallbacks.forEach(function (cb) {
                        cb();
                    })
                }
            };
            imageCache[url] = false;
            img.src = url;
        }
    }
    function get(img) {
        return imageCache[img];
    }
    function onReady(cb) {
        readyCallbacks.push(cb);
    }
    function isReady() { //just safe condition
        var ready = true;
        for (var img in imageCache) {
            if (imageCache.hasOwnProperty(img) && !imageCache[img]) {
                ready = false;
            }
        }
        return ready;
    }
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    }
})();