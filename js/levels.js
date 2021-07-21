let map = {
	map: [],
	isCollMap(x, mapEls = map.map.concat(map.bodies)) {
		return mapEls.reduce((acc, val) => acc || x.isColliding(val), false);
	},
	mapRect(x, y, w, h) {
		map.map.push(new Rect(x, y, w, h, {type: "map"}));
	},
	deathBody() {
		let p = player.rect;
		map.bodies.push(new Rect(p.pos.x, p.pos.y, p.width, p.height, {type: "body"}));
	},
	bodyRect(x, y, w, h) {
		map.blocks.push(new Rect(x, y, w, h, {type: "block", prevPos: {x, y}, velY: 0, logPos: false, sequence: {s: [], w, h}}));
	},
	deathRect(x, y, w, h) {
		map.death.push(new Rect(x, y, w, h, {type: "death"}));
	},
	door(x, y, w, h, minH=10) {
		let rect = new Rect(x, y, w, h, {type: "door"});
		map.map.push(rect);
		return {
			maxH: h,
			minH: minH,
			doorObj: rect,
			isOpen: false,
			query() {
				if (this.isOpen) {
					this.doorObj.height = Math.max(this.doorObj.height-1, this.minH);
				} else {
					if (player.deathTimer) {
						this.doorObj.height = this.maxH;
					}
					this.doorObj.height = Math.min(this.doorObj.height+1, this.maxH);
					if (map.isCollMap(this.doorObj, [player.rect, ...map.blocks])) this.doorObj.height--;
				}
			}
		}
	},
	button(x, y, w, h) {
		return {
			buttonObj: new Rect(x, y, w, h, {type: "button"}),
			displayObj: new Rect(x, y, w, h, {type: "btndisplay"}),
			displayBase: new Rect(x - 5, y + h - 5, w + 10, 5, {type: "btndisplaybase"}),
			isPressed: false,
			query() {
				this.isPressed = map.isCollMap(this.buttonObj, [player.rect, ...map.blocks, ...map.simPSequence, ...map.simBSequence]);
				this.displayObj.pos.y = this.buttonObj.pos.y + 4*this.isPressed;
				this.displayObj.height = this.buttonObj.height - 4*this.isPressed;
			},
			draw() {
				ctx.fillStyle = "#08f";
				ctx.shadowColor = "#0af";
				ctx.shadowBlur = 15;
				drawRect(this.displayObj);
				ctx.fillStyle = "#666";
				drawRect(this.displayBase);
			}
		}
	},
	boost(x, y, type) {
		return {
			hitbox: new Rect(x, y, 40, 40),
			type,
			hasPicked: false,
			query() {
				if (!this.hasPicked && player.rect.isColliding(this.hitbox)) {
					player.modifiers[this.type]++;
					this.hasPicked = true;
					updateModifierHUD();
				}
			},
			draw() {
				if (!this.hasPicked) modifiers[this.type].draw(x, y + Math.sin(map.sequenceTime/7)*7);
			}
		}
	},
	sequenceLimit: 0,
	sequences: 1,
	sequenceTime: 0,
	sequenceTCounter: 0,
	playerSequences: [],
	blockSequences: [],
	simPSequence: [],
	simBSequence: [],
	bodies: [],
	blocks: [],
	death: [],
	new() {
		map.map = [];
		map.bodies = [];
		map.blocks = [];
		map.death = [];
		map.sequences = 1;
		map.sequenceTime = 0;
		map.sequenceTCounter = 0;
		map.playerSequences = [];
		map.blockSequences = [];
		map.simPSequence = [];
		map.simBSequence = [];
		player.reset();
		player.sequence = [];
		for (let i in player.modifiers) {
			player.modifiers[i] = 0;
		}
		map["level" + map.level]();
		if (map.sequenceLimit > 0) {
			document.querySelector('#sequencediv').style.display = "block";
			document.querySelector('#sequencetext').innerText = "Sequences: 1 out of " + map.sequenceLimit;
		} else {
			document.querySelector('#sequencediv').style.display = "none";
		}
		updateModifierHUD();
	},
	exit: undefined,
	levelTemplate() {
		map.sequenceLimit = 0;
		camera.zoom = 1;
		map.exit = new Rect(0, 0, 20, 40);
		map.custom = () => {};
		map.customBottom = () => {};
		map.customTop = () => {};
	},
	level1() {
		camera.zoom = 1
		map.sequenceLimit = 0;
		map.mapRect(-100, 100, 750, 25);
		for (let i = 0; i < 3; i++) {
			map.mapRect(-100, 100 - i*200, 200, 25);
			map.mapRect(150, 0 - i*200, 200, 25);
		}
		map.mapRect(350, -400, 50, 500);
		map.exit = new Rect(550, 60, 20, 40);
		map.custom = ()=>{};
		map.customBottom = ()=>{};
		map.customTop = ()=>{};
	},
	level2() {
		camera.zoom = 1
		map.sequenceLimit = 0;
		map.mapRect(-100, 100, 950, 25);
		map.mapRect(850, 125, 25, 25);
		map.mapRect(1350, 125, 25, 25);
		map.mapRect(1375, 100, 750, 25);
		map.bodyRect(300, 50, 500, 25);
		map.exit = new Rect(1700, 60, 20, 40);
		map.custom = ()=>{};
		map.customBottom = ()=>{};
		map.customTop = ()=>{};
	},
	level3() {
		camera.zoom = 1
		map.sequenceLimit = 0;
		map.mapRect(-100, 100, 725, 25);
		for (let i = 0; i < 3; i++) {
			map.mapRect(600 + i*350, 100, 25, 300);
			map.deathRect(600 + i*350, 400, 350, 25);
			map.mapRect(925 + i*350, 100, 25, 300);
		}
		map.mapRect(1650, 100, 500, 25)
		map.exit = new Rect(1900, 60, 20, 40);
		map.custom = ()=>{};
		map.customBottom = ()=>{};
		map.customTop = ()=>{};
	},
	level4() {
		camera.zoom = 1
		map.sequenceLimit = 0;
		map.mapRect(-100, 100, 200, 25);
		map.deathRect(100, 125, 1000, 25);
		map.mapRect(1100, 100, 200, 25);
		map.exit = new Rect(1190, 60, 20, 40);
		map.custom = ()=>{};
		map.customBottom = ()=>{};
		map.customTop = ()=>{};
	},
	level5() {
		camera.zoom = 1
		map.sequenceLimit = 0;
		map.mapRect(-100, 100, 200, 25);
		map.mapRect(-200, -500, 100, 625);
		map.deathRect(99, 100, 631, 25);
		map.mapRect(-100, -500, 1330, 350);
		map.mapRect(705, -100, 25, 145);
		map.mapRect(730, 100, 590, 25);
		map.deathRect(600, -150, 395, 50);
		map.mapRect(770, -65, 25, 165);
		map.exit = new Rect(1190, 60, 20, 40);
		map.custom = ()=>{};
		map.customBottom = ()=>{};
		map.customTop = ()=>{};
	},
	level6() {
		camera.zoom = 0.8
		map.sequenceLimit = 0;
		map.mapRect(-200, 100, 100, 860);
		map.mapRect(-200, 100, 550, 300);
		map.mapRect(300, 460, 400, 500);
		map.mapRect(600, 535, 600, 425);
		map.mapRect(750, 460, 300, 25);
		map.mapRect(1050, 300, 300, 125);
		map.mapRect(1100, 400, 250, 560);
		map.bodyRect(850, 410, 200, 50);
		map.bodyRect(1150, 250, 50, 50);
		map.mapRect(1100, -1000, 50, 1260);
		let button = map.button(1210, 290, 100, 10);
		let door = map.door(320, 400, 20, 60, 5);
		map.deathRect(100, 490, 200, 50);
		map.mapRect(-200, 910, 500, 50);
		map.exit = new Rect(90, 870, 20, 40);
		map.custom = () => {
			button.query();
			door.isOpen = button.isPressed;
			door.query();
		};
		map.customBottom = () => {
			button.draw();
		};
		map.customTop = () => {};
	},
	level7() {
		camera.zoom = 1
		map.sequenceLimit = 2;
		map.mapRect(-500, 100, 1000, 50);
		map.mapRect(-500, -100, 25, 250);
		map.mapRect(-500, -100, 225, 25);
		map.mapRect(-300, -100, 25, 150);
		map.mapRect(475, -100, 25, 250);
		map.mapRect(275, -100, 225, 25);
		map.mapRect(275, -100, 25, 150);
		map.deathRect(300, -75, 175, 25);
		let button = map.button(337.5, 90, 100, 10);
		let door = map.door(-295, 50, 15, 50, 10);
		map.exit = new Rect(-397.5, 60, 20, 40);
		map.custom = () => {
			button.query();
			door.isOpen = button.isPressed;
			door.query();
		};
		map.customBottom = () => {
			button.draw();
		};
		map.customTop = () => {};
	},
	level8() {
		camera.zoom = 0.8;
		map.sequenceLimit = 2;
		map.mapRect(-300, 100, 1100, 50);
		map.bodyRect(100, -100, 50, 80);
		map.mapRect(700, -100, 300, 250);
		map.mapRect(700, -300, 25, 100);
		map.mapRect(700, -300, 300, 25);
		map.mapRect(975, -300, 25, 300);
		let button = map.button(-250, 90, 100, 10);
		let door = map.door(705, -200, 15, 100, 10);
		map.exit = new Rect(840, -140, 20, 40);
		map.custom = () => {
			button.query();
			door.isOpen = button.isPressed;
			door.query();
		};
		map.customBottom = () => {
			button.draw();
		};
		map.customTop = ()=>{};
	},
	level9() {
		camera.zoom = 1
		map.sequenceLimit = 2;
		map.mapRect(-325, 100, 750, 25);
		map.mapRect(-250, -50, 675, 25);
		map.mapRect(400, -50, 25, 175);
		map.mapRect(-325, -250, 25, 375);
		map.mapRect(-325, -250, 350, 25);
		map.mapRect(25, -250, 25, 225);
		map.deathRect(-225, -175, 25, 125);
		let button = map.button(-100, -60, 100, 10);
		let door = map.door(100, -25, 20, 125, 10);
		let button2 = map.button(-200, 90, 100, 10);
		let door2 = map.door(200, -25, 20, 125, 10);
		map.bodyRect(130, -25, 10, 100);
		map.exit = new Rect(290, 60, 20, 40);
		map.custom = () => {
			button.query();
			button2.query();
			door.isOpen = button.isPressed;
			door.query();
			door2.isOpen = button2.isPressed;
			door2.query();
		};
		map.customBottom = () => {
			button.draw();
			button2.draw();
		};
		map.customTop = ()=>{};
	},
	level10() {
		camera.zoom = 0.7
		map.sequenceLimit = 3;

		map.mapRect(-150, -800, 51, 950);
		map.mapRect(1499, -800, 51, 950);

		// floor 1
		map.mapRect(-100, 100, 1200, 50);
		map.deathRect(1100, 90, 399, 60);

		// floor 2
		map.mapRect(-100, -100, 1250, 50);
		map.mapRect(-100, -150, 1200, 51);
		map.mapRect(-100, -200, 1150, 51);
		map.mapRect(-100, -250, 1100, 51);
		map.mapRect(-100, -300, 1050, 51);

		let button = map.button(-50, -310, 100, 10);
		let door = map.door(350, -750, 25, 200, 10);

		// floor 3
		map.deathRect(280, -500, 20, 50);
		map.mapRect(300, -550, 1200, 100);
		map.mapRect(-100, -800, 1600, 50);
		map.exit = new Rect(1400, -590, 20, 40);
		map.custom = () => {
			button.query();
			door.isOpen = button.isPressed;
			door.query();
		};
		map.customBottom = () => {
			button.draw();
		};
		map.customTop = ()=>{};
	},
	level11() {
		camera.zoom = 0.7;
		map.sequenceLimit = 3;

		// room 1
		map.mapRect(-100, 50, 800, 50);
		map.mapRect(650, -1050, 50, 1150);
		map.mapRect(-850, -100, 1400, 50);
		map.deathRect(640, -150, 11, 200);
		map.mapRect(-1200, -1050, 1900, 900);

		let button = map.button(500, 40, 100, 10);
		let door = map.door(-85, -50, 20, 100, 10);

		let button3 = map.button(-500, -110, 100, 10);
		let door3 = map.door(500, -150, 15, 50, 10);
		door3.isOpen = true;

		// room 2
		map.mapRect(-100, 50, 50, 300);
		map.deathRect(-110, 100, 10, 200);
		map.mapRect(-700, 300, 600, 50);
		map.mapRect(-650, 200, 150, 75);
		map.bodyRect(-450, 275, 290, 25);
		map.mapRect(-450, 90, 25, 150);
		let button2 = map.button(-625, 290, 100, 10);
		let door2 = map.door(-600, 90, 25, 110, 10);
		map.deathRect(-650, -50, 300, 140);

		// room 3
		map.mapRect(-700, 200, 51, 150);
		map.deathRect(-1200, 200, 500, 150);
		map.mapRect(-1200, -1050, 250, 100);

		map.mapRect(-1400, 200, 201, 150);

		map.exit = new Rect(-1310, 160, 20, 40);
		map.custom = () => {
			button.query();
			door.isOpen = button.isPressed;
			door.query();
			button2.query();
			door2.isOpen = button2.isPressed;
			door2.query();
			button3.query();
			door3.isOpen = door3.isOpen && !button3.isPressed;
			door3.query();
		};
		map.customBottom = () => {
			button.draw();
			button3.draw();
		};
		map.customTop = ()=>{
			button2.draw();
		};
	},
	level12() {
		camera.zoom = 1;
		map.sequenceLimit = 2;
		map.mapRect(-100, 100, 700, 50);
		map.mapRect(500, -200, 200, 350);
		let jumpBoost = map.boost(400, 40, "jump");
		map.exit = new Rect(590, -240, 20, 40);
		map.custom = () => {
			jumpBoost.query();
		};
		map.customBottom = () => {
			jumpBoost.draw();
		};
		map.customTop = () => {};
	},
	level13() {
		camera.zoom = 1;
		map.sequenceLimit = 2;
		map.mapRect(-200, 100, 1500, 50);
		map.mapRect(-200, -1000, 50, 1150);
		map.mapRect(1200, -200, 200, 350);
		map.deathRect(-150, -1000, 950, 900);
		for (let i = 0; i < 4; i++) map.mapRect(100 + i*200, -20, 25, 150);
		let jumpBoost = map.boost(250, 40, "jump");
		map.exit = new Rect(1290, -240, 20, 40);
		map.custom = () => {
			jumpBoost.query();
		};
		map.customBottom = () => {
			jumpBoost.draw();
		};
		map.customTop = () => {};
	},
	level14() {
		camera.zoom = 0.6;
		map.sequenceLimit = 3;
		map.mapRect(-250, 50, 1150, 50);
		map.mapRect(-250, -100, 50, 200);
		map.mapRect(-400, -100, 200, 50);
		map.deathRect(-350, -200, 250, 10);
		map.mapRect(-400, -500, 50, 450);
		map.mapRect(-100, -100, 600, 50);
		map.mapRect(-100, -250, 50, 200);
		map.mapRect(550, -250, 50, 200);
		map.deathRect(550, -50, 50, 10);
		let button = map.button(-325, -110, 100, 10);
		let jumpBoost = map.boost(0, -160, "jump");

		map.mapRect(-400, -300, 1000, 100);
		map.mapRect(300, -441, 50, 191);
		map.deathRect(300, -450, 50, 10);
		map.mapRect(300, -425, 170, 100);
		map.mapRect(500, -650, 150, 50);
		map.mapRect(600, -850, 50, 250);
		map.bodyRect(500, -675, 50, 25);
		let button2 = map.button(360, -310, 100, 10);

		map.bodyRect(0, -430, 50, 130);
		map.mapRect(-250, -650, 200, 50);
		let button3 = map.button(-200, -660, 100, 10);

		map.mapRect(-400, -500, 250, 50);
		let door1 = map.door(-230, -450, 20, 150);
		let door2 = map.door(-205, -450, 20, 150);
		let door3 = map.door(-180, -450, 20, 150);

		map.exit = new Rect(-290, -340, 20, 40);
		map.custom = () => {
			jumpBoost.query();
			button.query();
			button2.query();
			button3.query();
			door1.isOpen = button.isPressed;
			door2.isOpen = button2.isPressed;
			door3.isOpen = button3.isPressed;
			door1.query();
			door2.query();
			door3.query();
		};
		map.customBottom = () => {
			jumpBoost.draw();
			button.draw();
			button3.draw();
		};
		map.customTop = () => {
			button2.draw();
		};
	},
	level15() {
		camera.zoom = 0.8;
		map.sequenceLimit = 2;
		map.mapRect(-400, 100, 500, 50);
		map.mapRect(-400, -500, 500, 50);
		map.mapRect(-400, -500, 50, 650);
		map.deathRect(75, -500, 25, 650);
		map.mapRect(-200, -300, 50, 250);
		map.mapRect(-200, -100, 300, 50);
		map.mapRect(-200, -300, 300, 50);
		map.bodyRect(-250, -450, 50, 550);
		map.exit = new Rect(-72.5, -340, 20, 40);
		map.custom = () => {};
		map.customBottom = () => {};
		map.customTop = () => {};
	},
	level16() {
		camera.zoom = 0.8;
		map.sequenceLimit = 3;
		map.mapRect(-100, 100, 1000, 50);

		map.deathRect(-100, -400, 50, 550);
		map.mapRect(-100, -400, 200, 200);

		map.deathRect(850, -400, 50, 550);
		map.mapRect(700, -400, 200, 200);

		map.deathRect(100, -400, 600, 25);

		map.mapRect(-100, -225, 320, 25);
		map.mapRect(580, -225, 320, 25);
		map.bodyRect(240, -250, 50, 350);

		let button = map.button(110, -235, 100, 10);
		let button2 = map.button(590, -235, 100, 10);
		let door = map.door(650, -200, 25, 300);
		let door2 = map.door(725, -200, 25, 300);
		map.exit = new Rect(790, 60, 20, 40);
		map.custom = () => {
			button.query();
			button2.query();
			door.isOpen = button.isPressed;
			door.query();
			door2.isOpen = button2.isPressed;
			door2.query();
		};
		map.customBottom = () => {
			button.draw();
			button2.draw();
		};
		map.customTop = () => {};
	},
	/*level17() {
		camera.zoom = 0.8;
		map.sequenceLimit = 3;
		map.mapRect(-100, 100, 1000, 50);

		map.deathRect(-100, -400, 50, 550);
		map.mapRect(-100, -400, 200, 200);

		map.deathRect(850, -400, 50, 550);
		map.mapRect(700, -400, 200, 200);

		map.deathRect(100, -400, 600, 25);

		let button = map.button(110, -235, 100, 10);
		let button2 = map.button(590, -235, 100, 10);

		map.exit = new Rect(1e100, 1e10, 20, 40);
		map.custom = () => {};
		map.customBottom = () => {
			button.draw();
			button2.draw();
		};
		map.customTop = () => {};
	},*/
	level17() {
		map.sequenceLimit = 1e15;
		camera.zoom = 0.5;
		map.mapRect(-1e15, 100, 2e15, 1e15);
		map.exit = new Rect(1e100, 1e100, 0, 0);
		let jumpBoost = map.boost(0, -100, "jump");
		map.custom = ()=>{
			if (map.sequenceTime == 0) jumpBoost.hasPicked = false;
			jumpBoost.query();
		};
		map.customBottom = ()=>{jumpBoost.draw();};
		map.customTop = ()=>{
			ctx.fillStyle = '#fff';
			ctx.shadowBlur = 15;
			ctx.shadowColor = '#fff';
			ctx.font = '40px Arial';
			ctx.textAlign = 'center';
			ctx.fillText("Thanks for playing!", cam.getX(0), cam.getY(-300));
			ctx.font = '30px Arial';
			ctx.fillText("Press N to create a new sequence and cause chaos", cam.getX(0), cam.getY(-200));
		};
	},
	level: 1,
	custom() {},
	customBottom() {},
	customTop() {},
}