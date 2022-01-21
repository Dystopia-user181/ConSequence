window.addEventListener("keydown", e => {
	let key = e.key;
	if (key.toLowerCase() != "r") key = key.toLowerCase();
	switch (key) {
		case "a": case "arrowleft":
			controls.a(); break;
		case "d": case "arrowright":
			controls.d(); break;
		case "w": case "arrowup":
			controls.w(); break;
		case "s": case "arrowdown":
			controls.s(); break;
		case "R":
			map.new();
			cont();
			break;
		case "escape": if (settings.playing) {if (settings.paused) cont(); else pause();}
	}
})

window.addEventListener("keyup", e => {
	let key = e.key.toLowerCase();
	switch (key) {
		case "a": case "arrowleft": controls.aNo(); break
		case "d": case "arrowright": controls.dNo(); break
		case "w": case "arrowup": controls.wNo(); break
		case "s": case "arrowdown": controls.sNo(); break
	}
})

let controls = {
	backward: 0,
	forward: 0,
	jump: 0,
	down: 0,
	wBtn: document.querySelector('#control-w'),
	aBtn: document.querySelector('#control-a'),
	sBtn: document.querySelector('#control-s'),
	dBtn: document.querySelector('#control-d'),
	a() {
		controls.backward = 1;
		controls.aBtn.className = "controlBtn active";
	},
	d() {
		controls.forward = 1;
		controls.dBtn.className = "controlBtn active";
	},
	w() {
		controls.jump = 1;
		controls.wBtn.className = "controlBtn active";
	},
	s() {
		controls.down = 1;
		controls.sBtn.className = "controlBtn active";
	},
	aNo() {
		controls.backward = 0;
		controls.aBtn.className = "controlBtn";
	},
	dNo() {
		controls.forward = 0;
		controls.dBtn.className = "controlBtn";
	},
	wNo() {
		controls.jump = 0;
		controls.wBtn.className = "controlBtn";
	},
	sNo() {
		controls.down = 0;
		controls.sBtn.className = "controlBtn";
	}
}

let controlKeys = ['w', 'a', 's', 'd']
controlKeys.forEach(key => {
	let el = document.querySelector('#control-' + key);
	el.addEventListener("touchstart", controls[key]);
	el.addEventListener("touchend", controls[key + "No"]);
	el.addEventListener("touchcancel", controls[key + "No"]);
})

function openControls() {
	document.querySelector("#controlsdiv").style.display = "flex";
}
function closeControls() {
	document.querySelector("#controlsdiv").style.display = "none";
}