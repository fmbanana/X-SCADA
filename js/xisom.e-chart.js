if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// MixedChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function MixedChartView(arg) {
		
		ChartElement.call(this, arg);
	}
	MixedChartView.prototype = Object.create(ChartElement.prototype);
	MixedChartView.prototype.constructor = MixedChartView;

	MixedChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	MixedChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}
	MixedChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}	
	MixedChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}
	MixedChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}
	MixedChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this.angle = value;
	}

	MixedChartView.prototype.setFillStyle = function (value) { }

	MixedChartView.prototype.setFillOpacity = function (value) { }

	MixedChartView.prototype.setStrokeStyle = function (value) { }

	MixedChartView.prototype.setStrokeOpacity = function (value) { }

	MixedChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	MixedChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	MixedChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	MixedChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	MixedChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	MixedChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	MixedChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	MixedChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	MixedChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'axis'
		}
		return item;
	}

	MixedChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);
		var pad = this.optionLegendPadding(oLegend.position);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			data: data,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: pad,
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

	MixedChartView.prototype.optionXaxis = function () {
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
			show: show,
			type: 'category', //category, value
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
				length: 1,
				lineStyle: {
					color: lineColor,
					width: lineWidth,
					type: lineType
				}
			},
			axisTick: {
				show: tickVisible,
				inside: false,
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
					color: ['rgba(260,260,260,0.3)', 'rgba(240,240,240,0.3)']
				}
			},
			// data: [0, 2, 4, 6, 8, 10]
		};
		return item;
	}

	MixedChartView.prototype.optionYaxis = function () {
		var oYaxis = this.getYaxis();
		var show = oYaxis.visible;

		//Title
		var oTitle = oYaxis.title;
		var oTitleFont = oTitle.font;
		var name = oTitle.visible == true ? oTitle.text : "";
		var nameColor = this.optionColor(oTitle.textColor);

		//Min/Max
		var min = isNaN(oYaxis.minValue) ? 0 : oYaxis.minValue;
		var max = isNaN(oYaxis.maxValue) ? 100 : oYaxis.maxValue;

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
		var labelValue = Math.max(max, min);
		var lableLength = this.TextWidthSize(labelValue, oLabel.font.name, oLabel.font.size) + 5;
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
			position: 'left',
			nameLocation: 'center',
			nameGap: lableLength,
			nameRotate: 90,
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

	MixedChartView.prototype.optionYAxisExtras = function () {
		var view = this;
		var oYAxisExtras = this.getYAxisExtras();
		if(oYAxisExtras == undefined) return [];
		var count = oYAxisExtras.length;
		var items = [];
		var positionOffset = 0;		
		var margin = 0;

		for(var i = 0; i < count; i++) {
			var oYaxis = oYAxisExtras[i];
			var show = oYaxis.visible;

			//Title
			var oTitle = oYaxis.title;
			var oTitleFont = oTitle.font;
			var name = oTitle.visible == true ? oTitle.text : "";
			var nameColor = this.optionColor(oTitle.textColor);
			var nameRotate = 270;
			var titleHeight = oTitle.visible == true ? (oTitle.text.length > 0 ? this.TextHeightSize("AAAA", oTitle.font.name, oTitle.font.size) : 0) : 0;
			
			//Min/Max
			var min = isNaN(oYaxis.minValue) ? 0 : oYaxis.minValue;
			var max = isNaN(oYaxis.maxValue) ? 100 : oYaxis.maxValue;

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
			var labelValue = Math.max(max, min);
			var lableLength = this.TextWidthSize(labelValue, oLabel.font.name, oLabel.font.size);

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
			var majorLineColor = this.optionColor(oMajor.color);
			var majorLineType = this.optionBorderStyle("Solid");
			var majorLineWidth = 1;
			var majorcount = oMajor.count;

			var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);		

			var item = {
				show: show,
				type: 'value',
				name: name,
				position: 'right',
				nameLocation: 'middle',
				nameRotate: nameRotate,
				nameGap: lableLength - 10,
				offset: positionOffset,
				nameTextStyle: {
					lineHeight: 60,
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
				// interval: majorinterval,
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
					}
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

			if(show){
				positionOffset += (30 + lableLength + titleHeight);
			}
			items.push(item);
		}
        return items;
	}	

	MixedChartView.prototype.optionGrid = function () {
		var oPlot = this.getPlot();
		var backgroundColor = this.optionColor(oPlot.backgroundColor);;
		var borderColor = this.optionColor(oPlot.borderColor);
		var show = oPlot.borderWidth > 0 ? true : false;

		var chartHeight = this.getHeight();
		var chartWidth = this.getWidth();
		var margin = 20;
		var topper = margin;
		var bottomer = 10;

		//////// Chart Title ///////
		var oTitle = this.getTitle();
		if(oTitle.visible == true && oTitle.text.length > 0){			
			var hsize = this.TextHeightSize(oTitle.text, oTitle.font.name, oTitle.font.size);
			topper += hsize;
		}

		//////// Chart Legend ///////
		var oLegend = this.getLegend();
		var bottom = "6%";
		if (oLegend.visible == true && oLegend.position != "Top") {
			bottom = "11%";
		}

		if(oLegend.visible == true){
			if (oLegend.position == "Default" || oLegend.position == "Top" || oLegend.position == "TopLeft" || oLegend.position == "TopRight") {
				topper += 20;
            }
            else if (oLegend.position == "Bottom" || oLegend.position == "BottomLeft" || oLegend.position == "BottomRight") {
                bottomer += 20;
            }
		}

		//////// Chart XAxis ///////
		var oXAxis = this.getXaxis();
		if (oXAxis.title.text.length > 0) {
			var hsize = this.TextHeightSize(oXAxis.title.text, oXAxis.title.font.name, oXAxis.title.font.size);
            bottomer += hsize;
		}
		
		//////// Chart YAxis ///////
		var leftVal = 0;
		var rightVal = 0;
		var yAxisExtra = this.getYAxisExtras();
		var extraCount = yAxisExtra.length;
		var positionOffset = 0;
		var margin = 0;
		for(var i = 0; i < extraCount; i ++){
			var yAxis = yAxisExtra[i];
			if(yAxis.visible == false){
				var oTitle = yAxis.title;
				var titleHeight = oTitle.visible == true ? (oTitle.text.length > 0 ? this.TextHeightSize("AAAA", oTitle.font.name, oTitle.font.size) : 0) : 0;
				var ymin = isNaN(yAxis.minValue) ? 0 : yAxis.minValue;
				var ymax = isNaN(yAxis.maxValue) ? 1000 : yAxis.maxValue;
				var labelValue = Math.max(ymax, ymin);
				var lableLength = this.TextWidthSize(labelValue, yAxis.label.font.name, yAxis.label.font.size) - 5;
				positionOffset += (30 + lableLength + titleHeight);
			}
		}
		
		if(positionOffset > 0){
			rightVal = positionOffset * 100 / chartWidth;
		}
		var item = {
			show: show,
			containLabel: true,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: oPlot.borderWidth,
			top: topper,
			left: 5 + '%' ,
			right: (5 * extraCount - rightVal) + '%',
			bottom: bottomer
		};
		
		return item;
	}

	MixedChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;

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

	MixedChartView.prototype.optionSeriesByLine = function (series) {

		var palette = this.getPalette();
		var color = (palette != "")? null : this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;
	
		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}
	
		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;
	
		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = (palette != "")? null : (oPoint.color == "" ? this.optionPointColor(series.color) : this.optionPointColor(oPoint.color));
		var pointSize = oPoint.size;
		var pointShow = (typeof oPoint.visible == undefined) ? false : oPoint.visible;
		
		var yaxisindex = parseInt(series.axisExtra);
	
		var item = {
			type: 'line',
			name: name,
			yAxisIndex: (yaxisindex == -1)? 0: yaxisindex + 1,
			color: color,
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
			data: [[0, NaN], [2, NaN], [4, NaN], [6, NaN], [8, NaN], [10, NaN]]
		};
	
		return item;
	}
	
	MixedChartView.prototype.optionSeriesByArea = function (series) {
	
		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var color = (palette != "")? null : this.optionColor(series.color);
		var opacity = series.opacity;
	
		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}
	
		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;
	
		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = (palette != "")? null : (oPoint.color == "" ? this.optionPointColor(series.color) : this.optionPointColor(oPoint.color));
		var pointSize = oPoint.size;
		var pointShow = (typeof oPoint.visible == undefined) ? false : oPoint.visible;
	
		var yaxisindex = parseInt(series.axisExtra);
	
		var item = {
			type: 'line',
			name: name,
			yAxisIndex: (yaxisindex == -1)? 0: yaxisindex + 1,
			color: color,
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
						color: pointColor,
						type: 'default',
						opacity: opacity
					}
				}
			},
			connectNulls: false,
			data: [[0, NaN], [2, NaN], [4, NaN], [6, NaN], [8, NaN], [10, NaN]]
		};
	
		return item;
	}
	
	MixedChartView.prototype.optionSeriesByColumn = function (series) {
	
		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var color = (palette != "")? null : this.optionColor(series.color);
		var opacity = series.opacity;
	
		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}
	
		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;
	
		var yaxisindex = parseInt(series.axisExtra);
	
		var item = {
			type: 'bar',
			name: name,
			yAxisIndex: (yaxisindex == -1)? 0: yaxisindex + 1,
			color: color,
			large: true,
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
					color: lineColor,
					barBorderColor: "#A3A3A3",
					barBorderWidth: lineWidth,
					opacity: opacity,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 10,
					shadowOffsetX: 2
				}
			},
			data: [[0, NaN], [2, NaN], [4, NaN], [6, NaN], [8, NaN], [10, NaN]]
		};
	
		return item;
	}

	//chart options
	MixedChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();		
		var optXaxis = this.optionXaxis();
		var optYaxis = this.optionYaxis();
		var multiYAxis = this.optionYAxisExtras();
		multiYAxis.splice(0,0, optYaxis);
		var optGrid = this.optionGrid();
		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			grid: optGrid,
			xAxis: optXaxis,
			yAxis: multiYAxis,
			series: optSeries,
			animation: false,
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 100
			}]
		};
		return option;
	}

	MixedChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var oXFormat = this.getXaxis().format;
		var oYFormat = this.getYaxis().format;

		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = page.valueByFormat(oXFormat, item.x);
				var yval = page.valueByFormat(oYFormat, item.y);
				data.push([xval, yval]);
			}
			seriesOptions[i]["data"] = data;
		}

		var xaxisOption = this.optionXaxis();
		var options = {
			xAxis: xaxisOption,
			series: seriesOptions
		};
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	MixedChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		// view data의 names 값 - series name
		// chart에서는 legend name과 series name이 동일해야함
		// legend name은 text 값으로 출력
		// 그래서 view data의 names 값 변경처리
		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k]; //["Time", "Series1", "Series2"] 
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s); //["Time", "Data A", "Data B"]
		}

		var items = data.items; //[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}
		this.drawChart();
	}

	//get view-data
	MixedChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	MixedChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	MixedChartView.prototype.doViewDataByDatabase = function () {
		var view = this;
		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null && data) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	MixedChartView.prototype.initChart = function () {
		
		var option = this.options();
		var chart = this.getChart();
		if(chart == null || chart == undefined){
			var el = $("#" + this._id)[0];
			var chart = echarts.init(el);		
			this.setChart(chart);
		}
		chart.setOption(option);
	}

	MixedChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	MixedChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	MixedChartView.prototype.test = function () {

		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 100; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 70;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);
			item.push(c1);
			temp.push(item);
		}

		var data = {
			names: ["Time", "series1", "series2", "series3"],
			items: temp
		}

		this.setValueByViewData(data);
	}

	//options값 강제설정
	MixedChartView.prototype.initOptions = function () {
		var oYaxis = this.getYaxis();
		var oXaxis = this.getXaxis();
		oYaxis.majorGrid.lineStyle = "Dot";
		oXaxis.majorGrid.lineStyle = "Dot";
	}

	page.createMixedChartView = function (arg) {
		var view = new MixedChartView(arg);
		page.protoViews[view._id] = view;

		view.initOptions();
		view.initChart();
		view.doViewData();
		return view;
	}

}());

