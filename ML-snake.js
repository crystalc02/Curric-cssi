/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, textSize, VIDEO, createCapture, image
 */

// Classic Snake game, utilizing Google's Teachable Machine model to use Machine Learning to control player's direction.

// Lift left/right hand to go in respective direction. To go up, use both hands to create a triangle shape above user's head.
// To go down, use both hands to create a downward facing triangle beneath user's face.

let video;
let flipVideo;
let label = 'waiting...';
let classifier;
let backgroundColor, playerSnake, currentApple, score, framerate, lives, rottenApple, scoreReached;
function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  flipVideo = ml5.flipImage(video);
  classifyVideo();
  
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  framerate = 12;
  scoreReached = false;
  // Creating the snake and apple objects
  playerSnake = new Snake();
  currentApple = new Apple();
  rottenApple = [];
  // Initialize score to 0
  score = 0;
  lives = 3;
}
// STEP 1: load the model!
function preload(){
  // classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Xu5LfrlA1/model.json");
  //classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aYJvWbc-i/model.json");
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MA7D2UfN3/model.json");
  // classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3RarRGjDn/model.json');
  // classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dVXjQnpR0/model.json");
}
// STEP 2 classify!
function classifyVideo(){
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);
  flipVideo.remove();
}
// STEP 3: Get the classification!
function gotResults(error, results){
    // if(error){
    //   console.error(error);
    //   return;
    // }
    label = results[0].label;
    controlSnake();
    classifyVideo();
}

function draw() {
  background(backgroundColor);
  classifyVideo();
  //image(flipVideo, 0, 0);
  textSize(32);
  fill(0);
  text(label, 10, 50);
  frameRate(framerate);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  if(scoreReached){
    for(var i = 0; i<rottenApple.length; i++){
      rottenApple[i].showSelf();
      rottenApple[i].checkCollisions();
    }
  }
  displayScore();
  displayLives();
}

function displayLives(){
  fill(0);
  text(`Lives: ${lives}`, 20, 40);
}

function displayScore() {
  fill(0);
  textSize(12);
  text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    
    // Add a new segment to the beginning of the arr
    this.tail.unshift(new TailSegment(this.x, this.y));
    
    // Remove a segment from the end
    this.tail.pop();
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    for(let i = 0; i < this.tail.length; i++){
      this.tail[i].showSelf();
    }
  }

  // Check if there was a collision between the snake and the apple
  checkApples() {
    let collision = collideRectRect(this.x, this.y, this.size, this.size, currentApple.x, currentApple.y, currentApple.size, currentApple.size);
    if(collision){
      score++;
      currentApple = new Apple();
      this.extendTail();
      if (score%5 == 0){
        framerate+=5;
        rottenApple.push(new RottenApple());
      }
      if (score == 5){
        scoreReached = true;
      }
    }
  }

  checkCollisions() {
    if(lives <= 0){
        gameOver();
    }
    if(playerSnake.x < 0 || playerSnake.x > width || playerSnake.y < 0 || playerSnake.y > height){
        lives--;
        this.x = random(width);
        this.y = random(height);
    }
    if (this.tail.length > 2){
      for(var i =1; i< this.tail.length; i++){
        if(this.x === this.tail[i].x && this.y === this.tail[i].y){
          lives--;
        }
      }
    }
  }
  

  extendTail() {
    let lastTailSegment = this.tail[this.tail.length - 1];
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}

class TailSegment{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }
  
  showSelf() {
    fill(random(360), 80, 80);
    rect(this.x, this.y, this.size);
  }
}

class Apple {
  constructor() {
    this.x = random(width - 10); //-10 prevents apple from being any part off screen
    this.y = random(height - 10);
    this.size = 10;
  }

  showSelf() {
    fill(0, 80, 80); // Red
    rect(this.x, this.y, this.size);
  }
}

class RottenApple {
  constructor(){
    this.x = random(width - 10);
    this.y = random(height - 10);
    this.size = 20;
  }
  
  showSelf(){
    fill(120, 80, 80);
    rect(this.x, this.y, this.size);
  }
  
  checkCollisions(){
    let collision = collideRectRect(this.x, this.y, this.size, this.size, playerSnake.x, playerSnake.y, playerSnake.size, playerSnake.size);
    if(collision){
      lives--;
      rottenApple.pop();
      rottenApple.push(new RottenApple());
    }
  }
}

function controlSnake() {
  if (label === 'Up' && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (label === 'Down' && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (label === 'Right' && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (label === 'Left' && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  }else {
    console.log("wrong key");
  }
}

function keyPressed(){
  if(keyCode === ENTER){
    restartGame();
  }
}

function restartGame() {
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  lives = 3;
  scoreReached = false;
  framerate = 12;
  rottenApple = [];
  loop();
}

function gameOver() {
  textSize(20);
  fill(0, 100, 100);
  text('GAME OVER', 150, height/2);
  noLoop();
}
