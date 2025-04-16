export interface GenericPoint<T> {
	add(v: number): T;
	add(other: T): T;

	sub(v: number): T;
	sub(other: T): T;

	mul(v: number): T;
	mul(other: T): T;

	div(v: number): T;
	div(other: T): T;

	set(other: T): T;

	normalize(): T;

	distance(other: T): number;
	length(): number;

	clone(): T;
}
