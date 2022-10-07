player.move = function() {
	if (player.deathTimer) return;
	let p = player.rect;

	let accX = 3*(controls.forward - controls.backward);
	player.velX += accX;
	if (Math.sign(accX))
		player.dir = accX < 0 ? 'l' : 'r';
	player.velX *= 0.7;
	p.pos.x += Math.round(player.velX)/(1 + p.isInsideGrp(map.simBSequence, 7));
	if (p.fixPos(player.velX, "x")) player.velX = 0;
	for (let i in map.blocks) {
		let b = map.blocks[i];
		b.meta.prevPos = {...b.pos};
	}
	moveBlocksX();
	moveBlocksX();
	if (map.isCollMap(p, map.death)) player.tmpDead = 'x';

	let ySign = Math.sign(player.velY);
	let canJump = false;
	let isCollMap = false;
	for (let i = 0; i < Math.floor(player.velY*ySign/10); i++) {
		p.pos.y += 10*ySign/(1 + p.isInsideGrp(map.simBSequence, 7));
		if (p.fixPos(player.velY, "y")) {
			canJump = gravity()*player.velY >= 0 || canJump;
			player.velY = 0;
			isCollMap = true;
		}
	}
	let left = player.velY%10;
	p.pos.y += Math.round(left)/(1+p.isInsideGrp(map.simBSequence, 7));
	if (p.fixPos(player.velY, "y")) {
		canJump = gravity()*player.velY >= 0 || canJump;
		player.velY = 0;
		isCollMap = true;
	}
	player.collWBlock = false;
	moveBlocksY(isCollMap);
	if (map.isCollMap(p, map.death) && !player.tmpDead) player.tmpDead = 'y';
	if (!map.isCollMap(p, map.death)) player.tmpDead = false;
	if (player.modifiers.jump) {
		let distFromPast = Infinity;
		for (let i in map.simPSequence) {
			distFromPast = Math.min(distFromPast, p.dist(map.simPSequence[i]));
		}
		modifiers.jump.active = distFromPast < 90;
	} else {
		modifiers.jump.active = false;
	}

	let isInside = p.isInsideGrp(map.simBSequence, 7);
	if (!isInside) {
		player.velY += gravity();
		if (controls.jump && canJump) {
			player.velY = jumpheight();
		} else if (controls.jump && player.collWBlock) {
			player.velY = jumpheight();
		}
		player.velY *= 0.99;
		c.style.filter = "invert(0)";
	} else {
		player.velY = 5*(controls.down - controls.jump);

		let velX = 5*(controls.forward - controls.backward);
		player.velX = velX;
		if (Math.sign(velX))
			player.dir = velX < 0 ? 'l' : 'r';

		c.style.filter = "invert(1)";
	}
	if (Math.abs(p.pos.y) > 5000) {
		player.deathTimer = 10;
	}
	if (player.tmpDead) {
		player.deathTimer = 10;
		p.fixPos(player.tmpDead == 'x' ? player.velX : player.velY, player.tmpDead, map.death);
		map.deathBody();
		camera.pos.x = p.pos.x + 15;
		camera.pos.y = Math.max(Math.min(p.pos.y + 15, 3500), -3500)
		player.tmpDead = false;
	}

	logBlocksPos();

	if (map.sequenceTCounter == 0 && player.sequence.length < 1e5 && map.sequenceLimit > 0)
		player.sequence.push({...p.pos});

	camera.pos.x = player.rect.pos.x + 15;
	camera.pos.y = Math.max(Math.min(player.rect.pos.y + 15, 3500), -3500);
}

function gravity() {
	let base = 0.6;
	base *= player.modifiers.gravity * 0.5 + 1;
	return base;
}
function jumpheight() {
	let base = -15*Math.sign(gravity());
	base *= Math.sqrt(player.modifiers.jump*modifiers.jump.active)*0.4 + 1;
	return base;
}


