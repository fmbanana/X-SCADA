///////////////////////////////////////////////////////////////////////////////
//// Scada 
///////////////////////////////////////////////////////////////////////////////
var scada = (function () {
	const PingRetryLimit = 5;
	const PingRetryDelay = 200;
	const ExpireCheckCycle = 1000;
	const SessionPingCycle = 20000;
	var disConnRetry = 0;
	var disConnTime = "-";
	var tags;
	var alarms;
	var _activeSession;
	var sessionInited = false;
    var devices;
    var databases;
	var pingRetryConout = 0;
	var getTagByName = function (name) {
		return scada.tagManager.getTagByName(name);
	};
    var getDeviceByName = function (name) {
        return scada.deviceManager.getDeviceByName(name);
    };
    var getDatabaseByName = function (name) {
        return scada.databaseManager.getDatabaseByName(name);
    };
	var getAlarmByName = function (name) {
		return scada.alarmManager.getAlarmByName(name);
	};
	var getLevelConfigByName = function (name) {
		return scada.alarmManager.getLevelConfigByName(name);
	};
	var getZoneConfigByName = function (name) {
		return scada.alarmManager.getZoneConfigByName(name);
	};
	var getAlarmList = function () {
		if (typeof scada.alarmManager == "undefined") return null;
		return scada.alarmManager.getAlarms();
	};
	var getAlarmLevelList = function () {
		if (typeof scada.alarmManager == "undefined") return null;
		return scada.alarmManager.getLevelList();
	};
	var getAlarmZoneList = function () {
		if (typeof scada.alarmManager == "undefined") return null;
		return scada.alarmManager.getZoneList();
	};
	var getViewLiveData = function (pageName, viewName, params, callback, limit) {
		return scada.viewManager.getViewLiveData(pageName, viewName, params, callback, limit);
	};
	var getViewTrendData = function (pageName, viewName, params, callback, limit) {
		return scada.viewManager.getViewTrendData(pageName, viewName, params, callback, limit);
	};
	var getViewLiveDataYTChart = function (pageName, viewName, params, callback, limit) {
		return scada.viewManager.getViewLiveDataYTChart(pageName, viewName, params, callback, limit);
	};
	var getViewYTTrendData = function (pageName, viewName, params, callback, limit) {
		return scada.viewManager.getViewYTTrendData(pageName, viewName, params, callback, limit);
	};
	var getYTTrendChartXML = function(filename , callback){
        return scada.viewManager.getYTTrendChartXML(filename , callback);
    }
	var getViewDatabase = function (pageName, viewName, callback, sql, SQLParams) {
		return scada.viewManager.getViewDatabase(pageName, viewName, callback, sql, SQLParams);
	};
	var messageHide = function () {
		disConnRetry = 0;
		disConnTime = "-";
		$('#xisom-message').modal("hide");
	};
	var messageShow = function (header, message) {
		message = "" + message + "";
		$("#xisom-message-body").html(message);
		$("#xisom-message-header").html(header);
		$("#xisom-message").modal("show");
	};
	var initModule = function (view) {
		if (typeof view != "undefined") {
			var viewName = view.name;
			scada[viewName] = view;
		}
	};

	//Cookie값 가져오기
	var getCookieValue = function (name) {
		var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	}

	//쿠키 삭제하기
	var deleteCookie = function (name, count) {
		//즉시 삭제
		if (count == null) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		//count(sec) 후 삭제
		else {
			var date = new Date();
			date.setTime(date.getTime() + (count * 1000));
			var expires = " expires=" + date.toGMTString();
			document.cookie = name + '=; ' + expires;
		}
	}

	//브라우져의 X-SCADA 서버 로그인 세션 아이디를 가져온다.
	var getLoginSessionId = function () {
		return getCookieValue('xscada.loginSessionId');
	}

	//X-SCADA 서버 로그인 세션을 제거한다.
	var deleteLoginSessionIdCookie = function (countDown) {
		deleteCookie('xscada.loginSessionId', countDown);
	}

	//X-SCADA 서버 타임아웃 세션을 제거한다.
	var deleteLoginTimeoutCookie = function () {
		deleteCookie('xscada.loginSessionId.timeout');
	}

	//현재 세션 상태를 진단해서 결과를 반환 good, timeout, ipConflict, accountConflict, logout
	var getSessionStatus = function () {

		var status = getCookieValue('xscada.session.status');
		if (status != null) return status;
		if (scada.activeSession == null || scada.activeSession.timeoutMin == 0) return 'good';
		if (getCookieValue('xscada.loginSessionId.timeout') != null) return 'good';
		if (getLoginSessionId() == null) return 'logout';
		return 'timeout';
	}

	//ip주소 충돌 상태 마킹
	var markIpConflict = function () {

		var date = new Date();
		date.setTime(date.getTime() + 5 * 1000);
		document.cookie = 'xscada.session.status=ipConflict; expires=' + date.toUTCString() + ';path=/';
	}

	//계정 충돌 상태 마킹
	var markAccountConflict = function () {
		//이미 더 심각한 이상 상황일 경우 리턴
		if (getCookieValue('xscada.session.status') == 'ipConflict') return;

		var date = new Date();
		date.setTime(date.getTime() + 5 * 1000);
		document.cookie = 'xscada.session.status=accountConflict; expires=' + date.toUTCString() + ';path=/';
	}

	//사용자가 화면을 클릭하면 만료시간 연장
	var extendExpiration = function () {
		if (scada.activeSession == null || scada.activeSession.timeoutMin == 0) return;

		var date = new Date();
		date.setTime(date.getTime() + scada.activeSession.timeoutMin * 60 * 1000);
		document.cookie = 'xscada.loginSessionId.timeout=alive; expires=' + date.toUTCString() + ';path=/';
	}

	//매초 세션 상태를 점검하다가 이상이 생기면 해당 페이지로 이동
	var sessionStatusCheck = function () {
		//console.log('sessionStatusCheck');
		var status = getSessionStatus();
		if (status == 'good') {
			setTimeout(sessionStatusCheck, ExpireCheckCycle);

		} else if (status == 'ipConflict') {
			window.location.href = "/_409.html?why=1";

		} else if (status == 'accountConflict') {
			window.location.href = "/_409.html?why=2";

		} else if (status == 'timeout') {
			window.location.href = "/_409.html";

		} else if (status == 'logout') {
			window.location.href = "/";

		}
	}

	//주기적으로 로그인 상태를 확인하기 위해 ping을 날린다.
	var sendSessionPing = function () {
		console.log('send ping');
		$.ajax({
			type: 'POST',
			url: '/authority/sendPing.xsm',
			dataType: 'JSON',
			success: function (res) {
				//이상 없는 경우
				if (res.code == 200) {
					pingRetryConout = 0;
					setTimeout(sendSessionPing, SessionPingCycle);
				}
				//브라우져는 로그인 세션 쿠키가 있지만 서버에는 해당 세션이 더이상 없는 경우
				else if (res.code == 409) {
					pingRetryConout = 0;
					scada.markAccountConflict();
					window.location.href = "/_409.html?why=2";
				} 
				// 다른 오류일 경우 재시도
				else if (pingRetryConout < PingRetryLimit) {
					pingRetryConout++;
					setTimeout(sendSessionPing, PingRetryDelay);

				} else {
					alert("There is no response from the security server.");
					logout();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				//브라우져는 로그인 세션 쿠키가 있지만 서버에는 해당 세션이 더이상 없는 경우
				if (xhr.readyState == 4 && xhr.status == 409) {
					pingRetryConout = 0;
					scada.markAccountConflict();
					window.location.href = "/_409.html?why=2";
				}
				// 다른 오류일 경우 재시도
				else if (pingRetryConout < PingRetryLimit) {
					pingRetryConout++;
					setTimeout(sendSessionPing, PingRetryDelay);

				} else {
					alert("There is no response from the security server.");
					logout();
				}
			}
		});
	}

	//전달받은 id, pw로 로그인을 시도한다. 성공할 경우 사용자 정보, 실패할 경우 null 반환
	var login = function (id, pw) {
		if(id == null || id.length == 0 || pw == null || pw.length == 0) return null;
		
		//브라우져 로그인 세션 쿠키 지우고
		scada.deleteLoginSessionIdCookie();
		//내부 객체도 null로 처리해준다.
		scada.activeSession = null;

		var loginData = {
			user_id: id,
			user_pw: $Common.SHA256(pw),
		}

		$.ajax({
			type: "POST",
			url: "/authority/login.xsm",
			data: loginData,
			async: false,   //호출하는 쪽에서 사용자 정보를 받아야 하기 때문에 동기 방식으로 처리
			success: function (res) {
				if (res.code == 200) {
					var activeSession = {
						userId : res.data.userId,
						desc : res.data.desc,
						userType : res.data.userType,
						timeoutMin : res.data.timeoutMin,
						keys : res.data.keys,
					};

					Object.freeze(activeSession);
					scada.activeSession = activeSession;
					extendExpiration();

					//페이지에 있는 알람과 태그가 없어서 서버와 통신하지 않을 경우 임의로 ping을 보낸다.
					setTimeout(sendSessionPing, SessionPingCycle);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log("login failed");
			}
		});

		return this.activeSession != null;
	}

	//서버로 로그아웃 신호를 보내고 브라우저에 남아있는 쿠키 및 로그인 정보 객체를 지운다.
	var logout = function () {       

		//서버로 로그아웃 신호 보내고
		$.ajax({
			type: "POST",
			url: "/authority/logout.xsm",
			data: null,
			success: function (res) {
				//브라우져 로그인 관련 쿠키 지우고
				scada.deleteLoginSessionIdCookie();
				scada.deleteLoginTimeoutCookie();

				//메인으로 이동
				window.location.href = "/";
			},
			error: function () {
				//브라우져 로그인 관련 쿠키 지우고
				scada.deleteLoginSessionIdCookie();
				scada.deleteLoginTimeoutCookie();

				//메인으로 이동
				window.location.href = "/";
			}
		});
	}

	//서버로부터 현재 로그인중인 사용자 정보를 받아온다. 없을 경우 null
	var getLoginUserInfo = function () {
		//console.log('getLoginUserInfo');
		if (getCookieValue('xscada.loginSessionId') == null) {
			//console.log('getLoginSessionId is null');
			activeSession = null;
			return null;
		}

		$.ajax({
			type: "POST",
			url: "/authority/getInfo.xsm",
			async: false,   //호출하는 쪽에서 사용자 정보를 받아야 하기 때문에 동기 방식으로 처리
			success: function (res) {
				if (res.code == 200) {
					var activeSession = {
						userId : res.data.userId,
						desc : res.data.desc,
						userType : res.data.userType,
						timeoutMin : res.data.timeoutMin,
						keys : res.data.keys,
					};

					Object.freeze(activeSession);
					scada.activeSession = activeSession;
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.readyState == 4 && xhr.status == 409) {
					deleteLoginSessionIdCookie();
					scada.activeSession =null;
				}
			}
		});

		return scada.activeSession;
	}

	var initSession = function () {

		if (sessionInited) return;
		sessionInited = true;

		sessionStatusCheck();
		if (getLoginUserInfo() != null) {
			sendSessionPing();

		}

		document.addEventListener('click', function () {
			extendExpiration();
		});
	}

	var getURLParam = function (key) {
		var paramObject = $Common.getUrlParam();
		if (key == null || typeof key == "undefined") {
			return paramObject;
		} else {
			return paramObject[key];
        }
	}

	var utils = (function () {
		var copyToClipboard = function (val, callBack) {
			function call(msg) {
				if (callBack != null && typeof callBack == "function") {
					callBack(msg);
				}
			}

			if (navigator.clipboard) {
				navigator.clipboard.writeText(val).then(
					function () { call("success"); },
					function () { call("failed"); }
				);
			} else {
				const t = document.createElement("textarea");
				document.body.appendChild(t);
				t.value = val;
				t.select();
				var successful = true;
				try {
					successful = document.execCommand('copy');
				} catch (err) {
					successful = false;
				}
				document.body.removeChild(t);

				if (successful) {
					call("success");
				} else {
					call("failed");
				}
			}
		}
		return {
			copyToClipboard: copyToClipboard
		}
	})();

	return {
		tags: tags,
		alarms: alarms,
        devices: devices,
        databases: databases,
		disConnRetry: disConnRetry,
		disConnTime: disConnTime,
		messageHide: messageHide,
		messageShow: messageShow,
		getTagByName: getTagByName,
        getDeviceByName: getDeviceByName,
        getDatabaseByName: getDatabaseByName,
		getAlarmByName: getAlarmByName,
		getLevelConfigByName: getLevelConfigByName,
		getZoneConfigByName: getZoneConfigByName,
		getAlarmList: getAlarmList,
		getAlarmZoneList: getAlarmZoneList,
		getAlarmLevelList: getAlarmLevelList,
		getViewLiveData: getViewLiveData,
		getViewTrendData: getViewTrendData,
		getViewDatabase: getViewDatabase,
		getViewLiveDataYTChart: getViewLiveDataYTChart,
		getViewYTTrendData: getViewYTTrendData,
		getYTTrendChartXML: getYTTrendChartXML,
		initModule: initModule,
		login: login,
		logout: logout,
		getLoginUserInfo: getLoginUserInfo,
		getLoginSessionId: getLoginSessionId,
		getSessionStatus: getSessionStatus,
		deleteLoginSessionIdCookie: deleteLoginSessionIdCookie,
		deleteLoginTimeoutCookie: deleteLoginTimeoutCookie,
		sendSessionPing: sendSessionPing,
		sessionStatusCheck: sessionStatusCheck,
		markIpConflict: markIpConflict,
		markAccountConflict: markAccountConflict,
		initSession: initSession,
		get activeSession(){
			if(_activeSession == null){
				getLoginUserInfo();
			}
			else if(getLoginSessionId() == null){
				_activeSession = null;
			}
			return _activeSession;
		},
		set activeSession(obj){
			_activeSession = obj;
			var frames = document.getElementsByTagName("iframe");
			for(var i = 0; i < frames.length ; i++){
				if(typeof frames[i].contentWindow.scada != "undefined"){
					frames[i].contentWindow.scada.activeSession = obj;
				}
			}
		},
		getURLParam: getURLParam,
		utils: utils
	};
}());

scada.initSession();

///////////////////////////////////////////////////////////////////////////////
//// Tags Managerment
///////////////////////////////////////////////////////////////////////////////
(function () {

	function Tag(tag) {
        this._name = tag.name;
        this._fullName = tag.name;
        this.description = tag.description;
        this._type = tag.type;
        this._value = tag.value;
        this._minValue = tag.minValue;
        this._maxValue = tag.maxValue;
        this._device = tag.device;
        this._deviceAddress = tag.deviceAddress;
		this.status = 0;
		this.onText = tag.onText ? tag.onText : "";
		this.offText = tag.offText ? tag.offText : "";
		this.datetime = new Date();
		this.listeners = {};
		this.setValued = null;
        this.attributes = {};
	}

    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "name", {
        get: function() {
            return this._name;
        }
    });
    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "fullName", {
        get: function() {
            return this._name;
        }
    });

    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "value", {
        get: function() {
            return this.getValue();
        },
        set: function(val) {
            this.setValue(val);
        }
    });
    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "minValue", {
        get: function() {
            return this._minValue;
        }
    });

    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "maxValue", {
        get: function() {
            return this._maxValue;
        }
    });

    // Define get value and set value for tag
    Object.defineProperty(Tag.prototype, "desc", {
        get: function() {
            return this.description;
        }
    });

    // Define type for tag
    Object.defineProperty(Tag.prototype, "type", {
        get: function() {
            return this.getType();
        }
    });

     // Define get device for tag
    Object.defineProperty(Tag.prototype, "device", {
        get: function() {
            return this.getDevice();
        }
    });
    
    Object.defineProperty(Tag.prototype, "deviceAddress", {
        get: function() {
            return this.getDeviceAddress();
        }
    });    

	//Tag Add Event Listener
	Tag.prototype.addEventListener = function (type, callback) {
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	};

	//Tag Remove Event Listener
	Tag.prototype.removeEventListener = function (type, callback) {
		if (!(type in this.listeners)) {
			return;
		}
		var stack = this.listeners[type];
		var stackCount = stack.length;
		for (var i = 0, l = stackCount; i < l; i++) {
			if (stack[i] === callback) {
				stack.splice(i, 1);
				return this.removeEventListener(type, callback);
			}
		}
	};

	//Tag Dispatch Event
	Tag.prototype.dispatchEvent = function (event) {
		if (!(event.type in this.listeners)) {
			return;
		}
		var stack = this.listeners[event.type];
		var stackCount = stack.length;
		for (var i = 0; i < stackCount; i++) {
			stack[i].call(this, event);
		}
	};

	//Tag Dispatch Event - Value Item
	Tag.prototype.change = function (event, eventType, data) {
		event.sender = scada.getTagByName(data.name);
		event.type = data.type;
		event.name = data.name;
		event.value = data.newValue;
		event.valueString = data.newValueString;
		event.datetime = data.dateTime;
		event.initEvent(eventType, true, false);
		this.dispatchEvent(event);
	}

	//Tag Event - ValueChanged
	Tag.prototype.putValue = function (data) {
		// check the data is valid.
		if (data == null) return;
		if (!data.hasOwnProperty("value")) return;

		var nowDate = new Date();
		var status = typeof(data.status) == "number" ? data.status : 0;

		var oldStatus = this.status;
		var oldValue = this._value;
		var tag = this;
		this.status = status;
		this._value = data.value;
		this.datetime = nowDate;

		if (oldValue != data.value) {
			var eventType = "change";
			if (!(eventType in this.listeners)) {
				return;
			}

			var event = document.createEvent("HTMLEvents");
			event.initEvent(eventType, true, false);
			event.sender = this;
			event.type = this._type;
			event.name = this._name;
			event.status = this.status;
			event.value = this._value;
			event.valueString = data.hasOwnProperty("valueString") ? data.valueString : data.value;
			event.datetime = nowDate;
			Object.defineProperty(event, "target", { get: function () { return tag; } });
			Object.defineProperty(event, "currentTarget", { get: function () { return tag; } });

			this.dispatchEvent(event);
		}
		
		if (oldStatus != this.status) {
			var eventType = "status";
			if (!(eventType in this.listeners)) {
				return;
			}

			var event = document.createEvent("HTMLEvents");
			event.initEvent(eventType, true, false);
			event.sender = this;
			event.type = this._type;
			event.name = this._name;
			event.status = this.status;
			event.valueString = data.hasOwnProperty("valueString") ? data.valueString : data.value;
			event.datetime = nowDate;
			Object.defineProperty(event, "target", { get: function () { return tag; } });
			Object.defineProperty(event, "currentTarget", { get: function () { return tag; } });
			
			this.dispatchEvent(event);
		}
	}

	//Set Tag Value
	Tag.prototype.getValue = function () {
        return this._value;
	}

	//Set Tag ValueString
	Tag.prototype.valueString = function (value) {
        if (this._type == "digital") {
			value = value == true ? this.onText : this.offText;
		}
		return value;
	}

	//Set Tag Value
	Tag.prototype.setValue = function (value, securitykey) {
		var data;
		if (securitykey == null || securitykey == undefined || securitykey == "") {
			data = { name: this._name, value: value};
		} else {
			data = { name: this._name, value: value, securitykey: securitykey };
		}
		$.ajax({
			url: '/tag/setValue.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					this.setValued = true;
				} else {
					console.log('send failed !! ' + res.message);
				}
			}
		});
	}

    // get type for tag
    Tag.prototype.getType = function (){
        return this._type;
    }
    // get device for tag
    Tag.prototype.getDevice = function (){
        return this._device;
    }

    // Set device  for tag
    Tag.prototype.setDevice = function (value){
        this._device = value;
    }

    // Get device address of tag
    Tag.prototype.getDeviceAddress = function (){
        return this._deviceAddress;
    }

    // Set a user attribute for tag
    Tag.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of tag
    Tag.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for tag
    Tag.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on tag
    Tag.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }
    
	//태그관리 개체
	function TagManager() {
		this.name = "tagManager";
		this.tags = [];
		this.reqIndex = 0;
		this.reqCount = 1000;
		this.reqInterval = 100;//msec
		this.reqKind = 2;//1:single 2:multi
        this.attributes = {};
	}

	//태그관리 개체에 태그 할당
	TagManager.prototype.setTags = function (arg) {
		var type = typeof arg;
		if (type == "object") {
			var argCount = arg.length;
			for (var i = 0; i < argCount; i++) {
				var tag = arg[i];
				if (!tag) continue;

                var newtag = new Tag(tag);
                if(scada.devices != null){
                    var device = scada.getDeviceByName(tag.deviceName);
                    newtag.setDevice(device);
			}
                this.tags.push(newtag);
            }
		} else {
			this.tags.push(new Tag(arg));
		}

		scada.tags = this.tags;
	}

	//Get Tags List
	TagManager.prototype.getTags = function () {
		return this.tags;
	}

	//Get Tags Count
    TagManager.prototype.count = function () {
        return this.getTags().length;
    }

    //Get Tags Count
	TagManager.prototype.getTagsCount = function () {
		return this.getTags().length;
	}

	//Get Tag 정보 By Index
	TagManager.prototype.getTagByAt = function (idx) {
		var tags = this.getTags();
		return tags[idx];
	}

	//Get Tag 정보 By TagName
	TagManager.prototype.getTagByName = function (name) {
		var tags = this.getTags();
		var tagCount = tags.length;
		for (var i = 0; i < tagCount; i++) {
			var t = tags[i];
			if (!t) continue;
			if (t.name == name) return t;
		}
		return null;
	}

	//매개변수로 받은 태그 목록에 해당하는 이름들을 가져온다
	TagManager.prototype.getTagNames = function (items) {
		var itemsCount = items.length;
		var names = [];
		for (var i = 0; i < itemsCount; i++) {
			var t = items[i];
			names.push(t.name);
		}
		return names;
	}

	//배열로 주고받기 위해 해당 페이지에 있는 전체 태그들을 limitCount에 맞춰 가져온다 
	TagManager.prototype.getLimited = function (reqIndex, reqCount) {
		var tags = this.getTags();
		var tagCount = tags.length;
		var max = reqIndex + reqCount;
		var items = null;
		for (var i = reqIndex; i < max && i < tagCount; i++) {
			var t = tags[i];
			if (t.type == "group") continue;

			if (items == null) {
				items = [];
			}
			items.push(t);
		}
		return items;
	}

	//Get Tags에 대한 tag값
	TagManager.prototype.requestDatas = function () {
		if (scada.getSessionStatus() != 'good') return;

		var view = this;
		var tagCount = this.getTagsCount();
		var reqCount = this.reqCount;
		var limitedTags = null;

		while (this.reqIndex < tagCount) {
			limitedTags = this.getLimited(this.reqIndex, reqCount);
			if (limitedTags != null) break;

			this.reqIndex += reqCount;
		}

		if (limitedTags == null) {
			page.contentShow();

			this.reqIndex = 0;
			setTimeout(function () {
				view.requestDatas();
			}, this.reqInterval);

			return;
		}

		var names = this.getTagNames(limitedTags);
		var namesCount = names.length;

		$.ajax({
			url: '/tag/getValues.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'n': names },   //names로 보내는 것보다 n으로 보내는 것이 패킷 크기가 줄어든다.
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				scada.messageHide();//통신이상 message hide

				if (res.code == 200) {
					for (var i = 0; i < namesCount; i++) {
						limitedTags[i].putValue(res.data[i]);
					}
				} else {
					console.log('tag request failed !! ' + res.message);
				}

				view.reqIndex += reqCount;
				view.requestDatas();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.readyState == 4 && xhr.status == 409) {
					scada.markIpConflict();
					window.location.href = "/_409.html?why=1";
					return;
				}

				setTimeout(function () {
					view.requestDatas();
				}, xhr.readyState == 0 ? 1000 : Math.max(view.reqInterval, 2000));

				page.contentShow();               

				if (xhr.readyState == 0) {
					if (scada.disConnRetry == 0) {
						var localTime = moment.utc(new Date()).toDate();
						scada.disConnTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
					}

					if (scada.disConnRetry > 10000) scada.disConnRetry = 1;
					scada.disConnRetry++;

					var message = "network connection error !!" + "<br/><p class='size-13'>" + scada.disConnTime + "</p>";
					scada.messageShow("message infomation", message);                    
				}
			}
		});
	}

	//Get Tags에 대한 tag값 기존
	TagManager.prototype.requestData = function () {
		if (scada.getSessionStatus() != 'good') return;

		var view = this;
		var tagCount = this.getTagsCount();
		var tag = null;

		while (this.reqIndex < tagCount) {
			tag = this.getTagByAt(this.reqIndex);
			if (tag.type != "group") break;

			this.reqIndex += 1;
			tag = null;
		}

		if (tag == null) {
			page.contentShow();

			this.reqIndex = 0;
			setTimeout(function () {
				view.requestData();
			}, this.reqInterval);

			return;
		}

		$.ajax({
			url: '/tag/getValue.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'name': tag.name },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				scada.messageHide();

				if (res.code == 200) {
					tag.putValue(eval(res.data));
				} else {
					console.log('tag request failed !! ' + res.message);
				}

				view.reqIndex += 1;
				view.requestData();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.readyState == 4 && xhr.status == 409) {
					scada.markIpConflict();
					window.location.href = "/_409.html?why=1";
					return;
				}

				setTimeout(function () {
					view.requestData();
				}, xhr.readyState == 0 ? 1000 : Math.max(view.reqInterval, 2000));

				page.contentShow();

				if (xhr.readyState == 0) {
					if (scada.disConnRetry == 0) {
						var localTime = moment.utc(new Date()).toDate();
						scada.disConnTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
					}

					if (scada.disConnRetry > 10000) scada.disConnRetry = 1;
					scada.disConnRetry++;

					var message = "network connection error !!" + "<br/><p class='size-13'>" + scada.disConnTime + "</p>";
					scada.messageShow("message infomation", message);
				}
			}
		});
	}

    // Set a user attribute for TagManager
    TagManager.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of TagManager
    TagManager.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for TagManager
    TagManager.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on TagManager
    TagManager.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else { 
            return true;
        }
    }
	scada.createTags = function (arg) {
		var view = new TagManager();
		scada.initModule(view);

		if (arg.reqInterval) {
			view.reqInterval = arg.reqInterval * 1000; //arg.reqInterval - sec, view.reqInterval - msec
		}
		view.setTags(arg.tags);//tag setting
		view.reqKind == 1 ? view.requestData() : view.requestDatas();//tag request single, multi
		return view;
	}
})();

