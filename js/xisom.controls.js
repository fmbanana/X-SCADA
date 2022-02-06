if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};
if (typeof language == "undefined") language = {};
if (typeof language.alarm == "undefined") language.alarm = {};

/////////////////////////////////////////////////////////////////////////////////////
// AlarmLanguage
/////////////////////////////////////////////////////////////////////////////////////

(function () {
	function AlarmLanguage() {
		this.statusName = null;
		this.columnName = null;
		this.modalCaption = null;
		this.toolbarCaption = null;
	}

	AlarmLanguage.prototype.getStatusName = function (name) {
		if (this.statusName == null) return name;
		return this.statusName.get(name);
	}

	AlarmLanguage.prototype.setStatusName = function () {
		this.statusName = new $HashMap();

		var lang = $Common.detectLanguage();
		if (lang == "ko") {
			this.statusName.put("All", "전체");
			this.statusName.put("Acknowledged", "경보인식");
			this.statusName.put("Occurred", "경보발생");
			this.statusName.put("Released", "경보해제");
			this.statusName.put("Disabled", "비활성");

		} else if (lang == "zh") {
			this.statusName.put("All", "所有");
			this.statusName.put("Acknowledged", "报警识别");
			this.statusName.put("Occurred", "报警发生");
			this.statusName.put("Released", "释放报警");
			this.statusName.put("Disabled", "不使用");

		} else {
			this.statusName.put("All", "All");
			this.statusName.put("Acknowledged", "Acknowledged");
			this.statusName.put("Occurred", "Occurred");
			this.statusName.put("Released", "Released");
			this.statusName.put("Disabled", "Disabled");
		}
	}


	AlarmLanguage.prototype.getColumnName = function (name) {
		if (this.columnName == null) return name;
		return this.columnName.get(name);
	}

	AlarmLanguage.prototype.setColumnName = function () {
		this.columnName = new $HashMap();

		var lang = $Common.detectLanguage();
		if (lang == "ko") {
			this.columnName.put("No", "번호");
			this.columnName.put("Time", "시간");
			this.columnName.put("Name", "이름");
			this.columnName.put("Status", "상태");
			this.columnName.put("Enabled", "경보발생");
			this.columnName.put("Level", "등급");
			this.columnName.put("Zone", "지역");
			this.columnName.put("Tag Name", "태그 이름");
			this.columnName.put("Tag Value", "태그 값");
			this.columnName.put("Message", "메시지");
			this.columnName.put("Acknowledged", "경보인식");

		} else if (lang == "zh") {
			this.columnName.put("No", "数字");
			this.columnName.put("Time", "小时");
			this.columnName.put("Name", "名字");
			this.columnName.put("Status", "状态");
			this.columnName.put("Enabled", "报警发生");
			this.columnName.put("Level", "等级");
			this.columnName.put("Zone", "地区");
			this.columnName.put("Tag Name", "标签名称");
			this.columnName.put("Tag Value", "标签值");
			this.columnName.put("Message", "消息");
			this.columnName.put("Acknowledged", "报警识别");

		} else {
			this.columnName.put("No", "No");
			this.columnName.put("Time", "Time");
			this.columnName.put("Name", "Name");
			this.columnName.put("Status", "Status");
			this.columnName.put("Enabled", "Enabled");
			this.columnName.put("Level", "Level");
			this.columnName.put("Zone", "Zone");
			this.columnName.put("Tag Name", "Tag Name");
			this.columnName.put("Tag Value", "Tag Value");
			this.columnName.put("Message", "Message");
			this.columnName.put("Acknowledged", "Acknowledged");
		}
	}

	AlarmLanguage.prototype.getModalCaption = function (name) {
		if (this.modalCaption == null) return name;
		return this.modalCaption.get(name);
	}

	AlarmLanguage.prototype.setModalCaption = function () {
		this.modalCaption = new $HashMap();

		var lang = $Common.detectLanguage();
		if (lang == "ko") {
			this.modalCaption.put("level", " 등급 ");
			this.modalCaption.put("zone", " 지역 ");
			this.modalCaption.put("title-status", " 상태선택 ");
			this.modalCaption.put("title-level", " 등급선택 ");
			this.modalCaption.put("title-zone", " 지역선택 ");
			this.modalCaption.put("title-tag", " 태그선택 ");
			this.modalCaption.put("title-col", " 컬럼선택 ");
			this.modalCaption.put("btn-apply", " 적용 ");
			this.modalCaption.put("btn-cancel", " 취소 ");
			this.modalCaption.put("btn-check", " 전체선택 ");
			this.modalCaption.put("btn-uncheck", " 전체해제 ");
			this.modalCaption.put("msg-nocheck", " 항목을 선택하세요. ");

		} else if (lang == "zh") {
			this.modalCaption.put("level", " 等级 ");
			this.modalCaption.put("zone", " 地区 ");
			this.modalCaption.put("title-status", " 选择状态 ");
			this.modalCaption.put("title-level", " 选择等级 ");
			this.modalCaption.put("title-zone", " 地区选择 ");
			this.modalCaption.put("title-tag", " 标签选择 ");
			this.modalCaption.put("title-col", " 显示列 ");
			this.modalCaption.put("btn-apply", " 确定 ");
			this.modalCaption.put("btn-cancel", " 取消 ");
			this.modalCaption.put("btn-check", " 选择全部 ");
			this.modalCaption.put("btn-uncheck", " 全部禁用 ");
			this.modalCaption.put("msg-nocheck", " 请选择一个项目。 ");

		} else {
			this.modalCaption.put("level", " Level ");
			this.modalCaption.put("zone", " Zone ");
			this.modalCaption.put("title-status", " Select Status ");
			this.modalCaption.put("title-level", " Select Level ");
			this.modalCaption.put("title-zone", " Select Zone ");
			this.modalCaption.put("title-tag", " Select Tag ");
			this.modalCaption.put("title-col", " Show Columns ");
			this.modalCaption.put("btn-apply", " Apply ");
			this.modalCaption.put("btn-cancel", " Cancel ");
			this.modalCaption.put("btn-check", " Check All ");
			this.modalCaption.put("btn-uncheck", " Uncheck All ");
			this.modalCaption.put("msg-nocheck", " Select Items. ");
		}
	}

	AlarmLanguage.prototype.getToolbarCaption = function (name) {
		if (this.toolbarCaption == null) return name;
		return this.toolbarCaption.get(name);
	}

	AlarmLanguage.prototype.setToolbarCaption = function () {
		this.toolbarCaption = new $HashMap();

		var lang = $Common.detectLanguage();
		if (lang == "ko") {
			this.toolbarCaption.put("refresh", "새로고침");
			this.toolbarCaption.put("enabled", "경보사용");
			this.toolbarCaption.put("disabled", "경보사용안함");
			this.toolbarCaption.put("acknowledged", "경보인식");
			this.toolbarCaption.put("status", "상태선택");
			this.toolbarCaption.put("level", "등급선택");
			this.toolbarCaption.put("zone", "지역선택");
			this.toolbarCaption.put("tag", "태그선택");
			this.toolbarCaption.put("columns", "열선택");
			this.toolbarCaption.put("save", "CSV 파일로 저장");

		} else if(lang == "zh") {
			this.toolbarCaption.put("refresh", "刷新");
			this.toolbarCaption.put("enabled", "启用");
			this.toolbarCaption.put("disabled", "残疾");
			this.toolbarCaption.put("acknowledged", "报警识别");
			this.toolbarCaption.put("status", "选择状态");
			this.toolbarCaption.put("level", "选择等级");
			this.toolbarCaption.put("zone", "地区选择");
			this.toolbarCaption.put("tag", "标签选择");
			this.toolbarCaption.put("columns", "显示列");
			this.toolbarCaption.put("save", "另存为 CSV");

		} else {
			this.toolbarCaption.put("refresh", "Refresh");
			this.toolbarCaption.put("enabled", "Enabled");
			this.toolbarCaption.put("disabled", "Disabled");
			this.toolbarCaption.put("acknowledged", "Acknowledged");
			this.toolbarCaption.put("status", "Select Status");
			this.toolbarCaption.put("level", "Select Level");
			this.toolbarCaption.put("zone", "Select Zone");
			this.toolbarCaption.put("tag", "Select Tag");
			this.toolbarCaption.put("columns", "Show Columns");
			this.toolbarCaption.put("save", "Save As CSV");
		}
	}

	page.createAlarmLanguage = function () {
		var view = new AlarmLanguage();
		view.setStatusName();
		view.setColumnName();
		view.setModalCaption();
		view.setToolbarCaption();
		language.alarm = view;
	}

	page.createAlarmLanguage();


})();

