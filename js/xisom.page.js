if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

// PageManager
(function () {
	function PageManager(arg) {
		this.zoomMinWidth = arg.zoomMinWidth ? arg.zoomMinWidth : 0;
		this.zoom = arg.zoom ? arg.zoom : false;
		this.align = arg.align ? arg.align : "";
		this.html = document.getElementsByTagName("html")[0];
	}

	PageManager.prototype.inIframe = function () {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}

	PageManager.prototype.getZoomMinWidth = function () {
		if (this.inIframe()) {
			return 0;
		} else {
			return this.zoomMinWidth;
		}
	}

	PageManager.prototype.setZoomMinWidth = function (value) {
		this.zoomMinWidth = value;
	}

	PageManager.prototype.getZoom = function () {
		return this.zoom;
	}

	PageManager.prototype.setZoom = function (value) {
		this.zoom = value;
	}

	PageManager.prototype.getAlign = function () {
		return this.align;
	}

	PageManager.prototype.setAlign = function (value) {
		this.align = value;
	}

	PageManager.prototype.getScale = function () {
		var transFormStr = this.html.style.transform;
		if (transFormStr == "" || transFormStr == null) {
			return 1;
		}

		var keyword = 'scale(';
		var index = transFormStr.indexOf(keyword);
		if (index >= 0) {
			var tempStr = transFormStr.substr(index + keyword.length);
			var numStr = tempStr.substr(0, tempStr.indexOf(")"));
			return Number(numStr);
		} else {
			return 1;
		}
	}

	PageManager.prototype.setZoom = function () {
	   
		var htmlWidth = $(window).width();
		var htmlHeight = $(window).height();

		var bodyWidth = $(".contents").outerWidth();
		var bodyHeight = $(".contents").outerHeight();
	  
		var url = $Common.getUrlParam();
	  
		var minWidth = 0;
		if((opener || url.isOpener) && bodyWidth < 800) {
			minWidth = bodyWidth > 300 ? bodyWidth - 100 : bodyWidth;
		} else {
			minWidth = this.getZoomMinWidth();
		}
	  
		if(minWidth > htmlWidth) {
			htmlWidth = minWidth;
		}
	  
		var scale = (htmlWidth / bodyWidth);
		
		if(htmlWidth == minWidth) {
			$("html").css('overflow-x', 'visible'); 
		} else {
			$("html").css('overflow-x', 'hidden');
		}
	  
		if(bodyHeight * scale > htmlHeight) {
			$("html").css('overflow-y', 'visible');
		} else {
			$("html").css('overflow-y', 'hidden');
		}

		$("html").css('-moz-transform', 'scale(' + scale + ')');
		$("html").css('-moz-transform-origin', '0 0');
		$("html").css('-o-transform', 'scale(' + scale + ')');
		$("html").css('-o-transform-origin', '0 0');
		$("html").css('-webkit-transform', 'scale(' + scale + ')');
		$("html").css('-webkit-transform-origin', '0 0');
		$("html").css('-ms-transform', 'scale(' + scale + ')');
		$("html").css('-ms-transform-origin', '0 0');
		$("html").css('transform', 'scale(' + scale + ')');
		$("html").css('transform-origin', '0 0');

		$(".contents").css("float", "left");
		$(".contents").load();
	}	

	PageManager.prototype.setZoomTmp = function () {
		var frame = window.frameElement;
		var htmlWidth;
		if (!frame) {
			htmlWidth = $(window).width();
		} else {
			htmlWidth = $(frame).width();
		}

		var minWidth = this.getZoomMinWidth();
		var bodyWidth = $(".contents").outerWidth();

		htmlWidth = minWidth > htmlWidth ? minWidth : htmlWidth;
		var scale = (htmlWidth / bodyWidth);

		htmlWidth == minWidth ? $("html").css('overflow-x', 'visible') : $("html").css('overflow-x', 'hidden');

		$("html").css('-moz-transform', 'scale(' + scale + ')');
		$("html").css('-moz-transform-origin', '0 0');
		$("html").css('-o-transform', 'scale(' + scale + ')');
		$("html").css('-o-transform-origin', '0 0');
		$("html").css('-webkit-transform', 'scale(' + scale + ')');
		$("html").css('-webkit-transform-origin', '0 0');
		$("html").css('-ms-transform', 'scale(' + scale + ')');
		$("html").css('-ms-transform-origin', '0 0');
		$("html").css('transform', 'scale(' + scale + ')');
		$("html").css('transform-origin', '0 0');

		$(".contents").css("float", "left");
		$(".contents").load();
	}

	PageManager.prototype.setVCenter = function () {
		var top = Math.max(0, (($(window).height() - $(".contents").outerHeight()) / 2) + $(window).scrollTop()) + "px";
		var left = Math.max(0, (($(window).width() - $(".contents").outerWidth()) / 2) + $(window).scrollLeft()) + "px";
		//$(".contents").css("position","absolute");		
		//$(".contents").css("top", top);
		//$(".contents").css("left", left);		
	}

	PageManager.prototype.setCenter = function () {
		$(".contents").css("margin", "auto");
	}

	PageManager.prototype.setLeft = function () {
		$(".contents").css("float", "left");
	}

	PageManager.prototype.setRight = function () {
		$(".contents").css("float", "right");
	}

	PageManager.prototype.doZoom = function () {
		var zoom = this.getZoom();
		if (zoom) {
			this.setZoom();
		} else {
			$("body").css('overflow', 'auto');
		}
	}

	PageManager.prototype.doAlign = function () {
		var align = this.getAlign().toLowerCase();

		if (align == "left") this.setLeft();
		else if (align == "center") this.setCenter();
		else if (align == "right") this.setRight();
		else this.setLeft();
	}

	PageManager.prototype.Init = function () {
		this.doAlign();
		this.doZoom();
	}

	if (typeof __pageOption !== "undefined") {
		page.pageManager = new PageManager(__pageOption);
		page.pageManager.Init();
		$(window).resize(function () { page.pageManager.Init(); });
	} else {
		$(window).resize(function () {
			var scale = 1;
			$("html").css('-moz-transform', 'scale(' + scale + ')');
			$("html").css('-moz-transform-origin', '0 0');
			$("html").css('-o-transform', 'scale(' + scale + ')');
			$("html").css('-o-transform-origin', '0 0');
			$("html").css('-webkit-transform', 'scale(' + scale + ')');
			$("html").css('-webkit-transform-origin', '0 0');
			$("html").css('-ms-transform', 'scale(' + scale + ')');
			$("html").css('-ms-transform-origin', '0 0');
			$("html").css('transform', 'scale(' + scale + ')');
			$("html").css('transform-origin', '0 0');

			$(".contents").css("float", "left");
			$(".contents").load();
		});
	}

	page.createPageAlarmSetting = function (arg) {
		page.pageAlarmSetting = {
			followDefaultSetting: arg.followDefaultSetting,
			levels: arg.levels,
			zones: arg.zones,
			soundEnable: arg.soundEnable,
			sound: arg.sound,
			soundLooping: arg.soundLooping,
			pageEnable: arg.pageEnable,
			page: arg.page,
			pageOpenOption: arg.pageOpenOption,
		};
	}

})();

