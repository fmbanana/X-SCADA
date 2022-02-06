if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// WidgetElement which inherit from ViewElement
/////////////////////////////////////////////////////////////////////////////////////
function WidgetElement(arg) {
    ViewElement.call(this, arg);

    this._borderStyle = arg.borderStyle;
    this._borderColor = arg.borderColor;
    this._backgroundColor = arg.backgroundColor;
    this._foregroundColor = arg.foregroundColor;
    this._font = arg.font;
}
WidgetElement.prototype = Object.create(ViewElement.prototype);

//////////////////////// Defined Properties //////////////////////////////
Object.defineProperty(WidgetElement.prototype, "borderStyle", {
    get: function() {
        return this.getBorderStyle();
    },
    set: function(val) {
        this.setBorderStyle(val);
    }
});

// Define Property for angle
Object.defineProperty(WidgetElement.prototype, "borderColor", {
    get: function() {
        return this.getBorderColor();
    },
    set: function(val) {
        this.setBorderColor(val);
    }
});

// Define Property for angle
Object.defineProperty(WidgetElement.prototype, "background", {
    get: function() {
        return this.getBackgroundColor();
    },
    set: function(val) {
        this.setBackgroundColor(val);
    }
});

// Define Property for angle
Object.defineProperty(WidgetElement.prototype, "foreground", {
    get: function() {
        return this.getForegroundColor();
    },
    set: function(val) {
        this.setForegroundColor(val);
    }
});

//////////////////// General function ////////////////////////////////
WidgetElement.prototype.setTransform = function (value) {
    $("#" + this._id).attr("transform", value);
}

WidgetElement.prototype.getBackgroundColor = function () {
    return this._backgroundColor;
}
WidgetElement.prototype.setBackgroundColor = function (value) {
}

WidgetElement.prototype.getBorderColor = function () {
    return this._borderColor;
}
WidgetElement.prototype.setBorderColor = function (value) {
}

WidgetElement.prototype.getBorderStyle = function () {
    return this._borderStyle;
}
WidgetElement.prototype.setBorderStyle = function (value) {
}

WidgetElement.prototype.getForegroundColor = function () {
    return this._foregroundColor;
}
WidgetElement.prototype.setForegroundColor = function (value) {
}

////////////////////////// Event Listener ///////////////////
// Add Event Listener
WidgetElement.prototype.addEventListener = function (type, callback, useCapture) {
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
WidgetElement.prototype.removeEventListener = function (type, callback, useCapture) {
    var view = this;
    page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
};

WidgetElement.prototype.newCallback = function (callback) {
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