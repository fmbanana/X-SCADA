
(function (global) {

	////////////////////////////////////////////////////////////
	// 스크립트 함수 찾기
	////////////////////////////////////////////////////////////
	function getFunction(str) {
		if (typeof (str) != "string") return null;

		var n = str.indexOf("(");
		if (n < 0) {
			str = str.trim();
		} else {
			str = str.substring(0, n).trim();
		}
		if (str == "") return null;

		var func = global[str];
		if (typeof (func) == "function") return func;
		console.log("can't find '" + str + "' function.");
		return null;
	}

	////////////////////////////////////////////////////////////
	// Slide(슬라이드) 등록
	////////////////////////////////////////////////////////////
	function registerSlide(view, hPlan, vPlan) {
		if (hPlan != null && vPlan != null && hPlan.tag == vPlan.tag) {
			var state = {
				x: {
					forward: hPlan.direction == "Forward" // 방향
					, initPosition: view.x // 초기(기준) 뷰 위치
					, viewPosition: 0      // 뷰 위치
					, mousePosition: 0     // 마우스 위치
				}
				, y: {
					forward: vPlan.direction == "Forward" // 방향
					, initPosition: view.y // 초기(기준) 뷰 위치
					, viewPosition: 0      // 뷰 위치
					, mousePosition: 0     // 마우스 위치
				}
				, mousemove: null
				, mouseup: null
				, touchend: null
				, touchmove: null
				, active: false
			};

			view.addEventListener("touchstart", function (e) {
				handleDiagonalSlideByTouch(e, view, hPlan, vPlan, state);
			}, false);
			view.addEventListener("mousedown", function (e) {
				handleDiagonalSlide(e, view, hPlan, vPlan, state);
			}, false);
			hPlan.tag.addEventListener("change", function (e) {
				handleDiagonalSlideByTag(e, view, hPlan, vPlan, state);
			});
			view.addEventListener("mouseover", function (e) {
				page.onMouseOver(e, view);
			}, false);
			view.addEventListener("mouseout", function (e) {
				page.onMouseOut(e, view);
			}, false);

		} else if (hPlan != null && vPlan != null) {
			var state = {
				x: {
					forward: hPlan.direction == "Forward" // 방향
					, initPosition: view.x // 초기(기준) 뷰 위치
					, viewPosition: 0      // 뷰 위치
					, mousePosition: 0     // 마우스 위치
				}
				, y: {
					forward: vPlan.direction == "Forward" // 방향
					, initPosition: view.y // 초기(기준) 뷰 위치
					, viewPosition: 0      // 뷰 위치
					, mousePosition: 0     // 마우스 위치
				}
				, mousemove: null
				, mouseup: null
				, touchend: null
				, touchmove: null
				, active: false
			};


			view.addEventListener("touchstart", function (e) {
				handleSlideByTouch(e, view, hPlan, vPlan, state);
			}, false);
			view.addEventListener("mousedown", function (e) {
				handleSlide(e, view, hPlan, vPlan, state);
			}, false);
			hPlan.tag.addEventListener("change", function (e) {
				handleSlideByTagX(e, view, hPlan, state);
			});
			vPlan.tag.addEventListener("change", function (e) {
				handleSlideByTagY(e, view, vPlan, state);
			});
			view.addEventListener("mouseover", function (e) {
				page.onMouseOver(e, view);
			}, false);
			view.addEventListener("mouseout", function (e) {
				page.onMouseOut(e, view);
			}, false);

		} else if (hPlan != null) {
			var state = {
				forward: hPlan.direction == "Forward" // 방향
				, initPosition: view.x // 초기(기준) 뷰 위치
				, viewPosition: 0      // 뷰 위치
				, mousePosition: 0     // 마우스 위치
				, mousemove: null
				, mouseup: null
				, touchend: null
				, touchmove: null
				, active: false
			};

			view.addEventListener("touchstart", function (e) {
				handleHorizontalSlideByTouch(e, view, hPlan, state);
			}, false);
			view.addEventListener("mousedown", function (e) {
				handleHorizontalSlide(e, view, hPlan, state);
			}, false);
			hPlan.tag.addEventListener("change", function (e) {
				handleHorizontalSlideByTag(e, view, hPlan, state);
			});
			view.addEventListener("mouseover", function (e) {
				page.onMouseOver(e, view);
			}, false);
			view.addEventListener("mouseout", function (e) {
				page.onMouseOut(e, view);
			}, false);

		} else if (vPlan != null) {
			var state = {
				forward: vPlan.direction == "Forward" // 방향
				, initPosition: view.y // 초기(기준) 뷰 위치
				, viewPosition: 0      // 뷰 위치
				, mousePosition: 0     // 마우스 위치
				, mousemove: null
				, mouseup: null
				, touchend: null
				, touchmove: null
				, active: false
			};

			view.addEventListener("touchstart", function (e) {
				handleVerticalSlideByTouch(e, view, vPlan, state);
			}, false);
			view.addEventListener("mousedown", function (e) {
				handleVerticalSlide(e, view, vPlan, state);
			}, false);
			vPlan.tag.addEventListener("change", function (e) {
				handleVerticalSlideByTag(e, view, vPlan, state);
			});
			view.addEventListener("mouseover", function (e) {
				page.onMouseOver(e, view);
			}, false);
			view.addEventListener("mouseout", function (e) {
				page.onMouseOut(e, view);
			}, false);
		}
	}

	////////////////////////////////////////////////////////////
	// Slide(슬라이드) 처리
	////////////////////////////////////////////////////////////
	function handleSlide(event, view, planX, planY, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		//if (0 != event.button) return;
		
		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}

		state.x.viewPosition = view.x;
		state.x.mousePosition = event.clientX;
		state.y.viewPosition = view.y;
		state.y.mousePosition = event.clientY;

		if (state.mouseup == null) {
			state.mouseup = function (event) {
				if (0 != event.button) return;

				view.removeEventListener("mouseup", state.mouseup, false);
				view.removeEventListener("mousemove", state.mousemove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		if (state.mousemove == null) {
			state.mousemove = function (event) {
				var scale = page.pageManager.getScale();
				var posX = event.clientX / scale - state.x.mousePosition / scale + state.x.viewPosition - state.x.initPosition;
				posX = Math.max(0, state.x.forward == true ? posX : -posX);
				posX = Math.min(posX, planX.maxSlide);

				var posY = event.clientY / scale - state.y.mousePosition / scale + state.y.viewPosition - state.y.initPosition;
				posY = Math.max(0, state.y.forward == true ? posY : -posY);
				posY = Math.min(posY, planY.maxSlide);

				view.setX(state.x.initPosition + (state.x.forward == true ? posX : -posX));
				planX.tag.setValue((planX.maxValue - planX.minValue) * posX / planX.maxSlide + planX.minValue, view.securityKey);

				view.setY(state.y.initPosition + (state.y.forward == true ? posY : -posY));
				planY.tag.setValue((planY.maxValue - planY.minValue) * posY / planY.maxSlide + planY.minValue, view.securityKey);
			};
		}
		view.addEventListener("mousemove", state.mousemove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleSlideByTouch(event, view, planX, planY, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		//if (0 != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.x.viewPosition = view.x;
		state.x.mousePosition = event.changedTouches[0].clientX;
		state.y.viewPosition = view.y;
		state.y.mousePosition = event.changedTouches[0].clientY;

		if (state.touchend == null) {
			state.touchend = function (event) {

				view.removeEventListener("touchend", state.touchend, false);
				view.removeEventListener("touchmove", state.touchmove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("touchend", state.touchend, false);

		if (state.touchmove == null) {
			state.touchmove = function (event) {
				var scale = page.pageManager.getScale();
				var posX = event.changedTouches[0].clientX / scale - state.x.mousePosition / scale + state.x.viewPosition - state.x.initPosition;
				posX = Math.max(0, state.x.forward == true ? posX : -posX);
				posX = Math.min(posX, planX.maxSlide);

				var posY = event.changedTouches[0].clientY / scale - state.y.mousePosition / scale + state.y.viewPosition - state.y.initPosition;
				posY = Math.max(0, state.y.forward == true ? posY : -posY);
				posY = Math.min(posY, planY.maxSlide);

				view.setX(state.x.initPosition + (state.x.forward == true ? posX : -posX));
				planX.tag.setValue((planX.maxValue - planX.minValue) * posX / planX.maxSlide + planX.minValue, view.securityKey);

				view.setY(state.y.initPosition + (state.y.forward == true ? posY : -posY));
				planY.tag.setValue((planY.maxValue - planY.minValue) * posY / planY.maxSlide + planY.minValue, view.securityKey);
			};
		}
		view.addEventListener("touchmove", state.touchmove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleSlideByTagX(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (state.active == true) return;

		var tag = plan.tag;
		var pos = Math.min(plan.maxValue, Math.max(plan.minValue, tag.value));
		pos = plan.maxSlide * (pos - plan.minValue) / (plan.maxValue - plan.minValue);

		view.setX(state.x.initPosition + (state.x.forward == true ? pos : -pos));
	}

	function handleSlideByTagY(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (state.active == true) return;

		var tag = plan.tag;
		var pos = Math.min(plan.maxValue, Math.max(plan.minValue, tag.value));
		pos = plan.maxSlide * (pos - plan.minValue) / (plan.maxValue - plan.minValue);

		view.setY(state.y.initPosition + (state.y.forward == true ? pos : -pos));
	}

	function handleDiagonalSlide(event, view, planX, planY, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (0 != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.x.viewPosition = view.x;
		state.x.mousePosition = event.clientX;
		state.y.viewPosition = view.y;
		state.y.mousePosition = event.clientY;

		if (state.mouseup == null) {
			state.mouseup = function (event) {

				if (0 != event.button) return;

				view.removeEventListener("mouseup", state.mouseup, false);
				view.removeEventListener("mousemove", state.mousemove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		if (state.mousemove == null) {
			state.mousemove = function (event) {

				var posX = event.clientX - state.x.mousePosition + state.x.viewPosition - state.x.initPosition;
				posX = Math.max(0, state.x.forward == true ? posX : -posX);
				posX = Math.min(posX, planX.maxSlide);

				var posY = event.clientY - state.y.mousePosition + state.y.viewPosition - state.y.initPosition;
				posY = Math.max(0, state.y.forward == true ? posY : -posY);
				posY = Math.min(posY, planY.maxSlide);

				// 작은 변화량 선택
				var scaleX = posX * 1.0 / planX.maxSlide;
				var scaleY = posY * 1.0 / planY.maxSlide;
				if (scaleY > scaleX) {
					scaleY = scaleX;
					posY = scaleY * planY.maxSlide;
				} else {
					scaleX = scaleY;
					posX = scaleX * planX.maxSlide;
				}

				view.setX(state.x.initPosition + (state.x.forward == true ? posX : -posX));
				view.setY(state.y.initPosition + (state.y.forward == true ? posY : -posY));
				planX.tag.setValue((planX.maxValue - planX.minValue) * posX / planX.maxSlide + planX.minValue, view.securityKey);
			};
		}
		view.addEventListener("mousemove", state.mousemove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleDiagonalSlideByTouch(event, view, planX, planY, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.x.viewPosition = view.x;
		state.x.mousePosition = event.changedTouches[0].clientX;
		state.y.viewPosition = view.y;
		state.y.mousePosition = event.changedTouches[0].clientY;

		if (state.touchend == null) {
			state.touchend = function (event) {

				view.removeEventListener("touchend", state.touchend, false);
				view.removeEventListener("touchmove", state.touchmove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("touchend", state.touchend, false);

		if (state.touchmove == null) {
			state.touchmove = function (event) {

				var posX = event.changedTouches[0].clientX - state.x.mousePosition + state.x.viewPosition - state.x.initPosition;
				posX = Math.max(0, state.x.forward == true ? posX : -posX);
				posX = Math.min(posX, planX.maxSlide);

				var posY = event.changedTouches[0].clientY - state.y.mousePosition + state.y.viewPosition - state.y.initPosition;
				posY = Math.max(0, state.y.forward == true ? posY : -posY);
				posY = Math.min(posY, planY.maxSlide);

				// 작은 변화량 선택
				var scaleX = posX * 1.0 / planX.maxSlide;
				var scaleY = posY * 1.0 / planY.maxSlide;
				if (scaleY > scaleX) {
					scaleY = scaleX;
					posY = scaleY * planY.maxSlide;
				} else {
					scaleX = scaleY;
					posX = scaleX * planX.maxSlide;
				}

				view.setX(state.x.initPosition + (state.x.forward == true ? posX : -posX));
				view.setY(state.y.initPosition + (state.y.forward == true ? posY : -posY));
				planX.tag.setValue((planX.maxValue - planX.minValue) * posX / planX.maxSlide + planX.minValue, view.securityKey);
			};
		}
		view.addEventListener("touchmove", state.touchmove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleDiagonalSlideByTag(event, view, planX, planY, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (state.active == true) return;

		var tag = planX.tag;
		var pos = Math.min(planX.maxValue, Math.max(planX.minValue, tag.value));
		pos = planX.maxSlide * (pos - planX.minValue) / (planX.maxValue - planX.minValue);

		view.setX(state.x.initPosition + (state.x.forward == true ? pos : -pos));

		var pos = Math.min(planX.maxValue, Math.max(planY.minValue, tag.value));
		pos = planY.maxSlide * (pos - planY.minValue) / (planY.maxValue - planY.minValue);

		view.setY(state.y.initPosition + (state.y.forward == true ? pos : -pos));
	}

	function handleHorizontalSlide(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (0 != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.viewPosition = view.x;
		state.mousePosition = event.clientX;
		state.active = true;

		if (state.mouseup == null) {
			state.mouseup = function (event) {

				if (0 != event.button) return;

				state.active = false;

				view.removeEventListener("mouseup", state.mouseup, false);
				view.removeEventListener("mousemove", state.mousemove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		if (state.mousemove == null) {
			state.mousemove = function (event) {
				var scale = page.pageManager.getScale();
				var pos = event.clientX / scale - state.mousePosition / scale + state.viewPosition - state.initPosition;
				pos = Math.max(0, state.forward == true ? pos : -pos);
				pos = Math.min(pos, plan.maxSlide);

				view.setX(state.initPosition + (state.forward == true ? pos : -pos));
				plan.tag.setValue((plan.maxValue - plan.minValue) * pos / plan.maxSlide + plan.minValue, view.securityKey);
			};
		}
		view.addEventListener("mousemove", state.mousemove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleHorizontalSlideByTouch(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.viewPosition = view.x;
		state.mousePosition = event.changedTouches[0].clientX;
		state.active = true;

		if (state.touchend == null) {
			state.touchend = function (event) {

				state.active = false;

				view.removeEventListener("touchend", state.touchend, false);
				view.removeEventListener("touchmove", state.touchmove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("touchend", state.touchend, false);

		if (state.touchmove == null) {
			state.touchmove = function (event) {
				var scale = page.pageManager.getScale();
				var pos = event.changedTouches[0].clientX / scale - state.mousePosition / scale + state.viewPosition - state.initPosition;
				pos = Math.max(0, state.forward == true ? pos : -pos);
				pos = Math.min(pos, plan.maxSlide);

				view.setX(state.initPosition + (state.forward == true ? pos : -pos));
				plan.tag.setValue((plan.maxValue - plan.minValue) * pos / plan.maxSlide + plan.minValue, view.securityKey);
			};
		}
		view.addEventListener("touchmove", state.touchmove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleHorizontalSlideByTag(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (state.active == true) return;

		var tag = plan.tag;
		var pos = Math.min(plan.maxValue, Math.max(plan.minValue, tag.value));
		pos = plan.maxSlide * (pos - plan.minValue) / (plan.maxValue - plan.minValue);

		view.setX(state.initPosition + (state.forward == true ? pos : -pos));
	}

	function handleVerticalSlide(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (0 != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.viewPosition = view.y;
		state.mousePosition = event.clientY;
		state.active = true;

		if (state.mouseup == null) {
			state.mouseup = function (event) {

				if (0 != event.button) return;

				state.active = false;

				view.removeEventListener("mouseup", state.mouseup, false);
				view.removeEventListener("mousemove", state.mousemove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		if (state.mousemove == null) {
			state.mousemove = function (event) {
				var scale = page.pageManager.getScale();
				var pos = event.clientY / scale - state.mousePosition / scale + state.viewPosition - state.initPosition;
				pos = Math.max(0, state.forward == true ? pos : -pos);
				pos = Math.min(pos, plan.maxSlide);

				view.setY(state.initPosition + (state.forward == true ? pos : -pos));
				plan.tag.setValue((plan.maxValue - plan.minValue) * pos / plan.maxSlide + plan.minValue, view.securityKey);
			};
		}
		view.addEventListener("mousemove", state.mousemove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleVerticalSlideByTouch(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		state.viewPosition = view.y;
		state.mousePosition = event.changedTouches[0].clientY;
		state.active = true;

		if (state.touchend == null) {
			state.touchend = function (event) {

				state.active = false;

				view.removeEventListener("touchend", state.touchend, false);
				view.removeEventListener("touchmove", state.touchmove, false);

				page.events.releaseMouse();
				event.stopPropagation();
			};
		}
		view.addEventListener("touchend", state.touchend, false);

		if (state.touchmove == null) {
			state.touchmove = function (event) {
				var scale = page.pageManager.getScale();
				var pos = event.changedTouches[0].clientY / scale - state.mousePosition / scale + state.viewPosition - state.initPosition;
				pos = Math.max(0, state.forward == true ? pos : -pos);
				pos = Math.min(pos, plan.maxSlide);

				view.setY(state.initPosition + (state.forward == true ? pos : -pos));
				plan.tag.setValue((plan.maxValue - plan.minValue) * pos / plan.maxSlide + plan.minValue, view.securityKey);
			};
		}
		view.addEventListener("touchmove", state.touchmove, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleVerticalSlideByTag(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (state.active == true) return;

		var tag = plan.tag;
		var pos = Math.min(plan.maxValue, Math.max(plan.minValue, tag.value));
		pos = plan.maxSlide * (pos - plan.minValue) / (plan.maxValue - plan.minValue);

		view.setY(state.initPosition + (state.forward == true ? pos : -pos));
	}

	////////////////////////////////////////////////////////////
	// ValueClick(태그값 설정) 등록
	////////////////////////////////////////////////////////////
	function registerValueClick(view, plan) {
		if (plan.mode == "Instant") {
			var state = {
				value: null,
				value2: null,
				mouseup: null,
				touchend: null
			};
			view.addEventListener("mousedown", function (e) {
				handleValueClickInstant(e, view, plan, state);
			}, false);
			view.addEventListener("touchstart", function (e) {
				handleValueClickInstantByTouch(e, view, plan, state);
			}, false);

		} else if (plan.mode == "Input") {
			view.addEventListener("click", function (e) {
				handleValueClickInput(e, view, plan);
			}, false);

		} else if (plan.mode == "Toggle") {
			var state = { value: plan.value };
			view.addEventListener("click", function (e) {
				handleValueClickToggle(e, view, plan, state);
			}, false);

		} else {
			view.addEventListener("click", function (e) {
				handleValueClickNormal(e, view, plan);
			}, false);
		}

		view.addEventListener("mouseover", function (e) {
			page.onMouseOver(e, view);
		}, false);
		view.addEventListener("mouseout", function (e) {
			page.onMouseOut(e, view);
		}, false);
	}

	////////////////////////////////////////////////////////////
	// ValueClick(태그값 설정) Normal 처리
	////////////////////////////////////////////////////////////
	function handleValueClickNormal(event, view, plan) {

		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var tag = plan.tag;
		tag.setValue(plan.value, view.securityKey);
	}

	////////////////////////////////////////////////////////////
	// ValueClick(태그값 설정) Toggle 처리
	////////////////////////////////////////////////////////////
	function handleValueClickToggle(event, view, plan, state) {

		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var tag = plan.tag;
		if (tag.type == "digital") {
			tag.setValue(!tag.value, view.securityKey);

		} else if (tag.value != plan.value) {
			state.value = tag.value;
			tag.setValue(plan.value, view.securityKey);

		} else if (state.value != plan.value) {
			tag.setValue(state.value, view.securityKey);
			state.value = plan.value;

		}
	}

	////////////////////////////////////////////////////////////
	// ValueClick(태그값 설정) Input 처리
	////////////////////////////////////////////////////////////
	function handleValueClickInput(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var mode = plan.mode;
		var tag = plan.tag;

		var type = tag.type;   // 태그 종류
		var value = tag.value; // 현재 태그값
		var style = "";        // FIXME:
		var message = "";      // FIXME:
		var title = "";        // FIXME:
		var scaleX = event.screenX;
		var screenY = event.screenY;

		if (type == "analog") {
			var min = tag.minValue;
			var max = tag.maxValue;
			page.keyboardByNumber(event.currentTarget.id, tag, value, min, max, view.securityKey);
		} else if (type == "digital") {
			var on = tag.onText;
			var off = tag.offText;
			page.keyboardByBoolearn(event.currentTarget.id, tag, value, on, off, view.securityKey);
		} else if (type == "string") {
			page.keyboardByString(event.currentTarget.id, tag, value, view.securityKey);
		}
	}

	////////////////////////////////////////////////////////////
	// ValueClick(태그값 설정) Instant 처리
	////////////////////////////////////////////////////////////
	function handleValueClickInstant(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var tag = plan.tag;
		state.value = tag.value;
		tag.setValue(plan.value, view.securityKey);

		if (state.mouseup == null) {
			state.mouseup = function (event) {
				if (plan.button != event.button) return;

				view.removeEventListener("mouseup", state.mouseup, false);
				page.events.releaseMouse();
				event.stopPropagation();

				var tag = plan.tag;
				if (plan.value2 == null || typeof plan.value2 == "undefined") {
					tag.setValue(state.value, view.securityKey);
				} else {
					tag.setValue(plan.value2, view.securityKey);
                }
				state.value = null;
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	function handleValueClickInstantByTouch(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var tag = plan.tag;
		state.value = tag.value;
		tag.setValue(plan.value, view.securityKey);

		if (state.touchend == null) {
			state.touchend = function (event) {
				if (plan.button != event.button) return;

				view.removeEventListener("touchend", state.touchend, false);
				page.events.releaseMouse();
				event.stopPropagation();

				var tag = plan.tag;
				if (plan.value2 == null || typeof plan.value2 == "undefined") {
					tag.setValue(state.value, view.securityKey);
				} else {
					tag.setValue(plan.value2, view.securityKey);
				}
				state.value = null;
			};
		}
		view.addEventListener("touchend", state.touchend, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	////////////////////////////////////////////////////////////
	// ColorClick(색상 설정) 등록
	////////////////////////////////////////////////////////////
	function registerColorClick(view, plan) {
		var state = {
			fillStyle: null
			, strokeStyle: null
			, textStyle: null
			, mouseup: null
		};

		view.addEventListener("mousedown", function (e) {
			handleColorClick(e, view, plan, state);
		}, false);
		view.addEventListener("mouseover", function (e) {
			page.onMouseOver(e, view);
		}, false);
		view.addEventListener("mouseout", function (e) {
			page.onMouseOut(e, view);
		}, false);
	}

	////////////////////////////////////////////////////////////
	// ColorClick(색상 설정) 처리
	////////////////////////////////////////////////////////////
	function handleColorClick(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;

		if (view.securityKey.length != 0) {
			if (scada.activeSession == null) {
				return;
			} else if (scada.activeSession.keys.indexOf(view.securityKey) < 0) {
				return;
			}
		}

		try {
			state.fillStyle = view.fillStyle;
			if (state.fillStyle != null) {
				view.setFillStyle(plan.fillStyle);
			}
		} catch (e) {
		}
		try {
			state.strokeStyle = view.strokeStyle;
			if (state.strokeStyle != null) {
				view.setStrokeStyle(plan.strokeStyle);
			}
		} catch (e) {
		}
		//try {
		//	state.textStyle = view.textStyle;
		//	if (state.textStyle != null) {
		//		view.textStyle = plan.textStyle;
		//	}
		//} catch (e) {
		//}

		if (state.mouseup == null) {
			state.mouseup = function (event) {
				//console.log(event);
				//console.log(view);
				//console.log(plan);
				if (plan.button != event.button) return;

				view.removeEventListener("mouseup", state.mouseup, false);
				page.events.releaseMouse();

				event.stopPropagation();

				if (state.fillStyle != null) {
					view.setFillStyle(state.fillStyle);
					state.fillStyle = null;
				}
				if (state.strokeStyle != null) {
					view.setStrokeStyle(state.strokeStyle);
					state.strokeStyle = null;
				}
				//if (state.textStyle != null) {
				//	view.textStyle = state.textStyle;
				//	state.textStyle = null;
				//}
			};
		}
		view.addEventListener("mouseup", state.mouseup, false);

		page.events.captureMouse(page.getElementById(view.id));
		event.stopPropagation();
		event.preventDefault();
	}

	////////////////////////////////////////////////////////////
	// PageClick(페이지 제어) 등록
	////////////////////////////////////////////////////////////
	function registerPageClick(view, plan) {
		view.addEventListener("click", function (e) {
			page.actions.pageClick(e, view, plan);
		}, false);
		view.addEventListener("mouseover", function (e) {
			page.onMouseOver(e, view);
		}, false);
		view.addEventListener("mouseout", function (e) {
			page.onMouseOut(e, view);
		}, false);

	}

	////////////////////////////////////////////////////////////
	// PageClick(페이지 제어) 처리 - 사용안함
	////////////////////////////////////////////////////////////
	function handlePageClick(event, view, plan) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;
		var url = "";
		if (plan.page.indexOf("http://") > -1 || plan.page.indexOf("https://") > -1 || plan.page.indexOf("www.") > -1) {
			url = plan.page;
		}else{
			url = plan.page + ".html";
		}
		var mode = plan.mode;
		if (mode == "Open") {
			if (plan.options.indexOf("centerparent=yes") != -1) {
				$Common.openCenter(url, plan.window, plan.options);
			} else {
				window.open(url, plan.window, plan.options);
			}

		} else if (mode == "Close") {
			window.close();
		} else if (mode == "Replace") {
			window.location.href = url;
		}
	}

	////////////////////////////////////////////////////////////
	// SqlClick(SQL 실행) 처리 등록
	////////////////////////////////////////////////////////////
	function registerSqlClick(view, plan) {
		var state = {
			inited: false
			, running: false
			, onsuccess: null
			, onerror: null
		};

		view.addEventListener("click", function (e) {
			handleSqlClick(e, view, plan, state);
		}, false);
		view.addEventListener("mouseover", function (e) {
			page.onMouseOver(e, view);
		}, false);
		view.addEventListener("mouseout", function (e) {
			page.onMouseOut(e, view);
		}, false);
	}

	////////////////////////////////////////////////////////////
	// SqlClick(SQL 실행) 처리
	////////////////////////////////////////////////////////////
	function handleSqlClick(event, view, plan, state) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;
		if (!plan.sql) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		// 이미 실행중인가?
		if (state.running == true) return;

		if (state.inited == false) {
			// function 초기화
			state.onsuccess = getFunction(plan.onsuccess);
			state.onerror = getFunction(plan.onerror);
			state.inited = true;
		}

		try {
			if (plan.sql.execute(null
				, (function (data) {
					if (state.onsuccess != null) {
						state.onsuccess(data);
			}
					state.running = false;
			}).bind(state)
				, (function (msg) {
					if (state.onerror != null) {
						state.onerror(msg);
			}
					state.running = false;
			}).bind(state))) {
				state.running = true;
			}
		} catch (e) {
		}
	}

	////////////////////////////////////////////////////////////
	// RecipeClick(시나리오 제어) 등록
	////////////////////////////////////////////////////////////
	function registerRecipeClick(view, plan) {
		view.addEventListener("click", function (e) {
			handleRecipeClick(e, view, plan);
		}, false);
	}

	////////////////////////////////////////////////////////////
	// RecipeClick(시나리오 제어) 처리
	////////////////////////////////////////////////////////////
	function handleRecipeClick(event, view, plan) {
		//console.log(event);
		//console.log(view);
		//console.log(plan);
		if (plan.button != event.button) return;

		if(view.securityKey.length != 0){
			if(scada.activeSession == null){
				return;
			}else if(scada.activeSession.keys.indexOf(view.securityKey) < 0){					
				return;
			}				
		}
		
		var mode = plan.mode;
		if (mode == "Start") {
			plan.recipe.start();
		} else if (mode == "Stop") {
			plan.recipe.stop();
		} else if (mode == "Pause") {
			plan.recipe.pause();
		} else if (mode == "Next") {
			plan.recipe.next();
		} else if (mode == "Go") {
			plan.recipe.go(plan.step);
		}
	}

	page.createActions = function (action) {
		var view = page.protoViews[action.id];
		if (!view) return;

		var planCount = action.plans.length;
		if (planCount <= 0) return;		

		var hSlide = null;
		var vSlide = null;

		for (var j = 0; j < planCount; j++) {
			var plan = action.plans[j];
			if (plan.tag) {
				plan.tag = scada.getTagByName(plan.tag);
			}
			//console.log(view.name);
			//console.log(plan.type);
			if (plan.type == "HorizontalSlide" && plan.tag && plan.maxValue > plan.minValue && plan.maxSlide > 0) {
				hSlide = plan;

			} else if (plan.type == "VerticalSlide" && plan.tag && plan.maxValue > plan.minValue && plan.maxSlide > 0) {
				vSlide = plan;

			} else if (plan.type == "ValueClick" && plan.tag) {
				registerValueClick(view, plan);

			} else if (plan.type == "ColorClick") {
				registerColorClick(view, plan);

			} else if (plan.type == "PageClick") {
				registerPageClick(view, plan);

			} else if (plan.type == "SqlClick" && plan.sql) {
				registerSqlClick(view, plan);

			} else if (plan.type == "RecipeClick" && plan.recipe) {
				registerRecipeClick(view, plan);

			} else if (plan.type == "RecipeValueClick" && plan.recipeItem && plan.recipeItem.tag) {

			}
		}

		registerSlide(view, hSlide, vSlide);
	}
}(this));

