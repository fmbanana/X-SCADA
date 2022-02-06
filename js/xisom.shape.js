if (typeof page == "undefined") page = {};
if (typeof page.protoViews == "undefined") page.protoViews = {};

/////////////////////////////////////////////////////////////////////////////////////
// RectangleShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function RectangleShapeView(arg) {
        
        ShapeElement.call(this, arg);
        this._radius = arg.radius;
    }
    RectangleShapeView.prototype = Object.create(ShapeElement.prototype);
    RectangleShapeView.prototype.constructor = RectangleShapeView;

    // Define radius property
    Object.defineProperty(RectangleShapeView.prototype, "radius", {
        get: function() {
            return this.getRadius();
        },
        set: function(value){
            this.setRadius(value);
        }
    });

    RectangleShapeView.prototype.setX = function (value) {
        $("#" + this._id).attr("x", value);
        this._x = value;
        this.setAngle(this.getAngle());
    }

    RectangleShapeView.prototype.setY = function (value) {
        $("#" + this._id).attr("y", value);
        this._y = value;
        this.setAngle(this.getAngle());
    }

    RectangleShapeView.prototype.setWidth = function (value) {
        $("#" + this._id).attr("width", value);
        this._width = value;
        this.setAngle(this.getAngle());
    }

    RectangleShapeView.prototype.setHeight = function (value) {
        $("#" + this._id).attr("height", value);
        this._height = value;
        this.setAngle(this.getAngle());
    }

    RectangleShapeView.prototype.getRadius = function (value) {
        return this._radius;
    }

    RectangleShapeView.prototype.setRadius = function (value) {
        if(value < 0) return;
        $("#" + this._id).attr("rx", value);
        $("#" + this._id).attr("ry", value);
        this._radius = value;
    }

    page.createRectangleShape = function (arg) {
        var view = new RectangleShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// EllipseShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function EllipseShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    EllipseShapeView.prototype = Object.create(ShapeElement.prototype);
    EllipseShapeView.prototype.constructor = EllipseShapeView;

    EllipseShapeView.prototype.setX = function (value) {
        var width = this.getWidth();
        var cx = value + width / 2.0;

        $("#" + this._id).attr("cx", cx);
        this._x = value;
        this.setAngle(this.getAngle());
    }

    EllipseShapeView.prototype.setY = function (value) {
        var height = this.getHeight();
        var cy = value + height / 2.0;

        $("#" + this._id).attr("cy", cy);
        this._y = value;
        this.setAngle(this.getAngle());
    }

    EllipseShapeView.prototype.setWidth = function (value) {
        $("#" + this._id).attr("rx", value / 2.0);
        this._width = value;
        this.setAngle(this.getAngle());
    }

    EllipseShapeView.prototype.setHeight = function (value) {
        $("#" + this._id).attr("ry", value / 2.0);
        this._height = value;
        this.setAngle(this.getAngle());
    }

    page.createEllipseShape = function (arg) {
        var view = new EllipseShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// BlockArcShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function BlockArcShapeView(arg) {
        
        ShapeElement.call(this, arg);
        
        this._radius = arg.radius;
        this._radiusTag = arg.radiusTag;
        this._startAngle = arg.startAngle
        this._startAngleTag = arg.startAngleTag;
        this._endAngle = arg.endAngle;
        this._endAngleTag = arg.endAngleTag;
        this._sweepAngle = 0;
    }
    BlockArcShapeView.prototype = Object.create(ShapeElement.prototype);
    BlockArcShapeView.prototype.constructor = BlockArcShapeView;

    // Define Radius property
    Object.defineProperty(BlockArcShapeView.prototype, "radius", {
        get: function () {
            return this.getRadius();
        },
        set: function (value) {
            this.setRadius(value);
        }
    });

    // Define Radius tag property
    Object.defineProperty(BlockArcShapeView.prototype, "radiusTag", {
        get: function () {
            return this.getRadiusTag();
        }
    });

    // Define start angle property
    Object.defineProperty(BlockArcShapeView.prototype, "startAngle", {
        get: function () {
            return this.getStartAngle();
        },
        set: function (value) {
            this.setStartAngle(value);
        }
    });

    // Define star angle tag property
    Object.defineProperty(BlockArcShapeView.prototype, "startAngleTag", {
        get: function () {
            return this.getStartAngleTag();
        }
    });

    // Define end angle property
    Object.defineProperty(BlockArcShapeView.prototype, "endAngle", {
        get: function () {
            return this.getEndAngle();
        },
        set: function (value) {
            this.setEndAngle(value);
        }
    });
    
    // Define end angle tag property
    Object.defineProperty(BlockArcShapeView.prototype, "endAngleTag", {
        get: function () {
            return this.getEndAngleTag();
        }
    });

    BlockArcShapeView.prototype.setX = function (value) {
        //console.trace();
        var width = this.getWidth();
        var cx = value + width / 2.0;

        $("#" + this._id).attr("cx", cx);
        this._x = value;
        this.setAngle(this.getAngle());
    }

    BlockArcShapeView.prototype.setY = function (value) {
        var height = this.getHeight();
        var cy = value + height / 2.0;

        $("#" + this._id).attr("cy", cy);
        this._y = value;
        this.setAngle(this.getAngle());
    }

    BlockArcShapeView.prototype.setWidth = function (value) {
        $("#" + this._id).attr("rx", value / 2.0);
        this._width = value;
        this.setAngle(this.getAngle());
    }

    BlockArcShapeView.prototype.setHeight = function (value) {
        $("#" + this._id).attr("ry", value / 2.0);
        this._height = value;
        this.setAngle(this.getAngle());
    }
    
    BlockArcShapeView.prototype.getRadius = function () {
        return parseFloat(this._radius);
    }

    BlockArcShapeView.prototype.setRadius = function (value) {
        this._radius = value;
        this.updateBlockArc();
    }

    BlockArcShapeView.prototype.getRadiusTag = function () {
        return this._radiusTag;
    }

    BlockArcShapeView.prototype.getStartAngle = function () {
        return parseFloat(this._startAngle);
    }

    BlockArcShapeView.prototype.setStartAngle = function (value) {
        var processval = parseFloat(value) % 360;
        if (processval < 0) {
            processval += 360;
        }
        this._startAngle = processval;
        this.updateSweepAngle();
        this.updateBlockArc();
    }

    BlockArcShapeView.prototype.getStartAngleTag = function () {
        return this._startAngleTag;
    }

    BlockArcShapeView.prototype.getSweepAngle = function () {
        return parseFloat(this._sweepAngle);
    }

    BlockArcShapeView.prototype.setSweepAngle = function (value) {
        this._sweepAngle = value;
    }

    BlockArcShapeView.prototype.updateSweepAngle = function () {
        var start = this.getStartAngle();
        var end = this.getEndAngle();

        var sweep = end - start;
        if (sweep < 0) {
            sweep += 360;
        }
        this.setSweepAngle(sweep);
    }

    BlockArcShapeView.prototype.getEndAngle = function () {
        return parseFloat(this._endAngle);
    }

    BlockArcShapeView.prototype.setEndAngle = function (value) {
        var processval = parseFloat(value) % 360;
        if (processval < 0) {
            processval += 360;
        }
        this._endAngle = processval;
        this.updateSweepAngle();
        this.updateBlockArc();
    }

    BlockArcShapeView.prototype.getEndAngleTag = function () {
        return this._endAngleTag;
    }

    ////////////////////////////////
    /// Radius tag value change handler
    ////////////////////////////////
    BlockArcShapeView.prototype.radiusTagValueChanged = function (e) {
        if (e.status == 0 || !this.nullText) {
            var value = page.getValueByFormat(this._radiusTag, null, e.valueString);
            if (value < 0 || value > 100) return;
            this.setRadius(value);
            this.updateBlockArc();
        }
    }

    ////////////////////////////////
    /// start angle tag value change handler
    ////////////////////////////////
    BlockArcShapeView.prototype.startAngleTagValueChanged = function (e) {
        if (e.status == 0 || !this.nullText) {
            var value = page.getValueByFormat(this._startAngleTag, null, e.valueString);
            this.setStartAngle(value);
            this.updateBlockArc();
        }
    }

    ////////////////////////////////
    /// End angle tag value change handler
    ////////////////////////////////
    BlockArcShapeView.prototype.endAngleTagValueChanged = function (e) {
        if (e.status == 0 || !this.nullText) {
            var value = page.getValueByFormat(this._endAngleTag, null, e.valueString);
            this.setEndAngle(value);
            this.updateBlockArc();
        }
    }

    ////////////////////////////////
    /// Get central point of ellipse
    ////////////////////////////////
    BlockArcShapeView.prototype.getCentralPoint = function () {
        return {
            x: this._x + this._width / 2,
            y: this._y + this._height / 2
        };
    }

    ////////////////////////////////
    /// Get big rectangle outside
    ////////////////////////////////
    BlockArcShapeView.prototype.getBigRectangleRadius = function () {
        return {
            rx: this._width / 2,
            ry: this._height / 2
        }
    }

    ////////////////////////////////
    /// Get small rectangle inside of ellipse
    ////////////////////////////////
    BlockArcShapeView.prototype.getSmallRectangleRadius = function (percent) {
        if (percent == 100) {
            return {
                rx: 0,
                ry: 0
            };
        }

        var thickness = this._height * percent / 100;
        if (this._width < this._height) {
            thickness = this._width * percent / 100;
        }

        //console.log("Percent: " + percent + " Thickness: " + thickness);

        var smallrect = {
            rx: (this._width - thickness) / 2,
            ry: (this._height - thickness) / 2
        };

        return smallrect;

    }

    ////////////////////////////////
    /// Re-Draw block when having change value of radius of start angle or end angle
    ////////////////////////////////
    BlockArcShapeView.prototype.updateBlockArc = function () {
        // console.log("========> updateBlockArc");

        var view = this;

        var radi = this.getRadius();
        //  console.log("radi: " , radi);

        var central = this.getCentralPoint();
        // console.log("central: " , central);

        var bigrect = this.getBigRectangleRadius();
        // console.log("rectangleRadius: ", bigrect);

        var smallrect = this.getSmallRectangleRadius(radi);
        // console.log("SmallRectangleRadius: ", smallrect);

        var startangle = this.getStartAngle();
        //  console.log("startangle: " + startangle);

        var sweepangle = this.getSweepAngle();
        //  console.log("sweepangle: " + sweepangle);

        var endangle = this.getEndAngle();
        //  console.log("endangle: " + endangle);

        var points = view.PointsCalculation(bigrect, smallrect);
        // console.log("points: " , points);

        var data = "";
        if (radi == 0) {
            // console.log("RADIUS === 0");
            data = "M " + points.point1.x + "," + points.point1.y + " \n";
        } else if (radi == 100) {
            //console.log("RADIUS === 100");
            if (sweepangle == 0 || sweepangle == 360) {

                var point = this.getPointFromAngle(bigrect, startangle + 180);
                var bigx = central.x + point.x;
                var bigy = central.y - point.y;

                data = "M " + points.point1.x + "," + points.point1.y + " \n";
                data += "A " + bigrect.rx + "," + bigrect.ry + " 0 1 0 " + bigx + "," + bigy + " \n";
                data += "A " + bigrect.rx + "," + bigrect.ry + " 0 0 0 " + points.point1.x + "," + points.point1.y + " \n";
            } else {
                data = "M " + points.point1.x + "," + points.point1.y + " \n";
                if (sweepangle > 180) {
                    data += "A " + bigrect.rx + "," + bigrect.ry + " 0 1 1 " + points.point2.x + " " + points.point2.y + " \n";
                } else {
                    data += "A " + bigrect.rx + "," + bigrect.ry + " 0 0 1 " + points.point2.x + " " + points.point2.y + " \n";
                }
                data += "L " + points.point3.x + " " + points.point3.y + " \n";
                data += "L " + points.point4.x + " " + points.point4.y + " \n";
                data += "L " + points.point1.x + " " + points.point1.y + " \n";
            }


        } else if (bigrect.rx == 0 || bigrect.ry == 0 || smallrect.rx == 0 || smallrect.ry == 0) {
            //console.log("RECTANGLE == 0");
            data = "M " + points.point1.x + "," + points.point1.y + " \n";
        } else {
            if (sweepangle == 0 || sweepangle == 360) {
                data = "M " + points.point1.x + "," + points.point1.y + " \n";

                // Draw to middle Point 2
                var point = this.getPointFromAngle(bigrect, startangle + 180);
                var bigx = central.x + point.x;
                var bigy = central.y - point.y;
                data += "A " + bigrect.rx + "," + bigrect.ry + " 0 0 1 " + bigx + " " + bigy + " \n";

                // Draw to point 2
                data += "A " + bigrect.rx + "," + bigrect.ry + " 0 0 1 " + points.point2.x + " " + points.point2.y + " \n";

                // Draw to middle Point 3
                data += "M " + points.point3.x + "," + points.point3.y + " \n";
                var point = this.getPointFromAngle(smallrect, startangle + 180);
                var smallx = central.x + point.x;
                var smally = central.y - point.y;
                data += "A " + smallrect.rx + "," + smallrect.ry + " 0 0 0 " + smallx + " " + smally + " \n";

                // Draw to Point 3
                data += "A " + smallrect.rx + "," + smallrect.ry + " 0 0 0 " + points.point4.x + " " + points.point4.y + " \n";

            } else {
                // Start at Point 1
                data = "M " + points.point1.x + "," + points.point1.y + " \n";

                //console.log("points: ", points);
                //Draw Big BlockArc
                if (sweepangle > 180) {
                    // If sweep angle larger than 180 => Draw from start angle to 180
                    data += "A " + bigrect.rx + "," + bigrect.ry + " 0 1 1 " + points.point2.x + " " + points.point2.y + " \n";
                } else {
                    // Draw to point 2
                    data += "A " + bigrect.rx + "," + bigrect.ry + " 0 0 1 " + points.point2.x + " " + points.point2.y + " \n";
                }
                data += "L " + points.point3.x + " " + points.point3.y + " \n";

                // Draw Small BlockArc
                // back to Point 4
                if (sweepangle > 180) {
                    // If sweep angle larger than 180 => Draw from start angle to 180
                    data += "A " + smallrect.rx + "," + smallrect.ry + " 0 1 0 " + points.point4.x + " " + points.point4.y + " \n";
                } else {

                    // Draw to Point 3
                    data += "A " + smallrect.rx + "," + smallrect.ry + " 0 0 0 " + points.point4.x + " " + points.point4.y + " \n";
                }

                data += "L " + points.point1.x + " " + points.point1.y + " \n";
            }
        }
        data += "z";

        // console.log("d=" + data)
        document.getElementById(this._id).setAttribute("d", data);
    }

    ////////////////////////////////
    /// get a point on ellipse when input a angle and rectangle of ellipse
    ////////////////////////////////
    BlockArcShapeView.prototype.getPointFromAngle = function (rect, originangle) {
        originangle = originangle >= 0 ? originangle % 360 : 360 + originangle % 360;
        var angle = 360 - originangle % 360;
        var angleRadian = angle * Math.PI / 180.0;
        // Alternative method by using polar coordinate formular
        // var radi = rect.rx * rect.ry / Math.sqrt( (rect.ry * Math.cos(angleRadian)) * (rect.ry * Math.cos(angleRadian))  + (rect.rx * Math.sin(angleRadian)) * (rect.rx * Math.sin(angleRadian)));
        // console.log("radi: " + radi);
        // var tmpx = radi * Math.cos(angleRadian);
        // var tmpy = radi * Math.sin(angleRadian);
        // console.log("tmpx: " + tmpx + " tmpy: " + tmpy);

        var num = Math.sqrt(rect.rx * rect.rx * Math.tan(angleRadian) * Math.tan(angleRadian) + rect.ry * rect.ry);
        var x = num == 0 ? 0 : (rect.rx * rect.ry) / num;
        var y = num == 0 ? 0 : (rect.rx * rect.ry * Math.tan(angleRadian)) / num;

        if (isNaN(x)) {
            x = 0;
        }
        if (isNaN(y)) {
            y = 0;
        }

        if (90 == angle) {
            return {
                x: 0,
                y: y
            };
        } else if (angle == 270) {
            return {
                x: 0,
                y: -y
            };
        }
        else if (90 < angle && angle < 270) {
            return {
                x: -x,
                y: -y
            };
        } else {
            return {
                x: x,
                y: y
            };
        }
    }

    ////////////////////////////////
    /// Calculate 4 point of block ar which given by big rectangle outside and small rectangle inside
    ////////////////////////////////
    BlockArcShapeView.prototype.PointsCalculation = function (bigrect, smallrect) {
        // console.log("PointsCalculation");
        var central = this.getCentralPoint();
        // console.log("central: ", central);

        var startangle = this.getStartAngle();
        // console.log("startangle: " + startangle);

        var sweepangle = this.getSweepAngle();
        // console.log("sweepangle: " + sweepangle);

        var endangle = parseFloat((startangle + sweepangle) % 360);

        var p1 = this.getPointFromAngle(bigrect, startangle);
        var point1 = {
            x: central.x + p1.x,
            y: central.y - p1.y
        }

        var p2 = this.getPointFromAngle(bigrect, endangle);
        var point2 = {

            x: central.x + p2.x,
            y: central.y - p2.y
        }

        var p3 = this.getPointFromAngle(smallrect, endangle);
        var point3 = {
            x: central.x + p3.x,
            y: central.y - p3.y
        }

        var p4 = this.getPointFromAngle(smallrect, startangle);
        var point4 = {
            x: central.x + p4.x,
            y: central.y - p4.y
        }
        return {
            point1: point1,
            point2: point2,
            point3: point3,
            point4: point4
        };
    }

    page.createBlockArcShape = function (arg) {
        var view = new BlockArcShapeView(arg);
        view.updateSweepAngle();
        view.updateBlockArc();

        if (arg.radiusTag != "") {
            var tag = scada.getTagByName(arg.radiusTag);
            view.radiusTag = tag;
            tag.addEventListener("change", function (event) {
                view.radiusTagValueChanged(event);
            });
        }

        if (arg.startAngleTag != "") {
            var tag = scada.getTagByName(arg.startAngleTag);
            view.startAngleTag = tag;
            tag.addEventListener("change", function (event) {
                view.startAngleTagValueChanged(event);
            });
        }

        if (arg.endAngleTag != "") {
            var tag = scada.getTagByName(arg.endAngleTag);
            view.endAngleTag = tag;
            tag.addEventListener("change", function (event) {
                view.endAngleTagValueChanged(event);
            });
        }

        page.protoViews[arg.id] = view;

        view.setAngle(arg.angle);

        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// PolygonShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function PolygonShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    PolygonShapeView.prototype = Object.create(ShapeElement.prototype);
    PolygonShapeView.prototype.constructor = PolygonShapeView;

    PolygonShapeView.prototype.getPoints = function () {
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

    PolygonShapeView.prototype.setX = function (value) {
        var points = this.getPoints();
        var x = this.getX();
        var pos = value - x;

        var data = [];
        points.forEach(function (d, idx) {
            var dx = d.x + pos;
            var dy = d.y;
            data.push(dx + "," + dy);
        })

        this.setPoints(data.join(" "));
        //this.setAngleX(value);
        this._x = value;
        this.setAngle(this.getAngle());
    }

    PolygonShapeView.prototype.setY = function (value) {
        var points = this.getPoints();
        var y = this.getY();
        var pos = value - y;

        var data = [];
        points.forEach(function (d, idx) {
            var dx = d.x;
            var dy = d.y + pos;
            data.push(dx + "," + dy);
        })

        this.setPoints(data.join(" "));
        //this.setAngleY(value);
        this._y = value;
        this.setAngle(this.getAngle());
    }

    PolygonShapeView.prototype.setWidth = function (value) {
        var width = this.getWidth();
        if (width == value) return;

        var points = this.getPoints();
        var scale = value / width;
        var x = this.getX();

        var data = [];
        points.forEach(function (d, idx) {
            var dx = (d.x - x) * scale + x;
            data.push(dx + "," + d.y);
        })

        this.setPoints(data.join(" "));
        this._width = value;
        this.setAngle(this.getAngle());
    }

    PolygonShapeView.prototype.setHeight = function (value) {
        var height = this.getHeight();
        if (height == value) return;

        var points = this.getPoints();
        var scale = value / height;
        var y = this.getY();

        var data = [];
        points.forEach(function (d, idx) {
            var dy = (d.y - y) * scale + y;
            data.push(d.x + "," + dy);
        })

        this.setPoints(data.join(" "));
        this._height = value;
        this.setAngle(this.getAngle());
    }

    PolygonShapeView.prototype.setAngleX = function (value) {
        var angle = this.getAngle();
        if (angle != 0) {
            var y = this.getY();
            var cx = value + this.getWidth() / 2;
            var cy = this.getY() + this.getHeight() / 2;
            var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
            this.setTransform(rotate);
        }
    }

    PolygonShapeView.prototype.setAngleY = function (value) {
        var angle = this.getAngle();
        if (angle != 0) {
            var cx = this.getX() + this.getWidth() / 2;
            var cy = value + this.getHeight() / 2;

            var rotate = "rotate(" + angle + ", " + cx + ", " + cy + ")";
            this.setTransform(rotate);
        }
    }

    page.createPolygonShape = function (arg) {
        var view = new PolygonShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// TriangleShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function TriangleShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    TriangleShapeView.prototype = Object.create(ShapeElement.prototype);
    TriangleShapeView.prototype.constructor = TriangleShapeView;
    
    TriangleShapeView.prototype.setPoints = function () {
        var pt1 = {};
        var pt2 = {};
        var pt3 = {};
        var rect = this.getRect();
        pt1.X = rect.Left;
        pt1.Y = rect.Bottom;
        pt2.X = (rect.Left + rect.Right) / 2;
        pt2.Y = rect.Top;
        pt3.X = rect.Right;
        pt3.Y = rect.Bottom;

        var points = "";
        points += pt1.X + "," + pt1.Y + " ";
        points += pt2.X + "," + pt2.Y + " ";
        points += pt3.X + "," + pt3.Y;

        $("#" + this._id).attr("points", points);
    }

    TriangleShapeView.prototype.setX = function (value) {
        this._x = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    TriangleShapeView.prototype.setY = function (value) {
        this._y = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    TriangleShapeView.prototype.setWidth = function (value) {
        this._width = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    TriangleShapeView.prototype.setHeight = function (value) {
        this._height = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    page.createTriangleShape = function (arg) {
        var view = new TriangleShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// PentagonShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function PentagonShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    PentagonShapeView.prototype = Object.create(ShapeElement.prototype);
    PentagonShapeView.prototype.constructor = PentagonShapeView;

    PentagonShapeView.prototype.setPoints = function () {
        var pt = {};
        var pt1 = {};
        var pt2 = {};
        var pt3 = {};
        var pt4 = {};
        var pt5 = {};
        var rect = this.getRect();
        var sx = 0.618033988749895;
        var sy = 0.381966011250105;

        pt.X = (rect.Left + rect.Right) / 2;
        pt.Y = (rect.Top + rect.Bottom) / 2;

        pt1.X = (rect.Left + rect.Right) / 2;
        pt1.Y = rect.Top;
        pt2.X = rect.Right;
        pt2.Y = parseFloat((sy * rect.Height)) + rect.Y;
        pt3.X = parseFloat((sx * rect.Width / 2)) + pt.X;
        pt3.Y = rect.Bottom;
        pt4.X = parseFloat((-sx * rect.Width / 2)) + pt.X;
        pt4.Y = rect.Bottom;
        pt5.X = rect.Left;
        pt5.Y = parseFloat((sy * rect.Height)) + rect.Y;

        var points = "";
        points += pt1.X + "," + pt1.Y + " ";
        points += pt2.X + "," + pt2.Y + " ";
        points += pt3.X + "," + pt3.Y + " ";
        points += pt4.X + "," + pt4.Y + " ";
        points += pt5.X + "," + pt5.Y;

        $("#" + this._id).attr("points", points);
    }

    PentagonShapeView.prototype.setX = function (value) {
        this._x = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    PentagonShapeView.prototype.setY = function (value) {
        this._y = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    PentagonShapeView.prototype.setWidth = function (value) {
        this._width = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    PentagonShapeView.prototype.setHeight = function (value) {
        this._height = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    page.createPentagonShape = function (arg) {
        var view = new PentagonShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());


/////////////////////////////////////////////////////////////////////////////////////
// HexagonShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function HexagonShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    HexagonShapeView.prototype = Object.create(ShapeElement.prototype);
    HexagonShapeView.prototype.constructor = HexagonShapeView;

    HexagonShapeView.prototype.setPoints = function () {
        var pt = {};
        var pt1 = {};
        var pt2 = {};
        var pt3 = {};
        var pt4 = {};
        var pt5 = {};
        var pt6 = {};
        var rect = this.getRect();
        var sx = 0.5;

        pt.X = (rect.Left + rect.Right) / 2;
        pt.Y = (rect.Top + rect.Bottom) / 2;

        pt1.X = rect.Right;
        pt1.Y = pt.Y;
        pt2.X = parseFloat(sx * rect.Width / 2) + pt.X;
        pt2.Y = rect.Bottom;
        pt3.X = parseFloat(-sx * rect.Width / 2) + pt.X;
        pt3.Y = rect.Bottom;
        pt4.X = rect.Left;
        pt4.Y = pt.Y;
        pt5.X = parseFloat(-sx * rect.Width / 2) + pt.X;
        pt5.Y = rect.Top;
        pt6.X = parseFloat(sx * rect.Width / 2) + pt.X;
        pt6.Y = rect.Top;

        var points = "";
        points += pt1.X + "," + pt1.Y + " ";
        points += pt2.X + "," + pt2.Y + " ";
        points += pt3.X + "," + pt3.Y + " ";
        points += pt4.X + "," + pt4.Y + " ";
        points += pt5.X + "," + pt5.Y + " ";
        points += pt6.X + "," + pt6.Y;

        $("#" + this._id).attr("points", points);
    }

    HexagonShapeView.prototype.setX = function (value) {
        this._x = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    HexagonShapeView.prototype.setY = function (value) {
        this._y = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    HexagonShapeView.prototype.setWidth = function (value) {
        this._width = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    HexagonShapeView.prototype.setHeight = function (value) {
        this._height = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    page.createHexagonShape = function (arg) {
        var view = new HexagonShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
}());

/////////////////////////////////////////////////////////////////////////////////////
// OctagonShapeView
/////////////////////////////////////////////////////////////////////////////////////
(function () {
    function OctagonShapeView(arg) {
        
        ShapeElement.call(this, arg);
    }
    OctagonShapeView.prototype = Object.create(ShapeElement.prototype);
    OctagonShapeView.prototype.constructor = OctagonShapeView;

    OctagonShapeView.prototype.setPoints = function () {
        var pt = {};
        var pt1 = {};
        var pt2 = {};
        var pt3 = {};
        var pt4 = {};
        var pt5 = {};
        var pt6 = {};
        var pt7 = {};
        var pt8 = {};
        var rect = this.getRect();
        var sx = 0.414213562373095;
        var sy = 0.414213562373095;

        pt.X = (rect.Left + rect.Right) / 2;
        pt.Y = (rect.Top + rect.Bottom) / 2;

        pt1.X = rect.Right;
        pt1.Y = parseFloat(sy * rect.Height / 2) + pt.Y;
        pt2.X = parseFloat(sx * rect.Width / 2) + pt.X;
        pt2.Y = rect.Bottom;
        pt3.X = parseFloat(-sx * rect.Width / 2) + pt.X;
        pt3.Y = rect.Bottom;
        pt4.X = rect.Left;
        pt4.Y = parseFloat(sy * rect.Height / 2) + pt.Y;
        pt5.X = rect.Left;
        pt5.Y = parseFloat(-sy * rect.Height / 2) + pt.Y;
        pt6.X = parseFloat(-sx * rect.Width / 2) + pt.X;
        pt6.Y = rect.Top;
        pt7.X = parseFloat(sx * rect.Width / 2) + pt.X;
        pt7.Y = rect.Top;
        pt8.X = rect.Right;
        pt8.Y = parseFloat(-sy * rect.Height / 2) + pt.Y;

        var points = "";
        points += pt1.X + "," + pt1.Y + " ";
        points += pt2.X + "," + pt2.Y + " ";
        points += pt3.X + "," + pt3.Y + " ";
        points += pt4.X + "," + pt4.Y + " ";
        points += pt5.X + "," + pt5.Y + " ";
        points += pt6.X + "," + pt6.Y + " ";
        points += pt7.X + "," + pt7.Y + " ";
        points += pt8.X + "," + pt8.Y;

        $("#" + this._id).attr("points", points);
    }
    
    OctagonShapeView.prototype.setX = function (value) {
        this._x = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }
    
    OctagonShapeView.prototype.setY = function (value) {
        this._y = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }
    
    OctagonShapeView.prototype.setWidth = function (value) {
        this._width = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }
    
    OctagonShapeView.prototype.setHeight = function (value) {
        this._height = value;
        this.setPoints();
        this.setAngle(this.getAngle());
    }

    page.createOctagonShape = function (arg) {
        var view = new OctagonShapeView(arg);
        page.protoViews[arg.id] = view;
        view.setAngle(arg.angle);
        return view;
    }
})();