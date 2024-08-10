// function h([x, y = x]: any[]): Point {
// 	if (x instanceof Point) {
// 		return x;
// 	}

// 	return new Point(x, y);
// }

// export class Point<T extends number = number> {

// 	values: number[];

// 	// constructor(public readonly dim: T, public x: number = 0, public y: number = 0) {
// 	constructor(public readonly dim: T) {
// 		this.values = Array.from({ length: dim })
// 	}

// 	add(x: number, y?: number): Point<T>;
// 	add(other: Point<T>): Point<T>;
// 	add(...args: any[]) {
// 		const other = h(args);
// 		this.crush(other, (a, b) => a + b);
// 		return this;
// 	}

// 	sub(x: number, y?: number): Point<T>;
// 	sub(other: Point<T>): Point<T>;
// 	sub(...args: any[]) {
// 		const other = h(args);
// 		this.crush(other, (a, b) => a - b);
// 		return this;
// 	}

// 	mul(x: number, y?: number): Point<T>;
// 	mul(other: Point<T>): Point<T>;
// 	mul(...args: any[]) {
// 		const other = h(args);
// 		this.crush(other, (a, b) => a * b);
// 		return this;
// 	}

// 	div(x: number, y?: number): Point<T>;
// 	div(other: Point<T>): Point<T>;
// 	div(...args: any[]) {
// 		const other = h(args);
// 		this.crush(other, (a, b) => a / b);
// 		return this;
// 	}

// 	set(x: number, y?: number): Point<T>;
// 	set(other: Point<T>): Point<T>;
// 	set(...args: any[]) {
// 		const other = h(args);
// 		this.x = other.x;
// 		this.y = other.y;
// 		return this;
// 	}

// 	length() {
// 		return this.distance(0);
// 	}

// 	normalize() {
// 		const l = this.length();
// 		this.map(v => v / l);
// 		return this;
// 	}

// 	reach(other: Point<T>, minDistance: number, maxTravel: number = Infinity): Point<T> {
// 		const otherDist = this.distance(other);

// 		if (otherDist < minDistance) return this;

// 		if (otherDist > maxTravel) {
// 			const newPos = this.clone().sub(other).normalize().mul(-maxTravel).add(this);

// 			this.set(newPos);
// 		} else {
// 			const newPos = other.clone().sub(this).normalize().mul(-minDistance).add(other);

// 			this.set(newPos);
// 		}

// 		return this;
// 	}

// 	distance(x: number, y?: number): number;
// 	distance(other: Point<T>): number;
// 	distance(...args: any[]) {
// 		const other = h(args);

// 		return Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2))
// 	}

// 	floor() {
// 		this.map(Math.floor);
// 		return this;
// 	}

// 	ceil() {
// 		this.map(Math.ceil);
// 		return this;
// 	}

// 	round() {
// 		this.map(Math.round);
// 		return this;
// 	}

// 	dot(other: Point) {
// 		return (this.x * other.y) + (this.y * other.x);
// 	}

// 	clone() {
// 		return new Point(this.x, this.y);
// 	}

// 	rotate(angle: number) {
// 		const cs = Math.cos(angle);
// 		const sn = Math.sin(angle);
// 		const px = this.x * cs - this.y * sn;
// 		const py = this.x * sn + this.y * cs;

// 		this.set(px, py);

// 		return this;
// 	}

// 	rotateDeg(degrees: number) {
// 		this.rotate(degrees / (Math.PI * 2))

// 		return this;
// 	}

// 	crush(other: Point, combinator: (a: number, b: number) => number) {
// 		this.map((v, i) => combinator(v, other[i]));

// 		return this;
// 	}

// 	map(mapper: (a: number, i: number) => number) {
// 		this.values.forEach((v, i) => {
// 			this.values[i] = mapper(v, i);
// 		})

// 		return this;
// 	}

// 	tuple() {
// 		return this.values.slice();
// 	}

// 	hash() {
// 		return this.values.join(',');
// 	}

// }