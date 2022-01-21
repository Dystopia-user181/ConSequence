let map = {
	map: [],
	isCollMap(x, mapEls = map.map.concat(map.bodies)) {
		return mapEls.reduce((acc, val) => acc || x.isColliding(val), false);
	},
	mapRect(x, y, w, h) {
		map.map.push(new Rect(x, y, w, h, {type: "map"}));
		return map.map[map.map.length - 1];
	},
	deathBody() {
		if (map.level < 5) return;
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
		return new Door(x, y, w, h, minH);
	},
	button(x, y, w, h) {
		return new Button(x, y, w, h);
	},
	boost(x, y, type) {
		return new Boost(x, y, type);
	},
	sequenceLimit: 0,
	sequences: 1,
	sequenceTime: 0,
	sequenceTCounter: 0,
	sequenceTimeLim: 0,
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
		document.querySelector('#sequenceTime').style.display = map.sequenceTimeLim ? "inline" : "none"
		updateModifierHUD();
	},
	exit: undefined,
	level1, level2, level3, level4, level5,
	level6, level7, level8, level9, level10,
	level11, level12, level13, level14, level15,
	level16, level17, level18, level19, level20,
	level21, level22, level23, level24,
	level: 1,
	custom() {},
	customBottom() {},
	customTop() {}
}

function levelTemplate() {
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	map.exit = new Rect(0, 0, 20, 40);
	map.custom = () => {};
	map.customBottom = () => {};
	map.customTop = () => {};
}
let levelSelect = {
	page: 0,
	maxPage: 2,
	maxLvl: 1,
	select(btnId) {
		if (levelSelect.page*10 + btnId > levelSelect.maxLvl) return;
		map.level = levelSelect.page*10 + btnId;
		start();
	},
	setBtnStyles() {
		for (let i = 0; i++ < 10;) {
			let el = document.querySelector('#lvl' + i);
			el.innerText = i + levelSelect.page*10;

			if (i + levelSelect.page*10 > levelSelect.maxLvl) el.style.opacity = 0.5;
			else el.style.opacity = 1;

			if (!map["level" + (i + levelSelect.page*10)]) el.style.visibility = "hidden";
			else el.style.visibility = "visible";
		}
	},
	prev() {
		levelSelect.page = Math.max(0, levelSelect.page - 1);
		if (levelSelect.page == 0) document.querySelector('#lvlprev').style.opacity = 0.5;
		else document.querySelector('#lvlprev').style.opacity = 1;

		document.querySelector('#lvlnext').style.opacity = 1;

		levelSelect.setBtnStyles();
	},
	next() {
		levelSelect.page = Math.min(levelSelect.maxPage, levelSelect.page + 1);
		if (levelSelect.page == levelSelect.maxPage) document.querySelector('#lvlnext').style.opacity = 0.5;
		else document.querySelector('#lvlnext').style.opacity = 1;

		document.querySelector('#lvlprev').style.opacity = 1;

		levelSelect.setBtnStyles();
	},
	open() {
		document.querySelector('#levelselectdiv').style.display = "flex";
		levelSelect.setBtnStyles();
	},
	close() {
		document.querySelector('#levelselectdiv').style.display = "none";
	}
}

if (typeof localStorage.getItem("frostjam-consequencesave-scarlet") == "string") {
	levelSelect.maxLvl = Number(atob(localStorage.getItem("frostjam-consequencesave-scarlet")));
	levelSelect.page = Math.floor(levelSelect.maxLvl/10 - 0.1);
	if (levelSelect.page == 0) document.querySelector('#lvlprev').style.opacity = 0.5;
	else document.querySelector('#lvlprev').style.opacity = 1;


	if (levelSelect.page == levelSelect.maxPage) document.querySelector('#lvlnext').style.opacity = 0.5;
	else document.querySelector('#lvlnext').style.opacity = 1;
}

class Door {
	constructor(x, y, w, h, minH) {
		let rect = new Rect(x, y, w, h, {type: "door"});
		map.map.push(rect);
		this.maxH = h;
		this.minH = minH;
		this.doorObj = rect;
		this.isOpen = false;
	}

	query() {
		if (this.isOpen) {
			this.doorObj.height = Math.max(this.doorObj.height - 1, this.minH);
		} else {
			if (player.deathTimer) {
				this.doorObj.height = this.maxH;
			}
			this.doorObj.height = Math.min(this.doorObj.height + 1, this.maxH);
			if (map.isCollMap(this.doorObj, [player.rect, ...map.blocks])) this.doorObj.height--;
		}
	}
}

class Button {
	constructor(x, y, w, h) {
		this.buttonObj = new Rect(x, y, w, h, {type: "button"});
		this.displayObj = new Rect(x, y, w, h, {type: "btndisplay"});
		this.displayBase = new Rect(x - 5, y + h - 5, w + 10, 5, {type: "btndisplaybase"});
		this.isPressed = false;
	}

	query() {
		this.isPressed = map.isCollMap(this.buttonObj, [player.rect, ...map.blocks, ...map.simPSequence, ...map.simBSequence]);
		this.displayObj.pos.y = this.buttonObj.pos.y + 4*this.isPressed;
		this.displayObj.height = this.buttonObj.height - 4*this.isPressed;
	}
	draw() {
		ctx.fillStyle = "#08f";
		ctx.shadowColor = "#0af";
		ctx.shadowBlur = 15;
		drawRect(this.displayObj);
		ctx.fillStyle = "#666";
		drawRect(this.displayBase);
	}
}