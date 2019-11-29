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
function CalcBands(){
  var SumP = [0,0,0,0,0,0];
  var SumS = [0,0,0,0,0,0];
  var SumAll = 0;

  //CREATE SMOOTHES AVRAGERS
  for (c=0;c<6;c++){
    AvrgArrayP[c].push(Bands[BandP[c]]);
    if (AvrgArrayP[c].length > Smoothness){
      AvrgArrayP[c].shift();
    }

    for (i=0;i<AvrgArrayP[c].length;i++){
      SumP[c] = ((SumP[c] + AvrgArrayP[c][i]));
    }
    AvrgP[c] = SumP[c]/Smoothness;
  }
  for (c=0;c<6;c++){
    AvrgArrayS[c].push(Bands[BandS[c]]);
    if (AvrgArrayS[c].length > Smoothness){
      AvrgArrayS[c].shift();
    }
    for (i=0;i<AvrgArrayS[c].length;i++){
      SumS[c] = ((SumS[c] + AvrgArrayS[c][i]));
    }
    AvrgS[c] = SumS[c]/Smoothness;
  }

  AvrgArrayAll.push(amplitude.getLevel());
  if (AvrgArrayAll.length > Smoothness){
    AvrgArrayAll.shift();
  }
  for (i=0;i<AvrgArrayAll.length;i++){
    SumAll = ((SumAll + AvrgArrayAll[i]));
  }
  AvrgAll = SumAll/Smoothness;

  //CACLCULATE LOGARITMIC AMPLITUDE AND SENSITIVITY
  for (c=0;c<6;c++){
    LogAmpP[c] = max(0, 10.0 / Senc * Math.log10(AvrgP[c]/255)+1.0);
  }
  for (c=0;c<6;c++){
    LogAmpS[c] = max(0, 10.0 / Senc * Math.log10(AvrgS[c]/255)+1.0);
  }
  LogAmpAll = max(0, 10.0 / Senc * Math.log10(AvrgAll)+1.0);


  //LINEAR INTERPOLATION

  for (c=0;c<6;c++){
    if (AudioP[c] < LogAmpP[c]){
      AudioP[c] = lerp(AudioP[c], LogAmpP[c], FFTAttack);
    }
    else {
      AudioP[c] = lerp(AudioP[c], LogAmpP[c], (FFTDecay));
    }
  }
  for (c=0;c<6;c++){
    if (AudioS[c] < LogAmpS[c]){
      AudioS[c] = lerp(AudioS[c], LogAmpS[c], FFTAttack);
    }
    else {
      AudioS[c] = lerp(AudioS[c], LogAmpS[c], (FFTDecay));
    }
  }
  if (AudioAll < LogAmpAll){
    AudioAll = lerp(AudioAll, LogAmpAll, FFTAttack);
  }
  else {
    AudioAll = lerp(AudioAll, LogAmpAll, (FFTDecay));
  }

}
