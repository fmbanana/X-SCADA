if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// AudioPlayerView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function AudioPlayerView(arg) {
        
        MediaElement.call(this, arg);
    }
    AudioPlayerView.prototype = Object.create(MediaElement.prototype);
    AudioPlayerView.prototype.constructor = AudioPlayerView;

    page.createAudioPlayer = function (arg) {
        var view = new AudioPlayerView(arg);

        if (arg.tag != "") {
            var tag = scada.getTagByName(arg.tag);
            view.tag = tag;
            tag.addEventListener("change", function (event) {
                view.tagValueChanged(event);
            });
            view.setAutoPlay(false);
            view.setPlay(false);
        }

        page.protoViews[arg.id] = view;
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// VideoPlayerView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function VideoPlayerView(arg) {
        
        MediaElement.call(this, arg);
    }
    VideoPlayerView.prototype = Object.create(MediaElement.prototype);
    VideoPlayerView.prototype.constructor = VideoPlayerView;

    page.createVideoPlayer = function (arg) {
        var view = new VideoPlayerView(arg);

        if (arg.tag != "") {
            var tag = scada.getTagByName(arg.tag);
            view.tag = tag;
            tag.addEventListener("change", function (event) {
                view.tagValueChanged(event);
            });
            view.setAutoPlay(false);
            view.setPlay(false);
        }

        page.protoViews[arg.id] = view;
        return view;
    }
})();

