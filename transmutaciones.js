/*
Transmutaciones del circulo
Es un concepto que atraviesa parte de mi trabajo. Las figuras puras y sus transmutaciones.

Transmutations of the circle
It's a concept that runs through part of my work. The pure shapes and their transmutations.

Andrés Senn - 2022 - https://www.fxhash.xyz/
Projet code: https://github.com/andrusenn/transmutacionesdelcirculo2
*/
let ps = [];
let cv;
let seed;
let rr, rrc, ny;
let num_p = 1400;
function setup() {
	// fxhash features
	window.$fxhashFeatures = {
		transmutacion: fxrand(),
	};
	seed = window.$fxhashFeatures.transmutacion * 31415926535897;
	noiseSeed(seed);
	randomSeed(seed);
	cv = createCanvas(2160, 2160);
	cv.parent("cv");
	cv.id("_TransmutacionesDelCirculo");
	cv.class("_TransmutacionesDelCirculo");
	pixelDensity(1);
	background(random(0, 255));
	rr = random(40, 400);
	rrc = map(rr, 40, 400, 400, 40);
	ny = random(600, height - 600);
	let ty1 = random(650, height - 650);
	for (let i = 0; i < num_p; i++) {
		let x = width / 2 + cos(i) * rr;
		let y = ty1 + sin(i) * rr;
		let p = new Particle(x, y, ty1);
		ps.push(p);
	}
	noStroke();
	let alp = 255;
	let r = rrc;
	let f = random(0, 255);
	for (let i = 0; i < 300; i++) {
		alp -= 255 / 300;
		if (alp < 0) {
			alp = 0;
		}
		fill(f, alp);
		r += 2;
		circle(width / 2, ny, r);
	}
	//
	document.title = `${String.fromCodePoint(
		0x26aa,
	)} Transmutaciones del c\u00edrculo | Andr\u00e9s Senn | 2022`;
	console.log(
		`%c ${
			String.fromCodePoint(0x26aa) + String.fromCodePoint(0x26ab)
		} Transmutaciones del c\u00edrculo | Andr\u00e9s Senn | fxhash 01/2022 | Projet code: https://github.com/andrusenn/transmutacionesdelcirculo2`,
		"background:#eee;border-radius:10px;background-size:15%;font-color:#222;padding:10px;font-size:15px;text-align:center;",
	);
}
function draw() {
	if (frameCount > num_p) {
		if (!isFxpreview) {
			fxpreview();
		}
		noLoop();
	}
	for (let i = 0; i < ps.length; i++) {
		ps[i].update();
		strokeWeight(ps[i].ss);
		if (frameCount == 1) {
			strokeWeight(10);
		}
		stroke(ps[i].col, 20);
		point(ps[i].pos.x, ps[i].pos.y);
		if (frameCount % ps[i].circle == 0) {
			noStroke();
			fill(ps[i].col);
			circle(ps[i].pos.x, ps[i].pos.y, 5);
		}
	}
}
function keyReleased() {
	if (key == "s" || key == "S") {
		let date =
			year() +
			"" +
			month() +
			"" +
			day() +
			"" +
			hour() +
			"" +
			minute() +
			"" +
			second() +
			"" +
			".png";
		console.log(
			`%c SAVING ${
				String.fromCodePoint(0x1f5a4) + String.fromCodePoint(0x1f90d)
			}`,
			"background: #000; color: #ccc;padding:5px;font-size:15px",
		);
		saveCanvas("tdc_" + date);
	}
}
class Particle {
	constructor(_x, _y, py) {
		this.ss = random(0.6, 4);
		this.col = 0;
		this.py = py;
		this.pos = createVector(_x, _y);
		this.vel = createVector(0, 0);
		this.dir = createVector(0, 0);
		this.a = TAU;
		this.offset = random(0.1, 0.5);
		this.dil = 3;
		this.noise_size = 0.001;
		this.noise_size2 = 0.001;
		this.n = 0;
		this.n2 = 0;
		this.colc = int(random(100, 400));
		this.circle = int(random(300, 1000));
	}
	update() {
		this.n = noise(
			this.pos.x * this.noise_size,
			this.pos.y * this.noise_size,
			this.offset,
		);
		this.n2 = noise(
			this.pos.x * this.noise_size2,
			this.pos.y * this.noise_size2,
			this.offset,
		);
		this.dil = map(this.n2, 0, 1, 2, 5);
		this.noise_size = map(this.n2, 0, 1, 0.001, 0.007);
		this.col = 0;
		if (frameCount % this.colc > this.colc / 2) {
			this.col = 255;
		}
		this.dir.x = cos(this.a * this.n * this.dil);
		this.dir.y = sin(this.a * this.n * this.dil);
		this.vel.add(this.dir);
		this.vel.mult(0.5);
		this.pos.add(this.vel);
	}
}
