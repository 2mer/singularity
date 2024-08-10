function h([x, y = x]: any[]): Point2D {
	if (x instanceof Point2D) {
		return x;
	}

	return new Point2D(x, y);
}

export abstract class AbstractPoint2D {

	abstract get x(): number;
	abstract get y(): number;
	abstract set x(v: number);
	abstract set y(v: number);

	add(x: number, y?: number): Point2D;
	add(other: Point2D): Point2D;
	add(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a + b);
		return this;
	}

	sub(x: number, y?: number): Point2D;
	sub(other: Point2D): Point2D;
	sub(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a - b);
		return this;
	}

	mul(x: number, y?: number): Point2D;
	mul(other: Point2D): Point2D;
	mul(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a * b);
		return this;
	}

	div(x: number, y?: number): Point2D;
	div(other: Point2D): Point2D;
	div(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a / b);
		return this;
	}

	set(x: number, y?: number): Point2D;
	set(other: Point2D): Point2D;
	set(...args: any[]) {
		const other = h(args);
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	length() {
		return this.distance(0);
	}

	normalize() {
		const l = this.length();
		this.map(v => v / l);
		return this;
	}

	reach(other: Point2D, minDistance: number, maxTravel: number = Infinity): Point2D {
		const otherDist = this.distance(other);

		if (otherDist < minDistance) return this;

		if (otherDist > maxTravel) {
			const newPos = this.clone().sub(other).normalize().mul(-maxTravel).add(this);

			this.set(newPos);
		} else {
			const newPos = other.clone().sub(this).normalize().mul(-minDistance).add(other);

			this.set(newPos);
		}

		return this;
	}

	distance(x: number, y?: number): number;
	distance(other: Point2D): number;
	distance(...args: any[]) {
		const other = h(args);

		return Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2))
	}

	floor() {
		this.map(Math.floor);
		return this;
	}

	ceil() {
		this.map(Math.ceil);
		return this;
	}

	round() {
		this.map(Math.round);
		return this;
	}

	dot(other: Point2D) {
		return (this.x * other.y) + (this.y * other.x);
	}

	clone() {
		return new Point2D(this.x, this.y);
	}

	rotate(angle: number) {
		const cs = Math.cos(angle);
		const sn = Math.sin(angle);
		const px = this.x * cs - this.y * sn;
		const py = this.x * sn + this.y * cs;

		this.set(px, py);

		return this;
	}

	rotateDeg(degrees: number) {
		this.rotate(degrees / (Math.PI * 2))

		return this;
	}

	crush(other: Point2D, combinator: (a: number, b: number) => number) {
		this.x = combinator(this.x, other.x);
		this.y = combinator(this.y, other.y);

		return this;
	}

	map(mapper: (a: number) => number) {
		this.x = mapper(this.x);
		this.y = mapper(this.y);

		return this;
	}

	tuple() {
		return [this.x, this.y] as [x: number, y: number];
	}

	hash() {
		return `${this.x},${this.y}`
	}
}

export class Point2D extends AbstractPoint2D {

	constructor(public x: number = 0, public y: number = 0) {
		super();
	}

	static wrap<T extends Point2DLike>(data: T) {
		return new Point2DWrapper(data);
	}
}

export type Point2DLike = { x: number, y: number };
export class Point2DWrapper<T extends Point2DLike> extends AbstractPoint2D {
	get x(): number {
		return this.data.x;
	}
	set x(v: number) {
		this.data.x = v;
	}
	get y(): number {
		return this.data.y
	}
	set y(v: number) {
		this.data.y = v;
	}

	constructor(private data: T) {
		super();
	}

	unwrap() {
		return this.data;
	}

}