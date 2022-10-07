title = "";

description = `
`;

characters = [];

const G = {
	WIDTH: 150,
	HEIGHT: 150
};

options = {
	viewSize: vec(G.WIDTH, G.HEIGHT),
	theme: "pixel"
};

//======== GAME OBJECTS ========//
/**
 * @typedef {{
 * pos: Vector,
 * color: string
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * color: string,
 * dir: Vector
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;


let count;
let rndColor;
let currColor;
let direction;
let spawn;
let spawnVec;
let speed;

//========= Game Function ========//
function update() {
	if (!ticks) {
		speed = 1;
		enemies = [];
		currColor = true;
		direction = rndi(0,4);
		spawn = true;

		// Init the character
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			color: "red"
		};
	}

	// Enemy Spawn
	if (spawn) {

		// Choose a random color (Blue / Red)
		if (rndi(0,2)) rndColor = "red";
		else rndColor = "blue"

		if (direction == 0) {
			spawnVec = vec(75, -5);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,1) });
		}
		if (direction == 1) {
			spawnVec = vec(75, 155);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,-1) });
		}
		if (direction == 2) {
			spawnVec = vec(-5, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(1,0) });
		}
		if (direction == 3) {
			spawnVec = vec(155, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(-1,0) });
		}

		console.log(enemies.length + " (" + enemies[0].pos.x + "," + enemies[0].pos.y + ")");
		// Turn off spawn until need to spawn again
		spawn = !spawn;
	}

	// Draw Enemies
	remove(enemies, (e) => {
		e.pos.x += e.dir.x * speed;
		e.pos.y += e.dir.y * speed;
		if (e.color == "red")  color("red");
		if (e.color == "blue") color ("blue");
		box(e.pos, 6);
		return (e.pos.x > 73 && e.pos.x < 77 && e.pos.y > 73 && e.pos.y < 77);
	})

	// Draw Player and Player Color Change
	if (input.isJustPressed) {
		currColor = !currColor;
		// spawn != spawn;
	}
	if (currColor) {
		color("red");
		player.color = "red";
	}
	if (!currColor) {
		color("blue");
		player.color = "blue";
	}
	box(player.pos, 6);

	// Game Border (KEEP AT THE END!!!)
	// color("light_blue");
	// rect(0, 0, 150, 8);
	// rect(0, 142, 150, 8);
	// rect(0, 0, 8, 150);
	// rect(142, 0, 8, 150);
}