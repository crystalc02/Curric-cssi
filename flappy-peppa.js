// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, key, RIGHT_ARROW, ENTER, textSize, VIDEO, createCapture, image, ellipse, frameCount
 *    collideCircleCircle
 */
 
 // peppa themed Flappy Bird remake
 
var bird, pipes, score, highScore, coins, lives, george, peppaDone, backgroundImg;
function setup(){
  colorMode(HSB, 360, 100, 100);
  createCanvas(400, 400);
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe(random(360)));
  score = 0;
  highScore = 0;
  coins = [];
  coins.push(new Coin());
  lives = 3; //starts with 3 lives
  george = loadImage("https://cdn.glitch.com/e986c99d-7eef-4da1-bcf3-e654b28622a8%2Fpeppa%20pig%20bro.png?v=1595622109976");
  peppaDone = loadImage("https://cdn.glitch.com/e986c99d-7eef-4da1-bcf3-e654b28622a8%2Fpeppa.png?v=1595622236058");
  backgroundImg = loadImage("https://cdn.glitch.com/e986c99d-7eef-4da1-bcf3-e654b28622a8%2Fpig%20background.jpg?v=1595622719561");
}

function draw(){
  background(backgroundImg);
  for( var i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    
    if(pipes[i].offscreen()){
      pipes.splice(i, 1);
    }
    
    if(pipes[i].hit(bird)){
      pipes[i].show();
      pipes.splice(i, 1);
      lives--;
    }
    
    if(lives <= 0){
      noLoop();
      gameOver();
    }
      

  }

  for(var i = coins.length - 1; i >= 0; i--){
    coins[i].show();
    coins[i].update();
    
    if(coins[i].hit(bird)){
      lives++;
      coins.splice(i, 1);
    }
  }
  
  for(let coin of coins){
    if(coin.offscreen()){
      coins.splice(i, 1);
    }
  }
  
  if (frameCount % 100 === 0){
    pipes.push(new Pipe(random(360)));
  }
  if(frameCount % 1000 === 0){
    coins.push(new Coin(random(height)));
  }
  bird.show();
  bird.update();
  fill(255);
  textSize(12);
  text(`Score: ${score}`, 20, 20);
  text(`Lives: ${lives}`, 20, 40);
  text(`High Score: ${highScore}`, 20, 60);
}

class Bird {
  constructor() {
    this.y = width/2;
    this.x = 64;
    this.gravity = .6;
    this.lift = -15;
    this.velocity = 0;
    this.w = 40;
  }
  show(){
    // fill(255);
    // ellipse(this.x, this.y, this.w, this.w);
    image(george, this.x, this.y, this.w, this.w)
  }
  
  update(){
    this.velocity += 1;
    this.velocity *= .9;
    this.y += this.velocity;
    
    if(this.y > height - this.w){
      this.y = height - this.w;
      this.velocity = 0;
    }
    if(this.y < 0){
      this.y = 0;
      this.velocity = 0;
    }
  }
  
  up(){
    this.velocity += this.lift; 
  }
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    bird.up();
  } else if(keyCode === ENTER){
    restart();
  }
}

class Pipe {
  constructor(color1){
    this.top = random(height/2);
    this.bottom = random(height/2, height);
    this.x = width;
    this.w = 20;
    this.speed = 2;
    this.highlight = false;
    this.color = color(color1, 75, 75);
  }
  show(){
    fill(this.color);
    if(this.highlight){
      fill(0, 100, 100);
    }
    rect(this.x, 0, this.w, this.top);
    if(this.bottom - this.top <= bird.w){ // ensures bird can fit through gap
      this.bottom = random(this.top + bird.w, height);
    }
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }
  update(){
    this.x -= this.speed;
    if(this.x < bird.x && this.x > bird.x - bird.w/12){
      score++;
    }
  }
  offscreen(){
    return(this.x < -this.w);
  }
  hit(){
    if(collideRectCircle(this.x, 0, this.w, this.top, bird.x, bird.y, this.w) || collideRectCircle(this.x, this.bottom, this.w, this.bottom, bird.x, bird.y, this.w)){
      this.highlight = true;
      return true;
    }
 }
}

class Coin{
  constructor(y){
    this.x = width + 100;
    this.y = y;
    this.w = 20;
    this.speed = 2;
  }
  show(){
    fill(50, 100, 100);
    ellipse(this.x, this.y, this.w);
  }
  update(){
    this.x -= this.speed;
  }
  offscreen(){
    return(this.x < -this.w)
  }
  hit(){
    if(collideCircleCircle(this.x, this.y, this.w, bird.x, bird.y, bird.w))
    return true;
  }
}

function gameOver(){
  if(score > highScore){
    highScore = score;
  }  
  textSize(20);
  fill(0);
  stroke(255);
  text('GAME OVER :(', 125, height/2);
  text(`High Score: ${highScore}`, 125, height/2 + 30);
  text('Press ENTER to restart', 100, height/2 + 60);
  image(peppaDone, width/3, 30, 150, 150);
  noStroke();
}

function restart(){
  score = 0;
  pipes = [];
  loop();
  lives = 3;
}
