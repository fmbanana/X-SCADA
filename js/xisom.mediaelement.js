if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// MediaElement
/////////////////////////////////////////////////////////////////////////////////////
function MediaElement (arg) {
    ViewElement.call(this, arg);

    this.tag = null;

    this._autoPlay = arg.autoPlay;
    this._controls = arg.controls;
    this._loop = arg.loop;
    this._duration  = arg.duration;
    this._seekable = arg.seekable;
    this._currentTime = arg.currentTime;
    this._volume = arg.volume;
    this._rate = arg.rate;
    this._muted = arg.muted;
    
}
MediaElement.prototype = Object.create(ViewElement.prototype);

//////////////////////// Defined Properties //////////////////////////////

Object.defineProperty(MediaElement.prototype, "url", {
    get: function() {
        //console.log("=====================>");
        return this.getURL();
    },
    set: function(value){
        this.setURL(value);
    }
});
Object.defineProperty(MediaElement.prototype, "control", {
    get: function() {
        return this.getControls();
    },
    set: function(value){
        this.setControls(value);
    }
});
Object.defineProperty(MediaElement.prototype, "autoPlay", {
    get: function() {
        return this.getAutoPlay();
    },
    set: function(value){
        this.setAutoPlay(value);
    }
});
Object.defineProperty(MediaElement.prototype, "loop", {
    get: function() {
        return this.getLoop();
    },
    set: function(value){
        this.setLoop(value);
    }
});
Object.defineProperty(MediaElement.prototype, "duration", {
    get: function() {
        return this.getDuration();
    }
});
Object.defineProperty(MediaElement.prototype, "seekable", {
    get: function() {
        return this.getSeekable();
    }
});
Object.defineProperty(MediaElement.prototype, "currentTime", {
    get: function() {
        return this.getCurrentTime();
    },
    set: function(value){
        this.setCurrentTime(value);
    }
});
Object.defineProperty(MediaElement.prototype, "volume", {
    get: function() {
        return this.getVolume();
    },
    set: function(value){
        this.setVolume(value);
    }
});
Object.defineProperty(MediaElement.prototype, "playRate ", {
    get: function() {
        return this.getRate();
    },
    set: function(value){
        this.setRate(value);
    }
});
Object.defineProperty(MediaElement.prototype, "readyState", {
    get: function() {
        return this.getReadyState();
    }
});
Object.defineProperty(MediaElement.prototype, "played", {
    get: function() {
        return this.getPlayed();
    }
});
Object.defineProperty(MediaElement.prototype, "paused", {
    get: function() {
        return this.getPaused();
    }
});
Object.defineProperty(MediaElement.prototype, "ended", {
    get: function() {
        return this.getEnded();
    }
});
Object.defineProperty(MediaElement.prototype, "seeking", {
    get: function() {
        return this.getSeeking();
    }
});





