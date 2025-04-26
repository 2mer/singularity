export default function overflow(value: number, min: number, max: number) {
	if (value >= max) {
		return (value % max) + min;
	}

	if (value < min) {
		return max + ((value - min) % max);
	}

	return value;
}