function moveBlocksX() {
	let p = player.rect;

	let prevVelX = player.velX;
	
	for (let i in map.blocks) {
		let b = map.blocks[i];
		let isColl = map.isCollMap(b, map.map.concat(map.bodies).concat(map.death));

		if (isColl) {
			b.fixPos(player.velX, "x", map.map.concat(map.bodies).concat(map.death));
		}

		if (p.isColliding(b)) {
			b.meta.logPos = true;
			let iter = 0;
			let xSign = Math.sign(prevVelX);

			if (isColl) {
				if (xSign == 1) p.pos.x = b.pos.x - p.width;
				else p.pos.x = b.pos.x + b.width;
				player.velX = 0;
				continue;
			}
			let tmpXSign = xSign;
			while (p.isColliding(b) && iter < Math.abs(prevVelX) + 40) {
				iter++;
				if (xSign == 0) tmpXSign = iter*((iter%2)*2-1)
				b.pos.x += tmpXSign/2;
				p.pos.x -= tmpXSign/2;
			}
			if (iter > 0) {
				player.velX *= 0.8;
			}
		}
	}
}

function moveBlocksY(isCollMap) {
	let p = player.rect;

	let prevVelY = player.velY;
	
	for (let i in map.blocks) {
		let b = map.blocks[i];
		b.pos.y += Math.round(b.meta.velY);
		let bprevVelY = b.meta.velY;
		let isColl = map.isCollMap(b, map.map.concat(map.bodies).concat(map.death));

		if (isColl) {
			if (b.fixPos(b.meta.velY, "y", map.map.concat(map.bodies).concat(map.death))) {
				b.meta.velY = Math.sign(b.meta.velY)*1e-16;
			}
		}

		if (p.isColliding(b)) {
			b.meta.logPos = true;
			let iter = 0;
			let ySign = Math.sign(prevVelY);
			if (ySign != -1) {
				player.collWBlock = true;
			}

			if (isColl) {
				if (p.isColliding(b)) {
					if (ySign == 0) return;
					if (ySign == 1) p.pos.y = b.pos.y - p.height;
					else p.pos.y = b.pos.y + b.height;
					player.velY = 0;
					continue;
				}
			}
			if (isCollMap) {
				if (b.isColliding(p)) {
					let ySign = Math.sign(b.meta.velY)
					if (ySign == 1) b.pos.y = p.pos.y - b.height;
					else b.pos.y = p.pos.y + p.height;
					b.meta.velY = 0;
					continue;
				}
			}
			while (p.isColliding(b) && iter < Math.abs(prevVelY)*2) {
				iter++;
				b.pos.y += ySign/2;
				if (map.isCollMap(b, map.map.concat(map.bodies).concat(map.death))) b.pos.y -= ySign/2;
				p.pos.y -= ySign/2;
			}
		}

		b.meta.velY += 0.6;
		b.meta.velY *= 0.99;
	}
}

function logBlocksPos() {
	if (map.sequenceLimit == 0) return;
	for (let i in map.blocks) {
		let b = map.blocks[i];
		if (!b.meta.logPos) continue;
		b.meta.sequence.s.push({pos: {...b.pos}, prevPos: {...b.meta.prevPos}});
	}
}

function fixBSPosX() {
	let p = player.rect;
	for (let i in map.simBSequence) {
		let b = map.simBSequence[i];
		if (!b.meta.collide || !p.isColliding(b)) continue;
		let prevPos = {...p.pos};
		p.fixPos(player.velX - (b.pos.x - b.meta.prevPos.x), 'x', b);
		if (map.isCollMap(p, map.map.concat(map.bodies).concat(map.simBSequence))) {
			p.pos = {...prevPos};
			b.meta.collide = false;
			for (let i in map.simBSequence) {
				let b1 = map.simBSequence[i];
				if (b1 == b && !b1.isColliding(p)) continue;
				b1.meta.collide = false;
			}
			continue;
		} else {
			player.velX = b.pos.x - b.meta.prevPos.x;
		}
	}
}
function fixBSPosY() {
	let p = player.rect;
	let isColl = false;
	for (let i in map.simBSequence) {
		let b = map.simBSequence[i];
		if (!b.meta.collide || !p.isColliding(b)) continue;
		isColl = true;
		let prevPos = {...p.pos};
		p.fixPos(player.velY - (b.pos.y - b.meta.prevPos.y), 'y', b);
		if (map.isCollMap(p, map.map.concat(map.bodies).concat(map.simBSequence))) {
			p.pos = {...prevPos};
			b.meta.collide = false;
			for (let i in map.simBSequence) {
				let b1 = map.simBSequence[i];
				if (b1 == b && !b1.isColliding(p)) continue;
				b1.meta.collide = false;
			}
			continue;
		} else {
			player.velY = b.pos.y - b.meta.prevPos.y;
		}
	}
	return isColl;
}