//////////////////////// General function ////////////////////////////////
MediaElement.prototype.getRect = function () {
    return page.getRect(this);
}
MediaElement.prototype.setVisible = function (value) {
    var visibility = value == true ? "visible" : "hidden";
    var pVisible = page.parentNodeVisibility(this._id);
    if (pVisible != null && pVisible != "visible") {
        visibility = pVisible;
    }

    $("#" + this._id).attr("visibility", visibility);
    this._visible = value;
}
MediaElement.prototype.setX = function (value) {
    $("#" + this._id).attr("x", value);
    this._x = value;
}
MediaElement.prototype.setY = function (value) {
    $("#" + this._id).attr("y", value);
    this._y = value;
}
MediaElement.prototype.setWidth = function (value) {
    $("#" + this._id).attr("width", value);
    this._width = value;
}
MediaElement.prototype.setHeight = function (value) {
    $("#" + this._id).attr("height", value);
    this._height = value;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------
MediaElement.prototype.getURL = function () {
    return page.getElementById(this._id).getAttribute("src");
}
MediaElement.prototype.setURL = function (value) {
    page.getElementById(this._id).setAttribute("src", value);
}

MediaElement.prototype.getControls = function () {
    return this._controls;
}

MediaElement.prototype.setControls = function (value) {
    var attrValue = value == true ? "controls" : null;
    $("#" + this._id).attr("controls", attrValue);
    this._controls = value;
}

MediaElement.prototype.getAutoPlay = function () {
    return this._autoPlay;
}

MediaElement.prototype.setAutoPlay = function (value) {
    var attrValue = value == true ? "autoplay" : null;
    $("#" + this._id).attr("autoplay", attrValue);
    this._autoPlay = value;
}

MediaElement.prototype.getLoop = function () {
    return this._loop;
}

MediaElement.prototype.setLoop = function (value) {
    var attrValue = value == true ? "loop" : null;
    $("#" + this._id).attr("loop", attrValue);
    this._loop = value;
}
MediaElement.prototype.getDuration = function () {
    page.getElementById(this._id).duration;
    return this._duration;
}

MediaElement.prototype.getSeekable = function () {
    if(page.getElementById(this._id).seekable.length > 0) return true
    else return false;
}

MediaElement.prototype.getMuted = function () {
    return this._muted;
}

MediaElement.prototype.setMuted = function (value) {
    var attrValue = value == true ? "muted" : null;
    $("#" + this._id).attr("muted", attrValue);
    this._muted = value;
}

MediaElement.prototype.getRate = function () {
    return this._rate;
}

MediaElement.prototype.setRate = function (value) {
    $("#" + this._id).attr("playbackRate", value);
    this._rate = value;
}

MediaElement.prototype.getVolume = function () {
    return this._volume;
}

MediaElement.prototype.setVolume = function (value) {
    $("#" + this._id).attr("volume", value);
    this._volume = value;
}

MediaElement.prototype.getCurrentTime = function (value) {
    return this._currentTime;
}

MediaElement.prototype.setCurrentTime = function (value) {
    page.getElementById(this._id).currentTime = value;
    this._currentTime = value;
}

MediaElement.prototype.getReadyState = function (value) {
    return page.getElementById(this._id).readyState;
}

MediaElement.prototype.getSeeking = function (value) {
    return page.getElementById(this._id).seeking;
}

MediaElement.prototype.getPlayed = function () {
    return page.getElementById(this._id).paused == false;
}

MediaElement.prototype.getPaused = function () {
    return page.getElementById(this._id).paused == true;
}

MediaElement.prototype.getEnded = function () {
    return page.getElementById(this._id).ended;
}

MediaElement.prototype.stop = function () {
    this.setCurrentTime(0);
    this.pause();
}

MediaElement.prototype.pause = function () {
    page.getElementById(this._id).pause();
}

MediaElement.prototype.play = function () {
    page.getElementById(this._id).play();
}

MediaElement.prototype.setPlay = function (value) {
    if (page.getElementById(this._id).seekable.length > 0) {
        this.setCurrentTime(0);
    }
    value == true ? this.play() : this.pause();
}

MediaElement.prototype.tagValueChanged = function (e) {
    var value = page.valueAsBool(e.value);
    this.setPlay(value);
}


////////////////////////// Event Listener ///////////////////
// Add Event Listener
MediaElement.prototype.addEventListener = function (type, callback, useCapture) {
    var view = this;
    if (type == "click" || type == "dblclick" || type == "mousedown") {
        page.getElementById(this._id).addEventListener("mouseover", function (event) {
            page.onMouseOver(event, view);
        }, false);
        page.getElementById(this._id).addEventListener("mouseout", function (event) {
            page.onMouseOut(event, view);
        }, false);
    }
    page.getElementById(this._id).addEventListener(type, view.newCallback(callback), useCapture);
};
// Remove Event Listener
MediaElement.prototype.removeEventListener = function (type, callback, useCapture) {
    var view = this;
    page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
};

MediaElement.prototype.newCallback = function (callback) {
    var view = this;
    if (view.securityKey != "undefined" && view.securityKey.length > 0) {
        if (scada.activeSession == "undefined" || scada.activeSession == null) {
            return;
        } else if (scada.activeSession.keys.indexOf(view.securityKey) < 0) {
            return;
        }
    }
    return callback;
}