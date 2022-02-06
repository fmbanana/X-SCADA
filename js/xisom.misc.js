if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// Image View
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function ImageView(arg) {
		
        ViewElement.call(this, arg);
        this._opacity = arg.opacity;
        this._imageWidth = arg.imageWidth;
        this._imageHeight = arg.imageHeight;
        this._animated = arg.animated;

		this.tag = null;
		this.customRepository = arg.customRepository;
		this.customUrlTag = null;
		this.customUrl = null;
		this.baseUrl = arg.baseUrl;
		this.animatableImage = arg.animatableImage;
		this.flipX = arg.flipX;
		this.flipY = arg.flipY;
        
	}
    ImageView.prototype = Object.create(ViewElement.prototype);
	ImageView.prototype.constructor = ImageView;
   
    // Define Property for opacity
    Object.defineProperty(ImageView.prototype, "opacity", {
        get: function() {
            return this.getOpacity();
        },
        set: function(val) {
            this.setOpacity(val);
	}
    });    

    // Define Property for animated
    Object.defineProperty(ImageView.prototype, "animated", {
        get: function() {
            return this.getAnimated();
        },
        set: function(val) {
            this.setAnimated(val);
	}
    });

    // Define Property for imageWidth
    Object.defineProperty(ImageView.prototype, "imageWidth", {
        get: function() {
            return this.getImageWidth();
		}
    });
        
    // Define Property for imageHeight
    Object.defineProperty(ImageView.prototype, "imageHeight", {
        get: function() {
            return this.getImageHeight();
	}
    });
	ImageView.prototype.setX = function (value) {
		//this.setAngle(this.getAngle());
        $("#" + this._id).attr("x", value);
        this._x = value;
		this.setAngle(this.getAngle());
	}

	ImageView.prototype.setY = function (value) {
		//this.setAngle(this.getAngle());
        $("#" + this._id).attr("y", value);
        this._y = value;
		this.setAngle(this.getAngle());
	}

	ImageView.prototype.setWidth = function (value) {
        $("#" + this._id).attr("width", value);
        this._width = value;
		this.setAngle(this.getAngle());
	}

	ImageView.prototype.setHeight = function (value) {
        $("#" + this._id).attr("height", value);
        this._height = value;
		this.setAngle(this.getAngle());
	}

	ImageView.prototype.getFlipX = function () {
		return this.flipX;
	}

	ImageView.prototype.getFlipY = function () {
		return this.flipY;
	}

	ImageView.prototype.getFlip = function () {
		var flipX = this.getFlipX();
		var flipY = this.getFlipY();
		var tranX = this.getX() + (this.getWidth() + this.getX());
		var tranY = this.getY() + (this.getHeight() + this.getY());

		var flip = "";
		if (flipX) flip += " translate(" + tranX + " 0) scale(-1 1)";
		if (flipY) flip += " translate(0 " + tranY + ") scale(1 -1)";
        //flipY == true ? $("#" + this._id).addClass("flipY") : $("#" + this._id).removeClass("flipY");

		return flip;
	}

	ImageView.prototype.setTransform = function (value) {
        $("#" + this._id).attr("transform", value);
	}

	ImageView.prototype.setAngle = function (value) {
		var x = this.getX();
		var y = this.getY();
		var width = this.getWidth();
		var height = this.getHeight();

		var cx = x + width / 2;
		var cy = y + height / 2;
		var flip = this.getFlip();
		var rotate = "rotate(" + value + ", " + cx + ", " + cy + ")" + flip;

		this.setTransform(rotate);
        this._angle = value;
	}

	ImageView.prototype.getOpacity = function () {
        return this._opacity;
	}

	ImageView.prototype.setOpacity = function (value) {
        $("#" + this._id).css("opacity", value);
        this._opacity = value;
	}

	ImageView.prototype.setFillStyle = function (value) {
	}

	ImageView.prototype.setFillOpacity = function (value) {
	}

	ImageView.prototype.setStrokeStyle = function (value) {
	}

	ImageView.prototype.setStrokeOpacity = function (value) {
	}

    ImageView.prototype.getImageWidth = function () {
        return this._imageWidth;
    }

    ImageView.prototype.getImageHeight = function () {
        return this._imageHeight;
    }

	ImageView.prototype.getAnimated = function () {
        return this._animated;
	}

	ImageView.prototype.setAnimated = function (value) {
        this._animated = value;
        if (this._animated == true) {
			this.startAnimated();
		} else {
			this.endAnimated();
		}
	}

	ImageView.prototype.setXlinkHref = function (value) {
		if(this.customUrl == "/_customRepository/" + value) return;
		this.customUrl = "/_customRepository/" + value;

        var href = $("#" + this._id).attr("xlink:href");
		href = this.customUrl;
        $("#" + this._id).attr("xlink:href", href);
	}

	ImageView.prototype.setBaseHref = function () {
		this.customUrl = "";
        var href = $("#" + this._id).attr("xlink:href");
		href = this.baseUrl;
        $("#" + this._id).attr("xlink:href", href);
	}

	ImageView.prototype.startAnimated = function () {
		if(this.customUrlTag != null) return;

        var href = $("#" + this._id).attr("xlink:href");
		href = href.replace(".png", ".gif");
        $("#" + this._id).attr("xlink:href", href);
	}

	ImageView.prototype.endAnimated = function () {
		if(this.customUrlTag != null) return;

        var href = $("#" + this._id).attr("xlink:href");
		href = href.replace(".gif", ".png");
        $("#" + this._id).attr("xlink:href", href);
	}
	ImageView.prototype.tagValueChanged = function (e) {
		var value = page.valueAsBool(e.value);
		this.setAnimated(value);
	}

	ImageView.prototype.urlTagValueChanged = function (e) {
		var value = page.valueAsString(e.value);

		if(value.length == 0){
			this.setBaseHref();
		}else{
			this.setXlinkHref(value);
		}
	}
	page.createImage = function (arg) {
		var view = new ImageView(arg);
		view.setAnimated(false);

		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view.tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
            });            
		} else {
			if (arg.animatableImage == true) {
				view.setAnimated(arg.animated);
			}
		}

		if (view.customRepository == true && arg.customUrlTag != "") {
			var tag = scada.getTagByName(arg.customUrlTag);
            console.tag;
			view.customUrlTag = tag;
			tag.addEventListener("change", function (event) {
				view.urlTagValueChanged(event);
			});
		}

		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// Text View
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function TextView(arg) {
		
        ShapeElement.call(this, arg);
		this.tag = arg.tag;
        this._text = arg.text;        
        this.align = arg.align;
		this.fontSize = arg.fontSize;
        this.lineAlign = arg.lineAlign;        
        this._autoSize = arg.autoSize;
		this.autoBaseFontSize = arg.autoBaseFontSize;
		this.autoBaseFontHeight = arg.autoBaseFontHeight;
		this.textFormat = arg.textFormat;
		this.nullText = typeof(arg.nullText) == "string" ? arg.nullText : null;
		this.tspan = arg.tspan;
	}
	TextView.prototype = Object.create(ShapeElement.prototype);
    TextView.prototype.constructor = TextView;

    // Define Property halign
    Object.defineProperty(TextView.prototype, "text", {
        get: function() {
            return this.getText();
        },
        set: function(val) {
            this.setText(val);
	}
    });
    
    // Define Property halign
    Object.defineProperty(TextView.prototype, "halign", {
        get: function() {
            return this.getLineAlign();
        },
        set: function(val) {
            this.setLineAlign(val);
		}
    });
    
    // Define Property text
    Object.defineProperty(TextView.prototype, "valign", {
        get: function() {
            return this.getTextAlign();
        },
        set: function(val) {
            this.setTextAlign(val);
	}
    });
    
    // Define Property text
    Object.defineProperty(TextView.prototype, "autoSize", {
        get: function() {
            return this.getAutoSize();
        },
        set: function(val) {
            this.setAutoSize(val);
		}
    });    

	TextView.prototype.setX = function (value) {

        $("#" + this._id).find("svg").attr("x", value);
        this._x = value;
		this.setAngle(this.getAngle());
	}

	TextView.prototype.setY = function (value) {
        $("#" + this._id).find("svg").attr("y", value);
        this._y = value;
		this.setAngle(this.getAngle());
	}

	TextView.prototype.setWidth = function (value) {
        $("#" + this._id).find("svg").attr("width", value);
        this._width = value;
		this.setAngle(this.getAngle());
	}

	TextView.prototype.setHeight = function (value, resize) {
        $("#" + this._id).find("svg").attr("height", value);
        this._height = value;

		if (typeof resize != "undefined" && resize == true) {
			if (this.getAutoSize() == true) {
				var height = this.getHeight();
				var bFontHeight = this.getAutoBaseFontHeight();
				var bFontSize = this.getAutoBaseFontSize();

				var hRatio = height / bFontHeight;
				var newSize = bFontSize * hRatio;
				this.setFontSize(newSize);
			}
			this.setText(this.getText());
		}

		this.setAngle(this.getAngle());
	}

	TextView.prototype.getAutoSize = function () {
        return this._autoSize;
	}

	TextView.prototype.setAutoSize = function (value) {
        return this._autoSize = value;
	}

	TextView.prototype.getAutoBaseFontHeight = function () {
		return this.autoBaseFontHeight;
	}

	TextView.prototype.setAutoBaseFontHeight = function (value) {
		return this.autoBaseFontHeight = value;
	}

	TextView.prototype.getAutoBaseFontSize = function () {
		return this.autoBaseFontSize;
	}

	TextView.prototype.setAutoBaseFontSize = function (value) {
		return this.autoBaseFontSize = value;
	}

	TextView.prototype.setTransform = function (value) {
        $("#" + this._id).attr("transform", value);
	}

	TextView.prototype.setAngle = function (value) {
		var x = this.getX();
		var y = this.getY();
		var width = this.getWidth();
		var height = this.getHeight();

		var cx = x + width / 2;
		var cy = y + height / 2;
		var rotate = "rotate(" + value + ", " + cx + ", " + cy + ")";

		this.setTransform(rotate);
        this._angle = value;
	}
	TextView.prototype.setFillStyle = function (value) {
        $("#" + this._id).find("svg text").css("fill", value);
        this._fillStyle = value;
	}

	TextView.prototype.setFillOpacity = function (value) {
        $("#" + this._id).find("svg text").css("fill-opacity", value);
        this._fillOpacity = value;
	}

	TextView.prototype.setStrokeStyle = function (value) {
        $("#" + this._id).find("svg text").css("stroke", value);
        this._strokeStyle = value;
	}

	TextView.prototype.setStrokeOpacity = function (value) {
        d3.select("#" + this._id).select("svg text").style("stroke-opacity", value);
        this._strokeOpacity = value;
	}

	TextView.prototype.getFontSize = function () {
		return this.fontSize;
	}

	TextView.prototype.setFontSize = function (fontSize) {
		var value = fontSize + "pt";
        $("#" + this._id).find("svg text").attr("font-size", value);
		this.fontSize = fontSize;
	}

	TextView.prototype.getTspanX = function () {
		return this.tspan.x;
	}

	TextView.prototype.getText = function () {
        return this._text;
	}

	TextView.prototype.setText = function (text) {
		if (text == null) {
			if (!this.nullText) return;
			text = this.nullText;
		}
		if (text == this._text) return;

        //var obj = d3.select("#" + this._id).select("svg text");
        var obj = $("#" + this._id).find("svg text");
		obj.text("");

		var lineAlign = this.getLineAlign();
		var height = this.getHeight();
		var fontSize = this.getFontSize();
		var fontHeight = page.pointsToPixel(fontSize);
		var lines = text.replace("&quot;", "\"").replace(/\n/ig, '<br/>').split("<br/>");

		var tspanX = this.getTspanX();
		var tspanY = 0;
		var marginY = 8;
		var offset = 2;
		//---------------------------------------------------------- text tspan
		var linesCount = lines.length;
		var tspan = '';
		var generateTSpan = function (x, y, text) {
			var xmlns = "http://www.w3.org/2000/svg";
			var tspanElement = document.createElementNS(xmlns, 'tspan');
			tspanElement.setAttribute('x', x);
			tspanElement.setAttribute('y', y);
			tspanElement.setAttribute('xml:space', 'preserve');
			var tspanContent = document.createTextNode(text);
			tspanElement.appendChild(tspanContent);
			return tspanElement;
		};
		if (linesCount >= 2) {
			for (var i = 0; i < linesCount; i++) {
				var lineText = lines[i];
				tspanY += fontHeight;
				tspanY += i == 0 ? 0 : 2;
				//obj.append("tspan").attr("x", tspanX).attr("y", tspanY).attr("xml:space", "preserve").text(lineText);
				var newTspanElement = generateTSpan(tspanX, tspanY, lineText);
				obj[0].appendChild(newTspanElement);
			}
		} else {

			if (lineAlign == "Bottom") {
				tspanY = height - marginY + offset;
			} else if (lineAlign == "Middle") {
				tspanY = height / 2 + fontHeight / 2 - marginY / 2 + offset;
			} else {
				tspanY = fontHeight;
			}

			tspanY = tspanY > 0 ? Math.floor(tspanY) : Math.ceil(tspanY);
			var newTspanElement = generateTSpan(tspanX, tspanY, text);
			obj[0].appendChild(newTspanElement);
		}


		//---------------------------------------------------------- text transform
		var transform = "translate(0, 0)";
		if (lines.length >= 2) {
			var txtHeight = tspanY;
			marginY = height > txtHeight ? 0 : marginY;

			var transY = 0;
			if (lineAlign == "Bottom") {
				transY = height - txtHeight - marginY / 2 - offset;
			} else if (lineAlign == "Middle") {
				transY = height / 2 - txtHeight / 2 + marginY / 2 - offset;
			}

			transY = Math.floor(Math.max(0, transY));
			transform = "translate(0, " + transY + ")";
		}

		// Get Flip Transfom setting and update transform
		var oldTransform = obj[0].attributes.transform.textContent;
		var startIndex = "translate(0, 0)".length;
		var endIndex = oldTransform.length;
		var flipTransform = oldTransform.substring(startIndex, endIndex);
		transform += flipTransform;

		obj.attr("transform", transform)
        this._text = text;
	}

	TextView.prototype.getLineAlign = function () {
		return this.lineAlign;
	}

	TextView.prototype.setLineAlign = function (value) {
        this.lineAlign = value;
        this.setText(this.getText());
	}

    TextView.prototype.getTextAlign = function () {
        return this.align;
    }

    TextView.prototype.setTextAlign = function (value) {
        this.align = value;
        this.setText(this.getText());
    }

	TextView.prototype.getTextFormat = function () {
		return this.textFormat;
	}

	TextView.prototype.tagValueChanged = function (e) {
		if (e.status == 0 || !this.nullText) {
			var textFormat = this.getTextFormat();
			var value = page.getValueByFormat(this.tag, textFormat, e.valueString);
			this.setText(value);
		}
	}

	TextView.prototype.tagStatusChanged = function (e) {
		if (!this.nullText) return;
		
		if (e.status != 0) {
			this.setText(null);
		} else {
			var textFormat = this.getTextFormat();
			var value = page.getValueByFormat(this.tag, textFormat, e.valueString);
			this.setText(value);
		}
	}

	page.createText = function (arg) {
		var view = new TextView(arg);
		var initText = arg.text;
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view.tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
			if (typeof(arg.nullText) == "string") {
				tag.addEventListener("status", function (event) {
					view.tagStatusChanged(event);
				});
			}
			if(tag.type == "digital"){
				initText = (tag.value) ? tag.onText.toString() : tag.offText.toString();
			} else {
				initText = (tag.value != null) ? tag.value.toString() : view.nullText;
			}

			var textFormat = view.getTextFormat();
			initText= page.getValueByFormat(tag, textFormat, initText);
		}
		view.setText(initText);
		page.protoViews[arg.id] = view;
		return view;
	}

})();