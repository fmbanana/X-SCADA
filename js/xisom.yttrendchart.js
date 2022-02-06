if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

(function () {
    function YTTrendChart(arg) {

        ViewElement.call(this, arg);
        this.pid = arg.pid;
        this.ytappearance = arg.appearance;
        this.font = arg.font;
        this.yttitle = arg.title;
        this.ytlegend = arg.legend;
        this.trend = arg.trend;
        this.ytgrid = arg.grid;
        this.ytfilebuffer = arg.filebuffer;
        this.yttooltip = {
            type: 'Text',
            visible: 'true'
        }
        this.yttargetline = arg.targetline;
        this.ytseries = arg.series;
        this.ytxaxis = arg.xaxis;
        this.yty1axis = arg.y1axis;
        this.yty2axis = arg.y2axis;
        this.yty3axis = arg.y3axis;
        this.yty4axis = arg.y4axis;

        this.chart = null;
        this.xValue = {};
        this.yValue = {};
        this.viewData = null;
        this.dummyData = [];

        // Maximum point display
        this.reqLimitPoint = arg.pointdisplay;
        this.startTime = new Date();
        this.endTime = new Date();
        this.isUpdate = true;

        this.axisposleft = 0;
        this.axisposright = 0;
        this.timelimit = this.ytfilebuffer.bufferperiod * 86400;  // (second)

        // script variable
        this.appearance = null;
        this.title = null;
        this.legend = null;
        this.grid = null;
        this.tooltip = null;
        this.targetline = null;
        this.series = null;
        this.xaxis = null;
        this.y1axis = null;
        this.y2axis = null;
        this.y3axis = null;
        this.y4axis = null;

        // TimeoutID
        this.TimeoutID = 0;
    }
    YTTrendChart.prototype = Object.create(ViewElement.prototype);
    YTTrendChart.prototype.constructor = YTTrendChart;

    //////////////////////////////////////////////////////////////////////////////// 
    //////////////////// GENERAL OPERATION
    ////////////////////////////////////////////////////////////////////////////////  

    YTTrendChart.prototype.setX = function (value) {
        $("#" + this._id + "_view").css("left", value + "px");
        this._x = value;
        this.setAngle(this.getAngle());
    }

    YTTrendChart.prototype.setY = function (value) {
        $("#" + this._id + "_view").css("top", value + "px");
        this._y = value;
        this.setAngle(this.getAngle());
    }

    YTTrendChart.prototype.setWidth = function (value) {
        $("#" + this._id).css("width", value + "px");
        this._width = value;
        this.setAngle(this.getAngle());
    }

    YTTrendChart.prototype.setHeight = function (value) {
        $("#" + this._id).css("height", value + "px");
        this._height = value;
        this.setAngle(this.getAngle());
    }

    YTTrendChart.prototype.setAngle = function (value) {
        var rotate = "rotate(" + value + "deg)";
        $("#" + this._id).css("-ms-transform", rotate);
        $("#" + this._id).css("-webkit-transform", rotate);
        $("#" + this._id).css("transform", rotate);
        this._angle = value;
    }
    YTTrendChart.prototype.setOpacity = function (value) {
        $("#" + this._id).css("opacity", value);
        this._opacity = value;
    }

    YTTrendChart.prototype.setVisible = function (value) {
        var visibility = value == true ? "visible" : "hidden";

        // visible trendchart-view object
        $("#" + this._id + "_view").css('visibility', visibility);

        // visible trendchart object
        $("#" + this._id).css('visibility', visibility);

        this._visible = visibility;
    }

    YTTrendChart.prototype.setFillStyle = function (value) {
    }

    YTTrendChart.prototype.setFillOpacity = function (value) {
    }

    YTTrendChart.prototype.setStrokeStyle = function (value) {
    }

    YTTrendChart.prototype.setStrokeOpacity = function (value) {
    }

    YTTrendChart.prototype.getBackgroundColor = function () {
        return this.optionColor(this.ytappearance.backgroundColor);
    }

    YTTrendChart.prototype.setBackgroundColor = function (value) {
        $("#" + this._id).css("background-color", value);
        this.ytappearance.backgroundColor = value;
    }

    YTTrendChart.prototype.getBorderColor = function () {
        return this.optionColor(this.ytappearance.bordercolor);
    }

    YTTrendChart.prototype.setBorderColor = function (value) {
        $("#" + this._id).css("border-color", this.optionColor(value));
        this.ytappearance.bordercolor = value;
    }

    YTTrendChart.prototype.getBorderStyle = function () {
        return this.ytappearance.borderStyle;
    }

    YTTrendChart.prototype.setBorderStyle = function (input) {


        // console.log("YTTrendChart.prototype.setBorderStyle: " + input);
        // console.trace();

        if (input === "") return;

        value = input === "None" ? "none" : "solid";
        $("#" + this._id + "_view").css("border-style", value);
        this.ytappearance.borderStyle = input;

        var bordercolor = this.ytappearance.borderColor;
        $("#" + this._id + "_view").css("border-color", this.optionColor(bordercolor));

        var borderwidth = this.ytappearance.borderWidth;
        $("#" + this._id + "_view").css("border-width", borderwidth);
    }

    YTTrendChart.prototype.getAppearance = function () {
        return this.ytappearance;
    }

    YTTrendChart.prototype.getForegroundColor = function () {
        return this.optionColor(this.ytappearance.foregroundColor);
    }

    YTTrendChart.prototype.setForegroundColor = function (value) {
        $("#" + this._id).css("color", this.optionColor(value));
        this.ytappearance.foregroundColor = value;
    }

    YTTrendChart.prototype.getFont = function () {
        return this.font;
    }

    YTTrendChart.prototype.getTitle = function () {
        return this.yttitle;
    }

    YTTrendChart.prototype.getLegend = function () {
        return this.ytlegend;
    }

    YTTrendChart.prototype.getXaxis = function () {
        return this.ytxaxis;
    }

    YTTrendChart.prototype.getY1axis = function () {
        return this.yty1axis;
    }

    YTTrendChart.prototype.getY2axis = function () {
        return this.yty2axis;
    }

    YTTrendChart.prototype.getY3axis = function () {
        return this.yty3axis;
    }

    YTTrendChart.prototype.getY4axis = function () {
        return this.yty4axis;
    }

    YTTrendChart.prototype.getGrid = function () {
        return this.ytgrid;
    }

    YTTrendChart.prototype.getTrend = function () {
        return this.trend;
    }

    YTTrendChart.prototype.getIsLive = function () {
        return this.trend.isLive;
    }

    YTTrendChart.prototype.setIsLive = function (value) {
        this.trend.isLive = value;
    }

    YTTrendChart.prototype.getRefreshTime = function () {
        return this.trend.refreshTime * 1000;
    }

    YTTrendChart.prototype.setRefreshTime = function (value) {
        this.trend.refreshTime = value;
    }

    YTTrendChart.prototype.getTimeSpan = function () {
        return this.trend.timeSpan;
        //return TimeSpan;
    }

    YTTrendChart.prototype.setTimeSpan = function (value) {
        if (this.trend.timeSpan == value) return;

        this.trend.timeSpan = value;
        this.setStartTime();
    }

    YTTrendChart.prototype.getToTalTick = function () {
        return (this.trend.timeSpan / this.trend.samplingTime);
    }

    YTTrendChart.prototype.getSamplingTime = function () {
        return this.trend.samplingTime;
    }

    YTTrendChart.prototype.getDummyData = function () {
        return this.dummyData;
    }

    YTTrendChart.prototype.setDummyData = function (value) {
        this.dummyData = value;
    }

    YTTrendChart.prototype.getSeries = function () {
        return this.ytseries;
    }
    YTTrendChart.prototype.getFileBuffer = function () {
        return this.ytfilebuffer;
    }
    YTTrendChart.prototype.getTargetLine = function () {
        return this.yttargetline;
    }
    YTTrendChart.prototype.getLimitTime = function () {
        return this.timelimit;
    }
    YTTrendChart.prototype.setLimitTime = function (value) {
        this.timelimit = value;
    }
    YTTrendChart.prototype.setUpdate = function (value) {
        this.isUpdate = value;
    }
    YTTrendChart.prototype.getUpdate = function () {
        return this.isUpdate;
    }
    YTTrendChart.prototype.getStartTime = function () {
        var endtime = new Date(this.getEndTime());
        var startTime = new Date(endtime.setSeconds(endtime.getSeconds() - this.getTimeSpan()));
        return startTime;//return startTime.toLocaleString();
    }

    YTTrendChart.prototype.setStartTime = function () {
        // console.log("setStartTime")

        var isLive = this.getIsLive();
        if (isLive == true) return;

        var endtime = new Date(this.getEndTime());
        // console.log("endtime: " + endtime);
        this.startTime = new Date(endtime.setSeconds(endtime.getSeconds() - this.getTimeSpan()));
    }

    YTTrendChart.prototype.getEndTime = function () {
        var isLive = this.getIsLive();
        if (isLive == false) {
            return this.endTime
        }

        return new Date();
    }

    YTTrendChart.prototype.setEndTime = function (value) {
        var isLive = this.getIsLive();
        if (isLive == true) return;

        // console.log("SetEndTime: " + value);
        if (value > new Date())
            this.endTime = new Date();
        else
            this.endTime = new Date(value);
    }

    YTTrendChart.prototype.getShowToolbar = function () {
        return this.trend.showToolbar;
    }

    YTTrendChart.prototype.setShowToolbar = function (value) {
        this.trend.showToolbar = value;

        this.initToolbar();
        this.initChart();
    }
    YTTrendChart.prototype.getChart = function () {
        return this.chart;
    }

    YTTrendChart.prototype.setChart = function (obj) {
        this.chart = obj;
    }

    YTTrendChart.prototype.getViewData = function () {
        return this.viewData;
    }

    YTTrendChart.prototype.setViewData = function (value) {
        this.viewData = value;
    }

    YTTrendChart.prototype.getBackupData = function () {
        return this.backupData;
    }
    YTTrendChart.prototype.setBackupData = function (value) {
        this.backupData = value;
    }
    YTTrendChart.prototype.getTooltip = function () {
        return this.yttooltip;
    }
    YTTrendChart.prototype.getLimitPoint = function () {
        return this.reqLimitPoint;
    }
    YTTrendChart.prototype.setLimitPoint = function (value) {
        this.reqLimitPoint = value;
    }


    //////////////////////////////////////////////////////////////////////////////// 
    //////////////////// CHART OPTIONS
    ////////////////////////////////////////////////////////////////////////////////    
    YTTrendChart.prototype.optionOrient = function (position) {
        // if (position == "Top") return "horizontal";
        // else if (position == "TopLeft") return "horizontal";
        // else if (position == "TopRight") return "horizontal";
        // else if (position == "Bottom") return "horizontal";
        // else if (position == "BottomLeft") return "horizontal";
        // else if (position == "BottomRight") return "horizontal";
        // else
        return "horizontal";
    }

    YTTrendChart.prototype.optionPointType = function (type) {
        if (type == "Circle") return "circle";
        else if (type == "Square") return "rect";
        else if (type == "RoundSquare") return "roundRect";
        else if (type == "Triangle") return "triangle";
        else if (type == "Diamond") return "diamond";
        else if (type == "Pin") return "pin";
        else if (type == "Arrow") return "arrow";
        else return "none";
    }

    YTTrendChart.prototype.optionBorderStyle = function (style) {
        if (style == "Dot") return "dotted";
        else if (style == "Dash") return "dashed";
        else if (style == "DashDot") return "dashed dotted";
        else if (style == "DashDotDot") return "dashed dotted dotted";
        else return "solid";
    }

    YTTrendChart.prototype.optionColor = function (color) {
        return color == "" ? "transparent" : color;
    }

    YTTrendChart.prototype.optionFontStyle = function (italic) {
        return italic == true ? "italic" : "normal";
    }

    YTTrendChart.prototype.optionFontWeight = function (bold) {
        return bold == true ? "bold" : "normal";
    }

    YTTrendChart.prototype.optionSeriesType = function (type) {
        if (type == "Line") return "line";
        else if (type == "Area") return "line";
        else if (type == "Column") return "bar";
        else return "line";
    }

    YTTrendChart.prototype.optionSeriesLabelPosition = function (position) {
        //top, left, right, bottom, inside, insideLeft, insideRight, insideTop, insideBottom, insideLeftTop, insideLeftBottom, insideRightTop, insideRightBottom
        if (position == "Default") return "top";
        else if (position == "OutSide") return "bottom";
        else if (position == "Outer") return "top";
        else if (position == "Center") return "inside";
        else if (position == "Inner") return "insideBottom";
        else return "top";
    }

    YTTrendChart.prototype.optionSeriesByName = function (name) {
        var oSeries = this.getSeries();
        var seriesCount = oSeries.length;
        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            if (!s) continue;
            if (s.tag == name) return s;
        }
        return null;
    }

    YTTrendChart.prototype.optionSeriesName = function (series) {
        return series.text == "" ? series.name : series.text;
    }

    YTTrendChart.prototype.optionTitlePosition = function (position) {
        if (position == "Top") return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
        else if (position == "Bottom") return { left: 'center', top: 'auto', right: 'auto', bottom: 'bottom' };
        else if (position == "LeftTop") return { left: 'left', top: 'top', right: 'auto', bottom: 'auto' };
        else if (position == "Left") return { left: 'left', top: 'middle', right: 'auto', bottom: 'auto' };
        else if (position == "Right") return { left: 'auto', top: 'middle', right: 'right', bottom: 'auto' };
        else if (position == "RightTop") return { left: 'auto', top: 'top', right: 'right', bottom: 'auto' };
        else if (position == "Auto") return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
        else return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
    }

    YTTrendChart.prototype.optionTitle = function () {
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

    YTTrendChart.prototype.optionLegendPadding = function (position) {
        var paddingTop = 10;
        var paddingBottom = 10;
        var paddingLeft = 10;
        var paddingRight = 10;

        if (position == "Top" || position == "Default" ||
            position == "TopLeft" || position == "TopRight") {
            var showToolbar = this.getShowToolbar();
            if (showToolbar == true) {
                paddingTop += 25;
            }

            var title = this.getTitle();
            if (title.visible == true) {
                paddingTop += title.font.size * 1.2;
            }
            paddingLeft = 40;
            paddingRight = 40;
        }
        else if (position == "Bottom" || position == "BottomLeft" ||
            position == "BottomRight") {
            paddingLeft = 40;
            paddingRight = 40;
        }
        else {
            paddingTop = 10;
            paddingRight = 10;
            paddingBottom = 10;
            paddingLeft = 10;
        }


        var padding = [
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft
        ];

        return padding;
    }

    YTTrendChart.prototype.optionLegendPosition = function (position) {
        if (position == "Top") return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
        else if (position == "TopLeft") return { left: 'left', top: 'top', right: 'auto', bottom: 'auto' };
        else if (position == "TopRight") return { left: 'right', top: 'top', right: 'auto', bottom: 'auto' };
        else if (position == "Bottom") return { left: 'center', top: 'auto', right: 'auto', bottom: 'bottom' };
        else if (position == "BottomLeft") return { left: 'left', top: 'auto', right: 'auto', bottom: 'bottom' };
        else if (position == "BottomRight") return { left: 'right', top: 'auto', right: 'auto', bottom: 'bottom' };
        else if (position == "Default") return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
        else return { left: 'center', top: 'top', right: 'auto', bottom: 'auto' };
    }

    YTTrendChart.prototype.optionLegend = function () {

        var oLegend = this.getLegend();

        var oFont = oLegend.font;

        var position = this.optionLegendPosition(oLegend.position);
        var orient = this.optionOrient(oLegend.position);
        var data = this.optionDataByLegend();
        var color = this.optionColor(oLegend.textColor);
        var pad = this.optionLegendPadding(oLegend.position);
        var selecteddata = this.optionDataBySelectedLegend();

        var item = {
            show: oLegend.visible,
            selectedMode: true,
            orient: orient,
            data: data,
            selected: selecteddata,
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

    YTTrendChart.prototype.optionDataByLegend = function () {
        var oSeries = this.getSeries();
        var seriesCount = oSeries.length;

        var data = [];
        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            if (!s) continue;
            // if (s.visible == false) continue;

            if (s.tag === "" || s.tag === "None") continue;

            var name = this.optionSeriesName(s);
            data.push(name);
        }
        return data;
    }

    YTTrendChart.prototype.optionDataBySelectedLegend = function () {
        var oSeries = this.getSeries();
        var seriesCount = oSeries.length;
        var data = {};

        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            var name = this.optionSeriesName(s);
            if (s.tag === "" || s.tag === "None") continue;

            if (!s) continue;
            if (s.visible == false) {
                data[name] = false;
            }
            else {
                data[name] = true;
            }
        }
        return data;
    }

    YTTrendChart.prototype.optionXaxisBoundaryGap = function () {
        var oSeries = this.getSeries();
        var seriesCount = oSeries.length;
        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            if (!s) continue;
            // if (s.visible == false) continue;
            if (s.tag === "" || s.tag === "None") continue;
            if (s.type == "Column") {
                return true;
            }
        }
        return false;
    }

    YTTrendChart.prototype.optionXaxis = function () {
        // console.log("YTTrendChart.prototype.optionXaxis");

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
        //var labelInterval = oLabel.interval;
        var format = oXaxis.format.format;
        var charttype = 'time';

        //Tick - MajorTick
        var oTick = oXaxis.majorTick;
        var tickVisible = oTick.visible;
        var tickInside = oTick.type == "Outside" ? false : true;
        //var tickLineColor = this.optionColor(oTick.lineColor);
        var tickLineColor = lineColor;
        var tickLineType = this.optionBorderStyle(oTick.lineStyle);
        var tickLineWidth = oTick.lineWidth;
        var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

        //Grid - MajorGird
        var optgrid = this.getGrid();
        var oMajor = oXaxis.majorGrid;
        // var majorVisible = oMajor.visible;
        var majorVisible = optgrid.vvisible;
        // var majorLineColor = this.optionColor(oMajor.lineColor);
        var majorLineColor = this.optionColor(optgrid.vcolor);
        var majorLineType = this.optionBorderStyle(oMajor.lineStyle);
        var majorLineWidth = oMajor.lineWidth;
        // var majorCount = oMajor.count;
        var majorCount = optgrid.vcount;
        var timespan = this.getTimeSpan();

        // Re-Calculate timespan if user change the Grid.vcount
        var newtimespan = Math.ceil(timespan / majorCount) * majorCount;
        if (timespan != newtimespan) {
            this.setTimeSpan(newtimespan);
            timespan = newtimespan;
        }
        var endtime = this.getEndTime();
        var starttime = this.getStartTime();
        var ts = endtime.getTime() - starttime.getTime();
        // console.log("End - Start: " + ts);
        // console.log("endTime: " + endtime);
        // console.log("starTtime: " + starttime);

        var majorInterval = Math.round(ts / majorCount);

        var item = {
            show: true,
            // type: 'category',
            type: 'time',
            name: name,
            nameLocation: 'middle',
            inverse: oXaxis.isReversed,
            nameGap: 15,
            nameTextStyle: {
                lineHeight: 20,
                color: nameColor,
                fontStyle: this.optionFontStyle(oTitleFont.italic),
                fontWeight: this.optionFontWeight(oTitleFont.bold),
                fontFamily: oTitleFont.name,
                fontSize: oTitleFont.size
            },
            // scale: true,
            // boundaryGap: this.optionXaxisBoundaryGap(),
            // min: min,
            // max: max,
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
                show: true,
                rotate: labelRotate,
                textStyle: {
                    color: labelColor,
                    fontStyle: this.optionFontStyle(oLabelFont.italic),
                    fontWeight: this.optionFontWeight(oLabelFont.bold),
                    fontFamily: oLabelFont.name,
                    fontSize: oLabelFont.size
                },
                //formatter: null,
                formatter: function (value, index) {
                    // Time display format: yyyy-MM-dd HH:mm:ss
                    var date = new Date(value);
                    var texts = [date.getFullYear(), (date.getMonth() + 1), date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()];
                    return texts.join('/');
                },
                interval: majorInterval,
                // interval: 'auto'
            },
            interval: majorInterval,
            splitLine: {
                show: majorVisible,
                interval: 'auto',
                lineStyle: {
                    color: majorLineColor,
                    width: majorLineWidth,
                    type: majorLineType
                }
            }
            // data: [
            //     moment(new Date()).format("HH:mm:ss"),
            //     moment(new Date()).format("HH:mm:ss"),
            //     moment(new Date()).format("HH:mm:ss"),
            //     moment(new Date()).format("HH:mm:ss"),
            //     moment(new Date()).format("HH:mm:ss")
            // ]
        };
        return item;
    }

    YTTrendChart.prototype.optionY1axis = function () {
        var view = this;
        var oYaxis = view.getY1axis();
        var show = true;

        // Axis Position
        var Position = oYaxis.position.toLowerCase();

        //Title
        var oTitle = oYaxis.title;
        var oTitleFont = oTitle.font;
        var name = oTitle.visible == true ? oTitle.text : "";
        var nameColor = this.optionColor(oTitle.textColor);
        var nameRotate = 270;

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
        //var tickLineColor = this.optionColor(oTick.lineColor);
        var tickLineColor = lineColor;
        var tickLineType = this.optionBorderStyle(oTick.lineStyle);
        var tickLineWidth = oTick.lineWidth;
        var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

        //Grid - MajorGird
        var oMajor = view.getGrid();
        var majorVisible = oMajor.hvisible;
        var majorLineColor = this.optionColor(oMajor.hcolor);
        var majorLineType = this.optionBorderStyle("Solid");
        var majorLineWidth = 1;
        var majorcount = oMajor.hcount;

        //var majorinterval = Math.floor((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);

        var item = {
            show: show,
            type: 'value',
            name: name,
            position: Position,
            nameLocation: 'middle',
            nameRotate: nameRotate,
            nameGap: 15,
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
            interval: majorinterval,
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
                formatter: function (value, index) {
                    if (index == null) return;
                    //console.log("==========================> index: ", index);
                    var llen = parseInt(oYaxis.format.format.split(',')[0]);
                    var rlen = parseInt(oYaxis.format.format.split(',')[1]);
                    var result = view.AxisFormatter(value, llen, rlen);
                    oLabel.length = result.toString().length;
                    return result;
                }
                // formatter: null,
            },
            splitLine: {
                show: majorVisible,
                interval: 'auto',
                lineStyle: {
                    color: majorLineColor,
                    width: majorLineWidth,
                    type: majorLineType
                }
            }
        };
        return item;
    }

    YTTrendChart.prototype.optionY2axis = function () {
        var view = this;
        var oYaxis = this.getY2axis();
        var show = oYaxis.visible;

        // Axis Position
        var Position = oYaxis.position.toLowerCase();

        //Title
        var oTitle = oYaxis.title;
        var oTitleFont = oTitle.font;
        var name = oTitle.visible == true ? oTitle.text : "";
        var nameColor = this.optionColor(oTitle.textColor);
        var nameRotate = 270;

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
        //var tickLineColor = this.optionColor(oTick.lineColor);
        var tickLineColor = lineColor;
        var tickLineType = this.optionBorderStyle(oTick.lineStyle);
        var tickLineWidth = oTick.lineWidth;
        var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

        //Grid - MajorGird
        var oMajor = view.getGrid();
        var majorVisible = oMajor.hvisible;
        var majorLineColor = this.optionColor(oMajor.hcolor);
        var majorLineType = this.optionBorderStyle("Solid");
        var majorLineWidth = 1;
        var majorcount = oMajor.hcount;
        //var majorinterval = Math.floor((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        // console.log("oYaxis.maxValue: " + oYaxis.maxValue);
        // console.log("oYaxis.minValue: " + oYaxis.minValue);
        // console.log("majorcount: " + majorcount);
        // console.log("majorinterval: " + majorinterval);

        var item = {
            show: show,
            type: 'value',
            name: name,
            position: Position,
            nameLocation: 'middle',
            nameRotate: nameRotate,
            nameGap: 15,
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
            interval: majorinterval,
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
                formatter: function (value, index) {
                    if (index == null) return;
                    var llen = parseInt(oYaxis.format.format.split(',')[0]);
                    var rlen = parseInt(oYaxis.format.format.split(',')[1]);
                    var result = view.AxisFormatter(value, llen, rlen);
                    oLabel.length = result.toString().length;
                    return result;
                }
                // formatter: null,
            },
            splitLine: {
                show: majorVisible,
                interval: 'auto',
                lineStyle: {
                    color: majorLineColor,
                    width: majorLineWidth,
                    type: majorLineType
                }
            }
        };
        return item;
    }

    YTTrendChart.prototype.optionY3axis = function () {
        var view = this;
        var oYaxis = this.getY3axis();
        var show = oYaxis.visible;

        // Axis Position
        var Position = oYaxis.position.toLowerCase();

        //Title
        var oTitle = oYaxis.title;
        var oTitleFont = oTitle.font;
        var name = oTitle.visible == true ? oTitle.text : "";
        var nameColor = this.optionColor(oTitle.textColor);
        var nameRotate = 270;

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
        ///var tickLineColor = this.optionColor(oTick.lineColor);
        var tickLineColor = lineColor;
        var tickLineType = this.optionBorderStyle(oTick.lineStyle);
        var tickLineWidth = oTick.lineWidth;
        var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

        //Grid - MajorGird
        var oMajor = view.getGrid();
        var majorVisible = oMajor.hvisible;
        var majorLineColor = this.optionColor(oMajor.hcolor);
        var majorLineType = this.optionBorderStyle("Solid");
        var majorLineWidth = 1;
        var majorcount = oMajor.hcount;
        //var majorinterval = Math.floor((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        // console.log("oYaxis.maxValue: " + oYaxis.maxValue);
        // console.log("oYaxis.minValue: " + oYaxis.minValue);
        // console.log("majorcount: " + majorcount);
        // console.log("majorinterval: " + majorinterval);

        var item = {
            show: show,
            type: 'value',
            name: name,
            position: Position,
            //offset: 120,
            nameLocation: 'middle',
            nameRotate: nameRotate,
            nameGap: 15,
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
            interval: majorinterval,
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
                formatter: function (value, index) {
                    if (index == null) return;
                    //console.log("Y3Axis================================> " + index);
                    var llen = parseInt(oYaxis.format.format.split(',')[0]);
                    var rlen = parseInt(oYaxis.format.format.split(',')[1]);
                    var result = view.AxisFormatter(value, llen, rlen);
                    oLabel.length = result.toString().length;
                    return result;
                }
                // formatter: null,
            },
            splitLine: {
                show: majorVisible,
                interval: 'auto',
                lineStyle: {
                    color: majorLineColor,
                    width: majorLineWidth,
                    type: majorLineType
                }
            }
        };
        return item;
    }

    YTTrendChart.prototype.optionY4axis = function () {
        var view = this;
        var oYaxis = this.getY4axis();
        var show = oYaxis.visible;

        // Axis Position
        var Position = oYaxis.position.toLowerCase();

        //Title
        var oTitle = oYaxis.title;
        var oTitleFont = oTitle.font;
        var name = oTitle.visible == true ? oTitle.text : "";
        var nameColor = this.optionColor(oTitle.textColor);
        var nameRotate = 270;

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
        //var tickLineColor = this.optionColor(oTick.lineColor);
        var tickLineColor = lineColor;
        var tickLineType = this.optionBorderStyle(oTick.lineStyle);
        var tickLineWidth = oTick.lineWidth;
        var tickStep = isNaN(oTick.step) ? "auto" : oTick.step;

        //Grid - MajorGird
        var oMajor = view.getGrid();
        var majorVisible = oMajor.hvisible;
        var majorLineColor = this.optionColor(oMajor.hcolor);
        var majorLineType = this.optionBorderStyle("Solid");
        var majorLineWidth = 1;
        var majorcount = oMajor.hcount;
        //var majorinterval = Math.floor((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        var majorinterval = ((oYaxis.maxValue - oYaxis.minValue) / majorcount);
        // console.log("oYaxis.maxValue: " + oYaxis.maxValue);
        // console.log("oYaxis.minValue: " + oYaxis.minValue);
        // console.log("majorcount: " + majorcount);
        // console.log("majorinterval: " + majorinterval);

        var item = {
            show: show,
            type: 'value',
            name: name,
            position: Position,
            nameLocation: 'middle',
            nameRotate: nameRotate,
            nameGap: 15,
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
            interval: majorinterval,
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
                formatter: function (value, index) {
                    if (index == null) return;
                    // console.log("================================> " + index);
                    var llen = parseInt(oYaxis.format.format.split(',')[0]);
                    var rlen = parseInt(oYaxis.format.format.split(',')[1]);
                    var result = view.AxisFormatter(value, llen, rlen);
                    oLabel.length = result.toString().length;
                    return result;
                }
                // formatter: null,
            },
            splitLine: {
                show: majorVisible,
                interval: 'auto',
                lineStyle: {
                    color: majorLineColor,
                    width: majorLineWidth,
                    type: majorLineType
                }
            }
        };
        return item;
    }

    YTTrendChart.prototype.GetZero = function (length) {
        return "0".repeat(length);
    }

    YTTrendChart.prototype.NumberConvert = function (n) {
        var sign = +n < 0 ? "-" : "",
            toStr = n.toString();
        if (!/e/i.test(toStr)) {
            return n;
        }
        var tmpsplit = n.toString()
            .replace(/^-/, "")
            .replace(/^([0-9]+)(e.*)/, "$1.$2")
            .split(/e|\./);
        var lead = tmpsplit[0];
        var decimal = tmpsplit[1];
        var pow = tmpsplit[2];

        return +pow < 0
            ? sign + "0." + "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal
            : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))) : (decimal.slice(0, +pow) + "." + decimal.slice(+pow)))
    }

    YTTrendChart.prototype.AxisFormatter = function (inputnumber, left, right) {
        // console.log("Formatter");
        var value = 0;
        var sign = +inputnumber < 0 ? "-" : "";
        value = parseFloat(inputnumber).toExponential();
        if (sign == "-") {
            value = value.toString().replace(/^-/, "");
        }
        var format = left + "," + right;
        var lf = format.split(',')[0];
        var rf = format.split(',')[1];
        var lfi = parseInt(lf);
        var rfi = parseInt(rf);

        var lval = "";
        var rval = "";
        var output = "";
        var lead = 0;
        var decimal = 0;
        var pow = 0;

        if (lfi == 0 && rfi == 0) {
            output = this.NumberConvert(value);

        } else if (lfi == 0) {
            var originval = this.NumberConvert(value);
            var tmpsplit = parseFloat(originval).toFixed(rfi).toString().split(/\./);
            var lval = tmpsplit[0];
            var rval = tmpsplit[1];
            output = lval + "." + rval;
        } else if (rfi == 0) {
            var tmpsplit = value.toString()
                .replace(/^-/, "")
                .replace(/^([0-9]+)(e.*)/, "$1.$2")
                .split(/e|\./);

            var lead = tmpsplit[0];
            var decimal = tmpsplit[1];
            var pow = tmpsplit[2];

            var newinput = lead + "." + decimal;
            var result = parseFloat(newinput).toFixed(lfi - 1);
            lval = result.toString().replace(".", "").substring(0, lfi);
            var expval = pow - (lval.length - 1);
            output = lval + "e" + (expval > 0 ? "+" : "") + expval;
        } else {
            var tmpsplit = value.toString()
                .replace(/^-/, "")
                .replace(/^([0-9]+)(e.*)/, "$1.$2")
                .split(/e|\./);

            var lead = tmpsplit[0];

            var decimal = tmpsplit[1];

            var pow = tmpsplit[2];

            var newinput = lead + "." + decimal;
            var result = parseFloat(newinput).toFixed(lfi + rfi - 1);
            lval = result.toString().replace(".", "").substring(0, lfi);
            rval = result.toString().replace(".", "").substring(lfi, lfi + rfi);
            var expval = pow - (lval.length - 1);
            output = lval + "." + rval + "e" + (expval > 0 ? "+" : "") + expval;
        }
        if (sign == "-" && Number(output) != 0)
            output = "-" + output;
        return output.toString();
    }

    YTTrendChart.prototype.optionSeries = function () {
        // console.trace();
        var oSeries = this.getSeries();
        // console.log("oSeries: ", oSeries);
        var seriesCount = oSeries.length;

        var data = [];
        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            if (!s) continue;
            // if (s.visible == false) continue;
            if (s.tag === "" || s.tag === "None") continue;

            var item = {};
            if (s.type == "Area")
                item = this.optionSeriesByArea(s);
            else if (s.type == "Column")
                item = this.optionSeriesByColumn(s);
            else if (s.type == "Point")
                item = this.optionSeriesByPoint(s);
            else
                item = this.optionSeriesByLine(s);

            data.push(item);
        }
        return data;
    }

    YTTrendChart.prototype.optionSeriesByLine = function (series) {

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
        var lineWidth = oLine.visible == true ? series.width : 0;

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
                    color: color,
                    width: lineWidth,
                    type: lineStyle
                }
            },
            symbol: pointType,
            symbolSize: pointSize,
            showSymbol: pointShow,
            itemStyle: {
                normal: {
                    color: color,
                    opacity: opacity
                }
            },
            connectNulls: false,
            smooth: false
        };
        return item;
    }

    YTTrendChart.prototype.optionSeriesByPoint = function (series) {

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
                    //width: lineWidth,
                    width: 0,
                    type: lineStyle
                }
            },
            symbol: pointType,
            symbolSize: pointSize,
            showSymbol: true,
            itemStyle: {
                normal: {
                    color: pointColor,
                    opacity: opacity
                }
            },
            connectNulls: false,
            smooth: false
        };
        return item;
    }
    YTTrendChart.prototype.optionSeriesByArea = function (series) {

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
                    color: 'transparent',
                    width: 0,
                    type: lineStyle
                }
            },
            symbol: 'none',
            symbolSize: 0,
            showSymbol: false,

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
        };

        return item;
    }
    YTTrendChart.prototype.optionSeriesByColumn = function (series) {

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
    YTTrendChart.prototype.optionTextStyle = function () {
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

    YTTrendChart.prototype.optionToolTip = function () {
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
        var tooltip = this.getTooltip();
        var item = {
            trigger: tooltip.visible ? 'axis' : 'none'
            // trigger: 'axis'
        }
        return item;
    }
    YTTrendChart.prototype.optionDataZoom = function () {
        var show = this.getShowToolbar();
        // dataZoom: [
        //     {
        //         type: 'slider',
        //         xAxisIndex: [0],
        //         filterMode: 'empty'
        //     },
        //     {
        //         type: 'slider',
        //         yAxisIndex: [0,1,2,3],
        //         filterMode: 'empty'
        //     },
        // ],
        //dataZoom: optDataZoom,
        var item = {
            show: show,
            type: 'slider',
            start: 0,
            end: 100
        }
        return item;
    }
    YTTrendChart.prototype.optionToolBox = function () {
        var margin = 15;
        var padingtop = "10%"
        var distance = margin;
        var showToolbar = this.getShowToolbar();
        var chartheight = this._height;

        if (showToolbar) {
            distance += margin;
        }

        padingtop = distance * 100 / chartheight + "%";

        var item = {
            //id: "toolboxid",
            orient: 'vertical',
            top: padingtop,
            feature: {

                dataZoom: {
                    realtime: true,
                    show: true,
                    title: {
                        zoom: "",
                        back: ""
                    },
                    filterMode: 'empty',//Increase this attribute setting
                    // icon: {
                    //     zoom: 'image://https://www.glyphicons.com/img/glyphicons/basic/2x/glyphicons-basic-3-dog@2x.png',
                    //     back: 'image://../img/glyphicons-basic-3-dog@2x.png'
                    // },
                    // emphasis: {
                    //     iconStyle: {
                    //         color: {
                    //             type: 'linear',
                    //             x: 0,
                    //             y: 0,
                    //             x2: 0,
                    //             y2: 1,
                    //             colorStops: [{
                    //                 offset: 0,
                    //                 color: 'red' // color at 0% position
                    //             }, {
                    //                 offset: 1,
                    //                 color: 'blue' // color at 100% position
                    //             }],
                    //             global: false // false by default
                    //         }
                    //     },
                    // },

                    // yAxisIndex: [0],
                    // xAxisIndex: [0]
                },
            }
        };

        var defaultitem =
        {
            showTitle: true,

            top: padingtop,
            zlevel: 1,
            z: 1,
            title: "EnableSelection",
            feature: {
                showTitle: false,
                id: "toolbox1",
                show: true,
                dataZoom: {
                    show: true,
                    enable: true

                    // yAxisIndex: [0,1,2,3],
                    // xAxisIndex: [0]
                },
            }
        };

        var feature2 = {
            myTool0: {
                showTitle: true,
                top: "10%",
                zlevel: 1,
                z: 1,
                title: "Enable Selection",
                id: "toolbox1",
                show: true,
                icon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                dataZoom: {
                    show: true,
                    enable: true,
                    yAxisIndex: [0],
                    xAxisIndex: [0]
                },
                onclick: function () {
                    //alert('myToolHandler1')
                },
            },
            myTool1: {
                show: true,
                title: 'custom extension method 1',
                icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                onclick: function () {
                    //alert('myToolHandler1')
                },
                dataZoom: {
                    show: true,
                    enable: true,
                    yAxisIndex: [0],
                    xAxisIndex: [0]
                },
                restore: {},
                saveAsImage: {}
            },
            myTool2: {
                show: true,
                title: 'custom extension 2',
                icon: 'image://https://getbootstrap.com/docs/3.3/favicon.ico',
                onclick: function () {
                    //alert('myToolHandler1')
                },
                dataZoom: {
                    show: true,
                    enable: true,
                    yAxisIndex: [0],
                    xAxisIndex: [0]
                },
                restore: {},
                saveAsImage: {}
            }
        };

        return item;
    }
    YTTrendChart.prototype.optionGrid = function () {
        // console.log("optionGrid");

        var xAxis = this.getXaxis();
        var backgroundColor = this.optionColor(this.ytappearance.foregroundColor);

        var oLegend = this.getLegend();
        var showToolbar = this.getShowToolbar();
        var chartheigh = this.height;
        var chartwidth = this.width;
        var margin = 20;
        var top = 20;
        var bottom = 10;
        var bottomer = 20;
        var topper = margin;

        if (showToolbar == true) {
            topper += margin;
        }

        ///////// Title ////////////
        var title = this.getTitle();
        if (title.visible == true && title.text.length > 0) {
            topper += Number(title.height);
        }

        ////////// Legend  ////////////    
        if (oLegend.visible == true) {
            if (oLegend.position == "Default" || oLegend.position == "Top" || oLegend.position == "TopLeft" || oLegend.position == "TopRight") {
                topper += oLegend.height;
            }
            else if (oLegend.position == "Bottom" || oLegend.position == "BottomLeft" || oLegend.position == "BottomRight") {
                bottomer += oLegend.height;
            }
        }

        ////////// X-AXIS  ////////////    
        if (xAxis.title.text.length > 0) {
            bottomer += xAxis.title.font.size + xAxis.label.font.size;
        }

        top = topper * 100 / chartheigh + '%';
        bottom = bottomer * 100 / chartheigh + '%';

        var leftside = '7%';
        if (this.axisposleft >= 180) {
            leftside = '15%';
        }

        var rightside = '7%';
        if (this.axisposright >= 180) {
            rightside = '15%';
        }

        var item = {
            show: true,
            containLabel: true,
            backgroundColor: backgroundColor,
            top: top,
            left: leftside,
            right: rightside,
            bottom: bottom,
        };

        // console.trace(item);
        // console.log("optionGrid: ", item);
        return item;
    }

    //chart options
    YTTrendChart.prototype.options = function () {
        // // console.log("Init Option");
        var view = this;
        var optionAppearance = this.getAppearance();
        view.setBorderStyle(optionAppearance.borderStyle);

        var optTitle = this.optionTitle();
        var optTextStyle = this.optionTextStyle();
        var optToolTip = this.optionToolTip();
        var optLegend = this.optionLegend();
        var optXaxis = this.optionXaxis();
        var optY1axis = this.optionY1axis();
        var optY2axis = this.optionY2axis();
        var optY3axis = this.optionY3axis();
        var optY4axis = this.optionY4axis();
        var optGrid = this.optionGrid();
        var optYaxis = [optY1axis, optY2axis, optY3axis, optY4axis];
        var optSeries = this.optionSeries();
        var backgroundColor = this.getBackgroundColor();
        var optDataZoom = this.optionDataZoom();
        var toolBox = this.optionToolBox();

        // console.log("optTitle: ", optTitle);
        // console.log("optLegend: ", optLegend);
        // console.log("optGrid: ", optGrid);
        //console.log("optYaxis: ", optYaxis);
        // console.log("optXaxis: ", optXaxis);
        // console.log("optSeries: ", optSeries);
        // console.log("optionAppearance: ", optionAppearance);

        var option = {
            title: optTitle,
            backgroundColor: backgroundColor,
            //textStyle: optTextStyle,
            tooltip: optToolTip,
            legend: optLegend,
            grid: optGrid,
            xAxis: optXaxis,
            yAxis: optYaxis,
            series: optSeries,
            animation: false,
            toolbox: toolBox,
        };

        // console.log("View:", view);
        // console.log("option:", option);

        return option;
    }

    //////////////////////////////////////////////////////////////////////////////// 
    //////////////////// Toolbar Operation
    ////////////////////////////////////////////////////////////////////////////////
    YTTrendChart.prototype.toolbarButtonID = function (type) {
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
        else if (type == "editseries") return this._id + "-toolbar-aeditseries";
        else if (type == "editseries-content") return this._id + "-toolbar-editseries-content";
        else if (type == "generalsetting") return this._id + "-toolbar-generalsetting";
        else if (type == "generalsetting-content") return this._id + "-toolbar-generalsetting-content";
        else if (type == "importsetting") return this._id + "-importsetting";
        else if (type == "exportsetting") return this._id + "-exportsetting";
        else return "";
    }

    YTTrendChart.prototype.initToolbar = function () {
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
        var editseries = this.toolbarButtonID("editseries");
        var editseriesContent = this.toolbarButtonID("editseries-content")
        var generalsetting = this.toolbarButtonID("generalsetting");
        var gsContent = this.toolbarButtonID("generalsetting-content");
        var clockContent = this.toolbarButtonID("clock-content");
        var importSetting = this.toolbarButtonID("importsetting");
        var exportSetting = this.toolbarButtonID("exportsetting");

        var buttonHtml = '';
        buttonHtml += '<a id="' + live + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="live"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + trend + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="trend"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + zoomin + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="zoom in"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + zoomout + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="zoom out"><span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + prev + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="prev"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + backward + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="backward"><span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + forward + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="forward"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + next + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="next"><span class="glyphicon glyphicon-forward" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + clock + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="clock"><span class="glyphicon glyphicon-time" aria-hidden="true"></span><span id="' + clockContent + '" title="Trend Time"></span></a> ';
        buttonHtml += '<a id="' + file + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="text save"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + image + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="image save"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span></a> ';
        buttonHtml += '<a id="' + editseries + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="edit series"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span><span id="' + editseriesContent + '" title="Series Edit"></span></a> ';
        buttonHtml += '<a id="' + generalsetting + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="general setting"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span><span id="' + gsContent + '" title="General Setting"></span></a> ';
        buttonHtml += '<a id="' + importSetting + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="import setting"><span class="glyphicon glyphicon-import" aria-hidden="true"></span><span id="' + importSetting + '" title="Import Setting"></span></a> ';
        buttonHtml += '<a id="' + exportSetting + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="export setting"><span class="glyphicon glyphicon-export" aria-hidden="true"></span><span id="' + exportSetting + '" title="Export Setting"></span></a>';

        $("#" + this._id + "-toolbar").html(buttonHtml);

        var view = this;
        $("#" + live).click(function () {
            view.toolbarByLive();
        });
        $("#" + trend).click(function () {
            view.toolbarByLive();
        });
        $("#" + zoomin).click(function () {
            view.toolbarByXZoomIn();
        });
        $("#" + zoomout).click(function () {
            view.toolbarByXZoomOut();
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
            view.toolbarByTimeSelectionClick();
        });
        $("#" + file).click(function () {
            view.toolbarByFile();
        });
        $("#" + image).click(function () {
            view.toolbarByImage();
        });
        $("#" + editseries).click(function () {
            view.EditSeriesOperation();
        });
        $("#" + generalsetting).click(function () {
            view.GeneralSettingOperator();
        });
        $("#" + importSetting).click(function () {
            view.ImportSettingPress(view.ImportSettingOperation);
        });
        $("#" + exportSetting).click(function () {
            view.ExportSettingPress();
        });
        $("#" + trend).hide();
        this.toolbarByDisabled();
    }

    YTTrendChart.prototype.toolbarByDisabled = function () {

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

    // press islive button on toolbar
    YTTrendChart.prototype.toolbarByLive = function () {
        //// console.log("toolbarByLive");
        //var starttime = this.getStartTime();
        var isLive = this.getIsLive();
        this.setIsLive(!isLive);

        var pLive = $("#" + this.toolbarButtonID("live"));
        var pTrend = $("#" + this.toolbarButtonID("trend"));
        if (this.getIsLive() == true) {
            pLive.show();
            pTrend.hide();
        } else {
            pLive.hide();
            pTrend.show();
            //this.setStartTime(starttime);
            this.setEndTime(new Date());
            this.setStartTime();
        }
        this.toolbarByDisabled();
        this.doViewData();
    }

    YTTrendChart.prototype.toolbarByXZoomIn = function () {
        // console.log("XAxis ZOOM IN");
        var view = this;
        var grid = view.getGrid();
        var majorCount = grid.vcount;
        var timespan = this.getTimeSpan();
        if (timespan <= majorCount) return;

        var newtimespan = Math.ceil((timespan / 2) / majorCount) * majorCount;
        this.setTimeSpan(newtimespan);
        this.ResetGrid();
        this.reInitChart();

        // if this is offline mode => update chart
        var islive = this.getIsLive();
        if (islive == false) {
            this.doViewDataByTrend();
        }
    }

    YTTrendChart.prototype.toolbarByXZoomOut = function () {
        // console.log("XAxis ZOOM OUT");
        var view = this;
        var grid = view.getGrid();
        var majorCount = grid.vcount;
        //var filebuffer = view.getFileBuffer();
        var timelimit = view.getLimitTime();
        var timespan = this.getTimeSpan();
        var newtimespan = Math.ceil(timespan * 2 / majorCount) * majorCount;
        if (newtimespan > timelimit) newtimespan = timelimit;

        this.setTimeSpan(newtimespan);
        this.ResetGrid();
        this.reInitChart();
        // if this is offline mode => update chart
        var islive = this.getIsLive();
        if (islive == false) {
            this.doViewDataByTrend();
        }
    }

    YTTrendChart.prototype.toolbarByYZoomIn = function () {
        // console.log("YAxis ZOOM IN");
        var view = this;
        var y1Axis = view.getY1axis();
        var y2Axis = view.getY2axis();
        var y3Axis = view.getY3axis();
        var y4Axis = view.getY4axis();
        var rate = 4;

        var y1distance = parseFloat((y1Axis.maxValue - y1Axis.minValue) / rate);
        y1Axis.minValue = (y1Axis.minValue + y1distance);
        y1Axis.maxValue = (y1Axis.maxValue - y1distance);

        // console.log("y1Axis.minValue: " + y1Axis.minValue);
        // console.log("y1Axis.maxValue: " + y1Axis.maxValue);

        var y2distance = parseFloat((y2Axis.maxValue - y2Axis.minValue) / rate);
        y2Axis.minValue = (y2Axis.minValue + y2distance);
        y2Axis.maxValue = (y2Axis.maxValue - y2distance);
        // console.log("y2Axis.minValue: " + y2Axis.minValue);
        // console.log("y2Axis.maxValue: " + y2Axis.maxValue);

        var y3distance = parseFloat((y3Axis.maxValue - y3Axis.minValue) / rate);
        y3Axis.minValue = (y3Axis.minValue + y3distance);
        y3Axis.maxValue = (y3Axis.maxValue - y3distance);
        // console.log("y3Axis.minValue: " + y3Axis.minValue);
        // console.log("y3Axis.maxValue: " + y3Axis.maxValue);

        var y4distance = parseFloat((y4Axis.maxValue - y4Axis.minValue) / rate);
        y4Axis.minValue = (y4Axis.minValue + y4distance);
        y4Axis.maxValue = (y4Axis.maxValue - y4distance);
        // console.log("y4Axis.minValue: " + y4Axis.minValue);
        // console.log("y4Axis.maxValue: " + y4Axis.maxValue);

        this.reInitChart();

        // if this is offline mode => update chart
        var islive = this.getIsLive();
        if (islive == false) {
            this.doViewDataByTrend();
        }
    }

    YTTrendChart.prototype.toolbarByYZoomOut = function () {
        // console.log("YAxis ZOOM OUT");
        var view = this;

        var y1Axis = view.getY1axis();
        var y2Axis = view.getY2axis();
        var y3Axis = view.getY3axis();
        var y4Axis = view.getY4axis();

        var rate = 4;

        var y1distance = parseFloat((y1Axis.maxValue - y1Axis.minValue) / rate);
        // console.log("y1distance: " + y1distance);
        // console.log("y1Axis.minValue: " + y1Axis.minValue);
        // console.log("y1Axis.maxValue: " + y1Axis.maxValue);

        y1Axis.minValue = (y1Axis.minValue - y1distance);
        // console.log("y1Axis.minValue: " + y1Axis.minValue);

        // console.log("Sum of Max Val: " + y1Axis.maxValue + y1distance);
        y1Axis.maxValue = (y1Axis.maxValue + y1distance);
        // console.log("y1Axis.maxValue: " + y1Axis.maxValue);

        var y2distance = parseFloat((y2Axis.maxValue - y2Axis.minValue) / rate);
        y2Axis.minValue = (y2Axis.minValue - y2distance);
        y2Axis.maxValue = (y2Axis.maxValue + y2distance);
        // console.log("y2Axis.minValue: " + y2Axis.minValue);
        // console.log("y2Axis.maxValue: " + y2Axis.maxValue);

        var y3distance = parseFloat((y3Axis.maxValue - y3Axis.minValue) / rate);
        y3Axis.minValue = (y3Axis.minValue - y3distance);
        y3Axis.maxValue = (y3Axis.maxValue + y3distance);
        // console.log("y3Axis.minValue: " + y3Axis.minValue);
        // console.log("y3Axis.maxValue: " + y3Axis.maxValue);

        var y4distance = parseFloat((y4Axis.maxValue - y4Axis.minValue) / rate);
        // console.log("y4Axis.minValue: " + y4Axis.minValue);
        // console.log("y4Axis.maxValue: " + y4Axis.maxValue);
        // console.log("y4distance: " + y4distance);
        y4Axis.minValue = (y4Axis.minValue - y4distance);
        y4Axis.maxValue = (y4Axis.maxValue + y4distance);
        // console.log("y4Axis.minValue: " + y4Axis.minValue);
        // console.log("y4Axis.maxValue: " + y4Axis.maxValue);

        this.reInitChart();

        // if this is offline mode => update chart
        var islive = this.getIsLive();
        if (islive == false) {
            this.doViewDataByTrend();
        }
    }

    YTTrendChart.prototype.toolbarByPrev = function () {
        // console.log("toolbarByPrev");
        var islive = this.getIsLive();
        if (islive == true) return;

        var endtime = new Date(this.getEndTime());
        this.setEndTime(endtime.setMinutes(endtime.getMinutes() - 1));
        this.setStartTime();
        this.doViewData();
    }

    YTTrendChart.prototype.toolbarByBackward = function () {
        // console.log("toolbarByBackward");
        var islive = this.getIsLive();
        if (islive == true) return;

        var endtime = new Date(this.getEndTime());
        this.setEndTime(endtime.setSeconds(endtime.getSeconds() - 1));
        this.setStartTime();
        this.doViewData();
    }

    YTTrendChart.prototype.toolbarByForward = function () {
        // console.log("toolbarByForward");
        var islive = this.getIsLive();
        if (islive == true) return;

        var endtime = new Date(this.getEndTime());
        this.setEndTime(endtime.setSeconds(endtime.getSeconds() + 1));
        this.setStartTime();
        this.doViewData();
    }

    YTTrendChart.prototype.toolbarByNext = function () {
        // console.log("toolbarByNext");
        var islive = this.getIsLive();
        if (islive == true) return;

        var endtime = new Date(this.getEndTime());
        this.setEndTime(endtime.setMinutes(endtime.getMinutes() + 1));
        this.setStartTime();
        this.doViewData();
    }

    YTTrendChart.prototype.toolbarByTimeSelectionClick = function () {
        var islive = this.getIsLive();
        if (islive == true) return;

        var contentID = this.toolbarButtonID("clock-content");
        var datepickerID = this._id + "-toolbar-clock-datepicker";
        var timeHourID = this._id + "-toolbar-clock-time-hh";
        var timeMinID = this._id + "-toolbar-clock-time-mm";
        var timeSecID = this._id + "-toolbar-clock-time-ss";
        var spanDayID = this._id + "-toolbar-clock-timespan-dd";
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
        html += '			<div class="row ">';
        html += '				<div class="col-xs-12">';
        html += '					<input id="' + spanDayID + '" name="value" value="0" class="width-30"> Day  ';
        html += '					<input id="' + spanHourID + '" name="value" value="0" class="width-30"> Hour  ';
        html += '					<input id="' + spanMinID + '" name="value" value="0" class="width-30"> Min  ';
        html += '					<input id="' + spanSecID + '" name="value" value="0" class="width-30"> Sec';
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

        var spanDay = $("#" + spanDayID).spinner({
            spin: function (event, ui) {
                var bufferperiod = view.getFileBuffer().bufferperiod;

                if (ui.value > bufferperiod) {
                    $(this).spinner("value", bufferperiod);
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

        //spantime 기본값 설정
        var timeSpan = this.getTimeSpan();
        spanDay.spinner("value", parseInt(timeSpan / 86400));
        spanHour.spinner("value", parseInt(timeSpan / 3600));
        spanMin.spinner("value", parseInt((timeSpan % 3600) / 60));
        spanSec.spinner("value", parseInt(timeSpan % 60));

        //start time 기본값 설정
        var endTime = new Date(this.getEndTime());
        var startTime = new Date(endTime.setSeconds(endTime.getSeconds() - timeSpan));
        spinHour.spinner("value", startTime.getHours());
        spinMin.spinner("value", startTime.getMinutes());
        spinSec.spinner("value", startTime.getSeconds());

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
            width: 420,
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

                    var tDay = parseInt(spanDay.spinner("value"));
                    var tHour = parseInt(spanHour.spinner("value"));
                    var tMin = parseInt(spanMin.spinner("value"));
                    var tSec = parseInt(spanSec.spinner("value"));
                    var timeSpan = tDay * 86400 + tHour * 3600 + tMin * 60 + tSec;

                    var grid = view.getGrid();
                    var limittime = view.getLimitTime();
                    var majorCount = grid.vcount;
                    var newtimespan = Math.ceil(timeSpan / majorCount) * majorCount;

                    if (newtimespan > limittime)
                        newtimespan = limittime;

                    if (newtimespan != timeSpan) {
                        timeSpan = newtimespan;
                    }
                    view.setTimeSpan(timeSpan);

                    var st = new Date(startTime);
                    var endTime = new Date(st.setSeconds(st.getSeconds() + timeSpan));
                    // console.log("endtime: " + endTime);
                    view.setEndTime(endTime);
                    view.setStartTime();
                    // console.log("startTime: " + startTime);

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
            },
            close: function () {
                $(this).dialog("close");
                $("#" + contentID).html("");
                $("#xisom-modal").html("");
            }
        });
    }

    YTTrendChart.prototype.toolbarByFile = function () {

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

        var filename = "YTTrendChart-" + new Date().format("yyyyMMddHHmmss") + ".csv";
        var blob = new Blob([text], { "type": "application/x-msdownload" });

        this.downloadCanvas(blob, filename);
    }

    YTTrendChart.prototype.toolbarByImage = function () {
        var chart = this.getChart();

        var data = chart.getDataURL({
            pixelRatio: 1,
            backgroundColor: '#fff'
        });

        var filename = "YTTrendChart-" + new Date().format("yyyyMMddHHmmss") + ".png";
        var image_data = atob(data.split(',')[1]);
        var arraybuffer = new ArrayBuffer(image_data.length);
        var view = new Uint8Array(arraybuffer);

        for (var i = 0; i < image_data.length; i++) {
            view[i] = image_data.charCodeAt(i) & 0xff;
        }
        var blob = new Blob([arraybuffer], { type: 'application/x-msdownload' });

        this.downloadCanvas(blob, filename);
    }

    YTTrendChart.prototype.downloadCanvas = function (blob, filename) {

        var link = document.createElement('a');
        link.setAttribute("download", filename);
        link.href = URL.createObjectURL(blob);

        // IE, Edge
        if (window.navigator.msSaveBlob) {
            // console.log('IE, Edge');
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        //Chrome
        else {
            // console.log('Chrome');
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, true);
            link.dispatchEvent(evt);
        }
    }

    YTTrendChart.prototype.ResetGrid = function () {
        // console.log("ResetGrid");
        var view = this;
        // Adjust grid count when zoom happen
        var oXFormat = this.getXaxis();
        var timespan = view.getTimeSpan();
        // over 1 day => show day
        if (timespan > 86400) {
            oXFormat.format.format = "yyyy/MM/dd HH:mm:ss";
        }
        else {
            oXFormat.format.format = "HH:mm:ss";
        }
    }

    YTTrendChart.prototype.ZoomXProcessing = function (evt) {
        //console.log("ZoomXProcessing");
        var view = this;
        var y = evt.deltaY;
        if (y > 0) { // zoom int
            view.toolbarByXZoomIn();
        }
        else { // zoom out
            view.toolbarByXZoomOut();
        }
    }

    YTTrendChart.prototype.ZoomYProcessing = function (evt) {
        // console.log("ZoomYProcessing");
        var view = this;
        var y = evt.deltaY;
        if (y > 0) { // zoom int
            view.toolbarByYZoomIn();
        }
        else { // zoom out
            view.toolbarByYZoomOut();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// CHART UPDATE DATA 
    ////////////////////////////////////////////////////////////////////////////////
    //xaxis data
    YTTrendChart.prototype.xAxisDataByValue = function (xValue) {
        return xValue;
    }

    //series data
    YTTrendChart.prototype.seriesDataByValue = function (yValue) {
        var oSeries = this.getSeries();
        var seriesCount = oSeries.length;
        var data = [];
        for (var i = 0; i < seriesCount; i++) {
            var s = oSeries[i];
            ////// console.log("Series Data: " + i + " ", s);

            if (s.tag === "" || s.tag === "None") continue;
            if (!s) continue;
            // if (s.visible == false) continue;

            var name = this.optionSeriesName(s);
            var axisindex = 0;
            if (s.axisExtra == "Y2Axis") {
                axisindex = 1;
            }
            else if (s.axisExtra == "Y3Axis") {
                axisindex = 2;
            }
            else if (s.axisExtra == "Y4Axis") {
                axisindex = 3;
            }
            var item = {
                yAxisIndex: axisindex,
                name: name,
                smooth: false,
                encode: {
                    x: 'TimeStamp',
                    y: name
                },
            };
            data.push(item);
        }

        var y1targetline = this.optionTargetLine("Y1Axis");
        if (y1targetline.data.length > 0) {
            var item = {
                //name: 'TargetLineY1',
                type: 'line',
                yAxisIndex: 0,
                show: false,
                data: [],
                markLine: y1targetline
            }
            data.push(item);
        }

        var y2targetline = this.optionTargetLine("Y2Axis");
        if (y2targetline.data.length > 0) {
            var item = {
                //name: 'TargetLineY2',
                type: 'line',
                yAxisIndex: 1,
                show: false,
                data: [],
                markLine: y2targetline
            }
            data.push(item);
        }

        var y3targetline = this.optionTargetLine("Y3Axis");
        if (y3targetline.data.length > 0) {
            var item = {
                //name: 'TargetLineY3',
                type: 'line',
                yAxisIndex: 2,
                show: false,
                data: [],
                markLine: y3targetline
            }
            data.push(item);
        }

        var y4targetline = this.optionTargetLine("Y4Axis");
        if (y4targetline.data.length > 0) {
            var item = {
                //name: 'TargetLineY4',
                type: 'line',
                yAxisIndex: 3,
                show: false,
                data: [],
                markLine: y4targetline
            }
            data.push(item);
        }

        return data;
    }

    // get target line that belong to YAxis
    YTTrendChart.prototype.optionTargetLine = function (axis) {
        //var axis = 'YAxis';
        var targetline = this.getTargetLine();
        var markline = {
            symbol: ['none', 'none'],
            data: []
        };

        var line1 = targetline.targetline1;
        if (line1.axis == axis && line1.visible == true) {
            var item = {
                name: line1.name,
                yAxis: line1.value,
                lineStyle: {
                    normal: {
                        type: line1.style.toLowerCase(),
                        color: this.optionColor(line1.color),
                        width: line1.width
                    }
                },
                label: {
                    normal: {
                        color: 'black',
                        lineHeight: 0,
                        show: true,
                        position: this.TargetLineNamePosition(line1.namepos),
                        formatter: "{b}",
                        distance: [2, 8],
                    }
                }
            }
            markline.data.push(item);
        }
        var line2 = targetline.targetline2;
        if (line2.axis == axis && line2.visible == true) {
            var item = {
                name: line2.name,
                yAxis: line2.value,
                lineStyle: {
                    normal: {
                        type: line2.style.toLowerCase(),
                        color: this.optionColor(line2.color),
                        width: line2.width
                    }
                },
                label: {
                    normal: {
                        color: 'Black',
                        lineHeight: 0,
                        show: true,
                        position: this.TargetLineNamePosition(line2.namepos),
                        formatter: "{b}",
                        distance: [2, 8]
                    }
                }
            }
            markline.data.push(item);
        }
        var line3 = targetline.targetline3;
        if (line3.axis == axis && line3.visible == true) {
            var item = {
                name: line3.name,
                yAxis: line3.value,
                lineStyle: {
                    normal: {
                        type: line3.style.toLowerCase(),
                        color: this.optionColor(line3.color),
                        width: line3.width
                    }
                },
                label: {
                    normal: {
                        color: 'Black',
                        lineHeight: 0,
                        show: true,
                        position: this.TargetLineNamePosition(line3.namepos),
                        formatter: "{b}",
                        distance: [2, 8]
                    }
                }
            }
            markline.data.push(item);
        }
        var line4 = targetline.targetline4;
        if (line4.axis == axis && line4.visible == true) {
            var item = {
                name: line4.name,
                yAxis: line4.value,
                lineStyle: {
                    normal: {
                        type: line4.style.toLowerCase(),
                        color: this.optionColor(line4.color),
                        width: line4.width
                    }
                },
                label: {
                    normal: {
                        color: 'Black',
                        lineHeight: 0,
                        show: true,
                        position: this.TargetLineNamePosition(line4.namepos),
                        formatter: "{b}",
                        distance: [2, 8]
                    },

                }
            }
            markline.data.push(item);
        }
        return markline;
    }

    YTTrendChart.prototype.TargetLineNamePosition = function (pos) {
        if (pos == "Start") return "insideStartBottom";
        else if (pos == "Middle") return "insideMiddleBottom";
        else if (pos == "End") return "insideEndBottom";
    }

    YTTrendChart.prototype.drawChart = function () {
        var chart = this.getChart();
        // update data
        var data = this.getViewData();
        // update series data
        var seriesData = this.seriesDataByValue();
        // adjust gridview
        var oXaxis = this.getXaxis();
        var majorCount = oXaxis.majorGrid.count;
        var optionXaxis = this.optionXaxis();
        if (timespan <= 10) {
            optionXaxis.interval = 1000;
        }
        else {
            var timespan = this.getTimeSpan();
            optionXaxis.axisLabel.interval = Math.round(timespan / majorCount);
        }

        this.showLoading(chart);
        chart.setOption({
            xAxis: optionXaxis,
            dataset: {
                source: data.items,
                dimensions: data.names
            },
            series: seriesData
        });
        this.hideLoading(chart);
    }

    YTTrendChart.prototype.showLoading = function (chart) {
        var isLive = this.getIsLive();
        if (isLive == false) {
            chart.showLoading();
        }
    }

    YTTrendChart.prototype.hideLoading = function (chart) {
        var isLive = this.getIsLive();
        if (isLive == false) {
            chart.hideLoading();
        }
    }
    //set x-y value 
    YTTrendChart.prototype.setValueByViewData = function (data) {
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
        this.drawChart();
    }
    //get view-data
    YTTrendChart.prototype.doViewData = function () {
        var isLive = this.getIsLive();
        if (isLive) {
            this.doViewDataByLive();
        } else {
            this.doViewDataByTrend();
        }
    }
    //get live view-data
    YTTrendChart.prototype.doViewDataByLive = function () {
        //return;
        if (this.getIsLive() == false) return;
        var view = this;

        var limitPoint = this.getLimitPoint();
        var reqTime = this.getRefreshTime();
        var timeSpan = this.getTimeSpan();
        var timeStamp = this.getStartTime();
        var oSeries = this.getSeries();
        var oTags = [];

        for (var i = 0; i < oSeries.length; i++) {
            var element = oSeries[i];
            if (element.tag === "" || element.tag === "None") continue;
            oTags.push(element.tag);
        }
        // oSeries.forEach(element => {
        //     oTags.push(element.tag);
        // });

        var params = {
            timeStamp: timeStamp,
            timeSpan: timeSpan,
            tags: oTags
        }
        // console.log("params: ", params);
        // console.log("reqTime: " + reqTime);
        // console.log("timeSpan: " + timeSpan);
        // console.log("timeStamp: " + timeStamp);

        // console.log("this.TimeoutID: " + this.TimeoutID);
        //clearTimeout(this.TimeoutID);

        scada.getViewLiveDataYTChart(view.pid, view.id, params, function (data) {
            if (data != null) {
                // console.log("BEFORE view.items: ", data.items);

                view.addDummyDataLive(data, params.timeStamp);

                // console.log("Live view.items: ", data.items);
                view.setValueByViewData(data);
                // console.log("Live view.items: ", data.items);
            }
            this.TimeoutID = setTimeout(function () {
                view.doViewDataByLive();
            }, reqTime);
        }, limitPoint);
    }

    // Add dummy data which selected from file buffer
    YTTrendChart.prototype.addDummyDataLive = function (data, timestart) {
        //// console.log("addDummyDataLive");

        // // console.log("Input data: " , data);

        var datalength = data.items.length;
        // // console.log("datalength: " + datalength);
        if (datalength <= 0) return;

        var timespan = this.getTimeSpan();
        // var starttime = new Date(timestart);
        // // console.log("startTime: " + starttime.toISOString());

        // var endtime = new Date(starttime.setSeconds(starttime.getSeconds() + this.getTimeSpan()));;
        // // console.log("endTime: " + endtime.toISOString());

        // // console.log("data.items: ", data.items );
        // // console.log("data.items: ", data.items[0] );

        var firsttime = new Date(data.items[0][0]);
        // var lasttime = new Date(data.items[datalength - 1][0]);
        var lasttimetmp = new Date(data.items[datalength - 1][0]);
        var realstarttime = new Date(lasttimetmp.setSeconds(lasttimetmp.getSeconds() - timespan));

        // // console.log("firsttime: " + firsttime.toISOString());
        // // console.log("lasttime: " + lasttime.toISOString());
        // // console.log("realstarttime: " + realstarttime.toISOString());

        var namelength = data.names.length;
        // console.log("namelength: " + namelength);

        var startdifftime = firsttime.getTime() - realstarttime.getTime();
        // console.log("START difftime: " + startdifftime);
        // console.log("firsttime.getTime(): " + firsttime.getTime());
        // console.log("realstarttime.getTime(): " + realstarttime.getTime());

        // console.log("firsttime.getSeconds(): " + firsttime.getSeconds());
        // console.log("realstarttime.getSeconds(): " + realstarttime.getSeconds());

        if (startdifftime > 100) {
            // console.log("Add data StartTime");
            var ts = ((new Date(realstarttime)).toISOString());
            var val = []
            for (var i = 1; i < namelength; i++) {
                val.push(NaN);
            }

            val.unshift(ts);

            // ts.concat(val);
            // // console.log("val: ", val);
            // // console.log("ts: ", ts);

            data.items.unshift(val);
        }
        // else{
        // console.log("==================>Not ADD NAN");
        // }

    }

    YTTrendChart.prototype.addDummyDataTrend = function (data) {
        //// console.log("addDummyData");
        // // console.log("Input data: " , data);

        var datalength = data.items.length;
        // // console.log("datalength: " + datalength);

        if (datalength <= 0) return;

        var starttime = this.getStartTime();
        var endtime = this.getEndTime();

        // // console.log("starttime: " + starttime.toISOString());
        // // console.log("endtime: " + endtime.toISOString());
        // // console.log("data.items: ", data.items );
        // // console.log("data.items: ", data.items[0] );

        var firsttime = new Date(data.items[0][0]);
        var lasttime = new Date(data.items[datalength - 1][0]);
        // // console.log("firsttime: " + firsttime.toISOString());
        // // console.log("lasttime: " + lasttime.toISOString());

        var namelength = data.names.length;
        // // console.log("namelength: " + namelength);

        var enddifftime = endtime.getTime() - lasttime.getTime();
        // // console.log("END difftime: " + enddifftime);

        if (enddifftime > 990 && (endtime.getSeconds() != lasttime.getSeconds())) {
            // // console.log("Add data EndTime");
            var ts = ((new Date(endtime)).toISOString());
            var val = []
            for (var i = 1; i < namelength; i++) {
                val.push(NaN);
            }
            // ts.concat(val);
            val.unshift(ts);
            // // console.log("val: ", val);
            // // console.log("ts: ", ts);

            data.items.push(val);
        }

        var startdifftime = firsttime.getTime() - starttime.getTime();
        // // console.log("START difftime: " + startdifftime);
        // // console.log("firsttime.getSeconds(): " + firsttime.getSeconds());
        // // console.log("starttime.getSeconds(): " + starttime.getSeconds());

        if (startdifftime > 990 && firsttime.getSeconds() != starttime.getSeconds()) {
            // // console.log("Add data StartTime");
            var ts = ((new Date(starttime)).toISOString());
            var val = []
            for (var i = 1; i < namelength; i++) {
                val.push(NaN);
            }
            val.unshift(ts);

            // ts.concat(val);
            // // console.log("val: ", val);
            // // console.log("ts: ", ts);

            data.items.unshift(val);
        }
    }

    //get trend view-data
    YTTrendChart.prototype.doViewDataByTrend = function () {
        //// console.log("doViewDataByTrend");
        if (this.getIsLive() == true) return;
        var view = this;

        var timeSpan = this.getTimeSpan();
        var endtime = new Date(this.getEndTime());
        var timeStamp = new Date(endtime.setSeconds(endtime.getSeconds() - this.getTimeSpan()));
        var oSeries = this.getSeries();
        var oTags = [];

        for (var i = 0; i < oSeries.length; i++) {
            var element = oSeries[i];
            if (element.tag === "" || element.tag === "None") continue;
            oTags.push(element.tag);
        }
        var params = {
            timeStamp: timeStamp,
            timeSpan: timeSpan,
            tags: oTags
        }

        // console.log("params", params);
        scada.getViewYTTrendData(this.pid, this._id, params, function (data) {
            if (data == null) return;

            view.addDummyDataTrend(data);

            // console.log("TREND data.items: ", data.items);
            view.setValueByViewData(data);
        }, this.reqLimitPoint);
    }


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// IMPORT  SETTING
    ////////////////////////////////////////////////////////////////////////////////
    YTTrendChart.prototype.clickElem = function (elem) {
        // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
        var eventMouse = document.createEvent("MouseEvents")
        eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        elem.dispatchEvent(eventMouse)
    }
    YTTrendChart.prototype.ImportSettingPress = function (func) {
        var view = this;
        readFile = function (e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var contents = e.target.result;
                fileInput.func(contents, view)
                document.body.removeChild(fileInput)
            }
            reader.readAsText(file)
        }
        fileInput = document.createElement("input")
        fileInput.type = 'file'
        fileInput.style.display = 'none'
        fileInput.onchange = readFile
        fileInput.func = func
        document.body.appendChild(fileInput)
        view.clickElem(fileInput)
    }
    // Import a xml file which is selected by user. This function use in case of user press button to select file
    YTTrendChart.prototype.ImportSettingOperation = function (contents, view) {
        // console.log(contents);

        if (window.DOMParser) {
            // code for modern browsers
            var parser = new DOMParser();
            json = parser.parseFromString(contents, "text/xml");
        } else {
            // code for old IE browsers
            // console.log("IE Browser");
            // json = new ActiveXObject("Microsoft.XMLDOM");
            // json.async = false;
            // json.loadXML(contents);
        }

        var setting = json.getElementsByTagName("yTTrendChart")[0];

        var appearance = setting.getElementsByTagName("appearance")[0];
        view.importAppearance({
            "@BackGroundColor": appearance.getAttribute("BackGroundColor"),
            "@AreaColor": appearance.getAttribute("AreaColor"),
            "@BorderStyle": appearance.getAttribute("BorderStyle")
        });

        var title = setting.getElementsByTagName("title")[0];
        view.importTitle({
            "@TitleName": title.getAttribute("TitleName"),
            "@Font": title.getAttribute("Font"),
            "@Color": title.getAttribute("Color"),
            "@Width": title.getAttribute("Width"),
            "@Height": title.getAttribute("Height")
        });

        var legend = setting.getElementsByTagName("legend")[0];
        view.importLegend({
            "@BackgroundColor": legend.getAttribute("BackgroundColor"),
            "@TextColor": legend.getAttribute("TextColor"),
            "@Position": legend.getAttribute("Position"),
            "@Visible": legend.getAttribute("Visible"),
            "@Width": legend.getAttribute("Width"),
            "@Height": legend.getAttribute("Height")
        });

        var grid = setting.getElementsByTagName("grid")[0];
        view.importGrid({
            "@HorizontalColor": grid.getAttribute("HorizontalColor"),
            "@VerticalColor": grid.getAttribute("VerticalColor"),
            "@HorizontalCount": grid.getAttribute("HorizontalCount"),
            "@VerticalCount": grid.getAttribute("VerticalCount"),
            "@HorizontalVisible": grid.getAttribute("HorizontalVisible"),
            "@VerticalVisible": grid.getAttribute("VerticalVisible")
        });

        var xaxis = setting.getElementsByTagName("xAxis")[0];
        view.importXAxis({
            "@Title": xaxis.getAttribute("Title"),
            "@TitleFont": xaxis.getAttribute("TitleFont"),
            "@TitleColor": xaxis.getAttribute("TitleColor"),
            "@AxisColor": xaxis.getAttribute("AxisColor"),
            "@LabelColor": xaxis.getAttribute("LabelColor"),
            "@LabelFont": xaxis.getAttribute("LabelFont"),
            "@IsReversed": xaxis.getAttribute("IsReversed")
        });

        var y1axis = setting.getElementsByTagName("y1Axis")[0];
        view.importY1Axis({
            "@Title": y1axis.getAttribute("Title"),
            "@TitleFont": y1axis.getAttribute("TitleFont"),
            "@TitleColor": y1axis.getAttribute("TitleColor"),
            "@AxisColor": y1axis.getAttribute("AxisColor"),
            "@LabelColor": y1axis.getAttribute("LabelColor"),
            "@LabelFont": y1axis.getAttribute("LabelFont"),
            "@Max": y1axis.getAttribute("Max"),
            "@Min": y1axis.getAttribute("Min"),
            "@Position": y1axis.getAttribute("Position"),
            "@Formatter": y1axis.getAttribute("Formatter")
        });

        var y2axis = setting.getElementsByTagName("y2Axis")[0];
        view.importY2Axis({
            "@Title": y2axis.getAttribute("Title"),
            "@TitleFont": y2axis.getAttribute("TitleFont"),
            "@TitleColor": y2axis.getAttribute("TitleColor"),
            "@AxisColor": y2axis.getAttribute("AxisColor"),
            "@LabelColor": y2axis.getAttribute("LabelColor"),
            "@LabelFont": y2axis.getAttribute("LabelFont"),
            "@Max": y2axis.getAttribute("Max"),
            "@Min": y2axis.getAttribute("Min"),
            "@Position": y2axis.getAttribute("Position"),
            "@Visible": y2axis.getAttribute("Visible"),
            "@Formatter": y2axis.getAttribute("Formatter")
        });

        var y3axis = setting.getElementsByTagName("y3Axis")[0];
        view.importY3Axis({
            "@Title": y3axis.getAttribute("Title"),
            "@TitleFont": y3axis.getAttribute("TitleFont"),
            "@TitleColor": y3axis.getAttribute("TitleColor"),
            "@AxisColor": y3axis.getAttribute("AxisColor"),
            "@LabelColor": y3axis.getAttribute("LabelColor"),
            "@LabelFont": y3axis.getAttribute("LabelFont"),
            "@Max": y3axis.getAttribute("Max"),
            "@Min": y3axis.getAttribute("Min"),
            "@Position": y3axis.getAttribute("Position"),
            "@Visible": y3axis.getAttribute("Visible"),
            "@Formatter": y3axis.getAttribute("Formatter")
        });

        var y4axis = setting.getElementsByTagName("y4Axis")[0];
        view.importY4Axis({
            "@Title": y4axis.getAttribute("Title"),
            "@TitleFont": y4axis.getAttribute("TitleFont"),
            "@TitleColor": y4axis.getAttribute("TitleColor"),
            "@AxisColor": y4axis.getAttribute("AxisColor"),
            "@LabelColor": y4axis.getAttribute("LabelColor"),
            "@LabelFont": y4axis.getAttribute("LabelFont"),
            "@Max": y4axis.getAttribute("Max"),
            "@Min": y4axis.getAttribute("Min"),
            "@Position": y4axis.getAttribute("Position"),
            "@Visible": y4axis.getAttribute("Visible"),
            "@Formatter": y4axis.getAttribute("Formatter")
        });

        var targetline = setting.getElementsByTagName("targetLine")[0];
        var line1 = targetline.getElementsByTagName("stripLine1")[0];
        var line2 = targetline.getElementsByTagName("stripLine2")[0];
        var line3 = targetline.getElementsByTagName("stripLine3")[0];
        var line4 = targetline.getElementsByTagName("stripLine4")[0];
        view.importTargetLine({
            "stripLine1": {
                "@StripLineName": line1.getAttribute("StripLineName"),
                "@NamePosition": line1.getAttribute("NamePosition"),
                "@Color": line1.getAttribute("Color"),
                "@Width": line1.getAttribute("Width"),
                "@DashStyle": line1.getAttribute("DashStyle"),
                "@Value": line1.getAttribute("Value"),
                "@Visible": line1.getAttribute("Visible"),
                "@YAxis": line1.getAttribute("YAxis")
            },
            "stripLine2": {
                "@StripLineName": line2.getAttribute("StripLineName"),
                "@NamePosition": line2.getAttribute("NamePosition"),
                "@Color": line2.getAttribute("Color"),
                "@Width": line2.getAttribute("Width"),
                "@DashStyle": line2.getAttribute("DashStyle"),
                "@Value": line2.getAttribute("Value"),
                "@Visible": line2.getAttribute("Visible"),
                "@YAxis": line2.getAttribute("YAxis")
            },
            "stripLine3": {
                "@StripLineName": line3.getAttribute("StripLineName"),
                "@NamePosition": line3.getAttribute("NamePosition"),
                "@Color": line3.getAttribute("Color"),
                "@Width": line3.getAttribute("Width"),
                "@DashStyle": line3.getAttribute("DashStyle"),
                "@Value": line3.getAttribute("Value"),
                "@Visible": line3.getAttribute("Visible"),
                "@YAxis": line3.getAttribute("YAxis")
            },
            "stripLine4": {
                "@StripLineName": line4.getAttribute("StripLineName"),
                "@NamePosition": line4.getAttribute("NamePosition"),
                "@Color": line4.getAttribute("Color"),
                "@Width": line4.getAttribute("Width"),
                "@DashStyle": line4.getAttribute("DashStyle"),
                "@Value": line4.getAttribute("Value"),
                "@Visible": line4.getAttribute("Visible"),
                "@YAxis": line4.getAttribute("YAxis")
            }
        });

        var serieslist = setting.getElementsByTagName("seriesList")[0];
        var seriesJson = { "@SeriesCounter": serieslist.getAttribute("SeriesCounter") };
        var childLength = serieslist.childNodes.length;
        for (var i = 0; i < childLength; i++) {
            var item = serieslist.childNodes[i];
            if (item.nodeName === "#text") continue;
            var seriesItem = serieslist.getElementsByTagName(item.nodeName)[0];
            var item = {
                "@Name": seriesItem.getAttribute("Name"),
                "@Visible": seriesItem.getAttribute("Visible"),
                "@AxisExtra": seriesItem.getAttribute("AxisExtra"),
                "@Color": seriesItem.getAttribute("Color"),
                "@Width": seriesItem.getAttribute("Width"),
                "@Tag": seriesItem.getAttribute("Tag"),
                "@Type": seriesItem.getAttribute("Type"),
                "@MarkerStyle": seriesItem.getAttribute("MarkerStyle"),
                "@MarkerSize": seriesItem.getAttribute("MarkerSize")
            };
            var seriesname = seriesItem.getAttribute("Name");
            var nodename = seriesname[0].toLowerCase() + seriesname.substring(1);
            seriesJson[nodename] = item;
        }
        view.importSeries(seriesJson);
        view.reInitChart();
        view.series.validate();
        var isLive = view.getIsLive();
        if (isLive == false) {
            view.doViewDataByTrend();
        }
    }

    //import a setting xml from server (Note: This function only input name of xml file)
    YTTrendChart.prototype.importSettingOperation = function (name) {
        // console.log("importSetting");
        var view = this;

        scada.getYTTrendChartXML(name, function (data) {
            if (data == null) return;
            // console.log("import data: ", data);

            var obj = JSON.parse(data);
            var setting = obj.yTTrendChart;
            view.importAppearance(setting.appearance);
            view.importTitle(setting.title);
            view.importLegend(setting.legend);
            view.importGrid(setting.grid);
            // view.importFileBuffer(setting.filebuffer);

            view.importXAxis(setting.xAxis);
            view.importY1Axis(setting.y1Axis);
            view.importY2Axis(setting.y2Axis);
            view.importY3Axis(setting.y3Axis);
            view.importY4Axis(setting.y4Axis);

            // importTooltip(setting.tooltip);
            view.importTargetLine(setting.targetLine);
            view.importSeries(setting.seriesList);

            // console.log("getYTTrendChartXML: ", setting.appearance['@AreaColor']);
            // console.log("view.title", view.title);
            // console.log("setting.title", setting.title);
            // console.log(this);
            // console.log(view);
            view.reInitChart();
            view.series.validate();
            var isLive = view.getIsLive();
            if (isLive == false) {
                view.doViewDataByTrend();
            }
        });
    }
    // Format font from string to json
    YTTrendChart.prototype.FormatFont = function (setting) {
        var font = {};
        font.bold = false;
        font.underline = false;
        font.strikeout = false;
        font.italic = false;

        var index = setting.indexOf(',');
        var remainstr = setting.substring(0);

        var fontname = remainstr.substring(0, index);
        // console.log("remainstr: " + remainstr);
        // console.log("index: " + index);
        // console.log("fontname: " + fontname);
        font.name = fontname;

        remainstr = remainstr.substring(index + 2);
        if (remainstr.length > 0) {
            index = remainstr.indexOf(',');
            if (index < 0) {
                var fontsize = parseInt(remainstr.substring(0));
                // console.log("=============> remainstr: " + remainstr);
                // console.log("index < 0: " + index);
                // console.log("fontsize: " + fontsize);
                font.size = parseInt(fontsize);
                // console.log("font: ", font);
                return font;
            } else {

                var fontsize = parseInt(remainstr.substring(0, index));
                font.size = parseInt(fontsize);
                // console.log("fontsize: " + fontsize);
            }

            remainstr = remainstr.substring(index + 2);
            // console.log("index: " + index);
            // console.log("remainstr END:" + remainstr);
            // console.log("remainstr.len:" + remainstr.length);           

            if (remainstr.length > 0) {
                var styles = remainstr.split('=')[1].split(',');
                for (var i = 0; i < styles.length; i++) {
                    var element = styles[i];
                    switch (element) {
                        case "Bold": font.bold = true; break;
                        case "Underline": font.underline = true; break;
                        case "Strikeout": font.strikeout = true; break;
                        case "Italic": font.Italic = true; break;
                    }
                }
            }
        }
        // console.log("font: ", font);
        return font;
    }
    YTTrendChart.prototype.importAppearance = function (setting) {
        console.log("importAppearance ", setting['@BackGroundColor']);
        var view = this;
        view.ytappearance.backgroundColor = setting['@BackGroundColor'];
        view.ytappearance.foregroundColor = setting['@AreaColor'];
        view.ytappearance.borderStyle = setting['@BorderStyle'];
    }
    YTTrendChart.prototype.importTitle = function (setting) {
        // console.log("importTitle");
        var view = this;

        view.yttitle.text = setting["@TitleName"];
        view.yttitle.font = view.FormatFont(setting["@Font"]);
        view.yttitle.textColor = setting["@Color"];
        view.yttitle.height = parseInt(setting["@Height"]);
        view.yttitle.width = parseInt(setting["@Width"]);
        // console.log(view.title);
    }
    YTTrendChart.prototype.importLegend = function (setting) {
        // console.log("importLegend");
        var view = this;
        view.ytlegend.textColor = setting["@TextColor"];
        view.ytlegend.position = setting["@Position"];
        view.ytlegend.visible = setting["@Visible"] === "true" ? true : false;
        view.ytlegend.height = parseInt(setting["@Height"]);
        view.ytlegend.width = parseInt(setting["@Width"]);
        // console.log(view.legend);
    }
    YTTrendChart.prototype.importGrid = function (setting) {
        // console.log("importGrid");
        var view = this;

        view.ytgrid.vcount = parseInt(setting["@VerticalCount"]);
        view.ytgrid.vcolor = setting["@VerticalColor"];
        view.ytgrid.vvisible = setting["@VerticalVisible"] === "true" ? true : false;

        view.ytgrid.hcount = parseInt(setting["@HorizontalCount"]);
        view.ytgrid.hcolor = setting["@HorizontalColor"];
        view.ytgrid.hvisible = setting["@HorizontalVisible"] === "true" ? true : false;

        // console.log(view.grid);
    }
    YTTrendChart.prototype.importFileBuffer = function (setting) {
        // console.log("importFileBuffer");
        var view = this;
    }
    YTTrendChart.prototype.importXAxis = function (setting) {
        // console.log("importXAxis");
        var view = this;
        view.ytxaxis.title.text = setting["@Title"];
        view.ytxaxis.title.font = view.FormatFont(setting["@TitleFont"]);
        view.ytxaxis.title.textColor = setting["@TitleColor"];
        view.ytxaxis.line.lineColor = setting["@AxisColor"];
        view.ytxaxis.label.textColor = setting["@LabelColor"];
        view.ytxaxis.label.font = view.FormatFont(setting["@LabelFont"]);
        view.ytxaxis.isReversed = setting["@IsReversed"] == "true" ? true : false;

        // console.log(view.xaxis);
    }
    YTTrendChart.prototype.importY1Axis = function (setting) {
        // console.log("importY1Axis");
        var view = this;

        view.yty1axis.title.text = setting["@Title"];
        view.yty1axis.title.font = view.FormatFont(setting["@TitleFont"]);
        view.yty1axis.title.textColor = setting["@TitleColor"];
        view.yty1axis.line.lineColor = setting["@AxisColor"];
        view.yty1axis.label.textColor = setting["@LabelColor"];
        view.yty1axis.label.font = view.FormatFont(setting["@LabelFont"]);
        view.yty1axis.maxValue = parseFloat(setting["@Max"]);
        view.yty1axis.minValue = parseFloat(setting["@Min"]);
        view.yty1axis.position = setting["@Position"];
        view.yty1axis.format.format = setting["@Formatter"];

        // console.log(view.y1axis);
    }
    YTTrendChart.prototype.importY2Axis = function (setting) {
        // console.log("importY2Axis");
        var view = this;
        view.yty2axis.title.text = setting["@Title"];
        view.yty2axis.title.font = view.FormatFont(setting["@TitleFont"]);
        view.yty2axis.title.textColor = setting["@TitleColor"];
        view.yty2axis.line.lineColor = setting["@AxisColor"];
        view.yty2axis.label.textColor = setting["@LabelColor"];
        view.yty2axis.label.font = view.FormatFont(setting["@LabelFont"]);
        view.yty2axis.maxValue = parseFloat(setting["@Max"]);
        view.yty2axis.minValue = parseFloat(setting["@Min"]);
        view.yty2axis.position = setting["@Position"];
        view.yty2axis.visible = setting["@Visible"] == "true" ? true : false;
        view.yty2axis.format.format = setting["@Formatter"];

        // console.log(view.y2axis);
    }
    YTTrendChart.prototype.importY3Axis = function (setting) {
        // console.log("importY3Axis");
        var view = this;
        view.yty3axis.title.text = setting["@Title"];
        view.yty3axis.title.font = view.FormatFont(setting["@TitleFont"]);
        view.yty3axis.title.textColor = setting["@TitleColor"];
        view.yty3axis.line.lineColor = setting["@AxisColor"];
        view.yty3axis.label.textColor = setting["@LabelColor"];
        view.yty3axis.label.font = view.FormatFont(setting["@LabelFont"]);
        view.yty3axis.maxValue = parseFloat(setting["@Max"]);
        view.yty3axis.minValue = parseFloat(setting["@Min"]);
        view.yty3axis.position = setting["@Position"];
        view.yty3axis.visible = setting["@Visible"] == "true" ? true : false;
        view.yty3axis.format.format = setting["@Formatter"];

        // console.log(view.y3axis);
    }
    YTTrendChart.prototype.importY4Axis = function (setting) {
        // console.log("importY4Axis");
        var view = this;
        view.yty4axis.title.text = setting["@Title"];
        view.yty4axis.title.font = view.FormatFont(setting["@TitleFont"]);
        view.yty4axis.title.textColor = setting["@TitleColor"];
        view.yty4axis.line.lineColor = setting["@AxisColor"];
        view.yty4axis.label.textColor = setting["@LabelColor"];
        view.yty4axis.label.font = view.FormatFont(setting["@LabelFont"]);
        view.yty4axis.maxValue = parseFloat(setting["@Max"]);
        view.yty4axis.minValue = parseFloat(setting["@Min"]);
        view.yty4axis.position = setting["@Position"];
        view.yty4axis.visible = setting["@Visible"] == "true" ? true : false;
        view.yty4axis.format.format = setting["@Formatter"];

        // console.log(view.y4axis);
    }
    YTTrendChart.prototype.importTooltip = function (setting) {
        // console.log("importTooltip");
        // var view = this;
    }
    YTTrendChart.prototype.importTargetLine = function (setting) {
        // console.log("importTargetLine");
        var view = this;

        view.yttargetline.targetline1 = TargetLineFormat(setting.stripLine1);
        view.yttargetline.targetline2 = TargetLineFormat(setting.stripLine2);
        view.yttargetline.targetline3 = TargetLineFormat(setting.stripLine3);
        view.yttargetline.targetline4 = TargetLineFormat(setting.stripLine4);
        function TargetLineFormat(config) {
            return {
                axis: config["@YAxis"],
                color: config["@Color"],
                name: config["@StripLineName"],
                namepos: config["@NamePosition"] == "Near" ? "Start" : config["@NamePosition"] == "Center" ? "Middle" : "End",
                style: config["@DashStyle"],
                value: parseInt(config["@Value"]),
                width: parseInt(config["@Width"]),
                visible: config["@Visible"] == "true" ? true : false
            };
        };

        // console.log(view.targetline);
    }
    YTTrendChart.prototype.importSeries = function (setting) {
        // console.log("importSeries" , setting);
        var view = this;

        var listname = [];
        for (var element in setting) {
            listname.push(element);
        }

        var buffertags = view.getFileBuffer().tags;
        function VerifyTag(tagname) {
            for (var idx in buffertags) {
                var tag = buffertags[idx];
                if (tagname === tag.name) {
                    return tagname;
                }
            }
            return "None";
        }

        view.ytseries = [];
        for (var i = 1; i < listname.length; i++) {
            view.ytseries.push(SeriesFormat(setting[listname[i]]));
        }
        function SeriesFormat(config) {
            return {
                color: config["@Color"],
                label: {
                    font: {
                        name: "Tahoma",
                        size: 10,
                        bold: false,
                        italic: false,
                        underline: false
                    },
                    position: "Default",
                    showPercent: false,
                    showValue: false,
                    textColor: "#000000"
                },
                line: {
                    lineColor: config["@Color"],
                    lineStyle: "Solid",
                    lineWidth: parseInt(config["@Width"]),
                    visible: config["@Visible"] == "true" ? true : false
                },
                point: {
                    color: config["@Color"],
                    size: parseInt(config["@MarkerSize"]),
                    visible: true,
                    type: config["@MarkerStyle"]
                },
                opacity: 1,
                tag: VerifyTag(config["@Tag"]),
                axisExtra: config["@AxisExtra"],
                name: config["@Name"],
                text: "",
                width: parseInt(config["@Width"]),
                visible: config["@Visible"] == "true" ? true : false,
                type: config["@Type"]
            };
        }
        // console.log(view.series);
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// EXPORT  SETTING
    ////////////////////////////////////////////////////////////////////////////////
    YTTrendChart.prototype.ExportSettingPress = function () {
        var view = this;
        view.exportSettingOperation("setting.xml");
    }
    YTTrendChart.prototype.exportSettingOperation = function (name) {
        // console.log("exportSetting");
        var view = this;
        var tab = "\t";
        var tab2 = "\t\t";
        var newline = "\r\n";
        var quotes = '"';

        function exportAppearance() {
            var config = view.getAppearance();
            var appearance = '<appearance';
            appearance += ' BackGroundColor=' + quotes + config.backgroundColor + quotes;
            appearance += ' AreaColor=' + quotes + config.foregroundColor + quotes;
            appearance += ' BorderStyle=' + quotes + ((config.borderStyle === "Single") ? "Single" : "None") + quotes;
            appearance += ' />';
            return appearance;
        }
        function exportGrid() {
            var config = view.getGrid();
            var grid = '<grid';
            grid += ' HorizontalColor=' + quotes + config.hcolor + quotes;
            grid += ' VerticalColor=' + quotes + config.vcolor + quotes;
            grid += ' HorizontalCount=' + quotes + config.hcount + quotes;
            grid += ' VerticalCount=' + quotes + config.vcount + quotes;
            grid += ' HorizontalVisible=' + quotes + config.hvisible + quotes;
            grid += ' VerticalVisible=' + quotes + config.vvisible + quotes;
            grid += ' />';
            return grid;
        }
        function exportLegend() {
            var config = view.getLegend();
            var legend = '<legend';
            legend += ' BackgroundColor=' + quotes + 'Transparent' + quotes;
            legend += ' TextColor=' + quotes + config.textColor + quotes;
            legend += ' Position=' + quotes + config.position + quotes;
            legend += ' Visible=' + quotes + config.visible + quotes;
            legend += ' Width=' + quotes + config.width + quotes;
            legend += ' Height=' + quotes + config.height + quotes;
            legend += ' />';
            return legend;
        }
        function exportTitle() {
            var config = view.getTitle();
            var title = '<title';
            title += ' TitleName=' + quotes + config.text + quotes;
            title += ' Font=' + quotes + getFontText(config.font) + quotes;
            title += ' Color=' + quotes + config.textColor + quotes;
            title += ' Width=' + quotes + config.width + quotes;
            title += ' Height=' + quotes + config.height + quotes;
            title += ' />';
            return title;
        }
        function exportTooltip() {
            var config = view.getTooltip();
            var tooltip = '<tooltip';
            tooltip += ' TooltipType=' + quotes + 'Color' + quotes;
            tooltip += ' Visible=' + quotes + 'true' + quotes;
            tooltip += ' />';
            return tooltip;
        }
        function exportTargetLine() {
            var targetline = '<targetLine>' + newline;
            var configs = view.getTargetLine();
            targetline += tab2 + exportTargetItem(1, configs["targetline1"]) + newline;
            targetline += tab2 + exportTargetItem(2, configs["targetline2"]) + newline;
            targetline += tab2 + exportTargetItem(3, configs["targetline3"]) + newline;
            targetline += tab2 + exportTargetItem(4, configs["targetline4"]) + newline;
            targetline += tab + '</targetLine>';

            function exportTargetItem(index, config) {
                var targettitem = '<stripLine' + index;
                targettitem += ' StripLineName=' + quotes + config.name + quotes;
                targettitem += ' NamePosition=' + quotes + NamePositionFormat(config.namepos) + quotes;
                targettitem += ' Color=' + quotes + config.color + quotes;
                targettitem += ' Width=' + quotes + config.width + quotes;
                targettitem += ' DashStyle=' + quotes + config.style + quotes;
                targettitem += ' Value=' + quotes + config.value + quotes;
                targettitem += ' Visible=' + quotes + config.visible + quotes;
                targettitem += ' YAxis=' + quotes + config.axis + quotes;
                targettitem += ' />';
                return targettitem;
            }
            function NamePositionFormat(pos) {
                if (pos == "Start") return "Near";
                else if (pos == "Middle") return "Center";
                else if (pos == "End") return "Far";
                else return "";
            }
            return targetline;
        }
        function exportXAxis() {
            var config = view.getXaxis();
            var ret = '<xAxis';
            ret += ' Title=' + quotes + config.title.text + quotes;
            ret += ' TitleFont=' + quotes + getFontText(config.title.font) + quotes;
            ret += ' TitleColor=' + quotes + config.title.textColor + quotes;
            ret += ' AxisColor=' + quotes + config.line.lineColor + quotes;
            ret += ' LabelColor=' + quotes + config.label.textColor + quotes;
            ret += ' LabelFont=' + quotes + getFontText(config.label.font) + quotes;
            ret += ' IsReversed=' + quotes + config.isReversed + quotes;
            ret += ' />';
            return ret;
        }
        function exportY1Axis() {
            var config = view.getY1axis();
            var ret = '<y1Axis';
            ret += ' Title=' + quotes + config.title.text + quotes;
            ret += ' TitleFont=' + quotes + getFontText(config.title.font) + quotes;
            ret += ' TitleColor=' + quotes + config.title.textColor + quotes;
            ret += ' AxisColor=' + quotes + config.line.lineColor + quotes;
            ret += ' LabelColor=' + quotes + config.label.textColor + quotes;
            ret += ' LabelFont=' + quotes + getFontText(config.label.font) + quotes;
            ret += ' Max=' + quotes + config.maxValue + quotes;
            ret += ' Min=' + quotes + config.minValue + quotes;
            ret += ' Position=' + quotes + config.position + quotes;
            ret += ' Formatter=' + quotes + config.format.format + quotes;
            ret += ' />';
            return ret;
        }
        function exportY2Axis() {
            var config = view.getY2axis();
            var ret = '<y2Axis';
            ret += ' Title=' + quotes + config.title.text + quotes;
            ret += ' TitleFont=' + quotes + getFontText(config.title.font) + quotes;
            ret += ' TitleColor=' + quotes + config.title.textColor + quotes;
            ret += ' AxisColor=' + quotes + config.line.lineColor + quotes;
            ret += ' LabelColor=' + quotes + config.label.textColor + quotes;
            ret += ' LabelFont=' + quotes + getFontText(config.label.font) + quotes;
            ret += ' Max=' + quotes + config.maxValue + quotes;
            ret += ' Min=' + quotes + config.minValue + quotes;
            ret += ' Position=' + quotes + config.position + quotes;
            ret += ' Visible=' + quotes + config.visible + quotes;
            ret += ' Formatter=' + quotes + config.format.format + quotes;
            ret += ' />';
            return ret;
        }
        function exportY3Axis() {
            var config = view.getY3axis();
            var ret = '<y3Axis';
            ret += ' Title=' + quotes + config.title.text + quotes;
            ret += ' TitleFont=' + quotes + getFontText(config.title.font) + quotes;
            ret += ' TitleColor=' + quotes + config.title.textColor + quotes;
            ret += ' AxisColor=' + quotes + config.line.lineColor + quotes;
            ret += ' LabelColor=' + quotes + config.label.textColor + quotes;
            ret += ' LabelFont=' + quotes + getFontText(config.label.font) + quotes;
            ret += ' Max=' + quotes + config.maxValue + quotes;
            ret += ' Min=' + quotes + config.minValue + quotes;
            ret += ' Position=' + quotes + config.position + quotes;
            ret += ' Visible=' + quotes + config.visible + quotes;
            ret += ' Formatter=' + quotes + config.format.format + quotes;
            ret += ' />';
            return ret;
        }
        function exportY4Axis() {
            var config = view.getY4axis();
            var ret = '<y4Axis';
            ret += ' Title=' + quotes + config.title.text + quotes;
            ret += ' TitleFont=' + quotes + getFontText(config.title.font) + quotes;
            ret += ' TitleColor=' + quotes + config.title.textColor + quotes;
            ret += ' AxisColor=' + quotes + config.line.lineColor + quotes;
            ret += ' LabelColor=' + quotes + config.label.textColor + quotes;
            ret += ' LabelFont=' + quotes + getFontText(config.label.font) + quotes;
            ret += ' Max=' + quotes + config.maxValue + quotes;
            ret += ' Min=' + quotes + config.minValue + quotes;
            ret += ' Position=' + quotes + config.position + quotes;
            ret += ' Visible=' + quotes + config.visible + quotes;
            ret += ' Formatter=' + quotes + config.format.format + quotes;
            ret += ' />';
            return ret;
        }
        function exportSeries() {
            var configs = view.getSeries();
            var count = configs.length;
            var ret = '<seriesList SeriesCounter=' + quotes + count + quotes + '>' + newline;
            for (var idx in configs) {
                var conf = configs[idx];
                ret += tab2 + SeriesFormat(conf) + newline;
            }
            ret += tab + '</seriesList>';

            function SeriesFormat(config) {
                //console.log("SeriesFormat: " , config);
                var item = '<';
                item += NameFormat(config.name);
                item += ' Name=' + quotes + config.name + quotes;
                item += ' Visible=' + quotes + config.line.visible + quotes;
                item += ' AxisExtra=' + quotes + config.axisExtra + quotes;
                item += ' Color=' + quotes + config.color + quotes;
                item += ' Width=' + quotes + ((config.line.lineWidth == "undefined") ? config.width : config.line.lineWidth) + quotes;
                item += ' Tag=' + quotes + config.tag + quotes;
                item += ' Type=' + quotes + config.type + quotes;
                item += ' MarkerStyle=' + quotes + config.point.type + quotes;
                item += ' MarkerSize=' + quotes + config.point.size + quotes;
                item += ' />';

                function NameFormat(name) {
                    return name[0].toLowerCase() + name.substring(1);
                }
                return item;
            }
            return ret;
        }
        function getFontText(font) {
            var ret = font.name + ', ';
            ret += font.size + 'pt';

            var style = ((font.bold == true) ? "Bold" : "");
            style += ((font.italic == true) ? "Italic" : "");
            style += ((font.underline == true) ? "Underline" : "");
            if (style.length > 0) {
                ret += ', style=' + style;
            }

            return ret;
        }

        var setting = '<?xml version="1.0" encoding="utf-8"?>' + newline;
        setting += '<yTTrendChart>' + newline;
        setting += tab + exportAppearance() + newline;
        setting += tab + exportGrid() + newline;
        setting += tab + exportLegend() + newline;
        setting += tab + exportTitle() + newline;
        setting += tab + exportTooltip() + newline;
        setting += tab + exportTargetLine() + newline;
        setting += tab + exportXAxis() + newline;
        setting += tab + exportY1Axis() + newline;
        setting += tab + exportY2Axis() + newline;
        setting += tab + exportY3Axis() + newline;
        setting += tab + exportY4Axis() + newline;
        setting += tab + exportSeries() + newline;
        setting += '</yTTrendChart>';

        var blob = new Blob([setting], { "type": "application/x-msdownload" });
        this.downloadCanvas(blob, name);
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// Series  Edition POPUP
    ////////////////////////////////////////////////////////////////////////////////
    var tmplistseries = [];

    var currentseries = null;

    var pgCustomTypes = {};
    var cpOptions = {};
    var pgMetaObj = {};
    var listtag = [];
    var listCreated = false;
    // Add series operation
    YTTrendChart.prototype.EditSeriesOperation = function () {
        ////// console.log("EditSeriesOperation");
        var view = this;

        var ContentID = this.toolbarButtonID("editseries-content");
        var addseriesID = this._id + "-addSeriesBtn";
        var delseriesID = this._id + "-deleteSeriesBtn";
        var listitemsID = "listitems";
        var propGridID = "propGrid";
        var listViewSeriesID = "listViewSeries";

        // clear current list of series
        tmplistseries.splice(0, tmplistseries.length);

        // copy list series to SeriesListView
        var series = this.getSeries();

        //tmplistseries = new Array(...series);
        tmplistseries = JSON.parse(JSON.stringify(series));

        var listserieshtml = "";
        for (var i = 0; i < series.length; i++) {
            var se = series[i];
            var item = '<li class="seriesitem">' + se.name + '</li>';
            listserieshtml += item;
            currentseries = tmplistseries[0];
        }

        var html = "";
        html += '<div>';
        html += '		<div id="toolbar" class="toolbar">';
        html += '           <a id="' + addseriesID + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="Add Series"><span class="glyphicon glyphicon-plus" aria-hidden="true" plain="true"></span></a>';
        html += '           <a id="' + delseriesID + '" class="btn btn-default btn-sm padding-top-2 padding-bottom-2" title="Delete Series"><span class="glyphicon glyphicon-minus" aria-hidden="false" plain="true"></span></a>';
        html += '		</div>';
        html += '</div>';
        html += '<div>';
        html += '   <div class="panel panel-default">';
        html += '	<div class="row">';
        html += '		<div class ="col-xs-4">';
        html += '	        <div class="panel panel-default">';
        html += '				<div id="' + listViewSeriesID + '" class="ListView scroll order">';
        html += '					<ul id="' + listitemsID + '" data-role="listview" data-inset="true">';
        html += listserieshtml;
        html += '					</ul>';
        html += '				</div>';
        html += '			</div>';
        html += '		</div>';
        html += '		<div class ="col-xs-8">';
        html += '	        <div class="panel panel-default">';
        html += '				<div id="' + propGridID + '" style: "width: 400px" >';
        html += '				</div>';
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += '	</div>';
        html += '</div>';

        $("#" + ContentID).html(html);

        // Assign currentseries to show properties grid
        if (!listCreated) {
            // Init parameter for Series properties grid
            pgCustomTypes = {
                icon: {
                    html: function (elemId, name, value, meta) { // custom renderer for type (required)
                        return '<i class="fa fa-' + value + '"></i>';
                    },
                    valueFn: function () { return 'Icon field value'; }
                },
                textarea: {
                    html: function (elemId, name, value, meta) {
                        var html = '<textarea id="' + elemId + '" rows=6 style="white-space: nowrap; overflow-x: auto; width:100%">';
                        if (value instanceof Array) {
                            html += value.join("\n");
                        }
                        html += '</textarea>';
                        return html;
                    },
                    makeValueFn: function (elemId, name, value, meta) {
                        return function () {
                            return $('#' + elemId).val().split('\n');
                        }
                    }
                }
            };
            // This is our settings object metadata
            cpOptions = { preferredFormat: 'hex', showInput: true, showInitial: true };

            // Get list tag of filebuffer
            var filebuffer = this.getFileBuffer();
            listtag.push("None");
            for (var i = 0; i < filebuffer.tags.length; i++) {
                var val = filebuffer.tags[i];
                listtag.push(val.name);
            }

            pgMetaObj = {
                name: { group: 'Properties', name: 'Name' },
                tag: { group: 'Properties', name: 'Tag', type: 'options', options: listtag, default: "None" },
                axis: { group: 'Properties', name: 'AxisExtra', type: 'options', options: ['Y1Axis', 'Y2Axis', 'Y3Axis', 'Y4Axis'] },
                type: { group: 'Properties', name: 'Type', type: 'options', options: ['Line', 'Point', 'Area'] },
                point: { group: 'Properties', name: 'Point Style', type: 'options', options: ['Circle', 'Square', 'RoundSquare', 'Triangle', 'Diamond', 'Pin', 'Arrow'] },
                pointsize: { group: 'Properties', name: 'Point Size', type: 'input' },
                color: { group: 'Properties', name: 'Color', type: 'color', options: cpOptions },
                width: { group: 'Properties', name: 'Width', type: 'input' },
                visible: { group: 'Properties', name: 'Visible', type: 'boolean' },
            };
            listCreated = true;
        }

        // new a series
        var addSeriesButton = $("#" + addseriesID);
        addSeriesButton.click(function () {
            view.AddSeriesButtonClick();
        });

        // remove a series button
        var delSeriesButton = $("#" + delseriesID);
        delSeriesButton.click(function () {
            view.DelSeriesButtonClick();
        });

        //Click on series
        var listviewseries = $("#" + listViewSeriesID);
        listviewseries.click(function (event) {
            view.OnSeriesClick(event);
        });


        var serieslistview = document.getElementById("listViewSeries");
        // Series Mouse over evnet
        serieslistview.addEventListener("mouseover", function (event) {
            if (event.target.className == "seriesitem") {
                event.target.style.color = "black";
                event.target.style.fontWeight = "bold";
            }
        }, false);

        // Series mouse out event
        serieslistview.addEventListener("mouseout", function (event) {
            if (event.target.className == "seriesitem") {
                event.target.style.color = "";
                event.target.style.fontWeight = "normal";
            }
        });

        view.UpdatePropertiesGrid();


        $("#" + ContentID).dialog({
            appendTo: "#xisom-modal",
            closeOnEscape: true,
            resizable: false,
            height: "auto",
            width: 590,
            modal: true,
            buttons: {
                " Apply ": function (evt) {
                    view.SaveButtonClick();
                    $(this).dialog("close");
                    $("#" + ContentID).html("");
                    $("#xisom-modal").html("");
                },
                " Cancel ": function () {
                    $(this).dialog("close");
                    $("#" + ContentID).html("");
                    $("#xisom-modal").html("");
                }
            },
            close: function () {
                $(this).dialog("close");
                $("#" + ContentID).html("");
                $("#xisom-modal").html("");
            }
        });
    }

    // Add new Series button handler
    YTTrendChart.prototype.AddSeriesButtonClick = function () {
        ////// console.log("Enter AddSeriesButtonClick");
        var listitems = $("#listitems");

        // if (tmplistseries.length >= 10) {
        //     window.alert("Maximum Series is 10");
        //     return;
        // }

        var view = this;
        var seriesname = view.GenSeriesName();
        var seriescolor = view.GenSeriesColor();
        ////// console.log("Add Series => " + " Name: " + seriesname + " Color: " + seriescolor);

        // Add to SeriesListView
        var item = '<li class="seriesitem">' + seriesname + "</li>";
        listitems.append(item);
        var inittag = "None";
        //if (listtag.length > 0) { inittag = listtag[0]; }
        var seriesitem = { color: seriescolor, label: { font: { name: "Tahoma", size: 10, bold: false, italic: false, underline: false }, position: "Default", showPercent: false, showValue: false, textColor: "#000000" }, line: { lineColor: "", lineStyle: "Solid", lineWidth: 1, visible: true }, point: { color: "", size: 5, visible: false, type: "Circle" }, opacity: 1, tag: inittag, axisExtra: "YAxis", name: seriesname, text: "", visible: true, type: "Line" };

        tmplistseries.push(seriesitem);

        // assign new series to current series
        currentseries = tmplistseries[tmplistseries.length - 1];
        //// console.log(currentseries);

        // update properties grid 
        this.UpdatePropertiesGrid();
    }
    // Generate a name for series
    YTTrendChart.prototype.GenSeriesName = function () {
        var seriesitems = document.getElementsByClassName("seriesitem");
        var i = 0;
        var name = "";
        for (; ;) {
            // 새로운 이름!!
            name = "series" + (++i);
            for (var j = 0; j < seriesitems.length; j++) {

                var series = seriesitems[j];
                if (series.textContent == name) {
                    name = "";
                    break;
                }
            }

            if (name != "") {
                return name;
            }
        }
    }

    // Auto gen a color for series
    YTTrendChart.prototype.GenSeriesColor = function () {
        var list = tmplistseries;

        for (; ;) {
            //새로운 칼러!!
            color = this.GetRandomColor();
            var findNewColor = true;

            for (var i = 0; i < list.length; i++) {
                var series = list[i];
                if (series.color == color) {
                    findNewColor = false;
                    break;
                }
            }

            if (findNewColor) {
                return color;
            }
        }
    }
    /// <summary>
    /// Seriese에 사용할 임의의 색상을 가져온다.
    /// </summary>
    YTTrendChart.prototype.GetRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Update properties grid
    YTTrendChart.prototype.UpdatePropertiesGrid = function () {
        ////// console.log("YTTrendChart.prototype.UpdatePropertiesGrid");
        var view = this;

        if (currentseries == null) return;

        // set BackgroundColor for all series item in SeriesListView
        var listitemseries = document.getElementsByClassName("seriesitem");
        for (var i = 0; i < listitemseries.length; i++) {
            var li = listitemseries[i];
            if (li.textContent == currentseries.name) {
                var newLocal = "#c0dbfa"; //#c0d1cf
                // set backgroundcolor for selected series  
                li.style.backgroundColor = newLocal;
            }
            else {
                // clear backgroundcolor for selected series
                li.style.backgroundColor = "";
            }
        }

        // This is current series setting object
        var setObj = {
            name: currentseries.name,
            tag: currentseries.tag,
            type: currentseries.type,
            point: currentseries.point.type,
            pointsize: currentseries.point.size,
            axis: currentseries.axisExtra,
            color: currentseries.color,
            width: currentseries.line.lineWidth,
            visible: currentseries.line.visible,

        };

        // Lets apply currentseries properties to the grid
        $('#propGrid').jqPropertyGrid(setObj, {
            meta: pgMetaObj,
            customTypes: pgCustomTypes,
            isCollapsible: false,
            sort: false,
            callback: function (grid, name, value) {
                view.propertyChangedCallback(grid, name, value);
            }
        });
    }

    var isPropertyChangedCallback = true;
    // Callback function. Called when any entry in the grid is changedCallback
    YTTrendChart.prototype.propertyChangedCallback = function (grid, name, value) {
        ////// console.log("propertyChangedCallback");
        var view = this;

        // prevent double ChangedCallback
        if (!isPropertyChangedCallback) return;
        isPropertyChangedCallback = false;

        // handle callback
        var oldcurrentseries = JSON.parse(JSON.stringify(currentseries));
        var isError = false;
        switch (name) {
            case "name": {
                if (value == "") {
                    window.alert("Name of series could not be null");
                    currentseries.name = oldcurrentseries.name;
                    isError = true;
                    break;
                } else {
                    // preprocess input name
                    var strimstring = value.replace(/[^a-zA-Z0-9]/g, "").replace(' ', '');
                    // console.log("value", value);
                    // console.log("strimstring", strimstring);

                    // check current name include special character or space or not
                    if (strimstring.length != value.length) {
                        window.alert(value + " include the space or special character");
                        isError = true;
                        break;
                    }
                    // check current name is exist or not
                    for (var i = 0; i < tmplistseries.length; i++) {
                        var val = tmplistseries[i];
                        if (oldcurrentseries.name != val.name) {
                            if (val.name == value) {
                                window.alert(value + " is exist already!");
                                isError = true;
                                break;
                            }
                        }
                    }
                    if (!isError) {
                        currentseries.name = value;
                        var listitemseries = document.getElementsByClassName("seriesitem");

                        for (var i = 0; i < listitemseries.length; i++) {
                            var li = listitemseries[i];
                            if (li.textContent == oldcurrentseries.name) {
                                li.textContent = currentseries.name;
                                break;
                            }
                        }
                    }
                }
                break;
            }

            case "tag": {
                currentseries.tag = value;
                break;
            }

            case "type": {
                currentseries.type = value;
                break;
            }
            case "point": {
                currentseries.point.type = value;
                break;
            }

            case "pointsize": {
                if (value != Number(value) || Number(value < 0)) {
                    window.alert("Input only number");
                    currentseries.width = oldcurrentseries.width;
                    isError = true;
                    break;
                }
                else {
                    currentseries.point.size = value;
                }
                break;
            }
            case "axis": {
                currentseries.axisExtra = value;
                break;
            }

            case "color": {
                currentseries.color = value;
                break;
            }

            case "width": {
                if (value != Number(value) || Number(value < 0)) {
                    window.alert("Input only number");
                    currentseries.width = oldcurrentseries.width;
                    isError = true;
                    break;
                }
                else {
                    currentseries.width = value;
                }
                break;
            }

            case "visible": {
                currentseries.line.visible = value;
                currentseries.visible = value;
                currentseries.point.visible = value;
                break;
            }
        }

        if (isError) {
            view.UpdatePropertiesGrid();
        }

        isPropertyChangedCallback = true;
    }

    // Click on series
    YTTrendChart.prototype.OnSeriesClick = function (event) {
        ////// console.log("OnSeriesClick");
        var view = this;

        if (event.target.className == "seriesitem") {
            // udpate selected sereis to currentseries
            if (tmplistseries.length == 0) return;

            for (var i = 0; i < tmplistseries.length; i++) {
                var val = tmplistseries[i]
                //// console.log(val);
                if (val.name == event.target.textContent) {
                    currentseries = val;
                    break;
                }
            }
            // update propertiesgrid
            view.UpdatePropertiesGrid();
        }
    }

    // remove selected series button handler
    YTTrendChart.prototype.DelSeriesButtonClick = function () {
        ////// console.log("Delete Series button click");
        var listitems = $("#listitems");

        var listitemseries = document.getElementsByClassName("seriesitem");
        var ulElem = document.getElementById('listitems');
        for (var i = 0; i < listitemseries.length; i++) {
            var li = listitemseries[i];
            if (li.textContent == currentseries.name) {
                // remove item on SeriesListView
                ulElem.removeChild(li);

                // remove item in tmplistseries
                for (var j = 0; j < tmplistseries.length; j++) {
                    var idx = tmplistseries.indexOf(currentseries);
                    tmplistseries.splice(idx, 1);
                    if (tmplistseries.length > 0) {
                        if (tmplistseries.length > idx) {
                            currentseries = tmplistseries[idx];
                        }
                        else {
                            currentseries = tmplistseries[idx - 1];
                        }
                    }
                    else {
                        currentseries = null;
                    }
                    this.UpdatePropertiesGrid();
                    return;
                }
                return;
            }
        }
    }

    // Save all the changes on EditSeries windows
    YTTrendChart.prototype.SaveButtonClick = function () {
        ////// console.log("SaveButtonClick");
        view = this;

        //copy SeriesListView to series
        var series = this.getSeries();
        series.splice(0, series.length);

        for (var i = 0; i < tmplistseries.length; i++) {
            var item = tmplistseries[i]
            series.push(item);
        }
        view.reInitChart();
        view.series.validate();
        var isLive = view.getIsLive();
        if (isLive == false) {
            view.doViewDataByTrend();
        }
    }

    // Discard all changes on EditSeries windows
    YTTrendChart.prototype.CancelButtonClick = function () {
        ////// console.log("Cancel button click");

        // Hide modal panel for series edit
        var seriesedit = $("#seriesedit-modal");
        $(seriesedit).removeClass("show");
        $(seriesedit).addClass("hide");
    }

    YTTrendChart.prototype.reInitChart = function () {
        var view = this;
        var chart = this.getChart();
        var option = this.options();
        //option.optSeries = this.optionSeries();
        //option.series[0].itemStyle.normal.opacity = 0;
        //option.series[0].itemStyle.opacity = 0;
        ////// console.log("option.optSeries", option.optSeries);
        //console.log("option:", option);
        chart.setOption(option, true);

        view.AxisUpdatePosition();
    }


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// GENERAL SETTING POPUP
    ////////////////////////////////////////////////////////////////////////////////
    var gsProperties = {
    };
    var gsApperanceProperties = {};
    var gsGridProperties = {};
    var gsLegendProperties = {};
    var gsTargetline1Properties = {};
    var gsTargetline2Properties = {};
    var gsTargetline3Properties = {};
    var gsTargetline4Properties = {};
    var gsXaxisProperties = {};
    var gsY1axisProperties = {};
    var gsY2axisProperties = {};
    var gsY3axisProperties = {};
    var gsY4axisProperties = {};

    var gsCurrentSelectID = null;
    var gsCustomType = {};
    var gsMetaObj = {};
    var gsCurrentMetaObj = {};
    var gsCurrentProperty = {};


    YTTrendChart.prototype.GeneralSettingOperator = function () {
        ////// console.log("GeneralSettingOperator");
        var view = this;

        var ContentID = this.toolbarButtonID("generalsetting-content");
        var gslistview = this._id + "-gslistview";
        var appearanceID = this._id + "-gsAppearance";
        var gridID = this._id + "-gsGrid";
        var legendID = this._id + "-gsLegend";
        var targetline1ID = this._id + "-gsTargetline1";
        var targetline2ID = this._id + "-gsTargetline2";
        var targetline3ID = this._id + "-gsTargetline3";
        var targetline4ID = this._id + "-gsTargetline4";
        var titleID = this._id + "-gsTitle";
        var tooltipID = this._id + "-gsTooltip";
        var xaxisID = this._id + "-gsXaxis";
        var y1axisID = this._id + "-gsY1axis";
        var y2axisID = this._id + "-gsY2axis";
        var y3axisID = this._id + "-gsY3axis";
        var y4axisID = this._id + "-gsY4axis";
        var gsPropertiesGridID = this._id + "-gsPropertiesGrid";

        var html = '';
        html += '<div class="generalsetting">';
        html += '   <div class="row">';
        html += '		<div class ="col-xs-4">';
        html += '	        <div class="panel panel-default">';
        html += '				<ul id="' + gslistview + '" data-role="listview" data-inset="true">';
        html += '					<li class="general-setting-items" id="' + appearanceID + '" style="font-weight: normal;">Appearance</li>';
        html += '					<li class="general-setting-items" id="' + gridID + '" style="font-weight: normal;">Grid</li>';
        html += '					<li class="general-setting-items" id="' + legendID + '" style="font-weight: normal;">Legend</li>';
        html += '					<li class="general-setting-items" id="' + targetline1ID + '" style="font-weight: normal;">TargetLine1</li>';
        html += '					<li class="general-setting-items" id="' + targetline2ID + '" style="font-weight: normal;">TargetLine2</li>';
        html += '					<li class="general-setting-items" id="' + targetline3ID + '" style="font-weight: normal;">TargetLine3</li>';
        html += '					<li class="general-setting-items" id="' + targetline4ID + '" style="font-weight: normal;">TargetLine4</li>';
        html += '					<li class="general-setting-items" id="' + titleID + '" style="font-weight: normal;">Title</li>';
        html += '					<li class="general-setting-items" id="' + tooltipID + '" style="font-weight: normal;">Tooltip</li>';
        html += '					<li class="general-setting-items" id="' + xaxisID + '" style="font-weight: normal;">XAxis</li>';
        html += '					<li class="general-setting-items" id="' + y1axisID + '" style="font-weight: normal;">Y1Axis</li>';
        html += '					<li class="general-setting-items" id="' + y2axisID + '" style="font-weight: normal;">Y2Axis</li>';
        html += '					<li class="general-setting-items" id="' + y3axisID + '" style="font-weight: normal;">Y3Axis</li>';
        html += '					<li class="general-setting-items" id="' + y4axisID + '" style="font-weight: normal;">Y4Axis</li>';
        html += '				</ul>';
        html += '			</div>';
        html += '       </div>';
        html += '		<div class ="col-xs-8">';
        html += '				<div id="' + gsPropertiesGridID + '" style: "width: 410px" >';
        html += '				</div>';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        $("#" + ContentID).html(html);

        // Init chart info
        view.GeneralSettingInit();

        // Get current properties from chart
        view.GetChartProperties();

        view.GSEventInit();

        // set default for the first properties 
        view.GSItemSetBackgoundColor(appearanceID);
        gsCurrentProperty = gsApperanceProperties;
        gsCurrentMetaObj = gsMetaObj.Appearance;
        gsCurrentSelectID = appearanceID;
        view.GSPropertiesGridUpdate();

        $("#" + ContentID).dialog({
            appendTo: "#xisom-modal",
            closeOnEscape: true,
            resizable: false,
            height: "auto",
            width: 590,
            modal: true,
            buttons: {
                " Apply ": function (evt) {
                    view.GSApplySetting();
                    $(this).dialog("close");
                    $("#" + ContentID).html("");
                    $("#xisom-modal").html("");
                },
                Cancel: function () {
                    $(this).dialog("close");
                    $("#" + ContentID).html("");
                    $("#xisom-modal").html("");
                }
            },
            close: function () {
                $(this).dialog("close");
                $("#" + ContentID).html("");
                $("#xisom-modal").html("");
            },
        });
    }

    selectFontPicker = function () {
        ////// console.log("Callback from FONT PICKER");
        var view = this;

        $('#fontpicker').fontpicker({
            variants: false,
            nrRecents: 0,
            googleFonts: [
                'Abel', 'Advent Pro', 'Changa', 'Eczar', 'Gloria Hallelujah',
                'Indie Flower', 'Press Start 2P', 'Slackey', 'Yeon Sung'
            ],
            localFonts: true
        })
            .on('change', function () {
                ////// console.log("font picker change");
                //applyFont('#fontpicker', this.value);
                //view.GSChangedCallback();
            });
    }

    var isGeneralSettingInit = false;
    // init general setting
    YTTrendChart.prototype.GeneralSettingInit = function () {
        ////// console.log("GeneralSettingInit");

        if (!isGeneralSettingInit) {
            // This is our settings object metadata
            var gsColorOption = { preferredFormat: 'hex', showInput: false, showInitial: false, appendTo: ".ui-dialog" };

            var localFonts = {
                "Arial": {
                    "category": "sans-serif",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i"
                },
                "Georgia": {
                    "category": "serif",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i"
                },
                "Times New Roman": {
                    "category": "serif",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i"
                },
                "Verdana": {
                    "category": "sans-serif",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i"
                },

                "Action Man": {
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i"
                },
                "Bauer": {
                    "category": "display",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i",
                    "subsets": "latin-ext,latin"
                },
                "Bubble": {
                    "category": "display",
                    "variants": "10,10i,20,20i,30,30i,40,40i,50,50i,60,60i,70,70i,80,80i,90,90i",
                    "subsets": "latin-ext,latin"
                }
            };
            // This is the customTypes object that describes additionnal types, and their renderers (optional)
            var gsFontOption = { parentElement: ".generalsetting", variants: true, nrRecents: 0, localFonts: localFonts, googleFonts: false };

            gsCustomType = {
                ref: { // name of custom type
                    html: function (elemId, name, value, meta) { // custom renderer for type (required)
                        var content = '';
                        var onclick = 'selectFontPicker()';
                        //valueHTML = value + ' <i class="fa fa-external-link" onclick="selectRef(\'' + value + '\')"></i>';
                        content += '<div class="font-picker fp-select" id="fontpicker" onclick="' + onclick + '">';
                        content += '<span tabindex="0">Select a font</span>';
                        content += '</div>';

                        // valueHTML = value + ' <input class="font-picker" id="fontpicker" type="text" onclick="selectFontPicker()"/>';
                        valueHTML = value + content;

                        // console.log("elemId: ", elemId);
                        // console.log("name: ", name);
                        // console.log("value: ", value);
                        // console.log("meta: ", meta);
                        // console.log("valueHTML: ", valueHTML);
                        return valueHTML;
                    },
                    valueFn: false // value-return function (optional). If unset, default will be "function() { return $('#' + elemId).val(); }", set to false to disable it
                    // You can also put a makeValueFn function (taking elemId, name, value, meta parameters) to create value-return function on the fly (it will override valuefn setting), returning non-function will disable getting value for this property
                }
            };


            gsMetaObj = {
                Appearance: {
                    areaColor: { group: 'Appearance', name: 'Area Color', type: 'color', options: gsColorOption },
                    backgroundColor: { group: 'Appearance', name: 'Background Color', type: 'color', options: gsColorOption },
                    borderStyle: { group: 'Appearance', name: 'Border Type', type: 'options', options: ['None', 'Single'] }
                },
                Grid: {
                    hColor: { group: 'Grid', name: 'Horizontal Grid Color', type: 'color', options: gsColorOption },
                    hCount: { group: 'Grid', name: 'Horizontal Grid Count', type: 'input' },
                    hVisible: { group: 'Grid', name: 'Horizontal Grid Visible', type: 'boolean' },
                    vColor: { group: 'Grid', name: 'Vertical Grid Color', type: 'color', options: gsColorOption },
                    vCount: { group: 'Grid', name: 'Vertical Grid Count', type: 'input' },
                    vVisible: { group: 'Grid', name: 'Vertical Grid Visible', type: 'boolean' }
                },
                Legend: {
                    backgroundColor: { group: 'Legend', name: 'Background Color', type: 'color', options: gsColorOption },
                    position: { group: 'Legend', name: 'Position', type: 'options', options: ['Top', 'TopLeft', 'TopRight', 'Bottom', 'BottomLeft', 'BottomRight'] },
                    textColor: { group: 'Legend', name: 'TextColor', type: 'color', options: gsColorOption },
                    visible: { group: 'Legend', name: 'Visible', type: 'boolean' },
                    width: { group: 'Legend', name: 'Width', type: 'input' },
                    height: { group: 'Legend', name: 'Height', type: 'input' }
                },
                TargetLine1: {
                    axis: { group: 'TargetLine1', name: 'Axis', type: 'options', options: ['Y1Axis', 'Y2Axis', 'Y3Axis', 'Y4Axis'] },
                    color: { group: 'TargetLine1', name: 'Color', type: 'color', options: gsColorOption },
                    name: { group: 'TargetLine1', name: 'Name', type: 'input' },
                    namePosition: { group: 'TargetLine1', name: 'NamePosition', type: 'options', options: ['Start', 'Middle', 'End'] },
                    style: { group: 'TargetLine1', name: 'Style', type: 'options', options: ['Solid', 'Dashed', 'Dotted'] },
                    value: { group: 'TargetLine1', name: 'Value', type: 'input' },
                    width: { group: 'TargetLine1', name: 'Width', type: 'input' },
                    visible: { group: 'TargetLine1', name: 'Visible', type: 'boolean' }
                },
                TargetLine2: {
                    axis: { group: 'TargetLine2', name: 'Axis', type: 'options', options: ['Y1Axis', 'Y2Axis', 'Y3Axis', 'Y4Axis'] },
                    color: { group: 'TargetLine2', name: 'Color', type: 'color', options: gsColorOption },
                    name: { group: 'TargetLine2', name: 'Name', type: 'input' },
                    namePosition: { group: 'TargetLine2', name: 'NamePosition', type: 'options', options: ['Start', 'Middle', 'End'] },
                    style: { group: 'TargetLine2', name: 'Style', type: 'options', options: ['Solid', 'Dashed', 'Dotted'] },
                    value: { group: 'TargetLine2', name: 'Value', type: 'input' },
                    width: { group: 'TargetLine2', name: 'Width', type: 'input' },
                    visible: { group: 'TargetLine2', name: 'Visible', type: 'boolean' }
                },
                TargetLine3: {
                    axis: { group: 'TargetLine3', name: 'Axis', type: 'options', options: ['Y1Axis', 'Y2Axis', 'Y3Axis', 'Y4Axis'] },
                    color: { group: 'TargetLine3', name: 'Color', type: 'color', options: gsColorOption },
                    name: { group: 'TargetLine3', name: 'Name', type: 'input' },
                    namePosition: { group: 'TargetLine3', name: 'NamePosition', type: 'options', options: ['Start', 'Middle', 'End'] },
                    style: { group: 'TargetLine3', name: 'Style', type: 'options', options: ['Solid', 'Dashed', 'Dotted'] },
                    value: { group: 'TargetLine3', name: 'Value', type: 'input' },
                    width: { group: 'TargetLine3', name: 'Width', type: 'input' },
                    visible: { group: 'TargetLine3', name: 'Visible', type: 'boolean' }
                },
                TargetLine4: {
                    axis: { group: 'TargetLine4', name: 'Axis', type: 'options', options: ['Y1Axis', 'Y2Axis', 'Y3Axis', 'Y4Axis'] },
                    color: { group: 'TargetLine4', name: 'Color', type: 'color', options: gsColorOption },
                    name: { group: 'TargetLine4', name: 'Name', type: 'input' },
                    namePosition: { group: 'TargetLine4', name: 'NamePosition', type: 'options', options: ['Start', 'Middle', 'End'] },
                    style: { group: 'TargetLine4', name: 'Style', type: 'options', options: ['Solid', 'Dashed', 'Dotted'] },
                    value: { group: 'TargetLine4', name: 'Value', type: 'input' },
                    width: { group: 'TargetLine4', name: 'Width', type: 'input' },
                    visible: { group: 'TargetLine4', name: 'Visible', type: 'boolean' }
                },
                Title: {
                    name: { group: 'Title', name: 'Title Name', type: 'input' },
                    color: { group: 'Title', name: 'Color', type: 'color', options: gsColorOption },
                    font: { group: 'Title', name: 'Font', type: 'font', options: gsFontOption },
                    visible: { group: 'Title', name: 'Visible', type: 'boolean' },
                    width: { group: 'Title', name: 'Width', type: 'input' },
                    height: { group: 'Title', name: 'Height', type: 'input' }
                },
                Tooltip: {
                    type: { group: 'Tooltip', name: 'Tooltip Type', type: 'options', options: ['Color', 'Text'] },
                    visible: { group: 'Tooltip', name: 'Visible', type: 'boolean' }
                },
                XAxis: {
                    name: { group: 'XAxis', name: 'Title', type: 'input' },
                    color: { group: 'XAxis', name: 'Title Color', type: 'color', options: gsColorOption },
                    font: { group: 'XAxis', name: 'Title Font', type: 'font', options: gsFontOption },
                    labelColor: { group: 'XAxis', name: 'Label Color', type: 'color', options: gsColorOption },
                    labelFont: { group: 'XAxis', name: 'Labe Font', type: 'font', options: gsFontOption },
                    axiscolor: { group: 'XAxis', name: 'Axis Color', type: 'color', options: gsColorOption },
                    isreversed: { group: 'XAxis', name: 'Is Reversed', type: 'boolean' },
                },
                Y1Axis: {
                    name: { group: 'Y1Axis', name: 'Title', type: 'input' },
                    color: { group: 'Y1Axis', name: 'Title Color', type: 'color', options: gsColorOption },
                    font: { group: 'Y1Axis', name: 'Title Font', type: 'font', options: gsFontOption },
                    labelColor: { group: 'Y1Axis', name: 'Label Color', type: 'color', options: gsColorOption },
                    labelFont: { group: 'Y1Axis', name: 'Label Font', type: 'font', options: gsFontOption },
                    labelFormatter: { group: 'Y1Axis', name: 'Label Formatter', type: 'input' },
                    maximum: { group: 'Y1Axis', name: 'Maximum', type: 'input' },
                    minimum: { group: 'Y1Axis', name: 'Minimum', type: 'input' },
                    position: { group: 'Y1Axis', name: 'Position', type: 'options', options: ['Left', 'Right'] },
                    axiscolor: { group: 'Y1Axis', name: 'Axis Color', type: 'color', options: gsColorOption },
                },
                Y2Axis: {
                    name: { group: 'Y2Axis', name: 'Title', type: 'input' },
                    color: { group: 'Y2Axis', name: 'Title Color', type: 'color', options: gsColorOption },
                    font: { group: 'Y2Axis', name: 'Title Font', type: 'font', options: gsFontOption },
                    labelColor: { group: 'Y2Axis', name: 'Label Color', type: 'color', options: gsColorOption },
                    labelFont: { group: 'Y2Axis', name: 'Label Font', type: 'font', options: gsFontOption },
                    labelFormatter: { group: 'Y2Axis', name: 'Label Formatter', type: 'input' },
                    maximum: { group: 'Y2Axis', name: 'Maximum', type: 'input' },
                    minimum: { group: 'Y2Axis', name: 'Minimum', type: 'input' },
                    visible: { group: 'Y2Axis', name: 'Visible', type: 'boolean' },
                    position: { group: 'Y2Axis', name: 'Position', type: 'options', options: ['Left', 'Right'] },
                    axiscolor: { group: 'Y2Axis', name: 'Axis Color', type: 'color', options: gsColorOption },
                },
                Y3Axis: {
                    name: { group: 'Y3Axis', name: 'Title', type: 'input' },
                    color: { group: 'Y3Axis', name: 'Title Color', type: 'color', options: gsColorOption },
                    font: { group: 'Y3Axis', name: 'Title Font', type: 'font', options: gsFontOption },
                    labelColor: { group: 'Y3Axis', name: 'Label Color', type: 'color', options: gsColorOption },
                    labelFont: { group: 'Y3Axis', name: 'Label Font', type: 'font', options: gsFontOption },
                    labelFormatter: { group: 'Y3Axis', name: 'Label Formatter', type: 'input' },
                    maximum: { group: 'Y3Axis', name: 'Maximum', type: 'input' },
                    minimum: { group: 'Y3Axis', name: 'Minimum', type: 'input' },
                    visible: { group: 'Y3Axis', name: 'Visible', type: 'boolean' },
                    position: { group: 'Y3Axis', name: 'Position', type: 'options', options: ['Left', 'Right'] },
                    axiscolor: { group: 'Y3Axis', name: 'Axis Color', type: 'color', options: gsColorOption },
                },
                Y4Axis: {
                    name: { group: 'Y4Axis', name: 'Title', type: 'input' },
                    color: { group: 'Y4Axis', name: 'Title Color', type: 'color', options: gsColorOption },
                    font: { group: 'Y4Axis', name: 'Title Font', type: 'font', options: gsFontOption },
                    labelColor: { group: 'Y4Axis', name: 'Label Color', type: 'color', options: gsColorOption },
                    labelFont: { group: 'Y4Axis', name: 'Label Font', type: 'font', options: gsFontOption },
                    labelFormatter: { group: 'Y4Axis', name: 'Label Formatter', type: 'input' },
                    maximum: { group: 'Y4Axis', name: 'Maximum', type: 'input' },
                    minimum: { group: 'Y4Axis', name: 'Minimum', type: 'input' },
                    visible: { group: 'Y4Axis', name: 'Visible', type: 'boolean' },
                    position: { group: 'Y4Axis', name: 'Position', type: 'options', options: ['Left', 'Right'] },
                    axiscolor: { group: 'Y4Axis', name: 'Axis Color', type: 'color', options: gsColorOption },
                }
            };
            isGeneralSettingInit = true;
        }
    }

    // Get init properties from chart
    YTTrendChart.prototype.GetChartProperties = function () {
        ////// console.log("GetInitProperties");
        var view = this;
        var grid = view.getGrid();
        var appearance = view.getAppearance();
        var title = view.getTitle();
        var legend = view.getLegend();
        var xaxis = view.getXaxis();
        var y1axis = view.getY1axis();
        var y2axis = view.getY2axis();
        var y3axis = view.getY3axis();
        var y4axis = view.getY4axis();
        var tooltip = view.getTooltip();
        var tl1 = view.getTargetLine().targetline1;
        var tl2 = view.getTargetLine().targetline2;
        var tl3 = view.getTargetLine().targetline3;
        var tl4 = view.getTargetLine().targetline4;

        // clear all setting
        ////// console.log("Remove gsProperties: ");
        if (gsProperties.length > 0) {
            for (var i = 0; i < gsProperties.length; i++) {
                gsProperties[i] = null;
            }
        }
        gsProperties = null;

        // Init values of gsProperties from chart
        // Appearance
        //console.log(appearance);
        gsApperanceProperties = {
            areaColor: appearance.foregroundColor,
            backgroundColor: appearance.backgroundColor,
            borderStyle: appearance.borderStyle
        };
        // Grid
        gsGridProperties = {
            hColor: grid.hcolor,
            hCount: grid.hcount,
            hVisible: grid.hvisible,
            vColor: grid.vcolor,
            vCount: grid.vcount,
            vVisible: grid.vvisible
        };

        // Lengend
        gsLegendProperties = {
            backgroundColor: view.getBackgroundColor(),
            position: legend.position,
            textColor: legend.textColor,
            visible: legend.visible,
            width: legend.width,
            height: legend.height
        };

        // Targetline 1
        gsTargetline1Properties = {
            axis: tl1.axis,
            color: tl1.color,
            name: tl1.name,
            namePosition: tl1.namepos,
            style: tl1.style,
            value: tl1.value,
            width: tl1.width,
            visible: tl1.visible
        };
        // Targetline 2
        gsTargetline2Properties = {
            axis: tl2.axis,
            color: tl2.color,
            name: tl2.name,
            namePosition: tl2.namepos,
            style: tl2.style,
            value: tl2.value,
            width: tl2.width,
            visible: tl2.visible
        };
        // Targetline 3
        gsTargetline3Properties = {
            axis: tl3.axis,
            color: tl3.color,
            name: tl3.name,
            namePosition: tl3.namepos,
            style: tl3.style,
            value: tl3.value,
            width: tl3.width,
            visible: tl3.visible
        };
        // Targetline 4
        gsTargetline4Properties = {
            axis: tl4.axis,
            color: tl4.color,
            name: tl4.name,
            namePosition: tl4.namepos,
            style: tl4.style,
            value: tl4.value,
            width: tl4.width,
            visible: tl4.visible
        };

        // Title   
        gsTitleProperties = {
            name: title.text,
            color: title.textColor,
            font: title.font.name + ':' + title.font.size + (title.font.italic ? 'i' : ''),
            visible: title.visible,
            width: title.width,
            height: title.height
        };

        // Tooltip
        gsTooltipProperties = {
            type: "Color",
            visible: tooltip.visible
        };

        // Xaxis
        gsXaxisProperties = {
            name: xaxis.title.text,
            color: xaxis.title.textColor,
            font: xaxis.title.font.name + ':' + xaxis.title.font.size + (xaxis.title.font.italic ? 'i' : ''),
            labelColor: xaxis.label.textColor,
            labelFont: xaxis.label.font.name + ':' + xaxis.label.font.size + (xaxis.label.font.italic ? 'i' : ''),
            axiscolor: xaxis.line.lineColor,
            isreversed: xaxis.isReversed
        };

        // Y1Axis
        gsY1axisProperties = {
            name: y1axis.title.text,
            color: y1axis.title.textColor,
            font: y1axis.title.font.name + ':' + y1axis.title.font.size + (y1axis.title.font.italic ? 'i' : ''),
            labelColor: y1axis.label.textColor,
            labelFont: y1axis.label.font.name + ':' + y1axis.label.font.size + (y1axis.label.font.italic ? 'i' : ''),
            axiscolor: y1axis.line.lineColor,
            maximum: y1axis.maxValue,
            minimum: y1axis.minValue,
            position: y1axis.position,
            labelFormatter: y1axis.format.format,
        };

        // Y2axis
        gsY2axisProperties = {
            name: y2axis.title.text,
            color: y2axis.title.textColor,
            font: y2axis.title.font.name + ':' + y2axis.title.font.size + (y2axis.title.font.italic ? 'i' : ''),
            labelColor: y2axis.label.textColor,
            labelFont: y2axis.label.font.name + ':' + y2axis.label.font.size + (y2axis.label.font.italic ? 'i' : ''),
            axiscolor: y2axis.line.lineColor,
            maximum: y2axis.maxValue,
            minimum: y2axis.minValue,
            position: y2axis.position,
            visible: y2axis.visible,
            labelFormatter: y2axis.format.format
        };

        // Y3axis
        gsY3axisProperties = {
            name: y3axis.title.text,
            color: y3axis.title.textColor,
            font: y3axis.title.font.name + ':' + y3axis.title.font.size + (y3axis.title.font.italic ? 'i' : ''),
            labelColor: y3axis.label.textColor,
            labelFont: y3axis.label.font.name + ':' + y3axis.label.font.size + (y3axis.label.font.italic ? 'i' : ''),
            axiscolor: y3axis.line.lineColor,
            maximum: y3axis.maxValue,
            minimum: y3axis.minValue,
            position: y3axis.position,
            visible: y3axis.visible,
            labelFormatter: y3axis.format.format
        };

        // Y4axis                
        gsY4axisProperties = {
            name: y4axis.title.text,
            color: y4axis.title.textColor,
            font: y4axis.title.font.name + ':' + y4axis.title.font.size + (y4axis.title.font.italic ? 'i' : ''),
            labelColor: y4axis.label.textColor,
            labelFont: y4axis.label.font.name + ':' + y4axis.label.font.size + (y4axis.label.font.italic ? 'i' : ''),
            axiscolor: y4axis.line.lineColor,
            maximum: y4axis.maxValue,
            minimum: y4axis.minValue,
            position: y4axis.position,
            visible: y4axis.visible,
            labelFormatter: y4axis.format.format
        };

        gsProperties = {
            Appearance: gsApperanceProperties,
            Grid: gsGridProperties,
            Legend: gsLegendProperties,
            TargetLine1: gsTargetline1Properties,
            TargetLine2: gsTargetline2Properties,
            TargetLine3: gsTargetline3Properties,
            TargetLine4: gsTargetline4Properties,
            Tooltip: gsTooltipProperties,
            XAxis: gsXaxisProperties,
            Y1Axis: gsY1axisProperties,
            Y2Axis: gsY2axisProperties,
            Y3Axis: gsY3axisProperties,
            Y4Axis: gsY4axisProperties
        };
    }

    // init event for GS properties
    YTTrendChart.prototype.GSEventInit = function () {
        ////// console.log("GSEventInit");

        var view = this;

        var gslistview = view.id + "-gslistview";
        var appearanceID = view.id + "-gsAppearance";
        var gridID = view.id + "-gsGrid";
        var legendID = view.id + "-gsLegend";
        var targetline1ID = view.id + "-gsTargetline1";
        var targetline2ID = view.id + "-gsTargetline2";
        var targetline3ID = view.id + "-gsTargetline3";
        var targetline4ID = view.id + "-gsTargetline4";
        var titleID = view.id + "-gsTitle";
        var tooltipID = view.id + "-gsTooltip";
        var xaxisID = view.id + "-gsXaxis";
        var y1axisID = view.id + "-gsY1axis";
        var y2axisID = view.id + "-gsY2axis";
        var y3axisID = view.id + "-gsY3axis";
        var y4axisID = view.id + "-gsY4axis";

        var gslistviewevent = document.getElementById(gslistview);
        // GS Properties mouseover event
        gslistviewevent.addEventListener("mouseover", function (event) {
            if (event.target.className == "general-setting-items") {
                event.target.style.color = "black";
                event.target.style.fontWeight = "bold";
            }
        }, false);

        // GS Properties mouse out event
        gslistviewevent.addEventListener("mouseout", function (event) {
            if (event.target.className == "general-setting-items") {
                event.target.style.color = "";
                event.target.style.fontWeight = "normal";
            }
        });

        gsCurrentSelectID = null;
        $("#" + appearanceID).click(function () {
            ////// console.log("appearanceID");
            view.GSItemSetBackgoundColor(appearanceID);
            gsCurrentMetaObj = gsMetaObj.Appearance;
            gsCurrentProperty = gsApperanceProperties;
            gsCurrentSelectID = appearanceID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + gridID).click(function () {
            ////// console.log("gridID");
            view.GSItemSetBackgoundColor(gridID);
            gsCurrentMetaObj = gsMetaObj.Grid;
            gsCurrentProperty = gsGridProperties;
            gsCurrentSelectID = gridID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + legendID).click(function () {
            ////// console.log("legendID");
            view.GSItemSetBackgoundColor(legendID);

            gsCurrentMetaObj = gsMetaObj.Legend;
            gsCurrentProperty = gsLegendProperties;
            gsCurrentSelectID = legendID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + targetline1ID).click(function () {
            ////// console.log("targetline1ID");
            view.GSItemSetBackgoundColor(targetline1ID);

            gsCurrentMetaObj = gsMetaObj.TargetLine1;
            gsCurrentProperty = gsTargetline1Properties;
            gsCurrentSelectID = targetline1ID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + targetline2ID).click(function () {
            ////// console.log("targetline2ID");
            view.GSItemSetBackgoundColor(targetline2ID);

            gsCurrentMetaObj = gsMetaObj.TargetLine2;
            gsCurrentProperty = gsTargetline2Properties;
            gsCurrentSelectID = targetline2ID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + targetline3ID).click(function () {
            ////// console.log("targetline3ID");
            view.GSItemSetBackgoundColor(targetline3ID);

            gsCurrentMetaObj = gsMetaObj.TargetLine3;
            gsCurrentProperty = gsTargetline3Properties;

            gsCurrentSelectID = targetline3ID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + targetline4ID).click(function () {
            ////// console.log("targetline4ID");
            view.GSItemSetBackgoundColor(targetline4ID);

            gsCurrentMetaObj = gsMetaObj.TargetLine4;
            gsCurrentProperty = gsTargetline4Properties;
            gsCurrentSelectID = targetline4ID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + titleID).click(function () {
            ////// console.log("titleID");
            view.GSItemSetBackgoundColor(titleID);

            gsCurrentMetaObj = gsMetaObj.Title;
            gsCurrentProperty = gsTitleProperties;
            gsCurrentSelectID = titleID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + tooltipID).click(function () {
            ////// console.log("tooltipID");
            view.GSItemSetBackgoundColor(tooltipID);

            gsCurrentMetaObj = gsMetaObj.Tooltip;
            gsCurrentProperty = gsTooltipProperties;
            gsCurrentSelectID = tooltipID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + xaxisID).click(function () {
            ////// console.log("xaxisID");
            view.GSItemSetBackgoundColor(xaxisID);

            gsCurrentMetaObj = gsMetaObj.XAxis;
            gsCurrentProperty = gsXaxisProperties;
            gsCurrentSelectID = xaxisID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + y1axisID).click(function () {
            ////// console.log("y1axisID");
            view.GSItemSetBackgoundColor(y1axisID);

            gsCurrentMetaObj = gsMetaObj.Y1Axis;
            gsCurrentProperty = gsY1axisProperties;
            gsCurrentSelectID = y1axisID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + y2axisID).click(function () {
            ////// console.log("y2axisID");
            view.GSItemSetBackgoundColor(y2axisID);

            gsCurrentMetaObj = gsMetaObj.Y2Axis;
            gsCurrentProperty = gsY2axisProperties;
            gsCurrentSelectID = y2axisID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + y3axisID).click(function () {
            ////// console.log("y3axisID");
            view.GSItemSetBackgoundColor(y3axisID);

            gsCurrentMetaObj = gsMetaObj.Y3Axis;
            gsCurrentProperty = gsY3axisProperties;
            gsCurrentSelectID = y3axisID;
            view.GSPropertiesGridUpdate();
        });

        $("#" + y4axisID).click(function () {
            ////// console.log("y4axisID");
            view.GSItemSetBackgoundColor(y4axisID);

            gsCurrentMetaObj = gsMetaObj.Y4Axis;
            gsCurrentProperty = gsY4axisProperties;
            gsCurrentSelectID = y4axisID;
            view.GSPropertiesGridUpdate();
        });
    }

    YTTrendChart.prototype.GSItemSetBackgoundColor = function (id) {
        ////// console.log("GSItemSetBackgoundColor");
        var gsitems = document.getElementsByClassName("general-setting-items");
        for (var i = 0; i < gsitems.length; i++) {
            var li = gsitems[i]
            if (li.id == id) {
                var bgcolor = "#E0ECFF"; //#c0d1cf
                // set backgroundcolor for selected series  
                li.style.backgroundColor = bgcolor;
            }
            else {
                // clear backgroundcolor for selected series
                li.style.backgroundColor = "";
            }
        }
    }

    // refresh properties grid of general setting
    YTTrendChart.prototype.GSPropertiesGridUpdate = function () {
        ////// console.log("GSPropertiesGridUpdate");
        var view = this;
        var gsPropertiesGridID = this._id + "-gsPropertiesGrid";

        // clear redundant color picker <div>
        // var colorpicker = document.getElementsByClassName("sp-container");
        // var parentnode = document.getElementById("xisom-modal")
        // //// console.log("colorpicker: ", colorpicker)
        // if (colorpicker.length > 0) {
        //     for (val of colorpicker) {
        //         if(val!==null){
        //             //// console.log("val: ", val);

        //             parentnode.firstChild.removeChild(val);
        //         }
        //     }
        // }

        //view.selectFontPicker();

        // Apply currentseries properties to the grid
        $('#' + gsPropertiesGridID).jqPropertyGrid(gsCurrentProperty, {
            meta: gsCurrentMetaObj,
            //customTypes: gsCustomType,
            isCollapsible: false,
            sort: false,
            callback: function (grid, name, value) {
                if (!isGSChangedCallback) return;
                isGSChangedCallback = false;

                view.GSChangedCallback(grid, name, value);
                isGSChangedCallback = true;
            }
        });
    }

    var isGSChangedCallback = true;
    YTTrendChart.prototype.GSChangedCallback = function (grid, name, value) {
        ////// console.log("GSChangedCallback");
        var view = this;

        ////// console.log("itemid: " + gsCurrentSelectID, "name: " + name, "value: "+ value );

        var appearanceID = view.id + "-gsAppearance";
        var gridID = view.id + "-gsGrid";
        var legendID = view.id + "-gsLegend";
        var targetline1ID = view.id + "-gsTargetline1";
        var targetline2ID = view.id + "-gsTargetline2";
        var targetline3ID = view.id + "-gsTargetline3";
        var targetline4ID = view.id + "-gsTargetline4";
        var titleID = view.id + "-gsTitle";
        var tooltipID = view.id + "-gsTooltip";
        var xaxisID = view.id + "-gsXaxis";
        var y1axisID = view.id + "-gsY1axis";
        var y2axisID = view.id + "-gsY2axis";
        var y3axisID = view.id + "-gsY3axis";
        var y4axisID = view.id + "-gsY4axis";

        switch (gsCurrentSelectID) {
            case appearanceID: {
                view.GSAppearanceChangedCallback(grid, name, value);
                break;
            }
            case gridID: {
                view.GSGridChangedCallback(grid, name, value);
                break;
            }
            case legendID: {
                view.GSLegendChangedCallback(grid, name, value);
                break;
            }
            case targetline1ID:
            case targetline2ID:
            case targetline3ID:
            case targetline4ID: {
                view.GSTargetLineChangedCallback(grid, name, value);
                break;
            }
            case titleID: {
                view.GSTitleChangedCallback(grid, name, value);
                break;
            }
            case tooltipID: {
                view.GSTooltipChangedCallback(grid, name, value);
                break;
            }
            case xaxisID: {
                view.GSXaxisChangedCallback(grid, name, value);
                break;
            }
            case y1axisID: {
                view.GSY1axisChangedCallback(grid, name, value);
                break;
            }
            case y2axisID: {
                view.GSY2axisChangedCallback(grid, name, value);
                break;
            }
            case y3axisID: {
                view.GSY3axisChangedCallback(grid, name, value);
                break;
            }
            case y4axisID: {
                view.GSY4axisChangedCallback(grid, name, value);
                break;
            }
        }
    }
    YTTrendChart.prototype.GSAppearanceChangedCallback = function (grid, name, value) {
        ////// console.log("GSAppearanceChangedCallback");

        if (name == 'borderStyle') {
            gsApperanceProperties.borderStyle = value;
        } else if (name == 'backgroundColor') {
            gsApperanceProperties.backgroundColor = value;
        } else if (name == 'areaColor') {
            gsApperanceProperties.areaColor = value;
        }
    }
    YTTrendChart.prototype.GSGridChangedCallback = function (grid, name, value) {
        ////// console.log("GSGridChangedCallback");

        if (name == 'hColor') {
            gsGridProperties.hColor = value;
        } else if (name == 'hCount') {
            if (Number.isNaN(Number(value)) || Number(value) < 1) {
                window.alert("Input is not correct!");
            } else {
                gsGridProperties.hCount = value;
            }
        } else if (name == 'hVisible') {
            gsGridProperties.hVisible = value
        } else if (name == 'vColor') {
            gsGridProperties.vColor = value;
        } else if (name == 'vCount') {
            if (Number.isNaN(Number(value)) || Number(value) < 1) {
                window.alert("Input is not correct!");
            } else {
                gsGridProperties.vCount = value;
            }
        } else if (name == 'vVisible') {
            gsGridProperties.vVisible = value;
        }
    }
    YTTrendChart.prototype.GSLegendChangedCallback = function (grid, name, value) {
        ////// console.log("GSLegendChangedCallback");

        if (name == 'backgroundColor') {
            gsLegendProperties.backgroundColor = value;
        } else if (name == 'position') {
            gsLegendProperties.position = value;
        } else if (name == 'textColor') {
            gsLegendProperties.textColor = value;
        } else if (name == 'visible') {
            gsLegendProperties.visible = value;
        } else if (name == 'width') {
            gsLegendProperties.width = value;
        } else if (name == 'height') {
            gsLegendProperties.height = value;
        }

    }
    YTTrendChart.prototype.GSTargetLineChangedCallback = function (grid, name, value) {
        ////// console.log("GSTargetLineChangedCallback");
        var view = this;

        var targetline1ID = view.id + "-gsTargetline1";
        var targetline2ID = view.id + "-gsTargetline2";
        var targetline3ID = view.id + "-gsTargetline3";
        var targetline4ID = view.id + "-gsTargetline4";

        var properties = null;
        switch (gsCurrentSelectID) {
            case targetline1ID: {
                properties = gsTargetline1Properties;
                break;
            }
            case targetline2ID: {
                properties = gsTargetline2Properties;
                break;
            }
            case targetline3ID: {
                properties = gsTargetline3Properties;
                break;
            }
            case targetline4ID: {
                properties = gsTargetline4Properties;
                break;
            }
        }

        if (name == 'axis') {
            properties.axis = value;
        } else if (name == 'color') {
            properties.color = value;
        } else if (name == 'name') {
            properties.name = value;
        } else if (name == 'namePosition') {
            properties.namePosition = value;
        } else if (name == 'style') {
            properties.style = value;
        } else if (name == 'value') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                properties.value = parseInt(value);
            }
        } else if (name == 'width') {
            if (Number.isNaN(Number(value)) || Number(value) < 0) {
                window.alert("Input is not correct!");
            } else {
                properties.width = parseInt(value);
            }
        } else if (name == 'visible') {
            properties.visible = value;
        }
    }
    YTTrendChart.prototype.GSTitleChangedCallback = function (grid, name, value) {
        ////// console.log("GSTitleChangedCallback");
        if (name == 'name') {
            gsTitleProperties.name = value;
        } else if (name == 'color') {
            gsTitleProperties.color = value;
        } else if (name == 'font') {
            var font = value.split(':')[0];
            var size = parseInt(value.split(':')[1]);
            if (size < gsTitleProperties.height) {
                gsTitleProperties.font = value;
            } else {
                gsTitleProperties.font = font + ":" + gsTitleProperties.height;
            }
        } else if (name == 'visible') {
            gsTitleProperties.visible = value;
        } else if (name == 'width') {
            gsTitleProperties.width = value;
        } else if (name == 'height') {
            gsTitleProperties.height = value;
        }
    }
    YTTrendChart.prototype.GSTooltipChangedCallback = function (grid, name, value) {
        ////// console.log("GSTooltipChangedCallback");

        if (name == 'type') {
            gsTooltipProperties.type = value;
        } else if (name == 'visible') {
            gsTooltipProperties.visible = value;
        }
    }
    YTTrendChart.prototype.GSXaxisChangedCallback = function (grid, name, value) {
        ////// console.log("GSXaxisChangedCallback");

        if (name == 'name') {
            gsXaxisProperties.name = value;
        } else if (name == 'color') {
            gsXaxisProperties.color = value;
        } else if (name == 'font') {
            gsXaxisProperties.font = value;
        } else if (name == 'labelColor') {
            gsXaxisProperties.labelColor = value;
        } else if (name == 'labelFont') {
            gsXaxisProperties.labelFont = value;
        } else if (name == 'axiscolor') {
            gsXaxisProperties.axiscolor = value;
        } else if (name == 'isreversed') {
            gsXaxisProperties.isreversed = value;
        }
    }
    YTTrendChart.prototype.GSY1axisChangedCallback = function (grid, name, value) {
        ////// console.log("GSY1axisChangedCallback");

        if (name == 'name') {
            gsY1axisProperties.name = value;
        } else if (name == 'color') {
            gsY1axisProperties.color = value;
        } else if (name == 'font') {
            gsY1axisProperties.font = value;
        } else if (name == 'labelColor') {
            gsY1axisProperties.labelColor = value;
        } else if (name == 'labelFont') {
            gsY1axisProperties.labelFont = value;
        } else if (name == 'maximum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY1axisProperties.maximum = value;
            }
        } else if (name == 'minimum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY1axisProperties.minimum = value;
            }
        } else if (name == 'axiscolor') {
            gsY1axisProperties.axiscolor = value;
        } else if (name == 'position') {
            gsY1axisProperties.position = value;
        } else if (name == 'labelFormatter') {
            if (this.VerifyFormater(value) == true) {
                gsY1axisProperties.labelFormatter = value;
            }
            else {
                window.alert("Input formatter is not correct!");
            }
        }
    }
    YTTrendChart.prototype.GSY2axisChangedCallback = function (grid, name, value) {
        //////// console.log("GSY2axisChangedCallback"); 

        if (name == 'name') {
            gsY2axisProperties.name = value;
        } else if (name == 'color') {
            gsY2axisProperties.color = value;
        } else if (name == 'font') {
            gsY2axisProperties.font = value;
        } else if (name == 'labelColor') {
            gsY2axisProperties.labelColor = value;
        } else if (name == 'labelFont') {
            gsY2axisProperties.labelFont = value;
        } else if (name == 'maximum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY2axisProperties.maximum = value;
            }
        } else if (name == 'minimum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY2axisProperties.minimum = value;
            }
        } else if (name == 'visible') {
            gsY2axisProperties.visible = value;
        } else if (name == 'axiscolor') {
            gsY2axisProperties.axiscolor = value;
        } else if (name == 'position') {
            gsY2axisProperties.position = value;
        } else if (name == 'labelFormatter') {
            if (this.VerifyFormater(value) == true) {
                gsY2axisProperties.labelFormatter = value;
            }
            else {
                window.alert("Input formatter is not correct!");
            }
        }
    }
    YTTrendChart.prototype.GSY3axisChangedCallback = function (grid, name, value) {
        //////// console.log("GSY3axisChangedCallback"); 

        if (name == 'name') {
            gsY3axisProperties.name = value;
        } else if (name == 'color') {
            gsY3axisProperties.color = value;
        } else if (name == 'font') {
            gsY3axisProperties.font = value;
        } else if (name == 'labelColor') {
            gsY3axisProperties.labelColor = value;
        } else if (name == 'labelFont') {
            gsY3axisProperties.labelFont = value;
        } else if (name == 'maximum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY3axisProperties.maximum = value;
            }
        } else if (name == 'minimum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY3axisProperties.minimum = value;
            }
        } else if (name == 'visible') {
            gsY3axisProperties.visible = value;
        } else if (name == 'axiscolor') {
            gsY3axisProperties.axiscolor = value;
        } else if (name == 'position') {
            gsY3axisProperties.position = value;
        } else if (name == 'labelFormatter') {
            if (this.VerifyFormater(value) == true) {
                gsY3axisProperties.labelFormatter = value;
            }
            else {
                window.alert("Input formatter is not correct!");
            }
        }
    }
    YTTrendChart.prototype.GSY4axisChangedCallback = function (grid, name, value) {
        //////// console.log("GSY4axisChangedCallback"); 

        if (name == 'name') {
            gsY4axisProperties.name = value;
        } else if (name == 'color') {
            gsY4axisProperties.color = value;
        } else if (name == 'font') {
            gsY4axisProperties.font = value;
        } else if (name == 'labelColor') {
            gsY4axisProperties.labelColor = value;
        } else if (name == 'labelFont') {
            gsY4axisProperties.labelFont = value;
        } else if (name == 'maximum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY4axisProperties.maximum = value;
            }
        } else if (name == 'minimum') {
            if (Number.isNaN(Number(value))) {
                window.alert("Input is not correct!");
            } else {
                gsY4axisProperties.minimum = value;
            }

        } else if (name == 'visible') {
            gsY4axisProperties.visible = value;
        } else if (name == 'axiscolor') {
            gsY4axisProperties.axiscolor = value;
        } else if (name == 'position') {
            gsY4axisProperties.position = value;
        } else if (name == 'labelFormatter') {
            if (this.VerifyFormater(value) == true) {
                gsY4axisProperties.labelFormatter = value;
            }
            else {
                window.alert("Input formatter is not correct!");
            }
        }
    }
    YTTrendChart.prototype.VerifyFormater = function (value) {
        if (value.IsNullOrEmpty) return false;

        if (value.split(',').length != 2) return false;
        var leftpart = value.split(',')[0];
        var rightpart = value.split(',')[1];

        var left = leftpart.replace(/[^0-9]/, "");
        if (left.length != leftpart.length) return false;
        if (left.length > 1) return false;

        var right = rightpart.replace(/[^0-9]/, "");
        if (right.length != rightpart.length) return false;
        if (right.length > 1) return false;

        return true;
    }
    // Apply changes of General Setting
    YTTrendChart.prototype.GSApplySetting = function () {
        // console.log("GSApplySetting");
        var view = this;
        var grid = view.getGrid();
        var appearence = view.getAppearance();
        var title = view.getTitle();
        var legend = view.getLegend();
        var tooltip = view.getTooltip();
        var xaxis = view.getXaxis();
        var y1axis = view.getY1axis();
        var y2axis = view.getY2axis();
        var y3axis = view.getY3axis();
        var y4axis = view.getY4axis();
        var tl1 = view.getTargetLine().targetline1;
        var tl2 = view.getTargetLine().targetline2;
        var tl3 = view.getTargetLine().targetline3;
        var tl4 = view.getTargetLine().targetline4;

        var font = null;
        var italic = false;
        var family = "";
        var variant = "";
        var weight = 10;

        // Apply Appearance
        appearence.foregroundColor = gsApperanceProperties.areaColor;
        appearence.backgroundColor = gsApperanceProperties.backgroundColor;
        appearence.borderStyle = gsApperanceProperties.borderStyle;
        ////////////////////////////////////////////////////////////

        // Apply Grid
        // X Grid
        grid.vcolor = gsGridProperties.vColor;
        grid.vvisible = gsGridProperties.vVisible;
        grid.vcount = parseInt(gsGridProperties.vCount);
        // Y Grid
        grid.hcolor = gsGridProperties.hColor;
        grid.hvisible = gsGridProperties.hVisible;
        grid.hcount = parseInt(gsGridProperties.hCount);
        // Y2 Grid
        grid.hcolor = gsGridProperties.hColor;
        grid.hvisible = gsGridProperties.hVisible;
        grid.hcount = parseInt(gsGridProperties.hCount);
        // Y3 Grid
        grid.hcolor = gsGridProperties.hColor;
        grid.hvisible = gsGridProperties.hVisible;
        grid.hcount = parseInt(gsGridProperties.hCount);
        // Y4 Grid
        grid.hcolor = gsGridProperties.hColor;
        grid.hvisible = gsGridProperties.hVisible;
        grid.hcount = parseInt(gsGridProperties.hCount);
        ////////////////////////////////////////////////////////////

        // Apply Legend
        legend.textColor = gsLegendProperties.textColor;
        legend.position = gsLegendProperties.position;
        legend.visible = gsLegendProperties.visible;
        legend.width = parseInt(gsLegendProperties.width);
        legend.height = parseInt(gsLegendProperties.height);
        ////////////////////////////////////////////////////////////

        // Apply TargetLine
        // TargetLine1
        tl1.axis = gsTargetline1Properties.axis;
        tl1.color = gsTargetline1Properties.color;
        tl1.name = gsTargetline1Properties.name;
        tl1.namepos = gsTargetline1Properties.namePosition;
        tl1.style = gsTargetline1Properties.style;
        tl1.value = gsTargetline1Properties.value;
        tl1.width = gsTargetline1Properties.width;
        tl1.visible = gsTargetline1Properties.visible
        // TargetLine2
        tl2.axis = gsTargetline2Properties.axis;
        tl2.color = gsTargetline2Properties.color;
        tl2.name = gsTargetline2Properties.name;
        tl2.namepos = gsTargetline2Properties.namePosition;
        tl2.style = gsTargetline2Properties.style;
        tl2.value = gsTargetline2Properties.value;
        tl2.width = gsTargetline2Properties.width;
        tl2.visible = gsTargetline2Properties.visible
        // TargetLine3
        tl3.axis = gsTargetline3Properties.axis;
        tl3.color = gsTargetline3Properties.color;
        tl3.name = gsTargetline3Properties.name;
        tl3.namepos = gsTargetline3Properties.namePosition;
        tl3.style = gsTargetline3Properties.style;
        tl3.value = gsTargetline3Properties.value;
        tl3.width = gsTargetline3Properties.width;
        tl3.visible = gsTargetline3Properties.visible
        // TargetLine4
        tl4.axis = gsTargetline4Properties.axis;
        tl4.color = gsTargetline4Properties.color;
        tl4.name = gsTargetline4Properties.name;
        tl4.namepos = gsTargetline4Properties.namePosition;
        tl4.style = gsTargetline4Properties.style;
        tl4.value = gsTargetline4Properties.value;
        tl4.width = gsTargetline4Properties.width;
        tl4.visible = gsTargetline4Properties.visible
        ////////////////////////////////////////////////////////////

        // Apply Title
        title.text = gsTitleProperties.name;

        font = gsTitleProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '30';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        title.font.name = family;
        title.font.size = weight;
        title.font.italic = italic;
        title.textColor = gsTitleProperties.color;
        title.visible = gsTitleProperties.visible;
        title.width = gsTitleProperties.width;
        title.height = gsTitleProperties.height;
        ////////////////////////////////////////////////////////////

        // Apply tooltip
        tooltip.type = gsTooltipProperties.type;
        tooltip.visible = gsTooltipProperties.visible;
        ////////////////////////////////////////////////////////////

        // Apply XAxis
        xaxis.title.text = gsXaxisProperties.name;

        var font = gsXaxisProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '30';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        xaxis.title.textColor = gsXaxisProperties.color;

        xaxis.title.font.name = family;
        xaxis.title.font.size = weight;
        xaxis.title.font.italic = italic;
        var font = gsXaxisProperties.labelFont.split(':'),
            family = font[0],
            variant = font[1] || '10';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        xaxis.label.font.name = family;
        xaxis.label.font.size = weight;
        xaxis.label.font.italic = italic;
        xaxis.label.textColor = gsXaxisProperties.labelColor;
        xaxis.line.lineColor = gsXaxisProperties.axiscolor;
        xaxis.isReversed = gsXaxisProperties.isreversed;
        ////////////////////////////////////////////////////////////

        // Apply Y1Axis
        y1axis.title.text = gsY1axisProperties.name;
        font = gsY1axisProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '20';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y1axis.title.font.name = family;
        y1axis.title.font.size = weight;
        y1axis.title.font.italic = italic;
        y1axis.title.textColor = gsY1axisProperties.color;

        font = gsY1axisProperties.labelFont.split(':'),
            family = font[0],
            variant = font[1] || '10';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y1axis.label.font.name = family;
        y1axis.label.font.size = weight;
        y1axis.label.font.italic = italic;
        y1axis.label.textColor = gsY1axisProperties.labelColor;
        y1axis.maxValue = Number(gsY1axisProperties.maximum);
        y1axis.minValue = Number(gsY1axisProperties.minimum);
        y1axis.position = gsY1axisProperties.position;
        y1axis.line.lineColor = gsY1axisProperties.axiscolor;
        y1axis.format.format = gsY1axisProperties.labelFormatter;

        ////////////////////////////////////////////////////////////

        // Apply Y2Axis        
        y2axis.title.text = gsY2axisProperties.name;
        font = gsY2axisProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '20';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y2axis.title.font.name = family;
        y2axis.title.font.size = weight;
        y2axis.title.font.italic = italic;
        y2axis.title.textColor = gsY2axisProperties.color;

        font = gsY2axisProperties.labelFont.split(':'),
            family = font[0],
            variant = font[1] || '10';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y2axis.label.font.name = family;
        y2axis.label.font.size = weight;
        y2axis.label.font.italic = italic;
        y2axis.label.textColor = gsY2axisProperties.labelColor;
        y2axis.maxValue = Number(gsY2axisProperties.maximum);
        y2axis.minValue = Number(gsY2axisProperties.minimum);
        y2axis.visible = gsY2axisProperties.visible;
        y2axis.position = gsY2axisProperties.position;
        y2axis.line.lineColor = gsY2axisProperties.axiscolor;
        y2axis.format.format = gsY2axisProperties.labelFormatter;
        ////////////////////////////////////////////////////////////

        // Apply Y3Axis        
        y3axis.title.text = gsY3axisProperties.name;
        font = gsY3axisProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '20';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y3axis.title.font.name = family;
        y3axis.title.font.size = weight;
        y3axis.title.font.italic = italic;
        y3axis.title.textColor = gsY3axisProperties.color;

        font = gsY3axisProperties.labelFont.split(':'),
            family = font[0],
            variant = font[1] || '10';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y3axis.label.font.name = family;
        y3axis.label.font.size = weight;
        y3axis.label.font.italic = italic;
        y3axis.label.textColor = gsY3axisProperties.labelColor;
        y3axis.maxValue = Number(gsY3axisProperties.maximum);
        y3axis.minValue = Number(gsY3axisProperties.minimum);
        y3axis.visible = gsY3axisProperties.visible;
        y3axis.position = gsY3axisProperties.position;
        y3axis.line.lineColor = gsY3axisProperties.axiscolor;
        y3axis.format.format = gsY3axisProperties.labelFormatter;
        ////////////////////////////////////////////////////////////

        // Apply Y4Axis        
        y4axis.title.text = gsY4axisProperties.name;
        font = gsY4axisProperties.font.split(':'),
            family = font[0],
            variant = font[1] || '20';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y4axis.title.font.name = family;
        y4axis.title.font.size = weight;
        y4axis.title.font.italic = italic;
        y4axis.title.textColor = gsY4axisProperties.color;

        font = gsY4axisProperties.labelFont.split(':'),
            family = font[0],
            variant = font[1] || '10';
        weight = parseInt(variant, 10),
            italic = /i$/.test(variant);
        y4axis.label.font.name = family;
        y4axis.label.font.size = weight;
        y4axis.label.font.italic = italic;
        y4axis.label.textColor = gsY4axisProperties.labelColor;
        y4axis.maxValue = Number(gsY4axisProperties.maximum);
        y4axis.minValue = Number(gsY4axisProperties.minimum);
        y4axis.visible = gsY4axisProperties.visible;
        y4axis.position = gsY4axisProperties.position;
        y4axis.line.lineColor = gsY4axisProperties.axiscolor;
        y4axis.format.format = gsY4axisProperties.labelFormatter;
        ////////////////////////////////////////////////////////////

        ////// console.log("y1axis", y1axis);

        view.reInitChart();
    }
    //////////////////////////////////////////////////////////////////////////////////////


    YTTrendChart.prototype.test = function () {

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
        if (view.reqLimitPoint < itemCount) {
            sIdx = itemCount - view.reqLimitPoint;
        }

        data.items = data.items.slice(sIdx, eIdx);

        this.setValueByViewData(data);

        var view = this;
        setTimeout(function () {
            view.test();
        }, 100);
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// CHART EVENTS
    ////////////////////////////////////////////////////////////////////////////////
    YTTrendChart.prototype.addEventListener = function (type, callback, useCapture) {
        page.getElementById(this._id).addEventListener(type, callback, useCapture);
    };

    YTTrendChart.prototype.removeEventListener = function (type, callback, useCapture) {
        page.getElementById(this._id).removeEventListener(type, callback, useCapture);
    };

    // Init Zoom event, Space key press event for chart
    YTTrendChart.prototype.InitEvent = function () {
        var view = this;
        // Init mouse wheel event for zoom
        document.getElementById(view.id).addEventListener("wheel", function (evt) {

            if (evt.shiftKey == true) {
                view.ZoomYProcessing(evt);
            }
            else {
                view.ZoomXProcessing(evt);
            }
        });

        // Init space keypress for IsLive button
        $(document).keydown(function (e) {
            if (e.keyCode == 32) { // Space Key code is 32 ref: https://keycode.info/
                view.toolbarByLive();
            }
        });
    }

    //chart 초기화
    YTTrendChart.prototype.initChart = function () {
        var el = $("#" + this._id)[0];

        var chart = this.getChart();
        var option = this.options();

        if (chart == null) {
            var newchart = echarts.init(el);
            newchart.handlers$1;
            newchart.setOption(option);
            this.setChart(newchart);
        } else {
            chart.setOption(option);
        }
    }

    // Update position of YnAxis when adjust the position
    YTTrendChart.prototype.AxisUpdatePosition = function () {
        // console.log("AxisUpdatePosition");
        var view = this;
        var width = this.width;
        var height = this.height;

        this.axisposleft = 0;
        this.axisposright = 0;

        var y1axis = view.getY1axis();
        var y2axis = view.getY2axis();
        var y3axis = view.getY3axis();
        var y4axis = view.getY4axis();

        var option = this.options();
        var optY1axis = option.yAxis[0];
        var optY2axis = option.yAxis[1];
        var optY3axis = option.yAxis[2];
        var optY4axis = option.yAxis[3];

        var distance = 40;
        var sizerate = 0.45;
        var titlerate = 2;
        var isFirstLeft = false;
        var firstLeftVal = 0;
        var isFirstRight = false;
        var firstRightVal = 0;
        var leftcount = 0;
        var rightcount = 0;

        var lHideVal = 0;
        var rHideVal = 0;
        var labelAdjust = 30;

        if (y1axis.visible == true) {
            var labelwidth = y1axis.label.length * Number(y1axis.label.font.size) * sizerate;
            var titleheight = Number(y1axis.title.font.size) / titlerate;

            if (labelwidth > 0) {
                optY1axis.nameGap = labelwidth + titleheight / 4;
            }
            if (y1axis.position == 'Left') {
                optY1axis.position = 'left';
                optY1axis.nameRotate = 90;
                this.axisposleft = labelwidth + titleheight;
                if (isFirstLeft == false) {
                    isFirstLeft = true;
                    firstLeftVal = labelwidth + titleheight;
                }
                leftcount++;
            } else {
                optY1axis.position = 'right';
                optY1axis.nameRotate = 270;
                this.axisposright = labelwidth + titleheight;

                if (isFirstRight == false) {
                    isFirstRight = true;
                    firstRightVal = labelwidth + titleheight;
                }
                rightcount++;
            }
            optY1axis.offset = 0;
        }

        if (y2axis.visible == true) {
            var labelwidth = y2axis.label.length * Number(y2axis.label.font.size) * sizerate;
            var titleheight = Number(y2axis.title.font.size) / titlerate;

            if (labelwidth > 0) {
                optY2axis.nameGap = labelwidth + titleheight / 4;
            }
            if (y2axis.position == 'Left') {
                optY2axis.position = 'left';
                optY2axis.nameRotate = 90;
                optY2axis.offset = this.axisposleft + distance * leftcount;
                this.axisposleft += (labelwidth + titleheight);

                if (isFirstLeft == false) {
                    isFirstLeft = true;
                    firstLeftVal = labelwidth + titleheight;
                }
                leftcount++;
            } else {
                optY2axis.position = 'right';
                optY2axis.nameRotate = 270;
                optY2axis.offset = this.axisposright + distance * rightcount;
                this.axisposright += (labelwidth + titleheight);

                if (isFirstRight == false) {
                    isFirstRight = true;
                    firstRightVal = labelwidth + titleheight;
                }
                rightcount++;
            }
        }
        else {
            // optY2axis = [];
            var labelwidth2 = 0;
            var titleheight2 = Number(y2axis.title.font.size) / titlerate;

            optY2axis.offset = 0;
            if (y2axis.position == 'Left') {
                lHideVal += (labelwidth2 + titleheight2 + labelAdjust);
            } else {
                rHideVal += (labelwidth2 + titleheight2 + labelAdjust);
            }
        }

        if (y3axis.visible == true) {
            var labelwidth = y3axis.label.length * Number(y3axis.label.font.size) * sizerate;
            var titleheight = Number(y3axis.title.font.size) / titlerate;

            if (labelwidth > 0) {
                optY3axis.nameGap = labelwidth + titleheight / 4;

            }
            if (y3axis.position == 'Left') {
                optY3axis.position = 'left';
                optY3axis.nameRotate = 90;
                optY3axis.offset = this.axisposleft + distance * leftcount;
                this.axisposleft += (labelwidth + titleheight);

                if (isFirstLeft == false) {
                    isFirstLeft = true;
                    firstLeftVal = labelwidth + titleheight;
                }
                leftcount++;
            } else {
                optY3axis.position = 'right';
                optY3axis.nameRotate = 270;
                optY3axis.offset = this.axisposright + distance * rightcount;
                this.axisposright += (labelwidth + titleheight);

                if (isFirstRight == false) {
                    isFirstRight = true;
                    firstRightVal = labelwidth + titleheight;
                }
                rightcount++;
            }
        }
        else {
            // optY3axis = [];
            let labelwidth3 = 0;
            let titleheight3 = Number(y3axis.title.font.size) / titlerate;
            optY3axis.offset = 0;
            if (y3axis.position == 'Left') {
                lHideVal += (labelwidth3 + titleheight3 + labelAdjust);
            } else {
                rHideVal += (labelwidth3 + titleheight3 + labelAdjust);
            }
        }

        if (y4axis.visible == true) {
            var labelwidth = y4axis.label.length * Number(y4axis.label.font.size) * sizerate;
            var titleheight = Number(y4axis.title.font.size) / titlerate;

            if (labelwidth > 0) {
                optY4axis.nameGap = labelwidth + titleheight / 4;
            }

            if (y4axis.position == 'Left') {
                optY4axis.position = 'left';
                optY4axis.nameRotate = 90;
                optY4axis.offset = this.axisposleft + distance * leftcount;
                this.axisposleft += (labelwidth + titleheight);

                if (isFirstLeft == false) {
                    isFirstLeft = true;
                    firstLeftVal = labelwidth + titleheight;
                }
                leftcount++;
            } else {
                optY4axis.position = 'right';
                optY4axis.nameRotate = 270;
                optY4axis.offset = this.axisposright + distance * rightcount;
                this.axisposright += (labelwidth + titleheight);

                if (isFirstRight == false) {
                    isFirstRight = true;
                    firstRightVal = labelwidth + titleheight;
                }
                rightcount++;
            }
        }
        else {
            // optY4axis = [];
            var labelwidth4 = 0;
            var titleheight4 = Number(y4axis.title.font.size) / titlerate;

            optY4axis.offset = 0;
            if (y4axis.position == 'Left') {
                lHideVal += (labelwidth4 + titleheight4 + labelAdjust);
            } else {
                rHideVal += (labelwidth4 + titleheight4 + labelAdjust);
            }
        }

        var ogrid = option.grid;
        if (this.axisposleft > firstLeftVal) {
            ogrid.left = this.axisposleft * 100 / width;
        } else {
            if (firstLeftVal > 0) {
                ogrid.left = firstLeftVal * 100 / width;
            } else {
                ogrid.left = (distance - 20) * 100 / width;
            }
        }

        if (this.axisposright > firstRightVal) {
            ogrid.right = this.axisposright * 100 / width;
        } else {
            if (firstRightVal > 0) {
                ogrid.right = firstRightVal * 100 / width;
            } else {
                ogrid.right = (distance - 20) * 100 / width;
            }
        }

        ogrid.left = Number(ogrid.left) - (lHideVal * 100 / width) + '%';
        ogrid.right = Number(ogrid.right) - (rHideVal * 100 / width) + '%';

        var chart = this.getChart();
        chart.setOption(option, true);
    }


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// CHART SCRIPT
    ////////////////////////////////////////////////////////////////////////////////

    Object.defineProperty(YTTrendChart.prototype, "refreshTime", {
        get: function () {
            return this.getRefreshTime();
        },
        set: function (value) {
            this.setRefreshTime(value)
        }
    });
    Object.defineProperty(YTTrendChart.prototype, "spanTime", {
        get: function () {
            return this.getTimeSpan();
        },
        set: function (value) {
            this.setTimeSpan(value);
        }
    });
    Object.defineProperty(YTTrendChart.prototype, "showToolbar", {
        get: function () {
            return this.getShowToolbar();
        },
        set: function (value) {
            this.setShowToolbar(value);
        }
    });
    YTTrendChart.prototype.isLivePress = function () {
        this.toolbarByLive();
    }
    YTTrendChart.prototype.xZoomIn = function () {
        this.toolbarByXZoomIn();
    }
    YTTrendChart.prototype.xZoomOut = function () {
        this.toolbarByXZoomOut();
    }
    YTTrendChart.prototype.yZoomIn = function () {
        this.toolbarByYZoomIn();
    }
    YTTrendChart.prototype.yZoomOut = function () {
        this.toolbarByYZoomOut();
    }
    YTTrendChart.prototype.exportSetting = function (name) {
        this.exportSettingOperation(name);
    }
    YTTrendChart.prototype.importSetting = function (name) {
        this.importSettingOperation(name);
    }
    YTTrendChart.prototype.backwardSecond = function () {
        this.toolbarByBackward();
    }
    YTTrendChart.prototype.forwardSecond = function () {
        this.toolbarByForward();
    }
    YTTrendChart.prototype.backwardMinute = function () {
        this.toolbarByPrev();
    }
    YTTrendChart.prototype.forwardMinute = function () {
        this.toolbarByNext();
    }
    YTTrendChart.prototype.timeSelection = function (endtime, interval) {
        var islive = this.getIsLive();
        if (islive == true) return;
        if (endtime == null || interval == 0) {
            this.toolbarByTimeSelectionClick();
        } else {
            this.setTimeSpan(interval);
            this.setEndTime(endtime);
            this.setStartTime();
            this.doViewData();
        }
    }
    YTTrendChart.prototype.exportToCSV = function () {
        this.toolbarByFile();
    }
    YTTrendChart.prototype.exportToPNG = function () {
        this.toolbarByImage();
    }

    function Appearance(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Appearance.prototype, "backgroundColor", {
            get: function () {
                return owner.ytappearance.backgroundColor;
            },
            set: function (value) {
                owner.ytappearance.backgroundColor = value;
            },
            configurable: true
        });

        Object.defineProperty(Appearance.prototype, "foregroundColor", {
            get: function () {
                return owner.ytappearance.foregroundColor;
            },
            set: function (value) {
                owner.ytappearance.foregroundColor = value;
            },
            configurable: true
        });

        Object.defineProperty(Appearance.prototype, "borderStyle", {
            get: function () {
                return owner.ytappearance.borderStyle
            },
            set: function (value) {
                owner.ytappearance.borderStyle = value;
            },
            configurable: true
        });
    }
    function Title(owner, arg) {
        this.owner = owner;
    }
    function Legend(owner, arg) {
        this.owner = owner;
    }
    function Grid(owner, arg) {
        this.owner = owner;
    }
    function TooltipView(owner, arg) {
        this.owner = owner;
    }
    function Line1(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Line1.prototype, "name", {
            get: function () {
                return "Name of Line1";
            },
            set: function (value) {
                console.log("Set Name of Line1");
            },
            configurable: true
        });

        Object.defineProperty(Line1.prototype, "namePosition", {
            get: function () {
                return "Name of Line1";
            },
            set: function (value) {
                console.log("Set Name of Line1");
            },
            configurable: true
        });

    }
    function Line2(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Line2.prototype, "name", {
            get: function () {
                return "Name of Line2";
            },
            set: function (value) {
                console.log("Set Name of Line2");
            },
            configurable: true
        });

        Object.defineProperty(Line2.prototype, "namePosition", {
            get: function () {
                return "Name of Line2";
            },
            set: function (value) {
                console.log("Set Name of Line2");
            },
            configurable: true
        });
    }
    function TargetLine(owner, arg) {
        this.owner = owner;
        this.name = "TargetLine";
        // console.log(arg);
        this.lines = [];
        this.line1 = null;
        this.line2 = null;
        this.line3 = null;
        this.line4 = null;
        CreateTargetLine(owner, arg);

        function CreateTargetLine(owner, arg) {
            var line1 = new Line1(owner, arg.targetline1);
            this.lines.push(line1);
            this.line1 = line1;

            var line2 = new Line2(owner, arg.targetline2);
            this.lines.push(line2);
            this.line2 = line2;

            // var line3 = new Line1(owner, arg.targetline1);
            // this.lines.push(line3);

            // var line4 = new Line1(owner, arg.targetline1);
            // this.lines.push(line4);
        }
    }

    function ChartSeries(owner, arg) {
        this.owner = owner;
        this.index = arg.index;

        Object.defineProperty(ChartSeries.prototype, "name", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.name;
            },
            configurable: true
        });

        Object.defineProperty(ChartSeries.prototype, "color", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.color;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.color = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "visible", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.visible;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.line.visible = value;
                item.visible = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "axisExtra", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.axisExtra;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.axisExtra = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "width", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.line.lineWidth;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.line.lineWidth = value;
                item.width = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "tag", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.tag;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.tag = (value == null) ? "None" : value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "type", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.type;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.type = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "markerStyle", {
            get: function () {
                var item = this.owner.ytseries[this.index];
                return item.point.type;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.point.type = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "markerSize", {
            get: function () {

                var item = this.owner.ytseries[this.index];
                return item.point.size;
            },
            set: function (value) {
                var item = this.owner.ytseries[this.index];
                item.point.size = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

    }
    function ChartSeriesCollection(owner, arg) {
        this.owner = owner;
        this.name = "ChartSeriesCollection";
        this.test = null;


        Object.defineProperty(ChartSeriesCollection.prototype, "count", {
            get: function () {
                return this.owner.ytseries.length;
            },
            configurable: true
        });

        ChartSeriesCollection.prototype.add = function (seriesname, seriescolor, seriestag, serieswidth, seriesvisible, axisextra, seriestype, markerstyle, markersize) {
            if (serieswidth == undefined) {
                serieswidth = 1;
            }
            if (seriesvisible == undefined) {
                seriesvisible = true;
            }
            if (axisextra == undefined) {
                axisextra = 0;
            }
            if (seriestype == undefined) {
                seriestype = 3
            }
            if (markerstyle == undefined) {
                markerstyle = 2
            }
            if (markersize == undefined) {
                markersize = 1;
            }

            var ytseries = this.owner.ytseries;
            var count = ytseries.length;
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var item = ytseries[i];
                    if (item.name == seriesname) {
                        return false;
                    }
                }
            }

            var arg = {
                index: count,
                name: seriesname,
                color: seriescolor,
                visible: seriesvisible,
                axisExtra: axisextra,
                width: serieswidth,
                tag: seriestag,
                type: seriestype,
                markerStyle: markerstyle,
                markerSize: markersize
            };
            var item = new ChartSeries(this.owner, arg);
            this.push(item);

            var ytitem = {
                color: seriescolor,
                label: {
                    font: {
                        name: "Tahoma",
                        size: 10,
                        bold: false,
                        italic: false,
                        underline: false
                    },
                    position: "Default",
                    showPercent: false,
                    showValue: false,
                    textColor: "#000000"
                },
                line: {
                    lineColor: seriescolor,
                    lineStyle: "Solid",
                    lineWidth: serieswidth,
                    visible: seriesvisible
                },
                point: {
                    color: seriescolor,
                    size: markersize,
                    visible: true,
                    type: markerstyle
                },
                opacity: 1,
                tag: seriestag,
                axisExtra: axisextra,
                name: seriesname,
                text: "",
                width: serieswidth,
                visible: seriesvisible,
                type: seriestype
            }
            this.owner.ytseries.push(ytitem);
            this.owner.reInitChart();

            return true;
        };

        ChartSeriesCollection.prototype.getSeriesByName = function (name) {
            var count = this.owner.series.length;
            for (var i = 0; i < count; i++) {
                var item = this.owner.series[i];
                if (item.name == name) {
                    return item;
                }
            }
        }

        ChartSeriesCollection.prototype.getSeriesByIndex = function (index) {
            var count = this.owner.series.length;
            if (count == 0 || index < 0 || index >= count) return;
            return this[index];
        }

        ChartSeriesCollection.prototype.getSeries = function () {
            return this;
        }

        ChartSeriesCollection.prototype.delete = function (name) {
            var count = this.length;
            if (count == 0) return false;
            var index = -1;
            for (var i = 0; i < count; i++) {
                var item = this[i];
                if (item.name == name) {
                    index = i;
                    break;
                }
            }

            if (index < 0) return false;
            this.splice(index, 1);
            this.owner.ytseries.splice(index, 1);

            // Update index of ChartSeries
            count = this.length;
            for (var i = 0; i < count; i++) {
                var item = this[i];
                item.index = i;
            }

            this.owner.reInitChart();

            return true;
        }

        ChartSeriesCollection.prototype.clear = function () {
            var count = this.length;
            this.splice(0, count);
            this.owner.ytseries.splice(0, count);
            this.owner.reInitChart();
            return true;
        }


        // console.log(this);
        // this.validate();
    }
    ChartSeriesCollection.prototype = Object.create(Array.prototype);
    ChartSeriesCollection.prototype.validate = function () {
        this.splice(0, this.length);
        var count = this.owner.ytseries.length;
        for (var i = 0; i < count; i++) {
            var item = this.owner.ytseries[i];
            var arg = {
                index: i,
                name: item.name,
                color: item.color,
                visible: item.visible,
                axisExtra: item.axisExtra,
                width: item.width,
                tag: item.tag,
                type: item.type,
                markerStyle: item.markerStyle,
                markerSize: item.markerSize
            };

            var item = new ChartSeries(this.owner, arg);
            this.push(item);
        }
    }

    function XAxis(owner, arg) {
        this.owner = owner;

        Object.defineProperty(XAxis.prototype, "title", {
            get: function () {
                return this.owner.ytxaxis.title.text;
            },
            set: function (value) {
                this.owner.ytxaxis.title.text = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(XAxis.prototype, "isReversed", {
            get: function () {
                return this.owner.ytxaxis.isReversed;
            },
            set: function (value) {
                this.owner.ytxaxis.isReversed = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
    }
    function Y1Axis(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Y1Axis.prototype, "title", {
            get: function () {
                return this.owner.yty1axis.title.text;
            },
            set: function (value) {
                this.owner.yty1axis.title.text = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y1Axis.prototype, "maximum", {
            get: function () {
                return this.owner.yty1axis.maxValue;
            },
            set: function (value) {
                this.owner.yty1axis.maxValue = value;
                this.owner.reInitChart();
            }
            ,
            configurable: true
        });

        Object.defineProperty(Y1Axis.prototype, "minimum", {
            get: function () {
                return this.owner.yty1axis.minValue;
            },
            set: function (value) {
                this.owner.yty1axis.minValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y1Axis.prototype, "position", {
            get: function () {
                return this.owner.yty1axis.position;
            },
            set: function (value) {
                this.owner.yty1axis.position = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y1Axis.prototype, "formatter", {
            get: function () {
                return this.owner.yty1axis.format.format;
            },
            set: function (value) {
                this.owner.yty1axis.format.format = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
    }
    function Y2Axis(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Y2Axis.prototype, "title", {
            get: function () {
                return this.owner.yty2axis.title.text;
            },
            set: function (value) {
                this.owner.yty2axis.title.text = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y2Axis.prototype, "maximum", {
            get: function () {
                return this.owner.yty2axis.maxValue;
            },
            set: function (value) {
                this.owner.yty2axis.maxValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y2Axis.prototype, "minimum", {
            get: function () {
                return this.owner.yty2axis.minValue;
            },
            set: function (value) {
                this.owner.yty2axis.minValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y2Axis.prototype, "position", {
            get: function () {
                return this.owner.yty2axis.position;
            },
            set: function (value) {
                this.owner.yty2axis.position = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y2Axis.prototype, "formatter", {
            get: function () {
                return this.owner.yty2axis.format.format;
            },
            set: function (value) {
                this.owner.yty2axis.format.format = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y2Axis.prototype, "visible", {
            get: function () {
                return this.owner.yty2axis.visible;
            },
            set: function (value) {
                this.owner.yty2axis.visible = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

    }
    function Y3Axis(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Y3Axis.prototype, "title", {
            get: function () {
                return this.owner.yty3axis.title.text;
            },
            set: function (value) {
                this.owner.yty3axis.title.text = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y3Axis.prototype, "maximum", {
            get: function () {
                return this.owner.yty3axis.maxValue;
            },
            set: function (value) {
                this.owner.yty3axis.maxValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y3Axis.prototype, "minimum", {
            get: function () {
                return this.owner.yty3axis.minValue;
            },
            set: function (value) {
                this.owner.yty3axis.minValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y3Axis.prototype, "position", {
            get: function () {
                return this.owner.yty3axis.position;
            },
            set: function (value) {
                this.owner.yty3axis.position = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y3Axis.prototype, "formatter", {
            get: function () {
                return this.owner.yty3axis.format.format;
            },
            set: function (value) {
                this.owner.yty3axis.format.format = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y3Axis.prototype, "visible", {
            get: function () {
                return this.owner.yty3axis.visible;
            },
            set: function (value) {
                this.owner.yty3axis.visible = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
    }
    function Y4Axis(owner, arg) {
        this.owner = owner;

        Object.defineProperty(Y4Axis.prototype, "title", {
            get: function () {
                return this.owner.yty4axis.title.text;
            },
            set: function (value) {
                this.owner.yty4axis.title.text = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y4Axis.prototype, "maximum", {
            get: function () {
                return this.owner.yty4axis.maxValue;
            },
            set: function (value) {
                this.owner.yty4axis.maxValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y4Axis.prototype, "minimum", {
            get: function () {
                return this.owner.yty4axis.minValue;
            },
            set: function (value) {
                this.owner.yty4axis.minValue = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y4Axis.prototype, "position", {
            get: function () {
                return this.owner.yty4axis.position;
            },
            set: function (value) {
                this.owner.yty4axis.position = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y4Axis.prototype, "formatter", {
            get: function () {
                return this.owner.yty4axis.format.format;
            },
            set: function (value) {
                this.owner.yty4axis.format.format = value;
                this.owner.reInitChart();
            },
            configurable: true
        });

        Object.defineProperty(Y4Axis.prototype, "visible", {
            get: function () {
                return this.owner.yty4axis.visible;
            },
            set: function (value) {
                this.owner.yty4axis.visible = value;
                this.owner.reInitChart();
            },
            configurable: true
        });
    }

    YTTrendChart.prototype.InitScript = function (arg) {
        //this.appearance = new Appearance(this, arg.appearance);
        // this.title = new Title(arg.title);
        // this.legend = new Legend(arg.legend);
        // this.grid = new Grid(arg.grid);
        // this.tooltip = new TooltipView(arg.tooltip);
        // this.targetline = new TargetLine(this, arg.targetline);

        this.series = new ChartSeriesCollection(this, arg.series);
        this.series.validate();
        this.xaxis = new XAxis(this, arg.xaxis);
        this.y1axis = new Y1Axis(this, arg.y1axis);
        this.y2axis = new Y2Axis(this, arg.y2axis);
        this.y3axis = new Y3Axis(this, arg.y3axis);
        this.y4axis = new Y4Axis(this, arg.y4axis);
    }

    ///////////////////////
    /// Update the state of series when user click directly on chart to visible or invisible series
    //////////////////////
    YTTrendChart.prototype.LegendSelectChangedHandler = function (params) {
        for (var i = 0; i < this.series.length; i++) {
            var se = this.series[i];
            if (se.name == params.name) {
                se.visible = !se.visible;
            }
        }
    }

    page.createYTTrendChart = function (arg) {
        var view = new YTTrendChart(arg);
        page.protoViews[view.id] = view;

        view.InitScript(arg);

        view.initToolbar();

        view.InitEvent();

        view.initChart();

        // Enable DataZoomSelect at starting
        view.chart.dispatchAction({
            type: 'takeGlobalCursor',
            key: 'dataZoomSelect',
            // Activate or inactivate.
            dataZoomSelectActive: true
        });

        // This event will handle legend select or unselect which will be use to sync the state of a series in SeriesEdit windows
        view.chart.on('legendselectchanged', function (params) {
            view.LegendSelectChangedHandler(params);
        });

        view.AxisFormatter(-1000, 1, 1);

        view.AxisUpdatePosition();

        view.doViewData();

        return view;
    }
})();

