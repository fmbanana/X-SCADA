if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// Group View
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function GroupView(arg) {
        
        ViewElement.call(this, arg);
        this.views = arg.views;
        this.parentVisible = false;
    }

    GroupView.prototype = Object.create(ViewElement.prototype);
    GroupView.prototype.constructor = GroupView;

    GroupView.prototype.getRect = function () {
        return page.getRect(this);
    }

    GroupView.prototype.initParentVisible = function () {
        var visibility = page.parentNodeVisibility(this._id);
        if (visibility == null) {
            this.parentVisible = true;
        } else {
            this.parentVisible = visibility == "visible" ? true : false;
        }
    }

    GroupView.prototype.setVisible = function (value) {
        this._visible = value;

        var parentObj = page.getParentNode(this._id);
        if (parentObj.tagName == "g" && parentObj.id != "") {
            var view = page.getViewByName(parentObj.id);
            var parentVisible = view.parentVisible == false ? false : view.visible;
            this.setVisibleByGroup(view.id, parentVisible);
        } else {
            this.setVisibleByGroup(this._id, value);
        }
    }

    GroupView.prototype.setVisibleByGroup = function (id, parentVisible) {
        var view = page.getViewByName(id);

        view.parentVisible = parentVisible;
        $("#" + id).attr("visibility", (view.parentVisible == false ? false : view.visible) == true ? "visible" : "hidden");

        var children = $("#" + id).children('g');
        for (var i = 0; i < children.length; i++) {
            var childId = children.eq(i)[0].id;
            var childView = page.getViewByName(childId);

            var childVisible = view.parentVisible == false ? false : childView.visible;
            $("#" + childId).attr("visibility", childVisible == true ? "visible" : "hidden");

            view.setVisibleByGroup(childId, childVisible);
        };
    }


    GroupView.prototype.setX = function (value) {
        this.drawView(value, this.getY(), this.getWidth(), this.getHeight());
        this._x = value;
    }

    GroupView.prototype.setY = function (value) {
        this.drawView(this.getX(), value, this.getWidth(), this.getHeight());
        this._y = value;
    }

    GroupView.prototype.setWidth = function (value) {
        this.drawView(this.getX(), this.getY(), value, this.getHeight());
        this._width = value;
    }

    GroupView.prototype.setHeight = function (value, resize) {
        this.drawView(this.getX(), this.getY(), this.getWidth(), value, resize);
        this._height = value;
    }


    GroupView.prototype.setAngle = function (value) {
        var cx = this.getX() + this._width / 2;
        var cy = this.getY() + this._height / 2;
        var rotate = "rotate(" + value + ", " + cx + ", " + cy + ")";
        $("#" + this._id).attr("transform", rotate);
        this._angle = value;
    }

    GroupView.prototype.setOpacity = function (value) { }

    GroupView.prototype.setFillStyle = function (value) { }

    GroupView.prototype.setFillOpacity = function (value) { }

    GroupView.prototype.setStrokeStyle = function (value) { }

    GroupView.prototype.setStrokeOpacity = function (value) { }

    GroupView.prototype.drawView = function (x, y, width, height, resize) {
        var viewsCount = this.views.length;

        var old = this.getRect();
        var angle = this.getAngle();
        if (old.Width == width && old.Height == height) {
            //이동만 있는경우
            var dx = x - old.X;
            var dy = y - old.Y;
            for (var i = 0; i < viewsCount; i++) {
                var view = page.getViewByName(this.views[i].id);
                var viewRect = view.getRect();
                view.setX(viewRect.X + dx);
                view.setY(viewRect.Y + dy);
            }
        } else {
            var sx = width / old.Width;
            var sy = height / old.Height;

            var oldCenter = page.getRectCenter(old);
            var newCenter = {};
            newCenter.X = x + Math.abs(width) / 2;
            newCenter.Y = y + Math.abs(height) / 2;

            for (var i = 0; i < viewsCount; i++) {
                var view = page.getViewByName(this.views[i].id);
                var viewRect = view.getRect();

                var viewWidth = view.getWidth() * sx;
                var viewHeight = view.getHeight() * sy;

                var x = sx >= 0 ? viewRect.Left : viewRect.Right; // 좌우 반전									
                var y = sy >= 0 ? viewRect.Top : viewRect.Bottom; // 상하 반전				
                var viewX = (x - oldCenter.X) * sx + newCenter.X;
                var viewY = (y - oldCenter.Y) * sy + newCenter.Y;

                view.setX(viewX);
                view.setY(viewY);
                view.setWidth(viewWidth);
                view.setHeight(viewHeight, resize);
            }
        }
    }

    page.createGroup = function (arg) {
        arg.angle = 0;
        var view = new GroupView(arg);
        view.initParentVisible();
        page.protoViews[arg.id] = view;
        return view;
    }
})();