/////////////////////////////////////////////////////////////////////////////////////
// TextEditView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function TextEditView(arg) {
		
		ViewElement.call(this, arg);

		this._backgroundColor = arg.backgroundColor;
		this._foregroundColor = arg.foregroundColor;
		this._text = arg.text;
		this._multiline = arg.multiline;
		this._readonly = arg.readonly; 		
		this._wordwrap = arg.wordwrap;
		this.align = arg.align;		
		this.type = arg.type;
		this._tag = arg.tag;
	}
	TextEditView.prototype = Object.create(ViewElement.prototype);
	TextEditView.prototype.constructor = TextEditView;

	Object.defineProperty(TextEditView.prototype, "text", {
		get: function (){
			return this.getText();
		},
		set: function(value){
			this.setText(value)
		}
	});

	// Define multiline property
	Object.defineProperty(TextEditView.prototype, "multiline", {
		get: function (){
			return this.getMultiline();
		}
	});
	// Define wordwrap property
	Object.defineProperty(TextEditView.prototype, "wordwrap", {
		get: function (){
			return this.getWordWrap();
		}
	});
	// Define readonly property
	Object.defineProperty(TextEditView.prototype, "readonly", {
		get: function (){
			return this.getReadOnly();
		}
	});

	// Define tag property
	Object.defineProperty(TextEditView.prototype, "tag", {
		get: function (){
			return this._tag;
		}
	});

	TextEditView.prototype.setX = function (value) {
		var val = value + "px";
		$("#" + this._id).css("left", val);
		this._x = value;
	}

	TextEditView.prototype.setY = function (value) {
		var val = value + "px";
		$("#" + this._id).css("top", val);
		this._y = value;
	}

	TextEditView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#" + this._id).css("width", val);
		this._width = value;
	}

	TextEditView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#" + this._id).css("height", val);
		this._height = value;
	}

	TextEditView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this._backgroundColor = value;
	}

	TextEditView.prototype.setForegroundColor = function (value) {
		$("#" + this._id).css("color", value);
		this._foregroundColor = value;
	}

	TextEditView.prototype.setOpacity = function (value) {
		$("#" + this._id).css("opacity", value);
		this._opacity = value;
	}

	TextEditView.prototype.setAngle = function (value) {
	}

	TextEditView.prototype.setFillStyle = function (value) {
	}

	TextEditView.prototype.setFillOpacity = function (value) {
	}

	TextEditView.prototype.setStrokeStyle = function (value) {
	}

	TextEditView.prototype.setStrokeOpacity = function (value) {
	}

	TextEditView.prototype.getText = function () {
		return this.unparseText(this._text);
	}

	TextEditView.prototype.setText = function (value) {
		
		if (value == null) return;

		var contents = this.parseText(value);
		var element = $("#" + this._id);

		element.val(contents);
		// if (this.type == "textarea"){
		// 	element.html(contents);
		// }
		// else {
		// 	element.val(contents);
		// }

		this._text = value;
	}

	TextEditView.prototype.parseText = function (value) {
		var str = value.toString();
		str = str.replace("\"", "&quot;");
		return str;
	}

	TextEditView.prototype.unparseText = function (value) {
		var str = value.toString();
		str = str.replace("&quot;", "\"");
		str = str.replace("<br/>", "\n");
		return str;
	}

	TextEditView.prototype.getAlign = function () {
		return this.align;
	}

	TextEditView.prototype.setAlign = function (value) {
		if (typeof value == "undefined" || value == "") value = this.align;

		var align = "";
		if (value == "Center")
			align = "text-center";
		else if (value == "Right")
			align = "text-right";
		else
			align = "text-left";

		$("#" + this._id).removeClass("text-center");
		$("#" + this._id).removeClass("text-right");
		$("#" + this._id).removeClass("text-left");
		$("#" + this._id).addClass(align);

		this.align = value;
	}

	TextEditView.prototype.getMultiline = function () {
		return this._multiline;
	}

	TextEditView.prototype.getReadOnly = function () {
		return this._readonly;
	}

	TextEditView.prototype.getWordWrap = function () {
		return this._wordwrap;
	}

	TextEditView.prototype.getValue = function () {
		return $("#" + this._id).val();
	}

	TextEditView.prototype.setTagValue = function (value) {
		if (this._tag != null && typeof this._tag != "undefined" && this._tag != "") {
			this._tag.setValue(value, this.securityKey);
		} else {
			this._text = value;
        }
	}

	TextEditView.prototype.keyupChanged = function (e) {
		var value = this.getValue();
		e.preventDefault();
		if (e.keyCode == 13) {
			this.setTagValue(value);
		}
	}

	TextEditView.prototype.focusBlurChanged = function (e) {
		var value = this.getValue();
		this.setTagValue(value);
	}

	TextEditView.prototype.tagValueChanged = function (e) {
		var textFormat = null;
		if (this._tag.type == "analog") {
			textFormat = {};
			textFormat.category = "Number";
			textFormat.decimals = 2;
			textFormat.unit = "";
		}
		var value = page.getValueByFormat(this._tag, textFormat, e.valueString);
		this.setText(value);
	}

	TextEditView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	TextEditView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createTextEdit = function (arg) {
		var view = new TextEditView(arg);
		var initText = arg.text;
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view._tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
			if(tag.type == "digital"){
				initText = (tag.value) ? tag.onText.toString() : tag.offText.toString();
			} else {
				initText = (tag.value != null) ? tag.value.toString() : view.nullText;
			}
		}
		view.addEventListener("keyup", function (event) {
			view.keyupChanged(event);
		});
		view.addEventListener("blur", function (event) {
			view.focusBlurChanged(event);
		});

		view.setText(initText);
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// CheckEditView	
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	//------------------------------------------------------------------------------------------------------------------- CheckEditView	
	function CheckBoxView(arg) {
		
		ViewElement.call(this, arg);
		
		this.backgroundColor = arg.backgroundColor;
		this.foregroundColor = arg.foregroundColor;
		this.align = arg.align;

		this._text = arg.text;
		this._checked = arg.checked;
		this._tag = arg.tag;
	}
	CheckBoxView.prototype = Object.create(ViewElement.prototype);
	CheckBoxView.prototype.constructor = CheckBoxView;
	
	// Define property text
	Object.defineProperty(CheckBoxView.prototype, "text", {
		get: function (){
			return this.getText();
		}
	});

	// Define property check
	Object.defineProperty(CheckBoxView.prototype, "checked", {
		get: function (){
			return this.getChecked();
		},
		set: function(value){
			this.setTagValue(value);
			this.setControlValue(value);			
		}
	});
	
	// Define property tag
	Object.defineProperty(CheckBoxView.prototype, "tag", {
		get: function (){
			return this._tag;
		}
	});	

	CheckBoxView.prototype.setX = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("left", val);
		this._x = value;
	}

	CheckBoxView.prototype.setY = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("top", val);
		this._y = value;
	}

	CheckBoxView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("width", val);
		this._width = value;
	}

	CheckBoxView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("height", val);
		this._height = value;
	}

	CheckBoxView.prototype.getBackgroundColor = function () {
		return this.backgroundColor;
	}

	CheckBoxView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	CheckBoxView.prototype.getForegroundColor = function () {
		return this.foregroundColor;
	}

	CheckBoxView.prototype.setForegroundColor = function (value) {
		$("#l" + this._id).css("color", value);
		this.foregroundColor = value;
	}

	CheckBoxView.prototype.setOpacity = function (value) {
		$("#l" + this._id).css("opacity", value);
		this._opacity = value;
	}

	CheckBoxView.prototype.setAngle = function (value) { }

	CheckBoxView.prototype.setFillStyle = function (value) { }

	CheckBoxView.prototype.setFillOpacity = function (value) { }

	CheckBoxView.prototype.setStrokeStyle = function (value) { }

	CheckBoxView.prototype.setStrokeOpacity = function (value) { }

	CheckBoxView.prototype.getText = function () {
		return this._text;
	}

	CheckBoxView.prototype.setText = function (value) {
		if (value == null) return;
		$("#l" + this._id).html(value);

		this._text = value;
	}

	CheckBoxView.prototype.getAlign = function () {
		return this.align;
	}

	CheckBoxView.prototype.setAlign = function (value) {
		if (typeof value == "undefined" || value == "") value = this.align;

		var align = "";
		if (value == "Center")
			align = "center";
		else if (value == "Right")
			align = "right";
		else
			align = "left";

		$("#l" + this._id).css("text-align", value);
		this.align = value;
	}

	CheckBoxView.prototype.getChecked = function () {
		return this._checked;
	}

	CheckBoxView.prototype.setChecked = function (value) {
		this._checked = value;
	}

	CheckBoxView.prototype.setControlValue = function (value) {
		$("#i" + this._id).prop('checked', value);
		this.setChecked(value);
	}

	CheckBoxView.prototype.setTagValue = function (value) {
		if (this._tag != null && typeof this._tag != "undefined" && this._tag!= "") {
			this._tag.setValue(value, this.securityKey);
		}
	}

	CheckBoxView.prototype.checkedChanged = function (e) {
		var value = e.target.checked;
		this.setChecked(value);
		this.setTagValue(value);
	}

	CheckBoxView.prototype.tagValueChanged = function (e) {
		var value = e.value >= 1 ? true : false;
		this.setControlValue(value);
	}

	CheckBoxView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	CheckBoxView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createCheckBox = function (arg) {
		var view = new CheckBoxView(arg);
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view._tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
		}
		view.addEventListener("change", function (event) {
			view.checkedChanged(event);
		});
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// RadioButtonView	
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	function RadioButtonView(arg) {
		
		ViewElement.call(this, arg);

		this.backgroundColor = arg.backgroundColor;
		this.foregroundColor = arg.foregroundColor;
		
		this._text = arg.text;
		this._checked = arg.checked;
		this._tag = arg.tag;
		this.align = arg.align;		
		this.groupName = arg.groupName;
	}
	RadioButtonView.prototype = Object.create(ViewElement.prototype);
	RadioButtonView.prototype.constructor = RadioButtonView;

	// Define property text
	Object.defineProperty(RadioButtonView.prototype, "text", {
		get: function (){
			return this.getText();
		}
	});

	// Define property check
	Object.defineProperty(RadioButtonView.prototype, "checked", {
		get: function (){
			return this.getChecked();
		},
		set: function(value){
			this.setTagValue(value);
			this.setControlValue(value);			
		}
	});
	
	// Define property tag
	Object.defineProperty(RadioButtonView.prototype, "tag", {
		get: function (){
			return this._tag;
		}
	});		

	RadioButtonView.prototype.setX = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("left", val);
		this._x = value;
	}
	RadioButtonView.prototype.setY = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("top", val);
		this._y = value;
	}

	RadioButtonView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("width", val);
		this._width = value;
	}

	RadioButtonView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#l" + this._id).css("height", val);
		this._height = value;
	}

	RadioButtonView.prototype.getBackgroundColor = function () {
		return this.backgroundColor;
	}

	RadioButtonView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		this.backgroundColor = value;
	}

	RadioButtonView.prototype.getForegroundColor = function () {
		return this.foregroundColor;
	}

	RadioButtonView.prototype.setForegroundColor = function (value) {
		$("#l" + this._id).css("color", value);
		this.foregroundColor = value;
	}

	RadioButtonView.prototype.setOpacity = function (value) {
		$("#l" + this._id).css("opacity", value);
		this._opacity = value;
	}

	RadioButtonView.prototype.setFillStyle = function (value) { }

	RadioButtonView.prototype.setFillOpacity = function (value) { }

	RadioButtonView.prototype.setStrokeStyle = function (value) { }

	RadioButtonView.prototype.setStrokeOpacity = function (value) { }

	RadioButtonView.prototype.getText = function () {
		return text;
	}

	RadioButtonView.prototype.setText = function (value) {
		if (value == null) return;
		$("#l" + this._id).html(contents);

		this._text = value;
	}

	RadioButtonView.prototype.getAlign = function () {
		return this.align;
	}

	RadioButtonView.prototype.setAlign = function (value) {
		if (typeof value == "undefined" || value == "") value = this.align;

		var align = "";
		if (value == "Center")
			align = "center";
		else if (value == "Right")
			align = "right";
		else
			align = "left";
			
		$("#l" + this._id).css("text-align", value);
		this.align = value;
	}

	RadioButtonView.prototype.getChecked = function () {
		return this._checked;
	}

	RadioButtonView.prototype.setChecked = function (value) {
		this._checked = value;
	}

	RadioButtonView.prototype.getGroupName = function () {
		return this.groupName;
	}

	RadioButtonView.prototype.setGroupName = function (value) {
		$("#i" + this._id).prop('name', value);
		this.groupName = value;
	}

	RadioButtonView.prototype.setControlValue = function (value) {
		$("#i" + this._id).prop('checked', value);
		this.setChecked(value);
	}

	RadioButtonView.prototype.setTagValue = function (value) {
		if (this._tag != null && typeof this._tag != "undefined" && this._tag!= "") {
			this._tag.setValue(value, this.securityKey);
		}
	}

	RadioButtonView.prototype.checkedChanged = function (e) {
		var value = e.target.checked;
		this.setChecked(value);
		this.setTagValue(value);
	}

	RadioButtonView.prototype.tagValueChanged = function (e) {
		var value = e.value >= 1 ? true : false;
		this.setControlValue(value);
	}

	RadioButtonView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	RadioButtonView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createRadioButton = function (arg) {
		var view = new RadioButtonView(arg);
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view._tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
		}
		view.addEventListener("change", function (event) {
			view.checkedChanged(event);
		});
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// ComboBoxView	
/////////////////////////////////////////////////////////////////////////////////////
(function () {	
	//------------------------------------------------------------------------------------------------------------------- ComboBoxView	
	function ComboBoxView(arg) {
		
		ViewElement.call(this, arg);
		
		this.backgroundColor = arg.backgroundColor;
		this.foregroundColor = arg.foregroundColor;
		this.itemvalues = arg.items;
		this._items = page.createComboBoxItems(this, arg.items);
		this._text = arg.text;
		this._tag = arg.tag;		
		this._readonly = arg.readonly;
	}
	ComboBoxView.prototype = Object.create(ViewElement.prototype);
	ComboBoxView.prototype.constructor = ComboBoxView;

	Object.defineProperty(ComboBoxView.prototype, "text", {
		get: function(){
			return this.getText();
		},
		set: function(value){
			this.setTagValue(value);
			this.setControlValue(value);
		}
	});
	Object.defineProperty(ComboBoxView.prototype, "readonly", {
		get: function(){
			return this._readonly;
		}
	});
	Object.defineProperty(ComboBoxView.prototype, "tag", {
		get: function(){
			return this._tag;
		}
	});
	
	Object.defineProperty(ComboBoxView.prototype, "items", {
		get: function(){
			return this._items;
		},
		configurable: true
	});


	ComboBoxView.prototype.setX = function (value) {
		var val = value + "px";
		$("#" + this._id).css("left", val);
		this._x = value;
	}

	ComboBoxView.prototype.setY = function (value) {
		var val = value + "px";
		$("#" + this._id).css("top", val);
		this._y = value;
	}

	ComboBoxView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#" + this._id).css("width", val);
		this._width = value;
	}

	ComboBoxView.prototype.setHeight = function (value) {
		this._height = value;
	}

	ComboBoxView.prototype.getBackgroundColor = function () {
		return this.backgroundColor;
	}

	ComboBoxView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).find("input").css("background-color", value);
		$("#" + this._id).find("select").css("background-color", value);
		this.backgroundColor = value;
	}

	ComboBoxView.prototype.getForegroundColor = function () {
		return this.foregroundColor;
	}

	ComboBoxView.prototype.setForegroundColor = function (value) {
		$("#" + this._id).find("input").css("color", value);
		$("#" + this._id).find("select").css("color", value);
		this.foregroundColor = value;
	}

	ComboBoxView.prototype.setOpacity = function (value) {
		$("#" + this._id).find("input").css("opacity", value);
		$("#" + this._id).find("select").css("opacity", value);
		this._opacity = value;
	}

	ComboBoxView.prototype.setAngle = function (value) { }

	ComboBoxView.prototype.setFillStyle = function (value) { }

	ComboBoxView.prototype.setFillOpacity = function (value) { }

	ComboBoxView.prototype.setStrokeStyle = function (value) { }

	ComboBoxView.prototype.setStrokeOpacity = function (value) { }

	ComboBoxView.prototype.getItems = function () {
		return this.itemvalues;
	}

	ComboBoxView.prototype.getText = function () {
		return this._text;
	}

	ComboBoxView.prototype.setText = function (value) {
		if (value == null) return;
		
		var contents = value;
		$("#" + this._id).find("input").val(contents);

		this._text = value;
	}

	ComboBoxView.prototype.getValue = function () {
		return $("#" + this._id).find("input").val();
	}

	ComboBoxView.prototype.setTagValue = function (value) {
		if (this._tag != null && typeof this._tag != "undefined" && this._tag!= "") {
			this._tag.setValue(value, this.securityKey);
		} else {
			this.setControlValue(value);
		}
	}

	ComboBoxView.prototype.setControlValue = function (value) {
		var items = this.getItems();

		var selectUI = $("#" + this._id).find("select");
		selectUI.val(value).prop("selected", false);
		if (items.indexOf(value) != -1) {
			selectUI.val(value).prop("selected", true);
		}
		this.setText(value);
	}

	ComboBoxView.prototype.keyupChanged = function (e) {
		var value = this.getValue();
		e.preventDefault();
		if (e.keyCode == 13) {
			this.setTagValue(value);
		}
	}

	ComboBoxView.prototype.focusBlurChanged = function (e) {
		var value = this.getValue();
		this.setTagValue(value);
	}

	ComboBoxView.prototype.selectedValueChanged = function (e) {
		var value = e.target.value;
		this.setTagValue(value);
	}

	ComboBoxView.prototype.tagValueChanged = function (e) {
		this.setControlValue(e.value);
	}

	ComboBoxView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	ComboBoxView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	ComboBoxView.prototype.refresh = function(){
		// Remove all options item
		var selectObj = $('#' + this._id).find('select');
		selectObj.find("option").remove().end();

		// Update option item
		var itemCount = this.itemvalues.length;
		for(var i = 0; i < itemCount; i++){
			var value = this.itemvalues[i];
			var option = document.createElement("option");			
			option.value = option.text = value;
			selectObj.append(option);
		}
	}

	page.createComboBox = function (arg) {
		var initText = arg.text;
		var view = new ComboBoxView(arg);
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view._tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
			initText = (tag.value != null) ? tag.value.toString() : "";
		}
		view.addEventListener("change", function (event) {
			view.selectedValueChanged(event);
		});
		view.addEventListener("keyup", function (event) {
			view.keyupChanged(event);
		});
		view.addEventListener("blur", function (event) {
			view.focusBlurChanged(event);
		});
		
		view.setText(initText);

		page.protoViews[arg.id] = view;
		return view;
	}

	page.createComboBoxItems = function (owner, arg) {
		return new ComboBoxItems(owner, arg);		
	}

	function ComboBoxItems(_owner, arg){
		this.owner = _owner;
		this._items = _owner.itemvalues;
	}

	ComboBoxItems.prototype.clear = function(){
		var count = this._items.length;
		this._items.splice(0, count);
		this.owner.refresh();
	}
	ComboBoxItems.prototype.add = function(data){
		if(data == null || data == "") return;
		this._items.push(data);
		this.owner.refresh();
	}
	ComboBoxItems.prototype.addAt = function(index, data){
		if(data == null || data == "") return;
		this._items.splice(index, 0 , data);
		this.owner.refresh();
	}
	ComboBoxItems.prototype.remove = function(data){		
		var count = this._items.length;
		if(count == 0) return;
		
		var index = this._items.indexOf(data);
		if(index < 0) return;

		this._items.splice(index, 1);
		this.owner.refresh();
	}
	ComboBoxItems.prototype.removeAt = function(index){
		var count = this._items.length;
		if(count == 0 || count <= index) return;
		this._items.splice(index, 1);
		this.owner.refresh();
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// DateTimeEditView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	//------------------------------------------------------------------------------------------------------------------- DateTimeEditView	
	function DateTimeEditView(arg) {
		
		ViewElement.call(this, arg);

		this.format = arg.format;
		this.showSpin = arg.showSpin;

		this._value = arg.value;
		this._tag = arg.tag;		
	}
	DateTimeEditView.prototype = Object.create(ViewElement.prototype);
	DateTimeEditView.prototype.constructor = DateTimeEditView;

	Object.defineProperty(DateTimeEditView.prototype, "value", {
		get: function(){
			return new Date(this.getValue());
		},
		set: function (value) {
			var m = moment(value);
			var valueStr = m.format(this.getFormat());
			this.setTagValue(valueStr);
			this.setControlValue(valueStr);
		}
	});
	Object.defineProperty(DateTimeEditView.prototype, "tag", {
		get: function(){
			return this._tag;
		}
	});
	
	DateTimeEditView.prototype.setX = function (value) {
		var val = value + "px";
		$("#" + this._id).css("left", val);
		this._x = value;
	}

	DateTimeEditView.prototype.setY = function (value) {
		var val = value + "px";
		$("#" + this._id).css("top", val);
		this._y = value;
	}

	DateTimeEditView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#" + this._id).css("width", val);
		this._width = value;
	}

	DateTimeEditView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#" + this._id).css("height", val);
		$("#" + this._id).find("input").css("height", val);

		this._height = value;
	}

	DateTimeEditView.prototype.setAngle = function (value) { }

	DateTimeEditView.prototype.setOpacity = function (value) { }

	DateTimeEditView.prototype.setFillStyle = function (value) { }

	DateTimeEditView.prototype.setFillOpacity = function (value) { }

	DateTimeEditView.prototype.setStrokeStyle = function (value) { }

	DateTimeEditView.prototype.setStrokeOpacity = function (value) { }

	DateTimeEditView.prototype.getFormat = function () {
		var defaultFormat = "YYYY-MM-DD";
		if (this.format == null || this.format == "" || typeof this.format == "undefined") return defaultFormat;

		var format = this.format.replace(/y/gi, "Y").replace(/d/gi, 'D').replace(/f/gi, 'S').replace(/t/gi, '').trim();
		if (this.momentValue(this.getValue(), format) == null)
			return defaultFormat;
		else
			return format;
	}

	DateTimeEditView.prototype.getValue = function () {
		if(this._value == "0001-01-01 00:00:00"){
			this._value = new Date().format("yyyy-MM-dd HH:mm:ss");
		};
		return this._value;
	}

	DateTimeEditView.prototype.setValue = function (value) {		
		this.setDatepickerValue(value);
		this._value = value;
	}

	DateTimeEditView.prototype.getText = function (value) {
		return $("#" + this._id).find("input").val();
	}

	DateTimeEditView.prototype.setControlValue = function (value) {
		this.setValue(value, this.securityKey);
	}

	DateTimeEditView.prototype.setTagValue = function (value) {
		if (this._tag != null && typeof this._tag != "undefined" && this._tag!= "") {
			this._tag.setValue(value, this.securityKey);
		}
	}

	DateTimeEditView.prototype.momentValue = function (value, format) {
		var m = moment(value, format).format();
		return m == "Invalid date" ? null : m;
	}

	DateTimeEditView.prototype.momentValueFormat = function (value) {
		if (value == null || value == "" || typeof value == "undefined") return "";

		var m = this.momentValue(value, this.getFormat());
		return m;
	}

	DateTimeEditView.prototype.setDatepickerValue = function (value) {
		if (value == null || value == "" || typeof value == "undefined") return;
		$("#" + this._id).data("DateTimePicker").date(value);
	}

	DateTimeEditView.prototype.setDatepicker = function () {
		var fm = this.getFormat();
		$("#" + this._id).datetimepicker({
			format: fm,
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

		var value = moment(this.getValue()).format(fm);
		var valueDate = this.momentValueFormat(value);

		var nowDate = moment().format(fm);
		var defaultDate = this.momentValueFormat(nowDate);

		
		if (valueDate != null) {			
			this.setDatepickerValue(valueDate);
			this._value = valueDate; 
		} else {
			this.setDatepickerValue(defaultDate);
			this._value = defaultDate; 
		}

		var view = this;
		$("#" + this._id).find("input").keydown(function (key) { view.keydownChanged(key); });
		$("#" + this._id).find("input").blur(function () { view.focusBlurChanged(); });
	}

	DateTimeEditView.prototype.keydownChanged = function (e) {
		if (e.keyCode == 13) {
			var value = this.getText();
			this.setTagValue(value);
			this.setValue(value);
		}
	}

	DateTimeEditView.prototype.focusBlurChanged = function () {
		var value = this.getText();
		this.setTagValue(value);
		this.setValue(value);
	}

	DateTimeEditView.prototype.tagValueChanged = function (e) {
		this.setControlValue(e.value);
	}

	DateTimeEditView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	DateTimeEditView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createDateTimeEdit = function (arg) {
		var view = new DateTimeEditView(arg);
		if (arg.tag != "") {
			var tag = scada.getTagByName(arg.tag);
			view._tag = tag;
			tag.addEventListener("change", function (event) {
				view.tagValueChanged(event);
			});
		}
		page.protoViews[arg.id] = view;
		view.setDatepicker();

		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// AlarmStatusView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	//------------------------------------------------------------------------------------------------------------------- AlarmStatusView
	function AlarmStatusView(arg) {
		this.id = arg.id;
		this._visible = arg.visible;
		this.x = arg.x;
		this.y = arg.y;
		this.width = arg.width;
		this.height = arg.height;
		this.alarmColor = arg.alarmColor;
		this.normalColor = arg.normalColor;
		this.acknowledgeColor = arg.acknowledgeColor;
		this.showHeader = arg.showHeader;
		this.showToolbar = arg.showToolbar;
		this.page_nav = true;
		this.columns = arg.columns;
		this.status = arg.status;
		this.levels = arg.levels;
		this.levelsPool = arg.levelsPool;
		this.zones = arg.zones;
		this.zonesPool = arg.zonesPool;
		this.controlFont = arg.controlFont;
		this.maxRows = 300000;
		this.itemMap = new $HashMap();
		this.securityKey = arg.securityKey;
	}
	Object.defineProperty(AlarmStatusView.prototype, "visible", {
        get: function () {
            return this.getVisible();
        },
		set: function(value){
			this.setVisible(value);
		},
        configurable: true
    });

	AlarmStatusView.prototype.getColumns = function () {
		return this.columns.slice(0);
	}

	AlarmStatusView.prototype.getRect = function () {
		return page.getRect(this);
	}

	AlarmStatusView.prototype.getVisible = function () {
		return this._visible;
	}

	AlarmStatusView.prototype.setVisible = function (value) {
		var visibility = value == true ? "visible" : "hidden";
		var pVisible = page.parentNodeVisibility(this.id);
		if (pVisible != null && pVisible != "visible") {
			visibility = pVisible;
		}

		$("#" + this.id).css("visibility", visibility);
		this._visible = value;
	}

	AlarmStatusView.prototype.setVisibleByGroup = function (value) {
		if (value == false) {
			$("#" + this.id).css("visibility", "hidden");
			return;
		}
		if (this._visible == true) {
			$("#" + this.id).css("visibility", "visible");
		} else {
			$("#" + this.id).css("visibility", "hidden");
		}
	}

	AlarmStatusView.prototype.getX = function () {
		return this.x;
	}

	AlarmStatusView.prototype.setX = function (value) {
		var val = value + "px";
		$("#" + this.id).css("left", val);
		this.x = value;
	}

	AlarmStatusView.prototype.getY = function () {
		return this.y;
	}

	AlarmStatusView.prototype.setY = function (value) {
		var val = value + "px";
		$("#" + this.id).css("top", val);
		this.y = value;
	}

	AlarmStatusView.prototype.getWidth = function () {
		return this.width;
	}

	AlarmStatusView.prototype.setWidth = function (value) {
		var val = value + "px";
		$("#" + this.id).css("width", val);
		this.width = value;
	}

	AlarmStatusView.prototype.getHeight = function () {
		return this.height;
	}

	AlarmStatusView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#" + this.id).css("height", val);

		var listid = this.getGridListID();
		var listHeight = this.calcGridHeight(value);
		$("#" + listid).closest(".ui-jqgrid-bdiv").height(listHeight);

		this.height = value;
	}

	AlarmStatusView.prototype.setAngle = function (value) { }

	AlarmStatusView.prototype.setOpacity = function (value) { }

	AlarmStatusView.prototype.setFillStyle = function (value) { }

	AlarmStatusView.prototype.setFillOpacity = function (value) { }

	AlarmStatusView.prototype.setStrokeStyle = function (value) { }

	AlarmStatusView.prototype.setStrokeOpacity = function (value) { }

	AlarmStatusView.prototype.getAlarmColor = function (level) {
		if (!level) return this.alarmColor;

		var config = scada.getLevelConfigByName(level);
		if (config && config.color != "") return config.color;
		else return this.alarmColor;
	}

	AlarmStatusView.prototype.setAlarmColor = function (value) {
		this.alarmColor = value;
	}

	AlarmStatusView.prototype.getNormalColor = function () {
		return this.normalColor;
	}

	AlarmStatusView.prototype.setNormalColor = function (value) {
		this.normalColor = value;
	}

	AlarmStatusView.prototype.getAcknowledgeColor = function () {
		return this.acknowledgeColor;
	}

	AlarmStatusView.prototype.setAcknowledgeColor = function (value) {
		this.acknowledgeColor = value;
	}

	AlarmStatusView.prototype.getShowHeader = function () {
		return this.showHeader;
	}

	AlarmStatusView.prototype.setShowHeader = function (value) {
		this.showHeader = value;
	}

	AlarmStatusView.prototype.getShowToolbar = function () {
		return this.showToolbar;
	}

	AlarmStatusView.prototype.setShowToolbar = function (value) {
		this.showToolbar = value;
	}

	AlarmStatusView.prototype.calcGridHeight = function (value) {
		var captionSize = 0;
		var toolbarSize = this.getShowToolbar() ? 27 : 0;
		var headerSize = this.getShowHeader() ? 22 : 0;
		var pagerSize = this.page_nav == true ? 25 : 0;

		return value - captionSize - toolbarSize - headerSize - pagerSize - 5;
	}

	AlarmStatusView.prototype.getData = function () {
		return this.getLocalData();
	}

	//------------------------------------------------------------------------------------------- Get Grid Data Idx
	AlarmStatusView.prototype.getDataIDs = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getDataIDs');
	}

	AlarmStatusView.prototype.isSatusDataFilter = function (alarm) {
		if (this.status && this.status.length > 0) {
			var status = this.status[0];
			if (status != "") {
				if (alarm.status.toString() != status) {
					return true;
				}
			}
		}
		if (this.levels) {
			if ($.inArray(alarm.level, this.levels) < 0) {
				return true;
			}
		}
		if (this.zones) {
			if ($.inArray(alarm.zone, this.zones) < 0) {
				return true;
			}
		}
		return false;
	}

	//------------------------------------------------------------------------------------------- Request Alarm Status Data
	AlarmStatusView.prototype.getStatusData = function (event) {
		var alarms = !event ? scada.getAlarmList() : [scada.getAlarmByName(event.name)];
		if (!alarms) return;

		alarms.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
		var items = [];
		var alarmsCount = alarms.length;
		var removeMap = new $HashMap();

		for (var i = 0; i < alarmsCount; i++) {
			var alarm = alarms[i];
			if (!alarm) continue;

			//필터에 걸러지는 데이터인가?
			if (this.isSatusDataFilter(alarm) == true) {
				removeMap.put(alarm.name, alarm);
				continue;
			}

			var levelConfig = scada.getLevelConfigByName(alarm.level);
			var zoneConfig = scada.getZoneConfigByName(alarm.zone);

			var item = {};
			item.id = alarm.idx;
			item.no = item.id + 1;
			item.time = alarm.time == "" ? " " : alarm.time;
			item.name = alarm.name;
			item.acknowledged = alarm.acknowledged;
			item.status = alarm.status;
			item.level = alarm.level;
			item.levelText = levelConfig && levelConfig.displayName != "" ? levelConfig.displayName : alarm.level;
			item.zone = zoneConfig && zoneConfig.displayName != "" ? zoneConfig.displayName : alarm.zone;
			item.message = alarm.message;
			item.enabled = alarm.enabled;
			item.statusText = this.statusText(alarm.status, alarm.enabled, alarm.acknowledged);
			item.tagName = alarm.tag;
			//item.tagValue = alarm.tagValue; 태그 실시간 값은 표현하지 않기로 결정
			items.push(item);
		}

		//var data = [{name:"A", status:false, enabled:false, acknowledged:false, statusText:"Occurred", level:"1", zone:"A", message:"A message"}];
		event ? this.setEventData(items, removeMap) : this.setData(items);
	}

	//-------------------------------------------------------------------------------------------  Request Alarm Status Data 출력

	AlarmStatusView.prototype.setEventData = function (items, removeMap) {
		if ((!items || items.length == 0) && (!removeMap || removeMap.length == 0)) return;

		var listid = this.getGridListID();

		//----------------------------------------------- 필터조건에 맞는 grid row delete
		if (removeMap && removeMap.length > 0) {

			var removeList = removeMap.values();
			for (var i = 0; i < removeList.length; i++) {
				$("#" + listid).jqGrid('delRowData', removeList[i].idx);

				if (this.itemMap.length > 0) {
					var point = this.itemMap.point(removeList[i].name);
					if (typeof point != "undefined") {
						this.itemMap.remove(point);
					}
				}
			}
		}

		var itemsCount = items.length;
		for (var i = 0; i < itemsCount; i++) {
			var item = items[i];

			if (!item) {
				console.log(itme);
			}

			var mapvalue = this.itemMap.get(item.name);
			console.log(mapvalue);
			if (typeof mapvalue != "undefined" && mapvalue >= 0) {
				console.log(item.no);
				//Grid cacheData 수정.
				$("#" + listid).jqGrid('setRowData', item.id, item);

				//Grid rowData 수정.
				var rowData = $("#" + listid).jqGrid('getGridParam', 'data');
				var rowIndex = $("#" + listid).jqGrid('getGridParam', '_index');

				var itemIndex = rowIndex[item.id];
				var rowItem = rowData[itemIndex];

				rowItem.time = item.time;
				rowItem.status = item.status;
				rowItem.statusText = item.statusText;
			}
			else {
				if (this.itemMap.length >= this.maxRows) break;
				item.id = scada.getAlarmByName(item.name).idx;
				item.no = item.id + 1;
				$("#" + listid).jqGrid("addRowData", item.id, item);
				this.itemMap.put(item.name, item.no);
			}
			var color = this.statusColor(item.level, item.status, item.enabled, item.acknowledged);
			$("#" + listid).setRowData(item.id, false, { color: color });
		}

	}

	AlarmStatusView.prototype.setData = function (items) {
		var itemsCount = items.length;

		this.itemMap = new $HashMap();
		var data = [];
		for (var i = 0; i < itemsCount; i++) {
			if (i >= this.maxRows) break;
			data.push(items[i]);
			this.itemMap.put(items[i].name, items[i].no);
		}
		var listid = this.getGridListID();
		$("#" + listid).jqGrid('clearGridData');
		$("#" + listid).jqGrid('setGridParam', { data: data }).trigger("reloadGrid");
		$("#" + listid + " .ui-widget-content").css('border', '0px solid #ddd');

		this.setStatusCaption();
	}

	AlarmStatusView.prototype.setStatusCaption = function () {
		var status = "";
		if (this.status && this.status.length > 0) {
			status = this.status[0];
		}

		var statusItems = this.getStatusItems();
		var statusItemsCount = statusItems.length;
		var statusText = "";
		for (var i = 0; i < statusItemsCount; i++) {
			var item = statusItems[i];
			if (item.value == status) {
				statusText = item.displayName;
				break;
			}
		}

		var toolbarid = this.getToolbarID();
		var statusid = toolbarid + "_status";

		var buttonHtml = '';
		buttonHtml += '<span class="glyphicon" aria-hidden="true"></span> ' + statusText;
		$("#" + statusid).html(buttonHtml);
	}

	//------------------------------------------------------------------------------------------- Alarm Status Text
	AlarmStatusView.prototype.statusText = function (status, enable, acknowledged) {
		if (enable == false) return language.alarm.getStatusName("Disabled");
		if (status == false) return language.alarm.getStatusName("Released");
		if (acknowledged == true) return language.alarm.getStatusName("Acknowledged");
		return language.alarm.getStatusName("Occurred");
	}

	//------------------------------------------------------------------------------------------- Alarm Status Color
	AlarmStatusView.prototype.statusColor = function (level, status, enable, acknowledged) {
		if (enable == false) return "#C0C0C0";
		if (status == false) return this.getNormalColor();
		if (acknowledged == true) return this.getAcknowledgeColor();
		return this.getAlarmColor(level);
	}

	//------------------------------------------------------------------------------------------- Recovery Last Sort 
	AlarmStatusView.prototype.sortRecovery = function () {
		var listid = this.getGridListID();
		var sortname = $("#" + listid).getGridParam('sortname');
		var sortorder = $("#" + listid).getGridParam('sortorder');
		if (sortname != "") {
			$("#" + listid).sortGrid(sortname, true, sortorder);
		}
	}

	//------------------------------------------------------------------------------------------- Enabled Button Event
	AlarmStatusView.prototype.setEnabled = function (value) {
		var rowid = this.getGridSelectedRowID();
		if (rowid == null) {
			alert('no row selected.');
			return;
		}

		var data = this.getGridSelectedRowData(rowid);
		var alarm = scada.getAlarmByName(data.name);
		alarm.sendEnabledValue(value);
	}

	AlarmStatusView.prototype.setAcknowledged = function (value) {
		var rowid = this.getGridSelectedRowID();
		if (rowid == null) {
			alert('no row selected.');
			return;
		}

		var data = this.getGridSelectedRowData(rowid);
		var alarm = scada.getAlarmByName(data.name);
		alarm.sendAcknowledgedValue(value);
	}

	//------------------------------------------------------------------------------------------- Refresh Button Event
	AlarmStatusView.prototype.refresh = function () {
		var listid = this.getGridListID();
		$("#" + listid).jqGrid('clearGridData');

		this.getStatusData();
	}


	AlarmStatusView.prototype.getStatusItems = function () {
		var statusItems = [
			{
				displayName: language.alarm.getStatusName("All"),
				name: "All",
				value: ""
			},
			{
				displayName: language.alarm.getStatusName("Occurred"),
				name: "Occurred",
				value: "true"
			},
			{
				displayName: language.alarm.getStatusName("Released"),
				name: "Released",
				value: "false"
			}
		];

		if (!this.status) {
			this.status = [];
			this.status.push('');
		}

		return statusItems;
	}

	AlarmStatusView.prototype.showStatusForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		var statusItems = this.getStatusItems();

		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-status") + '">';
		var statusItemsCount = statusItems.length;
		for (var i = 0; i < statusItemsCount; i++) {
			var item = statusItems[i];
			if (!item) continue;

			var checked = $.inArray(item.value, this.status) > -1 ? "checked" : "";
			modalHtml += '<div class="radio">';
			modalHtml += '  <label>';
			modalHtml += '    <input type="radio" name="box" value="' + item.value + '" ' + checked + '>' + item.displayName;
			modalHtml += '  </label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 260,
			width: 300,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {
						view.status = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.status.push($(this).val());
						});
						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmStatusView.prototype.getLevelItems = function () {
		var levelItems = scada.getAlarmLevelList();

		if (!this.levels) {
			this.levels = [];
			var levelItemsCount = levelItems.length;
			for (var i = 0; i < levelItemsCount; i++) {
				var item = levelItems[i];
				this.levels.push(item);
			}
		}
		return levelItems;
	}

	AlarmStatusView.prototype.showLevelForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		//var levelItems = this.getLevelItems();	
		var modalHtml = '<div id="' + modalid + '" title=" ' + language.alarm.getModalCaption("title-level") + ' "">';

		for (var i = 0; i < this.levelsPool.length; i++) {
			var item = this.levelsPool[i];

			if (!item) continue;

			var checked = $.inArray(item, this.levels) > -1 ? "checked" : "";

			var config = scada.getLevelConfigByName(item);
			var text = "";
			if (config && config.displayName != "") {
				text = config.displayName;
			} else {
				text = language.alarm.getModalCaption("level") + '&nbsp;' + item;
			}

			modalHtml += '<div class="checkbox margin-left-0">';
			modalHtml += '<label>';
			modalHtml += '<input type="checkbox" name="box" value="' + item + '" ' + checked + '>' + text;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 400,
			width: 340,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-check"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", true);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-uncheck"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", false);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {

						if ($("#" + modalid).find("input[name=box]:checked").length < 1) {
							alert(language.alarm.getModalCaption("msg-nocheck"));
							return;
						}

						view.levels = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.levels.push($(this).val());
						});

						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmStatusView.prototype.getZoneItems = function () {
		var zoneItems = scada.getAlarmZoneList();

		if (!this.zones) {
			this.zones = [];
			var zoneItemsCount = zoneItems.length;
			for (var i = 0; i < zoneItemsCount; i++) {
				var item = zoneItems[i];
				this.zones.push(item);
			}
		}
		return zoneItems;
	}

	AlarmStatusView.prototype.showZoneForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		//var zoneItems = this.getZoneItems();
		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-zone") + '">';

		for (var i = 0; i < this.zonesPool.length; i++) {
			var item = this.zonesPool[i];
			if (!item) continue;

			var checked = $.inArray(item, this.zones) > -1 ? "checked" : "";

			var config = scada.getZoneConfigByName(item);
			var text = "";
			if (config && config.displayName != "") {
				text = config.displayName;
			} else {
				text = language.alarm.getModalCaption("zone") + '&nbsp;' + item;
			}

			modalHtml += '<div class="checkbox margin-left-0">';
			modalHtml += '<label>';
			modalHtml += '<input type="checkbox" name="box" value="' + item + '" ' + checked + '>' + text;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 400,
			width: 340,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-check"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", true);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-uncheck"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", false);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {

						if ($("#" + modalid).find("input[name=box]:checked").length < 1) {
							alert(language.alarm.getModalCaption("msg-nocheck"));
							return;
						}

						view.zones = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.zones.push($(this).val());
						});

						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmStatusView.prototype.save = function (filename) {
		var lang = $Common.detectLanguage();
		var columns = this.getColumns();
		var headers = {};
		var getCellData = function (item, query) {
			switch (query) {
				case "Name": return item.name.replace(/,/g, '');
				case "Time": return item.time;
				case "Zone": return zoneConfig && zoneConfig.displayName != "" ? zoneConfig.displayName : item.zone;
				case "Status": return item.statusText;
				case "Message": return item.message;
				case "No": return item.no;
				case "Level": return item.levelText;
				case "Tag Name": return item.tagName;
				case "Tag Value": return "";
			}
		}

		for (var i = 0; i < columns.length; i++) {
			if (columns[i].visible) {
				headers[columns[i].name] = language.alarm.getColumnName(columns[i].name);
			}
		}

		var data = this.getLocalData();
		var dataCount = data.length;
		var items = [];
		for (var i = 0; i < dataCount; i++) {
			var item = data[i];
			var zoneConfig = scada.getZoneConfigByName(item.zone);
			var record = {};

			for (var j = 0; j < columns.length; j++) {
				if (columns[j].visible) {
					record[columns[j].name] = getCellData(item, columns[j].name);
				}
			}

			items.push(record);
		}

		$Common.exportCSV(headers, items, filename);
	}

	//------------------------------------------------------------------------------------------- Set Toolbar Button 
	AlarmStatusView.prototype.setToolbar = function () {
		var toolbarid = this.getToolbarID();
		var refreshid = toolbarid + "_refresh";
		var enabledid = toolbarid + "_enabled";
		var disabledid = toolbarid + "_disabled";
		var acknowledgedid = toolbarid + "_acknowledged";
		var statusid = toolbarid + "_status";
		var levelid = toolbarid + "_level";
		var zoneid = toolbarid + "_zone";
		var saveid = toolbarid + "_save";

		var buttonHtml = '';
		buttonHtml += '<div class="row">';
		buttonHtml += '	<div class="col-xs-4">';
		buttonHtml += '		<div class="btn-group pull-left padding-left-3" role="group" aria-label="..."> ';
		buttonHtml += '			<button type="button" id="' + refreshid + '"  class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("refresh") + '"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> </button>';
		buttonHtml += '			<button type="button" id="' + enabledid + '"  class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("enabled") + '"><span class="glyphicon glyphicon-play" aria-hidden="true"></span> </button>';
		buttonHtml += '			<button type="button" id="' + disabledid + '"  class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("disabled") + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button>';
		buttonHtml += '			<button type="button" id="' + acknowledgedid + '"  class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("acknowledged") + '"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> </button>';
		buttonHtml += '		</div> ';
		buttonHtml += '	</div>';
		buttonHtml += '	<div class="col-xs-8">';
		buttonHtml += '		<div class="btn-group dropdown pull-right" role="group" aria-label="...">';
		buttonHtml += '			<button type="button" id="' + statusid + '" class="btn btn-default btn-xs" title="' + language.alarm.getToolbarCaption("status") + '"><span class="glyphicon glyphicon-alert" aria-hidden="true"></span></button>';
		buttonHtml += '			<button type="button" id="' + levelid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("level") + '"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> </button>';
		buttonHtml += '			<button type="button" id="' + zoneid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("zone") + '"><span class="glyphicon glyphicon-font" aria-hidden="true"></span> </button>';
		buttonHtml += '			<button type="button" id="' + saveid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("save") + '"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> </button>';
		buttonHtml += '		</div>';
		buttonHtml += '	</div>';


		$("#" + toolbarid).css("height", "27px").css("padding-top", "2px").css("padding-right", "2px").css("text-align", "right");
		$("#" + toolbarid).html(buttonHtml);

		var view = this;
		$("#" + refreshid).click(function () {
			view.refresh();
		});
		$("#" + enabledid).click(function () {
			view.setEnabled(true);
		});
		$("#" + disabledid).click(function () {
			view.setEnabled(false);
		});
		$("#" + acknowledgedid).click(function () {
			view.setAcknowledged(true);
		});
		$("#" + statusid).click(function () {
			view.showStatusForm(statusid);
		});
		$("#" + levelid).click(function () {
			view.showLevelForm(levelid);
		});
		$("#" + zoneid).click(function () {
			view.showZoneForm(zoneid);
		});
		$("#" + saveid).click(function () {
			var filename = "AlarmStatus." + view.id + ".csv";
			view.save(filename);
		});
	}

	//------------------------------------------------------------------------------------------- Set Grid Column Hide
	AlarmStatusView.prototype.setGridColumnHide = function (column) {
		var listid = this.getGridListID();
		$("#" + listid).jqGrid('hideCol', [column]);
	}

	AlarmStatusView.prototype.getGridColumns = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'colModel');
	}

	//------------------------------------------------------------------------------------------- Get Grid Selected Row Index
	AlarmStatusView.prototype.getGridSelectedRowID = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'selrow');
	}

	//------------------------------------------------------------------------------------------- Get Grid Selected Row Indexs
	AlarmStatusView.prototype.getGridSelectedRowIDs = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'selarrrow');
	}

	//------------------------------------------------------------------------------------------- Get Grid Data
	AlarmStatusView.prototype.getLocalData = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'data');
	}

	//------------------------------------------------------------------------------------------- Get Grid Data By Index
	AlarmStatusView.prototype.getGridSelectedRowData = function (rowid) {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getRowData', rowid);
	}


	AlarmStatusView.prototype.getColumn = function (name) {
		if (!name) return null;
		if (!this.columns) return null;

		var columnCount = this.columns.length;
		for (var i = 0; i < columnCount; i++) {
			var item = this.columns[i];
			if (item.name == name) {
				return item;
			}
		}
		return null;
	}

	AlarmStatusView.prototype.getColumnModelItems = function () {
		var lang = $Common.detectLanguage();
		var items = [
			{
				displayName: language.alarm.getColumnName("No"),
				name: 'No',
				value: 'no',
				visible: false,
				width: 50,
				align: "center",
				sorttype: "int",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Time"),
				name: 'Time',
				value: 'time',
				visible: false,
				width: 130,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Name"),
				name: 'Name',
				value: 'name',
				visible: false,
				width: 120,
				align: "left",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Status"),
				name: 'Status',
				value: 'statusText',
				visible: false,
				width: 85,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("StatusValue"),
				name: 'StatusValue',
				value: 'status',
				visible: false,
				width: 85,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Enabled"),
				name: 'Enabled',
				value: 'enabled',
				visible: false,
				width: 85,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Level"),
				name: 'Level',
				value: 'levelText',
				visible: false,
				width: 85,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("LevelValue"),
				name: 'LevelValue',
				value: 'level',
				visible: false,
				width: 85,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Zone"),
				name: 'Zone',
				value: 'zone',
				visible: false,
				width: 55,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			{
				displayName: language.alarm.getColumnName("Tag Name"),
				name: 'Tag Name',
				value: 'tagName',
				visible: false,
				width: 120,
				align: "center",
				sorttype: "text",
				sortable: true
			},
			//{태그 실시간 값은 표현하지 않기로 결정 
			//    displayName: language.alarm.getColumnName("Tag Value"),
			//    name: 'Tag Value',
			//    value: 'tagValue',
			//    visible: false,
			//    width: 80,
			//    align: "center",
			//    sorttype: "text",
			//    sortable: false
			//},
			{
				displayName: language.alarm.getColumnName("Message"),
				name: 'Message',
				value: 'message',
				visible: false,
				width: 300,
				align: "left",
				sorttype: "text",
				sortable: false
			},
			{
				displayName: language.alarm.getColumnName("Acknowledged"),
				name: 'Acknowledged',
				value: 'acknowledged',
				hidden: true,
				align: "center",
				sorttype: "text",
			}
		];

		return items;
	}

	//------------------------------------------------------------------------------------------- Init Grid List
	AlarmStatusView.prototype.initGrid = function (referenceColumns) {
		var listid = this.getGridListID();
		var view = this;

		var columnModelItems = this.getColumnModelItems();
		var columnMatch = [];

		//사용자가 X-SCADA 디자이너에서 정한 순서와 일치시킨다.
		for (var i = 0; i < referenceColumns.length; i++) {

			for (var j = 0; j < columnModelItems.length; j++) {

				if (referenceColumns[i].name == columnModelItems[j].name) {
					columnModelItems[j].visible = referenceColumns[i].visible;
					columnMatch.push(columnModelItems[j]);
					columnModelItems.splice(j, 1);
					break;
				}
			}
		}
		//재정렬된 배열을 기존의 칼럼 배열에 할당.
		columnModelItems = columnMatch.concat(columnModelItems);

		var columnModelItemCount = columnModelItems.length;
		var columnNames = [];
		var columnModel = [];
		for (var i = 0; i < columnModelItemCount; i++) {
			var item = columnModelItems[i];
			var column = this.getColumn(item.name);

			var width = item.width;
			var visible = item.visible;
			if (column) {
				width = column.width;
				visible = column.visible;
			}

			var model = {
				name: item.value,
				index: item.value,
				width: width,
				align: item.align,
				sorttype: item.sorttype,
				sortable: item.sortable,
				hidden: !visible
			}

			columnNames.push(item.displayName);
			columnModel.push(model);
		}

		var option = {
			datatype: "local",
			width: this.getWidth(),
			height: this.calcGridHeight(this.getHeight()),
			colNames: columnNames,
			colModel: columnModel,
			//caption: "Alarm Status",
			multiselect: false,
			autowidth: false,
			shrinkToFit: false,//크기에맞게축소
			hidegrid: false,//view expand button hide
			loadonce: true,
			toolbar: [this.getShowToolbar(), "top"],
			rownumbers: false,
			rownumWidth: 40,
			gridview: true,
			scroll: 1,
			rowattr: function (row) {
				var color = view.statusColor(row.level, row.status, row.enabled, row.acknowledged)
				return { 'style': 'color : ' + color };
			},
			onSortCol: function (index, idxcol, sortorder) {
				$("#" + listid).jqGrid("destroyFrozenColumns");
				var sorticons = $(this.grid.headers[idxcol].el).find(">div.ui-jqgrid-sortable>span.s-ico");
				if (this.p.sortorder === "asc") {
					sorticons.find(">span.ui-icon-asc")[0].style.display = "";
					sorticons.find(">span.ui-icon-asc")[0].style.marginTop = "1px";
					sorticons.find(">span.ui-icon-desc").hide();
				} else {
					sorticons.find(">span.ui-icon-desc")[0].style.display = "";
					sorticons.find(">span.ui-icon-asc").hide();
				}
				$("#" + listid).jqGrid("setFrozenColumns");
			}
		};

		if (this.page_nav == true) {
			var pageid = "#" + this.getGridPageID();
			option.pager = pageid;
			option.rowNum = 100;
			//option.rowList = [10, 20, 30];
			option.viewrecords = true;
			option.recordpos = 'right';
			$("#" + listid).jqGrid(option).navGrid(pageid, {
				edit: false,
				add: false,
				del: false,
				refresh: false,
				search: false
			});
		} else {
			option.rowNum = 100;
			$("#" + listid).jqGrid(option);
		}

		//$("#" + listid).sortGrid("name", true, "asc");
		this.setSortIconHide();
		this.setGridHeader();
		if (this.getShowToolbar()) {
			this.setToolbar();
		}

		this.getStatusItems();
		this.getLevelItems();
		this.getZoneItems();
	}

	AlarmStatusView.prototype.setGridHeader = function () {
		var listid = this.getGridListID();

		var div = "#gview_" + listid + " .ui-jqgrid-hdiv";
		if (this.getShowHeader()) {
			$(div).show();
		} else {
			$(div).hide();
		}

		$(div).css(this.getFontStyle());
	}

	AlarmStatusView.prototype.setSortIconHide = function () {
		var listid = this.getGridListID();
		var div = "#gbox_" + listid + " .s-ico span";
		$(div).hide();
	}

	AlarmStatusView.prototype.getFontStyle = function () {
		if (!this.controlFont) {
			return { "font-size": "9pt", "font-weight": "normal" };
		}

		return {
			"font-family": this.controlFont.name,
			"font-size": this.controlFont.size + "pt",
			"font-weight": this.controlFont.bold ? "bold" : "normal"
		};
	}

	//------------------------------------------------------------------------------------------- Get Grid List ID
	AlarmStatusView.prototype.getGridListID = function () {
		return this.id + "_list";
	}

	//------------------------------------------------------------------------------------------- Get Grid Page ID
	AlarmStatusView.prototype.getGridPageID = function () {
		return this.id + "_page";
	}

	//------------------------------------------------------------------------------------------- Get Grid Toolbar ID
	AlarmStatusView.prototype.getToolbarID = function () {
		return "t_" + this.id + "_list";
	}

	//------------------------------------------------------------------------------------------- Alarm Status Changed Event
	AlarmStatusView.prototype.statusChanged = function (event) {
		this.getStatusData(event);
	}

	//------------------------------------------------------------------------------------------- Alarm Enabled Changed Event
	AlarmStatusView.prototype.enabledChanged = function (event) {
		this.getStatusData(event);
	}

	//------------------------------------------------------------------------------------------- Alarm Acknowledged Changed Event
	AlarmStatusView.prototype.acknowledgedChanged = function (event) {
		this.getStatusData(event);
	}

	//------------------------------------------------------------------------------------------- Alarm tagValue Changed Event
	AlarmStatusView.prototype.tagValueChanged = function (event) {
		this.getStatusData(event);
	}

	//------------------------------------------------------------------------------------------- View 개체 Add Event Listener 
	AlarmStatusView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this.id).addEventListener(type, callback, useCapture);
	};

	//------------------------------------------------------------------------------------------- View 개체 Remove Event Listener 
	AlarmStatusView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this.id).removeEventListener(type, callback, useCapture);
	};

	page.createAlarmStatus = function (arg) {
		var view = new AlarmStatusView(arg);
		page.protoViews[arg.id] = view;

		view.initGrid(arg.columns);
		view.getStatusData();

		var alarms = scada.getAlarmList();
		if (alarms == null) return view;

		var alarmsCount = alarms.length;
		for (var i = 0; i < alarmsCount; i++) {
			var alarm = alarms[i];
			if (!alarm) continue;

			alarm.addEventListener("statusChanged", function (event) {
				view.statusChanged(event);
			});
			alarm.addEventListener("enabledChanged", function (event) {
				view.enabledChanged(event);
			});

			alarm.addEventListener("acknowledgedChanged", function (event) {
				view.acknowledgedChanged(event);
			});

			alarm.addEventListener("tagValueChanged", function (event) {
				view.tagValueChanged(event);
			});
		}		
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// AlarmLogView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
	//------------------------------------------------------------------------------------------------------------------- AlarmLogView
	function AlarmLogView(arg) {
		this.id = arg.id;
		this._visible = arg.visible;
		this.x = arg.x;
		this.y = arg.y;
		this.width = arg.width;
		this.height = arg.height;
		this.alarmColor = arg.alarmColor;
		this.normalColor = arg.normalColor;
		this.acknowledgeColor = arg.acknowledgeColor;
		this.showHeader = arg.showHeader;
		this.showToolbar = arg.showToolbar;
		this.widthMax = 500;
		this.statusAck = "A";
		this.fromDateVal = "";
		this.toDateVal = "";
		this.fromId = -1;
		this.toId = -1;
		this.columns = arg.columns;
		this.levels = arg.levels;
		this.levelsPool = arg.levelsPool;
		this.zones = arg.zones;
		this.zonesPool = arg.zonesPool;
		this.status = arg.status;
		this.tags = [];
		this.showColumns = null;
		this.controlFont = arg.controlFont;
		this.securityKey = arg.securityKey;
	}

	Object.defineProperty(AlarmLogView.prototype, "visible", {
        get: function () {
            return this.getVisible();
        },
		set: function(value){
			this.setVisible(value);
		},
        configurable: true
    });

	AlarmLogView.prototype.getColumns = function () {
		return this.columns.slice(0);
	}

	AlarmLogView.prototype.getRect = function () {
		return page.getRect(this);
	}

	AlarmLogView.prototype.getVisible = function () {
		return this._visible;
	}

	AlarmLogView.prototype.setVisible = function (value) {
		var visibility = value == true ? "visible" : "hidden";
		var pVisible = page.parentNodeVisibility(this.id);
		if (pVisible != null && pVisible != "visible") {
			visibility = pVisible;
		}

		$("#" + this.id).css("visibility", visibility);
		this._visible = value;
	}

	AlarmLogView.prototype.setVisibleByGroup = function (value) {
		if (value == false) {
			$("#" + this.id).css("visibility", "hidden");
			return;
		}
		if (this._visible == true) {
			$("#" + this.id).css("visibility", "visible");
		} else {
			$("#" + this.id).css("visibility", "hidden");
		}
	}

	AlarmLogView.prototype.getX = function () {
		return this.x;
	}

	AlarmLogView.prototype.setX = function (value) {
		var val = value + "px";
		$("#" + this.id).css("left", val);
		this.x = value;
	}

	AlarmLogView.prototype.getY = function () {
		return this.y;
	}

	AlarmLogView.prototype.setY = function (value) {
		var val = value + "px";
		$("#" + this.id).css("top", val);
		this.y = value;
	}

	AlarmLogView.prototype.getWidth = function () {
		return this.width;
	}

	//------------------------------------------------------------------------------------------- Set Width
	AlarmLogView.prototype.setWidth = function (value) {
		value = value < this.widthMax ? this.widthMax : value;
		$("#" + this.id).css("width", value + "px");
		this.width = value;
	}

	//------------------------------------------------------------------------------------------- Get Height
	AlarmLogView.prototype.getHeight = function () {
		return this.height;
	}

	//------------------------------------------------------------------------------------------- Set Height
	AlarmLogView.prototype.setHeight = function (value) {
		var val = value + "px";
		$("#" + this.id).css("height", val);

		var listid = this.getGridListID();
		var listHeight = this.calcGridHeight(value);
		$("#" + listid).closest(".ui-jqgrid-bdiv").height(listHeight);

		this.height = value;
	}

	AlarmLogView.prototype.setAngle = function (value) { }

	AlarmLogView.prototype.setOpacity = function (value) { }

	AlarmLogView.prototype.setFillStyle = function (value) { }

	AlarmLogView.prototype.setFillOpacity = function (value) { }

	AlarmLogView.prototype.setStrokeStyle = function (value) { }

	AlarmLogView.prototype.setStrokeOpacity = function (value) { }

	AlarmLogView.prototype.getAlarmColor = function (level) {
		if (!level) return this.alarmColor;

		var config = scada.getLevelConfigByName(level);
		if (config && config.color != "") return config.color;
		else return this.alarmColor;
	}

	AlarmLogView.prototype.setAlarmColor = function (value) {
		this.alarmColor = value;
	}

	AlarmLogView.prototype.getNormalColor = function () {
		return this.normalColor;
	}

	AlarmLogView.prototype.setNormalColor = function (value) {
		this.normalColor = value;
	}

	AlarmLogView.prototype.getAcknowledgeColor = function () {
		return this.acknowledgeColor;
	}

	AlarmLogView.prototype.setAcknowledgeColor = function (value) {
		this.acknowledgeColor = value;
	}

	AlarmLogView.prototype.getShowHeader = function () {
		return this.showHeader;
	}

	AlarmLogView.prototype.setShowHeader = function (value) {
		this.showHeader = value;
	}

	AlarmLogView.prototype.getShowToolbar = function () {
		return this.showToolbar;
	}

	AlarmLogView.prototype.setShowToolbar = function (value) {
		this.showToolbar = value;
	}

	//------------------------------------------------------------------------------------------- Grid Height 재계산
	AlarmLogView.prototype.calcGridHeight = function (value) {
		var captionSize = 0;
		var toolbarSize = this.getShowToolbar() ? 27 : 0;
		var headerSize = this.getShowHeader() ? 22 : 0;
		var pagerSize = 25;

		return value - captionSize - toolbarSize - headerSize - pagerSize - 5;
	}
	//------------------------------------------------------------------------------------------- Request Alarm Log Data
	AlarmLogView.prototype.setStatusCaption = function () {

		var status = "";
		if (this.status && this.status.length > 0) {
			status = this.status[0];
		}

		var statusItems = this.getStatusItems();
		var statusItemsCount = statusItems.length;
		var statusText = "";
		for (var i = 0; i < statusItemsCount; i++) {
			var item = statusItems[i];
			if (item.value == status) {
				statusText = item.displayName;
				break;
			}
		}

		var toolbarid = this.getToolbarID();
		var statusid = toolbarid + "_status";

		var buttonHtml = '';
		buttonHtml += '<span class="glyphicon" aria-hidden="true"></span> ' + statusText;
		$("#" + statusid).html(buttonHtml);
	}
	//------------------------------------------------------------------------------------------- Alarm Status Text
	AlarmLogView.prototype.getStatusText = function (status) {
		if (status == this.statusAck) return language.alarm.getStatusName("Acknowledged");
		if (status == "Y") return language.alarm.getStatusName("Occurred");
		return language.alarm.getStatusName("Released");
	}
	//------------------------------------------------------------------------------------------- Alarm Status Color
	AlarmLogView.prototype.statusColor = function (level, status) {
		if (status == this.statusAck) return this.getAcknowledgeColor();
		if (status == "Y") return this.getAlarmColor(level);
		return this.getNormalColor();
	}
	//------------------------------------------------------------------------------------------- Alarm Status Color
	AlarmLogView.prototype.localTime = function (value) {
		var localTime = moment.utc(value).toDate();
		localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
		return localTime;
	}
	//------------------------------------------------------------------------------------------- Get Grid Data Idx
	AlarmLogView.prototype.getDataIDs = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getDataIDs');
	}

	AlarmLogView.prototype.getGridSelectedRowData = function (rowid) {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getRowData', rowid);
	}

	//------------------------------------------------------------------------------------------- Set Grid Column Hide
	AlarmLogView.prototype.showGridColumns = function (columns) {
		var listid = this.getGridListID();
		var columnItems = this.getColumnItems();
		var columnItemsCount = columnItems.length;
		for (var i = 0; i < columnItemsCount; i++) {
			var item = columnItems[i];
			if (!item) continue;

			$("#" + listid).jqGrid('hideCol', item.value);
		}

		$("#" + listid).jqGrid('showCol', columns);
	}

	AlarmLogView.prototype.getLocalData = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'data');
	}

	AlarmLogView.prototype.refresh = function () {
		var view = this;
		view.fromId = -1;
		view.toId = -1;
		var listid = view.getGridListID();
		$("#" + listid).jqGrid('clearGridData', true);
		$("#" + listid).jqGrid('setGridParam', {
			datatype: 'json',
			postData: {
				sDate: function () { return view.fromDateVal },
				eDate: function () { return view.toDateVal },
				sId: function () { return view.fromId },
				eId: function () { return view.toId },
				status: function () { return view.status },
				ack: function () { return view.statusAck },
				level: function () {
					var levels = new Array();
					if (view.levels.length == 10) return "";

					for (var i = 0; i < view.levels.length; i++) {
						if (view.levelsPool.indexOf(view.levels[i]) != -1) {
							levels.push("'" + view.levels[i] + "'");
						}
					}
					return levels;
				},
				zone: function () {
					var zones = new Array();
					if (view.zones.length == 702) return "";

					for (var i = 0; i < view.zones.length; i++) {
						if (view.zonesPool.indexOf(view.zones[i]) != -1) {
							zones.push("'" + view.zones[i] + "'");
						}
					}
					return zones;
				}
			},
		}).trigger('reloadGrid'); //postData 세팅 완료 후 리로드
	}

	//------------------------------------------------------------------------------------------- Toolbar Button 
	AlarmLogView.prototype.setToolbar = function () {
		var lang = $Common.detectLanguage();
		var toolbarid = this.getToolbarID();
		var columnid = toolbarid + "_column";
		var refreshid = toolbarid + "_refresh";
		var frdatetimeid = toolbarid + "_frdatetime";
		var todatetimeid = toolbarid + "_todatetime";
		var statusid = toolbarid + "_status";
		var levelid = toolbarid + "_level";
		var zoneid = toolbarid + "_zone";
		var tagid = toolbarid + "_tag";
		var saveid = toolbarid + "_save";

		var buttonHtml = '';
		buttonHtml += '<div class="row">';
		buttonHtml += '	<div class="col-xs-2">';
		buttonHtml += '		<div class="btn-group pull-left padding-left-3" role="group" aria-label="...">';
		buttonHtml += '			<button type="button" id="' + refreshid + '"  class="btn btn-default btn-xs width-30" title="' + language.alarm.getToolbarCaption("refresh") + '"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>';
		//아직 기능이 구현되지 않은 버튼 숨기기
		//buttonHtml += '			<button type="button" id="' + columnid + '" class="btn btn-default btn-xs width-30" title="' + language.alarm.getToolbarCaption("columns") + '"><span class="glyphicon glyphicon-list" aria-hidden="true" ></span></button>';
		buttonHtml += '		</div>';
		buttonHtml += '	</div>';
		buttonHtml += '	<div class="col-xs-6 padding-left-0 padding-right-0">';
		buttonHtml += '		<div class="input-group date pull-left width-160"  id="' + frdatetimeid + '">';
		buttonHtml += '			<input type="text" class="form-control height-22" />';
		buttonHtml += '			<span class="input-group-addon padding-2  width-30">';
		buttonHtml += '				<span class="glyphicon glyphicon-calendar "></span>';
		buttonHtml += '			</span>';
		buttonHtml += '		</div>';
		buttonHtml += '		<span class="pull-left width-15 text-center">-</span>';
		buttonHtml += '		<div class="input-group date width-160" id="' + todatetimeid + '">';
		buttonHtml += '			<input type="text" class="form-control height-22"  />';
		buttonHtml += '			<span class="input-group-addon padding-2  width-30">';
		buttonHtml += '				<span class="glyphicon glyphicon-calendar "></span>';
		buttonHtml += '			</span>';
		buttonHtml += '		</div>';
		buttonHtml += '	</div>';
		buttonHtml += '	<div class="col-xs-4 padding-left-0">';
		buttonHtml += '		<div class="btn-group dropdown pull-right" role="group" aria-label="...">';
		buttonHtml += '			<button type="button" id="' + statusid + '" class="btn btn-default btn-xs" title="' + language.alarm.getToolbarCaption("status") + '"><span class="glyphicon glyphicon-alert" aria-hidden="true"></span></button>';
		buttonHtml += '			<button type="button" id="' + levelid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("level") + '"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span></button>';
		buttonHtml += '			<button type="button" id="' + zoneid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("zone") + '"><span class="glyphicon glyphicon-font" aria-hidden="true"></span></button>';
		buttonHtml += '			<button type="button" id="' + saveid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("save") + '"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></button>';
		//buttonHtml += '			<button type="button" id="' + tagid + '" class="btn btn-default btn-xs width-44" title="' + language.alarm.getToolbarCaption("tag") + '"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span></button>';


		buttonHtml += '	        <canvas id="canvas" style="display:none"></canvas>';
		buttonHtml += '		</div>';
		buttonHtml += '	</div>';
		buttonHtml += '</div>';

		$("#" + toolbarid).css("height", "27px").css("padding-top", "2px").css("padding-right", "2px").css("text-align", "right").css("overflow", "visible");
		$("#" + toolbarid).html(buttonHtml);

		var view = this;
		var dateFormat = "YYYY-MM-DD HH:mm";
		var m = moment();
		var fromDate = m.add('hours', -m.hours()).add('minutes', -m.minutes()).format(dateFormat);
		var toDate = m.add('days', 1).add('hours', -m.hours()).add('minutes', -(m.minutes() + 1)).format(dateFormat);
		view.fromDateVal = fromDate;
		view.toDateVal = toDate;
		// From DatePicker 개체 생성
		$("#" + frdatetimeid).datetimepicker({
			defaultDate: fromDate,
			format: 'YYYY-MM-DD HH:mm',
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
		// To DatePicker 개체 생성
		$("#" + todatetimeid).datetimepicker({
			defaultDate: toDate,
			format: 'YYYY-MM-DD HH:mm',
			useCurrent: false,
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

		$("#" + frdatetimeid).on("dp.change", function (e) {
			$("#" + todatetimeid).data("DateTimePicker").minDate(e.date);
		});
		$("#" + todatetimeid).on("dp.change", function (e) {
			$("#" + frdatetimeid).data("DateTimePicker").maxDate(e.date);
		});

		// DatePicker 기본값 설정
		this.setFromDateValue(fromDate);
		this.setToDateValue(toDate);

		// From DatePicker - InputBox keydown Event
		$("#" + frdatetimeid).find("input").keydown(function (key) {
			if (key.keyCode == 13) {
				view.showFromDate(frdatetimeid);
			}
		});
		// From DatePicker - InputBox blur Event
		$("#" + frdatetimeid).find("input").blur(function (e) {
			view.showFromDate(frdatetimeid);
		});

		// To DatePicker - InputBox keydown Event
		$("#" + todatetimeid).find("input").keydown(function (key) {
			if (key.keyCode == 13) {
				view.showToDate(todatetimeid);
			}
		});
		// To DatePicker - InputBox blur Event
		$("#" + todatetimeid).find("input").blur(function () {
			view.showToDate(todatetimeid);
		});

		// Column Hide Button Click Event
		$("#" + columnid).click(function () {
			view.showColumnForm(columnid);
		});
		$("#" + refreshid).click(function () {
			view.refresh();
		});
		// Status Button Click Event
		$("#" + statusid).click(function () {
			view.showStatusForm(statusid);
		});
		// Level Button Click Event
		$("#" + levelid).click(function () {
			view.showLevelForm(levelid);
		});
		// Zone Button Click Event		
		$("#" + zoneid).click(function () {
			view.showZoneForm(zoneid);
		});
		// Tag Button Click Event				
		$("#" + tagid).click(function () {
			view.showTagForm(tagid);
		});
		$("#" + saveid).click(function () {
			var filename = "AlarmLog." + view.id + ".csv";
			view.save(filename);
		});
	}

	//------------------------------------------------------------------------------------------- Set FromDate Value
	AlarmLogView.prototype.setFromDateValue = function (value) {
		this.fromDateVal = value;
	}

	//------------------------------------------------------------------------------------------- Set ToDate Value
	AlarmLogView.prototype.setToDateValue = function (value) {
		this.toDateVal = value;
	}

	//------------------------------------------------------------------------------------------- Get DatePickerControl Value By Id
	AlarmLogView.prototype.getDateTimeValue = function (id) {
		return $("#" + id).find("input").val();
	}

	//------------------------------------------------------------------------------------------- Show AlarmLog Data By FromDate
	AlarmLogView.prototype.showFromDate = function (id) {
		var value = this.getDateTimeValue(id);
		if (value == "") {
			alert("input from date");
			return;
		}

		if (value == this.fromDateVal) return;

		this.setFromDateValue(value);
		//this.refresh();
	}

	//------------------------------------------------------------------------------------------- Show AlarmLog Data By ToDate
	AlarmLogView.prototype.showToDate = function (id) {
		var value = this.getDateTimeValue(id);
		if (value == "") {
			alert("input from date");
			return;
		}

		if (value == this.toDateVal) return;

		this.setToDateValue(value);
		//this.refresh();
	}

	AlarmLogView.prototype.save = function (filename) {
		var totalRowCnt = $("#" + this.getGridListID()).getGridParam('records');
		var btnSpan = $("#t_alarmlog_1_list_save > span");
		function showPer(per) {
			btnSpan.text(per + '%');
		}

		if (totalRowCnt == 0) {
			alert("Empty Table!");
			return;
		}
		else if (totalRowCnt > 1100000) {
			alert("Row count (" + totalRowCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ") has exceeded the maximum number of 1,000,000.");
			return;
		}

		var view = this;
		var levels, zones;
		if (view.levels.length < 10) {
			levels = new Array();
			for (var i = 0; i < view.levels.length; i++) {
				if (view.levelsPool.indexOf(view.levels[i]) != -1) {
					levels.push("'" + view.levels[i] + "'");
				}
			}
		} else {
			levels = "";
		}
		if (view.zones.length < 702) {
			zones = new Array();
			for (var i = 0; i < view.zones.length; i++) {
				if (view.zonesPool.indexOf(view.zones[i]) != -1) {
					zones.push("'" + view.zones[i] + "'");
				}
			}
		} else {
			zones = "";
		}
		var columns = view.getColumns();
		var columnNames = new Array();
		for (var i = 0; i < columns.length; i++) {
			if (columns[i].name == "No") continue;
			columnNames.push(columns[i].name);
		}
		var sidx = $("#" + this.getGridListID()).getGridParam('postData').sidx;
		var sord = $("#" + this.getGridListID()).getGridParam('postData').sord;
		var url = '/alarm/getLogFile.csv';
		$.ajax({
			url: url,
			type: 'POST',
			xhrFields: { //response 데이터를 바이너리로 처리한다.
				responseType: 'blob'
			},
			beforeSend: function () { //ajax 호출전 progress 초기화
				showPer(0);
				$("#t_alarmlog_1_list_save").prop('disabled', true);
				$("#t_alarmlog_1_list_save > span").removeClass("glyphicon-download-alt").text('Req');
			},
			xhr: function () { //XMLHttpRequest 재정의 가능
				var xhr = $.ajaxSettings.xhr();
				xhr.onprogress = function (e) {
					showPer(Math.floor(e.loaded / e.total * 100));
				};
				return xhr;
			},
			traditional: true,
			data: {
				sDate: view.fromDateVal,
				eDate: view.toDateVal,
				sId: view.fromId,
				eId: view.toId,
				status: view.status,
				ack: view.statusAck,
				level: levels,
				zone: zones,
				sidx: sidx,
				sord: sord,
				page: 1,
				header: columnNames.join(",")
			},
			async: true,
			context: this,
			crossDomain: true,
			success: function (data) {
				console.log("완료");
				var blob = new Blob([data]);
				//파일저장
				if (navigator.msSaveBlob) {
					return navigator.msSaveBlob(blob, url);
				}
				else {                    
					$Common.SaveBlob(blob, view.fromDateVal + '-' + view.toDateVal + '.csv');
				}
			},
			complete: function () {
				$("#t_alarmlog_1_list_save").prop('disabled', false);
				$("#t_alarmlog_1_list_save > span").addClass("glyphicon-download-alt").text('');
			}
		});
	}

	//------------------------------------------------------------------------------------------- Show AlarmLog Data By Status
	AlarmLogView.prototype.getStatusItems = function () {
		var lang = $Common.detectLanguage();

		var statusItems = [
			{
				displayName: language.alarm.getStatusName("All"),
				name: "All",
				value: ''
			},
			{
				displayName: this.getStatusText('Y'),
				name: "Occurred",
				value: 'Y'
			},
			{
				displayName: this.getStatusText('N'),
				name: "Released",
				value: 'N'
			},
			{
				displayName: this.getStatusText(this.statusAck),
				name: "Acknowledged",
				value: this.statusAck
			}
		];

		if (!this.status) {
			this.status = [];
			this.status.push('');
		}

		return statusItems;
	}

	AlarmLogView.prototype.showStatusForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		var statusItems = this.getStatusItems();

		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-status") + '">';
		var statusItemsCount = statusItems.length;
		for (var i = 0; i < statusItemsCount; i++) {
			var item = statusItems[i];
			if (!item) continue;

			var checked = $.inArray(item.value, this.status) > -1 ? "checked" : "";

			modalHtml += '<div class="radio">';
			modalHtml += '<label>';
			modalHtml += '<input type="radio" name="box" value="' + item.value + '" ' + checked + '>' + item.displayName;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 260,
			width: 300,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {
						view.status = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.status.push($(this).val());
						});
						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmLogView.prototype.getLevelItems = function () {
		var levelItems = scada.getAlarmLevelList();

		if (!this.levels) {
			this.levels = [];
			var levelItemsCount = levelItems.length;
			for (var i = 0; i < levelItemsCount; i++) {
				var item = levelItems[i];
				this.levels.push(item);
			}
		}

		return levelItems;
	}


	AlarmLogView.prototype.showLevelForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		//var levelItems = this.getLevelItems();
		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-level") + '">';

		for (var i = 0; i < this.levelsPool.length; i++) {
			var item = this.levelsPool[i];
			if (!item) continue;

			var checked = $.inArray(item, this.levels) > -1 ? "checked" : "";

			var config = scada.getLevelConfigByName(item);
			var text = "";
			if (config && config.displayName != "") {
				text = config.displayName;
			} else {
				text = language.alarm.getModalCaption("level") + '&nbsp;' + item;
			}

			modalHtml += '<div class="checkbox margin-left-0">';
			modalHtml += '<label>';
			modalHtml += '<input type="checkbox" name="box" value="' + item + '" ' + checked + '>' + text;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 400,
			width: 340,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-check"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", true);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-uncheck"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", false);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {

						if ($("#" + modalid).find("input[name=box]:checked").length < 1) {
							alert(language.alarm.getModalCaption("msg-nocheck"));
							return;
						}

						view.levels = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.levels.push($(this).val());
						});


						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}


	AlarmLogView.prototype.getZoneItems = function () {
		var zoneItems = scada.getAlarmZoneList();

		if (!this.zones) {
			this.zones = [];
			var zoneItemsCount = zoneItems.length;
			for (var i = 0; i < zoneItemsCount; i++) {
				var item = zoneItems[i];
				this.zones.push(item);
			}
		}
		return zoneItems;
	}

	AlarmLogView.prototype.showZoneForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		//var zoneItems = this.getZoneItems();
		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-zone") + '">';

		for (var i = 0; i < this.zonesPool.length; i++) {
			var item = this.zonesPool[i];
			if (!item) continue;

			var checked = $.inArray(item, this.zones) > -1 ? "checked" : "";

			var config = scada.getZoneConfigByName(item);
			var text = "";
			if (config && config.displayName != "") {
				text = config.displayName;
			} else {
				text = language.alarm.getModalCaption("zone") + '&nbsp;' + item;
			}

			modalHtml += '<div class="checkbox margin-left-0">';
			modalHtml += '<label>';
			modalHtml += '<input type="checkbox" name="box" value="' + item + '" ' + checked + '>' + text;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 400,
			width: 340,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-check"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", true);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-uncheck"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", false);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {

						if ($("#" + modalid).find("input[name=box]:checked").length < 1) {
							alert(language.alarm.getModalCaption("msg-nocheck"));
							return;
						}

						view.zones = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.zones.push($(this).val());
						});

						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmLogView.prototype.getTagItems = function () {
		var tagItems = new $HashMap();

		var alarms = scada.getAlarmList();
		if (alarms == null) return tagItems;

		var alarmsCount = alarms.length;
		for (var i = 0; i < alarmsCount; i++) {
			var alarm = alarms[i];
			if (!alarm) continue;
			if (alarm.tag == "") continue;

			var item = { name: alarm.tag, desc: alarm.tag };
			if (!tagItems.get(item.name)) {
				tagItems.put(item.name, item);
			}
		}

		if (this.tags.length < 1) {
			var tagItemValues = tagItems.values();
			for (var i = 0; i < tagItemValues.length; i++) {
				var item = tagItemValues[i];
				if (!item) continue;
				this.tags.push(item.name);
			}
		}

		return tagItems;
	}

	AlarmLogView.prototype.showTagForm = function (id) {
		var modalid = id + "_modal";
		var view = this;

		var tagItems = this.getTagItems().values();
		var tagItemsCount = tagItems.length;

		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-tag") + '">';
		for (var i = 0; i < tagItemsCount; i++) {
			var item = tagItems[i];
			if (!item) continue;

			var checked = $.inArray(item.name, this.tags) > -1 ? "checked" : "";

			modalHtml += '<div class="checkbox margin-left-0">';
			modalHtml += '<label>';
			modalHtml += '<input type="checkbox" name="box" value="' + item.name + '" ' + checked + '>' + item.desc;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}
		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 400,
			width: 340,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-check"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", true);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-uncheck"),
					click: function () {
						$("#" + modalid + " input:checkbox").prop("checked", false);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {

						if ($("#" + modalid).find("input[name=box]:checked").length < 1) {
							alert(language.alarm.getModalCaption("msg-nocheck"));
							return;
						}

						view.tags = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.tags.push($(this).val());
						});

						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.refresh();
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	//------------------------------------------------------------------------------------------- Show Gird Column
	AlarmLogView.prototype.getColumnItems = function () {
		var columnItems = this.getColumnModelItems();

		if (!this.showColumns) {
			this.showColumns = [];
			var columnItemsCount = columnItems.length;
			for (var i = 0; i < columnItemsCount; i++) {
				var item = columnItems[i];
				this.showColumns.push(item.value);
			}
		}

		return columnItems;
	}

	AlarmLogView.prototype.showColumnForm = function (id) {
		var modalid = id + "_modal";
		var view = this;
		var columnItems = this.getColumnItems();
		var columnItemsCount = columnItems.length;

		var modalHtml = '<div id="' + modalid + '" title="' + language.alarm.getModalCaption("title-col") + '">';
		for (var i = 0; i < columnItemsCount; i++) {
			var item = columnItems[i];
			if (!item) continue;
			if (!item.visible) continue;

			var checked = $.inArray(item.value, this.showColumns) > -1 ? "checked" : "";

			modalHtml += '<div class="checkbox-inline margin-left-0">';
			modalHtml += '<label class="width-100">';
			modalHtml += '<input type="checkbox" name="box" value="' + item.value + '" ' + checked + '>' + item.displayName;
			modalHtml += '</label>';
			modalHtml += '</div>';
		}

		modalHtml += '</div>';
		$("#xisom-modal").html(modalHtml);

		$("#" + modalid).dialog({
			appendTo: "#xisom-modal",
			resizable: false,
			height: 280,
			width: 300,
			modal: true,
			buttons: [
				{
					text: language.alarm.getModalCaption("btn-apply"),
					click: function () {
						view.showColumns = [];
						$("#" + modalid).find("input[name=box]:checked").each(function () {
							view.showColumns.push($(this).val());
						});
						$(this).dialog("close");
						$("#xisom-modal").html("");
						view.showGridColumns(view.showColumns);
					}
				},
				{
					text: language.alarm.getModalCaption("btn-cancel"),
					click: function () {
						$(this).dialog("close");
						$("#xisom-modal").html("");
					}
				}
			]
		});
	}

	AlarmLogView.prototype.getColumnModelItems = function () {
		var items = [
			{ name: 'id', hidden: true },			//정렬에 필요한 숨겨진 칼럼
			{ name: 'statusCode', hidden: true },	//색상에 필요한 숨겨진 칼럼
			{ name: 'LevelNo', hidden: true },		//색상에 필요한 숨겨진 칼럼
			{ name: 'Time', index: 'ID', width: 130, hidden: false, sortable: true, align: "center", label: language.alarm.getColumnName("Time") },
			{ name: 'Name', index: 'NAME', width: 120, hidden: false, sortable: true, align: "left", label: language.alarm.getColumnName("Name") },
			{ name: 'Status', index: 'STATUS', width: 85, hidden: false, sortable: true, align: "center", label: language.alarm.getColumnName("Status") },
			{ name: 'Level', index: 'LEVEL', width: 85, hidden: false, sortable: true, align: "center", label: language.alarm.getColumnName("Level") },
			{ name: 'Zone', index: 'ZONE', width: 55, hidden: false, sortable: true, align: "center", label: language.alarm.getColumnName("Zone") },
			{ name: 'Tag Name', index: 'DATATAG_NAME', width: 120, hidden: false, sortable: true, align: "center", label: language.alarm.getColumnName("Tag Name") },
			{ name: 'Tag Value', index: 'DATATAG_VALUE', width: 80, hidden: false, sortable: false, align: "center", label: language.alarm.getColumnName("Tag Value") },
			{ name: 'Message', index: 'MESSAGE', width: 300, hidden: false, sortable: false, align: "left", label: language.alarm.getColumnName("Message") },
		];

		return items;
	}

	AlarmLogView.prototype.getColumn = function (name) {
		if (!name) return null;
		if (!this.columns) return null;

		var columnCount = this.columns.length;
		for (var i = 0; i < columnCount; i++) {
			var item = this.columns[i];
			if (item.name == name) {
				return item;
			}
		}
		return null;
	}

	//------------------------------------------------------------------------------------------- Init Grid
	AlarmLogView.prototype.initGrid = function () {
		var referenceColumns = this.getColumns();
		var listid = this.getGridListID();
		var view = this;

		var columnModelItems = this.getColumnModelItems();
		var columnMatch = [columnModelItems[0], columnModelItems[1], columnModelItems[2]];

		//사용자가 X-SCADA 디자이너에서 정한 순서와 일치시킨다.
		for (var i = 0; i < referenceColumns.length; i++) {
			if (referenceColumns[i].name == "No") continue;

			for (var j = 0; j < columnModelItems.length; j++) {
				if (referenceColumns[i].name == columnModelItems[j].name) {
					columnModelItems[j].hidden = !referenceColumns[i].visible;
					columnModelItems[j].width = referenceColumns[i].width;
					columnMatch.push(columnModelItems[j]);
					break;
				}
			}
		}
		//columnMatch.push({ name: 'id', width:120}); for debugging
		var option = {
			url: '/alarm/getData.xsm',
			datatype: 'local',// 아직 툴바가 완성되지 않은 상태에서 request 되는 것을 방지하기 위해 첫 세팅은 local
			mtype: 'POST',
			loadonce: false,
			width: this.getWidth(),
			height: this.calcGridHeight(this.getHeight()),
			colModel: columnMatch,
			shrinkToFit: false,//크기에맞게축소
			sortname: "ID",
			sortorder: "desc",
			hidegrid: false, //view expand button hide
			toolbar: [this.getShowToolbar(), "top"],
			rownumbers: true,
			gridview: true,
			deepempty: true,
			rowNum: 50,
			scroll: 1,// 전체 레코드 유지 : true, 화면에 필요한 레코드만 유지 : 1            
			jsonReader: {
				root: "data.rows",
				page: "data.page",
				total: "data.total",
				records: "data.records",
				id: "0",
				cell: "",
				repeatitems: true
			},
			beforeProcessing: function (json) {
				if (json.code != 200) return;

				var data = json.data;
				for (var i = 0; i < data.rows.length; i++) {
					var row = data.rows[i];

					var status = row.ack == "Y" ? view.statusAck : row.Status;
					var levelConfig = scada.getLevelConfigByName(row.Level);
					var zoneConfig = scada.getZoneConfigByName(row.Zone);
					row.Status = view.getStatusText(status);
					row.statusCode = status;
					row.LevelNo = row.Level;
					row.Level = levelConfig && levelConfig.displayName != "" ? levelConfig.displayName : row.Level;
					row.Zone = zoneConfig && zoneConfig.displayName != "" ? zoneConfig.displayName : row.Zone;
				}
			},
			rowattr: function (row) {
				var color = view.statusColor(row.LevelNo, row.statusCode);
				return { 'style': 'color : ' + color };
			},
			loadComplete: function (json) {
				var data = json.data;
				if (!data || !data.rows || Object.keys(data.rows).length < 1) return;
				view.fromId = data.sId;
				view.toId = data.eId;
			},
		};

		var pageid = "#" + this.getGridPageID();
		option.pager = this.id + "_page";
		option.viewrecords = true;
		option.recordpos = 'right';
		$("#" + listid).jqGrid(option).navGrid(pageid, {
			edit: false,
			add: false,
			del: false,
			refresh: false,
			search: false
		});

		this.setSortIconHide();
		this.setGridHeader();

		if (this.getShowToolbar()) {
			this.setToolbar();
		}

		this.getStatusItems();
		this.getLevelItems();
		this.getZoneItems();
	}

	AlarmLogView.prototype.setGridHeader = function () {
		var listid = this.getGridListID();
		var div = "#gview_" + listid + " .ui-jqgrid-hdiv";
		if (this.getShowHeader()) {
			$(div).show();
		} else {
			$(div).hide();
		}

		$(div).css(this.getFontStyle());
	}

	AlarmLogView.prototype.setSortIconHide = function () {
		var listid = this.getGridListID();
		var div = "#gbox_" + listid + " .s-ico span";
		$(div).hide();
	}

	AlarmLogView.prototype.getFontStyle = function () {
		if (!this.controlFont) {
			return {
				"font-size": "9pt",
				"font-weight": "normal"
			};
		}

		return {
			"font-family": this.controlFont.name,
			"font-size": this.controlFont.size + "pt",
			"font-weight": this.controlFont.bold ? "bold" : "normal"
		};
	}


	//------------------------------------------------------------------------------------------- Get Grid List 개체ID
	AlarmLogView.prototype.getGridListID = function () {
		return this.id + "_list";
	}
	//------------------------------------------------------------------------------------------- Get Grid Page ID
	AlarmLogView.prototype.getGridPageID = function () {
		return this.id + "_page";
	}
	//------------------------------------------------------------------------------------------- Get Grid Columns
	AlarmLogView.prototype.getGridColumns = function () {
		var listid = this.getGridListID();
		return $("#" + listid).jqGrid('getGridParam', 'colModel');
	}
	//------------------------------------------------------------------------------------------- Get Grid Toolbar 개체ID
	AlarmLogView.prototype.getToolbarID = function () {
		return "t_" + this.id + "_list";
	}
	//------------------------------------------------------------------------------------------- View 개체 Add Event Listener 
	AlarmLogView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this.id).addEventListener(type, callback, useCapture);
	}
	//------------------------------------------------------------------------------------------- View 개체 Remove Event Listener 
	AlarmLogView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this.id).removeEventListener(type, callback, useCapture);
	}

	page.createAlarmLog = function (arg) {
		var view = new AlarmLogView(arg);
		page.protoViews[arg.id] = view;

		view.setWidth(arg.width);
		view.initGrid();
		view.refresh();
		return view;
	}
})();

