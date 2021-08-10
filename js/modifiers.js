let modifiers = {
	jump: {
		active: false,
		title: "Jump boost",
		desc: "jump higher when nearer your parallel selves"
	},
	unstable: {
		title: "Instability",
		desc: "all sequences after the first sequence last only 60s",
		nerf: true
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
		if (!player.modifiers[i]) continue;
		if (modifiers[i].nerf) str += "<span class='nerf'>";
		str += "<span style='font-size: 25px;'>" + modifiers[i].title
		if (player.modifiers[i] > 1) str += " (x" + player.modifiers[i] + ")";
		str += "</span><br>"
		str +=  "<span style='font-size: 15px;'>" + modifiers[i].desc + "</span>";
		if (modifiers[i].nerf) str += "</span>";
		str += "<br><br>";
	}
	document.querySelector("#modifiertext").innerHTML = str;
}