///////////////////////////////////////////////////////////////////////////////
//// Alarms Managerment
///////////////////////////////////////////////////////////////////////////////
(function () {
	function Alarm(arg) {
		this.idx = -1;
		this.name = arg.name;
		this.message = arg.message.replace("\"", "&quot;").replace("\n", "<br/>");
		this.time = arg.time;
		this.level = arg.level == "" ? "1" : arg.level;
		this.zone = arg.zone;
		this.condition = arg.condition == "" ? "Equal" : arg.condition;
		this.value = arg.value;
		this.sound = arg.sound;
		this.soundLooping = arg.soundLooping == "" ? true : arg.soundLooping;
		this.page = arg.page;
		this.pageOpenOption = arg.pageOpenOption;
		this._enabled = arg.enabled;
		this.status = arg.status;
		this._acknowledged = arg.acknowledged;
		this.tagName = arg.tagName;
		this.listeners = {};
	}	

	Alarm.prototype.getName = function () {
		return this.name;
	}

	Alarm.prototype.setName = function (value) {
		this.name = value;
	}

	Alarm.prototype.getMessage = function () {
		return this.message.replace("&quot;", "\"").replace("<br/>", "\n");
	}

	Alarm.prototype.setMessage = function (value) {
		this.message = value;
	}

	Alarm.prototype.getLevel = function () {
		return this.level;
	}

	Alarm.prototype.setLevel = function (value) {
		this.level = value;
	}

	Alarm.prototype.getZone = function () {
		return this.zone;
	}

	Alarm.prototype.setZone = function (value) {
		this.zone = value;
	}

	Alarm.prototype.getTag = function () {
		return this.tagName;
	}

	Alarm.prototype.setTag = function (value) {
		this.tagName = value;
	}

	Alarm.prototype.getCondition = function () {
		return this.condition;
	}

	Alarm.prototype.setCondition = function (value) {
		this.condition = value;
	}

	Alarm.prototype.getValue = function () {
		return this.value;
	}

	Alarm.prototype.setValue = function (value) {
		this.value = value;
	}

	Alarm.prototype.getSound = function () {
		return this.sound;
	}

	Alarm.prototype.setSound = function (value) {
		this.sound = value;
	}

	Alarm.prototype.getSoundLooping = function () {
		return this.soundLooping;
	}

	Alarm.prototype.setSoundLooping = function (value) {
		this.soundLooping = value;
	}

	Alarm.prototype.getPage = function () {
		return this.page;
	}

	Alarm.prototype.setPage = function (value) {
		this.page = value;
	}

	Alarm.prototype.getEnabled = function () {
		return this._enabled;
	}

	Alarm.prototype.setEnabled = function (value) {
		this._enabled = value;
	}

	Alarm.prototype.getAcknowledged = function () {
		return this._acknowledged;
	}

	Alarm.prototype.setAcknowledged = function (value) {
		this._acknowledged = value;
	}

	Alarm.prototype.getStatus = function () {
		return this.status;
	}

	Alarm.prototype.setStatus = function (value) {
		this.status = value;
	}

	Alarm.prototype.listeners = null;
	Alarm.prototype.addEventListener = function (type, callback) {
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	};

	Alarm.prototype.removeEventListener = function (type, callback) {
		if (!(type in this.listeners)) {
			return;
		}
		var stack = this.listeners[type];
		var stackCount = stack.length;
		for (var i = 0, l = stackCount; i < l; i++) {
			if (stack[i] === callback) {
				stack.splice(i, 1);
				return this.removeEventListener(type, callback);
			}
		}
	};

	Alarm.prototype.dispatchEvent = function (event) {
		if (!(event.type in this.listeners)) {
			return;
		}
		var stack = this.listeners[event.type];
		var stackCount = stack.length;
		for (var i = 0, l = stackCount; i < l; i++) {
			stack[i].call(this, event);
		}
	};

	Alarm.prototype.changeEvent = function (event, eventType, evtdata) {
		event.type = evtdata.type;
		event.name = evtdata.name;
		event.status = evtdata.status;
		event.enabled = evtdata.enabled;
		event.acknowledged = evtdata.acknowledged;
		event.datetime = evtdata.datetime;
		event.tagName = evtdata.tagName,
		event.tagValue = evtdata.tagValue

		event.initEvent(eventType, true, false);
		this.dispatchEvent(event);
	}

	//Sent Alarm Enabled Value
	Alarm.prototype.sendEnabledValue = function (value) {
		var name = this.getName();
		$.ajax({
			url: '/alarm/setValue.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { name: name, value: value },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					console.log('alarm enabled sent !! ');
				} else {
					console.log('alarm enabled sent failed !! ' + res.message);
				}
			}
		});
	}

	Alarm.prototype.sendAcknowledgedValue = function (value) {
		var name = this.getName();
		$.ajax({
			url: '/alarm/setAck.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { name: name, value: value },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					console.log('alarm acknowledged sent !! ');
				} else {
					console.log('alarm acknowledged sent failed !! ' + res.message);
				}
			}
		});
	}

	Object.defineProperty(Alarm.prototype, "acknowledged", {
		get: function () {
			return this.getAcknowledged();
		},
		set: function (value) {
			this.sendAcknowledgedValue(value);
		}
	});

	Object.defineProperty(Alarm.prototype, "enabled", {
		get: function () {
			return this.getEnabled();
		},
		set: function (value) {
			this.sendEnabledValue(value);
		}
	});

	function AlarmManager() {
		this.name = "alarmManager";
		this.activeAlarms = [];
		this.reqInterval = 2000;//msec
		//this.alarmHashMap = null;
		this.alarmArr = null;
		this.alarmNameDic = null;
		this.levelConfigHashmap = null;
		this.zoneConfigHashmap = null;
	}

	//Get Alarms List
	AlarmManager.prototype.getAlarms = function () {      
		if (!this.alarmArr || !this.alarmNameDic) return null;  
		return this.alarmArr.slice(0);
	}

	AlarmManager.prototype.getAlarmNames = function () {    
		if (!this.alarmArr || !this.alarmNameDic) return null;  
		return Object.keys(this.alarmNameDic);
	}

	AlarmManager.prototype.getAlarmCount = function () {    
		if (!this.alarmArr || !this.alarmNameDic) return 0;  
		return this.alarmArr.length;
	}

	//Get Alarm By Index
	AlarmManager.prototype.getAlarmByAt = function (idx) {
		if (!this.alarmArr || !this.alarmNameDic) return null;
		if (idx < 0) return null;
		if (idx >= this.alarmArr.length) return null;
		return this.alarmArr[idx];
	}

	//Get Alarm By Name
	AlarmManager.prototype.getAlarmByName = function (name) {
		if (!this.alarmArr || !this.alarmNameDic) return null;
		var idx = this.alarmNameDic[name];
		//if(!idx) 조건으로 분기할 경우 idx가 0이면 의도치 않은 결과가 나온다.
		if (idx == null) return null;
		return this.alarmArr[idx];
	}

	AlarmManager.prototype.getLevelList = function () {
		return $AlarmLevelList;
	}

	AlarmManager.prototype.getZoneList = function () {
		return $AlarmZoneList;
	}

	AlarmManager.prototype.getAlarmConfig = function () {
		return $AlarmConfig;
	}

	AlarmManager.prototype.getLevelConfigByName = function (name) {
		if (!this.levelConfigHashmap) return null;
		var config = this.levelConfigHashmap.get(name);
		return config;
	}

	AlarmManager.prototype.getZoneConfigByName = function (name) {
		if (!this.zoneConfigHashmap) return null;
		var config = this.zoneConfigHashmap.get(name);
		return config;
	}

	//알람관리 객체에 알람객체 할당
	AlarmManager.prototype.setAlarms = function (args) {
		this.alarmArr = [];
		this.alarmNameDic = [];
		var argCount = args.length;
		for (var i = 0; i < argCount; i++) {
			var arg = args[i];
			var alarm = new Alarm(arg);
			alarm.idx = i;
			this.alarmArr.push(alarm);
			this.alarmNameDic[alarm.name] = i;
		}
		scada.alarms = this.getAlarms();
	}

	AlarmManager.prototype.setLevelConfig = function () {
		this.levelConfigHashmap = new $HashMap();

		var itemLength = $AlarmLevelConfig.length;
		for (var i = 0; i < itemLength; i++) {
			var item = $AlarmLevelConfig[i];
			this.levelConfigHashmap.put(item.name, item);
		}
	}

	AlarmManager.prototype.setZoneConfig = function () {
		this.zoneConfigHashmap = new $HashMap();

		var itemLength = $AlarmZoneConfig.length;
		for (var i = 0; i < itemLength; i++) {
			var item = $AlarmZoneConfig[i];
			this.zoneConfigHashmap.put(item.name, item);
		}
	}

	//Alarm Sound Play
	AlarmManager.prototype.playSound = function (force) {
		var activeAlarms = this.activeAlarms;
		var playingAlarm = getHighLevelAlarm(activeAlarms);
		var playerID = "xisom-audio-player";
		var player = page.getElementById(playerID);
		if (playingAlarm == null) {
			player.pause();
			$("#" + playerID).attr("src", "");
		} else {
			if (force != null && player.src.indexOf(playingAlarm.sound) > 0) return;			
			
			$("#" + playerID).attr("loop", playingAlarm.soundLooping == true ? "loop" : null);
			$("#" + playerID).attr("src", playingAlarm.sound);

			player.pause();
			if (!isNaN(player.duration)) {
				player.currentTime = 0;
			}
			var nopromise = {
				catch: new Function()
			};
			player.onended = function(e) {
				soundEndEvent(playingAlarm, activeAlarms);
			  };
			(player.play() || nopromise).catch(function (e) {
				console.error(e);
			});
		}
	}

	function soundEndEvent(StoppedAlarm, activeAlarms){
		var activeAlarm = getHighLevelAlarm(activeAlarms);
		
		if(activeAlarm.name == StoppedAlarm.name && activeAlarm.time == StoppedAlarm.time){			
			var index = scada.alarmManager.activeAlarmsIndexOf(StoppedAlarm.name);
			activeAlarms.splice(index, 1);
			scada.alarmManager.playSound(true);
		}
	}

	function getHighLevelAlarm(activeAlarms){
		var activeCount = activeAlarms.length;
		var highLevelAlarm;
		for (var i = 0; i < activeCount; i++) {
			var alarm = activeAlarms[i];
			if (!alarm) continue;
			if (alarm.enabled != true || alarm.sound == "") continue;
			if(highLevelAlarm == null || highLevelAlarm.level > alarm.level){
				highLevelAlarm = alarm;
			}
		}

		return highLevelAlarm
	}

	AlarmManager.prototype.stopSound = function () {
		var playerID = "xisom-audio-player";
		var player = page.getElementById(playerID);
		player.pause();
	}

	//Alarm Open Page
	AlarmManager.prototype.openPage = function (alarm) {
		if (alarm.status == true && alarm.page != "") {

			var windowName = "___";
			if (this.getAlarmConfig().sharePopupPage) {
				windowName += "Alarm" + alarm.page;
			} else {
				windowName += alarm.name + alarm.page;
			}

			var url = alarm.page + ".html?mode=alarmPopUp&_alarm=" + alarm.name;
			var mode = scada.getURLParam("mode");
			if (!mode || mode != "alarmPopUp") {

				if (alarm.pageOpenOption.indexOf("centerparent=yes") != -1) {
					$Common.openCenter(url, windowName, alarm.pageOpenOption);
				} else {
					window.open(url, windowName, alarm.pageOpenOption);
                }
			}
		}
	}

	AlarmManager.prototype.activeAlarmsIndexOf = function (name) {
		var index = -1;
		var activeCount = this.activeAlarms.length;
		for (var i = 0; i < activeCount; i++) {
			var alarm = this.activeAlarms[i];
			if (!alarm) continue;

			if (alarm.name == name) {
				index = i;
			}
		}
		return index;
	}

	//Alarms Status Changed
	AlarmManager.prototype.statusChanged = function (alarm) {	

		//알람 기본 설정을 따르지 않는 경우
		if (!page.pageAlarmSetting.followDefaultSetting) {	
			// 필터링
			if (page.pageAlarmSetting.levels.indexOf(alarm.level) == -1) return;
			if (page.pageAlarmSetting.zones.indexOf(alarm.zone) == -1) return;
		}

		var index = this.activeAlarmsIndexOf(alarm.name);
		if (this.getAlarmConfig().actionExceptAcknowledged) {
			if (alarm.status == true && alarm.acknowledged == false) {
				if (index < 0) {
					this.activeAlarms.push(alarm);
					this.openPage(alarm);
				}
			} else {
				if (index > -1) {
					this.activeAlarms.splice(index, 1);
				}
			}
		} else {
			if (alarm.status == true) {
				if (index < 0) {
					this.activeAlarms.push(alarm);
					this.openPage(alarm);
				}
			} else {
				if (index > -1) {
					this.activeAlarms.splice(index, 1);
				}
			}
        }

		this.playSound();
	}	

	AlarmManager.prototype.enabledChanged = function (alarm) {
		//알람 기본 설정을 따르지 않는 경우
		if (!page.pageAlarmSetting.followDefaultSetting) {
			// 필터링
			if (page.pageAlarmSetting.levels.indexOf(alarm.level) == -1) return;
			if (page.pageAlarmSetting.zones.indexOf(alarm.zone) == -1) return;
		}

		this.playSound();
	}

	AlarmManager.prototype.acknowledgedChanged = function (alarm) {
		//알람 기본 설정을 따르지 않는 경우
		if (!page.pageAlarmSetting.followDefaultSetting) {
			// 필터링
			if (page.pageAlarmSetting.levels.indexOf(alarm.level) == -1) return;
			if (page.pageAlarmSetting.zones.indexOf(alarm.zone) == -1) return;
		}
		
		if($AlarmConfig.actionExceptAcknowledged){
			this.stopSound();
		}
	}

	//Set Alarm Status Value
	AlarmManager.prototype.putValues = function (data) {
		var dataCount = data.length;
		for (var k = 0; k < dataCount; k++) {
			var item = data[k];
			if (!item) continue;

			var alarm = this.getAlarmByAt(k);
			if (!alarm) {
				console.log('alarm object empty')
				continue;
			}
			//console.log(item);
			item.name = alarm.name;
			item.tagName = alarm.tagName;
			item.message = alarm.message;
			item.description = alarm.description;
			item.time = item.t ? item.t : "";
			item.status = (item.f & 1) == 1;
			item.enabled = (item.f & 2) == 2;
			item.acknowledged = (item.f & 4) == 4;
			item.level = alarm.level;
			item.zone = alarm.zone;

			var oldStatus = alarm.getStatus();
			var oldEnabled = alarm.getEnabled();
			var oldAcknowledged = alarm.getAcknowledged();

			if(page == null) return;
			//sound 설정
			var sound = "";
			var soundLooping = true;
			if(!page.pageAlarmSetting.followDefaultSetting){
				if(page.pageAlarmSetting.sound != null && page.pageAlarmSetting.sound != ""){
					sound = page.pageAlarmSetting.sound;
					soundLooping = page.pageAlarmSetting.soundLooping;
				}
			}
			if(sound == ""){
				if(alarm.sound != null && alarm.sound != ""){
					sound = alarm.sound;
					soundLooping = alarm.soundLooping;
				}
			}
			var levelConfig = scada.getLevelConfigByName(alarm.level);
			if(sound == "" && levelConfig != null){
				if(levelConfig.sound != null && levelConfig.sound != ""){
					sound = levelConfig.sound;
					soundLooping = levelConfig.soundLooping;
				}
			}
			item.sound = sound;
			item.soundLooping = soundLooping;

			//page 설정
			var pageName = "";
			var pageOpenOption = true;
			if(!page.pageAlarmSetting.followDefaultSetting){
				if(page.pageAlarmSetting.page != null && page.pageAlarmSetting.page != ""){
					pageName = page.pageAlarmSetting.sound;
					pageOpenOption = page.pageAlarmSetting.pageOpenOption;
				}
			}
			if(pageName == ""){
				if(alarm.page != null && alarm.page != ""){
					pageName = alarm.page;
					pageOpenOption = alarm.pageOpenOption;
				}
			}
			
			item.page = pageName;
			item.pageOpenOption = pageOpenOption;

			//서버에서 받아온 알람 발생 상태가 알람 매니져의 알람 발생 상태와 다른 경우
			if (alarm.status != item.status) {
				this.statusChanged(item);
			}

			//서버에서 받아온 알람 활성 상태가 알람 매니져의 알람 활성 상태와 다른 경우
			if (alarm.enabled != item.enabled) {
				this.enabledChanged(item);
			}

			//서버에서 받아온 알람 확인 상태가 알람 매니져의 알람 확인 상태와 다른 경우
			if (alarm.acknowledged == true) {
				this.acknowledgedChanged(item);
			}

			//서버에서 받아온 알람 시간 값이 알람 매니져의 알람 시간 값과 다른 경우
			if (alarm.time != item.time) {
				alarm.time = item.time;
			}

			alarm.setStatus(item.status);
			alarm.setEnabled(item.enabled);
			alarm.setAcknowledged(item.acknowledged);
			
			var evt = document.createEvent("HTMLEvents");
			var evtdata = {
				name: item.name,
				status: item.status,
				enabled: item.enabled,
				acknowledged: item.acknowledged,
				datetime: item.time
			};

			var listeners = Object.keys(alarm.listeners);
			for (var i in listeners) {
				var type = listeners[i];

				if (type == "statusChanged") {
					if (evtdata.status != oldStatus) {
						evtdata.type = "status";
						alarm.changeEvent(evt, type, evtdata);
					}
				}
				else if (type == "enabledChanged") {
					if (evtdata.enabled != oldEnabled) {
						evtdata.type = "enabled";
						alarm.changeEvent(evt, type, evtdata);
					}
				}
				else if (type == "acknowledgedChanged") {
					if (evtdata.acknowledged != oldAcknowledged) {
						evtdata.type = "acknowledged";
						alarm.changeEvent(evt, type, evtdata);
					}
				}
			}
		}
	}

	//Get Alarms Status Data List
	AlarmManager.prototype.getStatusData = function () {
		if (scada.getSessionStatus() != 'good') return;
		//var allAlarmCount = this.getAlarmCount();
		var view = this;
		$.ajax({
			url: '/alarm/getValue.xsm',
			type: 'POST',
			dataType: 'JSON',
			traditional: true,
			//data: { 'allAlarmCount': allAlarmCount },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					view.putValues(eval(res.data));
				} else {
					DEBUG('request alarm status data  failed !! ' + res.message);
				}
				setTimeout(function () {
					view.getStatusData();
				}, view.reqInterval);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.readyState == 4 && xhr.status == 409) {
					scada.markIpConflict();
					window.location.href = "/_409.html?why=1";
					return;
				}
			}
		});
	}

	scada.createAlarms = function (args) {
		var view = new AlarmManager();
		view.setLevelConfig();
		view.setZoneConfig();

		if (args) {
			view.setAlarms(args);
			view.getStatusData();
		}

		scada.initModule(view);
		return view;
	}

})();


