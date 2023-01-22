export default function getFinishTime(finishtime) {
    try {
        var res = finishtime.toString().split(":");
        if (res[0] === undefined || res[1] === undefined) {
            return finishtime
        } else {
            //console.log(res[0])
            if (res[0].startsWith("00")) {
                return res[1]
            } else if (res[0].startsWith("0")) {
                //console.log(' eine 0 ')
                return res[0].slice(1) + ":" + res[1]
            } else {
                return res[0] + ":" + res[1]
            }
        }
    } catch (e) {
        //console.log(e)
        return finishtime;
    }
}