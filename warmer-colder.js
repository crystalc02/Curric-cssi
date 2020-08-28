// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width, line
 *    keyCode, ENTER, abs
 */

let backgroundColor, spherePosition, rectPosition, score, sphereFound, mousePosition;

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains an object
  spherePosition = {
    "x": 100,
    "y": 100,
  };
  
  rectPosition = {
    "x": 130,
    "y": 140,
  };
  score = 0;
  sphereFound = false;
}

function draw() {
  background(backgroundColor);
  rect(rectPosition.x, rectPosition.y, 20, 20);
  //line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  let distance1 = computeDistance(spherePosition, rectPosition);
  text(`The circle and rectangle are ${round(distance1)} units apart`, 20, 20);

  mousePosition = {
    "x": mouseX,
    "y": mouseY
  };
  
  let distance2 = computeDistance(mousePosition, spherePosition);
  let distanceDescription = computeCategoryOfDistance(spherePosition, mousePosition);
  text(`The circle and your mouse are ${round(distance2)} units apart; you're ${distanceDescription}`, 20, 40);
  text(`Score: ${score}`, 20, 60);
  if(sphereFound === true){
    ellipse(spherePosition.x, spherePosition.y, 20, 20);
  }
  text('Press enter to start a new round', 20, 390);
}

// This code runs every time the mouse is clicked
function mousePressed() {
  if(computeDistance(mousePosition, spherePosition) <= 10){
    sphereFound = true;
    score++;
  }
}

function keyPressed(){
  if (keyCode === ENTER){
    spherePosition.x = random(width);
    spherePosition.y = random(height);
    sphereFound = false;
  }
}

function computeDistance(point1, point2){
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = sqrt((deltaX ** 2) + (deltaY ** 2));
  return distance; // returns a number
}

function computeCategoryOfDistance(point1, point2){
  // Compute the distance between the two points
  let distance = computeDistance(point1, point2);
  
  // Depending on how large this ditance is:
  // - updaate the background color
  // - return the category of distance, ex: "cold", "warmer", "red hot"
  let diff = abs(360 - (360 - distance));
  if(diff > 275){
    diff = 275;
  }
  backgroundColor = color(diff, 100, 100);
  if(distance > 200){
    // cold
    //backgroundColor = color(240, 10, 100); // blue
    return 'cold';
  } else if (distance > 50){
    // warmer
    //backgroundColor = color(120, 10, 100); //green
    return 'warmer';
  } else{
    // red hot
    //backgroundColor = color(0, 10, 100); // red
    return 'red hot';
  }
}
