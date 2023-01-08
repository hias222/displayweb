export default function getMilliSecondsFromTimeString(runningTime) {
  try {
    //00:10,9
    var res = runningTime.toString().split(":");
    var minutes = parseInt(res[0]);
    var res2 = res[1].toString().split(",");
    var seconds = parseInt(res2[0]);
    var zentel = parseInt(res2[1]);
    //console.log(
    //  "Minutes: " + minutes + " seconds " + seconds + " zentel " + zentel
    //);
    var allSeconds = minutes * 60 * 1000 + seconds * 1000 + zentel * 100;
    return allSeconds;
  } catch (e) {
    //console.log(e)
    return 0;
  }
}
