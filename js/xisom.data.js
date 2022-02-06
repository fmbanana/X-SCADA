/////////////////////////////////////////////////////////
// ListViewColumnCollection and ListViewColumn
/////////////////////////////////////////////////////////
(function () {
    function ListViewColumn (caller, arg) {
        this._name = arg.name;
        this._visible = arg.visible;
        this._text = arg.text;
        this._width = arg.width;
        this.callback = caller;
        this.attributes = {};
    }

    // Define name property for ListViewColumn
    Object.defineProperty(ListViewColumn.prototype, "name", {
        get: function () {
            return this._name;
        }
    });

    // Define visible property for ListViewColumn
    Object.defineProperty(ListViewColumn.prototype, "visible", {
        get: function () {
            return this._visible;
        }, 
        set: function (value) {
            this._visible = value;
            this.callback.columnVisible(this._name, value);
        }
    });

    // Define text property for ListViewColumn
    Object.defineProperty(ListViewColumn.prototype, "text", {
        get: function () {
            return this._text;
        }
    });

    // Define width property for ListViewColumn
    Object.defineProperty(ListViewColumn.prototype, "width", {
        get: function () {
            return this._width;
        }, 
        set: function (value) {
            this._width = value;
            this.callback.columnWidth(this._name, value);
        }
    });

    
    // Set a user attribute for ListViewColumn
    ListViewColumn.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of ListViewColumn
    ListViewColumn.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for ListViewColumn
    ListViewColumn.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on ListViewColumn
    ListViewColumn.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }
    scada.createListViewColumn = function (caller, arg) {
        return new ListViewColumn(caller, arg);
    }

    function ListViewColumnCollection(arg) {
        this.name = "ListViewColumnCollection";
        this.attributes = {};
    }
    ListViewColumnCollection.prototype = Object.create(Array.prototype);

    // Define count property for listview column collection
    Object.defineProperty(ListViewColumnCollection.prototype, "count", {
        get: function(){
            return this.length;
        }
    });

    // Get a listview column object at index
    ListViewColumnCollection.prototype.getAt = function(index){
        
        var itemCount = this.length;

        if(itemCount < 1 || index < 0 || itemCount <= index ) return null;
        
        return this[index];
    }

    // Set item to Listview colum 
    ListViewColumnCollection.prototype.setItem = function(item) {
        this.push(item);
    }

    // Get Listview colum items
    ListViewColumnCollection.prototype.getItems = function() {
        return this;
    }
    
    // Set a user attribute for ListViewColumnCollection
    ListViewColumnCollection.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of ListViewColumnCollection
    ListViewColumnCollection.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for ListViewColumnCollection
    ListViewColumnCollection.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on ListViewColumnCollection
    ListViewColumnCollection.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }
    
    scada.createListViewColumnCollection = function (lvcallback , arg){
        var listviewcolumncollection = new ListViewColumnCollection();
        if(typeof arg == "object") {
            var count = arg.length;
            for(var i = 0; i < count; i ++){
                var item = arg[i];
                var column = scada.createListViewColumn(lvcallback, item);
                listviewcolumncollection.setItem(column);
            }
        } else {
            var column = scada.createListViewColumn(lvcallback, arg);
            listviewcolumncollection.setItem(column);
        }
        return listviewcolumncollection;
    }

}());


