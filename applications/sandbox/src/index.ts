import clamp from "@sgty/math/clamp";
import mix from "@sgty/math/mix";
import remap from "@sgty/math/remap";
import { Point2D } from "@sgty/point";


const p = new Point2D();

p
	.map(v => clamp(v, 0, 1))
	.map(v => clamp(v, 0, 1))