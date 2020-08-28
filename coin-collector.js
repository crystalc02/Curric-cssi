// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideCircleCircle, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, random, rect, stroke, strokeWeight, text, width, createButton, fill, triangle, collideRectCircle
 */

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit, powerUpColor, button, initialTime, coin2X, coin2Y, hit2, coin2VelocityX, coin2VelocityY, masterVelocity, brushHue2;
let powerUpX, powerUpY, powerUpVelocityX, powerUpVelocityY, highScore, hit3, timesUsedPowerUp;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  powerUpColor = random(360);
  brushHue = 0;
  brushHue = 100;
  highScore = 0;
  timesUsedPowerUp = 0;
  
  // Get random coordinates for the starting position of the coin (coinX, coinY)
  coinX = random(width);
  coinY = random(height);
  
  coin2X = random(width);
  coin2Y = random(height);
  
  powerUpX = random(width);
  powerUpY = random(height);
  powerUpVelocityX = masterVelocity * 1.5;
  powerUpVelocityY = masterVelocity * 1.5;
  
  masterVelocity = 5;
  coin2VelocityX = masterVelocity;
  coin2VelocityY = masterVelocity;
  
  // Initialize time to 1000, and gameIsOver to false, and score to 0
  initialTime = 1000;
  time = initialTime;
  gameIsOver = false;
  score = 0;
  
  button = createButton('Restart');
  button.position(350, 400);
  button.mousePressed(restart);
}

function draw() {
  background(backgroundColor);
  
  // Draw the coin
  rainbowColor2();
  fill(brushHue2, 68, 87);
  ellipse(coinX, coinY, 20);
  
  // Draw 2 point coin
  if(coin2X < 0){
    coin2VelocityX = masterVelocity;
  } else if (coin2X > width) {
    coin2VelocityX = -masterVelocity;
  }
  if(coin2Y < 0){
    coin2VelocityY = masterVelocity;
  } else if (coin2Y > height) {
    coin2VelocityY = -masterVelocity;
  }
  coin2X += coin2VelocityX;
  coin2Y += coin2VelocityY;
  rainbowColor();
  fill(brushHue, 100, 100);
  ellipse(coin2X, coin2Y, 25);
  
  //draw the powerup at a certain time
  fill(powerUpColor, 100, 100);
  // if(powerUpX < 0){
  //   powerUpVelocityX = masterVelocity * 1.5;
  // } else if (powerUpX > width) {
  //   powerUpVelocityX = -masterVelocity * 1.5;
  // }
  // if(powerUpY < 0){
  //   powerUpVelocityY = masterVelocity * 1.5;
  // } else if (powerUpY > height) {
  //   powerUpVelocityY = -masterVelocity * 1.5;
  // }
  // powerUpX += powerUpVelocityX;
  // powerUpY += powerUpVelocityY;
  // rect(powerUpX, powerUpY, 15, 15);
  if (time < 200 && timesUsedPowerUp < 3){
    powerUp();
  }
  console.log(timesUsedPowerUp);
  
  
  // Draw the cursor at the mouse position
  fill(100);
  ellipse(mouseX, mouseY, 20);
  
  //Add text with the current score
  fill(0);
  text(`Your score is: ${score}`, 20, 20);
  
  // Add text with the time remaining: 
  text(`Time remaining: ${time}`, 20, 40);
  text(`High Score: ${highScore}`, 20, 350);
  
  
  
  handleTime();
 
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit && !gameIsOver) {
    handleCollision();
  }
  
  hit2 = collideCircleCircle(coin2X, coin2Y, 25, mouseX, mouseY, 20);
  if (hit2 && !gameIsOver) {
    handleCollision2();
  }
  
  hit3 = collideRectCircle(powerUpX, powerUpY, 15, 15, mouseX, mouseY, 20);
  if (hit3 && !gameIsOver) {
    touchPowerUp();
  }
}

function powerUp(){
  rect(powerUpX, powerUpY, 15, 15);
}

function touchPowerUp() {
  time += 10;
  timesUsedPowerUp++;
}

function rainbowColor() {
  if (brushHue < 360){
    brushHue += 1;
  } else{
    brushHue = 0;
  }
}

function rainbowColor2() {
  if (brushHue2 < 360){
    brushHue2 += 1;
  } else{
    brushHue2 = 0;
  }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  coinX = random(width);
  coinY = random(height);
  score += 2;
}

function handleCollision2() {
  // We'll write code for what happens if your character hits a coin.
  coin2X = random(width);
  coin2Y = random(height);
  score ++;
}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0){
    time -= 1; //time = time - 1;
  } else{
    textSize(50);
    text('Time\'s up!', width/4, height/2);
    textSize(14);
    gameIsOver = true;
    masterVelocity = 0;
    if (score > highScore){
      highScore = score;
    }
    if (score < 20){
      fill(0, 100, 100);
      text('Try harder next time :-(', width/3, 300);
    } else if (score < 30){
      fill(20, 100, 100);
      text('Not bad! Try practicing some more', width/3, 300);
    } else if(score < 40){
      fill(50, 100, 100);
      text('You\'re pretty good!', width/3, 200);
    } else {
      fill(100, 100, 100);
      text('Wow you\'re a pro!', width/3, 225);
    }
  }
}

function restart(){
  score = 0;
  time = initialTime;
  gameIsOver = false;
  masterVelocity = 5;
}
