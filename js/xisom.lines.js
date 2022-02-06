if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// LineShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function() {
	function LineShapeView(arg) {
		
        ShapeElement.call(this, arg);
        this._x1 = arg.x1;
        this._x2 = arg.x2;        
        this._y1 = arg.y1;
        this._y2 = arg.y2;
	}
    LineShapeView.prototype = Object.create(ShapeElement.prototype);
	LineShapeView.prototype.constructor = LineShapeView;

    Object.defineProperty(LineShapeView.prototype, "x1", {
        get: function () {
            return this.getX();
        },
        set: function(value){
            this.setX(value);
	}
    });

    Object.defineProperty(LineShapeView.prototype, "x2", {
        get: function () {
            return this.getX2();
        },
        set: function(value){
            this.setX2(value);
	}
    });

    Object.defineProperty(LineShapeView.prototype, "y1", {
        get: function () {
            return this.getY();
        },
        set: function(value){
            this.setY(value);            
		}
    });

    Object.defineProperty(LineShapeView.prototype, "y2", {
        get: function () {
            return this.getY2();
        },
        set: function(value){
            this.setY2(value);            
	}
    });


	LineShapeView.prototype.setX = function (value) {
		var x2 = this.getWidth() + value;

        $("#" + this._id).attr("x1", value);
        $("#" + this._id).attr("x2", x2);

		this.setX1(value);
		this.setX2(x2);
        this._x = value;
		this.setAngle(this.getAngle());
	}

	LineShapeView.prototype.getX1 = function () {
        return this._x1;
	}

	LineShapeView.prototype.setX1 = function (value) {
        this._x1 = value;
	}

	LineShapeView.prototype.getX2 = function () {
        return this._x2;
	}

	LineShapeView.prototype.setX2 = function (value) {
        if(value < 0) return;
        var x1 = this.getX1();
        this._x2 = value;
        $("#" + this._id).attr("x2", value);
        var width = value - x1;
        this.setWidth(width);
	}

	LineShapeView.prototype.setY = function (value) {
		var y2 = this.getHeight() + value;

        $("#" + this._id).attr("y1", value);
        $("#" + this._id).attr("y2", y2);

		this.setY1(value);
		this.setY2(y2);
        this._y = value;
		this.setAngle(this.getAngle());
	}

	LineShapeView.prototype.getY1 = function () {
        return this._y1;
	}

	LineShapeView.prototype.setY1 = function (value) {
        this._y1 = value;
	}

	LineShapeView.prototype.getY2 = function () {
        return this._y2;
	}

	LineShapeView.prototype.setY2 = function (value) {
        if(value < 0) return;
        $("#" + this._id).attr("y2", value);
        this._y2 = value;
        var y1 = this.getY1();
        var height = value - y1;
        this.setHeight(height);
	}

	LineShapeView.prototype.setWidth = function (value) {
        this._width = value;
		this.setAngle(this.getAngle());
	}

	LineShapeView.prototype.setHeight = function (value) {
        this._height = value;
		this.setAngle(this.getAngle());
	}

	LineShapeView.prototype.setAngle = function (value) {

		var cx = (this.getX1() + this.getX2()) / 2;
		var cy = (this.getY1() + this.getY2()) / 2;
		var rotate = " rotate(" + value + ", " + cx + ", " + cy + ")";
		this.setTransform(rotate);
        this._angle = value;
	}

	page.createLineShape = function (arg) {
		var view = new LineShapeView(arg);
		page.protoViews[arg.id] = view;
		view.setAngle(arg.angle);
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// PolylineShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function() {
	function PolylineShapeView(arg) {
		
        ShapeElement.call(this, arg);
	}
    PolylineShapeView.prototype = Object.create(ShapeElement.prototype);
	PolylineShapeView.prototype.constructor = PolylineShapeView;

	PolylineShapeView.prototype.setX = function (value) {
		var point = this.getPoints();

		var x = this.getX();
		var pos = value - x;
		var data = [];
		point.forEach(function (d, idx) {
			var dx = d.x + pos;
			var dy = d.y;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._x = value;
		this.setAngle(this.getAngle());
	}

	PolylineShapeView.prototype.setY = function (value) {
		var point = this.getPoints();

		var y = this.getY();
		var pos = value - y;

		var data = [];
		point.forEach(function (d, idx) {
			var dx = d.x;
			var dy = d.y + pos;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._y = value;
		this.setAngle(this.getAngle());
	}

	PolylineShapeView.prototype.getPoints = function () {
        var points = $("#" + this._id).attr("points").split(" ");
		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			item.x = parseFloat(d.split(",")[0]);
			item.y = parseFloat(d.split(",")[1]);
			data.push(item);
		})
		return data;
	}

	PolylineShapeView.prototype.setPoints = function (value) {
        $("#" + this._id).attr("points", value);
	}

	PolylineShapeView.prototype.setWidth = function (value) {
		var width = this.getWidth();
		if (width == value) return;

		var points = this.getPoints();
		var scale = value / width;
		var x = this.getX();

		var item = [];
		points.forEach(function (d, idx) {
			var dx = (d.x - x) * scale + x;
			item.push(dx + "," + d.y);
		})

		this.setPoints(item.join(" "));
        this._width = value;
		this.setAngle(this.getAngle());
	}

	PolylineShapeView.prototype.setHeight = function (value) {
		var height = this.getHeight();
		if (height == value) return;

		var points = this.getPoints();
		var scale = value / height;
		var y = this.getY();

		var item = [];
		points.forEach(function (d, idx) {
			var dy = (d.y - y) * scale + y;
			item.push(d.x + "," + dy);
		})

		this.setPoints(item.join(" "));
        this._height = value;
		this.setAngle(this.getAngle());
	}

	PolylineShapeView.prototype.setAngleX = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = value + this.getWidth() / 2;
			var cy = this.getY() + this.getHeight() / 2;
			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	PolylineShapeView.prototype.setAngleY = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = this.getX() + this.getWidth() / 2;
			var cy = value + this.getHeight() / 2;

			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	page.createPolylineShape = function (arg) {
		var view = new PolylineShapeView(arg);
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// QuadraticBezierShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function() {
	function QuadraticBezierShapeView(arg) {
		
        ShapeElement.call(this, arg);
	}
    QuadraticBezierShapeView.prototype = Object.create(ShapeElement.prototype);
	QuadraticBezierShapeView.prototype.constructor = QuadraticBezierShapeView;
    
	QuadraticBezierShapeView.prototype.getPoints = function () {
        var points = $("#" + this._id).attr("d").split(" ");
		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			var pt = d.split(",");
			var regExp = /[a-zA-Z]/;
			if (pt[0].search(regExp) != -1) {
				item.xCmd = pt[0].substring(0, 1);
				item.xValue = parseFloat(pt[0].substring(1, pt[0].length));
			} else {
				item.xCmd = "";
				item.xValue = parseFloat(pt[0]);
			}
			item.x = pt[0];
			item.y = parseFloat(pt[1]);
			data.push(item);
		})

		return data;
	}

	QuadraticBezierShapeView.prototype.setPoints = function (value) {
        $("#" + this._id).attr("d", value);
	}

	QuadraticBezierShapeView.prototype.setX = function (value) {
		var points = this.getPoints();
		var x = this.getX();

		var pos = value - x;
		var data = [];
		points.forEach(function (d, idx) {
			var dx = d.xCmd + String(d.xValue + pos);
			var dy = d.y;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._x = value;
		this.setAngle(this.getAngle());
	}

	QuadraticBezierShapeView.prototype.setY = function (value) {

		var y = this.getY();
		var points = this.getPoints();
		var pos = value - y;

		var data = [];
		points.forEach(function (d, idx) {
			var dx = d.x;
			var dy = d.y + pos;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._y = value;
		this.setAngle(this.getAngle());
	}

	QuadraticBezierShapeView.prototype.setWidth = function (value) {
		var width = this.getWidth();
		if (value == width) return;

		var points = this.getPoints();
		var scale = value / width;
		var x = this.getX();

		var item = [];
		points.forEach(function (d, idx) {
			var xvalue = (d.xValue - x) * scale + x;
			var dx = d.xCmd + String(xvalue);
			item.push(dx + "," + d.y);
		})

		this.setPoints(item.join(" "));
        this._width = value;
		this.setAngle(this.getAngle());
	}

	QuadraticBezierShapeView.prototype.setHeight = function (value) {
		var height = this.getHeight();
		if (height == value) return;

		var points = this.getPoints();
		var scale = value / height;
		var y = this.getY();

		var item = [];
		points.forEach(function (d, idx) {
			var dy = (d.y - y) * scale + y;
			item.push(d.x + "," + dy);
		})

		this.setPoints(item.join(" "));
        this._height = value;
		this.setAngle(this.getAngle());
	}

	QuadraticBezierShapeView.prototype.setAngleX = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = value + this.getWidth() / 2;
			var cy = this.getY() + this.getHeight() / 2;
			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	QuadraticBezierShapeView.prototype.setAngleY = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = this.getX() + this.getWidth() / 2;
			var cy = value + this.getHeight() / 2;

			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	page.createQuadraticBezierShape = function (arg) {
		var view = new QuadraticBezierShapeView(arg);
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// CubicBezierShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function() {
	function CubicBezierShapeView(arg) {
		
        ShapeElement.call(this, arg);
	}
    CubicBezierShapeView.prototype = Object.create(ShapeElement.prototype);
	CubicBezierShapeView.prototype.constructor = CubicBezierShapeView;
    
	CubicBezierShapeView.prototype.getPoints = function () {
        var points = $("#" + this._id).attr("d").split(" ");
		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			var pt = d.split(",");
			var regExp = /[a-zA-Z]/;
			if (pt[0].search(regExp) != -1) {
				item.xCmd = pt[0].substring(0, 1);
				item.xValue = parseFloat(pt[0].substring(1, pt[0].length));
			} else {
				item.xCmd = "";
				item.xValue = parseFloat(pt[0]);
			}
			item.x = pt[0];
			item.y = parseFloat(pt[1]);
			data.push(item);
		})
		return data;
	}

	CubicBezierShapeView.prototype.setPoints = function (value) {
        $("#" + this._id).attr("d", value);
	}

	CubicBezierShapeView.prototype.setX = function (value) {
		var points = this.getPoints();
		var x = this.getX();

		var pos = value - x;
		var data = [];
		points.forEach(function (d, idx) {
			var dx = d.xCmd + String(d.xValue + pos);
			var dy = d.y;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._x = value;
		this.setAngle(this.getAngle());
	}

	CubicBezierShapeView.prototype.setY = function (value) {

		var y = this.getY();
		var points = this.getPoints();
		var pos = value - y;

		var data = [];
		points.forEach(function (d, idx) {
			var dx = d.x;
			var dy = d.y + pos;
			data.push(dx + "," + dy);
		})

		this.setPoints(data.join(" "));
        this._y = value;
		this.setAngle(this.getAngle());
	}

	CubicBezierShapeView.prototype.setWidth = function (value) {
		var width = this.getWidth();
		if (value == width) return;

		var points = this.getPoints();
		var scale = value / width;
		var x = this.getX();

		var item = [];
		points.forEach(function (d, idx) {
			var xvalue = (d.xValue - x) * scale + x;
			var dx = d.xCmd + String(xvalue);
			item.push(dx + "," + d.y);
		})

		this.setPoints(item.join(" "));
        this._width = value;
		this.setAngle(this.getAngle());
	}

	CubicBezierShapeView.prototype.setHeight = function (value) {
		var height = this.getHeight();
		if (height == value) return;

		var points = this.getPoints();
		var scale = value / height;
		var y = this.getY();

		var item = [];
		points.forEach(function (d, idx) {
			var dy = (d.y - y) * scale + y;
			item.push(d.x + "," + dy);
		})

		this.setPoints(item.join(" "));
        this._height = value;
		this.setAngle(this.getAngle());
	}

	CubicBezierShapeView.prototype.setAngleX = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = value + this.getWidth() / 2;
			var cy = this.getY() + this.getHeight() / 2;
			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	CubicBezierShapeView.prototype.setAngleY = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = this.getX() + this.getWidth() / 2;
			var cy = value + this.getHeight() / 2;

			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	page.createCubicBezierShape = function (arg) {
		var view = new CubicBezierShapeView(arg);
		page.protoViews[arg.id] = view;
		return view;
	}
}());

/////////////////////////////////////////////////////////////////////////////////////
// CardinalSplineShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function() {
	function CardinalSplineShapeView(arg) {
		
        ShapeElement.call(this, arg);
		this.points = arg.points;
	}
    CardinalSplineShapeView.prototype = Object.create(ShapeElement.prototype);
	CardinalSplineShapeView.prototype.constructor = CardinalSplineShapeView;
    
	CardinalSplineShapeView.prototype.getPoints = function () {
		return this.points;
	}

	CardinalSplineShapeView.prototype.setPoints = function (value) {
        $("#" + this._id).attr("d", page.lineFunction(value));
		return this.points = value;
	}

	CardinalSplineShapeView.prototype.setX = function (value) {
		var points = this.getPoints();
		var x = this.getX();
		var pos = value - x;

		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			item.x = d.x + pos;
			item.y = d.y
			data.push(item);
		})

		this.setPoints(data);
        this._x = value;
		this.setAngle(this.getAngle());
	}

	CardinalSplineShapeView.prototype.setY = function (value) {
		var points = this.getPoints();
		var y = this.getY();
		var pos = value - y;

		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			item.x = d.x;
			item.y = d.y + pos;
			data.push(item);
		})

		this.setPoints(data);
        this._y = value;
		this.setAngle(this.getAngle());
	}

	CardinalSplineShapeView.prototype.setWidth = function (value) {

		var width = this.getWidth();
		if (value == width) return;

		var points = this.getPoints();
		var scale = value / width;
		var x = this.getX();

		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			item.x = (d.x - x) * scale + x;
			item.y = d.y;
			data.push(item);
		})

		this.setPoints(data);
        this._width = value;
		this.setAngle(this.getAngle());
	}

	CardinalSplineShapeView.prototype.setHeight = function (value) {
		var height = this.getHeight();
		if (height == value) return;

		var points = this.getPoints();
		var scale = value / height;
		var y = this.getY();

		var data = [];
		points.forEach(function (d, idx) {
			var item = {};
			item.x = d.x;
			item.y = (d.y - y) * scale + y;
			data.push(item);
		})

		this.setPoints(data);
        this._height = value;
		this.setAngle(this.getAngle());
	}

	CardinalSplineShapeView.prototype.setAngleX = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = value + this.getWidth() / 2;
			var cy = this.getY() + this.getHeight() / 2;
			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	CardinalSplineShapeView.prototype.setAngleY = function (value) {
		var angle = this.getAngle();
		if (angle != 0) {
			var cx = this.getX() + this.getWidth() / 2;
			var cy = value + this.getHeight() / 2;

			var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
			this.setTransform(rotate);
		}
	}

	page.createCardinalSplineShape = function (arg) {
		var view = new CardinalSplineShapeView(arg);
		page.protoViews[arg.id] = view;
		return view;
	}

})();