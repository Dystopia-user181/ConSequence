function level16() {
	camera.zoom = 1;
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
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
}
function level17() {
	camera.zoom = 0.6;
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
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
}
function level18() {
	camera.zoom = 0.8;
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
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
}
function level19() {
	camera.zoom = 0.8;
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 450, 50);
	map.mapRect(450, 100, 450, 50);
	map.bodyRect(350, -60, 100, 310);

	map.deathRect(-100, -400, 50, 550);
	map.mapRect(-100, -400, 200, 200);

	map.deathRect(850, -400, 50, 550);
	map.mapRect(700, -400, 200, 200);

	map.deathRect(100, -400, 600, 25);

	map.mapRect(-100, -225, 320, 25);
	map.mapRect(580, -225, 320, 25);

	map.mapRect(150, 250, 500, 50);
	map.deathRect(125, 150, 25, 150);
	map.deathRect(650, 150, 25, 150);

	let button = map.button(110, -235, 100, 10);
	let button2 = map.button(590, -235, 100, 10);
	let button3 = map.button(160, 240, 100, 10);
	let button4 = map.button(540, 240, 100, 10);
	let door = map.door(650, -200, 25, 300);
	let door2 = map.door(725, -200, 25, 300);
	let door3 = map.door(612.5, -200, 25, 300);
	let door4 = map.door(687.5, -200, 25, 300);

	map.exit = new Rect(790, 60, 20, 40);
	map.custom = () => {
		button.query();
		button2.query();
		button3.query();
		button4.query();
		door.isOpen = button.isPressed;
		door.query();
		door2.isOpen = button2.isPressed;
		door2.query();
		door3.isOpen = button3.isPressed;
		door3.query();
		door4.isOpen = button4.isPressed;
		door4.query();
	};
	map.customBottom = () => {
		button.draw();
		button2.draw();
		button3.draw();
		button4.draw();
	};
	map.customTop = () => {};
}
function level20() {
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