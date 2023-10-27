module.exports = function get_weather(weather) {
  var obj = "";
  try {
    obj = JSON.parse(weather);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else {
      throw error;
    }
  }
  console.log(obj);

  let datas = obj.response.body.items.item;

  let tm = 0;
  let hu = 0;
  for (let d of datas) {
    if (d.category === "REH") {
      hu = d.obsrValue;
    } else if (d.category === "T1H") {
      tm = d.obsrValue;
    }
  }

  console.log("tm = " + tm);
  console.log("hu = " + hu);
};

function cal_discomfort(tm, hu) {
  let f_tm = parseFloat(tm);
  let f_hu = parseFloat(hu);
  let discomfort = f_tm - 0.55 * (1 - 0.01 * f_hu) * (f_tm - 14.5);
  // 21 도 이하는 쾌적, 21~24 : 반이하 불쾌, 24~27 반 이상이 불쾌, 29-32: 대부분 불쾌, 32: 조치 필요
  return discomfort;
}
