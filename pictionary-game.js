// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, text, mouseX, mouseY, loadImage
          strokeWeight, line,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL, key, textSize, createSlider */
//modified from kmarventano@ for Google CSSI

// Disney-themed pictionary style guessing multi-player game

let brushHue,
  priorX,
  priorY,
  color1,
  globalS,
  globalB,
  backgroundColor,
  textColor,
  playersWord,
  redJar,
  tempWord,
  score,
  castleImg,
  brushSize,
  slider;

function setup() {
  // slider = createSlider(0, 100, 6);
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100); //using HSB colors
  brushHue = 0;
  priorX = 0;
  priorY = 0;
  background(95);
  strokeWeight(6);
  globalS = 90;
  globalB = 90;
  score = 0;
  brushSize = 6;
  // backgroundColor = color(200,0,75);
  // backgroundColor = color(95);
  color1 = color(0, globalS, globalB); //red
  textColor = color(300, globalS, globalB);
  
  
  playersWord = getWord();
  //printInstructions();
  
  castleImg = loadImage("https://lh3.googleusercontent.com/proxy/N8hI8F2djFHUJOfP9v6fmaKPYuzxDZjLKD1sPOB12pqKRPGZi2szZgawbtf6GpbUkUhTKmHqmceK1h93BJ1igjOqdLNJIXkWJxCmaKAXUjJ81TmDgBxSdEr8uLN5pAJbi7xiRh7yJQ");
  background(castleImg);
  
  
}

function draw() {
  //brushSize = slider.value();
  //image(castleImg, 2, 0, 400, 400);
  //background(castleImg);
  fill(95);
  noStroke();
  rect(0, 0, width, 30);
  writeWord(playersWord);
  fill(0);
  text(`Drawer's Score: ${score}`, 5, 20);
  
  fill(95);
  noStroke();
  printInstructions();
  
  
  
  //creates a redJar object for the red "paint jar", 
  //shows the new object, use the getColor() method for the new object
  let jars = [];
  
  //TODO 3: create two more jars of color
  for (let i = 0; i < 360; i += 30) {
    fill(i, globalS, globalB);
    jars.push(new paintJar(i*.8 + 50,color(i, globalS, globalB)));
  }
  jars.push(new paintJar(340, color(0)));
  jars.push(new paintJar(370, color(100)));
  for (let i = 0; i < jars.length; i++){
    jars[i].show();
    jars[i].getColor();
  }
  strokeWeight(brushSize);
  if (mouseIsPressed) {
    //if (mouseY != 50){
    line(priorX, priorY, mouseX, mouseY);

   //}
    
  //TODO 4: can you think of a way to use line() instead of ellipse()?
    
  }
        
  priorX = mouseX; 
  priorY = mouseY;
}
  


function printInstructions() {
  //background(95)
  fill(200, 100, 100);
  noStroke();
  textSize(10);
  text('PRESS ENTER TO START A NEW ROUND!',80,365);
  text('PRESS m TO SHOW THE WORD! ',80,375);
  text('PRESS a TO HIDE THE WORD!',80,385);
  text('PRESS THE UP ARROW WHEN DRAWING IS GUESSED!',80,395);
 
  rect(5,360,70,39)
  fill(100,100,100)
  textSize(25);
  text('PLAY!', 5,390)
  
  
  
  //TODO 5: printInstructions should display instructions for how to hide the word
  //and anything else users might need to know
}


function getWord(){
  //TODO 1: getWord should return a single random word from an array of words
  let disneyWords = [
    "Ariel", "Elsa", "Anna", "Nemo", "Bambi", "Simba", "Scar", "Tinkerbell", "Cinderella",
    "Mickey Mouse", "Goofy", "Rapunzel", "Jasmine", "Aladdin", "Genie", "Woody",
    "Buzz Lightyear", "Olaf", "Mushu", "Mulan", "Flynn Rider", "Winnie the Pooh", "Piglet",
    "Lightning McQueen", "Mike Wazowski", "Dumbo"
  ];
  let chooseWord = random(disneyWords);
  //text("random: " + chooseWord, 250, 250);
  tempWord = chooseWord;
  return chooseWord;
  console.log(tempWord);
}

function writeWord(word) {
  noStroke();
  textSize(13);
  fill(textColor);
  text("Your word: " + word, 150, 20);
}

class paintJar {
  constructor(xPos, color) {
    this.xPos = xPos;
    this.HSBColor = color;
    this.yPos = 50;
    this.radius = 15;

  }
  
  getColor(){
    if (
      mouseX > this.xPos - this.radius/2 &&
      mouseX < this.xPos + this.radius/2 &&
      mouseY > this.yPos - this.radius/2 &&
      mouseY < this.yPos + this.radius/2 &&
      mouseIsPressed
    ) {
      brushHue = this.HSBColor;
    }

    stroke(brushHue, 50, 80);
    fill(brushHue, 50, 80);
    
  }

  
  show() {
    stroke(this.HSBColor);
    fill(this.HSBColor);
    ellipse(this.xPos, this.yPos, this.radius);
  }
  
}


function keyPressed() {
  if (key === "a"){
    background(95);
    playersWord = "HIDDEN";
  } else if(key === "m") {
    playersWord = tempWord;
    console.log(tempWord);
  } else if(keyCode === ENTER){
    background(95);
    playersWord = getWord();
  } else if(keyCode === UP_ARROW){
    score++;
  }
  //TODO 2: if a key is pressed, playersWord should be assigned to an empty string ""
  //and the canvas should be cleared
}
    
