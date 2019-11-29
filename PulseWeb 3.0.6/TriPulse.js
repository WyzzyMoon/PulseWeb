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

function TriPulse(){
//Bands
BandP[0] = 5;
BandP[1] = 15;
BandP[2] = 25;
BandS[0] = 10;
BandS[1] = 20;
BandS[2] = 0;

CalcBands();

//POINTS
var A1 = (AvrgP[0] * 100);
var A2 = (AvrgP[1] * 100);
var A3 = (AvrgP[2] * 100);
var Aall = (AvrgAll * 100);

var Short1 = (AvrgS[0] * CenDist);
var Short2 = (AvrgS[1] * CenDist);
var Short3 = (AvrgS[2] * CenDist);
var ShortAll = (AvrgAll * CenDist);

var AallAngle = ((((2 * PI) / 100) * (Aall)) - (0.5 * PI));
var A1Angle = ((((2 * PI) / 100) * (A1)) - (0.5 * PI));
var A2Angle = ((((2 * PI) / 100) * (A2)) - (0.5 * PI));
var A3Angle = ((((2 * PI) / 100) * (A3)) - (0.5 * PI));

var Short1X = (((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - RotMX) * (Short1 / 10));
var Short1Y = (((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - RotMY) * (Short1 / 10));
var Short2X = (((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - RotMX) * (Short2 / 10));
var Short2Y = (((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - RotMY) * (Short2 / 10));
var Short3X = (((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - RotMX) * (Short3 / 10));
var Short3Y = (((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - RotMY) * (Short3 / 10));
var ShortallX = (((Length) + ((Length) * cos(AallAngle) + (Size / 10)) - RotMX) * (ShortAll / 10));
var ShortallY = (((Length) + ((Length) * sin(AallAngle) + (Size / 10)) - RotMY) * (ShortAll / 10));

//0 point for no sound
var RestX = ((MidX) - (((((Length) + ((Length) * cos((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallX)));
var RestY = ((MidY) - (((((Length) + ((Length) * sin((((2 * PI) / 60) * (0)) - (0.5 * PI)))) + (Size / 10)) - ShortallY)));


//Positions
var A1X = ((((Length) + ((Length) * cos(A1Angle) + (Size / 10)) - Short1X)) + (RestX));
var A1Y = ((((Length) + ((Length) * sin(A1Angle) + (Size / 10)) - Short1Y)) + (RestY - (45/10*(Size/10))));
var A2X = ((((Length) + ((Length) * cos(A2Angle) + (Size / 10)) - Short2X)) + (RestX - (40/10*(Size/10))));
var A2Y = ((((Length) + ((Length) * sin(A2Angle) + (Size / 10)) - Short2Y)) + (RestY + (25/10*(Size/10))));
var A3X = ((((Length) + ((Length) * cos(A3Angle) + (Size / 10)) - Short3X)) + (RestX + (40/10*(Size/10))));
var A3Y = ((((Length) + ((Length) * sin(A3Angle) + (Size / 10)) - Short3Y)) + (RestY + (25/10*(Size/10))));

//console.log();


//DRAW
settings();

//CENTER DOT
fill(DotColor);
strokeWeight(0);
ellipse(MidX, MidY, Dsize, Dsize);

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
vertex(A1X, A1Y);
vertex(MidX, MidY);
endShape(CLOSE);

//MIDLINES
strokeWeight(LineWidth);
stroke(MLineColor); //mlinecolor
line(A1X, A1Y, MidX, MidY);
line(A2X, A2Y, MidX, MidY);
line(A3X, A3Y, MidX, MidY);

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

//DOTS
fill(DotColor);
strokeWeight(0);
ellipse(A1X, A1Y, Dsize, Dsize);
ellipse(A2X, A2Y, Dsize, Dsize);
ellipse(A3X, A3Y, Dsize, Dsize);

}