//ETC
(function () {
	page.loaderShow = function () {
		var top = ($(".contents").outerHeight() - $("div.loader").outerHeight()) / 2;
		var left = ($(".contents").outerWidth() - $("div.loader").outerWidth()) / 2;

		$("div.loader").css("top", top);
		$("div.loader").css("left", left);
		$("div.loader").css("visibility", "visible");
	}

	page.loaderHide = function () {
		$("div.loader").css("visibility", "hidden");
	}

	page.wrapShow = function () {
		$("#xisom-wrap").removeClass("hide");
		$("#xisom-wrap").addClass("show");
	}

	page.wrapHide = function () {
		$("#xisom-wrap").removeClass("show");
		$("#xisom-wrap").addClass("hide");
	}

	page.contentShow = function () {
		page.wrapShow();
		page.loaderHide();
	}

	page.contentHide = function () {
		page.wrapHide();
		page.loaderShow();
	}

	page.tooltip = function () {
		$('[data-toggle="tooltip"]').tooltip2({ container: 'body', bounday: 'window', placement: 'bottom', delay: { show: 10, hide: 10 } });
	}

})();

//Events
(function () {

	//------------------------------------------------------------------------------------------- Page Event
	page.onMouseOver = function (e, view) {
		var id = view.id;
		var cursor = "cursor-pointer";

		if (view.securityKey.length != 0) {
			if (scada.activeSession == null){
				cursor = "cursor-not-allowed";
			}
			else if(scada.activeSession.keys.indexOf(view.securityKey) < 0) {
				cursor = "cursor-not-allowed";				
			}
		}

		$("#" + id).addClass(cursor);
		var elemLabel = $("#" + id).find("label");
		if (!elemLabel) {
			elemLabel.addClass(cursor);
		}
	}

	page.onMouseOut = function (e, view) {
		var id = view.id;
		$("#" + id).removeClass("cursor-pointer");
		$("#" + id).removeClass("cursor-not-allowed");
		var elemLabel = $("#" + id).find("label");
		if (!elemLabel) {
			elemLabel.removeClass("cursor-pointer");
			elemLabel.removeClass("cursor-not-allowed");
		}
	}

	page.actions = new function () {
		this.pageClick = function (event, view, plan) {
			if (plan.button != event.button) return;
			
			if (view.securityKey.length != 0){
				if(scada.activeSession == null){
					return;
				} else if (scada.activeSession.keys.indexOf(view.securityKey) < 0){					
					return;
				}				
			}
			
			var url = "";
			if (plan.page.indexOf("http://") > -1 || plan.page.indexOf("https://") > -1 || plan.page.indexOf("www.") > -1) {
				url = plan.page;
			} else {
				url = plan.page + ".html";
			}
			var mode = plan.mode;
			if (mode == "Open") {
				if (plan.options.indexOf("centerparent=yes") != -1) {
					$Common.openCenter(url, plan.window, plan.options);
				} else {
					window.open(url, plan.window, plan.options);
				}

			} else if (mode == "Close") {
				window.close();
			} else if (mode == "Replace") {
				// window.location.href = url;
				if(top.allFrame === undefined){
					window.parent.location = url;
				} else {
					window.location.href = url;
				}
			}
		}
	}

	page.events = new function () {
		var evtHash = {};
		var capturingElem = null;
		var rerouteFn = null;

		this.captureMouse = function (_elem) {
			page.events.releaseMouse();
			capturingElem = _elem;

			if (typeof _elem.setCapture !== 'undefined') {
				_elem.setCapture();
			}
			else {
				rerouteFn = function (e) {
					var synthEvent, scrollPos;

					synthEvent = document.createEvent('MouseEvents');
					synthEvent.initMouseEvent(
						e.type
						, e.bubbles
						, e.cancelable
						, window
						, e.detail
						, e.screenX
						, e.screenY
						, e.clientX
						, e.clientY
						, e.ctrlKey
						, e.altKey
						, e.shiftKey
						, e.metaKey
						, e.button
						, e.relatedTarget
					);

					scrollPos = page.events.getScrollPosition();
					synthEvent.__defineGetter__('pageX', function () { return this.clientX + scrollPos.x; });
					synthEvent.__defineGetter__('pageY', function () { return this.clientY + scrollPos.y; });

					document.removeEventListener(e.type, rerouteFn, true);
					synthEvent.captureTarget = e.target;
					_elem.dispatchEvent(synthEvent);
					if (rerouteFn !== null) {
						document.addEventListener(e.type, rerouteFn, true);
					}
					delete synthEvent.captureTarget;
					e.stopPropagation();
				}

				document.addEventListener('mouseover', rerouteFn, true);
				document.addEventListener('mouseout', rerouteFn, true);
				document.addEventListener('mousemove', rerouteFn, true);
				document.addEventListener('mouseup', rerouteFn, true);
				document.addEventListener('mousedown', rerouteFn, true);
				document.addEventListener('click', rerouteFn, true);
				document.addEventListener('dblclick', rerouteFn, true);
			}

			return this;
		};

		this.releaseMouse = function () {
			if (capturingElem !== null) {
				if (typeof capturingElem.releaseCapture !== 'undefined') {
					capturingElem.releaseCapture();
				}
				else {
					document.removeEventListener('mouseover', rerouteFn, true);
					document.removeEventListener('mouseout', rerouteFn, true);
					document.removeEventListener('mousemove', rerouteFn, true);
					document.removeEventListener('mouseup', rerouteFn, true);
					document.removeEventListener('mousedown', rerouteFn, true);
					document.removeEventListener('click', rerouteFn, true);
					document.removeEventListener('dblclick', rerouteFn, true);
				}

				capturingElem = rerouteFn = null;
			}

			return this;
		};

		this.getCaptureTarget = function (_evt) {
			return _evt.captureTarget || _evt.srcElement || _evt.currentTarget;
		};

		this.getScrollPosition = function () {
			var position = { x: 0, y: 0 };
			if (typeof window.pageYOffset !== 'undefined') {
				position.x = window.pageXOffset;
				position.y = window.pageYOffset;
			}
			else if (typeof document.documentElement.scrollTop !== 'undefined') {
				position.x = document.documentElement.scrollLeft;
				position.y = document.documentElement.scrollTop;
			}
			else if (typeof document.body.scrollTop !== 'undefined') {
				position.x = document.body.scrollLeft;
				position.y = document.body.scrollTop;
			}

			return position;
		};
	};

	page.conditionMatched = function (tag, condition, value) {
		if (tag.type == "analog") return page.matchConditionByAnalogTag(tag, condition, value);
		if (tag.type == "digital") return page.matchConditionByDigitalTag(tag, condition, value);
		if (tag.type == "string") return page.matchConditionByStringTag(tag, condition, value);
		return false;
	}

	//------------------------------------------------------------------------------------------- Match Condition By Analog
	page.matchConditionByAnalogTag = function (tag, condition, value) {
		if (tag == null) return false;
		if (tag.value == null) return false;

		var analogValue = page.valueAsNumber(value);
		var tagValue = tag.value;

		switch (condition) {
			case "<=":
				return tagValue <= analogValue;
			case ">=":
				return tagValue >= analogValue;
			case "<":
				return tagValue < analogValue;
			case ">":
				return tagValue > analogValue;
			case "!=":
				return tagValue != analogValue;
			case "==":
				return tagValue == analogValue;
		}
		return false;
	}

	//------------------------------------------------------------------------------------------- Match Condition By Digital
	page.matchConditionByDigitalTag = function (tag, condition, value) {
		if (tag == null) return false;
		if (tag.value == null) return false;


		var digitalValue = page.valueAsBool(value) ? 1 : 0;
		var tagValue = tag.value ? 1 : 0;
		switch (condition) {
			case "<=":
				return tagValue <= digitalValue;
			case ">=":
				return tagValue >= digitalValue;
			case "<":
				return tagValue < digitalValue;
			case ">":
				return tagValue > digitalValue;
			case "!=":
				return tagValue != digitalValue;
			case "==":
				return tagValue == digitalValue;
		}
		return false;
	}

	//------------------------------------------------------------------------------------------- Match Condition By String
	page.matchConditionByStringTag = function (tag, condition, value) {
		if (tag == null) return false;
		if (tag.value == null) return false;

		var stringValue = page.valueAsString(value);
		var tagValue = tag.value.toString();
		var compare = tagValue.localeCompare(stringValue);

		switch (condition) {
			case "<=":
				return compare <= 0;
			case ">=":
				return compare >= 0;
			case "<":
				return compare < 0;
			case ">":
				return compare > 0;
			case "!=":
				return compare != 0;
			case "==":
				return compare == 0;
		}
		return false;
	}

	//------------------------------------------------------------------------------------------- Bool KeyPad	
	page.keyboardByBoolearn = function (id, tag, value, on, off, securityKey) {
		var obj = "#xisom-keypad";
		$(obj).val(tag.valueString(value));

		var customString = on + " " + off + " {a} {c}";

		var meta = $(obj).getkeyboard();
		if (typeof meta != "undefined") {
			meta.close();
			meta.destroy();
		}

		$(obj).keyboard({
			layout: 'custom',
			customLayout: {
				'default': [
					customString
				]
			},
			position: {
				of: $("#" + id),
				my: 'left top',
				at: 'left bottom'
			},
			restrictInput: false,
			autoAccept: false,
			usePreview: true,
			lockInput: false,
			acceptValid: true,
			change: function (e, keyboard, el){ 
				if (e.action == 'On' || e.action == 'Off') {
					keyboard.preview.value = e.action;
				}
			},
			beforeClose: function (e, keyboard, el, accepted) {
				keyboard.close();
			},
			accepted: function (e, keyboard, el) {
				var acceptVal = el.value == on ? true : false;
				tag.setValue(acceptVal, securityKey);
				return;
			}
		});

		$(obj).data('keyboard').redraw();
		this.keyboardOffset(id, obj, 240, 50);
		$("#xisom-keypad_keyboard input").on('propertychange change keyup paste input', function () {
			if (this.value.indexOf('O') >= 0 && this.value.indexOf('n') >= 0) {
				this.value = 'On';
			} else {
				this.value = 'Off';
			}
		});
	}

	//------------------------------------------------------------------------------------------- 문자열 KeyPad	
	page.keyboardByString = function (id, tag, value, securityKey) {
		var obj = "#xisom-keypad";
		$(obj).val(tag.value);

		var meta = $(obj).getkeyboard();
		if (typeof meta != "undefined") {
			meta.close();
			meta.destroy();
		}

		$(obj).keyboard({
			layout: 'custom',
			customLayout: {
				'default': [
					'{a} {b} {clear} {c}'
				]
			},
			position: {
				of: $("#" + id),
				my: 'left top',
				at: 'left bottom'
			},
			restrictInput: false,
			autoAccept: false,
			acceptValid: true,
			usePreview: true,
			lockInput: false,
			beforeClose: function (e, keyboard, el, accepted) {
				keyboard.close();
			},
			accepted: function (e, keyboard, el) {
				tag.setValue(el.value, securityKey);
				return;
			}
		});

		$(obj).data('keyboard').redraw();
		this.keyboardOffset(id, obj, 200, 40);
	}

	//------------------------------------------------------------------------------------------- Number KeyPad	
	page.keyboardByNumber = function (id, tag, value, min, max, securityKey) {
		var obj = "#xisom-keypad";
		$(obj).val(value);

		var meta = $(obj).getkeyboard();
		if (typeof meta != "undefined") {
			meta.close();
			meta.destroy();
		}

		var kb = $(obj).keyboard({
			layout: 'custom',
			customLayout: {
				'default': [
					'7 8 9 {b}',
					'4 5 6 {clear}',
					'1 2 3 -',
					'0 {dec} {a} {c}'
				]
			},
			position: {
				of: $("#" + id),
				my: 'left top',
				at: 'left bottom'
			},
			restrictInput: false,
			preventPaste: true,
			autoAccept: false,
			acceptValid: true,
			caretToEnd: true,
			validate: function (keyboard, value, isClosing) {
				if (value < min || value > max && isClosing) {
					alert("The input range is " + min + " ~ " + max + ".");
					return false;
				}
				return true;
			},
			beforeClose: function (e, keyboard, el, accepted) {
				keyboard.close();
			},
			accepted: function (e, keyboard, el) {
				tag.setValue(el.value, securityKey);
				return;
			}
		});

		$(obj).data('keyboard').redraw();
		this.keyboardOffset(id, obj, 200, 40);
		$("#xisom-keypad_keyboard input").on('propertychange change keyup paste input', function () {
			this.value = this.value.replace(/(?!^-)[^0-9.]/g, "").replace(/(\..*)\./g, '$1');
		});
	}

	page.keyboardOffset = function (id, obj, kbWidth, btnWidth) {
		var div = obj + "_keyboard";

		var height = $("#" + id).attr("height");
		var width = $("#" + id).attr("width");
		var x = $(div).offset().left + width / 2;
		var y = $(div).offset().top + height / 2;

		$(div).offset({ top: y, left: x });
		$(div).css("width", kbWidth + "px");

		var btn = $(div).find(".ui-keyboard-button");
		$(btn).css("width", btnWidth + "px");

		var txt = $(div).find("input");
		$(txt).select();
	}


	//------------------------------------------------------------------------------------------- Common
	page.getParentNode = function (id) {
		return $('#' + id).parent().get(0);
	}

	page.parentNodeVisibility = function (id) {
		var d = page.getParentNode(id);
		if (typeof d == "undefined" || d.id == "")
			return null;

		if (d.tagName == "g" || d.tagName == "div") {
			var visibility = $("#" + d.id).css("visibility");
			return visibility;
		}
		return null;
	}

	//------------------------------------------------------------------------------------------- Get Element By Id
	page.getElementById = function (id) {
		return $('#' + id)[0];
	}

	//------------------------------------------------------------------------------------------- Get View By Name
	page.getViewByName = function (id) {
		var view = page.protoViews[id];
		if (typeof view == "undefined") return null;
		return view;
	}

	page.getRect = function (view) {
		var x = view.getX();
		var y = view.getY();
		var w = view.getWidth();
		var h = view.getHeight();

		var rect = {};
		rect.X = parseFloat(x.toFixed(3));
		rect.Y = parseFloat(y.toFixed(3));
		rect.Width = parseFloat(w.toFixed(3));
		rect.Height = parseFloat(h.toFixed(3));
		rect.Left = rect.X;
		rect.Top = rect.Y;
		rect.Right = rect.X + rect.Width;
		rect.Bottom = rect.Y + rect.Height;

		return rect;
	}

	page.getRectCenter = function (rect) {
		var pt = {};
		pt.X = (rect.X + (rect.X + rect.Width)) / 2;
		pt.Y = (rect.Y + (rect.Y + rect.Height)) / 2;
		return pt;
	}

	//------------------------------------------------------------------------------------------- Get Value By Format
	page.getValueByFormat = function (tag, textFormat, value) {

		if (tag.type == "analog") {
			return this.valueByFormat(textFormat, value);
		}
		return value;
	}

	page.valueByFormat = function (textFormat, value) {
		//if (textFormat == null) return parseFloat(value).toFixed(0);
		if (textFormat == null) return value;

		var category = textFormat.category;
		var decimals = textFormat.decimals;
		var unit = textFormat.unit;
		var format = textFormat.format;

		if (category == "Number") {
			return this.valueToNumberFixed(value, decimals, unit);
		}
		else if (category == "Currency") {
			return this.valueToCurrency(value, decimals, unit);
		}
		else if (category == "Percentage") {
			return this.valueToPercentage(value, decimals);
		}
		else if (category == "Scientific") {
			return page.valueToScientific(value, decimals);
		}
		else if (category == "DateTime") {
			if (this.isDate(value)) {
				return this.valueToDateTimeFormat(value, format);
			}
			else {
				if (Number.isNaN(Number(value))) return value;

				// All time format of scada is OLE
				// https://stackoverflow.com/questions/10443325/how-to-convert-ole-automation-date-to-readable-format-using-javascript
				var date = new Date();
				date.setTime((value - 25569) * 24 * 3600 * 1000);
				return this.valueToDateTimeFormat(date, format);               
			}
		}
		else if (category == "Custom") {
			//날짜형식
			if (this.isDate(value) == true) {
				return this.valueToDateTimeFormat(value, format);
			}
			//지수형힉
			if (this.isScientificByFormat(format) > -1) {
				return this.valueToScientificFormat(value, format);
			}
			//숫자형식
			var number = this.valueToNumberFormat(value, format);
			return !number ? value : number;
		}
		else {
			if (page.isDate(value) == true) {
				value = this.valueToDateTimeFormat(value, format);
			}
			return value;
		}
		return value;
	}

	page.isDate = function (value) {
		var time = moment(value, moment.ISO_8601);
		return moment(time, "YYYY-MM-DD").isValid();
	}

	page.isScientificByFormat = function (format) {
		return format.replace(/e/gi, 'E').indexOf('E+');
	}

	//--------------------------------------------------------------------------------- Number 소수점 표현
	page.valueToNumberFixed = function (value, decimals, unit) {
		if (isNaN(value)) return value;
		if (typeof unit == "undefined") unit = "";

		return parseFloat(value).toFixed(decimals) + unit;
	}

	//--------------------------------------------------------------------------------- Currency 표현
	page.valueToCurrency = function (value, decimals, unit) {
		if (isNaN(value)) return value;
		if (typeof unit == "undefined") unit = "";

		var format = this.numberFormatString(decimals);
		return unit + this.valueToNumberFormat(value, format);
	}

	//--------------------------------------------------------------------------------- Percentage 표현
	page.valueToPercentage = function (value, decimals) {
		if (isNaN(value)) return value;
		var percentValue = Number(value) * 100;
		var format = this.numberFormatString(decimals);
		return this.valueToNumberFormat(percentValue, format + ' %');
	}

	//--------------------------------------------------------------------------------- Scientific 표현
	page.valueToScientific = function (value, decimals) {
		if (isNaN(value)) return value;
		return parseFloat(value).toExponential(decimals).toUpperCase();
	}

	//--------------------------------------------------------------------------------- Custom Number Format
	page.valueToNumberFormat = function (value, format) {
		//format = format.replace(/ /gi, '');
		var number = $.formatNumber(value, { format: format, locale: "us" });
		return number;
	}

	//--------------------------------------------------------------------------------- Custom DateTime Format
	page.valueToDateTimeFormat = function (value, format) {
		if (!format) format = "YYYY-MM-DD";
		format = format.replace(/y/gi, "Y").replace(/d/gi, 'D').replace(/f/gi, 'S').replace(/t/gi, '').trim();
		var localTime = moment.utc(value).toDate();
		localTime = moment(localTime).format(format);
		return localTime;
	}

	//--------------------------------------------------------------------------------- Custom Scientific Format
	page.valueToScientificFormat = function (value, format) {
		var exponential = parseFloat(value).toExponential();
		var parts = exponential.split('e');
		format = format.toUpperCase().replace(/E[\+|\-]{1}0*/, '');
		var output = this.valueToNumberFormat(parts[0], format)
		return output + 'E' + parts[1];
	}

	//--------------------------------------------------------------------------------- Number Format String
	page.numberFormatString = function (decimals) {
		var defaultFormat = "###,###,##0";

		var str = "";
		for (var i = 0; i < decimals; i++) {
			str += "0";
		}
		return decimals < 1 ? defaultFormat : defaultFormat + "." + str;
	}


	page.isEmptyObject = function (obj) {
		return Object.keys(obj).length === 0;
	}

	page.toRadian = function (degree) {
		return Math.PI * degree / 180.0;
	}

	page.toDegree = function (radian) {
		return radian * 180.0 / Math.PI;
	}

	//------------------------------------------------------------------------------------------- Value As Number
	page.valueAsNumber = function (value) {
		if (typeof value == "string") return parseFloat(value);
		if (typeof value == "boolean") return value == true ? 1 : 0;
		if (typeof value == "number") return parseFloat(value);
		return 0;
	}

	//------------------------------------------------------------------------------------------- Value As Bool
	page.valueAsBool = function (value) {
		if (typeof value == "string")
			return value.toLowerCase() == "true";

		return page.valueAsNumber(value) != 0;
	}

	//------------------------------------------------------------------------------------------- Value As String
	page.valueAsString = function (value) {
		if (typeof value == "string")
			return value;
		else
			return "";
	}

	page.pointsToPixel = function (value) {
		return value * 96 / 72;
	}

	page.pixelToPoints = function (value) {
		return value * 72 / 96;
	}

	//------------------------------------------------------------------------------------------- Page location
	page.goPage = function (page) {
		var url = page + ".html";
		location.href = url;
	}

	//------------------------------------------------------------------------------------------- Page KeyDown Event
	page.keypressPage = function (e, pPage, nPage) {
		if (pPage != nPage) {
			if (e.keyCode == 33) {
				page.goPage(pPage);
			} else if (e.keyCode == 34) {
				page.goPage(nPage);
			}
		}
	}

	page.lineFunction = d3.svg.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }).interpolate("cardinal");
})();


$(window).load(function () {
	page.tooltip();
});