/////////////////////////////////////////////////////////////////////////////////////
// ScatterPlotView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function ScatterPlotView (arg) {
		
		ChartElement.call(this, arg);
	}
	ScatterPlotView.prototype = Object.create(ChartElement.prototype);
	ScatterPlotView.prototype.constructor = ScatterPlotView;

	ScatterPlotView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	ScatterPlotView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	ScatterPlotView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	ScatterPlotView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	ScatterPlotView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	ScatterPlotView.prototype.setFillStyle = function (value) { }

	ScatterPlotView.prototype.setFillOpacity = function (value) { }

	ScatterPlotView.prototype.setStrokeStyle = function (value) { }

	ScatterPlotView.prototype.setStrokeOpacity = function (value) { }

	ScatterPlotView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	ScatterPlotView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	ScatterPlotView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	ScatterPlotView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	ScatterPlotView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	ScatterPlotView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	ScatterPlotView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}
	
	ScatterPlotView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);
		var pad = this.optionLegendPadding(oLegend.position);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			data: data,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: pad,
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

	ScatterPlotView.prototype.optionXaxis = function () {
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
		var lineColor = this.optionColor(oLine.lineColor);
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
			show: show,
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
			boundaryGap: true,
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
				inside: false,
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
					color: ['rgba(260,260,260,0.3)', 'rgba(240,240,240,0.3)']
				}
			},
			//data: [0, 2, 4, 6, 8, 10]
		};
		return item;
	}

	ScatterPlotView.prototype.optionYaxis = function () {
		var oYaxis = this.getYaxis();
		var show = oYaxis.visible;

		//Title
		var oTitle = oYaxis.title;
		var oTitleFont = oTitle.font;
		var name = oTitle.visible == true ? oTitle.text : "";
		var nameColor = this.optionColor(oTitle.textColor);

		//Min/Max
		var min = isNaN(oYaxis.minValue) ? 0 : oYaxis.minValue;
		var max = isNaN(oYaxis.maxValue) ? 100 : oYaxis.maxValue;

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
		var labelValue = Math.max(max, min);
		var lableLength = this.TextWidthSize(labelValue, oLabel.font.name, oLabel.font.size) + 5;

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
			position: 'left',
			nameLocation: 'center',
			nameGap: lableLength + 5,
			nameRotate: 90,
			nameTextStyle: {
				color: nameColor,
				fontStyle: this.optionFontStyle(oTitleFont.italic),
				fontWeight: this.optionFontWeight(oTitleFont.bold),
				fontFamily: oTitleFont.name,
				fontSize: oTitleFont.size
			},
			scale: true,
			boundaryGap: false,
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

	ScatterPlotView.prototype.optionYAxisExtras = function () {
		var view = this;
		var oYAxisExtras = this.getYAxisExtras();
		if(oYAxisExtras == undefined) return [];
		var count = oYAxisExtras.length;
		var items = [];
		var positionOffset = 0;		
		var margin = 0;

		for(var i = 0; i < count; i++){
			var oYaxis = oYAxisExtras[i];
			var show = oYaxis.visible;

			//Title
			var oTitle = oYaxis.title;
			var oTitleFont = oTitle.font;
			var name = oTitle.visible == true ? oTitle.text : "";
			var nameColor = this.optionColor(oTitle.textColor);
			var nameRotate = 270;
			var titleHeight = oTitle.visible == true ? (oTitle.text.length > 0 ? this.TextHeightSize("AAAA", oTitle.font.name, oTitle.font.size) : 0) : 0;
			
			//Min/Max
			var min = isNaN(oYaxis.minValue) ? 0 : oYaxis.minValue;
			var max = isNaN(oYaxis.maxValue) ? 100 : oYaxis.maxValue;

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
			var labelValue = Math.max(max, min);
			var lableLength = this.TextWidthSize(labelValue, oLabel.font.name, oLabel.font.size);

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
			var majorLineColor = this.optionColor(oMajor.color);
			var majorLineType = this.optionBorderStyle("Solid");
			var majorLineWidth = 1;
			var majorcount = oMajor.count;

			var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);		

			var item = {
				show: show,
				type: 'value',
				name: name,
				position: 'right',
				nameLocation: 'middle',
				nameRotate: nameRotate,
				nameGap: lableLength - 10,
				offset: positionOffset,
				nameTextStyle: {
					lineHeight: 60,
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
				// interval: majorinterval,
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
					}
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

			if(show){
				positionOffset += (30 + lableLength + titleHeight);
			}
			items.push(item);
		}
        return items;
	}	
	
	ScatterPlotView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;
		
		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;

			var item = this.optionSeriesByScatter(s);
			data.push(item);
		}
		return data;
	}

	ScatterPlotView.prototype.optionSeriesByScatter = function (series) {

		var palette = this.getPalette();
		var color = (palette != "")? null : this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;
	
		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}
	
		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;
	
		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = (palette != "")? null : (oPoint.color == "" ? this.optionPointColor(series.color) : this.optionPointColor(oPoint.color));
		var pointShow = (typeof oPoint.visible == undefined) ? false : oPoint.visible;
		var pointSize = pointShow ? oPoint.size : 0;
		
		var item = {
			type: 'scatter',
			name: name,
			color: color,
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
			itemStyle: {
				normal: {
					color: pointColor,
					opacity: opacity
				}
			},
			connectNulls: false,
			smooth: false,
			data: [[0, NaN], [2, NaN], [4, NaN], [6, NaN], [8, NaN], [10, NaN]]
		};
	
		return item;
	}

	ScatterPlotView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	ScatterPlotView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'axis'
		}
		return item;
	}

	ScatterPlotView.prototype.optionGrid = function () {
		var oPlot = this.getPlot();
		var backgroundColor = this.optionColor(oPlot.backgroundColor);;
		var borderColor = this.optionColor(oPlot.borderColor);
		var show = oPlot.borderWidth > 0 ? true : false;

		var chartHeight = this.getHeight();
		var chartWidth = this.getWidth();
		var margin = 20;
		var topper = margin;
		var bottomer = 10;

		//////// Chart Title ///////
		var oTitle = this.getTitle();
		if(oTitle.visible == true && oTitle.text.length > 0){			
			var hsize = this.TextHeightSize(oTitle.text, oTitle.font.name, oTitle.font.size);
			topper += hsize;
		}

		//////// Chart Legend ///////
		var oLegend = this.getLegend();
		var bottom = "6%";
		if (oLegend.visible == true && oLegend.position != "Top") {
			bottom = "11%";
		}

		if(oLegend.visible == true){
			if (oLegend.position == "Default" || oLegend.position == "Top" || oLegend.position == "TopLeft" || oLegend.position == "TopRight") {
				topper += 20;
            }
            else if (oLegend.position == "Bottom" || oLegend.position == "BottomLeft" || oLegend.position == "BottomRight") {
                bottomer += 20;
            }
		}

		//////// Chart XAxis ///////
		var oXAxis = this.getXaxis();
		if (oXAxis.title.text.length > 0) {
			var hsize = this.TextHeightSize(oXAxis.title.text, oXAxis.title.font.name, oXAxis.title.font.size);
            bottomer += hsize;
		}
		
		//////// Chart YAxis ///////
		var leftVal = 0;
		var rightVal = 0;
		var yAxisExtra = this.getYAxisExtras();
		var extraCount = yAxisExtra.length;
		var positionOffset = 0;
		var margin = 0;
		for(var i = 0; i < extraCount; i ++){
			var yAxis = yAxisExtra[i];
			if(yAxis.visible == false){
				var oTitle = yAxis.title;
				var titleHeight = oTitle.visible == true ? (oTitle.text.length > 0 ? this.TextHeightSize("AAAA", oTitle.font.name, oTitle.font.size) : 0) : 0;
				var ymin = isNaN(yAxis.minValue) ? 0 : yAxis.minValue;
				var ymax = isNaN(yAxis.maxValue) ? 1000 : yAxis.maxValue;
				var labelValue = Math.max(ymax, ymin);
				var lableLength = this.TextWidthSize(labelValue, yAxis.label.font.name, yAxis.label.font.size) - 5;
				positionOffset += (30 + lableLength + titleHeight);
			}
		}
		
		if(positionOffset > 0){
			rightVal = positionOffset * 100 / chartWidth;
		}

		var item = {
			show: show,
			containLabel: true,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: oPlot.borderWidth,
			top: topper,
			left: 5 + '%' ,
			right: (5 * extraCount - rightVal) + '%',
			bottom: bottomer
		};
		return item;
	}

	//chart options
	ScatterPlotView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();
		var optXaxis = this.optionXaxis();
		var optYaxis = this.optionYaxis();
		var multiYAxis = this.optionYAxisExtras();
		multiYAxis.splice(0,0, optYaxis);
		var optGrid = this.optionGrid();
		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();
		
		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			grid: optGrid,
			xAxis: optXaxis,
			yAxis: multiYAxis,
			series: optSeries,
			animation: false,
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 100
			}]
		};
		return option;
	}

	//chart draw
	ScatterPlotView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var oXFormat = this.getXaxis().format;
		var oYFormat = this.getYaxis().format;

		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = page.valueByFormat(oXFormat, item.x);
				var yval = page.valueByFormat(oYFormat, item.y);
				data.push([xval, yval]);
			}
			seriesOptions[i]["data"] = data;
		}

		var xaxisOption = this.optionXaxis();
		var options = {
			xAxis: xaxisOption,
			series: seriesOptions
		};
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	ScatterPlotView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;

		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;
		
		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}

		this.drawChart();
	}

	//get view-data
	ScatterPlotView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	ScatterPlotView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	ScatterPlotView.prototype.doViewDataByDatabase = function () {
		var view = this;
		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	ScatterPlotView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	ScatterPlotView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	ScatterPlotView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	//options값 강제설정
	ScatterPlotView.prototype.initOptions = function () {
		var oYaxis = this.getYaxis();
		var oXaxis = this.getXaxis();
		oYaxis.majorGrid.lineStyle = "Dot";
		oXaxis.majorGrid.lineStyle = "Dot";
	}

	ScatterPlotView.prototype.test = function () {
		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 100; i++) {
			var datetime = new Date();
			var time = moment(datetime.setDate(datetime.getDate() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 70;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);
			item.push(c1);
			temp.push(item);
		}

		var data = {
			names: ["Time", "series1", "series2", "series3"],
			items: temp
		}

		this.setValueByViewData(data);
	}
	page.createScatterPlotView = function (arg) {
		var view = new ScatterPlotView(arg);
		page.protoViews[view._id] = view;
		view.initOptions();
		view.initChart();
		view.doViewData();
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// BarChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function BarChartView(arg) {
		
		ChartElement.call(this, arg);
	}
	BarChartView.prototype = Object.create(ChartElement.prototype);
	BarChartView.prototype.constructor = BarChartView;

	BarChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	BarChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	BarChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	BarChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	BarChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	BarChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	BarChartView.prototype.setFillStyle = function (value) { }

	BarChartView.prototype.setFillOpacity = function (value) { }

	BarChartView.prototype.setStrokeStyle = function (value) { }

	BarChartView.prototype.setStrokeOpacity = function (value) { }

	BarChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	BarChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	BarChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	BarChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	BarChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	BarChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	BarChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	BarChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);

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
				50, //up
				35, //right
				10, //down
				55 //left
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

	BarChartView.prototype.optionDataByLegend = function () {
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

	BarChartView.prototype.optionXaxis = function () {
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
			show: show,
			type: 'value',
			name: name,
			nameLocation: 'end',
			nameGap: 25,
			nameTextStyle: {
				color: nameColor,
				fontStyle: this.optionFontStyle(oTitleFont.italic),
				fontWeight: this.optionFontWeight(oTitleFont.bold),
				fontFamily: oTitleFont.name,
				fontSize: oTitleFont.size
			},
			scale: true,
			boundaryGap: [0, 0.01],
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
				inside: false,
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
					color: ['rgba(260,260,260,0.3)', 'rgba(240,240,240,0.3)']
				}
			}
		};
		return item;
	}

	BarChartView.prototype.optionYaxis = function () {
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
			type: 'category',
			name: name,
			nameLocation: 'middle',
			nameTextStyle: {
				color: nameColor,
				fontStyle: this.optionFontStyle(oTitleFont.italic),
				fontWeight: this.optionFontWeight(oTitleFont.bold),
				fontFamily: oTitleFont.name,
				fontSize: oTitleFont.size
			},
			scale: true,
			boundaryGap: true,
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
			},
			data: [0, 2, 4, 6, 8, 10]
		};
		return item;
	}

	BarChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByBar(s);
			data.push(item);
		}
		return data;
	}

	BarChartView.prototype.optionSeriesByBar = function (series) {

		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var color = (palette != "")? null : this.optionColor(series.color);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'bar',
			name: name,
			color: color,
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
					color: lineColor,
					barBorderColor: "#A3A3A3",
					barBorderWidth: lineWidth,
					opacity: opacity
				}
			}
		};

		return item;
	}

	BarChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	BarChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		}
		return item;
	}

	BarChartView.prototype.optionGrid = function () {
		var oPlot = this.getPlot();
		var backgroundColor = this.optionColor(oPlot.backgroundColor);;
		var borderColor = this.optionColor(oPlot.borderColor);
		var show = oPlot.borderWidth > 0 ? true : false;

		var oLegend = this.getLegend();
		var bottom = "6%";
		if (oLegend.visible == true && oLegend.position != "Top") {
			bottom = "11%";
		}

		var item = {
			show: show,
			containLabel: true,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: oPlot.borderWidth,
			top: '11%',
			left: '4%',
			right: '4%',
			bottom: bottom
		};
		return item;
	}

	//chart options
	BarChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();
		var optGrid = this.optionGrid();
		var optXaxis = this.optionXaxis();
		var optYaxis = this.optionYaxis();
		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			grid: optGrid,
			xAxis: optXaxis,
			yAxis: optYaxis,
			series: optSeries,
			animation: false,
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 100
			}]
		};

		return option;
	}

	//chart draw
	BarChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var displayData = [];
		var seriesNames = [];
		var seriesData = [];
		
		var oXFormat = this.getXaxis().format;
		var oYFormat = this.getYaxis().format;
		
		for(var i = 0; i < count; i++){
			var series = this.series[i];

			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var name = this.optionSeriesName(series);

			seriesNames.push(name);
			var xval = [];
			var yval = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var x = page.valueByFormat(oXFormat, item.x);
				var y = page.valueByFormat(oYFormat, item.y);
				xval.push(x);
				yval.push(y);
			}
			displayData[name] = {
				x: xval,
				y: yval
			};
		}
		
		for(var seName in displayData){
			var item = displayData[seName];
			seriesData.push({
				name: seName,
				data: item.y
			})
		}
		var options = {
			yAxis: {
				data: displayData[seriesNames[0]].x
			},
			series: seriesData
		};

		chart.showLoading();		
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	BarChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;
		
		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}

		this.drawChart();
	}

	//get view-data
	BarChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	BarChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	BarChartView.prototype.doViewDataByDatabase = function () {
		var view = this;

		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	BarChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	//options값 강제설정
	BarChartView.prototype.initOptions = function () {
		var oYaxis = this.getYaxis();
		var oXaxis = this.getXaxis();
		oYaxis.majorGrid.lineStyle = "Dot";
		oXaxis.majorGrid.lineStyle = "Dot";
	}

	BarChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	BarChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	BarChartView.prototype.test = function () {
		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 20; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 70;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);
			item.push(c1);
			temp.push(item);
		}

		var data = {
			names: ["Time", "series1", "series2", "series3"],
			items: temp
		}

		this.setValueByViewData(data);
	}

	page.createBarChartView = function (arg) {
		var view = new BarChartView(arg);
		page.protoViews[view._id] = view;

		view.initOptions();
		view.initChart();
		view.doViewData();
		return view;
	}

}());

