(function ($) {
    function DialogA(options) {
        this.dialogWrap = $('.dialog-wrap').length  > 0 ? $('.dialog-wrap') : $('<div class="dialog-wrap">');
        this.settings = $.extend({
            url:'test.html',
            width:800,
            height:460,
            border:"1px solid red"
        },options);
        this.readerDom();
        this.iframe=$('.iframe');
        this.closeBtn = $('.close-btn');
        this.bindEvent();
    }
    DialogA.prototype = {
        constructor : DialogA,
        readerDom : function () {
            var self = this;
            if($('.dialog-con').length < 1  ){
                var html = '<div class="dialog-con">'+
                    '<span class="close-btn"></span>'+
                    '<iframe frameborder="no" width="100%" height="100%" border="0" marginwidth="0" marginheight="0" scrolling="auto" class="iframe" src="'+self.settings.url+'" ></iframe>'+
                    '</div>';
                this.dialogWrap.html(html);
                $('body').append(this.dialogWrap);
            }else{
                $('.iframe').attr('src',self.settings.url);
            }
            $('.dialog-wrap').css({
                zIndex: 12000,
                position:"fixed",
                height:"100%",
                width:"100%",
                top:0,
                bottom:0,
                left:0,
                right:0,
                overflow: "auto",
                background: "rgba(255, 255, 255, 0.75)",
                display:"none"
            })
            $('.dialog-con').css({
                background:"#fff",
                position:"absolute",
                width:self.settings.width,
                height:self.settings.height,
                top:"140px",
                left:0,
                right:0,
                margin:"auto",
                marginBottom:'20px',
                "box-sizing": "border-box",
                "-webkit-box-sizing":"border-box",
                "-ms-box-sizing":"border-box",
                "-o-box-sizing":"border-box",
                "-moz-box-sizing":"border-box",
                "border":self.settings.border
            })
            $('.close-btn').css({
                display: "inline-block",
                width:"46px",
                height:"46px",
                position: "absolute",
                right:"-24px",
                top:"-24px",
                cursor: "pointer",
                background:"url(img/x_close_icon.png) no-repeat center center"
            })
        },
        show:function () {
            this.dialogWrap.show();
        },
        hide:function () {
            this.iframe.attr("src",'');
            this.dialogWrap.hide();
        },
        bindEvent:function () {
            var self = this;
            this.closeBtn.bind("click",function () {
                self.hide();
            })
        }
    }
    window.DialogA=window['DialogA']=DialogA;
})(jQuery)
