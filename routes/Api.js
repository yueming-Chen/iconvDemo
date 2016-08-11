var fs = require('fs');
var iconv = require('iconv-lite');
var express = require('express');
var router = express.Router();

router.get('/writeData/:url/:mode',function(req,response,next){
	var url = req.params.url;
	var mode = req.params.mode;
	//更改你的目的位置
	fs.readFile('C:/Users/"你的名字"/Desktop/a/' + url, (err, data) => {
		if (err) throw err;
		data = iconv.decode(data,'Big5');
		var res = data.split('\r');
		var string=[];
		for(var index = 0;index < res.length ; index++){
			if(res[index].includes(mode)){
				string.push(res[index]);
			}
		}
		//更改你的目的位置
		fs.writeFile('C:/Users/"你的名字"/Desktop/a/output.txt',string,function(err){
			if(err) throw err;
			console.log('done');
		});
	});
});

router.get('/readData/:url/:mode',function(req,response,next){
	var url = req.params.url;
	var mode = req.params.mode;
	//更改你的目的位置
	fs.readFile('C:/Users/"你的名字"/Desktop/a' + url, (err, data) => {
		if (err) throw err;
		//使用iconv解碼成big5
		data = iconv.decode(data,'Big5');
		var res = data.split('\r');
		var string=[];
		for(var index = 0;index < res.length ; index++){
			if(res[index].includes(mode)){
				string.push(res[index]);
			}
		}
		// 50 80
		response.json({results:string});
	});
});


module.exports = router;