/////////////////////////////////////////////////////////////////////////////////////
// CameraPlayerView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function CameraPlayerView(arg) {
        this.id = arg.id;        
        this.visible = arg.visible;
        this.x = arg.x;
        this.y = arg.y;
        this.width = arg.width;
        this.height = arg.height;
        
        this.tag = null;
        this.url = arg.url;
        this.autoPlay = arg.autoplay;
        this.controls = arg.controls;
        this.loop = arg.loop;
        this.muted = arg.muted;
        this.rate = arg.rate;
        this.volume = arg.volume;

        this.securityKey = arg.securityKey;
        this.attributes = {};
        
        this.isStarted = false;
        this.cameraID = arg.cameraID;
        this.websocketServerIP = arg.websocketServerIP;
        this.websocketServerPort = arg.websocketServerPort;
        this.websocketURL = "ws://" + arg.websocketServerIP + ":" +arg.websocketServerPort;
        this.ws = null;
        this.pc = new RTCPeerConnection(null);;
    }

    CameraPlayerView.prototype.startCamera = function(videotagID, camID) {
        var view = this;
        if(view.isStarted) return;
        // pc = new RTCPeerConnection({ iceServers: [{ urls: STUN_URL }] });
        var socketURL = view.websocketURL + "/" + camID;

        // pc.ontrack = onTrackHandler;
        view.pc.ontrack = (evt) => {
            document.querySelector('#' + videotagID).srcObject = evt.streams[0];
        };
        view.pc.onicecandidate = evt => evt.candidate && view.ws.send(JSON.stringify(evt.candidate));

        // Diagnostics.
        view.pc.onicegatheringstatechange = () => console.log("onicegatheringstatechange: " + view.pc.iceGatheringState);
        view.pc.oniceconnectionstatechange = () => console.log("oniceconnectionstatechange: " + view.pc.iceConnectionState);
        view.pc.onsignalingstatechange = () => console.log("onsignalingstatechange: " + view.pc.signalingState);
        view.pc.onconnectionstatechange = () => console.log("onconnectionstatechange: " + view.pc.connectionState);

        view.ws = new WebSocket(socketURL, []);
        view.ws.onmessage = function (evt) {
            if (/^[\{"'\s]*candidate/.test(evt.data)) {
                view.pc.addIceCandidate(JSON.parse(evt.data));
            }
            else {
                view.pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(evt.data)));
                view.pc.createAnswer()
                    .then((answer) => view.pc.setLocalDescription(answer))
                    .then(() => view.ws.send(JSON.stringify(view.pc.localDescription)));
            }
        };

        view.isStarted = true;
    };

    CameraPlayerView.prototype.stopCamera = function() {
        this.pc.close();
        this.ws.close();
        this.isStarted = false;
    };

    CameraPlayerView.prototype.getRect = function () {
        return page.getRect(this);
    }

    CameraPlayerView.prototype.getVisible = function () {
        return this.visible;
    }

    CameraPlayerView.prototype.setVisible = function (value) {
        var visibility = value == true ? "visible" : "hidden";
        var pVisible = page.parentNodeVisibility(this.id);
        if (pVisible != null && pVisible != "visible") {
            visibility = pVisible;
        }

        d3.select("#" + this.id).style("visibility", visibility);
        this.visible = value;
    }

    CameraPlayerView.prototype.setVisibleByGroup = function (value) {
        if (value == false) {
            d3.select("#" + this.id).style("visibility", "hidden");
            return;
        }
        if (this.visible == true) {
            d3.select("#" + this.id).style("visibility", "visible");
        } else {
            d3.select("#" + this.id).style("visibility", "hidden");
        }
    }

    CameraPlayerView.prototype.getX = function () {
        return this.x;
    }

    CameraPlayerView.prototype.setX = function (value) {
        $("#" + this.id).attr("x", value);
        this.x = value;
    }

    CameraPlayerView.prototype.getY = function () {
        return this.y;
    }

    CameraPlayerView.prototype.setY = function (value) {
        $("#" + this.id).attr("y", value);
        this.y = value;
    }

    CameraPlayerView.prototype.getWidth = function () {
        return this.width;
    }

    CameraPlayerView.prototype.setWidth = function (value) {
        $("#" + this.id).attr("width", value);
        this.width = value;
    }

    CameraPlayerView.prototype.getHeight = function () {
        return this.height;
    }

    CameraPlayerView.prototype.setHeight = function (value) {
        $("#" + this.id).attr("height", value);
        this.height = value;
    }

    CameraPlayerView.prototype.getURL = function () {
        return this.url;
    }

    CameraPlayerView.prototype.setURL = function (value) {
        $("#" + this.id).attr("src", value);
        this.url = url;
    }

    CameraPlayerView.prototype.setAngle = function (value) {
    }

    CameraPlayerView.prototype.setOpacity = function (value) {
    }

    CameraPlayerView.prototype.setFillStyle = function (value) {
    }

    CameraPlayerView.prototype.setFillOpacity = function (value) {
    }

    CameraPlayerView.prototype.setStrokeStyle = function (value) {
    }

    CameraPlayerView.prototype.setStrokeOpacity = function (value) {
    }

    CameraPlayerView.prototype.getAutoPlay = function () {
        return this.autoPlay;
    }

    CameraPlayerView.prototype.setAutoPlay = function (value) {
        var attrValue = value == true ? "autoplay" : null;
        $("#" + this.id).attr("autoplay", attrValue);
        this.autoPlay = value;
    }

    CameraPlayerView.prototype.getControls = function () {
        return this.controls;
    }

    CameraPlayerView.prototype.setControls = function (value) {
        var attrValue = value == true ? "controls" : null;
        $("#" + this.id).attr("controls", attrValue);
        this.controls = value;
    }

    CameraPlayerView.prototype.getLoop = function () {
        return this.loop;
    }

    CameraPlayerView.prototype.setLoop = function (value) {
        var attrValue = value == true ? "loop" : null;
        $("#" + this.id).attr("loop", attrValue);
        this.loop = value;
    }

    CameraPlayerView.prototype.getMuted = function () {
        return this.muted;
    }

    CameraPlayerView.prototype.setMuted = function (value) {
        var attrValue = value == true ? "muted" : null;
        $("#" + this.id).attr("muted", attrValue);
        this.muted = value;
    }

    CameraPlayerView.prototype.getRate = function () {
        return this.rate;
    }

    CameraPlayerView.prototype.setRate = function (value) {
        $("#" + this.id).attr("playbackRate", value);
        this.rate = value;
    }

    CameraPlayerView.prototype.getVolume = function () {
        return this.volume;
    }

    CameraPlayerView.prototype.setVolume = function (value) {
        $("#" + this.id).attr("volume", value);
        this.volume = value;
    }

    CameraPlayerView.prototype.currentTime = function (value) {
        page.getElementById(this.id).currentTime = value;
    }

    CameraPlayerView.prototype.pause = function () {
        page.getElementById(this.id).pause();
    }

    CameraPlayerView.prototype.play = function () {        
        this.startCamera(this.id, this.cameraID);
        var camera = page.getElementById(this.id);
        var promise = camera.play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
                
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                console.log(error);
                camera.play();
            });
        }
    }

    CameraPlayerView.prototype.stop = function () {
        this.stopCamera();
        page.getElementById(this.id).pause();
    }

    CameraPlayerView.prototype.setPlay = function (value) {
        value == true ? this.play() : this.pause();
    }

    CameraPlayerView.prototype.addEventListener = function (type, callback, useCapture) {
        var view = this;  
        page.getElementById(this.id).addEventListener(type, view.newCallback(callback), useCapture);
    };

    CameraPlayerView.prototype.removeEventListener = function (type, callback, useCapture) {
        var view = this;
        page.getElementById(this.id).removeEventListener(type, view.newCallback(callback), useCapture);
    };

    CameraPlayerView.prototype.newCallback = function (callback) {
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

    CameraPlayerView.prototype.tagValueChanged = function (e) {
        var value = page.valueAsBool(e.value);
        this.setPlay(value);
    }

    page.createCameraPlayer = function (arg) {
        var view = new CameraPlayerView(arg);

        if (arg.tag != "") {
            var tag = scada.getTagByName(arg.tag);
            view.tag = tag;
            tag.addEventListener("change", function (event) {
                view.tagValueChanged(event);
            });
            view.setAutoPlay(false);
            view.setPlay(false);
        }
        if(view.autoPlay)
        {
            view.play();
        }

        page.protoViews[arg.id] = view;
        return view;
    }
})();