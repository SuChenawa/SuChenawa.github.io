/**
 * Created by Administrator on 2017/5/6 0006.
 */
// 当前时间实现代码
/*
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
*/
var weather = document.querySelector("#weather");
var oClock = document.querySelector("#clock");
var oDate = document.querySelector("#oDate");
var tStyle = true;

var w_array = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
var we_array = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var m_array = new Array("正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月");
var me_array = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

//var WT;
var vv = 0;
var timeTag = 1;
var color2;



var  cityname = "未获取";
var  feels = "未获取";
var  weatherdata = "未获取";
var  high = "未获取";
var  low = "未获取";
var  weathernow = "未获取";
var  wind = "未获取";
var  windLv = "未获取";


//以后添加
function setTimeColor(){

		if(vv>255){timeTag*=-1;vv=255;}
		if(vv<0){timeTag*=-1;vv=0;}
		color2 = 'hsl('+vv+',90%,50%)';
		vv += timeTag/1;
		
		
		oClock.style.color = color2;
		oDate.style.color = color2;
		oClock.style.textShadow = '0 0 20px ' + color2;
		oDate.style.textShadow = '0 0 20px' + color2;
		//oClock.style.textShadow = '0 0 20px rgb('+c+')';
		//oDate.style.textShadow = '0 0 20px rgb('+c+')';
		//oClock.style.color = 'rgb('+c+')';
		//oDate.style.color = 'rgb('+c+')';
}


function oClockInit(){
	var w = window.innerWidth;
    var h = window.innerHeight;
	oClock.style.width = w+'px';
	oClock.style.lineHeight = h+'px';
	oClock.style.height =  h+'px';
	oClock.style.fontSize = Math.floor(h/300*20) + 'px';
	oDate.style.width = w+'px';
	oDate.style.lineHeight = h+'px';
	oDate.style.height =  h+'px';
	oDate.style.fontSize = Math.floor(h/300*20) + 'px';
	weather.style.width = w+'px';
	weather.style.lineHeight = h+'px';
	weather.style.height =  h+'px';
	weather.style.fontSize = Math.floor(h/300*20) + 'px';
	//weather.font-size = '0.5em';
}

oClockInit();
//window.onresize = oClockInit;

/*
var show = document.querySelector("#show");
function showi(str){
    show.innerHTML = str;
}
*/


/* 时间 */
function getTime(){
    var t = new Date();
	
    if(tStyle){
		if(tShowSencends){
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds()) + "</span>";
		}else{
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes());
		}
		//oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+t.getMonth() + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
    }else{
        var h = t.getHours();
        var str = h<12 ? "AM" : "PM";
        //var str = h<12 ? "上午" : "下午";
        h = h<=12 ? h : h-12;
		if(tShowSencends){
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds())+"</span><span class='st'>"+str+"</span></span>";
		}else{
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+ "</span>" +" <span class='sec'>"+ str + "</span>"
		}
    }
	//日期获取
		switch (DateFormatTest) {
            case 1://"YYYY年MM月DD日 星期x"
				oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
				break;
            case 2://"YYYY年MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ "</span>";
                break;
            case 3://"MM月DD日 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
                break;
			case 4://"MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日"+ "</span>";
                break;
            case 5://"星期x"
                oDate.innerHTML = "<span class='sec'>" + w_array[t.getDay()] + "</span>";
                break;
            case 6://"月份 星期x"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 7://"月份"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "</span>";
                break;
            case 8://"YYYY-MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
			case 9://"YYYY-MM-DD 星期X"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ w_array[t.getDay()] + "</span>";
                break;
            case 10://"YYYY-MM-DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "</span>";
                break;
			case 11://"MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 12://"Month week"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 13://"week"
                oDate.innerHTML = "<span class='sec'>" + we_array[t.getDay()] + "</span>";
                break;
			case 14://"Month"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "</span>";
                break;
            case 15://"YYYY/MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 16://"YYYY/MM/DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 17://"YYYY/MM/DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate()  + "</span>";
                break;
            case 18://"MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 19://"MM/DD"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "</span>";
                break;
			case 20://"Month"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "</span>";
                break;
			case 21://"MM/DD/YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 22://"MM/DD/YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 23://"MM/DD/YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "</span>";
                break;
			case 24://"MM-DD-YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "</span>";
                break;
            case 25://"MM-DD-YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 26://"MM-DD-YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 27://MM.DD.YYYY
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear()  + "</span>";
                break;
            case 28://"YYYY.MM.DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "</span>";
                break;
            case 29://"YYYY.MM.DD Week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
			case 30://"YYYY.MM.DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 31://"MM.DD.YYYY Week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 32://"MM.DD.YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 33://"MM月DD日YYYY年 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日" + t.getFullYear() + "年" + "&nbsp" + w_array[t.getDay()]  + "</span>";
                break;
        }
}
function autoTime(){
    getTime();
    setTimeout(autoTime, 1000);
}
function add0(n){
    return n<10 ? '0'+n : ''+n;
}

autoTime();