///////////////////////////////////////////////////////////////////////////////
//// Devices Managerment
///////////////////////////////////////////////////////////////////////////////
var Device = (function () {
    
    function Device(arg) {        
        this._name = arg.name;
        this._description = arg.description; 
        this._enable = arg.enable;
        this._virtualMode = arg.virtualMode;
        this._requestCount = arg.requestCount;
        this._isAlive = arg.isAlive;
        this._connections = {};
        this._activeConnection = {};
        this._listeners = {};
        this.attributes = {};
    }

   // Define name for device
   Object.defineProperty(Device.prototype, "name", {
    get: function() {
        return this._name;
    }
    });

    // Define description for device
    Object.defineProperty(Device.prototype, "description", {
        get: function() {
            return this._description;
        }
    });

    // Define get connection for device
    Object.defineProperty(Device.prototype, "connections", {
        get: function() {
            return this.getConnections();
        }
    });

    // Define enable for device
    Object.defineProperty(Device.prototype, "enable", {
        get: function() {
            return this._enable;
        }
    });

    // Define virtualMode for device
    Object.defineProperty(Device.prototype, "virtualMode", {
        get: function() {
            return this._virtualMode;
        }
    });

    // Define requestCount for device
    Object.defineProperty(Device.prototype, "requestCount", {
        get: function() {
            return this._requestCount;
        }
    });

    // Define get Active Connection for device
    Object.defineProperty(Device.prototype, "activeConnection", {
        get: function() {
            return this.getActiveConnection();
        }
    });

    // Define isAlive Connection for device
    Object.defineProperty(Device.prototype, "isAlive", {
        get: function() {
            return this._isAlive;
        }
    });
    
    // Get list of connection
    Device.prototype.getConnections = function () {
        return this._connections;
    };

    // Set list of connection
    Device.prototype.setConnections = function (value) {
        this._connections = value;
    };

    // Get current active connection
    Device.prototype.getActiveConnection = function () {
        return this._activeConnection;
    };

    // Set current active connection
    Device.prototype.setActiveConnection = function (value) {
        this._activeConnection = value;
    };

    //Device Add Event Listener
    Device.prototype.addEventListener = function (type, callback) {
        if (!(type in this._listeners)) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(callback);
    };

    //Device Remove Event Listener
    Device.prototype.removeEventListener = function (type, callback) {
        if (!(type in this._listeners)) {
            return;
        }
        var stack = this._listeners[type];
        var stackCount = stack.length;
        for (var i = 0, l = stackCount; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return this.removeEventListener(type, callback);
            }
        }
    };

    //Device Dispatch Event
    Device.prototype.dispatchEvent = function (event) {
        if (!(event.type in this._listeners)) {
            return;
        }
        var stack = this._listeners[event.type];
        var stackCount = stack.length;
        for (var i = 0; i < stackCount; i++) {
            stack[i].call(this, event);
        }
    };

    // Set a user attribute for Device
    Device.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of Device
    Device.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for Device
    Device.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on Device
    Device.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }

    function DeviceManager (){
        this.name = "deviceManager";
        this.devices = [];
        this.attributes = {};
    }

    // Create devices
    DeviceManager.prototype.setDevices = function(arg){
        var type = typeof arg;
        if(type == "object"){
            var argCount = arg.length;
            for(var i = 0; i < argCount; i++){
                var device = arg[i];
                if(!device) continue;

                var newdevice = new Device(device);
                var conman = scada.createConnectionManager(device.connections);
                var activecon = conman.getByName(device.activeConnectionName);
                newdevice.setActiveConnection(activecon);
                newdevice.setConnections(conman);
                this.devices.push(newdevice);
            }
        } else {
            var newdevice = new Device(arg);
            var conman = scada.createConnectionManager(arg.connections);
            newdevice.setActiveConnection(conman.getByName(arg.activeConnectionName));
            newdevice.setConnections(conman);
            
            this.devices.push(newdevice);
        }
        scada.devices = this.devices;
    }

    // count number of devices
    DeviceManager.prototype.count = function(){
        return this.devices.length;
    }

    // Get device list
    DeviceManager.prototype.getDevices = function(){
        return this.devices;
    }
    
    // Get device count
    DeviceManager.prototype.getDevicesCount = function() {
        return this.getDevices().length;
    }

    // Get device by index
    DeviceManager.prototype.getAt = function(idx) {
        var devices = this.getDevices();
        var count = devices.length;
        if(count < 1 || idx < 0 || count <= idx) return null;
        return devices[idx];
    }

    // Get device by name
    DeviceManager.prototype.getDeviceByName = function(name){
        var devices = this.getDevices();
        var devicesCount = devices.length;
        for(var i = 0; i < devicesCount; i++){
            var d = devices[i];
            if(!d) continue;
            if(d.name == name) return d;
        }
        return null;
    }

    // Set a user attribute for DeviceManager
    DeviceManager.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of DeviceManager
    DeviceManager.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for DeviceManager
    DeviceManager.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on DeviceManager
    DeviceManager.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }    

    scada.createDevices = function(arg){
        var view = new DeviceManager();
        scada.initModule(view);
        
        view.setDevices(arg.devices);
        return view;
    }
})();

