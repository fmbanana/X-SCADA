
(function (global) {

	////////////////////////////////////////////////////////////
	// 색상 가져오기
	////////////////////////////////////////////////////////////
	function getColor(color0, color1, pos) {
		// RGB값 분리하여 계산
		var r0 = parseInt(color0.substring(1, 3), 16);
		var g0 = parseInt(color0.substring(3, 5), 16);
		var b0 = parseInt(color0.substring(5, 7), 16);
		var r1 = parseInt(color1.substring(1, 3), 16);
		var g1 = parseInt(color1.substring(3, 5), 16);
		var b1 = parseInt(color1.substring(5, 7), 16);

		var r = Math.floor(r0 + (r1 - r0) * pos).toString(16);
		var g = Math.floor(g0 + (g1 - g0) * pos).toString(16);
		var b = Math.floor(b0 + (b1 - b0) * pos).toString(16);
		return "#" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b);
	}

	////////////////////////////////////////////////////////////
	// Animation 상태 가져오기
	////////////////////////////////////////////////////////////
	function getAnimationState(animation) {
		var state = animation['__xisom'];
		if (state == null) {
			state = {
				enabled: false
				, start: null // 시작 시간
			};
			animation['__xisom'] = state;
		}
		return state;
	}

	////////////////////////////////////////////////////////////
	// 객체 상태(이동, 크기, 각도, ...) 가져오기
	//  - 스토리(Story)와 동일
	////////////////////////////////////////////////////////////
	function getViewState(view) {
		var state = view['__xisom'];
		if (state == null) {
			state = {
				x: view.x
				, y: view.y
				, width: view.width
				, height: view.height
				, angle: view.angle
				, fillStyle: view.fillStyle
				, strokeStyle: view.strokeStyle
				, opacity: view.opacity
				, fillOpacity: view.fillOpacity
				, strokeOpacity: view.strokeOpacity
				, visible: view.visible
				// translation, resize
				, translations: null
				, resizes: null
				, handleRegion: null
				// rotation
				, rotations: null
				, hasRotationSpeed: false
				, handleRotation: null
				// color
				, fillColors: null
				, handleFillColor: null
				, strokeColors: null
				, handleStrokeColor: null
				// opacity
				, opacities: null
				, handleOpacity: null
				, fillOpacities: null
				, handleFillOpacity: null
				, strokeOpacities: null
				, handleStrokeOpacity: null
				// visible
				, visibles: null
				, handleVisible: null
				// blink
				, blinks: null
				, handleBlink: null
				, blinkable: view.visible
				// story
				, storyTimerId: 0
				, storyTimerFunc: null
				// animations
				, animations: null
				, animationTimerId: 0
				, animationTimerFunc: null
			};
			view['__xisom'] = state;
		}
		return state;
	}

	////////////////////////////////////////////////////////////
	// Animation 목록
	////////////////////////////////////////////////////////////
	function getAnimations(view, force) {
		var state = getViewState(view);
		if (state.animations == null && force == true) {
			state.animations = new Array();
		}
		return state.animations;
	}

	////////////////////////////////////////////////////////////
	// Animation 추가
	////////////////////////////////////////////////////////////
	function addAnimation(view, animation) {
		var animations = getAnimations(view, true);
		var _animation = getAnimationState(animation);

		var i = animations.length - 1;
		for (; i >= 0; i -= 1) {
			if (animations[i] == _animation) {
				break;
			}
		}
		if (i >= 0) return _animation;

		animations.push(_animation);
		return _animation;
	}

	////////////////////////////////////////////////////////////
	// Translation(이동 효과) 목록
	////////////////////////////////////////////////////////////
	function getTranslations(view, force) {
		var state = getViewState(view);
		if (state.translations == null && force == true) {
			state.translations = new Array();
		}
		return state.translations;
	}

	////////////////////////////////////////////////////////////
	// Translation(이동 효과) 추가
	////////////////////////////////////////////////////////////
	function addTranslation(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getX: function () {
				var effect = this.effect;
				if (effect.x == 0) return 0;
				return effect.x * this.getPosition();
			}
			, getY: function () {
				var effect = this.effect;
				if (effect.y == 0) return 0;
				return effect.y * this.getPosition();
			}
		};

		var effects = getTranslations(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// Resize(크기 변화) 목록
	////////////////////////////////////////////////////////////
	function getResizes(view, force) {
		var state = getViewState(view);
		if (state.resizes == null && force == true) {
			state.resizes = new Array();
		}
		return state.resizes;
	}

	////////////////////////////////////////////////////////////
	// Resize(크기 변화) 추가
	////////////////////////////////////////////////////////////
	function addResize(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getWidth: function () {
				var effect = this.effect;
				if (effect.width == 0) return 0;
				return effect.width * this.getPosition();
			}
			, getHeight: function () {
				var effect = this.effect;
				if (effect.height == 0) return 0;
				return effect.height * this.getPosition();
			}
		};

		var effects = getResizes(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// 영역(이동, 크기) 변화 설정
	////////////////////////////////////////////////////////////
	function setRegion(view) {
		var x = 0, y = 0;
		var w = 0, h = 0;

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
		if (width < 0) { w = state.width + width; } // 좌우반전
		if (height < 0) { h = state.height + height; } // 상하반전

		//view.setHeight(height, effect.type);
		view.setX(state.x + x - (w / 2));
		view.setY(state.y + y - (h / 2));
		view.setWidth(width);
		view.setHeight(height, resize);
	}

	////////////////////////////////////////////////////////////
	// Rotation(이동 효과) 목록
	////////////////////////////////////////////////////////////
	function getRotations(view, force) {
		var state = getViewState(view);
		if (state.rotations == null && force == true) {
			state.rotations = new Array();
		}
		return state.rotations;
	}

	////////////////////////////////////////////////////////////
	// Rotation(이동 효과) 추가
	////////////////////////////////////////////////////////////
	function addRotation(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getAngle: function () {
				var effect = this.effect;
				if (effect.angle == 0) return 0;
				return effect.angle * this.getPosition();
			}
		};

		var effects = getRotations(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// Rotation(회전 효과) 설정
	////////////////////////////////////////////////////////////
	function setRotation(view) {
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

	////////////////////////////////////////////////////////////
	// FillColor(면색상 변화) 목록
	////////////////////////////////////////////////////////////
	function getFillColors(view, force) {
		var state = getViewState(view);
		if (state.fillColors == null && force == true) {
			state.fillColors = new Array();
		}
		return state.fillColors;
	}

	////////////////////////////////////////////////////////////
	// FillColor(면색상 변화) 추가
	////////////////////////////////////////////////////////////
	function addFillColor(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getColor: function (current) {
				var pos = this.getPosition();
				if (pos <= 0) return current;
				var effect = this.effect;
				if (pos >= 1) return effect.style;
				return getColor(current, effect.style, pos);
			}
		};

		var effects = getFillColors(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// FillColor(면색상 변화) 설정
	////////////////////////////////////////////////////////////
	function setFillColor(view) {
		var state = getViewState(view);
		var style = state.fillStyle;

		var effects = getFillColors(view, false);
		if (effects != null) {
			for (var i = 0; i < effects.length; i += 1) {
				var effect = effects[i];
				style = effect.getColor(style);
			}
		}
		view.setFillStyle(style);
	}

	////////////////////////////////////////////////////////////
	// StrokeColor(선색상 변화) 목록
	////////////////////////////////////////////////////////////
	function getStrokeColors(view, force) {
		var state = getViewState(view);
		if (state.strokeColors == null && force == true) {
			state.strokeColors = new Array();
		}
		return state.strokeColors;
	}

	////////////////////////////////////////////////////////////
	// StrokeColor(선색상 변화) 추가
	////////////////////////////////////////////////////////////
	function addStrokeColor(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getColor: function (current) {
				var pos = this.getPosition();
				if (pos <= 0) return current;
				var effect = this.effect;
				if (pos >= 1) return effect.style;
				return getColor(current, effect.style, pos);
			}
		};

		var effects = getStrokeColors(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// StrokeColor(선색상 변화) 설정
	////////////////////////////////////////////////////////////
	function setStrokeColor(view) {
		var state = getViewState(view);
		var style = state.strokeStyle;

		var effects = getStrokeColors(view, false);
		if (effects != null) {
			for (var i = 0; i < effects.length; i += 1) {
				var effect = effects[i];
				style = effect.getColor(style);
			}
		}

		view.setStrokeStyle(style);
	}

	////////////////////////////////////////////////////////////
	// Opacity(투명도 변화) 목록
	////////////////////////////////////////////////////////////
	function getOpacities(view, force) {
		var state = getViewState(view);
		if (state.opacities == null && force == true) {
			state.opacities = new Array();
		}
		return state.opacities;
	}

	////////////////////////////////////////////////////////////
	// Opacity(투명도 변화) 추가
	////////////////////////////////////////////////////////////
	function addOpacity(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getOpacity: function () {
				var effect = this.effect;
				if (effect.opacity == 0) return 0;
				return effect.opacity * this.getPosition();
			}
		};

		var effects = getOpacities(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// Opacity(투명도 변화) 설정
	////////////////////////////////////////////////////////////
	function setOpacity(view) {
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

	////////////////////////////////////////////////////////////
	// FillOpacity(면투명도 변화) 목록
	////////////////////////////////////////////////////////////
	function getFillOpacities(view, force) {
		var state = getViewState(view);
		if (state.fillOpacities == null && force == true) {
			state.fillOpacities = new Array();
		}
		return state.fillOpacities;
	}

	////////////////////////////////////////////////////////////
	// FillOpacity(면투명도 변화) 추가
	////////////////////////////////////////////////////////////
	function addFillOpacity(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getOpacity: function () {
				var effect = this.effect;
				if (effect.opacity == 0) return 0;
				return effect.opacity * this.getPosition();
			}
		};

		var effects = getFillOpacities(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// FillOpacity(면투명도 변화) 설정
	////////////////////////////////////////////////////////////
	function setFillOpacity(view) {
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

	////////////////////////////////////////////////////////////
	// StrokeOpacity(선투명도 변화) 목록
	////////////////////////////////////////////////////////////
	function getStrokeOpacities(view, force) {
		var state = getViewState(view);
		if (state.strokeOpacities == null && force == true) {
			state.strokeOpacities = new Array();
		}
		return state.strokeOpacities;
	}

	////////////////////////////////////////////////////////////
	// StrokeOpacity(선투명도 변화) 추가
	////////////////////////////////////////////////////////////
	function addStrokeOpacity(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;
				var effect = this.effect;
				if (effect.speed <= 0) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time <= this.minPosition) return 0;
				if (time >= this.maxPosition) {
					if (effect.autoReverse == true) return 0;
					if (effect.autoRewind == true) return 0;
					return 1;
				}

				var pos = (time - this.minPosition) / effect.speed;
				pos = pos - parseInt(pos); // 소수점만 ...
				if (effect.autoReverse == false) return pos;
				if (pos > 0.5) return 1.0 - (pos - 0.5) * 2.0;
				return pos * 2.0;
			}
			, getOpacity: function () {
				var effect = this.effect;
				if (effect.opacity == 0) return 0;
				return effect.opacity * this.getPosition();
			}
		};

		var effects = getStrokeOpacities(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// StrokeOpacity(선투명도 변화) 설정
	////////////////////////////////////////////////////////////
	function setStrokeOpacity(view) {
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

	////////////////////////////////////////////////////////////
	// Visible(출몰 효과) 목록
	////////////////////////////////////////////////////////////
	function getVisibles(view, force) {
		var state = getViewState(view);
		if (state.visibles == null && force == true) {
			state.visibles = new Array();
		}
		return state.visibles;
	}

	////////////////////////////////////////////////////////////
	// Visible(출몰 효과) 추가
	////////////////////////////////////////////////////////////
	function addVisible(animation, effect, basePosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return 0;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time < this.minPosition) return 0;
				return 1;
			}
			, getVisible: function (current) {
				var pos = this.getPosition();
				if (pos <= 0) return current;
				var effect = this.effect;
				//console.log("visible : " + effect.visible);
				return effect.visible;
			}
		};

		var effects = getVisibles(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// Visible(출몰 효과) 설정
	////////////////////////////////////////////////////////////
	function setVisible(view) {
		var state = getViewState(view);
		var visible = state.visible;

		var effects = getVisibles(view, false);
		if (effects != null) {
			for (var i = 0; i < effects.length; i += 1) {
				var effect = effects[i];
				visible = effect.getVisible(visible);
			}
		}

		var visible = JSON.parse(visible);
		view.setVisible(visible);
		state.blinkable = visible; // 화면에 보일때만 점멸효과 가능
	}

	////////////////////////////////////////////////////////////
	// Blink(점멸 효과) 목록
	////////////////////////////////////////////////////////////
	function getBlinks(view, force) {
		var state = getViewState(view);
		if (state.blinks == null && force == true) {
			state.blinks = new Array();
		}
		return state.blinks;
	}

	////////////////////////////////////////////////////////////
	// Blink(점멸 효과) 추가
	////////////////////////////////////////////////////////////
	function addBlink(animation, effect, basePosition, maxPosition) {
		var view = effect.view;
		var _animation = addAnimation(view, animation);

		var e = {
			animation: _animation
			, effect: effect
			, minPosition: basePosition + effect.delay
			, maxPosition: maxPosition
			, getPosition: function () {
				var animation = this.animation
				if (animation.enabled == false) return -1;
				var effect = this.effect;
				if (effect.speed <= 0) return -1;

				var time = ((new Date()).getTime() - animation.start) / 1000.0;
				if (time < this.minPosition) return -1;
				if (time == this.minPosition) return 0;
				if (time >= this.maxPosition) return 1;

				var pos = (time - this.minPosition) / effect.speed;
				return pos - parseInt(pos);
			}
			, getVisible: function (current) {
				var pos = this.getPosition();
				if (pos < 0) return current;
				return pos > 0.5;
			}
		};

		var effects = getBlinks(view, true);
		effects.push(e);
	}

	////////////////////////////////////////////////////////////
	// Blink(점멸 효과) 설정
	////////////////////////////////////////////////////////////
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

		var visible = JSON.parse(visible);
		view.setVisible(visible);
	}

	////////////////////////////////////////////////////////////
	// 객체 업데이트
	////////////////////////////////////////////////////////////
	function updateView(view) {
		setVisible(view);
		setBlink(view);
		setRegion(view)
		setRotation(view)
		setFillColor(view)
		setStrokeColor(view)
		setOpacity(view)
		setFillOpacity(view)
		setStrokeOpacity(view)
	}

	////////////////////////////////////////////////////////////
	// 객체의 Animation 업데이트
	////////////////////////////////////////////////////////////
	function updateAnimation(view) {
		var state = getViewState(view);
		var animations = state.animations;
		if (animations == null) return;

		var i = animations.length - 1;
		for (; i >= 0; i -= 1) {
			if (animations[i].enabled == true) {
				break;
			}
		}

		if (i >= 0 && state.animationTimerId <= 0) {
			if (state.animationTimerFunc == null) {
				state.animationTimerFunc = function () {
					updateView(view);
				};
			}
			state.animationTimerId = setInterval(state.animationTimerFunc, 30);

			// 처음 상태
			updateView(view);

		} else if (i < 0 && state.animationTimerId > 0) {
			clearInterval(state.animationTimerId);
			state.animationTimerId = 0;

			// 초기상태
			updateView(view);
		}
	}



	////////////////////////////////////////////////////////////
	// Animation 등록
	////////////////////////////////////////////////////////////
	function registerAnimation(animation, effects) {
		getAnimationState(animation);

		var listener = function (e) {
			handleAnimation(e, animation, effects);
		};

		animation.tag.addEventListener("change", listener);
	}

	////////////////////////////////////////////////////////////
	// Animation 처리
	////////////////////////////////////////////////////////////
	function handleAnimation(event, animation, effects) {
		var state = getAnimationState(animation);
		var match = page.conditionMatched(animation.tag, animation.comparison, animation.value);
		// 상태 변화???
		if (state.enabled == match) return;
		state.enabled = match;

		if (match == true) {
			state.start = (new Date()).getTime();
		} else {
			state.start = null;
		}

		var effectCount = effects.length;
		for (var j = 0; j < effectCount; j++) {
			var effect = effects[j];

			if (effect.type == "Translation" && effect.view && (effect.x != 0 || effect.y != 0)) {
				updateAnimation(effect.view);
			} else if (effect.type == "Resize" && effect.view && (effect.width != 0 || effect.height != 0)) {
				updateAnimation(effect.view);
			} else if (effect.type == "Rotation" && effect.view && effect.angle != 0) {
				updateAnimation(effect.view);
			} else if (effect.type == "FillColor" && effect.view) {
				updateAnimation(effect.view);
			} else if (effect.type == "StrokeColor" && effect.view) {
				updateAnimation(effect.view);
			} else if (effect.type == "Opacity" && effect.view && effect.opacity != 0) {
				updateAnimation(effect.view);
			} else if (effect.type == "FillOpacity" && effect.view && effect.opacity != 0) {
				updateAnimation(effect.view);
			} else if (effect.type == "StrokeOpacity" && effect.view && effect.opacity != 0) {
				updateAnimation(effect.view);
			} else if (effect.type == "Visible" && effect.view) {
				updateAnimation(effect.view);
			} else if (effect.type == "Blink" && effect.view && effect.speed > 0) {
				updateAnimation(effect.view);
			}
		}
	}

	page.createAnimations = function (arg) {
		var animation = arg.animation;
		var effects = arg.effects;
		//console.log(animation);

		if (animation.tag) {
			animation.tag = scada.getTagByName(animation.tag);
		}

		var effectCount = effects.length;
		if (effectCount <= 0) return;

		var acitveCount = 0;
		var basePosition = 0;
		var minPosition = basePosition;
		var maxPosition = basePosition;

		for (var j = 0; j < effectCount; j++) {
			var effect = effects[j];
			effect.view = page.protoViews[effect.id];
			if (effect.view == null) continue;

			// 위치값 계산
			if (j > 0 && effect.mode != "With Previous") {
				if (maxPosition == Number.MAX_VALUE) {
					// 이후의 효과들을 실행할 수 없다.
					break;
				}
				basePosition = maxPosition;
			}

			var maxValue = basePosition + effect.delay + effect.speed * effect.repeat;
			if (effect.repeat <= 0) maxValue = Number.MAX_VALUE;
			if (maxPosition != Number.MAX_VALUE) maxPosition = Math.max(maxPosition, maxValue);

			if (effect.type == "Translation" && effect.view && (effect.x != 0 || effect.y != 0)) {
				acitveCount++;
				addTranslation(animation, effect, basePosition, maxValue);

			} else if (effect.type == "Resize" && effect.view && (effect.width != 0 || effect.height != 0)) {
				acitveCount++;
				addResize(animation, effect, basePosition, maxValue);

			} else if (effect.type == "Rotation" && effect.view && effect.angle != 0) {
				acitveCount++;
				addRotation(animation, effect, basePosition, maxValue);

			} else if (effect.type == "FillColor" && effect.view) {
				acitveCount++;
				addFillColor(animation, effect, basePosition, maxValue);

			} else if (effect.type == "StrokeColor" && effect.view) {
				acitveCount++;
				addStrokeColor(animation, effect, basePosition, maxValue);

			} else if (effect.type == "Opacity" && effect.view && effect.opacity != 0) {
				acitveCount++;
				addOpacity(animation, effect, basePosition, maxValue);

			} else if (effect.type == "FillOpacity" && effect.view && effect.opacity != 0) {
				acitveCount++;
				addFillOpacity(animation, effect, basePosition, maxValue);

			} else if (effect.type == "StrokeOpacity" && effect.view && effect.opacity != 0) {
				acitveCount++;
				addStrokeOpacity(animation, effect, basePosition, maxValue);

			} else if (effect.type == "Visible" && effect.view) {
				acitveCount++;
				addVisible(animation, effect, basePosition, maxValue);
			} else if (effect.type == "Blink" && effect.view && effect.speed > 0) {
				acitveCount++;
				addBlink(animation, effect, basePosition, maxPosition);
			}
		}

		if (acitveCount > 0) {
			registerAnimation(animation, effects);
		}

	}
}(this));

