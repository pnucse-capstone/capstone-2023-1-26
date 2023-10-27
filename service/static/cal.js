var draw_chart = require("./user");

module.exports = function (cal, topik) {
  var obj = "";
  try {
    obj = JSON.parse(cal);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else {
      throw error;
    }
  }

  if (topik == "in") {
    console.log(obj.count);
    console.log(obj.address);
    draw_chart(obj.count);
  } else {
    console.log(obj.count);
    console.log(obj.address);
  }
};