///////////////////////////////////////////////////////////////////////////////
//// Connections Managerment
///////////////////////////////////////////////////////////////////////////////
(function (){
    function Connection (arg) {
        this._name = arg.name;
        this._scanTime = arg.scanTime;
        this._timeout = arg.timeout;
        this._enable = arg.enable;
        this._trialCount = arg.trialCount;
        this._type = arg.type;
        this._remoteAddress = arg.remoteAddress;
        this._remotePort = arg.remotePort;
        this._localAddress = arg.localAddress;
        this._portName = arg.portName;
        this._boudRate = arg.boudRate;
        this._partity = arg.partity;
        this._dataBits = arg.dataBits;
        this._stopBits = arg.stopBits;
        this._handShake = arg.handShake;
        this._dtrEnable = arg.dtrEnable;
        this._rtsEnable = arg.rtsEnable;
        this._station = arg.station;
        this.attributes = {};
    }

    // Define name for connection
    Object.defineProperty(Connection.prototype, "name", {
        get: function(){
            return this._name;
        }
    });
    // Define scanTime for connection
    Object.defineProperty(Connection.prototype, "scanTime", {
            get: function(){
                return this._scanTime;
            }
    });
    // Define timeout for connection
    Object.defineProperty(Connection.prototype, "timeout", {
        get: function(){
            return this._timeout;
        }
    });
    // Define enable for connection
    Object.defineProperty(Connection.prototype, "enable", {
        get: function(){
            return this._enable;
        }
    });
    // Define trialCount for connection
    Object.defineProperty(Connection.prototype, "trialCount", {
        get: function(){
            return this._trialCount;
        }
    });
    // Define type for connection
    Object.defineProperty(Connection.prototype, "type", {
        get: function(){
            return this._type;
        }
    });
    // Define remoteAddress for connection
    Object.defineProperty(Connection.prototype, "remoteAddress", {
        get: function(){
            return this._remoteAddress;
        }
    });
    // Define _remotePort for connection
    Object.defineProperty(Connection.prototype, "remotePort", {
        get: function(){
            return this._remotePort;
        }
    });
    // Define localAddress for connection
    Object.defineProperty(Connection.prototype, "localAddress", {
        get: function(){
            return this._localAddress;
        }
    });
    // Define portName for connection
    Object.defineProperty(Connection.prototype, "portName", {
        get: function(){
            return this._portName;
        }
    });
    // Define boudRate for connection
    Object.defineProperty(Connection.prototype, "boudRate", {
        get: function(){
            return this._boudRate;
        }
    });
    // Define partity for connection
    Object.defineProperty(Connection.prototype, "partity", {
        get: function(){
            return this._partity;
        }
    });
    // Define dataBits for connection
    Object.defineProperty(Connection.prototype, "dataBits", {
        get: function(){
            return this._dataBits;
        }
    });
    // Define stopBits for connection
    Object.defineProperty(Connection.prototype, "stopBits", {
        get: function(){
            return this._stopBits;
        }
    });
    // Define handShake for connection
    Object.defineProperty(Connection.prototype, "handShake", {
        get: function(){
            return this._handShake;
        }
    });
    // Define dtrEnable for connection
    Object.defineProperty(Connection.prototype, "dtrEnable", {
        get: function(){
            return this._dtrEnable;
        }
    });
    // Define rtsEnable for connection
    Object.defineProperty(Connection.prototype, "rtsEnable", {
        get: function(){
            return this._rtsEnable;
        }
    });
    // Define station for connection
    Object.defineProperty(Connection.prototype, "station", {
        get: function(){
            return this._station;
        }
    });    

    // Set a user attribute for Connection
    Connection.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of Connection
    Connection.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for Connection
    Connection.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on Connection
    Connection.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }

    function ConnectionManager (){
        this.name = "connectionManager";
        this.connections = [];
        this.attributes = {};
    }

    // Set connection list
    ConnectionManager.prototype.setConnections = function(arg) {
        var type = typeof arg;
        if(type == "object"){
            var conCount = arg.length;
            for(var i = 0; i < conCount; i ++){
                var inputcon = arg[i];
                this.connections.push(new Connection(inputcon));
            }            
        } else {
            this.connections.push(arg);
        }
    }

    // Get count of connections in list
    ConnectionManager.prototype.count = function (){
        return this.connections.length;
    }

    // Get all connections in list
    ConnectionManager.prototype.getConnections = function (){
        return this.connections;
    }

    // Get a connection by name
    ConnectionManager.prototype.getByName = function (name){
        var cons = this.getConnections();
        var conCount = cons.length;
        for(var i = 0; i < conCount; i ++){
            var con = cons[i];
            if(!con) continue;
            if(con.name == name) return con;
        }
        return null;
    }

    // Get a connection by index
    ConnectionManager.prototype.getAt = function (index){
        var cons = this.getConnections();
        var conCount = cons.length;
        if(conCount < 1 || index < 0 || conCount <= index ) return null;

        return cons[index];
    }

    // Set a user attribute for ConnectionManager
    ConnectionManager.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of ConnectionManager
    ConnectionManager.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for ConnectionManager
    ConnectionManager.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on ConnectionManager
    ConnectionManager.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }

    // Create connection mamaner
    scada.createConnectionManager = function(arg){
        var conman = new ConnectionManager();
        conman.setConnections(arg);
        return conman;
    }
})();

