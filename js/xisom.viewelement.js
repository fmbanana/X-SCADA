if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// ViewElement
/////////////////////////////////////////////////////////////////////////////////////
function ViewElement (arg) {
    this._id = arg.id;
    this._name = arg.id;
    this._visible = arg.visible;
    this._x = arg.x;
    this._y = arg.y;
    this._width = arg.width;
    this._height = arg.height;
    this._flipX = arg.flipX;
    this._flipY = arg.flipY;
    this._angle = arg.angle;
    this._level = arg.level;
    this._opacity = arg.opacity;
    this.tooltip = arg.tooltip;
    this.securityKey = arg.securityKey;
    this.attributes = {};
}

//////////////////////// Defined Properties //////////////////////////////
// Define id property
Object.defineProperty(ViewElement.prototype, "id", {
    get: function () {
        return this._id;
    }
});
// Define name property
Object.defineProperty(ViewElement.prototype, "name", {
    get: function () {
        return this._name;
    }
});
// Define Visible property
Object.defineProperty(ViewElement.prototype, "visible", {
    get: function () {
        return this.getVisible();
    },
    set: function (value) {
        this.setVisible(value);
    }
});
// Define X Position property
Object.defineProperty(ViewElement.prototype, "x", {
    get: function () {
        return this.getX();
    },
    set: function (value) {
        this.setX(value);
    }
});
// Define Y Position property
Object.defineProperty(ViewElement.prototype, "y", {
    get: function () {
        return this.getY();
    },
    set: function (value) {
        this.setY(value);
    }
});
// Define width property
Object.defineProperty(ViewElement.prototype, "width", {
    get: function () {
        return this.getWidth();
    },
    set: function (value) {
        this.setWidth(value);
    }
});
// Define heigh property
Object.defineProperty(ViewElement.prototype, "height", {
    get: function () {
        return this.getHeight();
    },
    set: function (value) {
        this.setHeight(value);
    }
});
// Define Property for angle
Object.defineProperty(ViewElement.prototype, "angle", {
    get: function () {
        return this.getAngle();
    },
    set: function (val) {
        this.setAngle(val);
    }
});
// Define level property
Object.defineProperty(ViewElement.prototype, "level", {
    get: function () {
        return this._level;
    }
});

// Define opacity property
Object.defineProperty(ViewElement.prototype, "opacity", {
    get: function () {
        return this.getOpacity();
    },
    set: function (value) {
        this.setOpacity(value);
    }
});


//////////////////// General function ////////////////////////////////
ViewElement.prototype.getRect = function () {
    return page.getRect(this);
}

ViewElement.prototype.getVisible = function () {
    return this._visible;
}

ViewElement.prototype.setVisible = function (value) {
    var visibility = value == true ? "visible" : "hidden";
    var pVisible = page.parentNodeVisibility(this._id);
    if (pVisible != null && pVisible != "visible") {
        visibility = pVisible;
    }

    $("#" + this._id).css('visibility', visibility);
    this._visible = value;
}

ViewElement.prototype.setVisibleByGroup = function (value) {
    if (value == false) {
        $("#" + this._id).css('visibility', "hidden");
        return;
    }
    if (this._visible == true) {
        $("#" + this._id).css('visibility', "visible");
    } else {
        $("#" + this._id).css('visibility', "hidden");
    }
}


ViewElement.prototype.getX = function () {
    return this._x;
}

ViewElement.prototype.setX = function (value) {
    this._x = value
}

ViewElement.prototype.getY = function () {
    return this._y;
}

ViewElement.prototype.setY = function (value) {
    this._y = value;
}

ViewElement.prototype.getWidth = function () {
    return this._width;
}

ViewElement.prototype.setWidth = function (value) {
    this._width = value;
}

ViewElement.prototype.getHeight = function () {
    return this._height;
}

