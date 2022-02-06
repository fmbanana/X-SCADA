if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

(function () {

	function TrendChart(arg) {
		
		ChartElement.call(this, arg);

		this.foregroundColor = arg.foregroundColor;
		this.trend = arg.trend;
		this.viewData = null;
		this.dummyData = [];

		this.reqLimit = 50000;
		this.reqInterval = arg.reqInterval;//sec
		var dt = new Date();
		dt.setSeconds(dt.getSeconds() - arg.trend.timeSpan);
		this._startTime = dt;
	}
	TrendChart.prototype = Object.create(ChartElement.prototype);
	TrendChart.prototype.constructor = TrendChart;

	TrendChart.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	TrendChart.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	TrendChart.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	TrendChart.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	TrendChart.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	TrendChart.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}
    TrendChart.prototype.setVisible = function (value) {
        var visibility = value == true ? "visible" : "hidden";

        // visible trendchart-view object
        $("#" + this._id + "-view").css('visibility', visibility);

        // visible trendchart object
        $("#" + this._id).css('visibility', visibility);
        
        this._visible = visibility;
    }
	TrendChart.prototype.setFillStyle = function (value) {
	}

	TrendChart.prototype.setFillOpacity = function (value) {
	}

	TrendChart.prototype.setStrokeStyle = function (value) {
	}

	TrendChart.prototype.setStrokeOpacity = function (value) {
	}

	TrendChart.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	TrendChart.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	TrendChart.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	TrendChart.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	TrendChart.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	TrendChart.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", value);
		this.borderStyle = value;
	}

	TrendChart.prototype.getForegroundColor = function () {
		return this.optionColor(this.foregroundColor);
	}

	TrendChart.prototype.setForegroundColor = function (value) {
		$("#" + this._id).css("color", value);
		this.foregroundColor = value;
	}

	TrendChart.prototype.getTrend = function () {
		return this.trend;
	}

	TrendChart.prototype.getIsLive = function () {
		return this.trend.isLive;
	}

	TrendChart.prototype.setIsLive = function (value) {
		this.trend.isLive = value;
	}

	TrendChart.prototype.getRefreshTime = function () {
		var refreshTime = this.getRequestInterval();
		if (!refreshTime) {
			refreshTime = this.trend.refreshTime;
		}

		refreshTime = refreshTime * 1000;
		return refreshTime;
	}

	TrendChart.prototype.setRefreshTime = function (value) {
		this.trend.refreshTime = value;
	}

	TrendChart.prototype.getTimeSpan = function () {
		return this.trend.timeSpan;
	}

	TrendChart.prototype.getToTalTick = function () {
		return (this.trend.timeSpan / this.trend.samplingTime);
	}

	TrendChart.prototype.getSamplingTime = function () {
		return this.trend.samplingTime;
	}

	TrendChart.prototype.getDummyData = function () {
		return this.dummyData;
	}

	TrendChart.prototype.setDummyData = function (value) {
		this.dummyData = value;
	}

	TrendChart.prototype.setTimeSpan = function (value) {

		if (this.trend.timeSpan == value) return;

		var nowTime = new Date();
		var max = new Date(nowTime.setSeconds(nowTime.getSeconds() - value));
		if (this._startTime > max) {
			this._startTime = max;
		}
		this.trend.timeSpan = value;
	}

	TrendChart.prototype.getStartTime = function () {
		var isLive = this.getIsLive();
		if (isLive == false) {
			return this._startTime;
		}

		var nowTime = new Date();
		var startTime = new Date(nowTime.setSeconds(nowTime.getSeconds() - this.getTimeSpan()));
		return startTime;//return startTime.toLocaleString();
	}

	TrendChart.prototype.setStartTime = function (value) {
		var isLive = this.getIsLive();
		if (isLive == true) return;

		var dateTime = new Date(value);
		if (dateTime == this._startTime) return;

		var nowTime = new Date();
		var max = new Date(nowTime.setSeconds(nowTime.getSeconds() - this.getTimeSpan()));
		if (value >= max) {
			this._startTime = max;
		} else {
			this._startTime = value;
		}
	}

	TrendChart.prototype.getShowToolbar = function () {
		return this.trend.showToolbar;
	}

	TrendChart.prototype.setShowToolbar = function (value) {
		this.trend.showToolbar = value;

		initToolbar();
		initChart();
	}

	TrendChart.prototype.getRequestInterval = function () {
		return this.reqInterval;
	}

	TrendChart.prototype.getChart = function () {
		return this.chart;
	}

	TrendChart.prototype.setChart = function (obj) {
		this.chart = obj;
	}

	TrendChart.prototype.getViewData = function () {
		return this.viewData;
	}

	TrendChart.prototype.setViewData = function (value) {
		this.viewData = value;
	}

	TrendChart.prototype.optionOrient = function (position) {
		if (position == "Top") return "horizontal";
		else if (position == "Bottom") return "horizontal";
		else if (position == "LeftTop") return "vertical";
		else if (position == "Left") return "vertical";
		else if (position == "Right") return "vertical";
		else return "horizontal";
	}

	TrendChart.prototype.optionSeriesType = function (type) {
		if (type == "Line") return "line";
		else if (type == "Area") return "line";
		else if (type == "Column") return "bar";
		else return "line";
	}

	TrendChart.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

		var showToolbar = this.getShowToolbar();
		var paddingTop = 10;
		if (showToolbar == true) {
			paddingTop = 35;
		}

		var item = {
			show: oTitle.visible,
			text: oTitle.text,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			},
			padding: [
				paddingTop, //up
				30, //right
				10, //down
				65 //left
			]
		};

		return item;
	}

	TrendChart.prototype.optionLegendPosition = function (position) {
		if (position == "Top") return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
		else if (position == "Bottom") return { left: 'center', top: 'auto', right: 'auto', bottom: 'bottom' };
		else if (position == "LeftTop") return { left: 'left', top: 'top', right: 'auto', bottom: 'auto' };
		else if (position == "Left") return { left: 'left', top: 'middle', right: 'auto', bottom: 'auto' };
		else if (position == "Right") return { left: 'auto', top: 'middle', right: 'right', bottom: 'auto' };
		else if (position == "RightTop") return { left: 'auto', top: 'top', right: 'right', bottom: 'auto' };
		else if (position == "Auto") return { left: 'center', top: 'auto', right: 'auto', bottom: 'bottom' };
		else return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
	}

	TrendChart.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);

		var showToolbar = this.getShowToolbar();
		var paddingTop = 10;
		if (showToolbar == true) {
			paddingTop = 35;
		}

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			data: data,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: [
				paddingTop, //up
				30, //right
				10, //down
				65 //left
			],
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			}
		};

		return item;
	}

	TrendChart.prototype.optionDataByLegend = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var name = this.optionSeriesName(s);
			data.push(name);
		}

		return data;
	}

	TrendChart.prototype.optionXaxisBoundaryGap = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			if (s.type == "Column") {
				return true;
			}
		}
		return false;
	}

	TrendChart.prototype.optionXaxis = function () {
		var oXaxis = this.getXaxis();
		var show = oXaxis.visible;

		//Title
		var oTitle = oXaxis.title;
		var oTitleFont = oTitle.font;
		var name = oTitle.visible == true ? oTitle.text : "";
		var nameColor = this.optionColor(oTitle.textColor);

		//Min/Max
		var min = isNaN(oXaxis.minValue) ? null : oXaxis.minValue;
		var max = isNaN(oXaxis.maxValue) ? null : oXaxis.maxValue;

		//Line 
		var oLine = oXaxis.line;
		var lineVisible = oLine.visible;
		var lineColor = this.optionColor(oLine.lineColor);;
		var lineWidth = oLine.lineWidth;
		var lineType = this.optionBorderStyle(oLine.lineStyle);

		//Label
		var oLabel = oXaxis.label;
		var oLabelFont = oLabel.font;
		var labelVisible = oLabel.visible;
		var labelRotate = oLabel.vertical == true ? 90 : 0;
		var labelColor = this.optionColor(oLabel.textColor);

		//Tick - MajorTick
		var oTick = oXaxis.majorTick;
		var tickVisible = oTick.visible;
		var tickInside = oTick.type == "Outside" ? false : true;
		var tickLineColor = this.optionColor(oTick.lineColor);
		var tickLineType = this.optionBorderStyle(oTick.lineStyle);
		var tickLineWidth = oTick.lineWidth;
		var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

		//Grid - MajorGird
		var oMajor = oXaxis.majorGrid;
		var majorVisible = oMajor.visible;
		var majorLineColor = this.optionColor(oMajor.lineColor);
		var majorLineType = this.optionBorderStyle(oMajor.lineStyle);
		var majorLineWidth = oMajor.lineWidth;

		var item = {
			show: true,
			type: 'category',
			name: name,
			nameLocation: 'middle',
			nameGap: 25,
			nameTextStyle: {
				color: nameColor,
				fontStyle: this.optionFontStyle(oTitleFont.italic),
				fontWeight: this.optionFontWeight(oTitleFont.bold),
				fontFamily: oTitleFont.name,
				fontSize: oTitleFont.size
			},
			scale: true,
			boundaryGap: this.optionXaxisBoundaryGap(),
			min: min,
			max: max,
			axisLine: {
				show: lineVisible,
				onZero: true,
				lineStyle: {
					color: lineColor,
					width: lineWidth,
					type: lineType
				}
			},
			axisTick: {
				show: tickVisible,
				inside: tickInside,
				interval: tickStep,
				length: 1,
				lineStyle: {
					color: tickLineColor,
					type: tickLineType,
					width: tickLineWidth
				}
			},
			axisLabel: {
				show: true,
				rotate: labelRotate,
				textStyle: {
					color: labelColor,
					fontStyle: this.optionFontStyle(oLabelFont.italic),
					fontWeight: this.optionFontWeight(oLabelFont.bold),
					fontFamily: oLabelFont.name,
					fontSize: oLabelFont.size
				},
				formatter: null
			},
			splitLine: {
				show: majorVisible,
				interval: 'auto',
				lineStyle: {
					color: majorLineColor,
					width: majorLineWidth,
					type: majorLineType
				}
			},
			splitArea: {
				show: majorVisible,
				areaStyle: {
					color: ['rgba(260,260,260,0.3)', 'rgba(240,240,240,0.3)']
				}
			},
			data: [
				moment(new Date()).format("HH:mm:ss"),
				moment(new Date()).format("HH:mm:ss"),
				moment(new Date()).format("HH:mm:ss"),
				moment(new Date()).format("HH:mm:ss"),
				moment(new Date()).format("HH:mm:ss")
			]
		};
		return item;
	}

	TrendChart.prototype.optionYaxis = function () {
		var oYaxis = this.getYaxis();
		var show = oYaxis.visible;

		//Title
		var oTitle = oYaxis.title;
		var oTitleFont = oTitle.font;
		var name = oTitle.visible == true ? oTitle.text : "";
		var nameColor = this.optionColor(oTitle.textColor);

		//Min/Max
		var min = isNaN(oYaxis.minValue) ? null : oYaxis.minValue;
		var max = isNaN(oYaxis.maxValue) ? null : oYaxis.maxValue;

		//Line 
		var oLine = oYaxis.line;
		var lineVisible = oLine.visible;
		var lineColor = this.optionColor(oLine.lineColor);
		var lineWidth = oLine.lineWidth;
		var lineType = this.optionBorderStyle(oLine.lineStyle);

		//Label
		var oLabel = oYaxis.label;
		var oLabelFont = oLabel.font;
		var labelVisible = oLabel.visible;
		var labelRotate = oLabel.vertical == true ? 90 : 0;
		var labelColor = this.optionColor(oLabel.textColor);

		//Tick - MajorTick
		var oTick = oYaxis.majorTick;
		var tickVisible = oTick.visible;
		var tickInside = oTick.type == "Outside" ? false : true;
		var tickLineColor = this.optionColor(oTick.lineColor);
		var tickLineType = this.optionBorderStyle(oTick.lineStyle);
		var tickLineWidth = oTick.lineWidth;
		var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

		//Grid - MajorGird
		var oMajor = oYaxis.majorGrid;
		var majorVisible = oMajor.visible;
		var majorLineColor = this.optionColor(oMajor.lineColor);
		var majorLineType = this.optionBorderStyle(oMajor.lineStyle);
		var majorLineWidth = oMajor.lineWidth;

		var item = {
			show: show,
			type: 'value',
			name: name,
			nameLocation: 'end',
			nameTextStyle: {
				color: nameColor,
				fontStyle: this.optionFontStyle(oTitleFont.italic),
				fontWeight: this.optionFontWeight(oTitleFont.bold),
				fontFamily: oTitleFont.name,
				fontSize: oTitleFont.size
			},
			scale: true,
			boundaryGap: ['2%', '2%'],
			min: min,
			max: max,
			axisLine: {
				show: lineVisible,
				onZero: false,
				lineStyle: {
					color: lineColor,
					width: lineWidth,
					type: lineType
				}
			},
			axisTick: {
				show: tickVisible,
				inside: tickInside,
				interval: tickStep,
				lineStyle: {
					color: tickLineColor,
					type: tickLineType,
					width: tickLineWidth
				}
			},
			axisLabel: {
				show: labelVisible,
				rotate: labelRotate,
				textStyle: {
					color: labelColor,
					fontStyle: this.optionFontStyle(oLabelFont.italic),
					fontWeight: this.optionFontWeight(oLabelFont.bold),
					fontFamily: oLabelFont.name,
					fontSize: oLabelFont.size
				},
				formatter: null
			},
			splitLine: {
				show: majorVisible,
				interval: 'auto',
				lineStyle: {
					color: majorLineColor,
					width: majorLineWidth,
					type: majorLineType
				}
			},
			splitArea: {
				show: majorVisible,
				areaStyle: {
					color: ['rgba(240,240,240,0.3)', 'rgba(260,260,260,0.3)']
				}
			}
		};
		return item;
	}

	TrendChart.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = {};
			if (s.type == "Area")
				item = this.optionSeriesByArea(s);
			else if (s.type == "Column")
				item = this.optionSeriesByColumn(s);
			else
				item = this.optionSeriesByLine(s);

			data.push(item);
		}
		return data;
	}

	TrendChart.prototype.optionSeriesByLine = function (series) {

		var color = this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = oLine.lineColor == "" ? this.optionColor(series.color) : this.optionColor(oLine.lineColor);
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = oPoint.color == "" ? this.optionColor(series.color) : this.optionColor(oPoint.color);
		var pointSize = oPoint.size;
		var pointShow = (typeof oPoint.visible == "undefined") ? false : oPoint.visible;

		var item = {
			type: 'line',
			name: name,
			large: true,
			label: {
				normal: {
					show: labelShow,
					position: labelPosition,
					formatter: formatter,
					textStyle: {
						color: labelColor,
						fontStyle: this.optionFontStyle(oLabelFont.italic),
						fontWeight: this.optionFontWeight(oLabelFont.bold),
						fontFamily: oLabelFont.name,
						fontSize: oLabelFont.size
					}
				}
			},
			lineStyle: {
				normal: {
					color: lineColor,
					width: lineWidth,
					type: lineStyle
				}
			},
			symbol: pointType,
			symbolSize: pointSize,
			showSymbol: pointShow,
			itemStyle: {
				normal: {
					color: pointColor,
					opacity: opacity
				}
			},
			connectNulls: false,
			smooth: false,
			data: []
		};

		return item;
	}

	TrendChart.prototype.optionSeriesByArea = function (series) {

		var color = this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = oLine.lineColor == "" ? this.optionColor(series.color) : this.optionColor(oLine.lineColor);
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = oPoint.color == "" ? this.optionColor(series.color) : this.optionColor(oPoint.color);
		var pointSize = oPoint.size;
		var pointShow = (typeof oPoint.visible == "undefined") ? false : oPoint.visible;

		var item = {
			type: 'line',
			name: name,
			large: true,
			label: {
				normal: {
					show: labelShow,
					position: labelPosition,
					formatter: formatter,
					textStyle: {
						color: labelColor,
						fontStyle: this.optionFontStyle(oLabelFont.italic),
						fontWeight: this.optionFontWeight(oLabelFont.bold),
						fontFamily: oLabelFont.name,
						fontSize: oLabelFont.size
					}
				}
			},
			lineStyle: {
				normal: {
					color: lineColor,
					width: lineWidth,
					type: lineStyle
				}
			},
			symbol: pointType,
			symbolSize: pointSize,
			showSymbol: pointShow,

			smooth: false,
			itemStyle: {
				normal: {
					color: pointColor,
					areaStyle: {
						color: color,
						type: 'default',
						opacity: opacity
					}
				}
			},
			connectNulls: false,
			data: []
		};

		return item;
	}

	TrendChart.prototype.optionSeriesByColumn = function (series) {

		var color = this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = oLine.lineColor == "" ? this.optionColor(series.color) : this.optionColor(oLine.lineColor);
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'bar',
			large: true,
			name: name,
			barWidth: null,
			label: {
				normal: {
					show: labelShow,
					position: labelPosition,
					formatter: formatter,
					textStyle: {
						color: labelColor,
						fontStyle: this.optionFontStyle(oLabelFont.italic),
						fontWeight: this.optionFontWeight(oLabelFont.bold),
						fontFamily: oLabelFont.name,
						fontSize: oLabelFont.size
					}
				}
			},
			itemStyle: {
				normal: {
					color: color,
					barBorderColor: lineColor,
					barBorderWidth: lineWidth,
					opacity: opacity
				}
			},
			data: []
		};

		return item;
	}

	TrendChart.prototype.optionTextStyle = function () {
		var oFont = this.getFont();
		var color = this.getForegroundColor();

		var item = {
			color: color,
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	TrendChart.prototype.optionToolTip = function () {
		/*
		var item = {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c}'
		}
		var item = {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '20%'];
			}
		}
		*/
		var item = {
			trigger: 'axis'
		}
		return item;
	}

	TrendChart.prototype.optionDataZoom = function () {
		var show = this.getShowToolbar();

		var item = {
			show: show,
			type: 'slider',
			start: 0,
			end: 100
		}
		return item;
	}

	TrendChart.prototype.optionGrid = function () {
		var oPlot = this.getPlot();
		var backgroundColor = this.optionColor(oPlot.backgroundColor);;
		var borderColor = this.optionColor(oPlot.borderColor);
		var show = oPlot.borderWidth > 0 ? true : false;

		var oLegend = this.getLegend();
		var bottom = "6%";
		if (oLegend.visible == true && oLegend.position == "Bottom") {
			bottom = "11%";
		}

		var showToolbar = this.getShowToolbar();
		var top = "10%";
		if (showToolbar == true) {
			top = "17%";
		}

		var item = {
			show: show,
			containLabel: true,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: oPlot.borderWidth,
			top: top,
			left: '4%',
			right: '4%',
			bottom: bottom
		};
		return item;
	}


	//chart options
	TrendChart.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();
		var optGrid = this.optionGrid();
		var optXaxis = this.optionXaxis();
		var optYaxis = this.optionYaxis();
		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var optDataZoom = this.optionDataZoom();

		var option = {
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			grid: optGrid,
			xAxis: optXaxis,
			yAxis: optYaxis,
			series: optSeries,
			animation: false
			//dataZoom: optDataZoom,
		};

		return option;
	}

	TrendChart.prototype.toolbarButtonID = function (type) {
		if (type == "live") return this._id + "-toolbar-live";
		else if (type == "trend") return this._id + "-toolbar-trend";
		else if (type == "zoomin") return this._id + "-toolbar-zoomin";
		else if (type == "zoomout") return this._id + "-toolbar-zoomout";
		else if (type == "prev") return this._id + "-toolbar-prev";
		else if (type == "backward") return this._id + "-toolbar-backward";
		else if (type == "forward") return this._id + "-toolbar-forward";
		else if (type == "next") return this._id + "-toolbar-next";
		else if (type == "clock") return this._id + "-toolbar-clock";
		else if (type == "clock-content") return this._id + "-toolbar-clock-content";
		else if (type == "file") return this._id + "-toolbar-file";
		else if (type == "image") return this._id + "-toolbar-image";
		else return "";
	}

	TrendChart.prototype.initToolbar = function () {
		var pToolbar = $("#" + this._id + "-toolbar");
		$(pToolbar).html("");

		var show = this.getShowToolbar();
		if (show == false) {
			$(pToolbar).removeClass("show");
			$(pToolbar).addClass("hide");
			return;
		}

		$(pToolbar).removeClass("hide");
		$(pToolbar).addClass("show");

		var live = this.toolbarButtonID("live");
		var trend = this.toolbarButtonID("trend");
		var zoomin = this.toolbarButtonID("zoomin");
		var zoomout = this.toolbarButtonID("zoomout");
		var prev = this.toolbarButtonID("prev");
		var backward = this.toolbarButtonID("backward");
		var forward = this.toolbarButtonID("forward");
		var next = this.toolbarButtonID("next");
		var clock = this.toolbarButtonID("clock");
		var file = this.toolbarButtonID("file");
		var image = this.toolbarButtonID("image");
		var clockContent = this.toolbarButtonID("clock-content");

		var buttonHtml = '';
		buttonHtml += '<a id="' + live + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="live"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + trend + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="trend"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + zoomin + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="zoom in"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + zoomout + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="zoom out"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + prev + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="prev"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + backward + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="backward"><span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + forward + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="forward"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + next + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="next"><span class="glyphicon glyphicon-forward" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + clock + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="clock"><span class="glyphicon glyphicon-time" aria-hidden="true"></span><span id="' + clockContent + '" title="Trend Time"></span></a> ';
		buttonHtml += '<a id="' + file + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="text save"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a> ';
		buttonHtml += '<a id="' + image + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="image save"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span></a>';

		$("#" + this._id + "-toolbar").html(buttonHtml);

		var view = this;
		$("#" + live).click(function () {
			view.toolbarByLive();
		});
		$("#" + trend).click(function () {
			view.toolbarByLive();
		});
		$("#" + zoomin).click(function () {
			view.toolbarByZoomIn();
		});
		$("#" + zoomout).click(function () {
			view.toolbarByZoomOut();
		});
		$("#" + prev).click(function () {
			view.toolbarByPrev();
		});
		$("#" + backward).click(function () {
			view.toolbarByBackward();
		});
		$("#" + forward).click(function () {
			view.toolbarByForward();
		});
		$("#" + next).click(function () {
			view.toolbarByNext();
		});
		$("#" + clock).click(function () {
			view.toolbarByClick();
		});
		$("#" + file).click(function () {
			view.toolbarByFile();
		});
		$("#" + image).click(function () {
			view.toolbarByImage();
		});

		$("#" + trend).hide();
		this.toolbarByDisabled();
	}

	TrendChart.prototype.toolbarByDisabled = function () {
		var pPrev = $("#" + this.toolbarButtonID("prev"));
		var pBackward = $("#" + this.toolbarButtonID("backward"));
		var pForward = $("#" + this.toolbarButtonID("forward"));
		var pNext = $("#" + this.toolbarButtonID("next"));
		var pClock = $("#" + this.toolbarButtonID("clock"));

		var isLive = this.getIsLive();
		if (isLive == true) {
			pPrev.attr("disabled", true);
			pBackward.attr("disabled", true);
			pForward.attr("disabled", true);
			pNext.attr("disabled", true);
			pClock.attr("disabled", true);
		} else {
			pPrev.removeAttr("disabled");
			pBackward.removeAttr("disabled");
			pForward.removeAttr("disabled");
			pNext.removeAttr("disabled");
			pClock.removeAttr("disabled");
		}
	}

	TrendChart.prototype.toolbarByLive = function () {
		var isLive = this.getIsLive();
		this.setIsLive(!isLive);

		var pLive = $("#" + this.toolbarButtonID("live"));
		var pTrend = $("#" + this.toolbarButtonID("trend"));
		if (this.getIsLive() == true) {
			pLive.show();
			pTrend.hide();
			this.doViewDataByLive();
		} else {
			pLive.hide();
			pTrend.show();
			this.setStartTime(new Date());
		}

		this.toolbarByDisabled();
	}

	TrendChart.prototype.toolbarByZoomIn = function () {
		if (Math.floor(this.getTimeSpan()) <= 1) return;

		//우측-최근
		var timeSpan = this.getTimeSpan();
		this.setTimeSpan(timeSpan / 2);

		timeSpan -= this.getTimeSpan();

		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() + timeSpan));
		this.setStartTime(startTime);

		var islive = this.getIsLive();
		if(islive) return;
		this.doViewData();
	}

	TrendChart.prototype.toolbarByZoomOut = function () {
		var timeSpan = this.getTimeSpan();

		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() - timeSpan));
		this.setStartTime(startTime);
		this.setTimeSpan(timeSpan * 2);

		var islive = this.getIsLive();
		if(islive) return;
		this.doViewData();
	}

	TrendChart.prototype.toolbarByPrev = function () {
		var islive = this.getIsLive();
		if(islive) return;
		
		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() - this.getTimeSpan()));
		this.setStartTime(startTime);

		this.doViewData();
	}

	TrendChart.prototype.toolbarByBackward = function () {
		var islive = this.getIsLive();
		if(islive) return;
		
		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() - 1));
		this.setStartTime(startTime);

		this.doViewData();
	}

	TrendChart.prototype.toolbarByForward = function () {
		var islive = this.getIsLive();
		if(islive) return;

		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() + 1));
		this.setStartTime(startTime);

		this.doViewData();
	}

	TrendChart.prototype.toolbarByNext = function () {
		var islive = this.getIsLive();
		if(islive) return;
		
		var startTime = this.getStartTime();
		startTime = new Date(startTime.setSeconds(startTime.getSeconds() + this.getTimeSpan()));
		this.setStartTime(startTime);

		this.doViewData();
	}

	TrendChart.prototype.toolbarByClick = function () {
		var islive = this.getIsLive();
		if(islive) return;

		var contentID = this.toolbarButtonID("clock-content");
		var datepickerID = this._id + "-toolbar-clock-datepicker";
		var timeHourID = this._id + "-toolbar-clock-time-hh";
		var timeMinID = this._id + "-toolbar-clock-time-mm";
		var timeSecID = this._id + "-toolbar-clock-time-ss";
		var spanHourID = this._id + "-toolbar-clock-timespan-hh";
		var spanMinID = this._id + "-toolbar-clock-timespan-mm";
		var spanSecID = this._id + "-toolbar-clock-timespan-ss";

		var html = '';
		html += '<div>';
		html += '	<div class="panel panel-default">';
		html += '		<div class="panel-heading box-white">';
		html += '			<h2 class="panel-title size-15">Start Time</h2>';
		html += '		</div>';
		html += '		<div class="panel-body padding-left-20">';
		html += '			<div class="row">';
		html += '				<div class="col-xs-3 text-right">';
		html += '					<span>Date</span>';
		html += '				</div>';
		html += '				<div class="col-xs-9">';
		html += '					<div class="input-group date width-200" id="' + datepickerID + '">';
		html += '						<input type="text" class="form-control height-28" />';
		html += '						<span class="input-group-addon padding-2">';
		html += '							<span class="glyphicon glyphicon-calendar"></span>';
		html += '						</span>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row padding-top-3">';
		html += '				<div class="col-xs-3 text-right">';
		html += '					<span>Time</span>';
		html += '				</div>';
		html += '				<div class="col-xs-9">';
		html += '					<input id="' + timeHourID + '" name="value" value="0" class="width-30"> : ';
		html += '					<input id="' + timeMinID + '" name="value" value="0" class="width-30"> : ';
		html += '					<input id="' + timeSecID + '" name="value" value="0" class="width-30">';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		html += '<div>';
		html += '	<div class="panel panel-default margin-bottom-0">';
		html += '		<div class="panel-heading box-white">';
		html += '			<h2 class="panel-title size-15">Time Span</h2>';
		html += '		</div>';
		html += '		<div class="panel-body padding-left-20">';
		html += '			<div class="row padding-top-3">';
		html += '				<div class="col-xs-3">';
		html += '					<span></span>';
		html += '				</div>';
		html += '				<div class="col-xs-9">';
		html += '					<input id="' + spanHourID + '" name="value" value="0" class="width-30"> : ';
		html += '					<input id="' + spanMinID + '" name="value" value="0" class="width-30"> : ';
		html += '					<input id="' + spanSecID + '" name="value" value="0" class="width-30">';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';

		$("#" + contentID).html(html);

		//time/span time 개체 생성
		var spinHour = $("#" + timeHourID).spinner({
			spin: function (event, ui) {
				if (ui.value > 23) {
					$(this).spinner("value", 23);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		var spinMin = $("#" + timeMinID).spinner({
			spin: function (event, ui) {
				if (ui.value > 59) {
					$(this).spinner("value", 59);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		var spinSec = $("#" + timeSecID).spinner({
			spin: function (event, ui) {
				if (ui.value > 59) {
					$(this).spinner("value", 59);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		var spanHour = $("#" + spanHourID).spinner({
			spin: function (event, ui) {
				if (ui.value > 24) {
					$(this).spinner("value", 24);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		var spanMin = $("#" + spanMinID).spinner({
			spin: function (event, ui) {
				if (ui.value > 59) {
					$(this).spinner("value", 59);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		var spanSec = $("#" + spanSecID).spinner({
			spin: function (event, ui) {
				if (ui.value > 59) {
					$(this).spinner("value", 59);
					return false;
				} else if (ui.value < 0) {
					$(this).spinner("value", 0);
					return false;
				}
			}
		});

		//start time 기본값 설정
		var startTime = this.getStartTime();
		spinHour.spinner("value", startTime.getHours());
		spinMin.spinner("value", startTime.getMinutes());
		spinSec.spinner("value", startTime.getSeconds());

		//spantime 기본값 설정
		var timeSpan = this.getTimeSpan();
		spanHour.spinner("value", parseInt(timeSpan / 3600));
		spanMin.spinner("value", parseInt((timeSpan % 3600) / 60));
		spanSec.spinner("value", parseInt(timeSpan % 60));

		//DatePicker 개체 생성
		var view = this;
		var dateFormat = "YYYY-MM-DD";
		var nowDate = moment(startTime).format(dateFormat);

		$("#" + datepickerID).datetimepicker({
			defaultDate: nowDate,
			format: dateFormat,
			keyBinds: {
				left: null,
				right: null,
				t: null,
				down: function (widget) {
					if (!widget) {
						this.show();
						return;
					}
				},
				'delete': null
			}
		});

		$("#" + contentID).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				" Apply ": function (evt) {

					var date = $("#" + datepickerID).find("input").val()
					var hour = spinHour.spinner("value");
					var min = spinMin.spinner("value");
					var sec = spinSec.spinner("value");
					//var startTime = new Date(date + " " + hour + ":" + min + ":" + sec); //익스플로러에서 invalid 반환됨
					var yyyy = moment(date).format("YYYY");
					var mm = moment(date).format("MM");
					var dd = moment(date).format("DD");
					var startTime = new Date(yyyy, mm - 1, dd, hour, min, sec);

					var tHour = parseInt(spanHour.spinner("value"));
					var tMin = parseInt(spanMin.spinner("value"));
					var tSec = parseInt(spanSec.spinner("value"));
					var timeSpan = tHour * 3600 + tMin * 60 + tSec;

					view.setStartTime(startTime);
					view.setTimeSpan(timeSpan);

					$(this).dialog("close");
					$("#" + contentID).html("");
					$("#xisom-modal").html("");

					view.doViewData();
				},
				Cancel: function () {
					$(this).dialog("close");
					$("#" + contentID).html("");
					$("#xisom-modal").html("");
				}
			}
		});
	}

	TrendChart.prototype.toolbarByFile = function () {

		var viewData = this.getViewData();

		var names = viewData.names;//["Time", "Data A", "Data B"]		
		var items = viewData.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]				
		var namesCount = names.length;
		var itemsCount = items.length;

		var text = "";
		var header = "";
		for (var k = 0; k < namesCount; k++) {
			header += "," + names[k];
		}

		var data = "";
		for (var n = 0; n < itemsCount; n++) {
			var item = items[n];
			var dataTmp = "";
			for (var k = 0; k < namesCount; k++) {
				var value = item[k];
				if (page.isDate(value) == true) {
					value = moment(value).format("YYYY-MM-DD HH:mm:ss.SSS");
				}
				dataTmp += "," + value;
			}
			data += dataTmp.substring(1);
			data += "\r\n";
		}

		text = header.substring(1);
		text += "\r\n";
		text += data;

		var filename = "TrendChart-" + new Date().format("yyyyMMddHHmmss") + ".csv";
		var blob = new Blob([text], { "type": "application/x-msdownload" });

		this.downloadCanvas(blob, filename);
	}

	TrendChart.prototype.toolbarByImage = function () {
		var chart = this.getChart();

		var data = chart.getDataURL({
			pixelRatio: 1,
			backgroundColor: '#fff'
		});

		var filename = "TrendChart-" + new Date().format("yyyyMMddHHmmss") + ".png";
		var image_data = atob(data.split(',')[1]);
		var arraybuffer = new ArrayBuffer(image_data.length);
		var view = new Uint8Array(arraybuffer);

		for (var i = 0; i < image_data.length; i++) {
			view[i] = image_data.charCodeAt(i) & 0xff;
		}
		var blob = new Blob([arraybuffer], { type: 'application/x-msdownload' });

		this.downloadCanvas(blob, filename);
	}

	TrendChart.prototype.downloadCanvas = function (blob, filename) {

		var link = document.createElement('a');
		link.setAttribute("download", filename);
		link.href = URL.createObjectURL(blob);

		// IE, Edge
		if (window.navigator.msSaveBlob) {
			console.log('IE, Edge');
			window.navigator.msSaveOrOpenBlob(blob, filename);
		}
			//Chrome
		else {
			console.log('Chrome');
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", false, true);
			link.dispatchEvent(evt);
		}
	}

	//xaxis data
	TrendChart.prototype.xAxisDataByValue = function (xValue) {
		return xValue;
	}

	//series data
	TrendChart.prototype.seriesDataByValue = function (yValue) {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;
		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var name = this.optionSeriesName(s);
			var value = yValue[name]
			var item = {
				name: name,
				data: value
			};
			data.push(item);
		}

		return data;
	}


	TrendChart.prototype.drawChart = function () {
		var chart = this.getChart();
		var xAxisData = this.xAxisDataByValue(this.xValue);//x value
		var seriesData = this.seriesDataByValue(this.yValue);//y value

		this.showLoading(chart);

		chart.setOption({
			xAxis: {
				data: xAxisData
			},
			series: seriesData
		});

		this.hideLoading(chart);
	}

	TrendChart.prototype.showLoading = function (chart) {
		var isLive = this.getIsLive();
		if (isLive == false) {
			chart.showLoading();
		}
	}

	TrendChart.prototype.hideLoading = function (chart) {
		var isLive = this.getIsLive();
		if (isLive == false) {
			chart.hideLoading();
		}
	}

	//set x-y value 
	TrendChart.prototype.setValueByViewData = function (data) {
		if (data == null) return;

		// view data의 names 값 - series name
		// chart에서는 legend name과 series name이 동일해야함
		// legend name은 text 값으로 출력
		// 그래서 view data의 names 값 변경처리
		for (var k = 1; k < data.names.length; k++) {
			//["Time", "Series1", "Series2"] 
			var name = data.names[k];

			var s = this.optionSeriesByName(name);
			if (s == null) continue;

			//["Time", "Data A", "Data B"]
			data.names[k] = this.optionSeriesName(s);
		}

		
		this.setViewData(data);//file export용

		var items = data.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		var oXFormat = this.getXaxis().format;
		var oYFormat = this.getYaxis().format;
		var tXFormat = oXFormat;

		//-------------------------------------------- x value
		this.xValue = [];
		for (var n = 0; n < itemsCount; n++) {
			var item = items[n];
			if (!item) continue;

			if (page.isDate(item[0]) == true) {
				if (tXFormat.category != "DateTime" && tXFormat.format == "") {
					tXFormat.format = "HH:mm:ss";
				}
			}
			var x = page.valueByFormat(tXFormat, item[0]);
			this.xValue.push(x);
		}

		//-------------------------------------------- y value
		for (var k = 1; k < namesCount; k++) {
			var name = names[k];
			if (!name) continue;

			this.yValue[name] = [];
			for (var n = 0; n < itemsCount; n++) {
				
				var item = items[n];
				if (!item) continue;

				
				var y = page.valueByFormat(oYFormat, item[k]);
				this.yValue[name].push(y);
			}
		}

		this.drawChart();
	}

	//get view-data
	TrendChart.prototype.doViewData = function () {
		var isLive = this.getIsLive();
		if (isLive) {
			this.doViewDataByLive();
		} else {
			this.doViewDataByTrend();
		}
	}

	//get live view-data
	TrendChart.prototype.doViewDataByLive = function () {
		if (this.getIsLive() == false) return;

		var view = this;
		var reqTime = this.getRefreshTime();

		// console.log("reqTime: " + reqTime);

		var timeSpan = this.getTimeSpan();
		var timeStamp = this.getStartTime();
		var totalTick = this.getToTalTick();
		var samplingTime = this.getSamplingTime();

		var trendChart = this;
		var params = {
			timeStamp: timeStamp,
			timeSpan: timeSpan
		}
		scada.getViewLiveData(view.pid, view.id, params, function (data) {

			if (data != null) {
				var itemCount = data.items.length;
				var sIdx = 0;
				var eIdx = itemCount - 1;
				if (view.reqLimit < itemCount) {
					sIdx = itemCount - view.reqLimit;
				}
				
				data.items = data.items.slice(sIdx, eIdx);

				var loop = totalTick - data.items.length;
				if (totalTick - 1 > data.items.length && data.items.length < view.reqLimit - 1) {
					var dummyData = trendChart.getDummyData();
					if (dummyData.length < loop) {
						//현재 더미데이터가 없거나 있어도 모잘라서 다시 만들어야 하는 경우					
						var nowDate = data.items.length > 0 ? data.items[0][0] : new Date();
						var d = new Date(nowDate);
						for (var i = 0; i < loop; i++) {
							d.setMilliseconds(d.getMilliseconds() - samplingTime * 1000);
							var dummy = [d.toISOString()];
							dummyData.unshift(dummy);
						}
					}
					else {
						//만들어둔 더미데이터를 잘라서 쓰면 되는 경우				
						dummyData = dummyData.slice((dummyData.length + data.items.length) - totalTick);
					}
					trendChart.setDummyData(dummyData);
					data.items = dummyData.concat(data.items);
				}
				view.setValueByViewData(data);
			}
			setTimeout(function () {
				view.doViewDataByLive();
			}, reqTime);
		}, this.reqLimit);
	}

	//get trend view-data
	TrendChart.prototype.doViewDataByTrend = function () {
		if (this.getIsLive() == true) return;

		var view = this;

		var timeSpan = this.getTimeSpan();
		var timeStamp = this.getStartTime();
		var params = {
			timeStamp: timeStamp,
			timeSpan: timeSpan
		}
		scada.getViewTrendData(this.pid, this._id, params, function (data) {
			if (data == null) return;

			view.setValueByViewData(data);
		});
	}

	//chart 초기화
	TrendChart.prototype.initChart = function () {
		var el = $("#" + this._id)[0];

		var chart = echarts.init(el);
		var option = this.options();
		chart.setOption(option);

		this.setChart(chart);
	}

	TrendChart.prototype.dataRefresh = function () {
	}

	TrendChart.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
	}

	TrendChart.prototype.test = function () {

		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 5000; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);

			temp.push(item);
		}

		var data = {
			names: ["Time", "series1", "series2"],
			items: temp
		}

		var view = this;
		var itemCount = data.items.length;
		var sIdx = 0;
		var eIdx = itemCount - 1;
		if (view.reqLimit < itemCount) {
			sIdx = itemCount - view.reqLimit;
		}

		data.items = data.items.slice(sIdx, eIdx);

		this.setValueByViewData(data);

		var view = this;
		setTimeout(function () {
			view.test();
		}, 100);
	}


	////////////////////////// Event Listener ///////////////////
	// Add Event Listener
    TrendChart.prototype.addEventListener = function (type, callback, useCapture) {
        var view = this;
        page.getElementById(this._id).addEventListener(type, view.newCallback(callback), useCapture);
    };
	
	// Remove event listener
    TrendChart.prototype.removeEventListener = function (type, callback, useCapture) {
        var view = this;
        page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
    };

    TrendChart.prototype.newCallback = function (callback) {
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


	///////////////////////// SCRIPT /////////////////////////////////////
	Object.defineProperty(TrendChart.prototype, "isLive", {
		get: function() {
			return this.getIsLive();
		},
		set: function(value) {
			var isLive = this.getIsLive();
			if(isLive == value) return;
			this.setIsLive(value);

			var pLive = $("#" + this.toolbarButtonID("live"));
			var pTrend = $("#" + this.toolbarButtonID("trend"));
			if (value == true) {
				pLive.show();
				pTrend.hide();
			} else {
				pLive.hide();
				pTrend.show();
				this.setStartTime(new Date());
			}

			this.toolbarByDisabled();

			this.doViewData();
		}
	});
	Object.defineProperty(TrendChart.prototype, "timeSpan", {
		get: function() {
			return this.getTimeSpan();
		},
		set: function(value) {
			this.setTimeSpan(value);
		}
	});
	Object.defineProperty(TrendChart.prototype, "startTime", {
		get: function() {
			return this.getStartTime();
		},
		set: function(value) {
			this.setStartTime(value);
		}
	});
	Object.defineProperty(TrendChart.prototype, "samplingTime", {
		get: function() {
			return this.getSamplingTime();
		}
	});
	Object.defineProperty(TrendChart.prototype, "refreshTime", {
		get: function() {
			return this.getRefreshTime();
		},
		set: function(value) {
			this.setRefreshTime(value);
		}
	});
	Object.defineProperty(TrendChart.prototype, "showToolbar", {
		get: function() {
			return this.getShowToolbar();
		},
		set: function(value) {
			this.setShowToolbar(value);
		}
	});	
	TrendChart.prototype.exportToCSV = function(path){
		this.toolbarByFile();
	}

	page.createTrendChart = function (arg) {
		var view = new TrendChart(arg);
		page.protoViews[view._id] = view;

		view.initToolbar();
		view.initChart();
		view.doViewData();
		// view.test();
		return view;
	}

})();
