/*日期下拉选择*/
function YYYYMMDDstart(y,mStr,d){   
	var m;
	MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];   
	if(y == undefined || m == undefined || d == undefined){
		//先给年下拉框赋内容   
		var y  = new Date().getFullYear();  
		for (var i = (y-30); i < (y+30); i++) //以今年为准，前30年，后30年   
			   document.reg_testdate.YYYY.options.add(new Option(" "+ i +" 年", i));   
		
		//赋月份的下拉框   
		for (var i = 1; i < 13; i++) {
			if(i < 10){
				document.reg_testdate.MM.options.add(new Option(" " + "0"+i + " 月", "0"+i));   	
			}else
				document.reg_testdate.MM.options.add(new Option(" " + i + " 月", i));   
		}
		m = new Date().getMonth() + 1;
		var mStr;
		if(m < 10 ){
			mStr = "0"+m;
		}else
			mStr = m;
		var d = new Date().getDate()
	}
	m = parseInt(mStr);
	document.reg_testdate.YYYY.value = y;   
	document.reg_testdate.MM.value = mStr;  

	var n = MonHead[m];   
	if ((m-1) ==1 && IsPinYear(YYYYvalue)) n++;   
		writeDay(y,m,n); //赋日期下拉框
	document.reg_testdate.DD.value = d;   
}   
 
function YYYYDD(str) //年发生变化时日期发生变化(主要是判断闰平年)   
{   
	var MMvalue = document.reg_testdate.MM.options[document.reg_testdate.MM.selectedIndex].value;   
	if (MMvalue == ""){ var e = document.reg_testdate.DD; optionsClear(e); return;}   
	var n = MonHead[MMvalue - 1];   
	if (MMvalue ==2 && IsPinYear(str)) n++;   
	writeDay(str,MMvalue,n)   
}   
function MMDD(str)   //月发生变化时日期联动   
{   
	var YYYYvalue = document.reg_testdate.YYYY.options[document.reg_testdate.YYYY.selectedIndex].value;   
	if (YYYYvalue == ""){ var e = document.reg_testdate.DD; optionsClear(e); return;}   
	var n = MonHead[str - 1];   
	if (str ==2 && IsPinYear(YYYYvalue)) n++;   
	writeDay(YYYYvalue,str,n)   
}   
function writeDay(y,m,n)   //据条件写日期的下拉框   
{   
	var dayStr = ['日','一','二','三','四','五','六'];
	var e = document.reg_testdate.DD; optionsClear(e);   
	e.options.add(new Option('未定','未定'));
	for (var i=1; i<(n+1); i++) {
		var day = new Date(y+'/'+m+'/'+i).getDay();
		if(i < 10 ){
			e.options.add(new Option(" "+ "0" + i + " 日("+dayStr[day]+")", "0"+i));   	
		}else
			e.options.add(new Option(" "+ i + " 日("+dayStr[day]+")", i));   
	}  
	
}   
function IsPinYear(year)//判断是否闰平年   
{
	return(0 == year%4 && (year%100 !=0 || year%400 == 0));
}   
function optionsClear(e)   
{   
	e.options.length = 1;   
}  

/*日期下拉选择结束*/