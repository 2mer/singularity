export interface GenericPoint<T extends GenericPoint<T>> {
	add(v: number): this;
	add(other: this): this;

	sub(v: number): this;
	sub(other: this): this;

	mul(v: number): this;
	mul(other: this): this;

	div(v: number): this;
	div(other: this): this;

	set(other: this): this;

	normalize(): this;

	distance(other: this): number;
	length(): number;

	clone(): T;
	equals(other: T): boolean;
}
