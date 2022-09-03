var cheerio = require("cheerio");
var request = require("request");
var http = require("http");
var fs = require("fs")
var id = 1212492;
var count = 0;

var result = [];

function writeData(){
	var result_string = JSON.stringify(result);
	fs.writeFileSync("data.json",result_string)
}

function getData(){
	request.get({url:"http://maoyan.com/films/" + id}, function(err, response, body){
		var $ = cheerio.load(response.body)
		var data = {};
		data.intro = $(".dra").text();
		data.name = $(".name").eq(0).text();
		data.name_en = $(".ename.ellipsis").text();
		data.label = $(".movie-brief-container ul li").eq(0).text();
		data.address = $(".movie-brief-container ul li").eq(1).text().split("/")[0].replace(/[\r\n\s]/g, "");
		data.time = parseInt($(".movie-brief-container ul li").eq(1).text().split("/")[1]);
		data.date = $(".movie-brief-container ul li").eq(2).text().slice(0,10)
		data.score = parseInt(Math.random() * 100) / 10;
		data.ticket = parseInt(Math.random() * 1000) / 10;
		data.img = $(".avatar").eq(0).attr("src");
		data.type = $(".movie-ver").eq(0).find("i").attr("class") || "2d";
		result.push(data);
		console.log(`编号${id}的属性写入完成..`)
		id++;
		count++;
		if(count > 100){
			writeData()
			return;
		}
		getData();
	});
}

getData()