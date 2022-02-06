if (typeof page == "undefined") page = {};
if (typeof page.userMenu == "undefined") page.userMenu = {};
if (typeof page.userMenuItems == "undefined") page.userMenuItems = [];

//------------------------------------------------------------------------------------------------------------------- UserMenuManager
(function () {
    function UserMenuManager(arg) {        
        //this.dorpdownColor = arg.dorpdownColor;
        //this.focuseColor = arg.focuseColor;
        //this.menuColor = arg.menuColor;
        //this.textColor = arg.textColor;
        //this.font = arg.font;
        //this.fontSize = arg.fontSize;
        //this.fontWeight = arg.fontWeight;

        this.lastLoginSessionId = null;
    }

    //주기적으로 세션 쿠키가 변경되었는지 확인하여 변경이 있으면 사용자 메뉴 refresh호출
    function watchLoginSessionId() {
        if (scada.getLoginSessionId() != page.userMenu.lastLoginSessionId) {
            page.userMenu.lastLoginSessionId = scada.getLoginSessionId();
            page.userMenu.refreshMenus();
        }

        setTimeout(function () {
            watchLoginSessionId();
        }, 1000);
    }

    //서버로부터 로그인중인 사용자 정보를 받아와서 사용자 메뉴 refresh
    UserMenuManager.prototype.refreshMenus = function (loginUserInfo) {
        if(page.userMenuItems.length == 0) return;

        if (loginUserInfo == null) {
            loginUserInfo = scada.getLoginUserInfo();
        }

        for (var i = 0; i < page.userMenuItems.length; i++) {
            page.userMenuItems[i].refreshMenuItem(loginUserInfo);
        }
    }

    //로그인 진행
    UserMenuManager.prototype.login = function () {
        var user_id = $("#user_id").val();
        var user_pw = $("#user_pw").val();        
        $("#user_id").val("");
        $("#user_pw").val("");

        if (scada.login(user_id, user_pw)) {
            this.lastLoginSessionId = scada.activeSession.sessionId;
            this.refreshMenus(scada.activeSession);
            document.getElementById('login_popup').style.display = 'none';
        }
        else {
            this.lastLoginSessionId = null;
            if (navigator.language.indexOf("ko") == 0) {
                alert("아이디 또는 비밀번호가 잘못되었습니다.");
            } else {
                alert("ID or password is incorrect.");
            }
        }
    }

    //로그아웃 진행
    UserMenuManager.prototype.logout = function () {
        scada.logout();
        this.refreshMenus(null);
        document.getElementById('logout_popup').style.display = 'none';
    }

    page.createUserMenu = function (arg) {
        page.userMenu = new UserMenuManager(arg);
        page.lastAccesTime = new Date();
        document.addEventListener('click', function () {
            page.lastAccesTime = new Date();
        });
        watchLoginSessionId();
    }
})();

