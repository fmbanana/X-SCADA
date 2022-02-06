if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};


/////////////////////////////////////////////////////////////////////////////////////
// ShapeElement which inherit from ViewElement
/////////////////////////////////////////////////////////////////////////////////////

function ShapeElement (arg) {
    ViewElement.call(this, arg);
    this._fillOpacity = arg.fillOpacity;
    this._fillStyle = arg.fillStyle;
    this._strokeOpacity = arg.strokeOpacity;
    this._strokeStyle = arg.strokeStyle;
    this._lineWidth = arg.lineWidth;
    this._lineStyle = arg.lineStyle;
    this._lineCap = arg.lineCap;
    this._lineJoin = arg.lineJoin;
    this._miterLimit = arg.miterLimit;
}

ShapeElement.prototype = Object.create(ViewElement.prototype);

//////////////////////// Defined Properties //////////////////////////////
// Define Property for fillStyle
Object.defineProperty(ShapeElement.prototype, "fillStyle", {
    get: function() {
        return this.getFillStyle();
    },
    set: function(val) {
        this.setFillStyle(val);
    }
});
// Define Property for fillOpacity
Object.defineProperty(ShapeElement.prototype, "fillOpacity", {
    get: function() {
        return this.getFillOpacity();
    },
    set: function(val) {
        this.setFillOpacity(val);
    }
});
// Define Property for strokeStyle
Object.defineProperty(ShapeElement.prototype, "strokeStyle", {
    get: function() {
        return this.getStrokeStyle();
    },
    set: function(val) {
        this.setStrokeStyle(val);
    }
});
// Define Property for strokeOpacity
Object.defineProperty(ShapeElement.prototype, "strokeOpacity", {
    get: function() {
        return this.getStrokeOpacity();
    },
    set: function(val) {
        this.setStrokeOpacity(val);
    }
});
// Define Property for lineWidth
Object.defineProperty(ShapeElement.prototype, "lineWidth", {
    get: function() {
        return this.getLineWidth();
    },
    set: function(val) {
        this.setLineWidth(val);
    }
});
// Define Property for lineWidth
Object.defineProperty(ShapeElement.prototype, "lineStyle", {
    get: function() {
        return this.getLineStyle();
    },
    set: function(val) {
        this.setLineStyle(val);
    }
});
// Define Property for lineCap
Object.defineProperty(ShapeElement.prototype, "lineCap", {
    get: function() {
        return this.getLineCap();
    },
    set: function(val) {
        this.setLineCap(val);
    }
});
// Define Property for lineJoin
Object.defineProperty(ShapeElement.prototype, "lineJoin", {
    get: function() {
        return this.getLineJoin();
    },
    set: function(val) {
        this.setLineJoin(val);
    }
});
// Define Property for miterLimit 
Object.defineProperty(ShapeElement.prototype, "miterLimit", {
    get: function() {
        return this.getMiterLimit();
    },
    set: function(val) {
        this.setMiterLimit(val);
    }
});


//////////////////// General function ////////////////////////////////
ShapeElement.prototype.getPoints = function () {
    return $("#" + this._id).attr("points");
}

ShapeElement.prototype.setPoints = function (value) {
    $("#" + this._id).attr("points", value);
}

ShapeElement.prototype.setTransform = function (value) {
    $("#" + this._id).attr("transform", value);
}

ShapeElement.prototype.getFillStyle = function () {
    return this._fillStyle;
}

ShapeElement.prototype.setFillStyle = function (value) {
    $("#" + this._id).css("fill", value);
    this._fillStyle = value;
}

ShapeElement.prototype.getFillOpacity = function () {
    return this._fillOpacity;
}

ShapeElement.prototype.setFillOpacity = function (value) {
    $("#" + this._id).css("fill-opacity", value);
    this._fillOpacity = value;
}

ShapeElement.prototype.getStrokeStyle = function () {
    return this._strokeStyle;
}

ShapeElement.prototype.setStrokeStyle = function (value) {
    $("#" + this._id).css("stroke", value);
    this._strokeStyle = value;
}

ShapeElement.prototype.getStrokeOpacity = function () {
    return this._strokeOpacity;
}

ShapeElement.prototype.setStrokeOpacity = function (value) {
    d3.select("#" + this._id).style("stroke-opacity", value);
    this._strokeOpacity = value;
}
ShapeElement.prototype.setOpacity = function (value) {
    $("#" + this._id).css("fill-opacity", value);
    d3.select("#" + this._id).style("stroke-opacity", value);
    this._opacity = value;
}

ShapeElement.prototype.getLineWidth = function () {
    return this._lineWidth;
}

ShapeElement.prototype.setLineWidth = function (value) {
    d3.select("#" + this._id).style("stroke-width", value);
    this._lineWidth = value;
}
ShapeElement.prototype.getLineStyle = function () {
    return this._lineStyle;
}

ShapeElement.prototype.setLineStyle = function (value) {
    var linewidth = this.getLineWidth();
    var dashSize = linewidth + 5;
    var dotSize  = linewidth;
    var gapSize  = linewidth + 2;
    var dasharray   = "";
    if (value == "dash"){
        dasharray = dashSize + "," + gapSize;
    } else if (value == "dot"){
        dasharray = dotSize + "," + gapSize;
    } else if (value == "dashdot"){
        dasharray = dashSize + "," + gapSize + "," + dotSize + "," + gapSize;
    } else if (value == "dashdotdot"){
        dasharray = dashSize + "," + gapSize + "," + dotSize + "," + gapSize + "," + dotSize + "," + gapSize;
    } else{
        dasharray = "1,0";
    }
    d3.select("#" + this._id).style("stroke-dasharray", dasharray);
    this._lineStyle = value;
}

ShapeElement.prototype.getLineCap = function () {
    return this._lineCap;
}

ShapeElement.prototype.setLineCap = function (value) {
    d3.select("#" + this._id).style("stroke-linecap", value);
    this._lineCap = value;
}

ShapeElement.prototype.getLineJoin = function () {
    return this._lineJoin;
}

ShapeElement.prototype.setLineJoin = function (value) {
    d3.select("#" + this._id).style("stroke-linejoin", value);
    this._lineJoin = value;
}

ShapeElement.prototype.getMeterLimit = function () {
    return this._miterLimit;
}

ShapeElement.prototype.setMeterLimit = function (value) {
    d3.select("#" + this._id).style("stroke-miterlimit", value);
    this._miterLimit = value;
}

////////////////////////// Event Listener ///////////////////
// Add Event Listener
ShapeElement.prototype.addEventListener = function (type, callback, useCapture) {
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
ShapeElement.prototype.removeEventListener = function (type, callback, useCapture) {
    var view = this;
    page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
};

ShapeElement.prototype.newCallback = function (callback) {
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