/////////////////////////////////////////////////////////
// ListViewItemCollection and ListViewItem
/////////////////////////////////////////////////////////
(function () {
    function ListViewItem(caller, arg) {
        this.name = "ListViewItem";
        this.selected = false;
        this.rowdata = (arg == null) ? {} : arg;
        this.callback = caller;
        this.attributes = {};
    }
    Object.defineProperty(ListViewItem.prototype, "count", {
        get: function () {
            return this.rowdata.length;
        }
    });
    ListViewItem.prototype.getName = function(index){
        return Object.keys(this.rowdata)[index];
    }
    ListViewItem.prototype.getValue = function(index){
        return Object.values(this.rowdata)[index];
    }
    ListViewItem.prototype.setValue = function(index, value){
        var key = Object.keys(this.rowdata)[index];
        this.rowdata[key] = value;
        this.updateGrid();
    }
    ListViewItem.prototype.getText = function(index){
        return Object.values(this.rowdata)[index].toString();
    }
    ListViewItem.prototype.getValueByName = function(name){
        return this.rowdata[name];
    }
    ListViewItem.prototype.getTextByName = function(name){
        return this.rowdata[name].toString();
    }
    // Callback to update listview for listviewitem
    ListViewItem.prototype.updateGrid = function (){
        this.callback.updateGrid();
    }

    // Set a user attribute for ListViewItem
    ListViewItem.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of ListViewItem
    ListViewItem.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for ListViewItem
    ListViewItem.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on ListViewItem
    ListViewItem.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }    

    scada.CreateListViewItem = function(caller, arg){
        return new ListViewItem(caller, arg);
    }

    function ListViewItemCollection(arg) {
        this.name = "ListViewItemCollection";
        this.owner = arg;
        this.attributes = {};
    }
    ListViewItemCollection.prototype = Object.create(Array.prototype);

    Object.defineProperty(ListViewItemCollection.prototype, "count", {
        get: function () {
            return this.length;
        }
    });

    // Get a listview item at index of listview collection
    ListViewItemCollection.prototype.getAt = function(index) {
        var count = this.length;
        if(count < 1 || index < 0 || count <= index){
            return null;
        } else {
             return this[index];
        }
    }    
    
    // Get all item of listview collection
    ListViewItemCollection.prototype.getItems = function (){
        return this;
    }

    // Set all item to listview
    ListViewItemCollection.prototype.setItems = function (arg){
        if(typeof arg == "object"){
            var count = arg.length;
            for(var i = 0; i < count; i ++){
                var row = arg[i];
                var rowitem = new scada.CreateListViewItem(this.owner, row);
                this.push(rowitem);
            }
        } else {
            var rowitem = new scada.CreateListViewItem(this.owner, arg);
            this.push(rowitem);
        }
    }
    
    // clear all items of ListViewItem Collection
    ListViewItemCollection.prototype.clear = function() {
        var count = this.length;
        this.splice(0, count);
        this.updateGrid();
    }

    // Add a item to ListViewItem Collection
    ListViewItemCollection.prototype.add = function(item) {
        if(item == null) return;

        if(item.constructor === Array){            
            var namesCount = this.owner.columns.count;
            var row = {};
            for (var n = 0; n < namesCount; n++) {
                var column = this.owner.columns[n];

                var name = (column.field === undefined || column.field === "")? column.name: column.field;
                var value = item[n];
                var format = (column.cell === undefined)? null : column.cell.format;

                if (value != "") value = this.owner.valueByFormat(format, value);
                row[name] = value;
            }
            var rowitem = new scada.CreateListViewItem(this.owner, row);
            this.push(rowitem);
        }
        else if (item.name === "ListViewItem"){            
            this.push(item);
        }
        this.updateGrid();
    }
    
    // Remove an item of listview collection
    ListViewItemCollection.prototype.remove = function(item) {
        var curItems = this.getItems();
        var curCount = curItems.length;
        if(curCount < 1) return;
        var idx = curItems.indexOf(item);
        if(idx < 0){
            return;
        } else {
            this.removeAt(idx);
        }
    }
    
    // Add all items to listview collection
    ListViewItemCollection.prototype.addAll = function(data) {
        if(data.name == "DataResultCollection"){
            var count = data.count;
            var columns =  this.owner.columns;
            // DataResult
            for (var i = 0; i < count; i++) {
                var item = data.getAt(i);
                if(!item) continue;

                var names = Object.keys(item.data);
                var values = [];
                for(var idx in item.data){
                    values.push(item.data[idx]);
                }
                var namesCount = names.length;
                var row = {};
                for (var n = 0; n < namesCount; n++) {
                    var column = this.owner.columnByName(names[n]);
                    if (column == null) continue;
    
                    var name = (column.field == "")? column.name: column.field;
                    var value = values[n];
                    if (value != "") value = this.owner.valueByFormat(column.cell.format, value);
                    row[name] = value;                    
                }
                var rowitem = new scada.CreateListViewItem(this.owner, row);
                this.push(rowitem);
            }
        } else if(data.name == "ListViewItemCollection"){
            for(var item in data){
                this.add(item);
            }
        }
        this.updateGrid();

        // console.time("Start AddAll");
    }
    // Add all data to listview item
    ListViewItemCollection.prototype.addData = function(data) {
        var names = data.names;//["Time", "Analog1", "Analog2"]
        var items = data.items;//[["2017-02-20T02:04:12.246Z", 2, 14],["2017-02-20T02:04:12.281Z", 10, 29]]        

        var namesCount = names.length;
        var itemsCount = items.length;
        var rows = []
        var idx = 0;
        for (var i = 0; i < itemsCount; i++) {
            var itemData = items[i];
            if (!itemData) continue;

            var row = {}
            for (var n = 0; n < namesCount; n++) {
                var name = names[n];
                if (!name) continue;

                var column = this.owner.columnByName(name);
                if (column == null) continue;

                var itemValue = itemData[n];
                if (itemValue != "") itemValue = this.owner.valueByFormat(column.cell.format, itemValue);
                row[name] = itemValue;
            }
            rows[idx++] = row;
        }
        this.setItems(rows);
        this.updateGrid();
    }
    
    // Remove multiple items in listview items collection
    ListViewItemCollection.prototype.removeAll = function(items) {
        var curItems = this.getItems();
        var curCount = curItems.length;
        var count = items.length;
        if(count < 1 || curCount < 1) return;

        for(var i = 0; i < count ; i++){
            var item = items.getAt(i);
            var idx = curItems.indexOf(item);
            if(idx < 0){
                continue;
            } else {
                curItems.slice(idx, 1);
            }
        }
        $('#' + this._id).clearGridData(true);
        this.updateGrid();
    }
    
    // Add a listview item at index
    ListViewItemCollection.prototype.addAt = function(index, item) {
        var items = this.getItems();
        var count = items.length;
        if(count < 1 || index < 0 || count < index) return;

        items.splice(index, 0, item);
        this.updateGrid();
    }

    // Remove a listview item at index
    ListViewItemCollection.prototype.removeAt = function(index, isReload) {
        var items = this.getItems();
        var count = items.length;
        if(count < 1 || index < 0 || count <= index) return;
        items.splice(index, 1);
        // if(isReload != false)
            this.updateGrid();
    }

    // Callback to update listview for listviewitem collection
    ListViewItemCollection.prototype.updateGrid = function () {
        this.owner.updateGrid();
    }

    // Set a user attribute for ListViewItemCollection
    ListViewItemCollection.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of ListViewItemCollection
    ListViewItemCollection.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for ListViewItemCollection
    ListViewItemCollection.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on ListViewItemCollection
    ListViewItemCollection.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }

    scada.CreateListViewItemCollection = function (arg){
        return new ListViewItemCollection(arg);
    }
}());