/////////////////////////////////////////////////////////////////////////////////////
// PieChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function PieChartView(arg) {
		
		ChartElement.call(this, arg);
	}
	PieChartView.prototype = Object.create(ChartElement.prototype);
	PieChartView.prototype.constructor = PieChartView;

	PieChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	PieChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	PieChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	PieChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	PieChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	PieChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	PieChartView.prototype.setFillStyle = function (value) { }

	PieChartView.prototype.setFillOpacity = function (value) { }

	PieChartView.prototype.setStrokeStyle = function (value) { }

	PieChartView.prototype.setStrokeOpacity = function (value) { }

	PieChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	PieChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	PieChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	PieChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	PieChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	PieChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	PieChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	PieChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var color = this.optionColor(oLegend.textColor);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: [
				37, //up
				35, //right
				15, //down
				55 //left
			],
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			},
			data: ['A', 'B', 'C', 'D', 'E']
		};

		return item;
	}


	PieChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByPie(s);
			data.push(item);
		}
		return data;
	}

	PieChartView.prototype.optionSeriesByPie = function (series) {

		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;

		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}({d}%)";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'pie',
			name: name,
			radius: [0, '75%'],
			center: ['50%', '50%'],
			emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
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
				},
				emphasis: {
					show: labelShow,
					textStyle: {
						color: labelColor,
						fontSize: oLabelFont.size + 1,
						fontWeight: 'bold'
					}
				}
			},
			itemStyle: {
				normal: {
					color: lineColor,
					borderColor: "#A3A3A3",
					borderWidth: lineWidth,
					borderType: lineStyle,
					opacity: opacity,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 10,
					shadowOffsetX: 2
				}
			},
			data: [{
				name: 'A',
				value: 0
			}, {
				name: 'B',
				value: 0
			}, {
				name: 'C',
				value: 0
			}, {
				name: 'D',
				value: 0
			}, {
				name: 'E',
				value: 0
			}]
		};

		return item;
	}

	PieChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	PieChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		}
		return item;
	}

	//chart options
	PieChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();

		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			series: optSeries,
			animation: false
		};

		return option;
	}

	//chart draw
	PieChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var legendOption = this.optionLegend();
		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var legendData = [];
			seriesOptions[i].data = [];
			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = item.x;
				var yval = item.y;
				data.push({name: xval, value: yval});
				legendData.push(item.x);
			}
			seriesOptions[i]["data"] = data;
			legendOption["data"] = legendData;
		}
		var options = {
			legend: legendOption,
			series: seriesOptions
		};

		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value
	PieChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}
		this.drawChart();
	}

	//get view-data
	PieChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	PieChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	PieChartView.prototype.doViewDataByDatabase = function () {
		var view = this;
		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	PieChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	PieChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	PieChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	PieChartView.prototype.test = function () {

		var names = ["Name"];
		var oSeries = this.getSeries();
		for (var i = 0; i < oSeries.length; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;
			names.push(this.optionSeriesName(s));
		}

		var items = [
			['A', 10],
			['B', 0],
			['C', 0],
			['D', 0],
			['E', 100],
		];

		var data = {
			names: names,
			items: items
		}

		this.setValueByViewData(data);
	}

	page.createPieChartView = function (arg) {
		var view = new PieChartView(arg);
		page.protoViews[view._id] = view;

		view.initChart();
		view.doViewData();
		return view;
	}

}());

