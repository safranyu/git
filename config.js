var fs = require('fs');



//修改配置文件小程序appid
var reg = /(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;// 正则表达式
function writeJson(){
	let ENV = process.env.NODE_ENV;
	fs.readFile('./src/manifest.json',function(err,data){
		if(err){
			return console.error(err);
		}
		var person;
		person = data.toString();//将二进制的数据转换为字符串
		// console.log(person)
		//对文件中的注释进行过滤
		person = person.replace(reg,function(val){
			return /^\/{2,}/.test(val) || /^\/\*/.test(val) ? "" : val;
		})
		person = JSON.parse(person);
		if (ENV == 'production') {
		  // 生产环境 
		  console.log('生产环境')
		  person['mp-weixin'].appid = 'wxb3997bfe94e0ae65';
		} else if (ENV == 'development') {
		  // 测试环境 
		  console.log('开发环境')
		  person['mp-weixin'].appid = 'wxb3997bfe94e0ae6e';
		}
		var str = JSON.stringify(person,"","\t");//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
		fs.writeFile('./src/manifest.json',str,function(err){
			if(err){
				console.error('2',err);
			}
			console.log('-----修改小程序appid成功-----')
		})
	})
}
writeJson();