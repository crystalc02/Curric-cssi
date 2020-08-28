// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, createCheckbox, createSlider, createButton, random, key
 */

let brushHue, priorX, priorY, brushSize, globalS, globalB, slider, button, checkbox, colorArray, paintBoxSize;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  
  // Initialize brushHue to 0 (which is delcared at the top)
  brushHue = 360;
  globalS = 50;
  globalB = 100;
  
  brushSize = 6;
  
  // Initialize prior X and prior Y to 0
  priorX = 0;
  priorY = 0;
  
  paintBoxSize = 40;
  
  // Draw the background once, at the very beginning
  background(95); 
  

  //checkbox = createCheckbox('Eraser', false);
  slider = createSlider(0, 100, 6);
  button = createButton('clear');

  
  //checkbox.changed(eraser());
}

function draw() {
  // if(checkbox.checked){
  //   brushHue = 0;
  // }


  fill(0);
  noStroke();
  text('Press f to change the color family', 0, 10);
  text('Press b to change the hue', 0, 25);
  brushSize = slider.value();
  stroke(brushHue, 100, 100);
  //brushSize = random(5, 15); //quill effect
  
  //chooseColors();
  strokeWeight(brushSize);
  // If the mouse is being held down
  if(mouseIsPressed) {
    // Draw a 15 x 15 sized square at mouseX and mouseY
  //rect(mouseX, mouseY, 15, 15);
    line(priorX, priorY, mouseX, mouseY);
  }
  
  priorX = mouseX;
  priorY = mouseY;
  
  button.mousePressed(clearBackground);
  
//   for (var i = 0; i <= 5; i++) {
//     colorArray.push(color(360/6*i, 100, 100));
//   }
  
//   for (var i = 0; i < colorArray.length; i++){
//     fill(colorArray[i]);
//     rect(width / colorArray.length * i, 0, width / colorArray.length, width / colorArray.length);
//   }
  
  drawPaintBoxes();
}

// When a key on the keyboard is pressed, do the thing in the { }
// When the key is p or - it will increase and decrease brush size, respectively
function keyPressed() { 
  // if key b is pressed then it will change the hue of colors
  if(key == 'b'){
    chooseColors();
  }
  // if key f is pressed then it will change the color family of brush
  if(key == 'f'){
    randomFamily();
  }
}

function mouseClicked(){
  if(mouseX < 50 && mouseY > width / 8 && mouseY < width / 8 + paintBoxSize){
    brushHue = 360;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if(mouseX < 50 && mouseY > width / 8 + paintBoxSize && mouseY < width / 8 + paintBoxSize * 2){
    brushHue = 60;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 2) && (mouseY < width / 8 + paintBoxSize * 3)){
    brushHue = 120;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 3) && (mouseY < width / 8 + paintBoxSize * 4)){
    brushHue = 180;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 4) && (mouseY < width / 8 + paintBoxSize * 5)){
    brushHue = 240;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 5) && (mouseY < width / 8 + paintBoxSize * 6)){
    brushHue = 300;
    stroke(brushHue, 100, 100);
    fill(brushHue, 100, 100);
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 6) && (mouseY < width / 8 + paintBoxSize * 7)){
    stroke(color(0));
    fill(color(0));
  } else if ((mouseX < 50) && (mouseY > width / 8 + paintBoxSize * 7) && (mouseY < width / 8 + paintBoxSize * 8)){
    stroke(color(100));
    fill(color(100));
  }
}
// function mousePressed(){
//   ellipse(random(width), random(height), 30, 30);
// }

function drawPaintBoxes() {
  //noStroke();
  for (var i = 0; i < 6; i++){
    fill(i*60, 100, 100);
    stroke(0)
    strokeWeight(3)
    rect(0, width/8 + paintBoxSize*i, paintBoxSize, paintBoxSize);
  }
  // black and white paint boxes
  fill(0);
  rect(0, width/8 + paintBoxSize * 6, paintBoxSize, paintBoxSize)
  fill(100);
  rect(0, width/8 + paintBoxSize * 7, paintBoxSize, paintBoxSize)
}

function clearBackground() {
  background(95);
}

function eraser(){
  if (this.checked()) {
    brushHue = 100;
  }  
  
  stroke(brushHue, globalS, globalB);
  fill(brushHue, globalS, globalB);
}


/* A function that sets the fill and stroke of our "paint brush". */
function chooseColors() {
  brushHue = random(0, 360); // brushHue = brushHue + 1;
  
  if ( brushHue > 360 ) {
    brushHue = 0; //Alternatively: try brushHue -= 1;
  }
  stroke(brushHue, globalS, globalB);
  fill(brushHue, globalS, globalB);
  
}

//choose a random color family
function randomFamily(){
  //randomize saturation and brightness
  globalS = random(10, 80);
  globalB = random(50, 80);
  
  stroke(brushHue, globalS, globalB);
  fill(brushHue, globalS, globalB);
}
