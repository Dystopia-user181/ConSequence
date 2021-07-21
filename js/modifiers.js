let modifiers = {
	jump: {
		active: false,
		desc: "Jump Boost: jump higher when near your past selves"
	}
}

function updateModifierHUD() {
	let modifierSum = 0;
	for (let i in player.modifiers) {
		modifierSum += player.modifiers[i];
	}
	if (modifierSum <= 0) {
		document.querySelector("#modifierdiv").style.display = "none";
		return;
	} else {
		document.querySelector("#modifierdiv").style.display = "block";
	}
	let str = "<h3 style='font-size: 30px'>Modifiers</h3>";
	for (let i in player.modifiers) {
		str += modifiers[i].desc;
		if (player.modifiers[i] > 1) str += " (x" + player.modifiers[i] + ")";
		str += "<br>";
	}
	document.querySelector("#modifiertext").innerHTML = str;
}