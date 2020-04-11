const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');
const sheets = xlsx.parse('./test.xlsx');

let JSONArr = []

sheets.map(sheet => {

  if (sheet.data.length !== 0) {
    var { data } = sheet
    var tempObj = {}

    for (var i = 1, len = data.length; i < len; i++) {

      for (var j = 0, len1 = data[0].length; j < len1; j++) {

        tempObj[data[0][j]] = data[i][j]

      }

      JSONArr.push(tempObj)

      tempObj = {}
    }

  }

});

let str = JSON.stringify(JSONArr)
fs.writeFile(path.resolve(__dirname, './test.json'), str, function (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log('写入完成')
  }
})



// 使用xls-to-json 模块
/* node_xj = require("xls-to-json");
node_xj({
  input: "sample.xls",  // 输入 xls
  output: "output.json", // 输出json
  sheet: "sheetname"  // 特殊 Excel 表名
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
}); */

