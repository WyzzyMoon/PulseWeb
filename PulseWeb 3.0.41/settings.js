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

var iSize;
var iDotsize;
var iLineWidthSet;
var iLineColorR;
var iLineColorG;
var iLineColorB;
var iLineColorA;
var iMLineColorR;
var iMLineColorG;
var iMLineColorB;
var iMLineColorA;
var iDotColorR;
var iDotColorG;
var iDotColorB;
var iDotColorA;
var iFillColorR;
var iFillColorG;
var iFillColorB;
var iFillColorA;
var iSideFillColorR;
var iSideFillColorG;
var iSideFillColorB;
var iSideFillColorA;
var iSmooth;
var iAttack;
var iDecay;
var iSenc;
var iLineLength;
var iCenDist;

//Menu
var topmargin = 5;
var sidemargin = 5;
var col1 = 12 + sidemargin;
var col2 = 150 + sidemargin;
var blockhight = 9;
var blockspace = 12;
var blockstep = (blockhight + blockspace);
var texthight = 14;
var linehight = blockspace - 5;
var linestep = texthight + linehight;
var textoffset = topmargin + 10;
var coloroffset = 12.5;
var alphaoffset = 40;





function presettings(){

  input = createFileInput(FileUpload);
  iPlay = createButton('▶');
  iPlay.mousePressed(AudioPlay);
  iPause = createButton('‖‖');
  iPause.mousePressed(AudioPause);
  iStop = createButton('■');
  iStop.mousePressed(AudioStop);


  iSelect = createSelect();
  iSelect.option('DDP-Butterfly')
  iSelect.option('TriPulse');
  iSelect.option('QuadPulse');
  iSelect.option('PentaPulse');
  iSelect.option('HexPulse');
  iSelect.changed(SelectShape);


  iSize = createInput(Size, 'int');
  iDotsize = createInput(Dotsize, 'float');
  iLineWidthSet = createInput(LineWidthSet, 'float');

  iLineColor = createColorPicker(LineColor);
  iLineColorA = createSlider(0, 255, LineColorA);

  iMLineColor = createColorPicker(MLineColor);
  iMLineColorA = createSlider(0, 255, MLineColorA);

  iDotColor = createColorPicker(DotColor);
  iDotColorA = createSlider(0, 255, DotColorA);

  iFillColor = createColorPicker(FillColor);
  iFillColorA = createSlider(0, 255, FillColorA);

  iSideFillColor = createColorPicker(SideFillColor);
  iSideFillColorA = createSlider(0, 255, SideFillColorA);

  iSmooth = createInput(Smooth, 'int');
  iAttack = createInput(Attack, 'int');
  iDecay = createInput(Decay, 'int');
  iSenc = createInput(Senc, 'int');
  iLineLength = createInput(LineLength, 'int');
  iCenDist = createInput(CenDist, 'int');

  iBGColor = createColorPicker(BGColor);

  iRandomize = createButton('~');
  iRandomize.mousePressed(Randomize);

  input.position(col2, (0.7*(blockstep) + topmargin));
  iPlay.position(col1+60, (2.3*(blockstep) + topmargin));
  iPause.position(col1+120, (2.3*(blockstep) + topmargin));
  iStop.position(col1+180, (2.3*(blockstep) + topmargin));
  iSelect.position(col2, (4*(blockstep) + topmargin));
  iSize.position(col2, (5*(blockstep) + topmargin));
  iDotsize.position(col2, (6*(blockstep) + topmargin));
  iLineWidthSet.position(col2, (7*(blockstep) + topmargin));
  iLineColor.position(col2 - coloroffset, (8*(blockstep) + topmargin));
  iLineColorA.position(col2 + alphaoffset, (8*(blockstep) + topmargin));
  iMLineColor.position(col2 - coloroffset, (9*(blockstep) + topmargin));
  iMLineColorA.position(col2 + alphaoffset, (9*(blockstep) + topmargin));
  iDotColor.position(col2 - coloroffset, (10*(blockstep) + topmargin));
  iDotColorA.position(col2 + alphaoffset, (10*(blockstep) + topmargin));
  iFillColor.position(col2 - coloroffset, (11*(blockstep) + topmargin));
  iFillColorA.position(col2 + alphaoffset, (11*(blockstep) + topmargin));
  iSideFillColor.position(col2 - coloroffset, (12*(blockstep) + topmargin));
  iSideFillColorA.position(col2 + alphaoffset, (12*(blockstep) + topmargin));
  iSmooth.position(col2, (13*(blockstep) + topmargin));
  iAttack.position(col2, (14*(blockstep) + topmargin));
  iDecay.position(col2, (15*(blockstep) + topmargin));
  iSenc.position(col2, (16*(blockstep) + topmargin));
  iLineLength.position(col2, (17*(blockstep) + topmargin));
  iCenDist.position(col2, (18*(blockstep) + topmargin));
  iBGColor.position(col2 - coloroffset, (19*(blockstep) + topmargin));
  iRandomize.position(col2, (20*(blockstep) + topmargin));


  iValues = selectAll('input');
  console.log(iLineColor);
  for (var i = 0; i < iValues.length; i++) {
    iValues[i].size(20,blockhight);
  }
  input.size(200,(2*blockhight));
  iSelect.size(100,blockhight);
  iLineColor.size(50,blockhight);
  iMLineColor.size(50,blockhight);
  iDotColor.size(50,blockhight);
  iFillColor.size(50,blockhight);
  iSideFillColor.size(50,blockhight);
  iLineColorA.size(100,blockhight);
  iMLineColorA.size(100,blockhight);
  iDotColorA.size(100,blockhight);
  iFillColorA.size(100,blockhight);
  iSideFillColorA.size(100,blockhight);
  iBGColor.size(50,blockhight);

  FileInput();
}

