/*日期下拉选择*/
function YYYYMMDDstart(y,mStr,d){   
    var m;
    var ys = $('.YYYY');
    var ms = $('.MM');
    var ds = $('.DD');
    MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];   
    if(y == undefined || m == undefined || d == undefined){
        //先给年下拉框赋内容   
        var y  = new Date().getFullYear();  
        for (var i = (y-30); i < (y+30); i++) //以今年为准，前30年，后30年  
        {
            for(var j = 0; j < ys.length;j++){
                ys[j].add(new Option(" "+ i +" 年", i));   
            }
        } 
               
        
        //赋月份的下拉框   
        for (var i = 1; i < 13; i++) {
            for(var j = 0; j < ms.length;j++){
                if(i < 10){
                
                    ms[j].add(new Option(" " + "0"+i + " 月", "0"+i));    
                
                }else{

                    ms[j].add(new Option(" " + i + " 月", i));   
                }
            }
            
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
    for(var i = 0; i < ys.length;i++){
        ys[i].value = y;  
    }
    for(var i = 0; i < ms.length;i++){
         ms[i].value = mStr;  
    }
   
    if(d <10){
        d='0'+d;
    }
    var n = MonHead[m];   
    if ((m-1) ==1 && IsPinYear(YYYYvalue)) n++;   
        writeDay(y,m,n); //赋日期下拉框
    for(var i = 0; i < ds.length;i++){
        ds[i].value = d;   
    }
    
}   
 
function YYYYDD(str,self) //年发生变化时日期发生变化(主要是判断闰平年)   
{   
    var MMvalue = $(self).siblings('.MM').val();   
    if (MMvalue == ""){ var e = $(self).siblings('.DD'); optionsClear(e); return;}   
    var n = MonHead[MMvalue - 1];   
    if (MMvalue ==2 && IsPinYear(str)) n++;   
    writeDay(str,MMvalue,n,self)   
}   
function MMDD(str,self)   //月发生变化时日期联动   
{   
    var YYYYvalue = $(self).siblings('.YYYY').val();   
    if (YYYYvalue == ""){ var e = $(self).siblings('.DD'); optionsClear(e); return;}   
    var n = MonHead[str - 1];   
    if (str ==2 && IsPinYear(YYYYvalue)) n++;   
    writeDay(YYYYvalue,str,n,self)   
}   
function writeDay(y,m,n,self)   //据条件写日期的下拉框   
{   
    var dayStr = ['日','一','二','三','四','五','六'];
      
    if(self != undefined && self != null){
        var e = $(self).siblings('.DD'); optionsClear(e); 
    }else{
        var e = $('.DD'); optionsClear(e); 
    }
    for(var i = 0; i < e.length;i++){
        e[i].add(new Option('未定','未定'));
    }
    
    for (var i=1; i<(n+1); i++) {
        var day = new Date(y+'/'+m+'/'+i).getDay();
        for(var j = 0; j < e.length;j++){
            if(i < 10 ){
                e[j].add(new Option(" "+ "0" + i + " 日("+dayStr[day]+")", "0"+i));     
            }else
                e[j].add(new Option(" "+ i + " 日("+dayStr[day]+")", i));   
        }
    }  
    
}   
function IsPinYear(year)//判断是否闰平年   
{
    return(0 == year%4 && (year%100 !=0 || year%400 == 0));
}   
function optionsClear(e)   
{   
    for(var i = 0; i < e.length;i++){
        e[i].options.length=1;
    }
}  

/*日期下拉选择结束*/