ViewElement.prototype.setHeight = function (value) {
    this._height = value

}
ViewElement.prototype.getAngle = function () {
    return this._angle;
}
ViewElement.prototype.setAngle = function (value) {
    var cx = this.getX() + this.getWidth() / 2;
    var cy = this.getY() + this.getHeight() / 2;

    var rotateValue = value;
    var rotate = "";
    var flipOperate = "";
    var xPos = 2 * cx;
    var yPos = 2 * cy;
    if (this._flipX && this._flipY) {
        flipOperate = "translate(" + xPos + ", " + yPos + ") " + "scale(-1,-1) ";
    }
    else if (this._flipX) {
        if (value != 0 && value != 180)
            rotateValue = -value;
        flipOperate = "translate(" + xPos + ", 0) " + "scale(-1,1) ";
    }
    else if (this._flipY) {
        if (value != 0 && value != 180)
            rotateValue = -value;
        flipOperate = "translate(0, " + yPos + ") " + "scale(1,-1) ";
    }

    rotate = flipOperate + "rotate(" + rotateValue + ", " + cx + ", " + cy + ")";

    this.setTransform(rotate);
    this._angle = value;
}

ViewElement.prototype.getOpacity = function (value) {
    return this._opacity;
}
ViewElement.prototype.setOpacity = function (value) {
    $("#" + this._id).css("fill-opacity", value);
    this._opacity = value;
}

ViewElement.prototype.getFlipX = function () {
    return this._flipX;
}

ViewElement.prototype.setFlipX = function (value) {
    this._flipX = value;
}

ViewElement.prototype.getFlipY = function () {
    return this._flipY;
}

ViewElement.prototype.setFlipY = function (value) {
    this._flipY = value;
}

// Set a user attribute for ViewElement
ViewElement.prototype.setAttribute = function (attr, value) {
    this.attributes[attr] = value;
}

// Get user attribute of ViewElement
ViewElement.prototype.getAttribute = function (attr) {
    if (!(attr in this.attributes)) {
        return null;
    }
    return this.attributes[attr];
}

// Remove user attribute for ViewElement
ViewElement.prototype.removeAttribute = function (attr) {
    if (!(attr in this.attributes)) {
        return;
    }
    delete this.attributes[attr];
}

// Check an user attribute is available on ViewElement
ViewElement.prototype.hasAttribute = function (attr) {
    if (!(attr in this.attributes)) {
        return false;
    } else {
        return true;
    }
}

////////////////////////// Event Listener ///////////////////
// Add Event Listener
ViewElement.prototype.addEventListener = function (type, callback, useCapture) {
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
ViewElement.prototype.removeEventListener = function (type, callback, useCapture) {
    var view = this;
    page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
};

ViewElement.prototype.newCallback = function (callback) {
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


// (function () {
//     function ViewElementManager(){
//         this.name = "ViewElementCollection";
//         this.viewelements = [];
//         this.attributes = {};
//     }

//     // Define count property
//     Object.defineProperty(ViewElementManager.prototype, "count", {
//         get: function () {
//             return this.viewelements.length;
//         }
//     });

//     ViewElementManager.prototype.getAt = function(index) {
//         var items = this.viewelements;
//         var itemCount = items.length;
//         if(itemCount < 1 || index < 0 || itemCount <= index) return null;
//         return items[index];
//     }

//     ViewElementManager.prototype.getByName = function(name) {
//         var items = this.viewelements;
//         var itemCount = items.length;
//         for(var i = 0; i < itemCount; i ++){
//             var item = items[i];
//             if(item.name == name) return item;
//         }
//         return null;
//     }

//     // Set a user attribute for ViewElementManager
//     ViewElementManager.prototype.setAttribute = function (attr, value){
//         this.attributes[attr] = value;
//     }

//     // Get user attribute of ViewElementManager
//     ViewElementManager.prototype.getAttribute = function (attr){
//         if(!(attr in this.attributes)){
//             return null;
//         }
//         return this.attributes[attr];
//     }

//     // Remove user attribute for ViewElementManager
//     ViewElementManager.prototype.removeAttribute = function (attr){
//         if(!(attr in this.attributes)){
//             return;
//         }
//         delete this.attributes[attr];
//     }

//     // Check an user attribute is available on ViewElementManager
//     ViewElementManager.prototype.hasAttribute = function (attr){
//         if(!(attr in this.attributes)){
//             return false;
//         } else{ 
//             return true;
//         }
//     }

//     scada.createViewElementCollection = function(){
//         var viewmanager = new ViewElementManager();
//         return viewmanager;
//     }

// }());