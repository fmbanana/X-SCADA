(function (global) {

    //객체 상태(이동, 크기, 각도, ...) 
    //- 애니메이션(Animation)과 동일
    function getViewState(view) {
        var state = view['__xisom'];

        if (state == null) {
            state = {
                x: view.x,
                y: view.y,
                width: view.width,
                height: view.height,
                angle: view.angle,
                fillStyle: typeof (view.fillStyle) != "undefined" ? view.fillStyle : typeof(view.backgroundColor) != "undefined" ? view.backgroundColor : view.background,
                strokeStyle: typeof (view.strokeStyle) != "undefined" ? view.strokeStyle : typeof(view.foregroundColor) != "undefined" ? view.foregroundColor : view.foreground,
                opacity: view.opacity,
                fillOpacity: view.fillOpacity,
                strokeOpacity: view.strokeOpacity,
                visible: view.visible,
                //translation, resize
                translations: null,
                resizes: null,
                handleRegion: null,
                //rotation
                rotations: null,
                hasRotationSpeed: false,
                handleRotation: null,
                //color
                fillColors: null,
                handleFillColor: null,
                strokeColors: null,
                handleStrokeColor: null,
                //opacity
                opacities: null,
                handleOpacity: null,
                fillOpacities: null,
                handleFillOpacity: null,
                strokeOpacities: null,
                handleStrokeOpacity: null,
                //visible
                visibles: null,
                handleVisible: null,
                //blink
                blinks: null,
                handleBlink: null,
                blinkable: view.visible,
                //story
                storyTimerId: 0,
                storyTimerFunc: null,
                //animations
                animations: null,
                animationTimerId: 0,
                animationTimerFunc: null
            };
            view['__xisom'] = state;
        }
        return state;
    }


    //Translation(이동 효과) 목록
    function getTranslations(view, force) {
        var state = getViewState(view);
        if (state.translations == null && force == true) {
            state.translations = new Array();
        }
        return state.translations;
    }

    //Translation(이동 효과) 추가
    function addTranslation(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getX: function () {
                var effect = this.effect;
                if (effect.x == 0) return 0;
                return effect.x * this.getPosition();
            },
            getY: function () {
                var effect = this.effect;
                if (effect.y == 0) return 0;
                return effect.y * this.getPosition();
            }
        };

        var effects = getTranslations(view, true);
        effects.push(e);
    }

    //Resize(크기 변화) 목록
    function getResizes(view, force) {
        var state = getViewState(view);
        if (state.resizes == null && force == true) {
            state.resizes = new Array();
        }
        return state.resizes;
    }

    //Resize(크기 변화) 추가
    function addResize(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getWidth: function () {
                var effect = this.effect;
                if (effect.width == 0) return 0;
                return effect.width * this.getPosition();
            },
            getHeight: function () {
                var effect = this.effect;
                if (effect.height == 0) return 0;
                return effect.height * this.getPosition();
            }
        };

        var effects = getResizes(view, true);
        effects.push(e);
    }

    //영역(이동, 크기) 변화 등록
    function registerRegion(view, effect) {
        var state = getViewState(view);
        if (state.handleRegion == null) {
            state.handleRegion = function (e) {
                handleRegion(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleRegion);
    }

    //영역(이동, 크기) 변화 처리
    function handleRegion(event, view) {
        var x = 0,
            y = 0;
        var w = 0,
            h = 0;

        var effects = getTranslations(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                x += effect.getX();
                y += effect.getY();
            }
        }

        var resize = false;
        effects = getResizes(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                w += effect.getWidth();
                h += effect.getHeight();
            }
            resize = true;
        }

        var state = getViewState(view);
        var width = state.width + w;
        var height = state.height + h;
        if (width < 0) {
            w = state.width + width;
        } //좌우반전
        if (height < 0) {
            h = state.height + height;
        } //상하반전

        view.setX(state.x + x - (w / 2));
        view.setY(state.y + y - (h / 2));
        view.setWidth(width);
        view.setHeight(height, resize);
    }

    //Rotation(이동 효과) 목록
    function getRotations(view, force) {
        var state = getViewState(view);
        if (state.rotations == null && force == true) {
            state.rotations = new Array();
        }
        return state.rotations;
    }

    //Rotation(이동 효과) 추가
    function addRotation(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getAngle: function () {
                var effect = this.effect;
                if (effect.angle == 0) return 0;
                return effect.angle * this.getPosition();
            }
        };

        var effects = getRotations(view, true);
        effects.push(e);
    }

    //Rotation(회전 효과) 등록
    function registerRotation(view, effect) {
        if (typeof (view.angle) == "undefined") return;

        addRotation(view, effect);

        var state = getViewState(view);
        if (state.handleRotation == null) {
            state.handleRotation = function (e) {
                handleRotation(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleRotation);

        // init rotation state at start
        handleRotation(null, view);
    }

    //RotationSpeed(회전 속도) 추가
    function addRotationSpeed(view, effect) {

        var e = {
            effect: effect,
            tagValue: effect.tag.value,
            baseTime: (new Date()).getTime() //기준 시간
                ,
            accumAngle: 0.0 //누적 각도
                ,
            getAngle: function () {
                var effect = this.effect;
                if (effect.scaleFactor == 0) return 0.0;

                var now = (new Date()).getTime();
                var tagValue = effect.tag.value;
                var time = (now - this.baseTime) / 1000.0;
                var angle = ((tagValue * effect.scaleFactor + effect.scaleOffset) * time) % 360.0;

                angle = this.accumAngle + angle;
                if (tagValue != this.tagValue) {
                    //태그값을 변경한 시점부터 기준시간을 변경한다.
                    this.tagValue = tagValue;
                    this.baseTime = now;
                    this.accumAngle = angle % 360.0;
                }
                return angle;
            }
        };

        var effects = getRotations(view, true);
        effects.push(e);
    }

    //RotationSpeed(회전 속도) 등록
    function registerRotationSpeed(view, effect) {
        if (typeof (view.angle) == "undefined") return;

        addRotationSpeed(view, effect);

        var state = getViewState(view);
        state.hasRotationSpeed = true;

        registerTimer(view, true);
    }

    //Rotation(회전 효과) 처리
    function handleRotation(event, view) {
        var angle = 0;

        var effects = getRotations(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                angle += effect.getAngle();
            }
        }

        var state = getViewState(view);
        view.setAngle(state.angle + angle);
    }

    //FillColor(면색상 변화) 목록
    function getFillColors(view, force) {
        var state = getViewState(view);
        if (state.fillColors == null && force == true) {
            state.fillColors = new Array();
        }
        return state.fillColors;
    }

    //FillColor(면색상 변화) 추가
    function addFillColor(view, effect) {
        var e = {
            effect: effect,
            getPosition: function () {
                var effect = this.effect;
                var match = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                return match == true ? 1 : 0;
            },
            getColor: function (current) {
                var pos = this.getPosition();
                if (pos <= 0) return current;
                var effect = this.effect;
                return effect.style;
            }
        };

        var effects = getFillColors(view, true);
        effects.push(e);
    }

    //FillColor(면색상 변화) 등록
    function registerFillColor(view, effect) {
        if (typeof (view.views) != "undefined" && view.views.length > 0) {
            for (var i = 0; i < view.views.length; i++) {
                var childStory = view.views[i];
                registerFillColor(page.protoViews[childStory.id], effect);
            }
        }

        if (typeof (view.fillStyle) == "undefined" && typeof (view.backgroundColor) == "undefined" && typeof (view.background) == "undefined") return;

        addFillColor(view, effect);

        var state = getViewState(view);
        if (state.handleFillColor == null) {
            state.handleFillColor = function (e) {
                handleFillColor(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleFillColor);

        // init fill color at start
        handleFillColor(null, view);
    }

    //FillColor(면색상 변화) 처리
    function handleFillColor(event, view) {
        var state = getViewState(view);
        var style = state.fillStyle;

        var effects = getFillColors(view, false);
        if (effects != null) {
            for (var i = 0; i < effects.length; i += 1) {
                var effect = effects[i];
                style = effect.getColor(style);
            }
        }

        if (typeof (view.fillStyle) != "undefined") {
            view.setFillStyle(style);
        } else if (typeof (view.backgroundColor) != "undefined" || typeof (view.background) != "undefined") {
            view.setBackgroundColor(style);
        }
    }

    //StrokeColor(선색상 변화) 목록
    function getStrokeColors(view, force) {
        var state = getViewState(view);
        if (state.strokeColors == null && force == true) {
            state.strokeColors = new Array();
        }
        return state.strokeColors;
    }

    //StrokeColor(선색상 변화) 추가
    function addStrokeColor(view, effect) {
        var e = {
            effect: effect,
            getPosition: function () {
                var effect = this.effect;
                var match = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                return match == true ? 1 : 0;
            },
            getColor: function (current) {
                var pos = this.getPosition();
                if (pos <= 0) return current;
                var effect = this.effect;
                return effect.style;
            }
        };

        var effects = getStrokeColors(view, true);
        effects.push(e);
    }

    //StrokeColor(선색상 변화) 등록
    function registerStrokeColor(view, effect) {
        if (typeof (view.views) != "undefined" && view.views.length > 0) {
            for (var i = 0; i < view.views.length; i++) {
                var childStory = view.views[i];
                registerStrokeColor(page.protoViews[childStory.id], effect);
            }
        }

        if (typeof (view.strokeStyle) == "undefined" && typeof (view.foregroundColor) == "undefined" && typeof (view.foreground) == "undefined") return;


        addStrokeColor(view, effect);

        var state = getViewState(view);
        if (state.handleStrokeColor == null) {
            state.handleStrokeColor = function (e) {
                handleStrokeColor(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleStrokeColor);

        // init stroke color at start
        handleStrokeColor(null, view);
    }

    //StrokeColor(선색상 변화) 처리
    function handleStrokeColor(event, view) {
        var state = getViewState(view);
        var style = state.strokeStyle;

        var effects = getStrokeColors(view, false);
        if (effects != null) {
            for (var i = 0; i < effects.length; i += 1) {
                var effect = effects[i];
                style = effect.getColor(style);
            }
        }

        if (typeof (view.strokeStyle) != "undefined") {
            view.setStrokeStyle(style);
        } else if (typeof (view.foregroundColor) != "undefined" || typeof (view.foreground) != "undefined") {
            view.setForegroundColor(style);
        }
    }

    //Opacity(투명도 변화) 목록
    function getOpacities(view, force) {
        var state = getViewState(view);
        if (state.opacities == null && force == true) {
            state.opacities = new Array();
        }
        return state.opacities;
    }

    //Opacity(투명도 변화) 추가
    function addOpacity(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getOpacity: function () {
                var effect = this.effect;
                if (effect.opacity == 0) return 0;
                return effect.opacity * this.getPosition();
            }
        };

        var effects = getOpacities(view, true);
        effects.push(e);
    }

    //Opacity(투명도 변화) 등록
    function registerOpacity(view, effect) {
        if (typeof (view.views) != "undefined" && view.views.length > 0) {
            for (var i = 0; i < view.views.length; i++) {
                var childStory = view.views[i];
                registerOpacity(page.protoViews[childStory.id], effect);
            }
        }

        if (typeof (view.opacity) == "undefined") return;

        addOpacity(view, effect);

        var state = getViewState(view);
        if (state.handleOpacity == null) {
            state.handleOpacity = function (e) {
                handleOpacity(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleOpacity);

        // init opacity at start
        handleOpacity(null, view);
    }

    //Opacity(투명도 변화) 처리
    function handleOpacity(event, view) {
        var opacity = 0;

        var effects = getOpacities(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                opacity += effect.getOpacity();
            }
        }

        var state = getViewState(view);
        view.setOpacity(state.opacity + opacity);
    }

    //FillOpacity(면투명도 변화) 목록
    function getFillOpacities(view, force) {
        var state = getViewState(view);
        if (state.fillOpacities == null && force == true) {
            state.fillOpacities = new Array();
        }
        return state.fillOpacities;
    }

    //FillOpacity(면투명도 변화) 추가
    function addFillOpacity(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getOpacity: function () {
                var effect = this.effect;
                if (effect.opacity == 0) return 0;
                return effect.opacity * this.getPosition();
            }
        };

        var effects = getFillOpacities(view, true);
        effects.push(e);
    }

    //FillOpacity(면투명도 변화) 등록
    function registerFillOpacity(view, effect) {
        if (typeof (view.views) != "undefined" && view.views.length > 0) {
            for (var i = 0; i < view.views.length; i++) {
                var childStory = view.views[i];
                registerFillOpacity(page.protoViews[childStory.id], effect);
            }
        }

        if (typeof (view.fillOpacity) == "undefined") return;

        addFillOpacity(view, effect);

        var state = getViewState(view);
        if (state.handleFillOpacity == null) {
            state.handleFillOpacity = function (e) {
                handleFillOpacity(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleFillOpacity);

        // init fill opacity at start
        handleFillOpacity(null, view);
    }

    //FillOpacity(면투명도 변화) 처리
    function handleFillOpacity(event, view) {
        var opacity = 0;

        var effects = getFillOpacities(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                opacity += effect.getOpacity();
            }
        }

        var state = getViewState(view);
        view.setFillOpacity(state.fillOpacity + opacity);
    }

    //StrokeOpacity(선투명도 변화) 목록
    function getStrokeOpacities(view, force) {
        var state = getViewState(view);
        if (state.strokeOpacities == null && force == true) {
            state.strokeOpacities = new Array();
        }
        return state.strokeOpacities;
    }

    //StrokeOpacity(선투명도 변화) 추가
    function addStrokeOpacity(view, effect) {
        var e = {
            effect: effect,
            maxLength: effect.maxValue - effect.minValue,
            getPosition: function () {
                var effect = this.effect;
                var tag = effect.tag;
                var pos = Math.min(effect.maxValue, Math.max(effect.minValue, tag.value));
                return (pos - effect.minValue) / this.maxLength;
            },
            getOpacity: function () {
                var effect = this.effect;
                if (effect.opacity == 0) return 0;
                return effect.opacity * this.getPosition();
            }
        };

        var effects = getStrokeOpacities(view, true);
        effects.push(e);
    }

    //StrokeOpacity(선투명도 변화) 등록
    function registerStrokeOpacity(view, effect) {
        if (typeof (view.strokeOpacity) == "undefined") return;

        addStrokeOpacity(view, effect);

        var state = getViewState(view);
        if (state.handleStrokeOpacity == null) {
            state.handleStrokeOpacity = function (e) {
                handleStrokeOpacity(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleStrokeOpacity);

        // Init strokeOpacity state of object at start
        handleStrokeOpacity(null, view);
    }

    //StrokeOpacity(선투명도 변화) 처리
    function handleStrokeOpacity(event, view) {
        var opacity = 0;

        var effects = getStrokeOpacities(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                opacity += effect.getOpacity();
            }
        }

        var state = getViewState(view);
        view.setStrokeOpacity(state.strokeOpacity + opacity);
    }

    //Visible(출몰 효과) 목록
    function getVisibles(view, force) {
        var state = getViewState(view);
        if (state.visibles == null && force == true) {
            state.visibles = new Array();
        }
        return state.visibles;
    }

    //Visible(출몰 효과) 추가
    function addVisible(view, effect) {
        var e = {
            effect: effect,
            getPosition: function () {
                var effect = this.effect;

                if (effect.condition == true) {
                    var match = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                    if (!match) return -1;
                    return effect.visible == true ? 1 : 0;
                }
                var match = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                return match == true ? 1 : 0;
            },
            getVisible: function (current) {
                var pos = this.getPosition();
                if (pos < 0) return current;
                return pos != 0;
            }
        };

        var effects = getVisibles(view, true);
        effects.push(e);
    }

    //Visible(출몰 효과) 등록
    function registerVisible(view, effect) {
        addVisible(view, effect);

        var state = getViewState(view);
        if (state.handleVisible == null) {
            state.handleVisible = function (e) {
                handleVisible(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleVisible);
        
        // Init visible state of object at start time
        handleVisible(null, view);
    }

    //Visible(출몰 효과) 처리
    function handleVisible(event, view) {
        var state = getViewState(view);
        var visible = state.visible;

        var effects = getVisibles(view, false);
        if (effects != null) {
            for (var i = 0; i < effects.length; i += 1) {
                var effect = effects[i];
                visible = effect.getVisible(visible);
            }
        }

        view.setVisible(visible);
        state.blinkable = visible; //화면에 보일때만 점멸효과 가능
    }

    //Blink(점멸 효과) 목록
    function getBlinks(view, force) {
        var state = getViewState(view);
        if (state.blinks == null && force == true) {
            state.blinks = new Array();
        }
        return state.blinks;
    }

    //Blink(점멸 효과) 추가
    function addBlink(view, effect) {
        var e = {
            effect: effect,
            start: null //시작 시간 ...
                ,
            isEnabled: function () {
                var effect = this.effect;
                var enable = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                if (enable == true && this.start == null) {
                    this.start = (new Date()).getTime();
                } else if (enable == false && this.start != null) {
                    this.start = null;
                }
                return enable;
            },
            getPosition: function () {
                if (this.start == null) return -1;
                var effect = this.effect;
                var time = (new Date()).getTime() - this.start;
                return parseInt(time / (effect.speed * 1000)) % 2 == 1 ? 1 : 0;
            },
            getVisible: function (current) {
                var pos = this.getPosition();
                if (pos < 0) return current;
                return pos != 0;
            }
        };

        var effects = getBlinks(view, true);
        effects.push(e);
    }

    //Blink(점멸 효과) 등록
    function registerBlink(view, effect) {

        addBlink(view, effect);

        var state = getViewState(view);
        if (state.handleBlink == null) {
            state.handleBlink = function (e) {
                handleBlink(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleBlink);

        // Init blink state of object at start
        handleBlink(null, view);
    }

    //Blink(점멸 효과) 처리
    function handleBlink(event, view) {
        var enable = false;
        var effects = getBlinks(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                if (effect.isEnabled() == true) {
                    enable = true;
                    break;
                }
            }
        }

        var state = getViewState(view);
        if (state.hasRotationSpeed == false) {
            registerTimer(view, enable);
        }
        if (enable == false) {
            view.setVisible(state.blinkable);
        }
    }

    //Blink(점멸 효과) 설정
    function setBlink(view) {
        var state = getViewState(view);
        if (state.blinkable == false) return;
        var visible = view.visible;

        var effects = getBlinks(view, false);
        if (effects != null) {
            for (var i = 0; i < effects.length; i += 1) {
                var effect = effects[i];
                visible = effect.getVisible(visible);
            }
        }

        view.setVisible(visible);
    }

    //Timer 등록
    function registerTimer(view, enable) {
        var state = getViewState(view);
        if (enable == true && state.storyTimerId <= 0) {
            if (state.storyTimerFunc == null) {
                if (state.hasRotationSpeed == true) {
                    state.storyTimerFunc = function () {
                        handleRotation(null, view);
                        setBlink(view);
                    };
                } else {
                    state.storyTimerFunc = function () {
                        setBlink(view);
                    };
                }
            }
            state.storyTimerId = setInterval(state.storyTimerFunc, 30);

        } else if (enable == false && state.storyTimerId > 0) {
            clearInterval(state.storyTimerId);
            state.storyTimerId = 0;
        }
    }

    //색상 필터 목록
    function getColorFilters(view, force) {
        var state = getViewState(view);
        if (state.colorFilters == null && force == true) {
            state.colorFilters = new Array();
        }
        return state.colorFilters;
    }

    //색상 필터 효과 추가
    function addColorFilter(view, effect) {
        var e = {
            effect: effect,
            colorSetting: effect.filterString,
            originFileName: effect.originFileName,
            filtedFileName: effect.filtedFileName,
            isEnabled: function () {
                var effect = this.effect;
                var enable = page.conditionMatched(effect.tag, effect.comparison, effect.value);
                return enable;
            },
        };

        var effects = getColorFilters(view, true);
        effects.push(e);
    }

    //색상 필터 효과 등록
    function registerColorFilter(view, effect) {
        addColorFilter(view, effect);

        var state = getViewState(view);
        if (state.handleColorFilter == null) {
            state.handleColorFilter = function (e) {
                handleColorFilter(e, view);
            };
        }
        effect.tag.addEventListener("change", state.handleColorFilter);

        // Init blink state of object at start
        handleColorFilter(null, view);
    }

    //색상 필터 효과 처리
    function handleColorFilter(event, view) {
        var enable = false;
        var effects = getColorFilters(view, false);
        if (effects != null) {
            for (var i = effects.length - 1; i >= 0; i -= 1) {
                var effect = effects[i];
                var elem = document.getElementById(view.id);

                var originPath = "img/" + effect.originFileName;
                var filtedPath = "img/" + effect.filtedFileName;
                var path = elem.getAttribute("xlink:href");
                var newPath = "";

                if (effect.isEnabled() == true) {
                    newPath = filtedPath;
                } else {
                    if (path == filtedPath) {
                        newPath = originPath;
                    } else {
                        newPath = path;
                    }
                }

                elem.setAttribute("xlink:href", newPath);
            }
        }
    }

    page.createStories = function (story) {
        var view = page.protoViews[story.id];
        if (!view) return;
        var effectCount = story.effects.length;
        if (effectCount <= 0) return;

        for (var j = 0; j < effectCount; j++) {
            var effect = story.effects[j];
            if (effect.tag) {
                effect.tag = scada.getTagByName(effect.tag);
            }

            if (effect.type == "Translation" && effect.tag && effect.maxValue > effect.minValue && (effect.x != 0 || effect.y != 0)) {
                addTranslation(view, effect);
                registerRegion(view, effect);
            } else if (effect.type == "Resize" && effect.tag && effect.maxValue > effect.minValue && (effect.width != 0 || effect.height != 0)) {
                addResize(view, effect);
                registerRegion(view, effect);

                if ((effect.widthAnchor != 0 && effect.width != 0) || (effect.heightAnchor != 0 && effect.height != 0)) {
                    var eff = {
                        tag: effect.tag
                        , x: effect.width * effect.widthAnchor * 0.5
                        , y: effect.height * effect.heightAnchor * 0.5
                        , minValue: effect.minValue
                        , maxValue: effect.maxValue
                    };
                    addTranslation(view, eff);
                    registerRegion(view, eff);
                }

            } else if (effect.type == "Rotation" && effect.tag && effect.maxValue > effect.minValue && effect.angle != 0) {
                registerRotation(view, effect);
            } else if (effect.type == "RotationSpeed" && effect.tag) {
                registerRotationSpeed(view, effect);
            } else if (effect.type == "FillColor" && effect.tag) {
                registerFillColor(view, effect);
            } else if (effect.type == "StrokeColor" && effect.tag) {
                registerStrokeColor(view, effect);
            } else if (effect.type == "Opacity" && effect.tag && effect.maxValue > effect.minValue && effect.opacity != 0) {
                registerOpacity(view, effect);
            } else if (effect.type == "FillOpacity" && effect.tag && effect.maxValue > effect.minValue && effect.opacity != 0) {
                registerFillOpacity(view, effect);
            } else if (effect.type == "StrokeOpacity" && effect.tag && effect.maxValue > effect.minValue && effect.opacity != 0) {
                registerStrokeOpacity(view, effect);
            } else if (effect.type == "Visible" && effect.tag) {
                registerVisible(view, effect);
            } else if (effect.type == "Blink" && effect.tag && effect.speed > 0) {
                registerBlink(view, effect);
            } else if (effect.type == "ColorFilter" && effect.tag) {
                registerColorFilter(view, effect);
            }
        }
    }
}(this));