///////////////////////////////////////////////////////////////////////////////
//// Database Managerment
///////////////////////////////////////////////////////////////////////////////
(function (){
    function Database(arg){
        this._name = arg.name;
        this.errorListeners = {};
        this.successListeners = {};
        this.attributes = {};
    }

    // Define name property for database
    Object.defineProperty(Database.prototype, "name", {
        get: function() {
            return this._name;
        }
    });

    // Execute a SQL with specific name and parameters
    Database.prototype.execute = function(name, parameters, onsuccess, onerror ){
        scada.getViewDatabase(null, null, function (data) {
            if (data != null) {
                if(onsuccess != null){
                    // console.log("Database.prototype.execute: " , data);
                    var dataResultCollection = scada.createDataResultCollection(data);
					
					if(dataResultCollection.count == 0)
						dataResultCollection = null;

                    onsuccess.call(this, dataResultCollection);
                }
            } else {
                if(onerror != null)
                    onerror.call(this, "Error in Database Execute !!!");
            }
        }, this._name + "." + name, parameters==""? null : parameters);
    }

    // If user try to use defined query => Not support
    Database.prototype.executeQuery = function(name, parameters, onsuccess, onerror ){
        console.log("Not Support executeQuery on web!!!");
    }

    // Set a user attribute for Database
    Database.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of Database
    Database.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for Database
    Database.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on Database
    Database.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }    

    function DatabaseManager () {
        this.name = "databaseManager";
        this.databases = [];
        this.attributes = {};
    }

    // Get count of exist database
    DatabaseManager.prototype.count = function () {
        return this.databases.length;
    }

    // Set Databases
    DatabaseManager.prototype.setDatabases = function(arg){
        var type = typeof arg;
        if (type == "object") {
            var argCount = arg.length;
            for (var i = 0; i < argCount; i++) {
                var dbinfo = arg[i];
                if (!dbinfo) continue;
                var newdb = new Database(dbinfo);
                this.databases.push(newdb);
            }
        } else {
            this.databases.push(new Database(dbinfo));
        }

        scada.databases = this.databases;        
    }
    // Get databases
    DatabaseManager.prototype.getDatabases = function () {
        return this.databases;
    }

    // Get databases at index
    DatabaseManager.prototype.getAt = function (idx) {
        var dbs = this.databases;
        var count = dbs.length;        
        if(idx < 0 || count < 1 || count <= idx) return null;
        return this.databases[idx];
    }

    // Get database by name
    DatabaseManager.prototype.getDatabaseByName = function (name) {
        var dbs = this.databases;
        var count = dbs.length;
        if(count < 1) return null;
        for(var i = 0; i < count; i ++){
            var db = dbs[i];
            if(db.name == name) return db;
        }
        return null;
    }

    // Set a user attribute for DatabaseManager
    DatabaseManager.prototype.setAttribute = function (attr, value){
        this.attributes[attr] = value;
    }

    // Get user attribute of DatabaseManager
    DatabaseManager.prototype.getAttribute = function (attr){
        if(!(attr in this.attributes)){
            return null;
        }
        return this.attributes[attr];
    }

    // Remove user attribute for DatabaseManager
    DatabaseManager.prototype.removeAttribute = function (attr){
        if(!(attr in this.attributes)){
            return;
        }
        delete this.attributes[attr];
    }

    // Check an user attribute is available on DatabaseManager
    DatabaseManager.prototype.hasAttribute = function (attr){
        if(!(attr in this.attributes)){
            return false;
        } else{ 
            return true;
        }
    }
    
    scada.createDatabases = function(arg){
        var view = new DatabaseManager();
        scada.initModule(view);
        view.setDatabases(arg.databases)
        return view;
    }

})();


