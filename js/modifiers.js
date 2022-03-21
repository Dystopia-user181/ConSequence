let modifiers = {
	jump: {
		active: false,
		title: "Jump Boost",
		desc: "Jump higher when nearer your parallel selves",
		get effective() {
			return player.modifiers.jump;
		}
	},
	gravity: {
		get title() {
			let m = player.modifiers.gravity;
			switch (Math.sign(m) + Math.sign(m + 1) + Math.sign(m + 2)) {
				case 3:
					return "Gravitate";
				case 0:
					return "Buoyant";
				case -2:
					return "Anti-gravity";
				case -3:
					return "Levitate";
			}
		},
		get desc() {
			let m = player.modifiers.gravity;
			switch (Math.sign(m) + Math.sign(m + 1) + Math.sign(m + 2)) {
				case 3:
					return "Gravity is stronger";
				case 0:
					return "Gravity is weaker";
				case -2:
					return "Gravity is removed";
				case -3:
					return "Gravity is inverted";
			}
		},
		get nerf() {
			return player.modifiers.gravity > 0;
		},
		nullify: true,
		get effective() {
			let m = player.modifiers.gravity;
			switch (Math.sign(m) + Math.sign(m + 1) + Math.sign(m + 2)) {
				case 3:
					return m;
				case 0:
					return 1;
				case -2:
					return 1;
				case -3:
					return -m - 2;
			}
		}
	}
}

function updateModifierHUD() {
	let modifierSum = 0;
	for (let i in player.modifiers) {
		modifierSum += Math.abs(player.modifiers[i]);
	}
	if (modifierSum == 0) {
		document.querySelector("#modifierdiv").style.display = "none";
		return;
	} else {
		document.querySelector("#modifierdiv").style.display = "block";
	}
	let str = "<span id=\"modifiertext\">Modifiers:</span><br><br>";
	for (let i in player.modifiers) {
		if (!player.modifiers[i]) continue;
		if (modifiers[i].nerf) str += "<span class='nerf'>";
		str += "<span style='font-size: 25px;'>" + modifiers[i].title
		if (modifiers[i].effective != 0) str += " (" + modifiers[i].effective + "x)";
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
			if ((this.nullify != undefined) ? this.nullify : modifiers[this.type].nullify)
				player.modifiers[this.type]--;
			else
				player.modifiers[this.type]++;

			this.hasPicked = true;
			updateModifierHUD();
		}
	}
	draw() {
		if (!this.hasPicked)
			modifiers[this.type].draw(this.x, this.y + Math.sin(map.sequenceTime/9)*5, this.nullify);
	}
	setNullify() {
		this.nullify = true;
		return this;
	}
}