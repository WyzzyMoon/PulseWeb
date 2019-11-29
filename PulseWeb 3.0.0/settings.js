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
var iLineLength;
var iCenDist;

function presettings(){

  var h = 10;
  var d = 40;
  var space = 10;

  input = createFileInput(FileUpload);
  iSize = createInput('100', 'int');
  iDotsize = createInput('1.0', 'float');
  iLineWidthSet = createInput('0.4', 'float');

  iLineColorR = createInput('255', 'int');
  iLineColorG = createInput('255', 'int');
  iLineColorB = createInput('255', 'int');
  iLineColorA = createInput('150', 'int');

  iMLineColorR = createInput('255', 'int');
  iMLineColorG = createInput('255', 'int');
  iMLineColorB = createInput('255', 'int');
  iMLineColorA = createInput('75', 'int');

  iDotColorR = createInput('255', 'int');
  iDotColorG = createInput('255', 'int');
  iDotColorB = createInput('255', 'int');
  iDotColorA = createInput('255', 'int');

  iFillColorR = createInput('255', 'int');
  iFillColorG = createInput('255', 'int');
  iFillColorB = createInput('255', 'int');
  iFillColorA = createInput('0', 'int');

  iSideFillColorR = createInput('0', 'int');
  iSideFillColorG = createInput('0', 'int');
  iSideFillColorB = createInput('0', 'int');
  iSideFillColorA = createInput('0', 'int');

  iSmooth = createInput('45', 'int');
  iLineLength = createInput('6', 'int');
  iCenDist = createInput('70', 'int');

  input.position(d, 50-(1*(h+space)));
  iSize.position(d, 50);
  iDotsize.position(d, 50+(1*(h+space)));
  iLineWidthSet.position(d, 50+(2*(h+space)));
  iLineColorR.position((d+(0*(20+space))), 50+(3*(h+space)));
  iLineColorG.position((d+(1*(20+space))), 50+(3*(h+space)));
  iLineColorB.position((d+(2*(20+space))), 50+(3*(h+space)));
  iLineColorA.position((d+(3*(20+space))), 50+(3*(h+space)));
  iMLineColorR.position((d+(0*(20+space))), 50+(4*(h+space)));
  iMLineColorG.position((d+(1*(20+space))), 50+(4*(h+space)));
  iMLineColorB.position((d+(2*(20+space))), 50+(4*(h+space)));
  iMLineColorA.position((d+(3*(20+space))), 50+(4*(h+space)));
  iDotColorR.position((d+(0*(20+space))), 50+(5*(h+space)));
  iDotColorG.position((d+(1*(20+space))), 50+(5*(h+space)));
  iDotColorB.position((d+(2*(20+space))), 50+(5*(h+space)));
  iDotColorA.position((d+(3*(20+space))), 50+(5*(h+space)));
  iFillColorR.position((d+(0*(20+space))), 50+(6*(h+space)));
  iFillColorG.position((d+(1*(20+space))), 50+(6*(h+space)));
  iFillColorB.position((d+(2*(20+space))), 50+(6*(h+space)));
  iFillColorA.position((d+(3*(20+space))), 50+(6*(h+space)));
  iSideFillColorR.position((d+(0*(20+space))), 50+(7*(h+space)));
  iSideFillColorG.position((d+(1*(20+space))), 50+(7*(h+space)));
  iSideFillColorB.position((d+(2*(20+space))), 50+(7*(h+space)));
  iSideFillColorA.position((d+(3*(20+space))), 50+(7*(h+space)));
  iSmooth.position(d, 50+(8*(h+space)));
  iLineLength.position(d, 50+(9*(h+space)));
  iCenDist.position(d, 50+(10*(h+space)));

iValues = selectAll('input');
console.log(iValues[2]);
for (var i = 0; i < iValues.length; i++) {
    iValues[i].size(20,h);
  }
}

function settings(){
  //Size of the skin
  Size = iSize.value();
  //Dot Size
  Dotsize = iDotsize.value();
  //Line Width
  LineWidthSet = iLineWidthSet.value();
  //Color of the lines
  LineColor = color(iLineColorR.value(), iLineColorG.value(), iLineColorB.value(), (iLineColorA.value()/1));
  //Color of the middle lines
  MLineColor = color(iMLineColorR.value(), iMLineColorG.value(), iMLineColorB.value(), (iMLineColorA.value()/1));
  //Color of the Dots
  DotColor = color(iDotColorR.value(), iDotColorG.value(), iDotColorB.value(), (iDotColorA.value()/1));
  //Color of the Shape Fill
  FillColor = color(iFillColorR.value(), iFillColorG.value(), iFillColorB.value(), (iFillColorA.value()/1));
  //Color of the Side Fill
  SideFillColor = color(iSideFillColorR.value(), iSideFillColorG.value(), iSideFillColorB.value(), (iSideFillColorA.value()/1));
  //Smoothness (higher is smoother lower is more responsive)
  Smooth = iSmooth.value();
  //Multiplication of all movement
  LineLength = iLineLength.value();
  //Distance from center
  CenDist = iCenDist.value();

  //console.log(LineColor._array[3]);

}
