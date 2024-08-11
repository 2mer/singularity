import { Point2D, vec2 } from "./Point2D";

describe('Point2D', () => {
	describe('math', () => {
		it('should create a point with default values', () => {
			const point = new Point2D();
			expect(point.x).toBe(0);
			expect(point.y).toBe(0);
		});

		it('should create a point with provided values', () => {
			const point = new Point2D(3, 4);
			expect(point.x).toBe(3);
			expect(point.y).toBe(4);
		});

		it('should calculate the length of the point', () => {
			const point = new Point2D(3, 4);
			expect(point.length()).toBe(5);
		});

		it('should normalize the point', () => {
			const point = new Point2D(3, 4);
			point.normalize();
			expect(point.x).toBeCloseTo(0.6);
			expect(point.y).toBeCloseTo(0.8);
		});

		it('should calculate the distance between two points', () => {
			const point1 = new Point2D(1, 1);
			const point2 = new Point2D(4, 5);
			expect(point1.distance(point2)).toBe(5);
		});

		it('should rotate the point by a given angle', () => {
			const point = new Point2D(1, 0);
			point.rotate(Math.PI / 2);
			expect(point.x).toBeCloseTo(0);
			expect(point.y).toBeCloseTo(1);
		});

		it('should correctly add', () => {
			expect(new Point2D(1, 2).add(1).simple()).toEqual({ x: 2, y: 3 })
			expect(new Point2D(1, 2).add(1, 0).simple()).toEqual({ x: 2, y: 2 })
			expect(new Point2D(1, 2).add(vec2(1, 0)).simple()).toEqual({ x: 2, y: 2 })
		})

		it('should correctly subtract', () => {
			expect(new Point2D(1, 2).sub(1).simple()).toEqual({ x: 0, y: 1 })
			expect(new Point2D(1, 2).sub(1, 0).simple()).toEqual({ x: 0, y: 2 })
			expect(new Point2D(1, 2).sub(vec2(1, 0)).simple()).toEqual({ x: 0, y: 2 })
		})

		it('should correctly multiply', () => {
			expect(new Point2D(1, 2).mul(3).simple()).toEqual({ x: 3, y: 6 })
			expect(new Point2D(1, 2).mul(3, 1).simple()).toEqual({ x: 3, y: 2 })
			expect(new Point2D(1, 2).mul(vec2(3, 1)).simple()).toEqual({ x: 3, y: 2 })
		})

		it('should correctly divide', () => {
			expect(new Point2D(1, 2).div(2).simple()).toEqual({ x: 0.5, y: 1 })
			expect(new Point2D(1, 2).div(2, 1).simple()).toEqual({ x: 0.5, y: 2 })
			expect(new Point2D(1, 2).div(vec2(2, 1)).simple()).toEqual({ x: 0.5, y: 2 })
		})

		it('should correctly floor', () => {
			expect(new Point2D(0.6, 1.3).floor().simple()).toEqual({ x: 0, y: 1 })
		})

		it('should correctly ceil', () => {
			expect(new Point2D(0.6, 1.3).ceil().simple()).toEqual({ x: 1, y: 2 })
		})

		it('should correctly round', () => {
			expect(new Point2D(0.6, 1.3).round().simple()).toEqual({ x: 1, y: 1 })
		})

		it('should correctly check equality', () => {
			expect(new Point2D(1, 2).equals(new Point2D(1, 2))).toBe(true)
			expect(new Point2D(1, 2).equals(new Point2D(1, 1))).toBe(false)
		})

		it('should correctly clone', () => {
			const original = new Point2D(1, 2);
			const clone = original.clone();

			expect(clone).not.toBe(original);

			expect(original.equals(clone)).toBe(true);
			expect(clone.equals(original)).toBe(true);

			clone.add(1);

			expect(original.equals(clone)).toBe(false);
			expect(clone.equals(original)).toBe(false);
		})

		it('should calculate the dot product with another point', () => {
			const point1 = new Point2D(3, 4);
			const point2 = new Point2D(2, 1);
			const dotProduct = point1.dot(point2);
			expect(dotProduct).toBe(10); // (3 * 2) + (4 * 1) = 6 + 4 = 10
		});

		it('should calculate the dot product with x and y values', () => {
			const point = new Point2D(5, 6);
			const dotProduct = point.dot(3, 2);
			expect(dotProduct).toBe(27); // (5 * 2) + (6 * 3) = 10 + 18 = 28
		});

		it('should rotate the point by a given angle in degrees', () => {
			const point = new Point2D(1, 0);
			point.rotateDeg(90);
			expect(point.x).toBeCloseTo(0, 5); // Rotated 90 degrees should result in (0, 1)
			expect(point.y).toBeCloseTo(1, 5);
		});

		it('should rotate the point by a negative angle in degrees', () => {
			const point = new Point2D(0, 1);
			point.rotateDeg(-90);
			expect(point.x).toBeCloseTo(1, 5); // Rotated -90 degrees should result in (1, 0)
			expect(point.y).toBeCloseTo(0, 5);
		});

		it('should rotate the point by 360 degrees', () => {
			const point = new Point2D(3, 4);
			point.rotateDeg(360);
			expect(point.x).toBeCloseTo(3, 5); // Rotating by 360 degrees should return to original position
			expect(point.y).toBeCloseTo(4, 5);
		});

		it('should rotate the point by 45 degrees', () => {
			const point = new Point2D(1, 1);
			point.rotateDeg(45);
			expect(point.x).toBeCloseTo(0, 5); // Rotating by 45 degrees should result in a 45-degree rotation
			expect(point.y).toBeCloseTo(Math.sqrt(2), 5); // Should result in a length of √2 for x and y
		});

		it('should return the point as a tuple', () => {
			const point = new Point2D(3, 4);
			const tuple = point.tuple();
			expect(tuple).toEqual([3, 4]);
		});

		it('should return a tuple with default values', () => {
			const point = new Point2D();
			const tuple = point.tuple();
			expect(tuple).toEqual([0, 0]);
		});

		it('should return a tuple with negative values', () => {
			const point = new Point2D(-5, -7);
			const tuple = point.tuple();
			expect(tuple).toEqual([-5, -7]);
		});

		it('should return a tuple with decimal values', () => {
			const point = new Point2D(1.5, 2.5);
			const tuple = point.tuple();
			expect(tuple).toEqual([1.5, 2.5]);
		});

		it('should apply a mapper function to both x and y', () => {
			const point = new Point2D(3, 4);
			point.map(value => value * 2);
			expect(point.x).toBe(6); // 3 * 2 = 6
			expect(point.y).toBe(8); // 4 * 2 = 8
		});

		it('should apply a mapper function that adds a constant to both x and y', () => {
			const point = new Point2D(1, 2);
			point.map(value => value + 5);
			expect(point.x).toBe(6); // 1 + 5 = 6
			expect(point.y).toBe(7); // 2 + 5 = 7
		});

		it('should apply a mapper function that rounds both x and y', () => {
			const point = new Point2D(1.5, 2.7);
			point.map(Math.round);
			expect(point.x).toBe(2); // Math.round(1.5) = 2
			expect(point.y).toBe(3); // Math.round(2.7) = 3
		});

		it('should not change x and y if identity mapper is used', () => {
			const point = new Point2D(7, 8);
			point.map(value => value);
			expect(point.x).toBe(7);
			expect(point.y).toBe(8);
		});

		it('should crush with addition', () => {
			const point1 = new Point2D(5, 6);
			const point2 = new Point2D(3, 4);
			point1.crush(point2, (a, b) => a + b);
			expect(point1.x).toBe(8); // 5 + 3 = 8
			expect(point1.y).toBe(10); // 6 + 4 = 10
		});

		it('should crush with subtraction', () => {
			const point1 = new Point2D(10, 12);
			const point2 = new Point2D(3, 4);
			point1.crush(point2, (a, b) => a - b);
			expect(point1.x).toBe(7); // 10 - 3 = 7
			expect(point1.y).toBe(8); // 12 - 4 = 8
		});

		it('should crush with multiplication', () => {
			const point1 = new Point2D(2, 3);
			const point2 = new Point2D(4, 5);
			point1.crush(point2, (a, b) => a * b);
			expect(point1.x).toBe(8); // 2 * 4 = 8
			expect(point1.y).toBe(15); // 3 * 5 = 15
		});

		it('should crush with division', () => {
			const point1 = new Point2D(20, 30);
			const point2 = new Point2D(4, 5);
			point1.crush(point2, (a, b) => a / b);
			expect(point1.x).toBe(5); // 20 / 4 = 5
			expect(point1.y).toBe(6); // 30 / 5 = 6
		});
	});

	describe('wrapper', () => {
		it('should modify the wrapped object', () => {
			const data = { x: 1, y: 2 };

			const wrapped = Point2D.wrap(data).mul(2);

			expect(data).toEqual({ x: 2, y: 4 })
			expect(wrapped.unwrap()).toBe(data);
		})
	})

	describe('vec2', () => {
		it('should correctly alias constructor', () => {
			expect(vec2(1, 2).equals(new Point2D(1, 2))).toBe(true);
			expect(vec2(1, 2).equals(new Point2D(1, 1))).toBe(false);
		})

		it('should correctly alias wrapper', () => {
			const data = { x: 1, y: 2 };

			const wrapped = vec2.wrap(data).mul(2);

			expect(data).toEqual({ x: 2, y: 4 })
			expect(wrapped.unwrap()).toBe(data);
		})
	})
})