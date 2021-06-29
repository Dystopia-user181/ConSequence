let c = document.querySelector("#c");
let ctx = c.getContext("2d");

let camera = {
	pos: {x: 0, y: 0},
	zoom: 1,
	getX(x) {
		return (x - camera.pos.x)*camera.zoom + c.width/2
	},
	getY(y) {
		return (y - camera.pos.y)*camera.zoom + c.height/2
	},
	pZ(l) {
		return l * camera.zoom;
	}
}
let cam = camera;

function drawRect(rect) {
	ctx.fillRect(cam.getX(rect.pos.x), cam.getY(rect.pos.y), cam.pZ(rect.width), cam.pZ(rect.height))
}
function strokeRect(rect) {
	ctx.strokeRect(cam.getX(rect.pos.x), cam.getY(rect.pos.y), cam.pZ(rect.width), cam.pZ(rect.height))
}
modifiers.jump.draw = function(x, y, size = 40) {
	x = cam.getX(x);
	y = cam.getY(y);
	ctx.fillStyle = '#c95bfc';
	ctx.shadowBlur = 15;
	ctx.shadowColor = '#c95bfc';
	ctx.beginPath();
	ctx.moveTo(x + cam.pZ(size/2), y);
	ctx.lineTo(x, y + cam.pZ(size/2));
	ctx.lineTo(x + cam.pZ(3*size/8), y + cam.pZ(size/2));
	ctx.lineTo(x + cam.pZ(3*size/8), y + cam.pZ(size));
	ctx.lineTo(x + cam.pZ(5*size/8), y + cam.pZ(size));
	ctx.lineTo(x + cam.pZ(5*size/8), y + cam.pZ(size/2));
	ctx.lineTo(x + cam.pZ(size), y + cam.pZ(size/2));
	ctx.lineTo(x + cam.pZ(size/2), y);
	ctx.fill();
}
function drawExit() {
	let exitPos = map.exit.pos;
	ctx.fillStyle = '#2dd';
	ctx.shadowBlur = 15;
	ctx.shadowColor = '#2dd';
	let x1 = (exitPos.x - 15 - camera.pos.x)*camera.zoom + c.width/2,
		y1 = (exitPos.y - 20 - camera.pos.y)*camera.zoom + c.height/2,
		x2 = x1 + 50*camera.zoom,
		y2 = y1 + 60*camera.zoom;

	ctx.beginPath();
	ctx.arc((exitPos.x + 10 - camera.pos.x)*camera.zoom + c.width/2, (exitPos.y - 20 - camera.pos.y)*camera.zoom + c.height/2, 25*camera.zoom, 0, Math.PI, true);
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1, y2);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x2, y1);
	ctx.fill();
}


function drawAll() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	map.customBottom();

	drawExit();
	
	ctx.shadowBlur = 0;
	for (let i in map.map) {
		if (map.map[i].meta.type == "door") ctx.fillStyle = '#444';
		else ctx.fillStyle = '#888';
		drawRect(map.map[i]);
	}
	ctx.fillStyle = '#686';
	for (let i in map.bodies) {
		drawRect(map.bodies[i]);
	}

	ctx.shadowColor = '#ff0';
	ctx.shadowBlur = 15;
	ctx.fillStyle = '#ff0';
	for (let i in map.blocks) {
		drawRect(map.blocks[i]);
	}

	ctx.shadowBlur = 0;
	ctx.fillStyle = '#f00';
	for (let i in map.death) {
		drawRect(map.death[i]);
	}
	
	if (!player.deathTimer) {
		ctx.shadowColor = '#1f1';
		ctx.shadowBlur = 15;
		ctx.fillStyle = '#1f1';
		drawRect(player.rect);

		if (modifiers.jump.active) {
			modifiers.jump.draw(player.rect.pos.x + 25, player.rect.pos.y - 35, 15);
		}


		ctx.lineWidth = 2;
		for (let i in map.blockSequences) {
			ctx.fillStyle = "#ff06";
			ctx.shadowBlur = 0;
			let b = map.blockSequences[i]
			drawRect({pos: b.s[0].pos, height: b.h, width: b.w});
		}
		for (let i in map.simBSequence) {
			let b = map.simBSequence[i]
			ctx.lineWidth = 2;
			let strokeClr = b.meta.collide ? '#ff0a' : '#f87a';
			ctx.fillStyle = (b.meta.collide ? '#ccbb33' : '#dd7766') + Math.round(90 - Math.sin(map.sequenceTime/10)*30).toString(16);
			ctx.shadowColor = strokeClr;
			ctx.strokeStyle = strokeClr;
			drawRect(b);
			strokeRect(b);

			let s = map.blockSequences[i];

			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#ff0d";
			ctx.shadowColor = "#ff0";
			ctx.moveTo(cam.getX(b.pos.x) + cam.pZ(b.width)/2, cam.getY(b.pos.y) + cam.pZ(b.height)/2);
			ctx.lineTo(cam.getX(s.s[0].pos.x) + cam.pZ(s.w)/2, cam.getY(s.s[0].pos.y) + cam.pZ(s.h)/2);
			ctx.stroke();
		}

		ctx.lineWidth = 2;

		ctx.fillStyle = "#0fc6";
		ctx.shadowBlur = 0;
		if (map.simPSequence.length > 0) drawRect(new Rect(-15, -15, 30, 30));

		for (let i in map.simPSequence) {
			let sP = map.simPSequence[i];
			ctx.lineWidth = 2;
			ctx.fillStyle = (sP.meta.ended ? '#998866' : '#11aa88') + Math.round(90 - Math.sin(map.sequenceTime/10)*30).toString(16);
			ctx.shadowColor = sP.meta.ended ? '#d55a' : '#0ffa';
			ctx.shadowBlur = 15;
			ctx.strokeStyle = sP.meta.ended ? '#d55a' : '#0ffa';
			drawRect(sP);
			strokeRect(sP);

			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = (sP.meta.ended ? '#f00d' : '#0ffd');
			ctx.shadowColor = (sP.meta.ended ? '#f00' : '#0ff');
			ctx.shadowBlur = 15;
			ctx.moveTo(cam.getX(sP.pos.x) + cam.pZ(sP.width)/2, cam.getY(sP.pos.y) + cam.pZ(sP.height)/2);
			ctx.lineTo(cam.getX(0), cam.getY(0));
			ctx.stroke();
		}
	}

	map.customTop();

	if (player.dead) {
		ctx.fillStyle = '#d003';
		ctx.fillRect(0, 0, c.width, c.height);
	}
}

window.onresize = drawAll;