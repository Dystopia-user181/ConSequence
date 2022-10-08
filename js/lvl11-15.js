function level11() {
	camera.zoom = 0.8;
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
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
}
function level12() {
	camera.zoom = 0.8;
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
	map.mapRect(-300, 100, 900, 50);
	map.bodyRect(100, -100, 50, 80);
	map.mapRect(500, -100, 300, 250);
	map.mapRect(500, -300, 25, 100);
	map.mapRect(500, -300, 300, 25);
	map.mapRect(775, -300, 25, 300);
	let button = map.button(-250, 90, 100, 10);
	let door = map.door(505, -200, 15, 100, 10);
	map.exit = new Rect(640, -140, 20, 40);
	map.custom = () => {
		button.query();
		door.isOpen = button.isPressed;
		door.query();
	};
	map.customBottom = () => {
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '25px monospace';
		ctx.textAlign = 'center';
		ctx.fillText("Perhaps the blocks don't always", cam.getX(0), cam.getY(-100));
		ctx.fillText("have to stop being solid.", cam.getX(0), cam.getY(-50));
		button.draw();
	};
	map.customTop = ()=>{};
}
function level13() {
	camera.zoom = 1
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
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
}
function level14() {
	camera.zoom = 0.7
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;

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
}
function level15() {
	camera.zoom = 0.7;
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;

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
	map.bodyRect(-450, 275, 275, 25);
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
}