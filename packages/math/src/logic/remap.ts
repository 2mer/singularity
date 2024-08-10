export default function remap(
	value: number,
	fromStart: number,
	fromEnd: number,
	toStart: number,
	toEnd: number
): number {
	return toStart + ((value - fromStart) * (toEnd - toStart)) / (fromEnd - fromStart);
}