/////////////////////////////////////////////////////////////////////////////////////
// DoughnutChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function DoughnutChartView(arg) {
		
		ChartElement.call(this, arg);
	}
	DoughnutChartView.prototype = Object.create(ChartElement.prototype);
	DoughnutChartView.prototype.constructor = DoughnutChartView;

	DoughnutChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	DoughnutChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	DoughnutChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	DoughnutChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	DoughnutChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	DoughnutChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	DoughnutChartView.prototype.setFillStyle = function (value) { }

	DoughnutChartView.prototype.setFillOpacity = function (value) { }

	DoughnutChartView.prototype.setStrokeStyle = function (value) { }

	DoughnutChartView.prototype.setStrokeOpacity = function (value) { }

	DoughnutChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	DoughnutChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	DoughnutChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	DoughnutChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	DoughnutChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	DoughnutChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	DoughnutChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	DoughnutChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var color = this.optionColor(oLegend.textColor);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: [
				37, //up
				35, //right
				15, //down
				55 //left
			],
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			},
			data: ['A', 'B', 'C', 'D', 'E']

		};

		return item;
	}

	DoughnutChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByDoughnut(s);
			data.push(item);
		}
		return data;
	}

	DoughnutChartView.prototype.optionSeriesByDoughnut = function (series) {

		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;

		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}({d}%)";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'pie',
			name: name,
			radius: ['40%', '80%'],
			center: ['50%', '50%'],
			avoidLabelOverlap: true,
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
				},
				emphasis: {
					show: labelShow,
					textStyle: {
						color: labelColor,
						fontSize: oLabelFont.size + 1,
						fontWeight: 'bold'
					}
				}
			},
			itemStyle: {
				normal: {
					color: lineColor,
					borderColor: "#A3A3A3",
					borderWidth: lineWidth,
					borderType: lineStyle,
					opacity: opacity,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 10,
					shadowOffsetX: 2
				}
			},
			data: [{
				name: 'A',
				value: 0
			}, {
				name: 'B',
				value: 0
			}, {
				name: 'C',
				value: 0
			}, {
				name: 'D',
				value: 0
			}, {
				name: 'E',
				value: 0
			}]
		};

		return item;
	}

	DoughnutChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	DoughnutChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		}
		return item;
	}

	//chart options
	DoughnutChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();

		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			series: optSeries,
			animation: false
		};

		return option;
	}

	//chart draw
	DoughnutChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var legendOption = this.optionLegend();
		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var legendData = [];
			seriesOptions[i].data = [];
			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = item.x;
				var yval = item.y;
				data.push({name: xval, value: yval});
				legendData.push(item.x);
			}
			seriesOptions[i]["data"] = data;
			legendOption["data"] = legendData;
		}
		var options = {
			legend: legendOption,
			series: seriesOptions
		};

		console.log(options);
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	DoughnutChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}
		this.drawChart();
	}

	//get view-data
	DoughnutChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	DoughnutChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	DoughnutChartView.prototype.doViewDataByDatabase = function () {
		var view = this;

		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	DoughnutChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	DoughnutChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	DoughnutChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	DoughnutChartView.prototype.test = function () {

		var names = ["Name"];
		var oSeries = this.getSeries();
		for (var i = 0; i < oSeries.length; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;
			names.push(this.optionSeriesName(s));
		}

		var items = [
			{name: 'A', value: 70.04},
			{name: 'B', value: 83.39},
			{name: 'C', value: 81.08},
			{name: 'D', value: 83.71},
			{name: 'E', value: 84.86},
			{name: 'F', value: 89.63},
			{name: 'G', value: 89.99}
		];

		var data = {
			names: names,
			items: items
		}

		this.setValueByViewData(data);
	}

	page.createDoughnutChartView = function (arg) {
		var view = new DoughnutChartView(arg);
		page.protoViews[view._id] = view;

		view.initChart();
		view.doViewData();
		return view;
	}

})();

