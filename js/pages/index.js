(function(){
page.contentShow();
scada.createAlarms($Alarms);
page.createLabel({id: "label_1", tag: "", securityKey: "", visible: true, text: "Text", x: 10, y: 120, radius: 0, width: 780, height: 50, angle: 0, fontSize: 29.38869, autoBaseFontSize: 24, autoBaseFontHeight: 39.74999, lineAlign: "Middle", align: "Center", autoSize: true, backgroundColor: "#FFFFFF", borderColor: "#000000", borderStyle: "Simple", foregroundColor: "#000000", tooltip: "", opacity: 1 ,textFormat: null, tspan: {x: 390, y: 40, translateY: 0 } });
page.createImage({id: "image_1", securityKey: "", baseUrl: "img/LOVE.JPG", tag: "", customRepository: false, customUrlTag: "", visible: true, x: 10, y: 179.748, width: 780.357, height: 410.383, imageWidth: 1411, imageHeight: 937, angle: 0, opacity: 1, animated: false, flipX: false, flipY: false, tooltip: "", animatableImage: false });
page.createLabel({id: "label_2", tag: "", securityKey: "", visible: true, text: "Main", x: 0, y: 0, radius: 0, width: 160, height: 50, angle: 0, fontSize: 27.06648, autoBaseFontSize: 24, autoBaseFontHeight: 43.06249, lineAlign: "Middle", align: "Center", autoSize: true, backgroundColor: "#FFFFFF", borderColor: "#000000", borderStyle: "Simple", foregroundColor: "#000000", tooltip: "", opacity: 1 ,textFormat: null, tspan: {x: 80, y: 40, translateY: 0 } });
page.createLabel({id: "label_3", tag: "", securityKey: "", visible: true, text: "Sub1", x: 160, y: 0, radius: 0, width: 160, height: 50, angle: 0, fontSize: 27.06648, autoBaseFontSize: 24, autoBaseFontHeight: 43.06249, lineAlign: "Middle", align: "Center", autoSize: true, backgroundColor: "#FFFFFF", borderColor: "#000000", borderStyle: "Simple", foregroundColor: "#000000", tooltip: "", opacity: 1 ,textFormat: null, tspan: {x: 80, y: 40, translateY: 0 } });
page.createLabel({id: "label_4", tag: "", securityKey: "", visible: true, text: "Sub2", x: 320, y: 0, radius: 0, width: 160, height: 50, angle: 0, fontSize: 27.06648, autoBaseFontSize: 24, autoBaseFontHeight: 43.06249, lineAlign: "Middle", align: "Center", autoSize: true, backgroundColor: "#FFFFFF", borderColor: "#000000", borderStyle: "Simple", foregroundColor: "#000000", tooltip: "", opacity: 1 ,textFormat: null, tspan: {x: 80, y: 40, translateY: 0 } });
page.createLabel({id: "label_5", tag: "", securityKey: "", visible: true, text: "Sub3", x: 480, y: 0, radius: 0, width: 160, height: 50, angle: 0, fontSize: 27.06648, autoBaseFontSize: 24, autoBaseFontHeight: 43.06249, lineAlign: "Middle", align: "Center", autoSize: true, backgroundColor: "#FFFFFF", borderColor: "#000000", borderStyle: "Simple", foregroundColor: "#000000", tooltip: "", opacity: 1 ,textFormat: null, tspan: {x: 80, y: 40, translateY: 0 } });
page.createActions({id: "label_5", plans: [{type: "PageClick", button: 0, mode: "Replace", window: "", options: "height=600,width=800", page: "sub3" }] });
page.createActions({id: "label_4", plans: [{type: "PageClick", button: 0, mode: "Replace", window: "", options: "height=600,width=800", page: "sub2" }] });
page.createActions({id: "label_3", plans: [{type: "PageClick", button: 0, mode: "Replace", window: "", options: "height=600,width=800", page: "sub1" }] });
page.createPageAlarmSetting({followDefaultSetting: true, levels: ["1","2","3","4","5","6","7","8","9","10"], zones: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX","CY","CZ","DA","DB","DC","DD","DE","DF","DG","DH","DI","DJ","DK","DL","DM","DN","DO","DP","DQ","DR","DS","DT","DU","DV","DW","DX","DY","DZ","EA","EB","EC","ED","EE","EF","EG","EH","EI","EJ","EK","EL","EM","EN","EO","EP","EQ","ER","ES","ET","EU","EV","EW","EX","EY","EZ","FA","FB","FC","FD","FE","FF","FG","FH","FI","FJ","FK","FL","FM","FN","FO","FP","FQ","FR","FS","FT","FU","FV","FW","FX","FY","FZ","GA","GB","GC","GD","GE","GF","GG","GH","GI","GJ","GK","GL","GM","GN","GO","GP","GQ","GR","GS","GT","GU","GV","GW","GX","GY","GZ","HA","HB","HC","HD","HE","HF","HG","HH","HI","HJ","HK","HL","HM","HN","HO","HP","HQ","HR","HS","HT","HU","HV","HW","HX","HY","HZ","IA","IB","IC","ID","IE","IF","IG","IH","II","IJ","IK","IL","IM","IN","IO","IP","IQ","IR","IS","IT","IU","IV","IW","IX","IY","IZ","JA","JB","JC","JD","JE","JF","JG","JH","JI","JJ","JK","JL","JM","JN","JO","JP","JQ","JR","JS","JT","JU","JV","JW","JX","JY","JZ","KA","KB","KC","KD","KE","KF","KG","KH","KI","KJ","KK","KL","KM","KN","KO","KP","KQ","KR","KS","KT","KU","KV","KW","KX","KY","KZ","LA","LB","LC","LD","LE","LF","LG","LH","LI","LJ","LK","LL","LM","LN","LO","LP","LQ","LR","LS","LT","LU","LV","LW","LX","LY","LZ","MA","MB","MC","MD","ME","MF","MG","MH","MI","MJ","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NB","NC","ND","NE","NF","NG","NH","NI","NJ","NK","NL","NM","NN","NO","NP","NQ","NR","NS","NT","NU","NV","NW","NX","NY","NZ","OA","OB","OC","OD","OE","OF","OG","OH","OI","OJ","OK","OL","OM","ON","OO","OP","OQ","OR","OS","OT","OU","OV","OW","OX","OY","OZ","PA","PB","PC","PD","PE","PF","PG","PH","PI","PJ","PK","PL","PM","PN","PO","PP","PQ","PR","PS","PT","PU","PV","PW","PX","PY","PZ","QA","QB","QC","QD","QE","QF","QG","QH","QI","QJ","QK","QL","QM","QN","QO","QP","QQ","QR","QS","QT","QU","QV","QW","QX","QY","QZ","RA","RB","RC","RD","RE","RF","RG","RH","RI","RJ","RK","RL","RM","RN","RO","RP","RQ","RR","RS","RT","RU","RV","RW","RX","RY","RZ","SA","SB","SC","SD","SE","SF","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SP","SQ","SR","SS","ST","SU","SV","SW","SX","SY","SZ","TA","TB","TC","TD","TE","TF","TG","TH","TI","TJ","TK","TL","TM","TN","TO","TP","TQ","TR","TS","TT","TU","TV","TW","TX","TY","TZ","UA","UB","UC","UD","UE","UF","UG","UH","UI","UJ","UK","UL","UM","UN","UO","UP","UQ","UR","US","UT","UU","UV","UW","UX","UY","UZ","VA","VB","VC","VD","VE","VF","VG","VH","VI","VJ","VK","VL","VM","VN","VO","VP","VQ","VR","VS","VT","VU","VV","VW","VX","VY","VZ","WA","WB","WC","WD","WE","WF","WG","WH","WI","WJ","WK","WL","WM","WN","WO","WP","WQ","WR","WS","WT","WU","WV","WW","WX","WY","WZ","XA","XB","XC","XD","XE","XF","XG","XH","XI","XJ","XK","XL","XM","XN","XO","XP","XQ","XR","XS","XT","XU","XV","XW","XX","XY","XZ","YA","YB","YC","YD","YE","YF","YG","YH","YI","YJ","YK","YL","YM","YN","YO","YP","YQ","YR","YS","YT","YU","YV","YW","YX","YY","YZ","ZA","ZB","ZC","ZD","ZE","ZF","ZG","ZH","ZI","ZJ","ZK","ZL","ZM","ZN","ZO","ZP","ZQ","ZR","ZS","ZT","ZU","ZV","ZW","ZX","ZY","ZZ"], soundEnable: true, sound: "", soundLooping: true, pageEnable: true , page: "" , pageOpenOption: "" , });
document.body.addEventListener('keydown', function(e){page.keypressPage(e,'index','sub1')});


(function () {
/////////////////////////////////////////////////////////
//// Register object View Events
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
// Register Tags Event Script
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
// Local Page Script
/////////////////////////////////////////////////////////

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

function getTime(){
    return new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초")
}

$XV("label_1").text = getTime();
setInterval(function(){
    $XV("label_1").text = getTime();
}, 1000);


})();


})();
