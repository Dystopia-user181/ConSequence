function level21() {
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
	camera.zoom = 0.7;
	map.mapRect(-100, 100, 200, 25);
	map.deathRect(-125, -490, 25, 915);
	map.mapRect(-100, 400, 601, 25);
	map.bodyRect(100, -500, 75, 900);
	map.mapRect(200, -475, 300, 50);
	map.mapRect(250, -550, 150, 40);
	map.mapRect(300, -600, 100, 60);
	map.mapRect(-125, -600, 225, 110);
	map.bodyRect(0, -625, 50, 25);

	map.mapRect(450, -2000, 50, 1550);
	let button1 = map.button(-50, 390, 100, 10);
	let door1 = map.door(400, -900, 50, 425);
	map.mapRect(375, -950, 80, 50);

	map.mapRect(500, -350, 200, 775);
	map.bodyRect(300, -1400, 75, 800);
	map.exit = new Rect(590, -390, 20, 40);
	map.custom = () => {
		button1.query();
		door1.isOpen = button1.isPressed;
		door1.query();
	};
	map.customBottom = () => {
		button1.draw();
	};
	map.customTop = () => {};
}
function level22() {
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
	camera.zoom = 0.7;

	map.mapRect(-600, 100, 2000, 25);
	map.mapRect(-600, 300, 2200, 25);
	map.mapRect(-600, -100, 600, 25);
	map.mapRect(200, -100, 1100, 25);
	map.mapRect(-600, -100, 25, 425);
	map.mapRect(975, -100, 25, 225);

	for (let i = 0; i < 4; i++) {
		map.mapRect(-300 + i*80, -90, 10, 160);
		map.mapRect(-340 + i*80, -45, 10, 170);
	}
	map.mapRect(-420, -45, 90, 10);
	map.mapRect(-460, -80, 10, 145);
	map.mapRect(-459, 35, 88, 10);
	map.mapRect(-420, -45, 10, 50);
	map.mapRect(-380, -5, 10, 75);
	map.mapRect(-420, 75, 10, 50);
	map.mapRect(-500, -45, 10, 170);
	let jumpBoost = map.boost(-557.5, 40, "jump");

	map.deathRect(190, -100, 10, 170);
	for (let i = 0; i < 2; i++) {
		map.mapRect(200 + i*80, -90, 10, 160);
		map.mapRect(240 + i*80, -45, 10, 170);

		map.mapRect(200 + i*80, 110, 10, 160);
		map.mapRect(240 + i*80, 155, 10, 170);
	}
	let button1 = map.button(700, 90, 100, 10);
	let door1 = map.door(740, 125, 20, 175);
	let button2 = map.button(850, 90, 100, 10);
	let door2 = map.door(890, 125, 20, 175);

	map.mapRect(190, -850, 20, 751);
	let mapRect1 = map.mapRect(-10, -350, 120, 20);
	for (let i = 0; i < 4; i++) {
		map.mapRect(-10, -450 - i*100, 120, 20);
	}

	map.mapRect(-20, -11350, 20, 11251);
	map.mapRect(400, -11350, 20, 11100);
	map.mapRect(400, -720, 1000, 20);

	let button3 = map.button(500, -110, 100, 10);
	let door3 = map.door(1100, -700, 20, 600);
	let button4 = map.button(650, -110, 100, 10);
	let door4 = map.door(1200, -700, 20, 600);

	map.bodyRect(1300, 125, 300, 175);

	map.mapRect(1330, -1000, 25, 960);
	map.mapRect(1030, -45, 440, 25);

	map.exit = new Rect(-10, 260, 20, 40);
	map.custom = () => {
		button1.query();
		button2.query();
		button3.query();
		button4.query();
		jumpBoost.query();
		door1.isOpen = button1.isPressed;
		door1.query();
		door2.isOpen = button2.isPressed;
		door2.query();
		door3.isOpen = button3.isPressed;
		door3.query();
		door4.isOpen = button4.isPressed;
		door4.query();
		if (player.rect.pos.y <= -380) mapRect1.width = 210;
		else mapRect1.width = 120;
	};
	map.customBottom = () => {
		button1.draw();
		button2.draw();
		button3.draw();
		button4.draw();
		jumpBoost.draw();

		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'center';
		ctx.fillText("Patience.", cam.getX(812.5), cam.getY(0));
	};
	map.customTop = () => {};
}
function level23() {
	map.sequenceLimit = 5;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	player.modifiers.gravity = 1;
	map.mapRect(-100, 100, 600, 25);
	map.mapRect(100, -50, 1325, 25);
	for (let i = 0; i < 3; i++) {
		map.mapRect(550 + i*250, 25, 50, 25);
		map.mapRect(700 + i*250, 100, 50, 25);
	}
	map.mapRect(1400, 70, 500, 55);
	map.mapRect(1400, -50, 25, 125);
	for (let i = 0; i < 4; i++)
		map.mapRect(1350 + i*150, 175, 100, 25);
	map.exit = new Rect(200, -90, 20, 40);
	map.custom = () => {};
	map.customBottom = () => {};
	map.customTop = () => {};
}
function level24() {
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
	camera.zoom = 1;
	player.modifiers.gravity = 1;
	map.mapRect(-300, -80, 200, 180);
	map.mapRect(-300, 79, 750, 25);
	for (let i = 0; i < 5; i++) {
		map.mapRect(550 + i*100, -40 - i * 179, 50, 25);
		map.mapRect(550 + i*100, -100 -i * 179, 25, 30);
	}
	map.mapRect(1050, -935, 538, 25);
	map.mapRect(1050, -995, 25, 30);
	map.mapRect(1150, -1114, 25, 204);
	map.mapRect(1150, -1348, 438, 25);
	map.deathRect(1563, -1323, 25, 388);
	let gravityBoost = map.boost(1349, -1139, "gravity");

	map.exit = new Rect(-210, -120, 20, 40);
	map.custom = () => {
		gravityBoost.query();
	};
	map.customBottom = () => {
		gravityBoost.draw();
	};
	map.customTop = () => {};
}
function level25() {
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
	camera.zoom = 0.8;
	player.modifiers.gravity = 1;
	map.mapRect(-200, 100, 400, 50);
	map.mapRect(-200, -59, 120, 25);
	map.mapRect(-200, -208, 120, 25);
	map.deathRect(200, 125, 450, 25);
	map.bodyRect(75, 60, 125, 40);

	let button = map.button(-190, -69, 100, 10);
	let button2 = map.button(-190, -218, 100, 10);
	let door = map.door(100, 100, 550, 25, 10).horizontal(RIGHT).open();

	map.mapRect(650, 100, 256, 50);
	map.mapRect(905, -200, 25, 350);
	map.mapRect(625, -200, 281, 70);
	map.mapRect(625, -70, 125, 100);
	map.mapRect(780, -60, 25, 90);
	map.mapRect(780, -60, 126, 25);

	let door2 = map.door(780, 30, 25, 70, 10);

	let gravityBoost = map.boost(855, -125, "gravity");

	map.exit = new Rect(845, 60, 20, 40);
	map.custom = () => {
		button.query();
		door.isOpen = !button.isPressed;
		door.query();
		button2.query();
		door2.isOpen = button2.isPressed;
		door2.query();
		gravityBoost.query();
	};
	map.customBottom = () => {
		button.draw();
		button2.draw();
		gravityBoost.draw();
	};
	map.customTop = () => {};
}