/////////////////////////////////////////////////////////////////////////////////////
// PyramidChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function PyramidChartView(arg) {
		
		ChartElement.call(this, arg);
	}
	PyramidChartView.prototype = Object.create(ChartElement.prototype);
	PyramidChartView.prototype.constructor = PyramidChartView;
	
	PyramidChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	PyramidChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	PyramidChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	PyramidChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	PyramidChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	PyramidChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	PyramidChartView.prototype.setFillStyle = function (value) { }

	PyramidChartView.prototype.setFillOpacity = function (value) { }

	PyramidChartView.prototype.setStrokeStyle = function (value) { }

	PyramidChartView.prototype.setStrokeOpacity = function (value) { }

	PyramidChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	PyramidChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	PyramidChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	PyramidChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	PyramidChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	PyramidChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	PyramidChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	PyramidChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var color = this.optionColor(oLegend.textColor);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: [
				37, //up
				35, //right
				15, //down
				55 //left
			],
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			},
			data: ['A', 'B', 'C', 'D', 'E']

		};

		return item;
	}


	PyramidChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByPyramid(s);
			data.push(item);
		}
		return data;
	}

	PyramidChartView.prototype.optionSeriesByPyramid = function (series) {

		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;

		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}({d}%)";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'funnel',
			name: name,
			left: 60,
			right: 70,
			top: 50,
			bottom: 50,
			width: '80%',
			minSize: '0%',
			maxSize: '100%',
			sort: 'ascending', //none, descending, ascending
			gap: 2,
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
				},
				emphasis: {
					show: labelShow,
					textStyle: {
						color: labelColor,
						fontSize: oLabelFont.size + 1,
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
			},
			emphasis: {
                label: {
                    fontSize: 20
                }
            },
			itemStyle: {
				normal: {
					dynamicHeight: true,
					linear: false,
					color: lineColor,
					borderColor: "#A3A3A3",
					borderWidth: lineWidth,
					borderType: lineStyle,
					opacity: opacity,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 10,
					shadowOffsetX: 2
				}
			},
			data: [{
				name: 'A',
				value: 0
			}, {
				name: 'B',
				value: 0
			}, {
				name: 'C',
				value: 0
			}, {
				name: 'D',
				value: 0
			}, {
				name: 'E',
				value: 0
			}]
		};

		return item;
	}

	PyramidChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	PyramidChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		}
		return item;
	}

	//chart options
	PyramidChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();

		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			series: optSeries,
			animation: false
		};
		return option;
	}

	//chart draw
	PyramidChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var legendOption = this.optionLegend();
		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var legendData = [];
			seriesOptions[i].data = [];
			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = item.x;
				var yval = item.y;
				data.push({name: xval, value: yval});
				legendData.push(item.x);
			}
			seriesOptions[i]["data"] = data;
			legendOption["data"] = legendData;
		}
		var options = {
			legend: legendOption,
			series: seriesOptions
		};
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	PyramidChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}
		this.drawChart();
	}

	//get view-data
	PyramidChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	PyramidChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	PyramidChartView.prototype.doViewDataByDatabase = function () {
		var view = this;

		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	PyramidChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	PyramidChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	PyramidChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	PyramidChartView.prototype.test = function () {

		var names = ["Name"];
		var oSeries = this.getSeries();
		for (var i = 0; i < oSeries.length; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;
			names.push(this.optionSeriesName(s));
		}

		var items = [
			['A', 60],
			['B', 80],
			['C', 40],
			['D', 20]
		];

		var data = {
			names: names,
			items: items
		}

		this.setValueByViewData(data);
	}

	page.createPyramidChartView = function (arg) {
		var view = new PyramidChartView(arg);
		page.protoViews[view._id] = view;

		view.initChart();
		view.doViewData();
		// view.test();
		return view;
	}
})();

