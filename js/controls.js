window.addEventListener("keydown", e => {
	let key = e.key;
	if (key.toLowerCase() != "r") key = key.toLowerCase();
	switch (key) {
		case "a": controls.backward = 1; player.dir = "l"; break
		case "d": controls.forward = 1; player.dir = "r"; break
		case "w": controls.jump = 1; break
		case "s": controls.down = 1; break
		case "n": if (map.level == 18) newSequence(); break
		case "R": map.new(); cont(); break
	}
})

window.addEventListener("keyup", e => {
	let key = e.key.toLowerCase();
	switch (key) {
		case "a": controls.backward = 0; break
		case "d": controls.forward = 0; break
		case "w": controls.jump = 0; break
		case "s": controls.down = 0; break
	}
})

let controls = {
	backward: 0,
	forward: 0,
	jump: 0,
	down: 0
}

function openControls() {
	document.querySelector("#controlsdiv").style.display = "flex";
}
function closeControls() {
	document.querySelector("#controlsdiv").style.display = "none";
}