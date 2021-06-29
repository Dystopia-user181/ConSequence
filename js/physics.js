player.move = function() {
	if (player.deathTimer) return;
	let p = player.rect;
	p.pos.x += Math.round(player.velX);
	if (p.fixPos(player.velX, "x")) player.velX = 0;
	for (let i in map.blocks) {
		let b = map.blocks[i];
		b.meta.prevPos = {...b.pos};
	}
	fixBSPosX();
	moveBlocksX();
	moveBlocksX();
	moveBlocksX();
	moveBlocksX();
	if (map.isCollMap(p, map.death)) player.tmpDead = 'x';
	if (controls.forward) player.velX += 3;
	else if (controls.backward) player.velX -= 3;

	let ySign = Math.sign(player.velY);
	let canJump = false;
	let isCollMap = false;
	for (let i = 0; i < Math.floor(player.velY*ySign/10); i++) {
		p.pos.y += 10*ySign;
		if (p.fixPos(player.velY, "y")) {
			canJump = player.velY >= 0 || canJump;
			player.velY = 0;
			isCollMap = true;
		}
	}
	let left = player.velY%10
	p.pos.y += Math.round(left);
	if (p.fixPos(player.velY, "y")) {
		canJump = player.velY >= 0 || canJump;
		player.velY = 0;
		isCollMap = true;
	}
	if (fixBSPosY()) {
		canJump = true;
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

	player.velX *= 0.7;
	player.velY += 0.6;
	if (controls.jump && canJump) {
		player.velY = -15 * (Math.sqrt(player.modifiers.jump*modifiers.jump.active)*0.4 + 1);
	} else if (controls.jump && player.collWBlock) {
		player.velY = -10 * (Math.sqrt(player.modifiers.jump*modifiers.jump.active)*0.4 + 1);
	}
	player.velY *= 0.99;
	if (p.pos.y > 4000) {
		player.deathTimer = 10;
	}
	if (player.tmpDead) {
		player.deathTimer = 10;
		p.fixPos(player.tmpDead == 'x' ? player.velX : player.velY, player.tmpDead, map.death);
		map.deathBody();
		camera.pos.x = p.pos.x + 15;
		camera.pos.y = Math.min(p.pos.y + 15, 3500);
		player.tmpDead = false;
	}

	if (player.sequence.length < 10000 && map.sequenceLimit > 0) player.sequence.push({...p.pos});

	logBlocksPos();

	camera.pos.x = player.rect.pos.x + 15;
	camera.pos.y = Math.min(player.rect.pos.y + 15, 3500);
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
			
			for (let j in map.blocks) {
				let b1 = map.blocks[j];
				if (b1 == b || !b1.isColliding(b)) continue;
				let iter = 0;
				let xSign = Math.sign(player.velX)
				while (b1.isColliding(b) && iter < Math.abs(prevVelX)) {
					iter++;
					b.pos.x -= xSign/2;
					if (!map.isCollMap(b1)) b1.pos.x += xSign/2;
				}
			}

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
			for (let j in map.blocks) {
				let b1 = map.blocks[j];
				if (b1 == b) continue;
				let iter = 0;
				let xSign = Math.sign(player.velX)
				while (b1.isColliding(b) && iter < Math.abs(player.velX)) {
					iter++;
					b.pos.x -= xSign/2;
					if (!map.isCollMap(b1)) b1.pos.x += xSign/2;
				}
			}
		}
	}
}

function moveBlocksY(isCollMap) {
	let p = player.rect;

	let prevVelY = player.velY;
	
	for (let i in map.blocks) {
		let b = map.blocks[i];
		b.pos.y += b.meta.velY;
		let bprevVelY = b.meta.velY;
		let isColl = map.isCollMap(b, map.map.concat(map.bodies).concat(map.death));

		if (isColl) {
			if (b.fixPos(b.meta.velY, "y", map.map.concat(map.bodies).concat(map.death))) {
				b.meta.velY = 0;
			}
		}


		for (let j in map.blocks) {
			let b1 = map.blocks[j];
			if (b1 == b || !b1.isColliding(b)) continue;
			let iter = 0;
			let ySign = Math.sign(bprevVelY);

			if (map.isCollMap(b1)) {
				b.fixPos(prevVelY, "y", [b1]);
			}
			while (b1.isColliding(b) && iter < 80) {
				iter++;
				b.pos.y -= ySign/2;
				b1.pos.y += ySign/2;
			}
			if (iter > 0) {
				let bM = (b.height*b.width), b1M = (b1.height*b1.width), mS = bM + b1M;
				[b.meta.velY, b1.meta.velY] = [
					(bprevVelY*(bM-b1M) + b1.meta.velY*(b1M*2))/mS,
					(b1.meta.velY*(b1M-bM) + bprevVelY*(bM*2))/mS
				]
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
					if (ySign == 1) p.pos.y = b.pos.y - p.height;
					else p.pos.y = b.pos.y + b.height;
					player.velY = -player.velY*0.5;
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
			while (p.isColliding(b) && iter < Math.abs(prevVelY)) {
				iter++;
				b.pos.y += ySign/2;
				p.pos.y -= ySign/2;
			}
			for (let j in map.blocks) {
				let b1 = map.blocks[j];
				if (b1 == b) continue;
				let iter = 0;
				let ySign = Math.sign(b.meta.velY)
				while (b1.isColliding(b) && iter < Math.abs(b.meta.velY)) {
					iter++;
					b.pos.y -= ySign/2;
					if (!map.isCollMap(b1)) b1.pos.y += ySign/2;
				}
				if (iter > 0) {
					let bM = (b.height*b.width), b1M = (b1.height*b1.width), mS = bM + b1M;
					[b.meta.velY, b1.meta.velY] = [
						(b.meta.velY*(bM-b1M) + b1.meta.velY*(b1M*2))/mS,
						(b1.meta.velY*(b1M-bM) + b.meta.velY*(bM*2))/mS
					]
				}
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
		p.fixPos(player.velX - (b.pos.x - b.meta.prevPos.x), 'x', [b]);
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
		p.fixPos(player.velY - (b.pos.y - b.meta.prevPos.y), 'y', [b]);
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