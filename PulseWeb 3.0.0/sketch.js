var AudioB5 = 0;
var AudioB10 = 0;
var AudioB15 = 0;
var AudioB20 = 0;
var AudioB25 = 0;
var AudioB0 = 0;

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

var octaveBands;
var Bands;
var test = "";

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fft = new p5.FFT();


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

  //FFT readout
  octaveBands = fft.getOctaveBands(3);
  fft.analyze();
  Bands = fft.logAverages(octaveBands);
  AudioB5 = lerp(AudioB5, Bands[5] / 255, Smoothness);
  AudioB10 = lerp(AudioB10, Bands[10] / 255, Smoothness);
  AudioB15 = lerp(AudioB15, Bands[15] / 255, Smoothness);
  AudioB20 = lerp(AudioB20, Bands[20] / 255, Smoothness);
  AudioB25 = lerp(AudioB25, Bands[25] / 255, Smoothness);
  AudioB0 = lerp(AudioB0, Bands[0] / 255, Smoothness);

  //POINTS
  var A1 = (AudioB5 * 100);
  var A2 = (AudioB15 * 100);
  var A3 = (AudioB25 * 100);
  var Aall = (0 * 100);

  var Short3 = (AudioB0 * CenDist);
  var Short1 = (AudioB10 * CenDist);
  var Short2 = (AudioB20 * CenDist);
  var ShortAll = (0 * CenDist);

  var AallAngle = ((((2 * PI) / 100) * (Aall)) - (0.5 * PI));
  var A1Angle = ((((2 * PI) / 100) * (A1)) - (0.5 * PI));
  var A2Angle = ((((2 * PI) / 100) * (A2)) - (0.5 * PI));
  var A3Angle = ((((2 * PI) / 100) * (A3)) - (0.5 * PI));

  var Short3X = (((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - RotMX) * (Short3 / 10));
  var Short3Y = (((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - RotMY) * (Short3 / 10));
  var Short1X = (((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - RotMX) * (Short1 / 10));
  var Short1Y = (((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - RotMY) * (Short1 / 10));
  var Short2X = (((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - RotMX) * (Short2 / 10));
  var Short2Y = (((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - RotMY) * (Short2 / 10));
  var ShortallX = (((Length) + ((Length) * cos(AallAngle) + (Size / 10)) - RotMX) * (ShortAll / 10));
  var ShortallY = (((Length) + ((Length) * sin(AallAngle) + (Size / 10)) - RotMY) * (ShortAll / 10));

  //0 point for no sound
  var RestX = ((MidX) - (((((Length) + ((Length) * cos((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallX)));
  var RestY = ((MidY) - (((((Length) + ((Length) * sin((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallY)));

  //Positions
  var A1X = ((((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - Short1X)) + (RestX));
  var A1Y = ((((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - Short1Y)) + (RestY - 45));
  var A2X = ((((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - Short2X)) + (RestX - 40));
  var A2Y = ((((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - Short2Y)) + (RestY + 25));
  var A3X = ((((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - Short3X)) + (RestX + 40));
  var A3Y = ((((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - Short3Y)) + (RestY + 25));

  //console.log();


  //DRAW
  background(0);

  //DOTS
  fill(DotColor);
  strokeWeight(0);
  ellipse(MidX, MidY, Dsize, Dsize);
  ellipse(A1X, A1Y, Dsize, Dsize);
  ellipse(A2X, A2Y, Dsize, Dsize);
  ellipse(A3X, A3Y, Dsize, Dsize);
  //LINES
  fill(FillColor); //fillcolor
  strokeWeight(LineWidth);
  stroke(LineColor); //linecolor
  strokeJoin(ROUND);
  beginShape();
  vertex(A1X, A1Y);
  vertex(A2X, A2Y);
  vertex(A3X, A3Y);
  endShape(CLOSE);
  //MIDLINES
  strokeWeight(LineWidth);
  stroke(MLineColor); //mlinecolor
  line(A1X, A1Y, MidX, MidY);
  line(A2X, A2Y, MidX, MidY);
  line(A3X, A3Y, MidX, MidY);

  //SIDES
  settings();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function FileUpload(file) {
  print(file);
  if (file.type === 'audio') {
    msc = createAudio(file.data);
    msc.autoplay(false);
      fft.setInput(msc);
  }
}
