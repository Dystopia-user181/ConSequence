function level1() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	for (let i = 0; i < 3; i++) {
		map.mapRect(-100, 100 - i*200, 200, 25);
		map.mapRect(150, 0 - i*200, 200, 25);
	}
	map.mapRect(-400, -500, 500, 25);
	map.mapRect(-400, -1225, 25, 750);
	map.mapRect(-200, -1225, 25, 650);
	for (let i = 0; i < 2; i++) {
		map.mapRect(-400, -650 - i*300, 30, 25);
		map.mapRect(-205, -800 - i*300, 30, 25);
	}
	map.mapRect(-230, -1240, 500, 25);
	map.exit = new Rect(200, -1280, 20, 40);
	map.custom = ()=>{};
	map.customBottom = ()=>{
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("A long journey awaits you.", cam.getX(-350), cam.getY(-550));
	};
	map.customTop = ()=>{};
}
function level2() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 525, 25);
	map.mapRect(400, 100, 25, 500);
	map.mapRect(525, -300, 25, 900);
	map.mapRect(400, 700, 150, 25);
	map.mapRect(300, 575, 125, 25);
	map.mapRect(525, 575, 125, 25);

	map.mapRect(300, 575, 25, 825);
	map.mapRect(625, 575, 25, 825);
	map.mapRect(400, 700, 25, 700);
	map.mapRect(525, 700, 25, 900);

	map.mapRect(525, 1575, 700, 25);

	for (let i = 0; i < 15; i++) {
		map.mapRect(900 + i*50, 1500 - i*50, 50, 12);
		if (i < 5) map.mapRect(1750 + i*200, 700, 60, 12);
	}

	map.mapRect(1669, 0, 12, 600);
	map.exit = new Rect(2570, 660, 20, 40);
	map.custom = ()=>{};
	map.customBottom = ()=>{
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("Many challenges are ahead.", cam.getX(0), cam.getY(-200));
		ctx.fillText("Challenges of time.", cam.getX(575), cam.getY(1500));
	};
	map.customTop = ()=>{};
}
function level3() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 950, 25);
	map.mapRect(825, 125, 50, 25);
	map.mapRect(1350, 125, 50, 25);
	map.mapRect(1375, 100, 500, 25);
	map.bodyRect(300, 50, 500, 25);

	map.mapRect(1900, -50, 100, 25);
	map.mapRect(1900, -210, 100, 25);
	map.mapRect(1900, -300, 100, 25);
	map.mapRect(1900, -400, 100, 25);
	map.mapRect(1300, -500, 500, 25);
	map.bodyRect(1500, -600, 100, 100);
	map.mapRect(1400, -800, 25, 150);
	map.mapRect(1300, -700, 25, 225);

	map.mapRect(1400, -800, 800, 25);
	map.mapRect(1500, -950, 600, 25);
	map.mapRect(1475, -975, 26, 50);
	map.mapRect(2099, -975, 26, 50);
	map.mapRect(1250, -900, 100, 25);
	map.mapRect(2350, -900, 100, 25);
	map.mapRect(1100, -1000, 100, 25);
	map.mapRect(1100, -1100, 100, 25);
	map.mapRect(1250, -1200, 250, 25);
	map.mapRect(2100, -1200, 250, 25);
	map.bodyRect(1510, -1300, 50, 350);
	map.exit = new Rect(2200, -1240, 20, 40);
	map.custom = ()=>{};
	map.customBottom = ()=>{
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("In a broken landscape.", cam.getX(0), cam.getY(-100));
	};
	map.customTop = ()=>{};
}
function level4() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 725, 25);
	for (let i = 0; i < 2; i++) {
		map.mapRect(600 + i*350, 100, 25, 300);
		map.deathRect(600 + i*350, 400, 350, 25);
		map.mapRect(925 + i*350, 100, 25, 300);
	}
	map.deathRect(1350, -300, 12, 780);
	map.mapRect(1362, -300, 13, 780);

	map.mapRect(400, 480, 975, 25);
	map.mapRect(1200, 475, 25, 6);
	map.mapRect(1199, 424, 25, 6);
	map.mapRect(1000, 424, 25, 6);
	map.mapRect(925, 475, 25, 6);
	map.deathRect(500, 340, 40, 140);
	map.mapRect(-100, 700, 1700, 25);
	map.mapRect(1575, -1000, 25, 1725);
	map.mapRect(-100, -700, 25, 1425);
	map.mapRect(1000, 575, 375, 150);

	map.exit = new Rect(1465, 660, 20, 40);

	let door = map.door(1375, -500, 20, 1200, 5);

	let anim = 0;
	let dontDisplay = false;
	map.custom = ()=>{
		if (player.rect.pos.x > 1095 && player.rect.pos.y > 505 && anim < 1 && !dontDisplay)
			anim = 1;

		door.query();
	};
	map.customBottom = ()=>{
		if (dontDisplay) return;
		ctx.fillStyle = "#1f1";
		ctx.shadowBlur = 15;
		ctx.shadowColor = "#1f1";
		drawRect(1100, 515, 50, 50);

		ctx.strokeStyle = "#000";
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.moveTo(cam.getX(1125), cam.getY(522));
		ctx.lineTo(cam.getX(1132), cam.getY(540));
		ctx.moveTo(cam.getX(1132), cam.getY(522));
		ctx.lineTo(cam.getX(1125), cam.getY(540));

		ctx.moveTo(cam.getX(1138), cam.getY(522));
		ctx.lineTo(cam.getX(1145), cam.getY(540));
		ctx.moveTo(cam.getX(1145), cam.getY(522));
		ctx.lineTo(cam.getX(1138), cam.getY(540));
		ctx.stroke();

		ctx.strokeStyle = "#f00";
		ctx.shadowBlur = 15;
		ctx.shadowColor = "#f00";
		ctx.beginPath();
		ctx.moveTo(cam.getX(1090), cam.getY(565));
		ctx.lineTo(cam.getX(1160), cam.getY(565));
		ctx.stroke();
	};
	map.customTop = ()=>{
		if (anim > 0) {
			ctx.shadowBlur = 0;
			anim++;
			ctx.fillStyle = "#ffdd55" + ('0' + Math.min(anim*2, 255, 1000 - anim*2).toString(16)).slice(-2)
			ctx.fillRect(0, 0, c.width, c.height);

			if (anim > 180) {
				ctx.fillStyle = '#000000' + ('0' + Math.min(255, 1000 - anim*2).toString(16)).slice(-2);
				ctx.font = '30px monospace';
				ctx.textAlign = 'center';
				ctx.fillText("Something has changed while you're here.", c.width/2, c.height/2);
				dontDisplay = true;
			}
			if (anim > 400) {
				door.isOpen = true;
			}
			if (anim > 499) {
				anim = 0;
			}
		}
	};
}
function level5() {
	camera.zoom = 1
	map.sequenceLimit = 0;
	map.sequenceTimeLim = 0;
	map.mapRect(-100, 100, 200, 25);
	map.deathRect(100, 125, 1000, 25);

	map.mapRect(1100, -65, 200, 25);
	map.deathRect(1000, -265, 25, 200);
	map.mapRect(500, -265, 500, 25);

	map.deathRect(200, -415, 200, 50);
	map.mapRect(-200, -415, 401, 50);
	map.exit = new Rect(-110, -455, 20, 40);
	map.custom = ()=>{};
	map.customBottom = ()=>{
		ctx.fillStyle = '#fff';
		ctx.shadowBlur = 15;
		ctx.shadowColor = '#fff';
		ctx.font = '30px monospace';
		ctx.textAlign = 'left';
		ctx.fillText("Sometimes, dying is important.", cam.getX(200), cam.getY(-100));
	};
	map.customTop = ()=>{};
}