function level26() {
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
function level27() {
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
function level28() {
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