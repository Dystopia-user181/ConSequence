class Rect {
	constructor(x, y, w, h, meta = {}) {
		this.pos = {x, y};
		this.width = w;
		this.height = h;
		this.meta = meta;
	}

	isColliding(other) {
		let tc = {
			p1: [this.pos.x, this.pos.y],
			p2: [this.pos.x + this.width, this.pos.y + this.height]
		}
		let oc = {
			p1: [other.pos.x, other.pos.y],
			p2: [other.pos.x + other.width, other.pos.y + other.height]
		}
		 
		// If one rectangle is on left side of other
		if (tc.p1[0] >= oc.p2[0] || oc.p1[0] >= tc.p2[0])
			return false;
	 
		// If one rectangle is above other
		if (tc.p1[1] >= oc.p2[1] || oc.p1[1] >= tc.p2[1])
			return false;

		return true;
	}

	isInside(other, allow = 1) {
		let p1 = [this.pos.x, this.pos.y],
			p2 = [this.pos.x + this.width, this.pos.y + this.height],
			r1 = [other.pos.x - allow, other.pos.y - allow],
			r2 = [other.pos.x + other.width + allow, other.pos.y + other.height + allow];
		 
		return (p1[0] > r1[0] && p2[0] < r2[0]) && (p1[1] > r1[1] && p2[1] < r2[1])
	}

	isInsideGrp(grp, allow = 1) {
		for (let i in grp) {
			if (this.isInside(grp[i], allow)) return true;
		}

		return false;
	}

	move(x, y) {
		this.pos.x += x;
		this.pos.y += y;
	}

	goto(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}

	dist(other) {
		return Math.sqrt((this.pos.x-other.pos.x)*(this.pos.x-other.pos.x) + (this.pos.y-other.pos.y)*(this.pos.y-other.pos.y));
	}

	fixPos(vel, xy, mapEls = map.map.concat(map.bodies)) {
		let sign = Math.sign(vel);
		if (sign == 0) return;
		if (!Array.isArray(mapEls)) mapEls = [mapEls];
		mapEls = mapEls.filter(_ => _.isColliding(this));
		let wh = (xy == "x") ? "width" : "height";
		for (let i in mapEls) {
			let other = mapEls[i];
			if (sign == 1) {
				this.pos[xy] = Math.min(other.pos[xy] - this[wh], this.pos[xy]);
			} else {
				this.pos[xy] = Math.max(other.pos[xy] + other[wh], this.pos[xy]);
			}
		}
		return mapEls.length > 0;
	}

	get midX() {
		return this.pos.x + this.width/2;
	}

	get midY() {
		return this.pos.y + this.height/2;
	}
}