/////////////////////////////////////////////////////////
// DataResult and DataResultCollection
/////////////////////////////////////////////////////////
(function () {
    function DataResult  (arg) {
        this.name = "DataResult"
        this.data = arg;
        this.attributes = {};
    }
    Object.defineProperty(DataResult.prototype, "count", {
        get: function () {
            return Object.keys(this.data).length;
        },
        configurable: true
    });
    DataResult.prototype.getName = function(index){
        return Object.keys(this.data)[index];
    }
    DataResult.prototype.getValue = function(index){
        var values = [];
        for(var idx in this.data){
            values.push(this.data[idx]);    
        }
        if(index < 0 || index >= values.length || values.length == 0) return null;
        return values[index];
    }    
    DataResult.prototype.getValueByName = function(name){
        return this.data[name];
    }
    // Set a user attribute for DataResult
    DataResult.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of DataResult
    DataResult.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for DataResult
    DataResult.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on DataResult
    DataResult.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }
        
    // scada.createDataResult = function(arg){
    //     return new DataResult(arg);
    // }

    function DataResultCollection () {
        this.name = "DataResultCollection";
        this.attributes = {};
    }
    DataResultCollection.prototype = Object.create(Array.prototype);

    // Define Count for data result collection
    Object.defineProperty(DataResultCollection.prototype, "count", {
        get: function () {
            return this.length;
        },
        configurable: true
    });

    // Set data to collection
    DataResultCollection.prototype.setItems = function (data){
        var names = data.names;
        var items = data.items;
        var itemCount = items.length;
        var nameCount = names.length;

        for(var i = 0; i < itemCount; i ++){
            var item = items[i];
            if(!item) continue;
            var row = {};
            for(var j = 0; j < nameCount; j ++){
                var name = names[j]
                if(!name) continue;

                row[name] = item[j];
            }
            var dataresultitem = new DataResult(row);
            this.push(dataresultitem);
        }
    }

    // Get all items data of data result collection 
    DataResultCollection.prototype.getItems = function (){
        return this;
    }

    // Get a DataResult object at index
    DataResultCollection.prototype.getAt = function(index){
        var items = this.getItems();
        var itemCount = items.length;
        if(itemCount < 1 || index < 0 || itemCount <= index){
            return null;
        } else {
             return items[index];
        }
    }

    // Get a sublist of DataResultCollection
    DataResultCollection.prototype.subList = function(index, count){
        var items = this.getItems();
        var itemCount = items.length;

        if(itemCount < 1 || index < 0 || itemCount <= index || itemCount <= index + count) return null

        var dataResultCol = new DataResultCollection();
        for(var i = index; i < index + count; i ++){
            var item = items[i];
            dataResultCol.push(item);
        }
        return dataResultCol;
    }

    // Set a user attribute for DataResultCollection
    DataResultCollection.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of DataResultCollection
    DataResultCollection.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for DataResultCollection
    DataResultCollection.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on DataResultCollection
    DataResultCollection.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }

    scada.createDataResultCollection = function(data){
        var dataResultCol = new DataResultCollection();
        if(data.names != undefined){
            dataResultCol.setItems(data);            
        }
        return dataResultCol;
    }

}());


