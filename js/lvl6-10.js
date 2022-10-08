function level6() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 200, 25);
	map.mapRect(-200, -500, 100, 625);
	map.deathRect(99, 100, 631, 25);
	map.mapRect(-100, -500, 1330, 350);
	map.mapRect(705, -100, 25, 145);
	map.mapRect(730, 100, 590, 25);
	map.deathRect(600, -150, 395, 50);
	map.mapRect(770, -65, 25, 165);
	map.exit = new Rect(1190, 60, 20, 40);
	map.custom = ()=>{};
	map.customBottom = ()=>{
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("Dying may be a double edged sword.", cam.getX(0), cam.getY(0));
	};
	map.customTop = ()=>{};
}
function level7() {
	camera.zoom = 0.8
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-200, 100, 100, 860);
	map.mapRect(-200, 100, 550, 300);
	map.mapRect(300, 460, 400, 500);
	map.mapRect(600, 535, 600, 425);
	map.mapRect(750, 460, 300, 25);
	map.mapRect(1050, 300, 300, 125);
	map.mapRect(1100, 400, 250, 560);
	map.bodyRect(850, 410, 200, 50);
	map.bodyRect(1150, 250, 50, 50);
	map.mapRect(1100, -1000, 50, 1260);
	let button = map.button(1210, 290, 100, 10);
	let door = map.door(320, 400, 20, 60, 5);
	map.deathRect(100, 490, 200, 50);
	map.mapRect(-200, 910, 500, 50);
	map.exit = new Rect(90, 870, 20, 40);
	map.custom = () => {
		button.query();
		door.isOpen = button.isPressed;
		door.query();
	};
	map.customBottom = () => {
		button.draw();
	};
	map.customTop = () => {};
}
function level8() {
	camera.zoom = 1;
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-200, 100, 300, 30);
	map.mapRect(350, 100, 450, 30);
	map.deathRect(-200, 130, 1000, 30);
	map.bodyRect(-30, 85, 100, 15);

	map.mapRect(775, -400, 25, 525);
	map.mapRect(575, -200, 225, 280);
	map.mapRect(575, -400, 225, 25);

	map.mapRect(-200, -400, 25, 525);
	map.mapRect(-200, -400, 225, 25);
	map.bodyRect(-115, -50, 15, 150);

	let button = map.button(650, 90, 100, 10);
	let door = map.door(-100, -375, 20, 475, 5);
	let door2 = map.door(585, -375, 20, 175, 5);
	map.custom = () => {
		button.query();
		door.isOpen = button.isPressed;
		door.query();
		door2.isOpen = button.isPressed;
		door2.query();
	};
	map.customBottom = () => {
		button.draw();
	};
	map.customTop = () => {};
	map.exit = new Rect(678, -240, 20, 40);
}
function level9() {
	camera.zoom = 1
	map.sequenceLimit = 2;
	map.sequenceTimeLim = 0;
	map.mapRect(-500, 100, 1000, 50);
	map.mapRect(-500, -100, 25, 250);
	map.mapRect(-500, -100, 225, 25);
	map.mapRect(-300, -100, 25, 150);
	map.mapRect(475, -100, 25, 250);
	map.mapRect(275, -100, 225, 25);
	map.mapRect(275, -100, 25, 150);
	map.deathRect(300, -75, 175, 25);
	let button = map.button(337.5, 90, 100, 10);
	let door = map.door(-295, 50, 15, 50, 10);
	map.exit = new Rect(-397.5, 60, 20, 40);
	map.custom = () => {
		button.query();
		door.isOpen = button.isPressed;
		door.query();
	};
	map.customBottom = () => {
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'center';
		ctx.fillText("Dying is more important than you might think.", cam.getX(0), cam.getY(-200));
		button.draw();
	};
	map.customTop = () => {};
}
function level10() {
	camera.zoom = 1;
	map.sequenceLimit = 3;
	map.sequenceTimeLim = 0;
	map.mapRect(-500, 100, 1000, 50);
	map.mapRect(-500, -100, 25, 250);
	map.mapRect(-500, -100, 225, 25);
	map.mapRect(-300, -100, 25, 150);
	map.deathRect(475, -100, 25, 200);
	map.mapRect(275, -100, 145, 25);
	map.mapRect(275, -100, 25, 150);
	let button = map.button(337.5, 90, 100, 10);
	let button2 = map.button(310, -110, 100, 10);
	let door = map.door(-300, 50, 12.5, 50, 10);
	let door2 = map.door(-287.5, 50, 12.5, 50, 10);
	map.exit = new Rect(-397.5, 60, 20, 40);
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