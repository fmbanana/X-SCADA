if (typeof page == undefined) page = {};
if (typeof page.protoViews == undefined) page.protoViews = {};


function ChartElement(arg) {
    ViewElement.call(this, arg);
    this.pid = arg.pid;
    this.backgroundColor = arg.backgroundColor;
    this.borderColor = arg.borderColor;
    this.borderStyle = arg.borderStyle;
    
    // -----Configuration variable-----
    this.SQL = arg.SQL;
    this.font = arg.font;
    this.titlecfg = arg.title;
    this.legendcfg = arg.legend;
    this.plot = arg.plot;
    this.seriescfg = arg.series;
    this.xaxiscfg = arg.xaxis;
    this.yaxiscfg = arg.yaxis;
    this.yAxisExtrascfg = arg.yaxisextras;
    this.palette = arg.palette;
    this.style3dcfg = arg.style3d;
    
    this.chart = null;
    this.xValue = {};
    this.yValue = {};
    this.SQLParams = {};

    // ---- Script -----
    this.xAxis = (arg.xaxis == undefined)? null : new ChartXAxis(this);
    this.yAxis = (arg.yaxis == undefined)? null : new ChartYAxis(this);
    
    this.yAxisExtras = (arg.yaxisextras == undefined)? null : new ChartAxisCollection(this);
    if(arg.yaxisextras != undefined) this.yAxisExtras.Init(this, arg.yaxisextras);

    this.series = new SeriesCollection(this);
    this.series.validate();

    this.title = new ChartTitle(this, arg.title);
    this.legend = new ChartLegend(this, arg.legend);
    this.style3d  = (arg.style3d == undefined)? null : new ChartStyle3D(this, arg.style3d);
}

///////////////////////////////////////////////////////////////////////////////
// Prototype
///////////////////////////////////////////////////////////////////////////////
ChartElement.prototype = Object.create(ViewElement.prototype);



///////////////////////////////////////////////////////////////////////////////
// General Functions
///////////////////////////////////////////////////////////////////////////////

ChartElement.prototype.getSQL = function () {
    return this.SQL;
}
ChartElement.prototype.setSQL = function (value) {
    this.SQL = value;
}

ChartElement.prototype.getSQLParams = function () {
    return this.SQLParams;
}

ChartElement.prototype.setSQLParams = function (value) {
    this.SQLParams = value;
}
ChartElement.prototype.getPalette = function () {
    if (this.palette == "None" || this.palette == "" || typeof this.palette == undefined)
        return "";
    else
        return this.palette;
}

ChartElement.prototype.getFont = function () {
    return this.font;
}

ChartElement.prototype.getTitle = function () {
    return this.titlecfg;
}

ChartElement.prototype.getLegend = function () {
    return this.legendcfg;
}

ChartElement.prototype.getPlot = function () {
    return this.plot;
}

ChartElement.prototype.getXaxis = function () {
    return this.xaxiscfg;
}

ChartElement.prototype.getYaxis = function () {
    return this.yaxiscfg;
}
ChartElement.prototype.getYAxisExtras = function () {
    return this.yAxisExtrascfg;
}

ChartElement.prototype.getSeries = function () {
    return this.seriescfg;
}

ChartElement.prototype.getChart = function () {
    return this.chart;
}

ChartElement.prototype.setChart = function (obj) {
    this.chart = obj;
}
ChartElement.prototype.getOpacity = function () {
    return this._opacity;
}

ChartElement.prototype.setOpacity = function (value) {
    $("#" + this._id).css("opacity", value);
    this._opacity = value;
}

