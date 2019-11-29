/**
* ----------------------- PUSLEWEB -----------------------
* Date: 10-06-2019
* Version: 3.0.5 BETA
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
var BandP = [0,0,0,0,0,0];
var BandS = [0,0,0,0,0,0];
var LogAmpP = [0,0,0,0,0,0];
var LogAmpS = [0,0,0,0,0,0];
var LogAmpAll = 0;
var AudioP = [0,0,0,0,0,0];
var AudioS = [0,0,0,0,0,0];
var AudioAll = 0;
var AvrgArrayP = [[],[],[],[],[],[]];
var AvrgArrayS = [[],[],[],[],[],[]];
var AvrgArrayAll = [];
var AvrgP = [0,0,0,0,0,0];
var AvrgS = [0,0,0,0,0,0];
var AvrgAll = 0;


var Size;
var Dotsize;
var LineWidthSet;
var LineColor;
var LineColorA;
var MLineColor;
var MLineColorA;
var DotColor;
var DotColorA;
var FillColor;
var FillColorA;
var SideFillColor;
var SideFillColorA;
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
var Senc

var msc = null;
var octaveBands;
var Bands;

var t = 0;
let testvar = [];



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fft = new p5.FFT(0, 1024);
  amplitude = new p5.Amplitude();

  //Size of the skin
  Size = '100';
  //Dot Size
  Dotsize = '1';
  //Line Width
  LineWidthSet = '0.4';
  //Color of the lines
  LineColor = color(255, 255, 255);
  LineColorA = 150;
  //Color of the middle lines
  MLineColor = color(255, 255, 255);
  MLineColorA = 75;
  //Color of the Dots
  DotColor = color(255, 255, 255);
  DotColorA = 255;
  //Color of the Shape Fill
  FillColor = color(0, 0, 255);
  FillColorA = 25;
  //Color of the Side Fill
  SideFillColor = color(0, 0, 0);
  SideFillColorA = 25;
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = '33';
  //Sensitivity
  Senc = '3';
  //FFTAttack
  Attack = '250'
  //FFTDecay
  Decay= '60'
  //Multiplication of all movement
  LineLength = '4';
  //Distance from center
  CenDist = '70';
  //Background color
  BGColor = color(100,100,100);
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
  Smoothness = Smooth;
  FFTAttack = (Attack/1000);
  FFTDecay = (Decay/1000);

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
  diag();
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
    if (msc != null){
      msc.stop();
      FileInput();
    }
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
  getAudioContext().resume()
  msc.play();

}
function AudioPause(){
  msc.pause();
}
function AudioStop(){
  msc.stop();
}

function diag(){
}
