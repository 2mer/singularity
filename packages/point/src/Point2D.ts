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

	add(x: number, y?: number): this;
	add(other: AbstractPoint2D): this;
	add(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a + b);
		return this;
	}

	sub(x: number, y?: number): this;
	sub(other: AbstractPoint2D): this;
	sub(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a - b);
		return this;
	}

	mul(x: number, y?: number): this;
	mul(other: AbstractPoint2D): this;
	mul(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a * b);
		return this;
	}

	div(x: number, y?: number): this;
	div(other: AbstractPoint2D): this;
	div(...args: any[]) {
		const other = h(args);
		this.crush(other, (a, b) => a / b);
		return this;
	}

	set(x: number, y?: number): this;
	set(other: AbstractPoint2D): this;
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

	reach(other: AbstractPoint2D, minDistance: number, maxTravel: number = Infinity): this {
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
	distance(other: AbstractPoint2D): number;
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

	dot(x: number, y: number): number;
	dot(other: AbstractPoint2D): number;
	dot(...args: any[]) {
		const other = h(args);

		return (this.x * other.x) + (this.y * other.y);
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
		this.rotate(degrees * (Math.PI / 180))

		return this;
	}

	crush(other: AbstractPoint2D, combinator: (a: number, b: number) => number) {
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

	simple() {
		return { x: this.x, y: this.y };
	}

	hash() {
		return `${this.x},${this.y}`
	}

	equals(other: AbstractPoint2D) {
		return this.x === other.x && this.y === other.y
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

function vec2(...args: ConstructorParameters<typeof Point2D>) {
	return new Point2D(...args);
}

vec2.wrap = Point2D.wrap;

export { vec2 };