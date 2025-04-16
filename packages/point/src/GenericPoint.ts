export interface GenericPoint<T> {
	add(v: number): GenericPoint<T>;
	add(other: GenericPoint<T>): GenericPoint<T>;

	sub(v: number): GenericPoint<T>;
	sub(other: GenericPoint<T>): GenericPoint<T>;

	mul(v: number): GenericPoint<T>;
	mul(other: GenericPoint<T>): GenericPoint<T>;

	div(v: number): GenericPoint<T>;
	div(other: GenericPoint<T>): GenericPoint<T>;

	set(other: GenericPoint<T>): GenericPoint<T>;

	normalize(): GenericPoint<T>;

	distance(other: GenericPoint<T>): number;
	length(): number;

	clone(): GenericPoint<T>;
}
