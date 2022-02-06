
(function(global) {

	var func = global.$XView;
	if (typeof func != "undefined") {
		// 이미 설정됨..
		return;
	}
	// View
	func = function(name) {
		if (typeof name == "number") {
			return page.views[name];
		}
		return page.getViewByName(name);
	};
	global.$XView = func;
	global.$XV = func;

	// Tag
	func = function(name) {
		if (typeof name == "number") {
			return scada.tags[name];
		}
		return scada.getTagByName(name);
	};
	global.$XTag = func;
	global.$XT = func;

	// Device
	func = function(name) {
		if (typeof name == "number") {
			return scada.devices[name];
		}
		return scada.getDeviceByName(name);
	};
	global.$XDevice = func;
	global.$XI = func;

	// Export
	func = function(name) {
		if (typeof name == "number") {
			return scada.exports[name];
		}
		return scada.getExportByName(name);
	};
	global.$XExport = func;
	global.$XE = func;

	// Database
	func = function(name) {
		if (typeof name == "number") {
			return scada.databases[name];
		}
		return scada.getDatabaseByName(name);
	};
	global.$XDatabase = func;
	global.$XD = func;

	// User
	//func = function(name) {
	//	if (typeof name == "number") {
	//		return scada.users[name];
	//	}
	//	return scada.getUserById(name);
	//};
	//global.$XUser = func;
	//global.$XU = func;

	// Alarm
	func = function(name) {
		if (typeof name == "number") {
			return scada.alarms[name];
		}
		return scada.getAlarmByName(name);
	};
	global.$XAlarm = func;
	global.$XA = func;

	// Report
	func = function(name) {
		if (typeof name == "number") {
			return scada.reports[name];
		}
		return scada.getReportByName(name);
	};
	global.$XReport = func;
	global.$XR = func;

	// Scenario(Recipe)
	func = function(name) {
		if (typeof name == "number") {
			return scada.scenarios[name];
		}
		return scada.getScenarioByName(name);
	};

	global.$XScenario = func;
	global.$XS = func;

	// Capture
	func = function(name) {
		if (typeof name == "number") {
			return scada.captures[name];
		}
		return scada.getCaptureByName(name);
	};
	global.$XCapture = func;
	global.$XC = func;

}(this));