function Randomize(){
  iDotsize.value(random(3));
  iLineWidthSet.value(random(2));
  iLineColor.value("#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2));
  iLineColorA.value(random(255));
  iMLineColor.value("#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2));
  iMLineColorA.value(random(255));
  iDotColor.value("#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2));
  iDotColorA.value(random(255));
  iFillColor.value("#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2));
  iFillColorA.value(random(255));
  iSideFillColor.value("#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2));
  iSideFillColorA.value(random(255));

}

function FileInput(){
  input = createFileInput(FileUpload);
  input.position(col2, (0.7*(blockstep) + topmargin));
  input.size(200,(2*blockhight));
}

function settings(){
  background(BGColor);
  fill('rgba(255,255,255, 0.2)');
  rect(sidemargin, topmargin, 330, (21*linestep) + textoffset);

  textSize(texthight);
  fill(255);
  noStroke();
  text('Upload Song', col1, ((0.7*linestep) + textoffset));
  text('Shape',  col1, ((4*linestep) + textoffset));
  text('Size',  col1, ((5*linestep) + textoffset));
  text('Dot Size',  col1, ((6*linestep) + textoffset));
  text('Line Width',  col1, ((7*linestep) + textoffset));
  text('Line Color',  col1, ((8*linestep) + textoffset));
  text('Mid-Line Color',  col1, ((9*linestep) + textoffset));
  text('Dot Color',  col1, ((10*linestep) + textoffset));
  text('Fill Color',  col1, ((11*linestep) + textoffset));
  text('Side-Fill Color',  col1, ((12*linestep) + textoffset));
  text('Smoothness',  col1, ((13*linestep) + textoffset));
  text('Attack',  col1, ((14*linestep) + textoffset));
  text('Decay',  col1, ((15*linestep) + textoffset));
  text('Sensitivity',  col1, ((16*linestep) + textoffset));
  text('Line Length',  col1, ((17*linestep) + textoffset));
  text('Center Distance',  col1, ((18*linestep) + textoffset));
  text('Background Color',  col1, ((19*linestep) + textoffset));
  text('Randomize',  col1, ((20*linestep) + textoffset));
  //CREDIT
  textSize(11);
  text('PulseWeb 3.0.5 BETA ©2019 by Wikke Andeweg', 7, ((21*linestep) + textoffset));


  //Size of the skin
  Size = iSize.value();
  //Dot Size
  Dotsize = iDotsize.value();
  //Line Width
  LineWidthSet = iLineWidthSet.value();
  //Color of the lines
  LineColor = iLineColor.color();
  LineColor.setAlpha(iLineColorA.value());
  //Color of the middle lines
  MLineColor = iMLineColor.color();
  MLineColor.setAlpha(iMLineColorA.value())
  //Color of the Dots
  DotColor = iDotColor.color();
  DotColor.setAlpha(iDotColorA.value())
  //Color of the Shape Fill
  FillColor = iFillColor.color();
  FillColor.setAlpha(iFillColorA.value())
  //Color of the Side Fill
  SideFillColor = iSideFillColor.color();
  SideFillColor.setAlpha(iSideFillColorA.value())
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = iSmooth.value();
  //Attack
  Attack = iAttack.value();
  //Decay
  Decay = iDecay.value();
  //Sensitivity
  Senc = iSenc.value();
  //Multiplication of all movement
  LineLength = iLineLength.value();
  //Distance from center
  CenDist = iCenDist.value();
  //Color of the Background
  BGColor = iBGColor.color();



  //console.log(LineColor._array[3]);

}
