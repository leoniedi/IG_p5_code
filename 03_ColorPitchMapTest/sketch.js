

// Test Pitch Detection Color Boxes
//Git Test

const model_url =
  'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let threshold = 1;
let color1;
let color2;
let color3;

let notes = [
  {
    note: 'C3',
    freq: 130.8128 
  },
  {
    note: 'D',
    freq: 146.8324 
  },
  {
    note: 'E',
    freq: 164.8138 
  },
  {
    note: 'F',
    freq: 174.6141
  },
  {
    note: 'G',
    freq: 195.9977 
  },
  {
    note: 'A',
    freq: 220.0000
  },
  {
    note: 'B',
    freq: 246.9417 
  },
  {
    note: '-',
    freq: 261.6256 
  }
  
];

function setup() {
  createCanvas(1920, 1080);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  color1 = 'white';
  color2 = 'white';
}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function draw() {
  clear();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(freq.toFixed(2), width / 2, height - 150); //FREQUENZ
  

  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }




  //PITCHBALKEN:
  fill(50);
  rectMode(CORNER);
  rect(width-0.07*width, height-0.2*height, 50, -height*0.8); //grauerBalken
  fill(0,255,0)
  rect(width-0.07*width, map(freq, 100, 600, 600, 50), 50, 20); //Frequenzanzeiger


  /////////////////
  fill(255);
  textSize(64);
  text(closestNote.note, width / 2, height-height*0.2);  //NOTE

  let diff = recordDiff;
  // let amt = map(diff, -100, 100, 0, 1);
  // let r = color(255, 0, 0);
  // let g = color(0, 255, 0);
  // let col = lerpColor(g, r, amt);

  let alpha = map(abs(diff), 0, 100, 255, 0);
  rectMode(CENTER);
  fill(255, alpha);
  stroke(255);
  strokeWeight(1);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200, 100, 200, 50);

  stroke(255);
  strokeWeight(4);
  line(200, 0, 200, 200);

  noStroke();
  fill(255, 0, 0);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200 + diff / 2, 100, 10, 75);

  //////////////////////////////////////////////

  //Grobe Test-Farbboxen bei erreichn einer best. Freq/Note

  



  fill(color1);
  //rect(width*0.1,height-height*0.3/3, 100, 100);

  noStroke();
  beginShape();
  vertex(200, 500);
  vertex(400, 510);
  vertex(400, 680);
  vertex(200, 700);
  endShape();

  fill(color2);
  //rect(width*0.5,height*0.5, 100, 100);
  noStroke();
  beginShape();
  vertex(500, 200);
  vertex(670, 240);
  vertex(670, 415);
  vertex(500, 400);
  endShape();

  if(closestNote.note == "A") {
    color1 = 'yellow';
  }

  if(closestNote.note == "F") {
    color2 = 'blue';
  }

  if(closestNote.note == "D") {
    color1 = 'brown';
  }

  if(closestNote.note == "D") {
    color2 = 'green';
  }

  if(closestNote.note == "B") {
    color1 = 'red';
  }
}

  




  //////////////////////////////////////////////


function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}