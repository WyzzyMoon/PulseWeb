/**
* ----------------------- PUSLEWEB -----------------------
* Date: 28-03-2019
* Version: 3.0.3 BETA
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
var BandP1 = 0;
var BandP2 = 0;
var BandP3 = 0;
var BandP4 = 0;
var BandP5 = 0;
var BandP6 = 0;
var BandS1 = 0;
var BandS2 = 0;
var BandS3 = 0;
var BandS4 = 0;
var BandS5 = 0;
var BandS6 = 0;
var LogAmpP1 = 0;
var LogAmpP2 = 0;
var LogAmpP3 = 0;
var LogAmpP4 = 0;
var LogAmpP5 = 0;
var LogAmpP6 = 0;
var LogAmpS1 = 0;
var LogAmpS2 = 0;
var LogAmpS3 = 0;
var LogAmpS4 = 0;
var LogAmpS5 = 0;
var LogAmpS6 = 0;
var LogAmpAll = 0;
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
var AudioAll = 0;
var AvrgArrayP1 = [];
var AvrgArrayP2 = [];
var AvrgArrayP3 = [];
var AvrgArrayP4 = [];
var AvrgArrayP5 = [];
var AvrgArrayP6 = [];
var AvrgArrayS1 = [];
var AvrgArrayS2 = [];
var AvrgArrayS3 = [];
var AvrgArrayS4 = [];
var AvrgArrayS5 = [];
var AvrgArrayS6 = [];
var AvrgArrayAll = [];
var AvrgP1 = 0;
var AvrgP2 = 0;
var AvrgP3 = 0;
var AvrgP4 = 0;
var AvrgP5 = 0;
var AvrgP6 = 0;
var AvrgS1 = 0;
var AvrgS2 = 0;
var AvrgS3 = 0;
var AvrgS4 = 0;
var AvrgS5 = 0;
var AvrgS6 = 0;
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
  FillColor = color(0, 255, 0);
  FillColorA = 25;
  //Color of the Side Fill
  SideFillColor = color(0, 0, 0);
  SideFillColorA = 25;
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = '35';
  //Sensitivity
  Senc = '4';
  //FFTAttack
  Attack = '300'
  //FFTDecay
  Decay= '150'
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

function CalcBands(){
  var SumP1 = 0;
  var SumP2 = 0;
  var SumP3 = 0;
  var SumP4 = 0;
  var SumP5 = 0;
  var SumP6 = 0;
  var SumS1 = 0;
  var SumS2 = 0;
  var SumS3 = 0;
  var SumS4 = 0;
  var SumS5 = 0;
  var SumS6 = 0;
  var SumAll = 0;

  AvrgArrayP1.push(Bands[BandP1]);
  if (AvrgArrayP1.length > Smoothness){
    AvrgArrayP1.shift();
  }
  for (i=0;i<AvrgArrayP1.length;i++){
    SumP1 = ((SumP1 + AvrgArrayP1[i]));
  }
  AvrgP1 = SumP1/Smoothness;

  AvrgArrayP2.push(Bands[BandP2]);
  if (AvrgArrayP2.length > Smoothness){
    AvrgArrayP2.shift();
  }
  for (i=0;i<AvrgArrayP2.length;i++){
    SumP2 = ((SumP2 + AvrgArrayP2[i]));
  }
  AvrgP2 = SumP2/Smoothness;

  AvrgArrayP3.push(Bands[BandP3]);
  if (AvrgArrayP3.length > Smoothness){
    AvrgArrayP3.shift();
  }
  for (i=0;i<AvrgArrayP3.length;i++){
  SumP3 = ((SumP3 + AvrgArrayP3[i]));
  }
  AvrgP3 = SumP3/Smoothness;

  AvrgArrayP4.push(Bands[BandP4]);
  if (AvrgArrayP4.length > Smoothness){
    AvrgArrayP4.shift();
  }
  for (i=0;i<AvrgArrayP4.length;i++){
  SumP4 = ((SumP4 + AvrgArrayP4[i]));
  }
  AvrgP4 = SumP4/Smoothness;

  AvrgArrayP5.push(Bands[BandP5]);
  if (AvrgArrayP5.length > Smoothness){
    AvrgArrayP5.shift();
  }
  for (i=0;i<AvrgArrayP5.length;i++){
  SumP5 = ((SumP5 + AvrgArrayP5[i]));
  }
  AvrgP5 = SumP5/Smoothness;

  AvrgArrayP6.push(Bands[BandP6]);
  if (AvrgArrayP6.length > Smoothness){
    AvrgArrayP6.shift();
  }
  for (i=0;i<AvrgArrayP6.length;i++){
  SumP6 = ((SumP6 + AvrgArrayP6[i]));
  }
  AvrgP6 = SumP6/Smoothness;

  AvrgArrayS1.push(Bands[BandS1]);
  if (AvrgArrayS1.length > Smoothness){
    AvrgArrayS1.shift();
  }
  for (i=0;i<AvrgArrayS1.length;i++){
    SumS1 = ((SumS1 + AvrgArrayS1[i]));
  }
  AvrgS1 = SumS1/Smoothness;

  AvrgArrayS2.push(Bands[BandS2]);
  if (AvrgArrayS2.length > Smoothness){
    AvrgArrayS2.shift();
  }
  for (i=0;i<AvrgArrayS2.length;i++){
    SumS2 = ((SumS2 + AvrgArrayS2[i]));
  }
  AvrgS2 = SumS2/Smoothness;

  AvrgArrayS3.push(Bands[BandS3]);
  if (AvrgArrayS3.length > Smoothness){
    AvrgArrayS3.shift();
  }
  for (i=0;i<AvrgArrayS3.length;i++){
  SumS3 = ((SumS3 + AvrgArrayS3[i]));
  }
  AvrgS3 = SumS3/Smoothness;

  AvrgArrayS4.push(Bands[BandS4]);
  if (AvrgArrayS4.length > Smoothness){
    AvrgArrayS4.shift();
  }
  for (i=0;i<AvrgArrayS4.length;i++){
  SumS4 = ((SumS4 + AvrgArrayS4[i]));
  }
  AvrgS4 = SumS4/Smoothness;

  AvrgArrayS5.push(Bands[BandS5]);
  if (AvrgArrayS5.length > Smoothness){
    AvrgArrayS5.shift();
  }
  for (i=0;i<AvrgArrayS5.length;i++){
  SumS5 = ((SumS5 + AvrgArrayS5[i]));
  }
  AvrgS5 = SumS5/Smoothness;

  AvrgArrayS6.push(Bands[BandS6]);
  if (AvrgArrayS6.length > Smoothness){
    AvrgArrayS6.shift();
  }
  for (i=0;i<AvrgArrayS6.length;i++){
  SumS6 = ((SumS6 + AvrgArrayS6[i]));
  }
  AvrgS6 = SumS6/Smoothness;

  AvrgArrayAll.push(amplitude.getLevel());
  if (AvrgArrayAll.length > Smoothness){
    AvrgArrayAll.shift();
  }
  for (i=0;i<AvrgArrayAll.length;i++){
  SumAll = ((SumAll + AvrgArrayAll[i]));
  }
  AvrgAll = SumAll/Smoothness;

  LogAmpP1 = max(0, 10.0 / Senc * Math.log10(AvrgP1/255)+1.0);
  LogAmpP2 = max(0, 10.0 / Senc * Math.log10(AvrgP2/255)+1.0);
  LogAmpP3 = max(0, 10.0 / Senc * Math.log10(AvrgP3/255)+1.0);
  LogAmpP4 = max(0, 10.0 / Senc * Math.log10(AvrgP4/255)+1.0);
  LogAmpP5 = max(0, 10.0 / Senc * Math.log10(AvrgP5/255)+1.0);
  LogAmpP6 = max(0, 10.0 / Senc * Math.log10(AvrgP6/255)+1.0);
  LogAmpS1 = max(0, 10.0 / Senc * Math.log10(AvrgS1/255)+1.0);
  LogAmpS2 = max(0, 10.0 / Senc * Math.log10(AvrgS2/255)+1.0);
  LogAmpS3 = max(0, 10.0 / Senc * Math.log10(AvrgS3/255)+1.0);
  LogAmpS4 = max(0, 10.0 / Senc * Math.log10(AvrgS4/255)+1.0);
  LogAmpS5 = max(0, 10.0 / Senc * Math.log10(AvrgS5/255)+1.0);
  LogAmpS6 = max(0, 10.0 / Senc * Math.log10(AvrgS6/255)+1.0);
  LogAmpAll = max(0, 10.0 / Senc * Math.log10(AvrgAll)+1.0);

  if (AudioP1 < LogAmpP1){
    AudioP1 = lerp(AudioP1, LogAmpP1, FFTAttack);
  }
  else {
    AudioP1 = lerp(AudioP1, LogAmpP1, (FFTDecay));
  }
  if (AudioP2 < LogAmpP2){
    AudioP2 = lerp(AudioP2, LogAmpP2, FFTAttack);
  }
  else {
    AudioP2 = lerp(AudioP2, LogAmpP2, (FFTDecay));
  }
  if (AudioP3 < LogAmpP3){
    AudioP3 = lerp(AudioP3, LogAmpP3, FFTAttack);
  }
  else {
    AudioP3 = lerp(AudioP3, LogAmpP3, (FFTDecay));
  }
  if (AudioP4 < LogAmpP4){
    AudioP4 = lerp(AudioP4, LogAmpP4, FFTAttack);
  }
  else {
    AudioP4 = lerp(AudioP4, LogAmpP4, (FFTDecay));
  }
  if (AudioP5 < LogAmpP5){
    AudioP5 = lerp(AudioP5, LogAmpP5, FFTAttack);
  }
  else {
    AudioP5 = lerp(AudioP5, LogAmpP5, (FFTDecay));
  }
  if (AudioP6 < LogAmpP6){
    AudioP6 = lerp(AudioP6, LogAmpP6, FFTAttack);
  }
  else {
    AudioP6 = lerp(AudioP6, LogAmpP6, (FFTDecay));
  }
  if (AudioS1 < LogAmpS1){
    AudioS1 = lerp(AudioS1, LogAmpS1, FFTAttack);
  }
  else {
    AudioS1 = lerp(AudioS1, LogAmpS1, (FFTDecay));
  }
  if (AudioS2 < LogAmpS2){
    AudioS2 = lerp(AudioS2, LogAmpS2, FFTAttack);
  }
  else {
    AudioS2 = lerp(AudioS2, LogAmpS2, (FFTDecay));
  }
  if (AudioS3 < LogAmpS3){
    AudioS3 = lerp(AudioS3, LogAmpS3, FFTAttack);
  }
  else {
    AudioS3 = lerp(AudioS3, LogAmpS3, (FFTDecay));
  }
  if (AudioS4 < LogAmpS4){
    AudioS4 = lerp(AudioS4, LogAmpS4, FFTAttack);
  }
  else {
    AudioS4 = lerp(AudioS4, LogAmpS4, (FFTDecay));
  }
  if (AudioS5 < LogAmpS5){
    AudioS5 = lerp(AudioS5, LogAmpS5, FFTAttack);
  }
  else {
    AudioS5 = lerp(AudioS5, LogAmpS5, (FFTDecay));
  }
  if (AudioS6 < LogAmpS6){
    AudioS6 = lerp(AudioS6, LogAmpS6, FFTAttack);
  }
  else {
    AudioS6 = lerp(AudioS6, LogAmpS6, (FFTDecay));
  }
  if (AudioAll < LogAmpAll){
    AudioAll = lerp(AudioAll, LogAmpAll, FFTAttack);
  }
  else {
    AudioAll = lerp(AudioAll, LogAmpAll, (FFTDecay));
  }

}
