let player = {
	rect: new Rect(-15, -15, 30, 30),
	velY: 0,
	velX: 0,
	deathTimer: 0,
	tmpDead: 0,
	reset(c = true) {
		player.rect.goto(-15, -15);
		player.velX = 0;
		player.velY = 0;
		if (c && !player.deathTimer) {
			camera.pos.x = 0;
			camera.pos.y = 0;
		}
	},
	die() {
		if (player.dead) return;
		player.dead = true;
		player.reset(false);
		if (map.sequenceLimit > 0) {
			newSequence(false);
		}
	},
	dead: false,
	sequence: [],
	modifiers: {
		jump: 0,
	},
	collWBlock: false,
}
let settings = {
	paused: false,
}
function pause() {
	settings.paused = true;
	document.querySelector('#optionsmodal').style.display = "block";
	document.querySelector('#modal-bg').style.display = "block";
}
function cont() {
	settings.paused = false;
	document.querySelector('#optionsmodal').style.display = "none";
	document.querySelector('#modal-bg').style.display = "none";
}

function loop() {
	if (settings.paused) return;
	let p = player.rect;
	player.move();
	for (let i in map.simBSequence) {
		let b = map.simBSequence[i];
		if (b.meta.collide || b.isColliding(p)) continue;
		b.meta.collide = true;
	}
	if (player.deathTimer) {player.deathTimer--; player.die()} else {
		player.dead = false;
	}
	if (p.isColliding(map.exit)) {map.level++; map.new();}
	for (let i in map.simPSequence) {
		map.simPSequence[i].pos = {...map.playerSequences[i][Math.min(map.sequenceTime, map.playerSequences[i].length-1)]};
		if (map.sequenceTime > map.playerSequences[i].length-1) map.simPSequence[i].meta.ended = true;
	}
	for (let i in map.simBSequence) {
		let bS = map.simBSequence[i];
		let b = map.blockSequences[i].s[Math.min(map.sequenceTime, map.blockSequences[i].s.length-1)];
		bS.pos = {...b.pos};
		bS.meta.prevPos = {...(map.sequenceTime > map.blockSequences[i].s.length-1 ? b.pos : b.prevPos)};
	}
	map.custom();
	drawAll();
	if (!player.deathTimer) {
		map.sequenceTCounter += 1/(1+p.isInsideGrp(map.simBSequence, 7));
		if (map.sequenceTCounter >= 1) {
			map.sequenceTime++;
			map.sequenceTCounter = 0;
		}
	}
}

let interval;
function start() {
	map.new();
	setInterval(loop, 20);
	document.querySelector("#startdiv").style.display = "none";
	document.querySelector("#gamediv").style.display = "block";
}

function newSequence(c = true) {
	if (map.sequenceLimit == 0) return;
	player.reset(c);
	map.sequenceTime = 0;
	map.sequences++;
	map.playerSequences.push([...player.sequence]);
	for (let i in map.blocks) {
		let b = map.blocks[i];
		if (b.meta.logPos) map.blockSequences.push({...b.meta.sequence});
	}
	player.sequence = [];
	map.simPSequence.push(new Rect(-15, -15, 30, 30, {ended: false}));
	for (let i in map.playerSequences) {
		map.simPSequence[i].pos = {...map.playerSequences[i][0]};
		map.simPSequence[i].meta.ended = false;
	}
	for (let i in map.blockSequences) {
		let bS = map.blockSequences[i];
		map.simBSequence[i] = new Rect(bS.s[0].pos.x, bS.s[0].pos.y, bS.w, bS.h, {prevPos: {...bS.s[0].prevPos}, collide: true});
	}
	map.blocks = map.blocks.filter(_=> !_.meta.logPos);
	if (map.sequences > map.sequenceLimit) map.new();
	document.querySelector("#sequencetext").innerText = "Sequences: " + map.sequences + " out of " + map.sequenceLimit;
}