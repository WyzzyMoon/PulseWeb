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
function CalcBands(){
  var SumAll = 0;
  var LogAmpSum=0;

  //CACLCULATE LOGARITMIC AMPLITUDE OF THE BANDS AND ADD SENSITIVITY
  for(var i = 0; i < Bands.length; i++) {
    LogAmpSum += Bands[i];
  }

  var Allbands = LogAmpSum / Bands.length;
  LogAmpAll = max(0, 10.0 / Senc * Math.log10(Allbands/255)+1.0);


  for (c=0;c<Bands.length;c++){
    LogAmpBands[c] = max(0, 10.0 / Senc * Math.log10((Bands[c])/255)+1.0);
  }

  //LINEAR INTERPOLATION
  if (AudioAll < LogAmpAll){
    AudioAll = lerp(AudioAll, LogAmpAll, FFTAttack);
  }
  else {
    AudioAll = lerp(AudioAll, LogAmpAll, (FFTDecay));
  }
  AvrgAll = AverageAll();

  for (c=0;c<6;c++){
    if (AudioP[c] < LogAmpBands[BandP[c]]){
      AudioP[c] = lerp(AudioP[c], LogAmpBands[BandP[c]], FFTAttack);
    }
    else {
      AudioP[c] = lerp(AudioP[c], LogAmpBands[BandP[c]], (FFTDecay));
    }
  }
  AvrgP = AverageSize(AudioP, Smoothness);

  for (c=0;c<6;c++){
    if (AudioS[c] < LogAmpBands[BandS[c]]){
      AudioS[c] = lerp(AudioS[c], LogAmpBands[BandS[c]], FFTAttack);
    }
    else {
      AudioS[c] = lerp(AudioS[c], LogAmpBands[BandS[c]], (FFTDecay));
    }
  }
  AvrgS = AverageSize(AudioS, Smoothness);




  //CREATE SMOOTHNESS AVRAGERS

  function AverageSize(input, amount){
    var Sum = [0,0,0,0,0,0];
    for (c=0;c<6;c++){
      AvrgArray[c].push(input[c]);
      if (AvrgArray[c].length > amount){
        AvrgArray[c].shift();
        AvrgArray[c].length = amount;
      }
      for (i=0;i<AvrgArray[c].length;i++){
        Sum[c] = ((Sum[c] + AvrgArray[c][i]));
      }
      Avrg[c] = Sum[c]/AvrgArray[c].length;
    }
    return Avrg;
  }

  function AverageAll(){
  AvrgArrayAll.push(AudioAll);
  if (AvrgArrayAll.length > Smoothness){
    AvrgArrayAll.shift();
    AvrgArrayAll[c].length = Smoothness;
  }
  for (i=0;i<AvrgArrayAll.length;i++){
    SumAll = ((SumAll + AvrgArrayAll[i]));
  }
  return SumAll/AvrgArrayAll.length;
}

}