//------------------------------------------------------------------------------------------------------------------- UserMenuItemPage
(function () {

    function UserMenuItemPage(arg) {
        //공통
        this.id = arg.id;
        this.text = arg.text;
        this.securityKey = arg.securityKey;
        this.visible = false;
        //Page
        this.mode = arg.plan.mode;
        this.window = arg.plan.window;
        this.options = arg.plan.options;
        this.page = arg.plan.page;
    }

    UserMenuItemPage.prototype.refreshMenuItem = function (loginUserInfo) {
        if (this.securityKey.length == 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else if (loginUserInfo == null) {
            $("#" + this.id).parent("li").attr("display", "none");

        } else if (loginUserInfo.keys.indexOf(this.securityKey) >= 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else {
            $("#" + this.id).parent("li").attr("display", "none");

        }
    }

    page.createPageMenu = function (arg) {
        var userMenuItem = new UserMenuItemPage(arg);

        page.userMenuItems.push(userMenuItem);
        page.getElementById(userMenuItem.id).addEventListener(
            "click",
            function (e) { 
                console.log(userMenuItem.id); page.actions.pageClick(e, userMenuItem, arg.plan); 
            },
            false
        );

        return userMenuItem;
    }

}());

//------------------------------------------------------------------------------------------------------------------- UserMenuItemLabel
(function () {

    function UserMenuItemLabel(arg) {
        //공통
        this.id = arg.id;
        this.text = arg.text;
        this.visible = arg.visible;
        this.securityKey = arg.securityKey;
    }

    UserMenuItemLabel.prototype.refreshMenuItem = function (loginUserInfo) {
        if (this.securityKey.length == 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else if (loginUserInfo == null) {
            $("#" + this.id).parent("li").attr("display", "none");

        } else if (loginUserInfo.keys.indexOf(this.securityKey) >= 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else {
            $("#" + this.id).parent("li").attr("display", "none");

        }
    }

    page.createLabelMenu = function (arg) {
        var userMenuItem = new UserMenuItemLabel(arg);
        page.userMenuItems.push(userMenuItem);

        return userMenuItem;
    }

}());

//------------------------------------------------------------------------------------------------------------------- UserMenuItemDropdown
(function () {

    function UserMenuItemDropdown(arg) {
        //공통
        this.id = arg.id;
        this.text = arg.text;
        this.visible = arg.visible;
        this.securityKey = arg.securityKey;
        //Dropdown
        this.children = [];

    }

    UserMenuItemDropdown.prototype.refreshMenuItem = function (loginUserInfo) {
        if (this.securityKey.length == 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else if (loginUserInfo == null) {
            $("#" + this.id).parent("li").attr("display", "none");

        } else if (loginUserInfo.keys.indexOf(this.securityKey) >= 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else {
            $("#" + this.id).parent("li").attr("display", "none");

        }
    }

    UserMenuItemDropdown.prototype.addChild = function (userMenuItem) {
        this.children.push(userMenuItem);
    }

    UserMenuItemDropdown.prototype.getChildren = function () {
        return this.children.slice();
    }

    page.createDropDownMenu = function (arg) {
        var userMenuItem = new UserMenuItemDropdown(arg);
        page.userMenuItems.push(userMenuItem);

        return userMenuItem;
    }

}());

//------------------------------------------------------------------------------------------------------------------- UserMenuItemLogin
(function () {

    function UserMenuItemLogin(arg) {
        //공통
        this.id = arg.id;
        this.text = arg.text;
        this.visible = arg.visible;
        this.securityKey = arg.securityKey;
        //Login
        this.logoutText = arg.logoutText;
    }

    UserMenuItemLogin.prototype.refreshMenuItem = function (loginUserInfo) {
        if (this.securityKey.length == 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else if (loginUserInfo == null) {
            $("#" + this.id).parent("li").attr("display", "none");

        } else if (loginUserInfo.keys.indexOf(this.securityKey) >= 0) {
            $("#" + this.id).parent("li").attr("display", "inline");

        } else {
            $("#" + this.id).parent("li").attr("display", "none");

        }

        if(loginUserInfo != null){
            var logoutText = this.logoutText;
            logoutText = logoutText.replace("{ID}", loginUserInfo.userId).replace("{Type}", loginUserInfo.userType).replace("{Desc}", loginUserInfo.desc);
            $("#" + this.id).text(logoutText);
            $("#" + this.id).attr("status", "login");

        }else{
            $("#" + this.id).text(this.text);
            $("#" + this.id).attr("status", "logout");

        }
    }

    //로그인 계정에 따라 사용자 메뉴 모양 초기화
    UserMenuItemLogin.prototype.setLoginStatus = function () {
        var loginUserInfo = scada.getLoginUserInfo();

        if (loginUserInfo == null) {
            $("#" + this.id).text(this.text);

        } else {
            var logoutText = this.logoutText;
            logoutText = logoutText.replace("{ID}", loginUserInfo.userId).replace("{Type}", loginUserInfo.userType).replace("{Desc}", loginUserInfo.desc);
            $("#" + this.id).text(logoutText);

        }
    }

    page.createLoginMenu = function (arg) {
        var userMenuItem = new UserMenuItemLogin(arg);
        page.userMenuItems.push(userMenuItem);
        //클릭시 팝업
        page.getElementById(userMenuItem.id).addEventListener(
            "click",
            function (e) {
                if (page.userMenu.lastLoginSessionId != null) {
                    document.getElementById('logout_popup').style.display = "block";

                } else {
                    document.getElementById('login_popup').style.display = "block";
                    document.getElementById("user_id").focus();
                }
            },
            false
        );

        document.getElementById("login_btn").onclick = function () {
            page.userMenu.login();
        }
        document.getElementById("logout_btn").onclick = function () {
            page.userMenu.logout();
        }

        userMenuItem.setLoginStatus();
        return userMenuItem;
    }

    $(document).keyup(function (e) {

        var login_popup = document.getElementById('login_popup');
        var logout_popup = document.getElementById('logout_popup');

        if (login_popup == null || logout_popup == null)
            return;

        if (e.keyCode == 27) {
            if (logout_popup.style.display == "block") {
                logout_popup.style.display = "none"
            } else if (login_popup.style.display == "block") {
                login_popup.style.display = "none"
            }
        }
        else if (e.keyCode == 13) {
            if (login_popup.style.display == "block") {
                page.userMenu.login();
            } else if (logout_popup.style.display == "block") {
                page.userMenu.logout();
            }
        }
    });

}());










