if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// LabelView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function LabelView(arg) {
		
		WidgetElement.call(this, arg);
		this._text = arg.text;
		this._radius = arg.radius;
		this._autoSize = arg.autoSize;

		this.tag = arg.tag;
		this.fontSize = arg.fontSize;
		this.lineAlign = arg.lineAlign;
		this.align = arg.align;
		this.autoBaseFontSize = arg.autoBaseFontSize;
		this.autoBaseFontHeight = arg.autoBaseFontHeight;
		this.textFormat = arg.textFormat;
		this.nullText = typeof (arg.nullText) == "string" ? arg.nullText : null;
		this.tspan = arg.tspan;
	}
	LabelView.prototype = Object.create(WidgetElement.prototype);
	LabelView.prototype.constructor = LabelView;

	// Define Property Radius for text
	Object.defineProperty(LabelView.prototype, "text", {
		get: function () {
			return this.getText();
		},
		set: function (val) {
			this.setText(val);
		}
	});

	// Define Property Radius for label
	Object.defineProperty(LabelView.prototype, "radius", {
		get: function () {
			return this.getRadius();
		},
		set: function (val) {
			this.setRadius(val);
		}
	});

	// Define Property Radius for autoSize
	Object.defineProperty(LabelView.prototype, "autoSize", {
		get: function () {
			return this.getAutoSize();
		},
		set: function (val) {
			this.setAutoSize(val);
		}
	});

	LabelView.prototype.setX = function (value) {
		$("#" + this._id).find("svg").attr("x", value);
		this._x = value;
		this.setAngle(this.getAngle());
	}

	LabelView.prototype.setY = function (value) {
		$("#" + this._id).find("svg").attr("y", value);
		this._y = value;
		this.setAngle(this.getAngle());
	}

	LabelView.prototype.setWidth = function (value) {
		$("#" + this._id).find("svg").attr("width", value);
		this.setRectWidth(value);
		this._width = value;
		this.setAngle(this.getAngle());
	}

	LabelView.prototype.setRectWidth = function (value) {
		$("#" + this._id).find("svg rect").attr("width", value);
	}

	LabelView.prototype.setHeight = function (value, resize) {
		$("#" + this._id).find("svg").attr("height", value);
		this.setRectHeight(value);
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

	LabelView.prototype.setRectHeight = function (value) {
		$("#" + this._id).find("svg rect").attr("height", value);
	}

	LabelView.prototype.setAngle = function (value) {
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

	LabelView.prototype.setOpacity = function (value) {
		this.setRectOpacity(value);
		this.setTextOpacity(value);
		this.opacity = value;
	}

	LabelView.prototype.setRectOpacity = function (value) {
		$("#" + this._id).find("svg rect").css("fill-opacity", value);
		$("#" + this._id).find("svg rect").css("stroke-opacity", value);
	}

	LabelView.prototype.setTextOpacity = function (value) {
		$("#" + this._id).find("svg text").css("fill-opacity", value);
	}

	LabelView.prototype.setBackgroundColor = function (value) {
		if (!value) value = "none";

		$("#" + this._id).find("svg rect").css("fill", value);
		this._backgroundColor = value;
	}

	LabelView.prototype.setBorderColor = function (value) {
		if (!value) value = "none";
		$("#" + this._id).find("svg rect").css("stroke", value);
		this._borderColor = value;
	}

	LabelView.prototype.setBorderStyle = function (value) {
		value = value == "Simple" ? 1 : 0;
		$("#" + this._id).find("svg rect").css("stroke-width", value + 'px');
		this._borderStyle = value;
	}

	LabelView.prototype.setForegroundColor = function (value) {
		if (!value) value = "none";
		$("#" + this._id).find("svg text").css("fill", value);
		$("#" + this._id).find("svg text").css("stroke", value);
		this._foregroundColor = value;
	}

	LabelView.prototype.getAutoSize = function () {
		return this._autoSize;
	}

	LabelView.prototype.setAutoSize = function (value) {
		return this._autoSize = value;
	}

	LabelView.prototype.getAutoBaseFontHeight = function () {
		return this.autoBaseFontHeight;
	}

	LabelView.prototype.setAutoBaseFontHeight = function (value) {
		return this.autoBaseFontHeight = value;
	}

	LabelView.prototype.getAutoBaseFontSize = function () {
		return this.autoBaseFontSize;
	}

	LabelView.prototype.setAutoBaseFontSize = function (value) {
		return this.autoBaseFontSize = value;
	}

	LabelView.prototype.getFontSize = function () {
		return this.fontSize;
	}
	LabelView.prototype.setFontSize = function (fontSize) {
		var value = fontSize + "pt";
		$("#" + this._id).find("svg text").attr("font-size", value);
		this.fontSize = fontSize;
	}
	LabelView.prototype.setFontFamily = function (fontFamily) {
		var value = fontFamily;
		$("#" + this._id).find("svg text").attr("font-family", value);
		this.fontFamily = fontFamily;
	}
	LabelView.prototype.setFontWeight = function (fontWeight) {
		var value = fontWeight;
		$("#" + this._id).find("svg text").attr("font-weight", value);
		this.fontWeight = fontWeight;
	}
	LabelView.prototype.setFontStyle = function (fontStyle) {
		var value = fontStyle;
		$("#" + this._id).find("svg text").attr("font-style", value);
		this.fontStyle = fontStyle;
	}

	LabelView.prototype.getRadius = function () {
		return this._radius;
	}
	LabelView.prototype.setRadius = function (value) {
		if (value < 0) return;
		$("#" + this._id).find("svg rect").attr("rx", value)
		$("#" + this._id).find("svg rect").attr("ry", value)
		this._radius = value;
	}

	LabelView.prototype.getTspanX = function () {
		return this.tspan.x;
	}

	LabelView.prototype.getText = function () {
		return this._text;
	}

	LabelView.prototype.setText = function (text) {
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
		//var lines = text.replace("&quot;", "\"").replace("\n", "<br/>").split("<br/>");
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

	LabelView.prototype.getLineAlign = function () {
		return this.lineAlign;
	}

	LabelView.prototype.setLineAlign = function (value) {
		return this.lineAlign = value;
	}

	LabelView.prototype.getTextFormat = function () {
		return this.textFormat;
	}

	LabelView.prototype.tagValueChanged = function (e) {
		if (e.status == 0 || !this.nullText) {
			var textFormat = this.getTextFormat();
			var value = page.getValueByFormat(this.tag, textFormat, e.valueString);
			this.setText(value);
		}
	}

	LabelView.prototype.tagStatusChanged = function (e) {
		if (!this.nullText) return;

		if (e.status != 0) {
			this.setText(null);
		} else {
			var textFormat = this.getTextFormat();
			var value = page.getValueByFormat(this.tag, textFormat, e.valueString);
			this.setText(value);
		}
	}

	page.createLabel = function (arg) {
		var view = new LabelView(arg);
		var initText = arg.text;
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view.tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
			if (typeof (arg.nullText) == "string") {
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
			initText = page.getValueByFormat(tag, textFormat, initText);
		}
		view.setText(initText);
		page.protoViews[arg.id] = view;

		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// QRBarCodeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function QRBarCodeView(arg) {
		
		WidgetElement.call(this, arg);

		this._tag = arg.tag;
		this._text = arg.text;
		this._codetype = arg.codetype;
		this._alignment = arg.alignment;

		this.fontSize = arg.fontSize;
		this.align = arg.align;
		this.autoBaseFontSize = arg.autoBaseFontSize;
		this.autoBaseFontHeight = arg.autoBaseFontHeight;
		this.textFormat = arg.textFormat;
		this.nullText = typeof (arg.nullText) == "string" ? arg.nullText : null;
		this.tooltip = arg.tooltip;
		this.securityKey = arg.securityKey;
	}
	QRBarCodeView.prototype = Object.create(WidgetElement.prototype);
	QRBarCodeView.prototype.constructor = QRBarCodeView;

	// Define Property for text
	Object.defineProperty(QRBarCodeView.prototype, "text", {
		get: function () {
			return this.getText();
		},
		set: function (val) {
			this.setText(val);
		}
	});

	// Define Property for tag
	Object.defineProperty(QRBarCodeView.prototype, "tag", {
		get: function () {
			return this.getTag();
		}
	});

	// Define Property for foregroundColor
	Object.defineProperty(QRBarCodeView.prototype, "alignment", {
		get: function () {
			return this.getAlignment();
		},
		set: function (val) {
			this.setForegroundColor(val);
		}
	});

	// Define Property for foregroundColor
	Object.defineProperty(QRBarCodeView.prototype, "codeType", {
		get: function () {
			return this.getCodeType();
		},
		set: function (val) {
			this.setCodeType(val);
		}
	});

	// Support code type of QRBarCode
	QRBarCodeView.prototype.CodeTypes = {
		QRCODE: "QR_CODE",
		EAN_8: "EAN_8",
		EAN_13: "EAN_13",
		UPC_A: "UPC_A",
		UPC_E: "UPC_E"
	}

	QRBarCodeView.prototype.BarCodeTypes = {
		EAN_8: "ean8",
		EAN_13: "ean13",
		UPC_A: "upc",
		UPC_E: "upce"
	}

	QRBarCodeView.prototype.setX = function (value) {
		$("#" + this._id).find("svg").attr("x", value);
		this._x = value;
		this.setAngle(this.getAngle());
	}

	QRBarCodeView.prototype.setY = function (value) {
		$("#" + this._id).find("svg").attr("y", value);
		this._y = value;
		this.setAngle(this.getAngle());
	}

	QRBarCodeView.prototype.setWidth = function (value) {
		$("#" + this._id).find("svg").attr("width", value);
		this.setRectWidth(value);
		this._width = value;
		this.setAngle(this.getAngle());
	}

	QRBarCodeView.prototype.setRectWidth = function (value) {
		$("#" + this._id).find("svg rect").attr("width", value);
	}

	QRBarCodeView.prototype.setHeight = function (value, resize) {
		$("#" + this._id).find("svg").attr("height", value);
		this.setRectHeight(value);
		this._height = value;

		if (typeof resize != "undefined" && resize == true) {

			var height = this.getHeight();
			var bFontHeight = this.getAutoBaseFontHeight();
			var bFontSize = this.getAutoBaseFontSize();

			var hRatio = height / bFontHeight;
			var newSize = bFontSize * hRatio;
			this.setFontSize(newSize);

			this.setText(this.getText());
		}

		this.setAngle(this.getAngle());
	}

	QRBarCodeView.prototype.setRectHeight = function (value) {
		$("#" + this._id).find("svg rect").attr("height", value);
	}

	QRBarCodeView.prototype.getAutoBaseFontHeight = function () {
		return this.autoBaseFontHeight;
	}

	QRBarCodeView.prototype.setAutoBaseFontHeight = function (value) {
		return this.autoBaseFontHeight = value;
	}

	QRBarCodeView.prototype.getAutoBaseFontSize = function () {
		return this.autoBaseFontSize;
	}

	QRBarCodeView.prototype.setAutoBaseFontSize = function (value) {
		return this.autoBaseFontSize = value;
	}

	QRBarCodeView.prototype.setTransform = function (value) {
		$("#" + this._id).attr("transform", value);
	}

	QRBarCodeView.prototype.setAngle = function (value) {
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

	QRBarCodeView.prototype.getOpacity = function () {
		return this._opacity;
	}

	QRBarCodeView.prototype.setOpacity = function (value) {
		this.setRectOpacity(value);
		this.setTextOpacity(value);
		this._opacity = value;
	}

	QRBarCodeView.prototype.setRectOpacity = function (value) {
		$("#" + this._id).find("svg rect").css("fill-opacity", value);
		$("#" + this._id).find("svg rect").css("stroke-opacity", value);
	}

	QRBarCodeView.prototype.setTextOpacity = function (value) {
		$("#" + this._id).find("svg path").css("fill-opacity", value);
	}

	QRBarCodeView.prototype.getBorderStyle = function () {
		return this._borderStyle;
	}

	QRBarCodeView.prototype.setBorderStyle = function (value) {
		value = value == "Simple" ? 1 : 0;
		$("#" + this._id).find("svg rect").css("stroke-width", value + 'px');
		this._borderStyle = value;
	}

	QRBarCodeView.prototype.getBorderColor = function () {
		return this.optionColor(this._borderColor);
	}

	QRBarCodeView.prototype.setBorderColor = function (value) {
		if (!value) value = "none";
		$("#" + this._id).find("svg rect").css("stroke", value);
		this._borderColor = value;
	}

	QRBarCodeView.prototype.getBackgroundColor = function () {
		return this.optionColor(this._backgroundColor);
	}

	QRBarCodeView.prototype.setBackgroundColor = function (value) {
		if (!value) value = "none";

		$("#" + this._id).find("svg rect").css("fill", value);
		this._backgroundColor = value;
	}

	QRBarCodeView.prototype.getForegroundColor = function () {
		return this.optionColor(this._foregroundColor);
	}

	QRBarCodeView.prototype.setForegroundColor = function (value) {
		if (!value) value = "none";
		$("#" + this._id).find("svg path").css("fill", value);
		this._foregroundColor = value;
	}

	QRBarCodeView.prototype.optionColor = function (color) {
		return color == "" ? "transparent" : color;
	}

	QRBarCodeView.prototype.getCodeType = function () {
		return this._codetype;
	}
	QRBarCodeView.prototype.setCodeType = function (value) {
		this._codetype = value;

		var code = this.getCodeType();
		if (code == this.CodeTypes.QRCODE) {
			this.DrawQRCode(text);
		}
		else {
			this.DrawBarCode(text);
		}
	}

	QRBarCodeView.prototype.getTag = function () {
		return this._tag;
	}

	QRBarCodeView.prototype.getText = function () {
		return this._text;
	}

	QRBarCodeView.prototype.setText = function (text) {
		this.DrawQRBarCode(text)
	}

	QRBarCodeView.prototype.clearText = function () {
		this._text = "";
	}

	QRBarCodeView.prototype.getAlignment = function () {
		return this._alignment;
	}
	QRBarCodeView.prototype.setAlignment = function (value) {
		this._alignment = value;
	}

	///
	// Draw barcode or qrcode with text
	/// 
	QRBarCodeView.prototype.DrawQRBarCode = function (text) {
		var view = this;
		if (text == null) {
			if (!this.nullText) return;
			text = this.nullText;
		}
		if (text == this._text) return;

		var code = view.getCodeType();
		if (code == view.CodeTypes.QRCODE) {
			view.DrawQRCode(text);
		}
		else {
			view.DrawBarCode(text);
		}
		this._text = text;
	}

	///
	// Draw BarCode image using jsbarcode.js
	/// 
	QRBarCodeView.prototype.DrawBarCode = function (text) {
		// console.log("Draw BarCode: " + view.codetype);
		var view = this;
		var _width = view.getWidth();
		var _height = view.getHeight();
		var foregroundcolor = this.getForegroundColor();

		var testbox = document.createElement("div");
		testbox.className = "barcodeBox";
		testbox.innerHTML = '<svg class="barcodeViewBox"/>';
		try {
			JsBarcode(testbox.querySelector('.barcodeViewBox'), text, {
				format: this.BarCodeTypes[this._codetype],
				width: 1,
				height: _height,
				lineColor: foregroundcolor,
				displayValue: true,
				fontSize: 20,
				margin: 0
			});
		}
		catch (e) {
			// return if error
			window.alert("Input value may not correct with barcode type!");
			var element = document.getElementById(this._id).getElementsByTagName("svg")[0];
			var gelements = element.getElementsByTagName('g');
			for (var i = 0; i < gelements.length; i++) {
				var el = gelements[i];
				element.removeChild(el);
			}

			// var pathel = element.getElementsByTagName('path')[0];                               
			// var x = element.getElementsByTagName('rect')[0].getAttribute('x');
			// var y = element.getElementsByTagName('rect')[0].getAttribute('y');
			// var rectw = element.getElementsByTagName('rect')[0].getAttribute('width');
			// var recth = element.getElementsByTagName('rect')[0].getAttribute('height');
			// var cx = x + rectw / 2;
			// var cy = y + recth / 2;
			// var r = (rectw > recth) ? recth / 2: rectw / 2;

			// var errorimg = document.createTextNode("div");
			// errorimg.innerHTML = "<circle cx=\"" + cx + "\" cy=\""+ cy+ "\" r=\"" + r + "\" stroke=\" "+ foregroundcolor + "\" stroke-width=\"5\" fill=\"none\" />";
			// console.log(errorimg);

			// element.appendChild(errorimg);

			return;
		}

		var defaultwidth = testbox.getElementsByTagName('rect')[0].getAttribute('width');
		var widthscale = (defaultwidth < _width) ? ((_width - 4) / defaultwidth) : 1;
		var defaultheight = testbox.getElementsByTagName('rect')[0].getAttribute('height');
		var heightscale = _height - 2 * (defaultheight - _height);
		try {
			JsBarcode(testbox.querySelector('.barcodeViewBox'), text, {
				format: this.BarCodeTypes[this._codetype],
				width: widthscale,
				height: heightscale,
				lineColor: foregroundcolor,
				displayValue: true,
				fontSize: 20,
				margin: 0
			});
		}
		catch (e) {
			// return if error
			return;
		}
		var svgelement = testbox.getElementsByTagName('g');
		var element = document.getElementById(this._id).getElementsByTagName("svg")[0];
		var gelements = element.getElementsByTagName('g');
		for (var i = 0; i < gelements.length; i++) {
			var el = gelements[i];
			element.removeChild(el);
		}
		for (var i = 0; i < svgelement.length; i++) {
			var el = svgelement[i];
			element.append(el);
		}
	}

	///
	// Draw QRCode image using qrcode.js
	///
	QRBarCodeView.prototype.DrawQRCode = function (text) {
		// console.log("Draw QRCODE TYPE: " + view.codetype);
		var view = this;
		var _width = view.getWidth();
		var _height = view.getHeight();
		var _pad = 0;
		var foregroundcolor = this.getForegroundColor();
		var alignment = view.getAlignment();

		var qx = _pad;
		var qy = _pad;
		var size = _width - 2 * _pad;
		if (size > _height) {
			size = _height - 2 * _pad;
		}

		if (alignment === "left") {
			qx = _pad;
			qy = _pad;
		} else if (alignment === "center") {
			if (_width >= _height) {
				qx = (_width - size) / 2;
				qy = _pad;
			} else {
				qx = _pad;
				qy = (_height - size) / 2;
			}
		} else {
			if (_width >= _height) {
				qx = _width - size;
				qy = _pad;
			} else {
				qx = _pad;
				qy = _height - size;
			}
		}

		try {
			var qrcode = new QRCode({
				content: text,
				padding: _pad,
				width: size,
				height: size,
				color: foregroundcolor, // black
				background: "#ffffff00", // transparent
				ecl: "M",
				container: "svg", //Responsive use 
				join: true
			});
		}
		catch (e) {
			return;
		}
		var svg = qrcode.svg();
		var data = (new DOMParser()).parseFromString(svg, "text/xml").getElementsByTagName("path")[0].getAttribute('d');
		document.getElementById(this._id).getElementsByTagName("path")[0].setAttribute('d', data);
		document.getElementById(this._id).getElementsByTagName("path")[0].setAttribute('transform', "translate(" + qx + ", " + qy + ")");
	}

	QRBarCodeView.prototype.getTextFormat = function () {
		return this.textFormat;
	}

	/// Tag change event handler
	QRBarCodeView.prototype.tagValueChanged = function (e) {
		if (e.status == 0 || !this.nullText) {
			var textFormat = this.getTextFormat();
			// console.log("textFormat: " + textFormat);
			var value = page.getValueByFormat(this._tag, textFormat, e.valueString);
			this.DrawQRBarCode(value);
		}
	}

	page.createQRBarCode = function (arg) {
		var view = new QRBarCodeView(arg);

		// Draw barcode with input text
		view.clearText();
		view.DrawQRBarCode(arg.text);

		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
			view._tag = tag;
		}
		page.protoViews[arg.id] = view;

		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// ListView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function ListView(arg) {
		
		WidgetElement.call(this, arg);

		this.sql = arg.listView.SQL;
		this.pid = arg.pid;
		this.font = arg.font;
		this.listView = arg.listView;
		this.headerHeight = 22;
		this.reqInterval = 0.20;//sec

		this._listviewitemcollection = [];
		this._listviewcolumncollection = [];
	}
	ListView.prototype = Object.create(WidgetElement.prototype);
	ListView.prototype.constructor = ListView;

	// Define items property for listview
	Object.defineProperty(ListView.prototype, "items", {
		get: function () {
			return this._listviewitemcollection;
		}
	});

	// Define Column property for listview
	Object.defineProperty(ListView.prototype, "columns", {
		get: function () {

			return this._listviewcolumncollection;
		}
	});

	// Define selectedItems property for listview
	Object.defineProperty(ListView.prototype, "selectedItems", {
		get: function () {
			var idxs = this.getGridDataIDs();
			var selectedIndexs = this.getGridSelectedRowIdxs();
			var items = this._listviewitemcollection;
			var selecteditems = scada.CreateListViewItemCollection(this);

			var selectedIndexsCount = selectedIndexs.length;
			for(var i = 0 ; i < selectedIndexsCount; i ++ ){
				var selectedIndex = selectedIndexs[i];
				var index = idxs.indexOf(selectedIndex);
				var item = items.getAt(index);
				if (item) {
					selecteditems.push(item);
				}
				selecteditems
			}

			return selecteditems;
		}
	});

	// Define selectedItem property for listview
	Object.defineProperty(ListView.prototype, "selectedItem", {
		get: function () {
			var selectedID = this.getGridSelectedRowIdx();
			var idxs = this.getGridDataIDs();
			var index = idxs.indexOf(selectedID);
			var items = this._listviewitemcollection;
			var item = items.getAt(index);
			return item;
		}
	});

	ListView.prototype.getSelectSQL = function() {
		return this.sql.selectSQL;
	}
	ListView.prototype.getDeleteSQL = function() {
		return this.sql.deleteSQL;
	}
	ListView.prototype.getUpdateSQL = function() {
		return this.sql.updateSQL;
	}

	ListView.prototype.newItem = function () {
		var listView = this.getListView();
		var columns = listView.columns;
		var columnsCount = columns.length;
		if(columnsCount == 0 ) return;

		var names = [];
		for(var i = 0; i < columnsCount; i++){
			var col = columns[i];
			names.push(col.field);
		}
		var row = {};
		for(var j = 0; j < columnsCount; j++){
			var name = names[j];
			var column = this.columnByName(name);
			if(column == null) continue;
			row[name] = null;
		}
		return scada.CreateListViewItem(this, row);
	}

	ListView.prototype.delete = function () {
		var items = this._listviewitemcollection;
		var idxs = this.getGridSelectedRowIdxs();
		var idxCount = idxs.length;
		idxs = idxs.sort(function (a, b) { return parseInt(a) - parseInt(b); });
		for (var i = idxCount - 1; i >= 0; i--) {
			items.removeAt(parseInt(idxs[i] - 1), false);
		}
		$('#' + this._id).clearGridData(true);
		this.updateGrid();
		$('#' + this._id).jqGrid("resetSelection");
	}

	ListView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;

		this.setAngle(this.getAngle());
	}
	ListView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;

		this.setAngle(this.getAngle());
	}
	ListView.prototype.setWidth = function (value) {
		$("#" + this._id + "-view").css("width", value + "px");
		this._width = value;

		var gridWidth = this.updateGridWidth(value);
		$("#" + this._id).closest(".ui-jqgrid-bdiv").height(gridWidth);

		this.setAngle(this.getAngle());
	}
	ListView.prototype.setHeight = function (value) {
		$("#" + this._id + "-view").css("height", value + "px");
		this._height = value;

		var gridHeight = this.updateGridHeight(value);
		$("#" + this._id).closest(".ui-jqgrid-bdiv").height(gridHeight);

		this.setAngle(this.getAngle());
	}
	ListView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id + "-view").css("-ms-transform", rotate);
		$("#" + this._id + "-view").css("-webkit-transform", rotate);
		$("#" + this._id + "-view").css("transform", rotate);
		this._angle = value;
	}
	ListView.prototype.setOpacity = function (value) {
		$("#" + this._id + "-view").css("opacity", value);
		this.opacity = value;
	}
	ListView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id + "-view").css("background-color", value);
		this._backgroundColor = value;
	}
	ListView.prototype.setBorderColor = function (value) {
		$("#" + this._id + "-view").css("border-color", value);
		this._borderColor = value;
	}
	ListView.prototype.setBorderStyle = function (value) {
		if (value == "Simple") {
			$("#" + this._id + "-view").css("border-width", "1px");
			$("#" + this._id + "-view").css("border-style", "solid");
		} else {
			$("#" + this._id + "-view").css("border-width", "0px");
			$("#" + this._id + "-view").css("border-style", "none");
		}
		this._borderStyle = value;
	}

	ListView.prototype.setVisible = function (value) {
        var visibility = value == true ? "visible" : "hidden";
        // visible trendchart-view object
        $("#" + this._id + "-view").css('visibility', visibility);
        this._visible = visibility;
    }

	ListView.prototype.getFont = function () {
		return this.font;
	}

	ListView.prototype.getRequestInterval = function () {
		return this.reqInterval;
	}

	ListView.prototype.getRefreshTime = function () {
		var refreshTime = this.getRequestInterval();
		refreshTime = refreshTime * 1000;
		return refreshTime;
	}

	ListView.prototype.getListView = function () {
		return this.listView;
	}

	ListView.prototype.getHeaderHeight = function () {
		var listView = this.getListView();
		return listView.headerHeight > this.headerHeight ? listView.headerHeight : this.headerHeight;
	}

	ListView.prototype.updateGridHeight = function (value) {
		var listView = this.getListView();
		var headerVisible = listView.headerVisible;

		var headerHeight = 0;
		if (headerVisible == true) {
			headerHeight = this.getHeaderHeight();
		}

		var offset = 5;
		return value - headerHeight - offset;
	}

	ListView.prototype.updateGridWidth = function (value) {
		var offset = 4;
		return value - offset;
	}

	ListView.prototype.columnByName = function (name) {
		var listView = this.getListView();
		var columnsCount = listView.columns.length;

		for (var k = 0; k < columnsCount; k++) {
			var column = listView.columns[k];
			if (!column) continue;
			
			if (column.field.toLowerCase() != name.toLowerCase()) continue;

			return column;
		}
		return null;
	}

	ListView.prototype.columnByIndex = function (index) {
		var listView = this.getListView();
		var columnsCount = listView.columns.length;
		if (index < 0 || columnsCount < 1 || columnsCount <= index) return null;
		return listView.columns[index];
	}

	ListView.prototype.valueByFormat = function (fmt, value) {
		if (fmt == null) return value;

		if (fmt.category == "") {
			if (page.isDate(value) == true) {
				return moment(value).format("YYYY-MM-DD");
			}
			return value;
		}
		return page.valueByFormat(fmt, value);
	}


	ListView.prototype.setValueByViewData = function (data) {
		var items = data.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]
		var names = data.names;//["Time", "Analog1", "Analog2"]

		if(items == undefined || names == undefined) return;
		var namesCount = names.length;
		var itemsCount = items.length;
        
        // clear all items
        this.items.splice(0, this.items.length);

        // add data to items
        for(var i = 0; i < itemsCount; i ++){
            var item = items[i];
            var values = [];
            for(var idx in item){
                values.push(item[idx]);
            }

            var row = {};
            for(var j = 0; j < namesCount; j++){
                var name = names[j];
                var value = values[j];
				var column = this.columnByName(name);
				if(column == null) continue;
				
                if (value != "") value = this.valueByFormat(column.cell.format, value);
                row[name] = value;
            }
            var rowitem = new scada.CreateListViewItem(this, row);
            this.items.push(rowitem);
        }
	}

	ListView.prototype.setGridRowData = function (data) {
		if (data == null) {
			console.log("ListView setGridData : data is null");
			return;
		}

		//$("#" + grid).jqGrid('clearGridData');		
		//$("#" + grid).jqGrid('setGridParam', {data: data}).trigger("reloadGrid");
		//스크롤 유지로 인한 아래와 같이 구성처리
		var ids = this.getGridDataIDs();
		var dataCount = data.length;
		for (var i = 0; i < dataCount; i++) {
			var row = data[i];
			if (!row) continue;

			var prop, rowid;
			if (typeof ids[i] == "undefined") {
				prop = "addRowData";
				rowid = i + 1;
			} else { 
				prop = "setRowData";
				rowid = ids[i];
			}
			$("#" + this._id).jqGrid(prop, rowid, row);

			this.setGridCell(rowid);
		}

		var idsCount = ids.length;
		// 영역외 row 삭제처리
		if (idsCount > dataCount) {
			for (var i = dataCount; i < idsCount; i++) {
				$("#" + this._id).jqGrid('delRowData', ids[i]);
			}
		}
	}

	ListView.prototype.setGridCell = function (rowid) {

		var listView = this.getListView();

		var rowHeight = listView.rowHeight;

		var columnsCount = listView.columns.length;
		for (var k = 0; k < columnsCount; k++) {
			var column = listView.columns[k];
			if (!column) continue;

			var cell = column.cell;

			var backgroundColor = this.optionBackgroundColor(cell.backgroundColor);
			var foregroundColor = this.optionForegroundColor(cell.foregroundColor);
			var fontFamily = this.optionFontName(cell.font);
			var fontSize = this.optionFontSize(cell.font);
			var fontWeight = this.optionFontWeight(cell.font);

			var style = {
				"text-align": cell.align.toLowerCase(),
				"vertical-align": cell.lineAlign.toLowerCase(),
				//"background-color": backgroundColor,
				//"color": foregroundColor,
				"font-family": fontFamily,
				"font-size": fontSize + "pt",
				"font-weight": fontWeight,
				"height": rowHeight + "px"
			};
			$("#" + this._id).jqGrid('setCell', rowid, column.field, "", style);
		}
	}


	//get view-data
	ListView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	//get database view-data
	ListView.prototype.doViewDataByDatabase = function () {
		var view = this;
		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
				view.updateGrid();				
			}
		}, view.getSelectSQL(), "");
	}

	ListView.prototype.reset = function () {
		this.doViewDataByDatabase();
	}

	//get grid data 
	ListView.prototype.getGridData = function () {
		return $("#" + this._id).jqGrid('getGridParam', 'data');
	}

	//get grid data - idxs	
	ListView.prototype.getGridDataIDs = function () {
		return $("#" + this._id).jqGrid('getDataIDs');
	}

	//get grid data - idx에대한 row
	ListView.prototype.getGridRowDataByIdx = function (idx) {
		return $("#" + this._id).jqGrid('getRowData', idx);
	}

	//get grid selected row index
	ListView.prototype.getGridSelectedRowIdx = function () {
		//선택된 rowid 가져오기
		return $("#" + this._id).jqGrid('getGridParam', 'selrow');
	}

	//get grid selected row indexs
	ListView.prototype.getGridSelectedRowIdxs = function () {
		//선택된 rowid들 가져오기
		return $("#" + this._id).jqGrid('getGridParam', 'selarrrow');
	}

	ListView.prototype.optionFontStyle = function (font) {
		var oFont = this.getFont();

		var value = font.name == "" ? oFont.italic : font.italic;
		return value == true ? "italic" : "normal";
	}

	ListView.prototype.optionFontWeight = function (font) {
		var oFont = this.getFont();

		var value = font.name == "" ? oFont.bold : font.bold;
		return value == true ? "bold" : "normal";
	}

	ListView.prototype.optionFontName = function (font) {
		var oFont = this.getFont();
		return font.name == "" ? oFont.name : font.name;
	}

	ListView.prototype.optionFontSize = function (font) {
		var oFont = this.getFont();
		return font.name == "" ? oFont.size : font.size;
	}

	ListView.prototype.optionBackgroundColor = function (value) {
		return value == "" ? "#FFFFFF" : value;
	}

	ListView.prototype.optionForegroundColor = function (value) {
		return value == "" ? "#414141" : value;
	}

	ListView.prototype.setGridHeader = function () {

		//------------------------ header style
		var listView = this.getListView();

		var headerHeight = this.getHeaderHeight();
		var columnsCount = listView.columns.length;

		for (var i = 0; i < columnsCount; i++) {
			var column = listView.columns[i];
			if (!column) continue;

			var header = column.header;

			var backgroundColor = this.optionBackgroundColor(header.backgroundColor);
			var foregroundColor = this.optionForegroundColor(header.foregroundColor);
			var fontFamily = this.optionFontName(header.font);
			var fontSize = this.optionFontSize(header.font);
			var fontWeight = this.optionFontWeight(header.font);

			var style = {
				"text-align": header.align.toLowerCase(),
				"vertical-align": header.lineAlign.toLowerCase(),
				"background-color": backgroundColor,
				"color": foregroundColor,
				"font-family": fontFamily,
				"font-size": fontSize + "pt",
				"font-weight": fontWeight,
				"height": headerHeight + "px",
			};
			$("#" + this._id).jqGrid('setLabel', column.field, "", style);
		}

		//----------------------- sorttable - false cursor
		var pGrid = $("#" + this._id)[0];
		var model = pGrid.p.colModel;
		$.each(pGrid.grid.headers, function (idx, value) {
			var colModel = model[idx];
			var colName = colModel.name;
			if (!colModel.sortable && colName !== 'rn' && colName !== 'cb' && colName !== 'subgrid') {
				$('div.ui-jqgrid-sortable', value.el).css({ cursor: "default" });
			}

			if (listView.headerVisible == true) {
				$('.ui-jqgrid-hdiv').show();
			} else {
				$('.ui-jqgrid-hdiv').hide();
			}
		});
	}

	ListView.prototype.headerNameByColumn = function (column) {
		return column.text == "" ? column.field : column.text;
	}

	function __columnStyle (rowid, cellValue, rawData1, colModel, rowData2) {

		var style = 'style = " ';
		
		if(colModel.cellFontFamily != "")
			style += " font-family: " + colModel.cellFontFamily + ";";
		
		if(colModel.cellFontSize != "")
			style += " font-size: " + colModel.cellFontSize + "pt;";
		
		(colModel.cellFontStyle != "")
			style += " font-style: " + colModel.cellFontStyle + ";";
		
		if(colModel.cellFontWeight != "")
			style += " font-weight: " + colModel.cellFontWeight + ";";	

		if(colModel.cellBackgroundColor != "")
			style += " background: " + colModel.cellBackgroundColor + ";";	

		if(colModel.cellForegroundColor != "")
			style += " color: " + colModel.cellForegroundColor + ";";	

		if(colModel.cellLineAlign != "")
			style += " vertical-align: " + colModel.cellLineAlign + ";";
		
		if(colModel.cellWidth != "")
			style += " width: " + colModel.cellWidth + "px;";
		
		if(colModel.cellHeight != "")
			style += " height: " + colModel.cellHeight + "px;";
		style += '"';
		return style; 
	}


	ListView.prototype.initGrid = function () {

		var listView = this.getListView();

		this._listviewitemcollection = scada.CreateListViewItemCollection(this);

		var columndatas = [];
		var idx = 0;
		var columnNames = [];
		var columnModel = [];
		var columnsCount = listView.columns.length;
		for (var i = 0; i < columnsCount; i++) {
			var column = listView.columns[i];
			if (!column) continue;

			var cell = column.cell;
			
			var fontFamily = this.optionFontName(cell.font);
			var fontSize = this.optionFontSize(cell.font);
			var fontWeight = this.optionFontWeight(cell.font);
			var fontStyle = this.optionFontStyle(cell.font);
			//------------------------ column model
			var model = {
				name: column.field,
				index: column.name,
				width: column.width,
				sortable: false,
				align: cell.align.toLowerCase(),
				editable: false,
				hidden: !column.visible,
				"cellFontFamily": fontFamily,
				"cellFontSize": fontSize,
				"cellFontWeight": fontWeight,
				"cellFontStyle": fontStyle,
				"cellBackgroundColor": cell.backgroundColor,
				"cellForegroundColor": cell.foregroundColor,
				"cellLineAlign": cell.lineAlign.toLowerCase(),
				"cellWidth": column.width,
				"cellHeight": listView.rowHeight,
				cellattr: __columnStyle
			};
			columnModel.push(model);

			//------------------------ column label
			var title = this.headerNameByColumn(column);
			columnNames.push(title);

			var coldata = {};
			coldata["name"] = title;
			coldata["visible"] = column.visible;
			coldata["width"] = column.width;
			coldata["text"] = column.text;
			columndatas[idx++] = coldata;

		}
		this._listviewcolumncollection = scada.createListViewColumnCollection(this, columndatas);

		var width = this.updateGridWidth(this.getWidth());
		var height = this.updateGridHeight(this.getHeight());

		$("#" + this._id).jqGrid({
			datatype: "local",
			width: width,
			height: height,
			colNames: columnNames,
			colModel: columnModel,
			caption: "",
			multiselect: listView.checkBoxes,
			shrinkToFit: false,  //가로스크롤
			hidegrid: false, //view expand button hide
			loadonce: false,
			toolbar: [false, "top"],
			gridview: true,
			rowNum: 25,
			scroll: 1,
			loadComplete: function () {
				var grid = $("#" + this.id),
					ids = grid.getDataIDs();

				for (var i = 0; i < ids.length; i++) {
					grid.setRowData(ids[i], false, { height: listView.rowHeight });
				}
				// grid.setGridHeight('auto');
			}
		});

		this.setGridHeader();
	}

	// Hide an column with input name
	ListView.prototype.columnVisible = function (columnName, value) {
		var listView = this.getListView();
		var columns = listView.columns;
		var colCount = columns.length;
		for (var i = 0; i < colCount; i++) {
			var column = columns[i];
			if (!column || column.field.toLowerCase() != columnName.toLowerCase()) continue;
			column.visible = value;
		}

		if (value == true) {
			// Show column
			$("#" + this._id).jqGrid('showCol', columnName, { hidden: value }, true);
		} else {
			// Hide column
			$("#" + this._id).jqGrid('hideCol', columnName, { hidden: value }, true);
		}
	}

	// Update listview when having a changing of listview column
	ListView.prototype.columnWidth = function (columnName, value) {
		var columnModel = $("#" + this._id).jqGrid('getGridParam', 'colModel');

		var listView = this.getListView();
		var columns = listView.columns;
		var colCount = columns.length;
		for (var i = 0; i < colCount; i++) {
			var column = columns[i];
			if (!column || column.field.toLowerCase() != columnName.toLowerCase()) continue;
			column.width = value;
			columnModel[1].width = value;
			break;
		}

		$("#" + this._id).jqGrid('setGridParam', { 'colModel': columnModel });
	}

	ListView.prototype.clearExistData = function () {
		var view = this;
        $("#" + view._id).jqGrid('clearGridData');
    }
	// Update listview when having a changing of listview items
	ListView.prototype.updateGrid = function () {
		var view = this;
		
		if(this._listviewitemcollection.count > 0){
			view.clearExistData();
			
			// Update listview
            var items = this._listviewitemcollection;
            var itemCount = items.length;
			let rows = [];			

			// var idx = 0;
            for(var i = 0; i < itemCount; i++) {
				var item = items[i];
				rows.push(item.rowdata);
			}
			$("#" + view._id).jqGrid('setGridParam', {data: rows}).trigger("reloadGrid");

        } else {
            // Clear listview
            var ids = view.getGridDataIDs();
            var idsCount = ids.length;
            for (var i = 0; i < idsCount; i++) {
                $("#" + view._id).jqGrid('delRowData', ids[i]);
            }
        }
        // Using this instruction to hide footer "No records to view"
		$('#norecs').hide();
	}
	ListView.prototype.exportToCSV = function (name) {
		var options = {
			separator: ",",
			separatorReplace: " ",
			quote: '"',
			escquote: '"',
			newLine: "\r\n",
			replaceNewLine: " ",
			includeCaption: true,
			includeLabels: true,
			includeGroupHeader: true,
			includeFooter: true,
			includeHeader: true,
			fileName: name == ""? this.name + ".csv" : name,
			mimetype: "text/csv;charset=utf-8",
			onBeforeExport: null,
			returnAsString: false,
			loadIndicator: true,
			treeindent: ' '
		};
		$("#" + this._id).jqGrid('exportToCsv', options);
	}

	ListView.prototype.test = function () {
		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 1000; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = (Math.floor(Math.random() * 100) + 90) / 10.0;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 90;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);

			temp.push(item);
		}

		var data = {
			names: ["Column1", "Column2", "Column3"],
			items: temp
		}

		data.items = data.items.reverse();
		data.items = data.items.slice(0, 50);

		var gridData = this.setValueByViewData(data);
		this.setGridRowData(gridData);

		var view = this;
		setTimeout(function () {
			view.test();
		}, 200);
	}

	ListView.prototype.getItemIndexAt = function (pageX, pageY) {
		var listView = this.getListView();
		if (this.items.count <= 0) return -1;

		var scale = page.pageManager.getScale();
		pageX = pageX / scale;
		pageY = pageY / scale;
		if (pageX < this.x || page.x > this.x + this.width) return -1;

		var headerHeight = this.listView.headerVisible ? listView.headerHeight : 0;
		var rowHeight = listView.rowHeight;

		var y = pageY + $("#" + this._id).closest(".ui-jqgrid-bdiv").scrollTop() - (this.y + headerHeight);
		var maxY = this.items.count * rowHeight;

		if (y <= 0 + 1) return -1;
		if (y >= maxY - 1) return -1;
		var num = y % rowHeight;
		if (num == 0 || num == 1 || num == 9) return -1; // 경계선

		return Math.floor(y / rowHeight);
	}

	page.createListView = function (arg) {
		var view = new ListView(arg);
		page.protoViews[view.id] = view;

		view.initGrid();
		view.doViewData();
		//view.test();
		return view;
	}
})();




