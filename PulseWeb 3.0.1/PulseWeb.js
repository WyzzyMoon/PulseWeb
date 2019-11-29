/**
* ----------------------- PUSLEWEB -----------------------
* Date: 28-03-2019
* Version: 3.0.1 BETA
* PulseWeb is an audiovisualiser created by Wikke Andeweg
* info@wikkeandeweg.nl
* https://www.wikkeandeweg.nl  -- https://www.deviantart.com/wyzzymoon
* PulseWeb is a javascript based translation of "PulseWeb Audio Visualizer"
* Originally created as a skin for Rainmeter.
*
* License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 (CC BY-NC-SA 3.0)
* https://creativecommons.org/licenses/by-nc-sa/3.0/
* --------------------------------------------------------
*/

var AudioP1 = 0;
var AudioP2 = 0;
var AudioP3 = 0;
var AudioP4 = 0;
var AudioP5 = 0;
var AudioP6 = 0;
var AudioS1 = 0;
var AudioS2 = 0;
var AudioS3 = 0;
var AudioS4 = 0;
var AudioS5 = 0;
var AudioS6 = 0;

var Size;
var Dotsize;
var LineWidthSet;
var LineColor;
var MLineColor;
var DotColor;
var FillColor;
var SideFillColor;
var Smoothness;
var LineLength;
var CenDist;
var MidX;
var MidY;
var RotMX;
var RotMY;
var LineWidth;
var Length;
var Dsize;

var msc;
var octaveBands;
var Bands;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fft = new p5.FFT(0.8, 1024);


  //Size of the skin
  Size = 100;
  //Dot Size
  Dotsize = 1;
  //Line Width
  LineWidthSet = 0.4;
  //Color of the lines
  LineColor = color(255, 255, 255, 150);
  //Color of the middle lines
  MLineColor = color(255, 255, 255, 75);
  //Color of the Dots
  DotColor = color(255, 255, 255, 255);
  //Color of the Shape Fill
  FillColor = color(255, 255, 255, 0);
  //Color of the Side Fill
  SideFillColor = color(0, 0, 0, 0);
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = 45;
  //Multiplication of all movement
  LineLength = 6;
  //Distance from center
  CenDist = 70;
  //Background color
  BGColor = 0
  //Midpoint for rotation, can't be MidX to prevent infinit loop
  RotMX = 50;
  RotMY = 50;

  presettings();

}

function draw() {
  //Midpoint for the lines
  MidX = window.innerWidth / 2;
  MidY = window.innerHeight / 2;
  //Calculations
  LineWidth = (LineWidthSet * (Size / 10));
  Length = (LineLength * (Size / 10));
  Dsize = (Dotsize * (Size / 10));
  Smoothness = (Smooth/1000);

  var selection = iSelect.value();
  if (selection == 'TriPulse'){
    TriPulse();
  }
  else if (selection == 'QuadPulse'){
    QuadPulse();
  }
  else if (selection == 'PentaPulse'){
    PentaPulse();
  }
  else if (selection == 'HexPulse'){
    HexPulse();
  }
  else if (selection == 'DDP-Butterfly'){
    DDPButterfly();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function SelectShape() {
    redraw();
}

function FileUpload(file) {
  print(file);
  if (file.type === 'audio') {
    msc = createAudio(file.data);
    msc.autoplay(false);
    fft.setInput(msc);
  }
  else{
    window.alert("Error: please upload a music file!");
    setup();
    redraw();
  }
}

function AudioPlay(){
  msc.play();
}
function AudioPause(){
msc.pause();
}
function AudioStop(){
msc.stop();
}