function getWeather(){
	switch (WeatherFormatTest) {
            case 1://"城市+气温+天气+风向+风级"
				//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}    {风级}级</span>"});
				//weather.innerHTML = "	<iframe name='weather_inc' src='http://i.tianqi.com/index.php?c=code&id=11' width='330' height='35' frameborder='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>";
                //weather.innerHTML = "<iframe name='weather_inc' src='http://i.tianqi.com/index.php?c=code&id=99' width='160' height='36' frameborder='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>"
				testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}    {范围}    {风向}    {风级}</span>");
				break;
            case 2://"城市+气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}</span>"});
				testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}</span>");
				break;
            case 3://"城市+天气+气温+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃    {风向}    {风级}</span>");
				break;
			case 4://"城市+气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃</span>");
				break;
            case 5://"城市+气温+天气+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}</span>"});
                testGetWeather("<span class='sec'>{城市}    {气温}℃    {天气}    {风向}</span>");
				break;
            case 6://"城市+天气+气温+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃    {风向}</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃    {风向}</span>");
				break;
			case 7://"城市+昼夜气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {昼夜}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {昼夜}    {气温}℃</span>");
				break;
            case 8://"城市+天气"
				//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}"});
                testGetWeather("<span class='sec'>{城市}    {天气}");
				break;
			case 9://"城市+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {气温}℃</span>");
				break;
            case 10://"天气+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{天气}    {气温}℃</span>");
				break;
			case 11://"气温+天气+风向"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{气温}℃    {天气}    {风向}</span>"});
                testGetWeather("<span class='sec'>{气温}℃    {天气}    {风向}</span>");
				break;
            case 12://"天气+风向+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{风向}    {天气}    {气温}℃</span>");
				break;
            case 13://"风向+风级+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级   {气温}℃</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}级   {气温}℃</span>");
				break;
			case 14://"天气+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{天气}    {风向}    {风级}</span>");
				break;
            case 15://"天气+风向+风级+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{天气}    {风向}    {风级}级    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{天气}    {风向}    {风级}    {气温}℃</span>");
				break;
            case 16://"风向+风级+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级    {天气}</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}    {天气}</span>");
				break;
			case 17://"气温+天气"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{气温}℃    {天气}</span>"});
                testGetWeather("<span class='sec'>{气温}℃    {天气}</span>");
				break;
            case 18://"城市"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}</span>"});
                testGetWeather("<span class='sec'>{城市}</span>");
				break;
            case 19://"风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{风向}    {风级}</span>");
				break;
			case 20://"城市+风向+风级"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {风向}    {风级}级</span>"});
                testGetWeather("<span class='sec'>{城市}    {风向}    {风级}</span>");
				break;
			case 21://"城市+天气+气温"
                //$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {天气}    {气温}℃</span>"});
                testGetWeather("<span class='sec'>{城市}    {天气}    {气温}℃</span>");
				break;
        }
}

function autoWeather(){
	//alert("调用:自动");
    getWeather();
    WT = setTimeout(autoWeather, 1800000);
}

function testGetWeather(strHtml){

	//alert(strCity);
	if(strCity == "")
	{
		$.get("http://i.tianqi.com/index.php?c=code&id=11",function(data,status){
			data = data.split("</strong>")[1].split(" ")[0];
			//data = data.replace(" ","");
			getWeatherForCity(data,strHtml);
			//alert("数据: " + data + "\n状态: " + status);
		})
	}
	else
	{
		getWeatherForCity(strCity,strHtml);
	}
}

function getWeatherForCity(city,strHtml)
{
	$.get("http://wthrcdn.etouch.cn/WeatherApi?city="+city,function(data,status){
		//data = data.replace("[","");
		//data = data.replace("]","");
		//data = $.parseJSON(data);
		//JSON.parse(data); //可以将json字符串转换成json对象 
		//data = eval('(' + data + ')')
		//alert("数据: " + data + "\n状态: " + status);

		var str = data;   
		//创建文档对象  
		var parser=new DOMParser();  
		var xmlDoc=parser.parseFromString(str,"text/xml");  
	   
		//提取数据  
		cityname = xmlDoc.getElementsByTagName('city')[0].textContent; 
		feels = xmlDoc.getElementsByTagName('wendu')[0].textContent; 
		weatherdata = xmlDoc.getElementsByTagName('weather'); 
		high = weatherdata[0].children[1].textContent.split(" ")[1];
		low = weatherdata[0].children[2].textContent.split(" ")[1];
		weathernow = weatherdata[0].children[3].children[0].textContent;
		wind = weatherdata[0].children[3].children[1].textContent;
		windLv = weatherdata[0].children[3].children[2].textContent;
		
		//alert("数据: " + cityname + "  " + feels +"℃  "+ low +  " ~ " + high + "  " + weathernow + "  " + wind + "  " + windLv + "\n状态: " + status);
		
		//$('#weather').leoweather({city: strCity,format:"<span class='sec'>{城市}    {气温}℃    {天气}    {风向}    {风级}级</span>"});
		

		weather.innerHTML = FormatWeather(strHtml);
	})
}

function FormatWeather(strHtml){
	//testGetWeather();
	strHtml = strHtml.replace("{城市}",cityname);
	strHtml = strHtml.replace("{气温}",feels);
	strHtml = strHtml.replace("{天气}",weathernow);
	strHtml = strHtml.replace("{风向}",wind);
	strHtml = strHtml.replace("{风级}",windLv);
	strHtml = strHtml.replace("{范围}",low +  "~" + high);
	return strHtml;
}
