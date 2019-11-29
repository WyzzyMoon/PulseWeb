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


function presettings(){
  iPlay = document.getElementById("iPlay");
  iPlay.onclick = function() {AudioPlay()};
  iPause = document.getElementById("iPause");
  iPause.onclick = function() {AudioPause()};
  iStop = document.getElementById("iStop");
  iStop.onclick = function() {AudioStop()};

  FileUpload()

  iSelect = document.getElementById("iSelect");
  //iSelect.value = Select;

  iSize = document.getElementById("iSize");
  iSize.value = Size;

  iDotsize = document.getElementById("iDotsize");
  iDotsize.value = Dotsize;

  iLineWidthSet = document.getElementById("iLineWidthSet");
  iLineWidthSet.value = LineWidthSet;

  iLineColor = document.getElementById("iLineColor");
  iLineColor.value = LineColor.toString('#rrggbb');
  iLineColorA = document.getElementById("iLineColorA");
  iLineColorA.value = LineColorA;

  iMLineColor = document.getElementById("iMLineColor");
  iMLineColor.value = MLineColor.toString('#rrggbb');
  iMLineColorA = document.getElementById("iMLineColorA");
  iMLineColorA.value = MLineColorA;

  iDotColor = document.getElementById("iDotColor");
  iDotColor.value = DotColor.toString('#rrggbb');
  iDotColorA = document.getElementById("iDotColorA");
  iDotColorA.value = DotColorA;

  iFillColor = document.getElementById("iFillColor");
  iFillColor.value = FillColor.toString('#rrggbb');
  iFillColorA = document.getElementById("iFillColorA");
  iFillColorA.value = FillColorA;

  iSideFillColor = document.getElementById("iSideFillColor");
  iSideFillColor.value = SideFillColor.toString('#rrggbb');
  iSideFillColorA = document.getElementById("iSideFillColorA");
  iSideFillColorA.value = SideFillColorA;

  iSmooth = document.getElementById("iSmooth");
  iSmooth.value = Smooth;

  iAttack = document.getElementById("iAttack");
  iAttack.value = Attack;

  iDecay = document.getElementById("iDecay");
  iDecay.value = Decay;

  iSenc = document.getElementById("iSenc");
  iSenc.value = Senc;

  iLineLength = document.getElementById("iLineLength");
  iLineLength.value = LineLength;

  iCenDist = document.getElementById("iCenDist");
  iCenDist.value = CenDist;

  iBGColor = document.getElementById("iBGColor");
  iBGColor.value = BGColor.toString('#rrggbb');

  iRandomize = document.getElementById("iRandomize");
  iRandomize.onclick = function() {Randomize()};

  closemenu = document.getElementById("closemenu");
  closemenu.onclick = function() {newpos = -269; document.getElementById("closemenu").style.display = "none"; document.getElementById("openmenu").style.display = ""};

  openmenu = document.getElementById("openmenu");
  openmenu.onclick = function() {newpos=0; document.getElementById("openmenu").style.display = "none"; document.getElementById("closemenu").style.display = ""};
  document.getElementById("openmenu").style.display = "none";
}

function FileUpload(){
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
  } else {
    console.log(
      'The File APIs are not fully supported in this browser. Cannot create element.'
    );
  }
  function handleFileSelect(evt) {
    function makeLoader(theFile) {
      // Making a p5.File object
      var p5file = new p5.File(theFile);
      return function(e) {
        p5file.data = e.target.result;
        HandleFile(p5file);
      };
    }
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = makeLoader(f);
    reader.readAsDataURL(f);
    var files = evt.target.files;
  };
}

function Randomize(){
  iDotsize.value = round(random(3));
  iLineWidthSet.value= round(random(2));
  iLineColor.value= "#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2);
  iLineColorA.value = random(255);
  iMLineColor.value = "#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2);
  iMLineColorA.value = random(255);
  iDotColor.value = "#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2);
  iDotColorA.value = random(255);
  iFillColor.value = "#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2);
  iFillColorA.value = random(255);
  iSideFillColor.value = "#" + hex(random(255),2) + hex(random(255),2) + hex(random(255),2);
  iSideFillColorA.value= random(255);
}

function settings(){
  background(BGColor);
  menuMove();

  //Size of the skin
  Size = iSize.value;
  //Dot Size
  Dotsize = iDotsize.value;
  //Line Width
  LineWidthSet = iLineWidthSet.value;
  //Color of the lines
  LineColor = color(iLineColor.value);
  LineColor.setAlpha(iLineColorA.value);
  //Color of the middle lines
  MLineColor = color(iMLineColor.value);
  MLineColor.setAlpha(iMLineColorA.value);
  //Color of the Dots
  DotColor = color(iDotColor.value);
  DotColor.setAlpha(iDotColorA.value);
  //Color of the Shape Fill
  FillColor = color(iFillColor.value);
  FillColor.setAlpha(iFillColorA.value);
  //Color of the Side Fill
  SideFillColor = color(iSideFillColor.value);
  SideFillColor.setAlpha(iSideFillColorA.value);
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = iSmooth.value;
  //Attack
  Attack = iAttack.value;
  //Decay
  Decay = iDecay.value;
  //Sensitivity
  Senc = iSenc.value;
  //Multiplication of all movement
  LineLength = iLineLength.value;
  //Distance from center
  CenDist = iCenDist.value;
  //Color of the Background
  BGColor = color(iBGColor.value);

}
