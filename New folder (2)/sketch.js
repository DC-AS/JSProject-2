let canvas;
let cubes = [];
let cubeSize = {
	width: 60,
	height: 60
};

function setup() {
	canvas = createCanvas(700, 700);
	canvas.mouseClicked(mouseClick);
}

function draw() {
	// Background and cursor
	background(0, 0, 80); 
	cursor(CROSS);

	// Text
	textSize(32);
	fill(color(255, 255, 255));
	text('Click to drop a cube', 10, 30);

	// Draw cubes
	for(let i = cubes.length - 1; i >= 0; i--) {
		// Check if the cube is off-screen
		if(	cubes[i].pos.x > width || cubes[i].pos.x < 0 ||
			cubes[i].pos.y > height || cubes[i].pos.y < 0
		) {
			cubes.splice(i, 1);
			continue;
		}

		cubes[i].update();
		cubes[i].show();
	}
}

// Create a new cube on click
function mouseClick() {
	cubes.push(
		new Cube(mouseX, mouseY)
	);
}

// Returns a random P5 Color
function getRandomColor() {
	return color(random(255), random(255), random(255));
}

// Cube "class"
function Cube(posX, posY) {
	this.pos = {
		x: posX,
		y: posY
	};

	this.color = getRandomColor();
	this.angle = random(360);
	this.speed = random(5) + 5;
	this.xspeed = 0;
	this.yspeed = 0;
	this.rotation = 0;
}

// Function to update the cube
Cube.prototype.update = function() {
	this.xspeed = this.speed * cos(this.angle);
	this.yspeed = this.speed * sin(this.angle);

	this.pos.x += this.xspeed;
	this.pos.y += this.yspeed;

	this.rotation += 0.01;
	this.speed += 0.05;
}

// Function to show the cube
Cube.prototype.show = function() {
	fill(this.color);
	rotate(this.rotation);
	rect(this.pos.x - (cubeSize.width / 2), this.pos.y - (cubeSize.height / 2), cubeSize.width, cubeSize.height);
}