/////////////////////////////////////////////////////////////////////////////////////
// FunnelChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function FunnelChartView(arg) {
		
		ChartElement.call(this, arg)
	}
	FunnelChartView.prototype = Object.create(ChartElement.prototype);
	FunnelChartView.prototype.constructor = FunnelChartView;

	FunnelChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	FunnelChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	FunnelChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	FunnelChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	FunnelChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	FunnelChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	FunnelChartView.prototype.setFillStyle = function (value) { }

	FunnelChartView.prototype.setFillOpacity = function (value) { }

	FunnelChartView.prototype.setStrokeStyle = function (value) { }

	FunnelChartView.prototype.setStrokeOpacity = function (value) { }

	FunnelChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	FunnelChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	FunnelChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	FunnelChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	FunnelChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	FunnelChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	FunnelChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	FunnelChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var color = this.optionColor(oLegend.textColor);

		var item = {
			show: oLegend.visible,
			selectedMode: true,
			orient: orient,
			left: position.left,
			top: position.top,
			right: position.right,
			bottom: position.bottom,
			padding: [
				37, //up
				35, //right
				15, //down
				55 //left
			],
			textStyle: {
				color: color,
				fontStyle: this.optionFontStyle(oFont.italic),
				fontWeight: this.optionFontWeight(oFont.bold),
				fontFamily: oFont.name,
				fontSize: oFont.size
			},
			data: ['A', 'B', 'C', 'D', 'E']

		};

		return item;
	}

	FunnelChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByFunnel(s);
			data.push(item);
		}
		return data;
	}

	FunnelChartView.prototype.optionSeriesByFunnel = function (series) {

		var palette = this.getPalette();
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;

		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}({d}%)";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var item = {
			type: 'funnel',
			name: name,
			left: 60,
			right: 70,
			top: 50,
			bottom: 50,
			width: '80%',
			minSize: '0%',
			maxSize: '100%',
			sort: 'descending', //none, descending, ascending
			gap: 1,
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
				},
				emphasis: {
					show: labelShow,
					textStyle: {
						color: labelColor,
						fontSize: oLabelFont.size + 1,
						fontWeight: 'bold'
					}
				}
			},
			itemStyle: {
				normal: {
					dynamicHeight: false,
					linear: true,
					color: lineColor,
					borderColor: "#A3A3A3",
					borderWidth: lineWidth,
					borderType: lineStyle,
					opacity: opacity,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 10,
					shadowOffsetX: 2
				}
			},
			data: [{
				name: 'A',
				value: 0
			}, {
				name: 'B',
				value: 0
			}, {
				name: 'C',
				value: 0
			}, {
				name: 'D',
				value: 0
			}, {
				name: 'E',
				value: 0
			}]
		};

		return item;
	}

	FunnelChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	FunnelChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		}
		return item;
	}

	//chart options
	FunnelChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();

		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			series: optSeries,
			animation: false
		};

		return option;
	}

	//chart draw
	FunnelChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var legendOption = this.optionLegend();
		var seriesOptions = this.optionSeries();
		for(var i = 0; i < count; i++){
			
			var series = this.series[i];
			if(!series.visible) {
				continue;
			}

			var legendData = [];
			seriesOptions[i].data = [];
			var itemcount = series.items.count;
			if(itemcount <= 0 ) continue;
			var data = [];
			for(var j = 0; j < itemcount; j++){
				var item = series.items[j];
				
				var xval = item.x;
				var yval = item.y;
				data.push({name: xval, value: yval});
				legendData.push(item.x);
			}
			seriesOptions[i]["data"] = data;
			legendOption["data"] = legendData;
		}
		var options = {
			legend: legendOption,
			series: seriesOptions
		};
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	FunnelChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);
			}
		}

		this.drawChart();
	}

	//get view-data
	FunnelChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	FunnelChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	FunnelChartView.prototype.doViewDataByDatabase = function () {
		var view = this;

		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	FunnelChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}
	FunnelChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	FunnelChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	FunnelChartView.prototype.test = function () {

		var names = ["Name"];
		var oSeries = this.getSeries();
		for (var i = 0; i < oSeries.length; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;
			names.push(this.optionSeriesName(s));
		}

		var items = [
			['A', 60],
			['B', 80],
			['C', 40],
			['D', 20]
		];

		var data = {
			names: names,
			items: items
		}

		this.setValueByViewData(data);
	}

	page.createFunnelChartView = function (arg) {
		var view = new FunnelChartView(arg);
		page.protoViews[view._id] = view;

		view.initChart();
		view.doViewData();
		return view;
	}
})();

