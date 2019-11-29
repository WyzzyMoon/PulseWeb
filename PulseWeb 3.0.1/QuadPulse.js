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

function QuadPulse(){

//FFT readout
octaveBands = fft.getOctaveBands(3);
fft.analyze();
Bands = fft.logAverages(octaveBands);
AudioP1 = lerp(AudioP1, Bands[7] / 255, Smoothness);
AudioP2 = lerp(AudioP2, Bands[14] / 255, Smoothness);
AudioP3 = lerp(AudioP3, Bands[21] / 255, Smoothness);
AudioP4 = lerp(AudioP4, Bands[28] / 255, Smoothness);
AudioS1 = lerp(AudioS1, Bands[0] / 255, Smoothness);
AudioS2 = lerp(AudioS2, Bands[10] / 255, Smoothness);
AudioS3 = lerp(AudioS3, Bands[20] / 255, Smoothness);
AudioS4 = lerp(AudioS4, Bands[29] / 255, Smoothness);

//CALCULATIONS
var A1 = (AudioP1 * 100);
var A2 = (AudioP2 * 100);
var A3 = (AudioP3 * 100);
var A4 = (AudioP4 * 100);
var Aall = (0 * 100);

var Short1 = (AudioS1 * CenDist);
var Short2 = (AudioS2 * CenDist);
var Short3 = (AudioS3 * CenDist);
var Short4 = (AudioS4 * CenDist);
var ShortAll = (0 * CenDist);

var AallAngle = ((((2 * PI) / 100) * (Aall)) - (0.5 * PI));
var A1Angle = ((((2 * PI) / 100) * (A1)) - (0.5 * PI));
var A2Angle = ((((2 * PI) / 100) * (A2)) - (0.5 * PI));
var A3Angle = ((((2 * PI) / 100) * (A3)) - (0.5 * PI));
var A4Angle = ((((2 * PI) / 100) * (A4)) - (0.5 * PI));

var Short1X = (((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - RotMX) * (Short1 / 10));
var Short1Y = (((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - RotMY) * (Short1 / 10));
var Short2X = (((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - RotMX) * (Short2 / 10));
var Short2Y = (((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - RotMY) * (Short2 / 10));
var Short3X = (((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - RotMX) * (Short3 / 10));
var Short3Y = (((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - RotMY) * (Short3 / 10));
var Short4X = (((Length) + ((Length) * cos(A4Angle) + (Size / 10)) - RotMX) * (Short4 / 10));
var Short4Y = (((Length) + ((Length) * sin(A4Angle) + (Size / 10)) - RotMY) * (Short4 / 10));
var ShortallX = (((Length) + ((Length) * cos(AallAngle) + (Size / 10)) - RotMX) * (ShortAll / 10));
var ShortallY = (((Length) + ((Length) * sin(AallAngle) + (Size / 10)) - RotMY) * (ShortAll / 10));

//0 point for no sound
var RestX = ((MidX) - (((((Length) + ((Length) * cos((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallX)));
var RestY = ((MidY) - (((((Length) + ((Length) * sin((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallY)));

//Positions
var A1X = ((((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - Short1X)) + (RestX - 30));
var A1Y = ((((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - Short1Y)) + (RestY - 30));
var A2X = ((((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - Short2X)) + (RestX - 30));
var A2Y = ((((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - Short2Y)) + (RestY + 30));
var A3X = ((((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - Short3X)) + (RestX + 30));
var A3Y = ((((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - Short3Y)) + (RestY + 30));
var A4X = ((((Length) + ((Length) * cos(A4Angle) + (Size / 10)) - Short4X)) + (RestX + 30));
var A4Y = ((((Length) + ((Length) * sin(A4Angle) + (Size / 10)) - Short4Y)) + (RestY - 30));


//DRAW
settings();

//SIDES
fill(SideFillColor); //fillcolor
noStroke();
strokeJoin(ROUND);
beginShape();
vertex(A1X, A1Y);
vertex(A2X, A2Y);
vertex(MidX, MidY);
endShape(CLOSE);

beginShape();
vertex(A2X, A2Y);
vertex(A3X, A3Y);
vertex(MidX, MidY);
endShape(CLOSE);

beginShape();
vertex(A3X, A3Y);
vertex(A4X, A4Y);
vertex(MidX, MidY);
endShape(CLOSE);

beginShape();
vertex(A4X, A4Y);
vertex(A1X, A1Y);
vertex(MidX, MidY);
endShape(CLOSE);


//MIDLINES
strokeWeight(LineWidth);
stroke(MLineColor); //mlinecolor
line(A1X, A1Y, MidX, MidY);
line(A2X, A2Y, MidX, MidY);
line(A3X, A3Y, MidX, MidY);
line(A4X, A4Y, MidX, MidY);
//LINES
fill(FillColor); //fillcolor
strokeWeight(LineWidth);
stroke(LineColor); //linecolor
strokeJoin(ROUND);
beginShape();
vertex(A1X, A1Y);
vertex(A2X, A2Y);
vertex(A3X, A3Y);
vertex(A4X, A4Y);
endShape(CLOSE);
//DOTS
fill(DotColor);
strokeWeight(0);
ellipse(MidX, MidY, Dsize, Dsize);
ellipse(A1X, A1Y, Dsize, Dsize);
ellipse(A2X, A2Y, Dsize, Dsize);
ellipse(A3X, A3Y, Dsize, Dsize);
ellipse(A4X, A4Y, Dsize, Dsize);



}