// Measure the height size of text by HTML
ChartElement.prototype.TextHeightSize = function(text, fontFamily, fontsize){

    if(fontsize == 0) fontsize = 1;
    // var xisomDiv = document.getElementById('xisom-wrap');
    var xisomDiv = document.getElementsByTagName('body')[0];
    var textsize = document.createElement("div");    
    var newDiv = document.createElement("div");
    newDiv.id = "TextSize";
    newDiv.style.fontStyle = 'Normal';
    newDiv.style.fontFamily = fontFamily;
    newDiv.style.height = 'auto';
    newDiv.style.width = 'auto';
    newDiv.style.position = 'absolute';
    newDiv.style.visibility = 'hidden';
    newDiv.style.fontSize = fontsize + 'px';
    newDiv.appendChild(document.createTextNode(text));
    xisomDiv.appendChild(newDiv);
    
    var textsize = document.getElementById('TextSize');
    var height = textsize.clientHeight;
    textsize.parentNode.removeChild(textsize);
    // textsize.remove();
    return height;
}

// Measure the width size of text by HTML
ChartElement.prototype.TextWidthSize = function(text, fontFamily, fontsize){
    
    if(fontsize == 0) fontsize = 1;
    // var xisomDiv = document.getElementById('xisom-wrap');
    var xisomDiv = document.getElementsByTagName('body')[0];
    var newDiv = document.createElement("div");
    newDiv.id = "TextSize";
    newDiv.style.fontStyle = 'Normal';
    newDiv.style.fontFamily = fontFamily;
    newDiv.style.height = 'auto';
    newDiv.style.width = 'auto';
    newDiv.style.position = 'absolute';
    newDiv.style.visibility = 'hidden';
    newDiv.style.fontSize = fontsize + 'px';
    newDiv.appendChild(document.createTextNode(text));
    xisomDiv.appendChild(newDiv);

    var textsize = document.getElementById('TextSize');
    var width = textsize.clientWidth;
    textsize.parentNode.removeChild(textsize);
    // textsize.remove();    
    return width;
}