/////////////////////////////////////////////////////////////////////////////////////
// WebBrowserView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
//------------------------------------------------------------------------------------------------------------------- WebBrowserView
	function WebBrowserView(arg) {
		
		ViewElement.call(this, arg);

		this.pid = arg.pid;
		this.contextMenu = arg.contextMenu;
		this.scrollBars = arg.scrollBars;
		this._url = arg.url;
		this.angle = arg.angle;
		
	}
	WebBrowserView.prototype = Object.create(ViewElement.prototype);
	WebBrowserView.prototype.constructor = WebBrowserView;

	Object.defineProperty(WebBrowserView.prototype, "url", {
		get: function(){
			return this._url;
		},
		set: function(value){
			this.setURL(value);
		}
	});
	Object.defineProperty(WebBrowserView.prototype, "scrollbars", {
		get: function(){
			return this.scrollBars;
		},
		set: function(value){
			this.setScrollBars(value);
		}
	});
	Object.defineProperty(WebBrowserView.prototype, "contextmenu", {
		get: function(){
			return this.contextMenu;
		},
		set: function(value){
			this.setContextMenu(value);
		}
	});

	WebBrowserView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	WebBrowserView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	WebBrowserView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	WebBrowserView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	WebBrowserView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	WebBrowserView.prototype.getURL = function () {
		return this._url;
	}

	WebBrowserView.prototype.setURL = function (value) {
		var url = this.patternURL(value);
		$("#" + this._id).attr("src", value);
		this._url = url;
	}

	WebBrowserView.prototype.getContextMenu = function () {
		return this.contextMenu;
	}

	WebBrowserView.prototype.setContextMenu = function (value) {
		this.contextMenu = value;
	}

	WebBrowserView.prototype.getScrollBars = function () {
		return this.scrollBars;
	}

	WebBrowserView.prototype.setScrollBars = function (value) {
		$("#" + this._id).attr("scrolling", value ? "yes" : "no");
		this.scrollBars = value;
	}

	WebBrowserView.prototype.getOpacity = function () { }
	WebBrowserView.prototype.setOpacity = function (value) { }
	WebBrowserView.prototype.setFillStyle = function (value) { }
	WebBrowserView.prototype.setFillOpacity = function (value) { }
	WebBrowserView.prototype.setStrokeStyle = function (value) { }
	WebBrowserView.prototype.setStrokeOpacity = function (value) { }

	WebBrowserView.prototype.patternURL = function (url) {
		var pattern = /^((http|https):\/\/)/;
		if (!pattern.test(url)) {
			url = "http://" + url;
		}

		return url.replace("watch?v=", "embed/");
	}

	WebBrowserView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	WebBrowserView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	page.createWebBrowser = function (arg) {
		var view = new WebBrowserView(arg);
		view.setURL(view.getURL());
		page.protoViews[view.id] = view;
		return view;
	}
})();

