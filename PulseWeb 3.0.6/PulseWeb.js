/**
* ----------------------- PUSLEWEB -----------------------
* Date: 10-06-2019
* Version: 3.0.6 BETA
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
var AvrgArray = [[],[],[],[],[],[]];
var Avrg = [0,0,0,0,0,0];
var AvrgArrayAll = [];
var AvrgAll = 0;

var LogAmpBands = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


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


var newpos = 0;
var pos = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fft = new p5.FFT(0, 1024);
//  amplitude = new p5.Amplitude();
  fft.smooth(0.0);


  //Size of the skin
  Size = '100';
  //Dot Size
  Dotsize = '1';
  //Line Width
  LineWidthSet = 4;
  //Color of the lines
  LineColor = color('#ffffff');
  LineColorA = 150;
  //Color of the middle lines
  MLineColor = color('#ffffff');
  MLineColorA = 75;
  //Color of the Dots
  DotColor = color('#ffffff');
  DotColorA = 255;
  //Color of the Shape Fill
  FillColor = color('#0000ff');
  FillColorA = 25;
  //Color of the Side Fill
  SideFillColor = color('#000000');
  SideFillColorA = 25;
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = '45';
  //Sensitivity
  Senc = '4';
  //FFTAttack
  Attack = '50'
  //FFTDecay
  Decay= '150'
  //Multiplication of all movement
  LineLength = '4';
  //Distance from center
  CenDist = '70';
  //Background color
  BGColor = color('#555555');
  //Midpoint for rotation, can't be MidX to prevent infinit loop
  RotMX = 50;
  RotMY = 50;

  presettings();
}

function draw() {
  //FFT readout
  fft.analyze();
  octaveBands = fft.getOctaveBands(3, 20);
  Bands = fft.logAverages(octaveBands);

  //Midpoint for the lines
  MidX = window.innerWidth / 2;
  MidY = window.innerHeight / 2;
  //Calculations
  LineWidth = (LineWidthSet/10 * (Size / 10));
  Length = (LineLength * (Size / 10));
  Dsize = (Dotsize * (Size / 10));
  Smoothness = Smooth;
  FFTAttack = (Attack/1000);
  FFTDecay = (Decay/1000);

  var selection = iSelect.value;
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

function menuMove(){
  pos = lerp(pos, newpos, 0.3);
  var menu=document.getElementById("menu");
  var cmenu=document.getElementById("cmenu");
  menu.style.left = pos+"pt";
  cmenu.style.left = pos+269+"pt";

}

function SelectShape() {
  redraw();
}

function HandleFile(file) {
  print(file);
  if (file.type === 'audio') {
    if (msc != null){
      msc.stop();
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