///////////////////////////////////////////////////////////////////////////////
//// Views Managerment
///////////////////////////////////////////////////////////////////////////////
(function () {

	function ViewManager() {
		this.name = "viewManager";
	}

	//Get View Live Data
	ViewManager.prototype.getViewLiveData = function (pageName, viewName, params, callback, limit) {
		var view = this;
		var timeStamp = "";
		var timeSpan = "";
		if (typeof params != "undefined") {
			timeStamp = new Date(params.timeStamp).toISOString();
			timeSpan = parseInt(params.timeSpan);
			if (timeSpan < 0) timeSpan = 1;
		}
		if (typeof limit == "undefined") {
			limit = "";
		}

		$.ajax({
			url: '/view/getData.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'page': pageName, 'view': viewName, 'mode': 'live', 'span': timeSpan, 'limit': limit },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					callback(eval(res.data));
				} else {
					console.log('get view live data failed !! ' + res.message);
					callback(null);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				setTimeout(function () {
					view.getViewLiveData(pageName, viewName, params, callback, limit);
				}, 1000 * 1);
			}
		});
	}

	//Get View Trend Data
	ViewManager.prototype.getViewTrendData = function (pageName, viewName, params, callback, limit) {
		var view = this;
		var timeStamp = "";
		var timeSpan = "";
		if (typeof params != "undefined") {
			timeStamp = new Date(params.timeStamp).toISOString();
			timeSpan = parseInt(params.timeSpan);
			if (timeSpan < 0) timeSpan = 1;
		}
		if (typeof limit == "undefined") {
			limit = "";
		}

		//console.log("pageName: " + pageName);
		//console.log("viewName: " + viewName);
		//console.log("params: " , params);
		
		$.ajax({
			url: '/view/getData.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'page': pageName, 'view': viewName, 'mode': 'trend', 'timestamp': timeStamp, 'span': timeSpan, 'limit': limit },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					callback(eval(res.data));
				} else {
					console.log('get view trend data failed !! ' + res.message);
					callback(null);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				setTimeout(function () {
					view.getViewTrendData(pageName, viewName, params, callback, limit);
				}, 1000 * 1);
			}
		});
	}

	//Get View Live Data for YTTrendChart
	ViewManager.prototype.getViewLiveDataYTChart = function (pageName, viewName, params, callback, limit) {
		var view = this;
		var timeStamp = "";
		var timeSpan = "";
		var tags = "";
		if (typeof params != "undefined") {
			timeStamp = new Date(params.timeStamp).toISOString();
			timeSpan = parseInt(params.timeSpan);
			tags = params.tags.toString();
				
			if (timeSpan < 0) timeSpan = 1;
		}
			
		//console.log("Series Tags: " + tags.toString());

		$.ajax({
			url: '/view/getData.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'page': pageName, 'view': viewName, 'mode': 'liveFB', 'tags': tags, 'span': timeSpan, 'limit': limit },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					callback(eval(res.data));
				} else {
					console.log('get view live data failed !! ' + res.message);
					callback(null);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				setTimeout(function () {
					view.getViewLiveDataYTChart(pageName, viewName, params, callback, limit);
				}, 1000 * 1);
			}
		});
	}

	//Get View Trend Data
	ViewManager.prototype.getViewYTTrendData = function (pageName, viewName, params, callback, limit) {
		var view = this;
		var timeStamp = "";
		var timeSpan = "";
		if (typeof params != "undefined") {
			timeStamp = new Date(params.timeStamp).toISOString();
			timeSpan = parseInt(params.timeSpan);
			tags = params.tags.toString();
			if (timeSpan < 0) timeSpan = 1;
		}
		if (typeof limit == "undefined") {
			limit = "";
		}
		
		$.ajax({
			url: '/view/getData.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'page': pageName, 'view': viewName, 'mode': 'trendFB', 'tags': tags, 'timestamp': timeStamp, 'span': timeSpan, 'limit': limit },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					callback(eval(res.data));
				} else {
					console.log('get view trend data failed !! ' + res.message);
					callback(null);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				setTimeout(function () {
					view.getViewTrendData(pageName, viewName, params, callback, limit);
				}, 1000 * 1);
			}
		});
	}

    // Get xml setting file of YTTrendChart
    ViewManager.prototype.getYTTrendChartXML = function (filename, callback) {
        var view = this;
                
        $.ajax({
            url: '/view/getXML.xsm',
            type: 'POST',
            dataType: 'JSON',
            data: { 'name': filename },
            async: true,
            context: this,
            crossDomain: true,
            success: function (res) {
                if (res.code == 200) {
                    // console.log(res);
                    callback(res.data);
                } else {
                    console.log('get view trend data failed !! ' + res.message);
                    callback(null);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                setTimeout(function () {
                    view.getViewTrendData(pageName, viewName, params, callback, limit);
                }, 1000 * 1);
            }
        });
	}
		
	//Get View Database
	ViewManager.prototype.getViewDatabase = function (pageName, viewName, callback, sql, SQLParams) {
		var view = this;

		$.ajax({
			url: '/dataSource/getData.xsm',
			type: 'POST',
			dataType: 'JSON',
			data: { 'page': pageName, 'view': viewName, 'sql': sql, 'SQLParams': JSON.stringify(SQLParams) },
			async: true,
			context: this,
			crossDomain: true,
			success: function (res) {
				if (res.code == 200) {
					callback(eval(res.data));
				} else {
					console.log('get view database data failed !! ' + res.message);
					callback(null);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				//setTimeout(function () {
				//	view.getViewDatabase(pageName, viewName, callback, sql, SQLParams);
				//}, 1000 * 1);
				callback(null);
			}
		});
	}

	scada.createViewManager = function () {
		var view = new ViewManager();
		scada.initModule(view);
	}

	scada.createViewManager();
})();
