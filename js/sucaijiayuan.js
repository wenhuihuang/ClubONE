var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');

//返回公历y年m+1月的天数
function solarDays(y,m){
    if(m==1)
        return(((y%4==0)&&(y%100!=0)||(y%400==0))?29:28);
    else
        return(solarMonth[m]);
}
//记录公历某天的日期
function calElement(sYear,sMonth,sDay,week) {
    this.isToday = false;
    //公历
    this.sYear = sYear;
    this.sMonth = sMonth;
    this.sDay = sDay;
    this.week = week;

}

//保存y年m+1月的相关信息
var fat=mat=9;
var eve=0;
function calendar(y,m) {
    fat=mat=0;
    var sDObj,lDObj,lY,lM,lD=1,lL,lX=0,tmp1,tmp2;
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y,m,1);	//当月第一天的日期
    this.length = solarDays(y,m);    //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    if ((m+1)==5){fat=sDObj.getDay()}
    if ((m+1)==6){mat=sDObj.getDay()}
    for(var i=0;i<this.length;i++) {
        if(lD>lX) {
            sDObj = new Date(y,m,i+1);    //当月第一天的日期

            lDPOS[n++] = i-lD+1;
        }
        this[i] = new calElement(y,m+1,i+1,nStr1[(i+this.firstWeek)%7],lY,lM,lD++,lL);
        if((i+this.firstWeek)%7==0){
            this[i].color = 'red';  //周日颜色
        }
    }

    if(y==tY && m==tM) this[tD-1].isToday = true;	//今日
}

//在表格中显示公历的日期
var cld;
function drawCld(SY,SM) {
    renderTable(SY,SM)
    //一个月多少周
    var weekCount= getWeekCounts(SY,SM);

    cld = new calendar(SY,SM);
    for(i=0;i<weekCount*7;i++) {
        sObj=eval('SD'+ i);
        sObj.className = '';
        sD = i - cld.firstWeek;
        if(sD>-1 && sD<cld.length) { //日期内
            sObj.innerHTML = sD+1;
            //设置arr
            var smS=SM+1;
            var sdS=sD+1;
            if((SM+1) < 10){
                smS = "0" + (SM+1);
            }
            if((sD+1) <10){
                sdS="0"+(sD+1);
            }
            $(sObj).parents('td')[0].id=''+SY+smS+sdS;
            if(cld[sD].isToday){ sObj.style.color = 'red';} //今日颜色
            else{sObj.style.color = '';}

        }
        else { //非日期
            sObj.innerHTML = '';
        }
    }
    //最后一天
    var lastD = 32 - new Date(SY, SM, 32).getDate();
    eachCalendar(SY,SM,lastD);
}
//显示年月
function computeYM(t,v){
    var y,m;
    y=parseInt($('#SY').text());
    m=parseInt($('#SM').text());
    if(t == '-'){//前一个月
        m-=v;
        if(m < 1){
            y-=1;
            m=12;
        }
    }else if(t == '+'){//下一个月
        m+=v;
        if(m > 12){
            y+=1;
            m=1;
        }
    }
    var tMStr = "";
    if(m < 10 ){
        tMStr="0"+m;
    }else{
        tMStr= m;
    }
    return{
        y:y,
        m:tMStr
    }
}
//在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历的相关信息
function changeCld(t) {
    var y,m;
    y=parseInt($('#SY').text());
    m=parseInt($('#SM').text());
    if(t == '0'){//前一个月
        m-=1;
        if(m < 1){
            y-=1;
            m=12;
        }
    }else if(t == '1'){//下一个月
        m+=1;
        if(m > 12){
            y+=1;
            m=1;
        }
    }
    var tMStr = "";
    if(m < 10 ){
        tMStr="0"+m;
    }else{
        tMStr= m;
    }
    $('#SY').text(y);
    $('#SM').text(tMStr);
    $('#prev-SY').text(computeYM("-",1).y);
    $('#prev-SM').text(computeYM("-",1).m);
    $('#next-SY').text(computeYM("+",1).y);
    $('#next-SM').text(computeYM("+",1).m);
    drawCld(y,m-1);
}
//用自定义变量保存当前系统中的年月日
var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
//打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历的相关信息
function initial() {
    /*CLD.SY.selectedIndex=tY-1900;
     CLD.SM.selectedIndex=tM;*/
    var tMStr = "";
    if((parseInt(tM)+1) < 10 ){
        tMStr="0"+(parseInt(tM)+1);
    }else{
        tMStr=parseInt(tM) + 1 ;
    }
    $('#SY').text(tY);
    $('#SM').text(tMStr);
    $('#prev-SY').text(computeYM("-",1).y);
    $('#prev-SM').text(computeYM("-",1).m);
    $('#next-SY').text(computeYM("+",1).y);
    $('#next-SM').text(computeYM("+",1).m);
    renderTable(tY,tM)

    drawCld(tY,tM);
}
//获取一个月几个周 y=2016 m=5
function getWeekCounts( y, m ) {
    var first = new Date(y, m,1).getDay();
    var last = 32 - new Date(y, m, 32).getDate();
    return Math.ceil( (first + last)/7 );
}
//写表格
function renderTable(y,m){
    var count = getWeekCounts( y,m)
    var gNum;
    var html="";
    for(i=0;i<count;i++) {
        html+='<tr align="center">'
        for(j=0;j<7;j++) {
            gNum = i*7+j;
            html+='<td id="GD' + gNum +'" style="';
          /*  if(j == 0) {
                html+='color:red'
            }
            if(j == 6) {
                html+='color:red'
            }*/
            html+='"><span  id="SD' + gNum +'" class="num"></span></td>'
        }
        html+='</tr>'
    }
    $('#content').html(html)
}