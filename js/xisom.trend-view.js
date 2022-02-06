if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

(function () {

    function TrendView(arg) {
        
        WidgetElement.call(this, arg);

        this.pid = arg.pid;

        this.listView = arg.listView;
        this.trend = arg.trend;

        this._listviewitemcollection = [];
		this._listviewcolumncollection = [];

        this.viewData = null;

        this.headerHeight = 22;
        this.toolbarHeight = 28;

        this.reqLimit = 100;
        this.reqInterval = arg.reqInterval;//sec
        this._startTime = new Date();
    }
    TrendView.prototype = Object.create(WidgetElement.prototype);
    TrendView.prototype.constructor = TrendView;

    TrendView.prototype.setX = function (value) {
        $("#" + this._id + "-view").css("left", value + "px");
        this._x = value;

        this.setAngle(this.getAngle());
    }

    TrendView.prototype.setY = function (value) {
        $("#" + this._id + "-view").css("top", value + "px");
        this._y = value;

        this.setAngle(this.getAngle());
    }

    TrendView.prototype.setWidth = function (value) {
        $("#" + this._id + "-view").css("width", value + "px");
        this._width = value;

        var gridWidth = this.updateGridWidth(value);
        $("#" + this.getGridListID()).closest(".ui-jqgrid-bdiv").height(gridWidth);

        this.setAngle(this.getAngle());
    }

    TrendView.prototype.setHeight = function (value) {
        $("#" + this._id + "-view").css("height", value + "px");
        this._height = value;

        var gridHeight = this.updateGridHeight(value);
        $("#" + this.getGridListID()).closest(".ui-jqgrid-bdiv").height(gridHeight);

        this.setAngle(this.getAngle());
    }

    TrendView.prototype.setAngle = function (value) {
        var rotate = "rotate(" + value + "deg)";
        $("#" + this._id + "-view").css("-ms-transform", rotate);
        $("#" + this._id + "-view").css("-webkit-transform", rotate);
        $("#" + this._id + "-view").css("transform", rotate);
        this._angle = value;
    }

    TrendView.prototype.setOpacity = function (value) {
        $("#" + this._id + "-view").css("opacity", value);
        this._opacity = value;
    }
    
    TrendView.prototype.setVisible = function (value) {
        var visibility = value == true ? "visible" : "hidden";
        // visible id-view object
        $("#" + this._id + "-view").css('visibility', visibility);
        this._visible = visibility;
    }

    TrendView.prototype.setFillStyle = function (value) {
    }

    TrendView.prototype.setFillOpacity = function (value) {
    }

    TrendView.prototype.setStrokeStyle = function (value) {
    }

    TrendView.prototype.setStrokeOpacity = function (value) {
    }

    TrendView.prototype.setBackgroundColor = function (value) {
        $("#" + this._id + "-view").css("background-color", value);
        this._backgroundColor = value;
    }

    TrendView.prototype.setBorderColor = function (value) {
        $("#" + this._id + "-view").css("border-color", value);
        this._borderColor = value;
    }

    TrendView.prototype.setBorderStyle = function (value) {
        if (value == "Simple") {
            $("#" + this._id + "-view").css("border-width", "1px");
            $("#" + this._id + "-view").css("border-style", "solid");
        } else {
            $("#" + this._id + "-view").css("border-width", "0px");
            $("#" + this._id + "-view").css("border-style", "none");
        }
        this.borderStyle = value;
    }

    TrendView.prototype.getTrend = function () {
        return this.trend;
    }

    TrendView.prototype.getIsLive = function () {
        return this.trend.isLive;
    }

    TrendView.prototype.setIsLive = function (value) {
        this.trend.isLive = value;
    }

    TrendView.prototype.getRefreshTime = function () {
        var refreshTime = this.getRequestInterval();
        if (!refreshTime) {
            refreshTime = this.trend.refreshTime;
        }

        refreshTime = refreshTime * 1000;
        return refreshTime;
    }

    TrendView.prototype.setRefreshTime = function (value) {
        this.trend.refreshTime = value;
    }

    TrendView.prototype.getTimeSpan = function () {
        return this.trend.timeSpan;
    }

    TrendView.prototype.setTimeSpan = function (value) {

        if (this.trend.timeSpan == value) return;

        var nowTime = new Date();
        var max = new Date(nowTime.setSeconds(nowTime.getSeconds() - value));
        if (this._startTime > max) {
            this._startTime = max;
        }
        this.trend.timeSpan = value;
    }

    TrendView.prototype.getStartTime = function () {
        var isLive = this.getIsLive();
        if (isLive == false) {
            return this._startTime;
        }

        var nowTime = new Date();
        var startTime = new Date(nowTime.setSeconds(nowTime.getSeconds() - this.getTimeSpan()));
        return startTime;//return startTime.toLocaleString();
    }

    TrendView.prototype.setStartTime = function (value) {
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

    TrendView.prototype.getShowToolbar = function () {
        return this.trend.showToolbar;
    }

    TrendView.prototype.setShowToolbar = function (value) {
        this.trend.showToolbar = value;

        var view = this;
        view.initToolbar();
        view.initGrid();
    }

    TrendView.prototype.getRequestInterval = function () {
        return this.reqInterval;
    }

    TrendView.prototype.getViewData = function () {
        return this.viewData;
    }

    TrendView.prototype.setViewData = function (value) {
        this.viewData = value;
    }

    TrendView.prototype.getListView = function () {
        return this.listView;
    }

    TrendView.prototype.getHeaderHeight = function () {
        var listView = this.getListView();
        return listView.headerHeight > this.headerHeight ? listView.headerHeight : this.headerHeight;
    }

    TrendView.prototype.getToolbarHeight = function () {
        return this.toolbarHeight;
    }

    TrendView.prototype.updateGridHeight = function (value) {
        var listView = this.getListView();
        var headerVisible = listView.headerVisible;

        var headerHeight = 0;
        if (headerVisible == true) {
            headerHeight = this.getHeaderHeight();
        }

        var toolbarVisible = this.getShowToolbar();

        var toolbarHeight = 0;
        if (toolbarVisible == true) {
            toolbarHeight = this.getToolbarHeight();
        }

        var offset = 5;
        return value - headerHeight - toolbarHeight - offset;
    }

    TrendView.prototype.updateGridWidth = function (value) {
        var offset = 4;
        return value - offset;
    }


    TrendView.prototype.toolbarButtonID = function (type) {
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
        else return "";
    }

    TrendView.prototype.initToolbar = function () {
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


        $("#" + trend).hide();
        this.toolbarByDisabled();
    }

    TrendView.prototype.toolbarByDisabled = function () {

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

    TrendView.prototype.toolbarByLive = function () {
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
            this.setStartTime(new Date());
        }

        this.toolbarByDisabled();

        this.doViewData();
    }

    TrendView.prototype.toolbarByZoomIn = function () {
        if (Math.floor(this.getTimeSpan()) <= 1) return;

        //우측-최근
        var timeSpan = this.getTimeSpan();
        this.setTimeSpan(timeSpan / 2)

        timeSpan -= this.getTimeSpan();

        var startTime = this.getStartTime();
        startTime = new Date(startTime.setSeconds(startTime.getSeconds() + timeSpan));
        this.setStartTime(startTime);

        this.doViewData();
    }

    TrendView.prototype.toolbarByZoomOut = function () {
        var timeSpan = this.getTimeSpan();

        var startTime = this.getStartTime();
        startTime = new Date(startTime.setSeconds(startTime.getSeconds() - timeSpan));
        this.setStartTime(startTime);
        this.setTimeSpan(timeSpan * 2);

        this.doViewData();
    }

    TrendView.prototype.toolbarByPrev = function () {
        var startTime = this.getStartTime();

        startTime = new Date(startTime.setSeconds(startTime.getSeconds() - this.getTimeSpan()));
        this.setStartTime(startTime);

        this.doViewData();
    }

    TrendView.prototype.toolbarByBackward = function () {
        var startTime = this.getStartTime();
        startTime = new Date(startTime.setSeconds(startTime.getSeconds() - 1));
        this.setStartTime(startTime);

        this.doViewData();
    }

    TrendView.prototype.toolbarByForward = function () {
        var startTime = this.getStartTime();
        startTime = new Date(startTime.setSeconds(startTime.getSeconds() + 1));
        this.setStartTime(startTime);

        this.doViewData();
    }

    TrendView.prototype.toolbarByNext = function () {
        var startTime = this.getStartTime();
        startTime = new Date(startTime.setSeconds(startTime.getSeconds() + this.getTimeSpan()));
        this.setStartTime(startTime);

        this.doViewData();
    }

    TrendView.prototype.toolbarByClick = function () {

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
                    var startTime = new Date(yyyy, mm-1, dd, hour, min, sec);

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

    TrendView.prototype.toolbarByFile = function () {

        var viewData = this.getViewData();

        var names = viewData.names;
        var items = viewData.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]				
        var namesCount = names.length;
        var itemsCount = items.length;

        // view data의 names 값 - column name
        // header는 text 값으로 출력
        var text = "";
        var header = "";
        for (var k = 0; k < namesCount; k++) {
            //["Time", "Column1", "Column2"]			
            var column = this.columnByName(names[k]);
            if (column == null) continue;

            //["Time", "Data A", "Data B"]			
            var name = this.headerNameByColumn(column);
            header += "," + name;
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

        var filename = "TrendView-" + new Date().format("yyyyMMddHHmmss") + ".csv";
        var blob = new Blob([text], { "type": "application/x-msdownload" });

        this.downloadCanvas(blob, filename);
    }

    TrendView.prototype.downloadCanvas = function (blob, filename) {

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


    TrendView.prototype.columnByName = function (name) {
        var listView = this.getListView();
        var columnsCount = listView.columns.length;

        for (var k = 0; k < columnsCount; k++) {
            var column = listView.columns[k];
            if (!column) continue;
            if (column.name != name) continue;

            return column;
        }
        return null;
    }

    TrendView.prototype.valueByFormat = function (fmt, value) {
        if (fmt == null) return value;

        if (fmt.category == "") {
            if (page.isDate(value) == true) {
                return moment(value).format("YYYY-MM-DD HH:mm:ss.SSS");
            }
            return value;
        }
        return page.valueByFormat(fmt, value);
    }

    TrendView.prototype.clearExistData = function () {
        $("#" + this._id).jqGrid('clearGridData');
    }

    TrendView.prototype.setLargeValueByViewData = function (data) {
        if (data == null) return;

        this.setViewData(data);

        // push data to ListviewItemCollection

        var items = data.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]
        var names = data.names;//["Time", "Analog1", "Analog2"]
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
                if (value != "") value = this.valueByFormat(column.cell.format, value);
                row[name] = value;
            }
            var rowitem = new scada.CreateListViewItem(this, row);
            this.items.push(rowitem);
        }
    }

    TrendView.prototype.setValueByViewData = function (data) {
        if (data == null) return;

        this.setViewData(data);

        var items = data.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]
        var names = data.names;//["Time", "Analog1", "Analog2"]

        var namesCount = names.length;
        var itemsCount = items.length;

        var rows = [];
        var idx = 0;
        for (var i = 0; i < itemsCount; i++) {
            var itemData = items[i];
            if (!itemData) continue;

            var row = {}
            for (var n = 0; n < namesCount; n++) {
                var name = names[n];
                if (!name) continue;

                var column = this.columnByName(name);
                if (column == null) continue;

                var itemValue = itemData[n];
                if (itemValue != "") itemValue = this.valueByFormat(column.cell.format, itemValue);
                row[name] = itemValue;
            }
            rows[idx++] = row;
        }
        return rows;
    }

    TrendView.prototype.setGridRowData = function (data) {
        if (data == null) {
            console.log("TrendView setGridData : data is null");
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

    TrendView.prototype.setGridCell = function (rowid) {

        var listView = this.getListView();

        var rowHeight = listView.rowHeight;

        var columnsCount = listView.columns.length;
        for (var k = 0; k < columnsCount; k++) {
            var column = listView.columns[k];
            if (!column) continue;

            var cell = column.cell;
            var font = cell.font;

            var backgroundColor = this.optionBackgroundColor(cell.backgroundColor);
            var foregroundColor = this.optionForegroundColor(cell.foregroundColor);
            var fontFamily = this.optionFontName(font.name);
            var fontSize = this.optionFontSize(font.size);
            var fontWeight = this.optionFontWeight(font.bold);

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
            $("#" + this._id).jqGrid('setCell', rowid, column.name, "", style);
        }
    }


    //get view-data
    TrendView.prototype.doViewData = function () {
        var isLive = this.getIsLive();
        if (isLive) {
            this.clearExistData();
            this.doViewDataByLive();
        } else {
            this.doViewDataByTrend();
        }
    }

    //get live view-data
    TrendView.prototype.doViewDataByLive = function () {
        if (this.getIsLive() == false) return;

        var view = this;
        var reqTime = this.getRefreshTime();

        var timeSpan = this.getTimeSpan();
        var timeStamp = this.getStartTime();

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
                data.items = data.items.reverse();

                var gridData = view.setValueByViewData(data);
                view.setGridRowData(gridData);//grid 할당

                // view.setLargeValueByViewData(data);
                // view.updateGrid();
            }
            setTimeout(function () {
                view.doViewDataByLive();
            }, reqTime);
        });
    }

    //get trend view-data
    TrendView.prototype.doViewDataByTrend = function () {
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

            view.clearExistData();
            data.items = data.items.reverse();

            // var gridData = view.setValueByViewData(data);
            // view.setGridRowData(gridData);//grid 할당
            
            // using json to update for the large of data
            view.setLargeValueByViewData(data);
            view.updateGrid();
        });
    }

    //get grid data 
    TrendView.prototype.getGridData = function () {
        return $("#" + this._id).jqGrid('getGridParam', 'data');
    }

    //get grid data - idxs	
    TrendView.prototype.getGridDataIDs = function () {
        return $("#" + this._id).jqGrid('getDataIDs');
    }

    //get grid data - idx에대한 row
    TrendView.prototype.getGridRowDataByIdx = function (idx) {
        return $("#" + this._id).jqGrid('getRowData', idx);
    }

    TrendView.prototype.optionFontWeight = function (value) {
        return value == true ? "bold" : "normal";
    }

    TrendView.prototype.optionFontName = function (value) {
        return value == "" ? "Arial" : value;
    }

    TrendView.prototype.optionFontSize = function (value) {
        return value == "" ? 9 : value;
    }

    TrendView.prototype.optionBackgroundColor = function (value) {
        return value == "" ? "#FFFFFF" : value;
    }

    TrendView.prototype.optionForegroundColor = function (value) {
        return value == "" ? "#414141" : value;
    }


    TrendView.prototype.setGridHeader = function () {

        //------------------------ header style
        var listView = this.getListView();

        var headerHeight = this.getHeaderHeight();
        var columnsCount = listView.columns.length;

        for (var i = 0; i < columnsCount; i++) {
            var column = listView.columns[i];
            if (!column) continue;

            var header = column.header;
            var font = header.font;

            var backgroundColor = this.optionBackgroundColor(header.backgroundColor);
            var foregroundColor = this.optionForegroundColor(header.foregroundColor);
            var fontFamily = this.optionFontName(font.name);
            var fontSize = this.optionFontSize(font.size);
            var fontWeight = this.optionFontWeight(font.bold);

            var style = {
                "text-align": header.align.toLowerCase(),
                "vertical-align": header.lineAlign.toLowerCase(),
                "background-color": backgroundColor,
                "color": foregroundColor,
                "font-family": fontFamily,
                "font-size": fontSize + "pt",
                "font-weight": fontWeight,
                "height": headerHeight + "px"
            };
            $("#" + this._id).jqGrid('setLabel', column.name, "", style);
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

    TrendView.prototype.headerNameByColumn = function (column) {
        return column.text == "" ? column.name : column.text;
    }

    TrendView.prototype.initGrid = function () {

        var listView = this.getListView();

        this._listviewitemcollection = scada.CreateListViewItemCollection(this);

        var columndata = [];
        var idx = 0;
        var columnNames = [];
        var columnModel = [];
        var columnsCount = listView.columns.length;
        for (var i = 0; i < columnsCount; i++) {
            var column = listView.columns[i];
            if (!column) continue;

            var cell = column.cell;
            //------------------------ column model
            var model = {
                name: column.name,
                index: column.name,
                width: column.width,
                sortable: false,
                align: cell.align.toLowerCase(),
                editable: false,
                hidden: !column.visible
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
			columndata[idx++] = coldata;
        }

        this._listviewcolumncollection = scada.createListViewColumnCollection(this, columndata);

        var width = this.updateGridWidth(this.getWidth());
        var height = this.updateGridHeight(this.getHeight());

        $("#" + this._id).jqGrid({
            datatype: "local",
            width: width,
            height: height,
            colNames: columnNames,
            colModel: columnModel,
            caption: "",
            multiselect: false,
            shrinkToFit: false,  //가로스크롤
            hidegrid: false, //view expand button hide
            loadonce: true,
            toolbar: [false, "top"],
            gridview: true,
            rowNum: 25,
            scroll: 1
        });

        this.setGridHeader();
    }

    TrendView.prototype.updateGrid = function () {
		if(this._listviewitemcollection.count > 0){
			// Update listview
            var items = this._listviewitemcollection;
            var itemCount = items.length;
			let rows = [];			

			// var idx = 0;
            for(var i = 0; i < itemCount; i++) {
				var item = items[i];
				rows.push(item.rowdata);
            }
			$("#" + this._id).jqGrid('setGridParam', {data: rows}).trigger("reloadGrid");

        }

        // Using this instruction to hide footer "No records to view"
		$('#norecs').hide();
    }
    
    TrendView.prototype.test = function () {
        var view = this;
        var a1 = 0;
        var b1 = 0;
        var temp = [];
        for (var i = 1; i < 1000; i++) {
            var datetime = new Date();
            var time = moment(datetime.setSeconds(datetime.getSeconds() + i));
            a1 = Math.floor(Math.random() * 100) + 90;
            b1 = Math.floor(Math.random() * 80) + 20;
            c1 = Math.floor(Math.random() * 90) + 90;

            var item = [];
            item.push(time);
            item.push(a1);
            item.push(b1);

            temp.push(item);
        }

        var data = {
            names: ["column1", "column2", "column3"],
            items: temp
        }

        var itemCount = data.items.length;
        var sIdx = 0;
        var eIdx = itemCount - 1;
        if (view.reqLimit < itemCount) {
            sIdx = itemCount - view.reqLimit;
        }

        data.items = data.items.slice(sIdx, eIdx);
        data.items = data.items.reverse();

        var gridData = this.setValueByViewData(data);
        this.setGridRowData(gridData);

        var view = this;
        setTimeout(function () {
            view.test();
        }, 100);
    }

    ////////////////////////// Event Listener ///////////////////
	// Add Event Listener
    TrendView.prototype.addEventListener = function (type, callback, useCapture) {
        var view = this;
        page.getElementById(this._id).addEventListener(type, view.newCallback(callback), useCapture);
    };

    // Remove Event Listerner
    TrendView.prototype.removeEventListener = function (type, callback, useCapture) {
        var view = this;
        page.getElementById(this._id).removeEventListener(type, view.newCallback(callback), useCapture);
    };

    TrendView.prototype.newCallback = function (callback) {
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
    
    // Define items property for listview
	Object.defineProperty(TrendView.prototype, "items", {
		get: function () {
			return this._listviewitemcollection;
		}
	});

	// Define Column property for listview
	Object.defineProperty(TrendView.prototype, "columns", {
		get: function () {

			return this._listviewcolumncollection;
		}
    });
    
	Object.defineProperty(TrendView.prototype, "isLive", {
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
	Object.defineProperty(TrendView.prototype, "timeSpan", {
		get: function() {
			return this.getTimeSpan();
		},
		set: function(value) {
			this.setTimeSpan(value);
		}
	});
	Object.defineProperty(TrendView.prototype, "startTime", {
		get: function() {
			return this.getStartTime();
		},
		set: function(value) {
			this.setStartTime(value);
		}
	});
	Object.defineProperty(TrendView.prototype, "samplingTime", {
		get: function() {
			return this.getSamplingTime();
		}
	});
	Object.defineProperty(TrendView.prototype, "refreshTime", {
		get: function() {
			return this.getRefreshTime();
		},
		set: function(value) {
			this.setRefreshTime(value);
		}
	});
	Object.defineProperty(TrendView.prototype, "showToolbar", {
		get: function() {
			return this.getShowToolbar();
		},
		set: function(value) {
			this.setShowToolbar(value);
		}
    });	
    TrendView.prototype.exportToCSV = function(path){
		this.toolbarByFile();
    }
        
    page.createTrendView = function (arg) {
        var view = new TrendView(arg);
        page.protoViews[view.id] = view;

        view.initGrid();
        view.initToolbar();
        view.doViewData();
        return view;
    }
})();