/////////////////////////////////////////////////////////////////////////////////////
// RadarChartView
/////////////////////////////////////////////////////////////////////////////////////
(function () {

	function RadarChartView(arg) {
		
		ChartElement.call(this, arg);
		this.radar = arg.radar;
		this.dataMap = {};
	}
	RadarChartView.prototype = Object.create(ChartElement.prototype);
	RadarChartView.prototype.constructor = RadarChartView;

	RadarChartView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	RadarChartView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	RadarChartView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	RadarChartView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	RadarChartView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	RadarChartView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	RadarChartView.prototype.setFillStyle = function (value) { }

	RadarChartView.prototype.setFillOpacity = function (value) { }

	RadarChartView.prototype.setStrokeStyle = function (value) { }

	RadarChartView.prototype.setStrokeOpacity = function (value) { }

	RadarChartView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	RadarChartView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	RadarChartView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	RadarChartView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	RadarChartView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	RadarChartView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}


	RadarChartView.prototype.getRadar = function () {
		return this.radar;
	}

	RadarChartView.prototype.setRadar = function (value) {
		this.radar = value;
	}

	RadarChartView.prototype.getDataMap = function () {
		return this.dataMap;
	}

	RadarChartView.prototype.setDataMap = function (key, value) {
		this.dataMap[key] = value;
	}


	RadarChartView.prototype.colorToRgba = function (color, opacity) {
		if (color == "transparent") {
			return {
				r: 255,
				g: 255,
				b: 255,
				a: 0
			};
		}

		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		color = color.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: opacity
		} : null;
	}

	RadarChartView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	RadarChartView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);

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
				50, //up
				35, //right
				5, //down
				55 //left
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

	RadarChartView.prototype.optionDataByLegend = function () {
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

	RadarChartView.prototype.optionRadarAreaColor = function () {
		var radar = this.getRadar();
		return this.optionColor(radar.areaColor)
	}

	RadarChartView.prototype.optionRadarAreaType = function () {
		var radar = this.getRadar();

		if (radar.areaType == "Polygon") return "polygon";
		else if (radar.areaType == "Circle") return "circle";
		else return "circle";
	}

	RadarChartView.prototype.optionRadarType = function () {
		var radar = this.getRadar();

		if (radar.type == "Line") return "line";
		else if (radar.type == "Area") return "area";
		else if (radar.type == "Point") return "point";
		else return "line";
	}

	RadarChartView.prototype.optionRadar = function () {
		var type = this.optionRadarAreaType();
		var color = this.optionRadarAreaColor();

		var areaRgba = this.colorToRgba(color, 0.4);
		var areaColor = 'rgba(' + areaRgba.r + ',' + areaRgba.g + ',' + areaRgba.b + ',' + areaRgba.a + ')';

		var shadowRgba = this.colorToRgba(color, 0.1);
		var shadowColor = 'rgba(' + shadowRgba.r + ',' + shadowRgba.g + ',' + shadowRgba.b + ',' + shadowRgba.a + ')';

		var item = {
			shape: type,
			radius: '80%',
			center: ['50%', '50%'],
			name: {
				textStyle: {
					color: '#000000',
					fontWeight: 'bold',
					fontSize: 11,
					padding: [-8, -8]
				}
			},
			//startAngle: 150,
			axisLine: {
				show: true,
				lineStyle: {
					color: color,
					opacity: 0.2
				}
			},
			splitLine: {
				lineStyle: {
					color: color,
					opacity: 0.2
				}
			},
			splitArea: {
				areaStyle: {
					color: areaColor,
					shadowColor: shadowColor,
					shadowBlur: 10
				}
			}
		}

		return item;
	}

	RadarChartView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var data = [];
		for (var i = 0; i < seriesCount; i++) {
			var s = oSeries[i];
			if (!s) continue;
			if (s.visible == false) continue;

			var item = this.optionSeriesByRadar(i, s);
			data.push(item);
		}
		return data;
	}

	RadarChartView.prototype.optionSeriesByRadar = function (idx, series) {

		var palette = this.getPalette();
		var color = (palette != "")? null : this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = (palette != "")? null : (oPoint.color == "" ? this.optionPointColor(series.color) : this.optionPointColor(oPoint.color));
		var pointShow = (typeof oPoint.visible == "undefined") ? false : oPoint.visible;
		var pointSize = pointShow ? oPoint.size : 0;

		var radarType = this.optionRadarType();
		var areaStyle = null;
		if (radarType == "area") {
			areaStyle = {
				normal: {
					opacity: opacity
				}
			};
		}
		else if (radarType == "point") {
			lineWidth = 0;
		}

		var item = {
			type: 'radar',
			name: name,
			z: idx + 1,
			silent: false,
			areaStyle: areaStyle,
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
					opacity: 0.8,
					type: lineStyle
				}
			},
			symbol: pointType,
			symbolSize: pointSize,
			itemStyle: {
				normal: {
					color: pointColor,
					opacity: opacity
				}
			}
		};

		return item;
	}

	RadarChartView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	RadarChartView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item'
		}
		return item;
	}
	
	//chart options
	RadarChartView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();
		var optSeries = this.optionSeries();
		var optRadar = this.optionRadar();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			radar: optRadar,
			series: optSeries
		};

		return option;
	}

	RadarChartView.prototype.reverse = function (values) {
		if (values.length < 1) return values;

		var items = [];
		items.push(values[0]);

		for (var i = values.length - 1; i >= 1; i--) {
			items.push(values[i]);
		}
		return items;
	}

	//xaxis data
	RadarChartView.prototype.axisDataByValue = function () {
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var radaItems = [];

		var dataMap = this.getDataMap();
		var max = !dataMap.max ? 100 : dataMap.max;
		var min = !dataMap.min ? 0 : dataMap.min;
		min = min > 0 ? 0 : min;

		var se = this.series[0];
		var valueCount = se.items.count;
		if(valueCount < 1) return radaItems;

		// Get at 0 index
		var itemData = se.items.getAt(0);
		var newitem = {
			name: itemData.key,
			min: min,
			max: max
		};
		radaItems.push(newitem);
		
		// From end to 1
		for (var i = valueCount - 1; i >= 1; i--) {
			var itemData = se.items.getAt(i);
			var newitem = {
				name: itemData.key,
				min: min,
				max: max
			};

			radaItems.push(newitem);
		}
		return radaItems;
	}

	//series data
	RadarChartView.prototype.seriesDataByValue = function () {
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;
		var items = [];

		for (var i = 0; i < count; i++) {
			var se = this.series.getAt(i);
			if (!se) continue;

			var name = this.optionSeriesName(se);
			var dataCount = se.items.count;
			if(dataCount <= 0) continue;

			var values = [];

			var item = se.items.getAt(0);
			values.push(item.value);

			for(var j = dataCount - 1; j > 0; j--){
				var item = se.items.getAt(j);
				values.push(item.value);
			}

			var newitem = {
				data: [
					{
						name: name,
						value: values
					}
				]
			};

			items.push(newitem);
		}

		return items;
	}

	RadarChartView.prototype.map = function (obj, cb) {
		if (!(obj && cb)) return;

		var objCount = obj.length;
		var result = [];
		for (var i = 0; i < objCount; i++) {
			result.push(cb.call(this, obj[i], i, obj, 'xxx'));
		}
		return result;
	}

	//chart draw
	RadarChartView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;

		var axisData = this.axisDataByValue();
		var seriesData = this.seriesDataByValue();

		var options = {
			radar: {
				indicator: axisData
			},
			series: seriesData
		};

		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	RadarChartView.prototype.setValueByViewData = function (data) {
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		//data.names = ["Time", "series1", "series2", "series3"];
		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var names = data.names;
		var namesCount = names.length;
		var itemsCount = items.length;

		var maxVal = Number.MIN_VALUE;
		var minVal = Number.MAX_VALUE;

		// update data to ItemCollection of each Series
		for (var k = 1; k < namesCount; k++) {
			var se = this.series.getAt(k - 1);
			se.items.splice(0, se.items.count);

			for (var n = 0; n < itemsCount; n++) {
				var item = items[n];
				// console.log("Item: ", item);

				if (!item) continue;
				var xval = item[0];
				var yval = item[k];

				var info = {
					key: xval,
					value: yval,
					category: xval,
					x: xval,
					y: yval
				};
				var seriesitem = new ChartItem(this, info);
				se.items.push(seriesitem);

				if(yval > maxVal){
					maxVal = yval;
				}
				if(yval < minVal){
					minVal = yval;
				}
			}
			// console.log("Series: " + k, se);
		}
		var dataMap = this.getDataMap();
		var mapMax = dataMap.max;
		var mapMin = dataMap.min;
		if (!mapMax) mapMax = maxVal;
		if (!mapMin) mapMin = minVal;

		this.setDataMap("max", Math.max(maxVal, mapMax));
		this.setDataMap("min", Math.min(minVal, mapMin));
		this.drawChart();
	}

	//get view-data
	RadarChartView.prototype.doViewData = function () {
		this.doViewDataByDatabase();
	}

	RadarChartView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	RadarChartView.prototype.doViewDataByDatabase = function () {
		var view = this;

		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	RadarChartView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}
	
	RadarChartView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	RadarChartView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();
	}

	RadarChartView.prototype.test = function () {
		var a1 = 0;
		var b1 = 0;
		var temp = [];
		for (var i = 1; i < 5; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 70;

			//console.log(time.format('YYYY-MM-DD HH:mm:ss'));
			var item = [];
			item.push(time.format('HH:mm:ss'));
			item.push(a1);
			item.push(b1);
			item.push(c1);
			temp.push(item);
		}

		var data = {
			names: ["Time", "series1", "series2", "series3"],
			items: temp
		}

		this.setValueByViewData(data);
	}

	page.createRadarChartView = function (arg) {
		var view = new RadarChartView(arg);
		page.protoViews[view._id] = view;

		view.initChart();
		view.doViewData();
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// BoxPlotView
/////////////////////////////////////////////////////////////////////////////////////
(function () {

	function BoxPlotView(arg) {
		
		ChartElement.call(this, arg);
	}
	BoxPlotView.prototype = Object.create(ChartElement.prototype);
	BoxPlotView.prototype.constructor = BoxPlotView;

	BoxPlotView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	BoxPlotView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	BoxPlotView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	BoxPlotView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	BoxPlotView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	BoxPlotView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	BoxPlotView.prototype.setFillStyle = function (value) { }

	BoxPlotView.prototype.setFillOpacity = function (value) { }

	BoxPlotView.prototype.setStrokeStyle = function (value) { }

	BoxPlotView.prototype.setStrokeOpacity = function (value) { }

	BoxPlotView.prototype.getBackgroundColor = function () {
		return this.optionColor(this.backgroundColor);
	}

	BoxPlotView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	BoxPlotView.prototype.getBorderColor = function () {
		return this.optionColor(this.borderColor);
	}

	BoxPlotView.prototype.setBorderColor = function (value) {
		$("#" + this._id).css("border-color", value);
		this.borderColor = value;
	}

	BoxPlotView.prototype.getBorderStyle = function () {
		return this.borderStyle;
	}

	BoxPlotView.prototype.setBorderStyle = function (value) {
		$("#" + this._id).css("border-style", this.optionBorderStyle(value));
		this.borderStyle = value;
	}

	BoxPlotView.prototype.optionTitle = function () {
		var oTitle = this.getTitle();

		var oFont = oTitle.font;
		var position = this.optionTitlePosition(oTitle.position);
		var color = this.optionColor(oTitle.textColor);;

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
				15, //up
				30, //right
				10, //down
				30, //left
			]
		};

		return item;
	}

	BoxPlotView.prototype.optionLegend = function () {
		var oLegend = this.getLegend();
		var oFont = oLegend.font;

		var position = this.optionLegendPosition(oLegend.position);
		var orient = this.optionOrient(oLegend.position);

		var data = this.optionDataByLegend();
		var color = this.optionColor(oLegend.textColor);

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
				50, //up
				35, //right
				10, //down
				55 //left
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

	BoxPlotView.prototype.optionXaxis = function () {
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
			show: show,
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
			boundaryGap: true,
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
				inside: false,
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
					color: ['rgba(260,260,260,0.3)', 'rgba(240,240,240,0.3)']
				}
			},
			data: []
		};
		return item;
	}

	BoxPlotView.prototype.optionYaxis = function () {
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
			boundaryGap: false,
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

	BoxPlotView.prototype.optionSeries = function () {
		var oSeries = this.getSeries();
		var seriesCount = oSeries.length;

		var items = [];
		for (var i = 0; i < seriesCount; i++) {
			var series = oSeries[i];
			if (!series) continue;
			if (series.visible == false) continue;

			var boxplot = this.optionSeriesByBoxPlot(series);
			var outlier = this.optionSeriesByOutlier(series);

			items.push(boxplot);
			items.push(outlier);
		}

		return items;
	}
	BoxPlotView.prototype.optionSeriesByBoxPlot = function (series) {
		var name = this.optionSeriesName(series);

		var item = {
			type: 'boxplot',
			name: name,
			tooltip: {
				formatter: function (param) {
					return [
						'Category: ' + param.name,
						'Upper: ' + param.data[5],
						'Q3: ' + param.data[4],
						'Median: ' + param.data[3],
						'Q1: ' + param.data[2],
						'Lower: ' + param.data[1]
					].join('<br/>');
				}
			}
		};

		return item;
	}
	BoxPlotView.prototype.optionSeriesByOutlier = function (series) {
		var palette = this.getPalette();

		var color = (palette != "")? null : this.optionColor(series.color);
		var name = this.optionSeriesName(series);
		var opacity = series.opacity;

		var oLabel = series.label;
		var oLabelFont = oLabel.font;
		var labelShow = oLabel.showPercent == false && oLabel.showValue == false ? false : true;
		var labelPosition = this.optionSeriesLabelPosition(oLabel.position);
		var labelColor = (palette != "")? null : this.optionColor(oLabel.textColor);
		var formatter = "{c}";
		if (oLabel.showPercent == true) {
			formatter = "{c}%";
		}

		var oLine = series.line;
		var lineColor = (palette != "")? null : (oLine.lineColor == "" ? this.optionPointColor(series.color) : this.optionPointColor(oLine.lineColor));
		var lineStyle = this.optionBorderStyle(oLine.lineStyle);
		var lineWidth = oLine.visible == true ? oLine.lineWidth : 0;

		var oPoint = series.point;
		var pointType = this.optionPointType(oPoint.type);
		var pointColor = (palette != "")? null : (oPoint.color == "" ? this.optionPointColor(series.color) : this.optionPointColor(oPoint.color));
		var pointShow = (typeof oPoint.visible == "undefined") ? false : oPoint.visible;
		var pointSize = pointShow ? oPoint.size : 0;

		var item = {
			type: 'scatter',
			name: 'outlier_' + name,
			itemStyle: {
				normal: {
					color: pointColor,
					opacity: opacity
				}
			},

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
		};

		return item;
	}

	BoxPlotView.prototype.optionTextStyle = function () {
		var oFont = this.getFont();

		var item = {
			fontStyle: this.optionFontStyle(oFont.italic),
			fontWeight: this.optionFontWeight(oFont.bold),
			fontFamily: oFont.name,
			fontSize: oFont.size
		}

		return item;
	}

	BoxPlotView.prototype.optionToolTip = function () {
		var item = {
			trigger: 'item',
			axisPointer: {
				type: 'shadow'
			}
		}
		return item;
	}

	BoxPlotView.prototype.optionGrid = function () {
		var oPlot = this.getPlot();
		var backgroundColor = this.optionColor(oPlot.backgroundColor);;
		var borderColor = this.optionColor(oPlot.borderColor);
		var show = oPlot.borderWidth > 0 ? true : false;

		var oLegend = this.getLegend();
		var bottom = "6%";
		if (oLegend.visible == true && oLegend.position != "Top") {
			bottom = "11%";
		}

		var item = {
			show: show,
			containLabel: true,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: oPlot.borderWidth,
			top: '11%',
			left: '4%',
			right: '4%',
			bottom: bottom
		};
		return item;
	}

	//chart options
	BoxPlotView.prototype.options = function () {
		var optTitle = this.optionTitle();
		var optTextStyle = this.optionTextStyle();
		var optToolTip = this.optionToolTip();
		var optLegend = this.optionLegend();
		var optGrid = this.optionGrid();
		var optXaxis = this.optionXaxis();
		var optYaxis = this.optionYaxis();
		var optSeries = this.optionSeries();
		var backgroundColor = this.getBackgroundColor();
		var palette = this.optionPalette();

		var option = {
			color: palette,
			title: optTitle,
			backgroundColor: backgroundColor,
			textStyle: optTextStyle,
			tooltip: optToolTip,
			legend: optLegend,
			grid: optGrid,
			xAxis: optXaxis,
			yAxis: optYaxis,
			series: optSeries,
			animation: false,
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 100
			}]
		};

		return option;
	}

	//xaxis data
	BoxPlotView.prototype.xAxisDataByValue = function (values) {
		return values;
	}

	//series data
	BoxPlotView.prototype.seriesDataByValue = function (values) {
		var items = [];
		var prepareData = [];

		for(var name in values){
			var category = values[name];
			prepareData.push(category);
		}
		var boxplotItem = {
			name: name,
			data: []
		};
		var outlierItem = {
			name: 'outlier_' + name,
			data: []
		};
		
		var data = echarts.dataTool.prepareBoxplotData(prepareData);
		boxplotItem.data = data.boxData;
		outlierItem.data = data.outliers;

		items.push(boxplotItem);
		items.push(outlierItem);
		return items;
	}

	//chart draw
	BoxPlotView.prototype.drawChart = function () {
		var chart = this.getChart();
		if(chart == null) return;
		if(this.series == null || this.series == undefined) return;
		var count = this.series.count;
		if(count <= 0) return;

		var oYFormat = this.getYaxis().format;

		var categories = [];
		var values = [];

		// Y value prepare 		
		var itemCount = this.series[0].items.count;
		var items = this.series[0].items;
		
		for(var i = 0; i < itemCount; i++){
			var item = items[i];

			if(categories.indexOf(item.category) < 0){
				categories.push(item.category);
				values[item.category] = [];
			}
			
			values[item.category].push(page.valueByFormat(oYFormat, item.y));
		}
		var seriesData = this.seriesDataByValue(values);

		// X value prepare
		var xAxisData = this.xAxisDataByValue(categories);
		var options = {
			xAxis: {
				data: xAxisData
			},
			series: seriesData
		};
		chart.showLoading();
		chart.setOption(options);
		chart.hideLoading();
	}

	//set x-y value 
	BoxPlotView.prototype.setValueByViewData = function (seriesName, data) {		
		if (data == null || data == undefined || data.names == undefined) return;
		if(this.series == null || this.series == undefined) return;
		var seriesCount = this.series.count;
		if(seriesCount <= 0) return;

		for (var k = 1; k < data.names.length; k++) {
			var name = data.names[k];
			var s = this.optionSeriesByName(name);
			if (s == null) continue;
			data.names[k] = this.optionSeriesName(s);
		}

		var items = data.items;
		var itemsCount = items.length;

		// update data to ItemCollection of each Series
		var se = this.series.getAt(0);		
		if(se.items.count > 0)
			se.items.splice(0, se.items.count);

		for (var n = 0; n < itemsCount; n++) {
			var item = items[n];
			if (!item) continue;
			var xval = item[0];
			var yval = item[1];
			var _category = (item.length > 2)? item[2] : xval;

			var info = {
				key: xval,
				value: yval,
				category: _category,
				x: xval,
				y: yval
			};
			var seriesitem = new ChartItem(this, info);
			se.items.push(seriesitem);
		}
		
		this.drawChart();
	}

	//get view-data
	BoxPlotView.prototype.doViewData = function (seriesName) {
		this.doViewDataByDatabase();
	}

	BoxPlotView.prototype.reset = function () {
		this.initChart();
		this.doViewData();
	}

	BoxPlotView.prototype.doViewDataByDatabase = function (seriesName) {
		var view = this;
		scada.getViewDatabase(this.pid, this._id, function (data) {
			if (data != null) {
				view.setValueByViewData(seriesName, data);
			}
		}, this.getSQL(), this.getSQLParams());
	}

	//chart 초기화
	BoxPlotView.prototype.initChart = function () {
		var option = this.options();

		var el = $("#" + this._id)[0];
		var chart = echarts.init(el);
		chart.setOption(option);

		this.setChart(chart);
	}

	//options값 강제설정
	BoxPlotView.prototype.initOptions = function () {
		var oYaxis = this.getYaxis();
		var oXaxis = this.getXaxis();
		oYaxis.majorGrid.lineStyle = "Dot";
		oXaxis.majorGrid.lineStyle = "Dot";
	}

	BoxPlotView.prototype.dataRefresh = function () {
		this.drawChart();
	}

	BoxPlotView.prototype.settingRefresh = function () {
		var chart = this.getChart();
		if(chart == null) return;
		var option = this.options();
		chart.setOption(option);
		this.drawChart();	
	}

	BoxPlotView.prototype.test = function () {
		var a1 = 0;
		var b1 = 0;
		var c1 = 0;
		var temp = [];
		for (var i = 1; i < 1000; i++) {
			var datetime = new Date();
			var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
			a1 = Math.floor(Math.random() * 100) + 90;
			b1 = Math.floor(Math.random() * 80) + 20;
			c1 = Math.floor(Math.random() * 90) + 70;

			var item = [];
			item.push(time);
			item.push(a1);
			item.push(b1);
			item.push(c1);
			temp.push(item);
		}

		console.log("items values: ", temp);

		var data = {
			names: ["Time", "A", "B", "C"],
			items: temp
		}

		this.setValueByViewData(null, data);
	}

	BoxPlotView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	BoxPlotView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createBoxPlotView = function (arg) {
		var view = new BoxPlotView(arg);
		page.protoViews[view._id] = view;

		view.initOptions();
		view.initChart();
		view.doViewData();
		//view.test();
		return view;
	}
}());