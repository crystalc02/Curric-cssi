// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, triangle, collidePointTriangle
 *    mouseX, mouseY, collidePointRect, rect
 */

let drop1, drop2, drop3, grass1, grass2, grass3, grass, drop, numRaindrops, backgroundHue;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  // drop1 = new RainDrop(14);
  // drop2 = new RainDrop(8);
  // drop3 = new RainDrop(10);
  // grass1 = new Grass(50);
  // grass2 = new Grass(300);
  // grass3 = new Grass(450);
  backgroundHue = 80;
  numRaindrops = 20;
  drop = [];
  for(var i =0; i<numRaindrops; i++){
    drop.push(new RainDrop(random(5, 10)));
  }
  grass = [];
  for(var i = 0; i<width; i++){
    grass.push(new Grass(width/20*i));
  }
}

function draw() {
  background(backgroundHue);
  // // Drip droplet 1, show it
  // drop1.drip();
  // drop1.show();
  // // Drip droplet 2, show it
  // drop2.drip();
  // drop2.show();
  // // Drip drop 3, show it
  // drop3.drip();
  // drop3.show();
  
  for(var i =0; i<numRaindrops; i++){
    drop[i].drip();
    drop[i].show();
  }
  // grass1.grow();
  // grass1.show();
  // grass2.grow();
  // grass2.show();
  // grass3.grow();
  // grass3.show();
  for(var i = 0; i<width; i++){
    grass[i].grow();
    grass[i].show();
  }
  if(backgroundHue === 50){
      fill(100);
  }else if(backgroundHue < 60 && backgroundHue > 30){
    fill(100 - backgroundHue + (50 - backgroundHue));
  }else{
    fill(100 - backgroundHue);
  }
  text('Choose a background color:', 0, 30);
  for(var i = 0; i<100; i+=10){
    fill(i);
    rect(165+i*3, 15, 30, 20);
  }
}

function mouseClicked(){
  for(var i =0; i<100; i+=10){
    if(mouseX > 165+i*3 && mouseX < 165+i*3+30 && mouseY < 35 && mouseY > 15){
      backgroundHue = i;
      console.log(backgroundHue);
    }
  }
}

class RainDrop {
  // The constructor will be called whenever you run 'new RainDrop()'
  constructor(d){
    this.x = random(width);
    this.y = random(height);
    this.d = d;
    this.fallSpeed = random(5, 10);
    this.timesDripped = 0;
  }
  
  // Show the raindrop on the canvas
  show(){
    noStroke();
    fill(217, 73, 96); // blue
    ellipse(this.x, this.y, this.d);
    triangle(this.x - .5*this.d, this.y, this.x + .5*this.d, this.y, this.x, this.y - this.d*1.5);
    if(this.timesDripped < height*2){
      ellipse(this.x, height, this.timesDripped);
    } else{
      this.timesDripped = 0;
    }
  }
  
  //
  drip(){
    this.y += this.fallSpeed;
    if(this.y > height){
      this.y = 0;
      this.x = random(width);
    }
    this.timesDripped++;
  }
}

class Grass{
  constructor(x){
    this.x = x;
    this.y = height;
    this.bladeWidth = (random, 10, 30);
    this.x2 = this.x + this.bladeWidth;
    this.y2 = height;
    this.x3 = this.x + this.bladeWidth/2;
    this.y3 = height;
    this.growSpeed = random(.5, 1.5);
    this.timesGrown = 0;
    // poly[0] = createVector(this.x, this.y);
    // poly[1] = createVector(this.x2, this.y2);
    // poly[2] = createVector(this.x3, this.y3);
  }
  
  show(){
    noStroke();
    fill(120, 100, 50);
    triangle(this.x, this.y, this.x2, this.y2, this.x3, this.y3);
  }
  
  grow(){
    //if(collideCirclePoly(drop1.x, drop1.y, drop1.d, poly)){
      this.y3 -= this.growSpeed;
    //}
    if(this.y3 < height/2){
      this.y3 = height;
      this.timesGrown++;
      //console.log(this.timesGrown);
    }
  }
}

// setInterval(function(){ numRaindrops+=10; }, 10000);
