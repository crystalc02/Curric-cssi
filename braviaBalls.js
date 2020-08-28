// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSL, background, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, windowHeight, windowWidth, width, mouseX, mouseY
 */

let dots, hitSound;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSL, 360, 100, 100);
  dots = [];
  for(var i = 0; i<100; i++){
    dots.push(new BouncyDot());
  }
}

function preLoad(){
  //hitSound = loadSound("https://cdn.glitch.com/bb98db97-78f8-4e05-ae6e-23035ef2dcf8%2FBall_Bounce-Popup_Pixels-172648817.mp3?v=1594921547348");
}

function draw() {
  background(220, 0, 80);
  for(let i = 0; i <dots.length; i++){
    dots[i].float();
    dots[i].display();
  }
}

function mouseClicked() {
  // We'll use this for console log statements only.
  //console.log(dots[0].x);
  for(var i = 0; i<100; i++){
    dots.push(new BouncyDot());
  }
}
//the balls are drop when the mouse stops moving
// the ball's movement will be controlled by the mouse
function mouseMoved() {
  // for each dot
  for (let i = 0; i < dots.length; i++) {
    // the dot's x position = mouseX position
    dots[i].x = mouseX;
    dots[i].y = mouseY;
  }
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
      this.color = random(360);
      //hitSound.play();
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
      this.color = random(360);
      //hitSound.play();
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
      this.color = random(360);
      //hitSound.play();
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
      this.color = random(360);
      //hitSound.play();
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}
