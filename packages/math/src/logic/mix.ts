export default function mix(value: number, target: number, progress: number): number {
	return value + (target - value) * progress;
}
