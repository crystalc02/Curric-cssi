// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, collideRectCircle, ellipse, fill, height, keyCode, random, rect,
 *    strokeWeight, text, textSize, width, image, loadImage
 *    UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, ENTER
 */

// Finding Nemo themed Frogger game

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, car2X, car2Y, car2V, sharkImg, nemoImg, seaImg;
let car3X, car3Y, car3V, goal, wins, car4X, car4Y, car4V, car5X, car5Y, car5V, maxWins, rainbowHue, rainbow, powerUpX, powerUpY;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  
  // randomize the frog's starting position
  frogX = width / 2;
  frogY = height - 50;
  
  // initialize some game state stuff
  score = 0;
  lives = 3;
  gameIsOver = false;
  goal = 5;
  wins = 0;
  maxWins = 5;
  rainbow = false;
  
  // initialize position of the car and its velocity
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  car2X = width;
  car2Y = random(150, height - 70);
  car2V = -5;
  car3X = 0;
  car3Y = random(150, height - 70);
  car3V = 5;
  car4X = width;
  car4Y = random(150, height - 70);
  car4V = -5;
  car5X = 0;
  car5Y = random(150, height - 70);
  car5V = 5;
  powerUpX = random(width);
  powerUpY = random(150, height - 70);
  
  // initialize rainbow hue at red
  rainbowHue = 0;
  rainbow = false;
  
  sharkImg = loadImage("https://cdn.glitch.com/d4bca899-0b80-4884-bb4e-419d98042f00%2Fshark_PNG18830.png?v=1594747242221");
  nemoImg = loadImage("https://cdn.glitch.com/d4bca899-0b80-4884-bb4e-419d98042f00%2Fnemo1.png?v=1594748254958");
  seaImg = loadImage("https://cdn.glitch.com/d4bca899-0b80-4884-bb4e-419d98042f00%2Fsea.jpg?v=1594748128562");
}

function draw() {
  background(seaImg);
  // Code for gold goal line
  fill(217, 70, 70);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  
  // draw the frog
  //ellipse(frogX, frogY, 20);
  if (wins >= 0){
    rainbowPowerUp();
  }
  if(collideRectCircle(frogX, frogY, 50, 40, powerUpX, powerUpY, 20) && rainbow == false){
    rainbow = true;
  }
  drawNemo();
  noTint();
  //call helpers to handle the game logic
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  
  //increases # of cars each time player until reaches max win
  if(wins > 0){
    image(sharkImg, car3X, car3Y, 60, 50);
  }
  if(wins > 1){
    image(sharkImg, car4X, car4Y, 60, 50);
  }
  if(wins > 2){
    image(sharkImg, car5X, car5Y, 60, 50);
  }

}

function keyPressed() {
  // Moves frog in corresponding direction based on which arrow key pressed
  if(!gameIsOver && wins < maxWins){
    if (keyCode === UP_ARROW) {
      frogY -= 20;
    } else if (keyCode === DOWN_ARROW){
      frogY += 20;
    } else if (keyCode === LEFT_ARROW){
      frogX -= 20;
    } else if (keyCode === RIGHT_ARROW){
      frogX += 20;
    }
  }
  if (keyCode === ENTER){
    restart();
  }
  
}

function drawNemo(){
  if(rainbow == true){
    tint(color(rainbowHue, 100, 100));
  }
  if(rainbow == false){
    noTint();
  }
  image(nemoImg, frogX, frogY, 50, 40);
  console.log(rainbow);
}

function moveCars() {
  // Move the car
  car1X += car1V;
  car2X += car2V;
  car3X += car3V;
  car4X += car4V;
  car5X += car5V;
  // Reset if it moves off screen
  if (car1X > width){
    car1X = -40;
  }
  if (car2X < 0){
    car2X = width;
  }
  if (car3X > width){
    car3X = -40;
  }
  if(car4X < 0){
    car4X = width;
  }
  if(car5X < 0){
    car5X = -40;
  }
}

function drawCars() {
  // Code for car 1
  // fill(0, 80, 80);
  // rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  // fill(240, 80, 80);
  // rect(car2X, car2Y, 40, 30);
  image(sharkImg, car1X, car1Y, 60, 50);
  image(sharkImg, car2X, car2Y, 60, 50);
}


function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if(collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)){
    // reset the frog and subtract a life
    //console.log('collide with Car 1');
    frogY = height - 50;
    lives--;
  }
  if(collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20)){
    // reset the frog and subtract a life
    //console.log('collide with Car 1');
    frogY = height - 50;
    lives--;
  }
  if(wins > 1){
    if(collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20)){
    // reset the frog and subtract a life
    //console.log('collide with Car 1');
    frogY = height - 50;
    lives--;
  }
  }
  if(wins > 2){
      if(collideRectCircle(car4X, car4Y, 40, 30, frogX, frogY, 20)){
    // reset the frog and subtract a life
    //console.log('collide with Car 1');
    frogY = height - 50;
    lives--;
  }
  }
  if(wins > 3){
      if(collideRectCircle(car5X, car5Y, 40, 30, frogX, frogY, 20)){
    // reset the frog and subtract a life
    //console.log('collide with Car 1');
    frogY = height - 50;
    lives--;
  }
  }
  if(lives <= 0) {
    gameIsOver = true; // we will use this in displayScores()
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if(frogY <= 50) {
    score++;
    frogY = height - 50;
  }
  //every 5 points the players earn, the speed of the cars increase by different rates
  if(score >= goal){
    car1V += 3*score/5;
    car2V -= 2*score/5;
    car3V += 1*score/5;
    goal += goal;
  }
}

function displayScores() {
  textSize(12);
  fill(100);
  // Display Lives
  text(`Lives: `, 10, 20);
  for (let i = 1; i <= lives; i++){
    image(nemoImg, 25 + i*20, 5, 20, 20);
  }
  if(lives == 0){
    text(`Lives: ${lives} :(`, 10, 20);
  }
  // Display Score
  text(`Score: ${score}`, 10, 38);
  text(`Wins: ${wins}`, width - 50, 20);
  // Display game over message if the game is over
  if(gameIsOver && score < 15) {
    textSize(60);
    text("GAME OVER", 70, height/2);
  }
  if(score>=15){
    gameIsOver = true;
  }
  if(gameIsOver && score >= 15){
    wins++;
    score = 0;
    gameIsOver = false;
  }
  if(wins >= maxWins){
    textSize(60);
    text("You Win!", 120, height/2);
  }
}

function restart(){
  frogX = width/2;
  frogY = height - 50;
  lives = 3;
  score = 0;
  wins = 0;
  gameIsOver = false;
  car1V = 5;
  car2V = -5;
  car3V = 5;
  car4V = -5;
  car5V = 5;
}

function rainbowPowerUp(){
  if (rainbowHue < 360){
    rainbowHue += 3;
  } else{
    rainbowHue = 0;
  }
  if(rainbow == false){
    fill(rainbowHue, 100, 100);
    ellipse(powerUpX, powerUpY, 20);
  }
}