/////////////////////////////////////////////////////////////////////////////////////
// FrameView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
//------------------------------------------------------------------------------------------------------------------- FrameView
	function FrameView(arg) {
		
		ViewElement.call(this, arg);

		this.pid = arg.pid;
		this.backgroundColor = arg.backgroundColor;		
		this.contentWindow = arg.contentWindow;
		this.scrolling = arg.scrolling;
		this.url = arg.url;
	}
	FrameView.prototype = Object.create(ViewElement.prototype);
	FrameView.prototype.constructor = FrameView;

	// Define src property for FrameView
	Object.defineProperty(FrameView.prototype, "src", {
		get: function(){
			return this.getURL();
		},
		set: function(value){
			this.setURL(value);
		}
	});

	FrameView.prototype.setX = function (value) {
		$("#" + this._id + "-view").css("left", value + "px");
		this._x = value;
		this.setAngle(this.getAngle());
	}

	FrameView.prototype.setY = function (value) {
		$("#" + this._id + "-view").css("top", value + "px");
		this._y = value;
		this.setAngle(this.getAngle());
	}

	FrameView.prototype.setWidth = function (value) {
		$("#" + this._id).css("width", value + "px");
		this._width = value;
		this.setAngle(this.getAngle());
	}

	FrameView.prototype.setHeight = function (value) {
		$("#" + this._id).css("height", value + "px");
		this._height = value;
		this.setAngle(this.getAngle());
	}

	FrameView.prototype.setAngle = function (value) {
		var rotate = "rotate(" + value + "deg)";
		$("#" + this._id).css("-ms-transform", rotate);
		$("#" + this._id).css("-webkit-transform", rotate);
		$("#" + this._id).css("transform", rotate);
		this._angle = value;
	}

	FrameView.prototype.getBackgroundColor = function () {
		return this.backgroundColor;
	}

	FrameView.prototype.setBackgroundColor = function (value) {
		$("#" + this._id).css("background-color", value);
		$("#" + this._id).contents().find('body').css('backgroundColor', value);
		this.backgroundColor = value;
	}

	FrameView.prototype.getURL = function () {
		return this.url;
	}

	FrameView.prototype.setURL = function (value) {
		// var url = this.patternURL(value);
		$("#" + this._id).attr("src", value + ".html");
		this.url = value;
	}

	FrameView.prototype.getContentWindow = function () {
		return this.contentWindow;
	}

	FrameView.prototype.setContentWindow = function (value) {
		this.contentWindow = value;
	}

	FrameView.prototype.getScrollings = function () {
		return this.scrolling;
	}

	FrameView.prototype.setScrollings = function (value) {
		$("#" + this._id).attr("scrolling", value);
		this.scrolling = value;
	}

	FrameView.prototype.getOpacity = function () { }
	FrameView.prototype.setOpacity = function (value) { }
	FrameView.prototype.setFillStyle = function (value) { }
	FrameView.prototype.setFillOpacity = function (value) { }
	FrameView.prototype.setStrokeStyle = function (value) { }
	FrameView.prototype.setStrokeOpacity = function (value) { }

	FrameView.prototype.patternURL = function (url) {
		var pattern = /^((http|https):\/\/)/;
		if (!pattern.test(url)) {
			url = "http://" + url;
		}

		return url.replace("watch?v=", "embed/");
	}

	FrameView.prototype.addEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).addEventListener(type, callback, useCapture);
	};

	FrameView.prototype.removeEventListener = function (type, callback, useCapture) {
		page.getElementById(this._id).removeEventListener(type, callback, useCapture);
	};

	FrameView.prototype.init = function () {
		this.setBackgroundColor(this.getBackgroundColor());
		$("#" + this._id).contents().find('body .contents').css('border', "0px");
		//$("#" + this._id).contents().find('body').css('line-height', "normal");//브라우저 영향 미침
	}

	page.createFrame = function (arg) {
		var view = new FrameView(arg);
		page.protoViews[view.id] = view;
		view.init();
		return view;
	}
})();