ChartElement.prototype.optionPalette = function () {
    var palette = this.getPalette();
    if (palette == "") return null;

    if (palette == "Default")
        return ['#618ED1', '#D26260', '#A8CB67', '#F7E733', '#F69D29', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Sky")
        return ['#FF6635', '#F1F326', '#78F326', '#269AF3', '#13C16D', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Soft")
        return ['#57678E', '#B8C46D', '#D6AF4E', '#928C86', '#5E7D84', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Classic")
        return ['#9D9BFF', '#9E3466', '#FFFFCF', '#CEFEFF', '#660566', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Sky2")
        return ['#C6EDF7', '#D9F2B0', '#FFD1C1', '#B71E4C', '#3A8394', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Shadow")
        return ['#2C81C0', '#6B4687', '#960303', '#F16723', '#94B13A', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Cool")
        return ['#2B3532', '#D33D3E', '#C3B9AD', '#005773', '#F9FDF3', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Bright")
        return ['#DA1C1C', '#68DA1C', '#F1E808', '#21A4D8', '#FC6A08', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Dark")
        return ['#324732', '#EADAD2', '#7E1F2D', '#A1861D', '#97A9CA', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Green")
        return ['#B8ECD7', '#083643', '#B1E001', '#CEF09D', '#476C5E', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Lover")
        return ['#EC756D', '#3693CE', '#F1CB50', '#98DD72', '#ACDBF9', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else if (palette == "Nature")
        return ['#E31C18', '#0B5BAE', '#FC6E26', '#F8F038', '#86E94F', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
    else
        return ['#618ED1', '#D26260', '#A8CB67', '#F7E733', '#F69D29', '#E0693E', '#ECE04F', '#A4E768', '#5EB5C5', '#72A0E5', '#D3D3D3'];
}

ChartElement.prototype.optionLegendPosition = function (position) {
    //출력화면 가독성을 위해 Top, Bottom만 적용
    if (position == "Top") return {
        left: 'center',
        top: 'top',
        right: 'auto',
        bottom: 'auto'
    };
    else if (position == "Bottom") return {
        left: 'center',
        top: 'auto',
        right: 'auto',
        bottom: 'bottom'
    };
    else return {
        left: 'center',
        top: 'auto',
        right: 'auto',
        bottom: 'bottom'
    };
}

ChartElement.prototype.optionTitlePosition = function (position) {
    if (position == "Top") return {
        left: 'center',
        top: 'top',
        right: 'auto',
        bottom: 'auto'
    };
    else if (position == "Bottom") return {
        left: 'center',
        top: 'auto',
        right: 'auto',
        bottom: 'bottom'
    };
    else if (position == "LeftTop") return {
        left: 'left',
        top: 'top',
        right: 'auto',
        bottom: 'auto'
    };
    else if (position == "Left") return {
        left: 'left',
        top: 'middle',
        right: 'auto',
        bottom: 'auto'
    };
    else if (position == "Right") return {
        left: 'auto',
        top: 'middle',
        right: 'right',
        bottom: 'auto'
    };
    else if (position == "RightTop") return {
        left: 'auto',
        top: 'top',
        right: 'right',
        bottom: 'auto'
    };
    else if (position == "Auto") return {
        left: 'center',
        top: 'top',
        right: 'auto',
        bottom: 'auto'
    };
    else return {
        left: 'center',
        top: 'top',
        right: 'auto',
        bottom: 'auto'
    };
}

ChartElement.prototype.optionOrient = function (position) {
    if (position == "Top") return "horizontal";
    else if (position == "Bottom") return "horizontal";
    else return "horizontal";
}

ChartElement.prototype.optionPointType = function (type) {
    if (type == "Circle") return "circle";
    else if (type == "Square") return "rect";
    else if (type == "RoundSquare") return "roundRect";
    else if (type == "Triangle") return "triangle";
    else if (type == "Diamond") return "diamond";
    else if (type == "Pin") return "pin";
    else if (type == "Arrow") return "arrow";
    else return "none";
}
ChartElement.prototype.optionColor = function (color) {
    return color == "" ? "transparent" : color;
}

ChartElement.prototype.optionFontStyle = function (italic) {
    return italic == true ? "italic" : "normal";
}
ChartElement.prototype.optionFontWeight = function (bold) {
    return bold == true ? "bold" : "normal";
}
ChartElement.prototype.optionPointColor = function (color) {
    var palette = this.getPalette();
    if (palette != "") return null;
    return this.optionColor(color)
}
ChartElement.prototype.optionBorderStyle = function (style) {
    if (style == "Dot") return "dotted";
    else if (style == "Dash") return "dashed";
    else if (style == "DashDot") return "dashed dotted";
    else if (style == "DashDotDot") return "dashed dotted dotted";
    else return "solid";
}
ChartElement.prototype.optionSeriesLabelPosition = function (position) {
    if (position == "Default") return "top";
    else if (position == "OutSide") return "bottom";
    else if (position == "Outer") return "top";
    else if (position == "Center") return "inside";
    else if (position == "Inner") return "insideBottom";
    else return "top";
}
ChartElement.prototype.optionSeriesName = function (series) {
    return series.text == "" ? series.name : series.text;
}
ChartElement.prototype.optionSeriesByName = function (name) {
    var oSeries = this.getSeries();
    var seriesCount = oSeries.length;
    for (var i = 0; i < seriesCount; i++) {
        var s = oSeries[i];
        if (!s) continue;
        if (s.name == name) return s;
    }
    return null;
}
ChartElement.prototype.optionDataByLegend = function () {
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
ChartElement.prototype.optionXaxisBoundaryGap = function () {
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
ChartElement.prototype.optionLegendPadding = function (position) {

    var paddingTop = 15;
    var paddingBottom = 10;
    var paddingLeft = 10;
    var paddingRight = 10;

    if (position == "Top" || position == "Default" ||
        position == "TopLeft" || position == "TopRight") {

        var title = this.getTitle();
        if (title.visible == true && title.text.length > 0) {
            paddingTop += this.TextHeightSize(title.text, title.font.name, title.font.size);
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

ChartElement.prototype.addEventListener = function (type, callback, useCapture) {
    page.getElementById(this._id).addEventListener(type, callback, useCapture);
};

ChartElement.prototype.removeEventListener = function (type, callback, useCapture) {
    page.getElementById(this._id).removeEventListener(type, callback, useCapture);
};

///////////////////////////////////////////////////////////////////////////////
// Related Class
///////////////////////////////////////////////////////////////////////////////
// Chart Series Object
function ChartSeries(owner, arg) {    
    this.owner = owner;
    this._name = arg.name;
    this._items = new ChartItemCollection(this.owner, arg.name);        
    this._axisExtra = arg.axisExtra;
    this._mixedType = "";
    this.attributes = {};

    Object.defineProperty(ChartSeries.prototype, "name", {
        get: function () {
            return this._name;
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "items", {
        get: function () {
            return this._items;
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "visible", {
        get: function () {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return false;
            return se.visible;
        },
        set: function (value) {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return;
            se.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "axisExtra", {
        get: function () {
            return this._axisExtra;
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "text", {
        get: function () {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return null;
            return se.text;
        },
        set: function (value) {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return;
            se.text = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "style", {
        get: function () {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return null;
            return se.color;
        },
        set: function (value) {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return;
            se.color = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "opacity", {
        get: function () {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return null;
            return se.opacity;
        },
        set: function (value) {
            var se = getSeriesOption(this.owner, this._name);
            if(se == null) return;
            se.opacity = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "mixedType", {
        get: function () {
            return this._mixedType;
        },
        configurable: true
    });
    
    function getSeriesOption(owner, name) {
        var count = owner.seriescfg.length;
        for(var i = 0; i < count; i++){
            var se = owner.seriescfg[i];
            if(se.name == name) return se;
        }
        return null;
    };
}
// Chart Series Collection
function SeriesCollection(owner){
    this.owner = owner;

    Object.defineProperty(SeriesCollection.prototype, "count", {
        get: function () {
            return this.length
        },
        configurable: true
    });    
    // Get an item at index
    SeriesCollection.prototype.getAt = function(index){
        var count = this.length;
        if(count == 0 || index < 0 || index >= count) return null;
        return this[index];
    }
    
    SeriesCollection.prototype.clearItems = function(){
        
        var seCount = this.owner.series.count;
        for(var i = 0; i < seCount; i++){
            var se = this.owner.series[i]
            var count = se.items.count;
            se.items.splice(0, count);
        }
        this.owner.dataRefresh();
    }
    SeriesCollection.prototype.addItem = function(data){        
        if(data.name == "DataResult"){
            var keys = Object.keys(data.data)
            var id = keys[0];
            var seriesCount = this.count;

            for(var i = 0; i < seriesCount; i++){
                var se = this[i];
                var idKey = data.data[id];

                var key = keys[i + 1];
                var value = data.data[key];                    

                var cfg = {
                    key: idKey,
                    value: value,
                    category: idKey,
                    x: idKey,
                    y: value,
                };
                var newitem = new ChartItem(this.owner, cfg);
                se.items.push(newitem);
            }
        } else if( data.name == "ListViewItem") {
                var rowdata = data.rowdata;
                var columns = Object.keys(rowdata)

                var id = rowdata[columns[0]];
                var series = this.owner.series;
                var seriesCount = series.length;

                for(var i = 0; i < seriesCount; i ++){
                    var se = series[i];
                    var cellValue = rowdata[columns[i + 1]];

                    var cfg = {
                        key: id,
                        value: cellValue,
                        category: id,
                        x: id,
                        y: cellValue,
                    };
                    var newitem = new ChartItem(this.owner, cfg);
                    se.items.push(newitem);
                }
            
        }
        this.owner.dataRefresh();        
    }
    SeriesCollection.prototype.addItems = function (data) {
        if (typeof data.name == "undefined" || data.name == null) {
            console.error("Data has no name");
        }
        else if(data.name == "DataResultCollection") {
            var itemCount = data.length;
            for(var i = 0; i < itemCount; i++){
                var item = data[i];
                var keys = Object.keys(item.data)
                var id = keys[0];
                var seriesCount = this.count;

                for(var j = 0; j < seriesCount; j++){
                    var se = this[j];
                    var idKey = item.data[id];

                    var key = keys[j + 1];
                    var value = item.data[key];                    

                    var cfg = {
                        key: idKey,
                        value: value,
                        category: idKey,
                        x: idKey,
                        y: value,
                    };
                    var newitem = new ChartItem(this.owner, cfg);
                    se.items.push(newitem);
                }
            }
        } else if(data.name == "ListViewItemCollection") {
            var itemCount = data.length;
            for(var i = 0; i < itemCount; i++){
                var item = data[i];
                if(item.name != "ListViewItem") continue;
                var rowdata = item.rowdata;
                var columns = Object.keys(rowdata)

                var id = rowdata[columns[0]];
                var series = this.owner.series;
                var seriesCount = series.length;

                for(var j = 0; j < seriesCount; j ++){
                    var se = series[j];
                    var cellValue = rowdata[columns[j + 1]];

                    var cfg = {
                        key: id,
                        value: cellValue,
                        category: id,
                        x: id,
                        y: cellValue,
                    };
                    var newitem = new ChartItem(this.owner, cfg);
                    se.items.push(newitem);
                }
            }
        }        
        this.owner.dataRefresh();
    }
    SeriesCollection.prototype.validate = function() {
        this.splice(0, this.length);
        var seriesCFG = this.owner.getSeries();
        var count = seriesCFG.length;
        for (var i = 0; i < count; i++) {                
            var item = seriesCFG[i];
            var arg = {
                index: i,
                name: item.name,
                color: item.color,
                visible: item.visible,
                axisExtra: -1,
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
}
SeriesCollection.prototype = Object.create(Array.prototype);

// ChartItem definition
function ChartItem(owner, arg) {
    this.owner = owner;
    this._key = arg.key;
    this._value = arg.value;
    this._category = arg.category;
    this._x = arg.x;
    this._y = arg.y;

    this.attributes = {};

    Object.defineProperty(ChartItem.prototype, "key", {
        get: function () {
            return this._key;
        },
        configurable: true
    });

    Object.defineProperty(ChartItem.prototype, "value", {
        get: function () {
            return this._value;
        },
        configurable: true
    });

    Object.defineProperty(ChartItem.prototype, "category", {
        get: function () {
            return this._category;
        },
        configurable: true
    });

    Object.defineProperty(ChartItem.prototype, "x", {
        get: function () {
            return this._x;
        },
        configurable: true
    });

    Object.defineProperty(ChartItem.prototype, "y", {
        get: function () {
            return this._y;
        },
        configurable: true
    });

    
    ChartItem.prototype.hasAttribute = function (name) {        
        if(name == null || name == undefined) return false;
        var attr = this.attributes[name];        
        if(attr != null && attr != undefined){
            return true;
        } else {
            return false;
        }
    }
    ChartItem.prototype.getAttribute = function(name){
        if(name == null || name == undefined) return null;
        var attr = this.attributes[name];        
        if(attr != null && attr != undefined){
            return attr;
        } else {
            return null;
        }
    }
    ChartItem.prototype.setAttribute = function (name, value){
        if(name == null || name == undefined) return;
        this.attributes[name] = value;
    }
    ChartItem.prototype.removeAttribute = function (name){
        if(name == null || name == undefined) return null;
        var attr = this.attributes[name];
        if(attr != null && attr != undefined){
            delete this.attributes.name;
        }
    }


}
// ChartItemCollection definition
function ChartItemCollection(owner){
    this.owner = owner;

    Object.defineProperty(ChartItemCollection.prototype, "count", {
        get: function () {
            return this.length
        },
        configurable: true
    });

    ChartItemCollection.prototype.getAt = function(index) {
        var count = this.length;
        if(count == 0 || index < 0 || index >= count) return;

        return this[index];
    }
    ChartItemCollection.prototype.clear = function(){
        var count = this.length;
        this.splice(0, count);
        this.owner.dataRefresh();
    }
    ChartItemCollection.prototype.add = function(item){
        if(item.name == "DataResult"){
            var values = [];
            for(var idx in item.data){
                values.push(item.data[idx]);
            }                
            var cfg = {
                key: values[0],
                value: values[1],
                category: (values.count >= 2) ? values[2] : values[0],
                x: values[0],
                y: values[1],
            };
            var item = new ChartItem(this.owner, cfg);
            this.push(item);
        } else if (typeof item == "ChartItem") {
            this.push(item);
        } else { // Array input which define by user
            if(item.length < 2) return;
            var cfg = {
                key: item[0],
                value: item[1],
                category: item[0],
                x: item[0],
                y: item[1],
            };
            var newitem = new ChartItem(this.owner, cfg);
            this.push(newitem);
        }
        this.owner.dataRefresh();
    }
    ChartItemCollection.prototype.remove = function(item){
        var idx = this.indexOf(item);
        if(idx < 0) return;
        this.splice(idx, 1);
        this.owner.dataRefresh();
    }
    ChartItemCollection.prototype.addAll = function(items){
        if(items.name == "DataResultCollection"){
            var count = items.count;
            for(var i = 0; i < count; i++){
                var dataresult = items[i];
                var values = [];
                for(var idx in dataresult.data){
                    values.push(dataresult.data[idx]);
                }
                
                var cfg = {
                    key: values[0],
                    value: values[1],
                    category: (values.length >= 2) ? values[2] : values[0],
                    x: values[0],
                    y: values[1],
                };
                var item = new ChartItem(this.owner, cfg);
                this.push(item);
            }
        } else {
            var type = typeof items;
            if(type == "object"){            
                var count = items.length;
                for(var i = 0; i < count; i ++){
                    var item = items[i];
                    this.push(item);
                }
            } else {
                this.push(items);
            }
        }
        this.owner.dataRefresh();
    }
    ChartItemCollection.prototype.removeAll = function(items){
        var count = items.length;
        for(var i = 0; i < count; i++){
            var item = items[i];
            var idx = this.indexOf(item);
            if(idx < 0) continue;
            this.splice(idx, 1);
        }

        this.owner.dataRefresh(this);
    }
    ChartItemCollection.prototype.addAt = function(idx, item){
        if(item.name == "DataResult"){
            var cfg = {
                key: data.data.DATE_TIME_TEMP,
                value: data.data.A_VALUE,
                category: data.data.DATE_TIME_TEMP,
                x: data.data.DATE_TIME_TEMP,
                y: data.data.A_VALUE
            };
            var item = new ChartItem(this.owner, cfg);
            this.splice(idx, 0, item);

        } else {
            var count = this.length;
            if(idx < 0 || idx >= count) return;
            this.splice(idx, 0, item);
        }
        this.owner.dataRefresh();
    };
    ChartItemCollection.prototype.removeAt = function(idx){
        var count = this.length;
        if(idx < 0 || count == 0 || idx >= count) return;
        this.splice(idx, 1);
        this.owner.dataRefresh();
    };
}
ChartItemCollection.prototype = Object.create(Array.prototype);

// X-Axis definition
function ChartXAxis(owner) {
    this.owner = owner;
    Object.defineProperty(ChartXAxis.prototype, "visible", {
        get: function () {
            return this.owner.xaxiscfg.visible;
        },
        set: function (value) {
            this.owner.xaxiscfg.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
}
// Y-Axis definition
function ChartYAxis(owner) {
    this.owner = owner;

    Object.defineProperty(ChartYAxis.prototype, "visible", {
        get: function() {
            return this.owner.yaxiscfg.visible;
        },
        set: function(value) {
            this.owner.yaxiscfg.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });

    Object.defineProperty(ChartYAxis.prototype, "maxValue", {
        get: function() {
            return this.owner.yaxiscfg.maxValue;
        },
        set: function(value) {
            this.owner.yaxiscfg.maxValue = value;
            this.owner.settingRefresh();
        },
        configurable: true

    });

    Object.defineProperty(ChartYAxis.prototype, "minValue", {
        get: function() {
            return this.owner.yaxiscfg.minValue;
        },
        set: function(value) {
            this.owner.yaxiscfg.minValue = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
}
// Y-ExtraAxis definition
function ChartAxis(owner, arg) {
    this.owner = owner;
    this.name = arg.name;

    Object.defineProperty(ChartAxis.prototype, "visible", {
        get: function() {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            return axis.visible;
        },
        set: function(value) {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            axis.visible = value;
        },
        configurable: true
    });

    Object.defineProperty(ChartAxis.prototype, "maxValue", {
        get: function() {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            return axis.maxValue;
        },
        set: function(value) {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            axis.maxValue = value;
            this.owner.settingRefresh();
        },
        configurable: true            
    });

    Object.defineProperty(ChartAxis.prototype, "minValue", {
        get: function() {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            return axis.minValue;
        },
        set: function(value) {
            var idx = getAxisIndex(this.owner, this.name);
            if(idx < 0) return;
            var axis = this.owner.yAxisExtrascfg[idx];
            axis.minValue = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });   
    
    getAxisIndex = function(owner, name){
        var count = owner.yAxisExtras.count;
        for(var i = 0; i < count; i++){
            if(owner.yAxisExtras[i].name == name){
                return i;
            }
        }
        return -1;
    }
}

// Y-Axis external definition
function ChartAxisCollection(owner){
    this.owner = owner;
    Object.defineProperty(ChartAxisCollection.prototype, "count", {
        get: function () {
            return this.length
        },
        configurable: true
    });
    
    ChartAxisCollection.prototype.getAt = function (index) {
        var count = this.length;
        if (count == 0 || index < 0 || index >= count) return null;
        return this[index];
    }

    ChartAxisCollection.prototype.Init = function (owner, arg) {
        // console.log("yAxisExtras: ", arg);
        // console.log("this.count: ", this.count);

        var type = typeof arg;
        if (type == "object") {
            var count = arg.length;
            for (var i = 0; i < count; i++) {
                var item = arg[i];
                var axis = new ChartAxis(owner, item);
                this.push(axis);
            }
        } else {
            this.push(new ChartAxis(owner, arg));
        }
    }
    
}
ChartAxisCollection.prototype = Object.create(Array.prototype);

// Chart Title definition
function ChartTitle(owner, arg) {
    this.owner = owner;

    Object.defineProperty(ChartTitle.prototype, "visible", {
        get: function () {
            return this.owner.titlecfg.visible;
        },
        set: function(value) {
            this.owner.titlecfg.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });

    Object.defineProperty(ChartTitle.prototype, "text", {
        get: function () {
            return this.owner.titlecfg.text;
        },
        set: function(value) {
            this.owner.titlecfg.text = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
}
// Chart Logo definition
function ChartLogo(owner, arg) {
    this.owner = owner;
    
    Object.defineProperty(ChartLogo.prototype, "visible", {
        get: function () {
            return this.owner.logocfg.visible;
        },
        set: function(value) {
            this.owner.logocfg.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });

    Object.defineProperty(ChartLogo.prototype, "text", {
        get: function () {
            return this.owner.logocfg.text;
        },
        set: function(value) {
            this.owner.logocfg.text = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
}
// Chart Legend definition
function ChartLegend(owner, arg) {
    this.owner = owner;

    Object.defineProperty(ChartLegend.prototype, "visible", {
        get: function () {
            return this.owner.legendcfg.visible;
        },
        set: function(value) {
            this.owner.legendcfg.visible = value;
            this.owner.settingRefresh();
        },
        configurable: true
    });
}
// Chart Style 3D definition
function ChartStyle3D(owner, arg) {
    this.owner = owner;
    this._enabled = arg.visible;
    
    Object.defineProperty(ChartStyle3D.prototype, "enabled", {
        get: function () {
            return this.owner.style3dcfg.enabled;
        },
        set: function(value) {
            this.owner.style3dcfg.enabled = value;
        },
        configurable: true
    });
    Object.defineProperty(ChartStyle3D.prototype, "depth", {
        get: function () {
            return this.owner.style3dcfg.depth;
        },
        set: function(value) {
            this.owner.style3dcfg.depth = value;
        },
        configurable: true
    });
}