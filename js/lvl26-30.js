function level26() {
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	player.modifiers.gravity = 1;
	map.mapRect(-101, 100, 201, 25);
	map.mapRect(-1102, -20, 1004, 145);
	map.mapRect(-1100, -60, 1000, 10);
	map.mapRect(-1100, -1000, 5, 945);
	map.mapRect(-150, -200, 50, 5);
	map.mapRect(-1000, -230, 50, 5);
	map.mapRect(-1000, -400, 50, 5);
	map.exit = new Rect(-985, -440, 20, 40);

	let jumpBoost = map.boost(-1300, -60, "jump");
	let gravityBoost = map.boost(-145, -250, "gravity");
	map.custom = () => {
		jumpBoost.query();
		gravityBoost.query();
	};
	map.customBottom = () => {
		jumpBoost.draw();
		gravityBoost.draw();
	};
	map.customTop = () => {
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '24px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("Perhaps the physics engine can be abused.", cam.getX(-100), cam.getY(200));
	};
}
function level27() {
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	player.modifiers.gravity = 1;
	map.mapRect(-450, 100, 900, 1000);
	map.mapRect(-1400, -1400, 1000, 2600);
	map.mapRect(400, -1400, 1000, 2600);
	map.mapRect(250, -300, 151, 300);
	map.bodyRect(200, -150, 50, 250);
	let jumpBoost = map.boost(185, 40, "jump");
	let jumpBoost2 = map.boost(305, -350, "jump");

	let door = map.door(255, 0, 15, 100, 5);
	let button = map.button(-390, -335, 100, 10);

	map.mapRect(-500, -325, 220, 25);

	map.mapRect(-500, -150, 250, 150);
	map.deathRect(-400, 0, 150, 100);
	let gravityBoost = map.boost(-345, -200, "gravity");
	map.exit = new Rect(327.5, 60, 20, 40);
	map.custom = () => {
		jumpBoost.query();
		jumpBoost2.query();
		gravityBoost.query();
		button.query();
		door.isOpen = button.isPressed;
		door.query();
	};
	map.customBottom = () => {
		button.draw();
	};
	map.customTop = () => {
		jumpBoost.draw();
		jumpBoost2.draw();
		gravityBoost.draw();
	};
}
function level28() {
	map.sequenceLimit = 5;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	player.modifiers.gravity = -1;
	map.mapRect(-100, 100, 200, 25);
	map.deathRect(100, -1000, 25, 1125);
	map.mapRect(125, -1000, 200, 25);
	map.exit = new Rect(215, -1040, 20, 40);
	map.custom = () => {};
	map.customBottom = () => {};
	map.customTop = () => {
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'right';
		ctx.fillText("Scale the wall.", cam.getX(0), cam.getY(-200));
	};
}
function level29() {
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	player.modifiers.gravity = -1;
	camera.zoom = 1;
	map.mapRect(-100, 100, 225, 25);
	map.mapRect(100, 100, 25, 2025);
	map.mapRect(225, -150, 25, 2150);
	map.mapRect(115, 600, 80, 25);
	map.mapRect(155, 900, 80, 25);
	map.mapRect(115, 1200, 80, 25);
	map.mapRect(155, 1400, 80, 25);
	map.mapRect(115, 1550, 80, 25);
	map.mapRect(155, 1700, 80, 25);
	map.mapRect(115, 1850, 80, 25);

	map.mapRect(100, 2100, 275, 25);
	map.mapRect(350, 1800, 25, 325);
	map.mapRect(225, 1975, 90, 25);
	map.mapRect(225, 1800, 150, 25);
	let gravityBoost1 = map.boost(155, 400, "gravity");
	let gravityBoost2 = map.boost(155, 2000, "gravity");
	map.exit = new Rect(275, 1935, 20, 40);
	map.custom = () => {
		gravityBoost1.query();
		gravityBoost2.query();
	};
	map.customBottom = () => {
		gravityBoost1.draw();
		gravityBoost2.draw();
	};
	map.customTop = () => {};
}
function level30() {
	map.sequenceLimit = 1e15;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	map.mapRect(-20, -20, 40, 5);
	map.mapRect(-20, -20, 5, 40);
	map.mapRect(-20, 15, 40, 5);
	map.mapRect(15, -20, 5, 40);
	map.exit = new Rect(1e100, 1e100, 0, 0);
	map.custom = () => {};
	map.customBottom = () => {};
	map.customTop = () => {
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '40px monospace';
		ctx.textAlign = 'center';
		ctx.fillText("For you are simply stuck in a void...", cam.getX(0), cam.getY(-200));
	};
}