let modifiers = {
	jump: {
		active: false,
		title: "Jump Boost",
		desc: "Jump higher when nearer your parallel selves"
	},
	gravity: {
		title: "Gravitate",
		desc: "Gravity is stronger at all times",
		nerf: true,
		nullify: true
	}
}

function updateModifierHUD() {
	let modifierSum = 0;
	for (let i in player.modifiers) {
		modifierSum += player.modifiers[i];
	}
	if (modifierSum == 0) {
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
		if (player.modifiers[i] != 0) str += " (" + player.modifiers[i] + "x)";
		str += "</span><br>"
		str +=  "<span style='font-size: 15px;'>" + modifiers[i].desc + "</span>";
		if (modifiers[i].nerf) str += "</span>";
		str += "<br><br>";
	}
	document.querySelector("#modifiertext").innerHTML = str;
}

class Boost {
	constructor (x, y, type) {
		this.hitbox = new Rect(x, y, 40, 40);
		this.type = type;
		this.hasPicked = false;
		this.x = x;
		this.y = y;
	}
	
	query() {
		if (!this.hasPicked && player.rect.isColliding(this.hitbox)) {
			if (modifiers[this.type].nullify)
				player.modifiers[this.type]--;
			else
				player.modifiers[this.type]++;

			this.hasPicked = true;
			updateModifierHUD();
		}
	}
	draw() {
		if (!this.hasPicked) modifiers[this.type].draw(this.x, this.y + Math.sin(map.sequenceTime/9)*5);
	}
}