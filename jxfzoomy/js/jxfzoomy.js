(function($){
    $.fn.jxfZoomy = function(){
        return $.fn.jxfZoomy.methods['init'].apply(this,arguments);
    };
    /*配置信息*/
    $.fn.jxfZoomy.option = {
        smallBoxW: 250,
        smallBoxH: 250,
        bigBoxW: 350,
        bigBoxH: 350,
        smallListImgW:50,
        smallListImgH:50,
        moveSpeed: 50
    }
    $.fn.jxfZoomy.methods = {
            configPara:{},
            init: function (optionTemp) {
                var option = $.extend({}, $.fn.jxfZoomy.option, optionTemp);
                $.fn.jxfZoomy.option = option;
                var configPara = $.fn.jxfZoomy.methods.configPara;
                //容器
                configPara.$container = this;

                //初始化参数
                var html = "";
                html+='<div class="jxfzoomy-small-box">';
                html+='    <div class="jxfzoomy-small-box-move">';
                html+='        <img class="small-img" style="width:10px" src="'+$('.jxfzoomy-active').attr('data-smallImg')+'" alt="">';
                html+='        <div class="mask"></div>';
                html+='    </div>';
                html+='</div>';
                html+='<div class="jxfzoomy-big-box">';
                html+='<img id="jxfzoomy-big-img" class="jxfzoomy-big-img" src="'+$('.jxfzoomy-active').attr('data-bigImg')+'" alt="">';
                html+='</div>';
                $(html).insertBefore(configPara.$container.find('.jxfzoomy-thumb-box'));

                //小图
                configPara.$smallImg = configPara.$container.find('.small-img');
                //小图框
                configPara.$smallBox = configPara.$container.find('.jxfzoomy-small-box');
                //大图
                configPara.$bigImg = configPara.$container.find('.jxfzoomy-big-img');
                //大图框
                configPara.$bigBox = configPara.$container.find('.jxfzoomy-big-box');
                //遮罩
                configPara.$mask = configPara.$container.find('.mask');

                //初始化大框（放大的那个框）
                $.fn.jxfZoomy.methods.initBigBox();
                //初始化小图
                $.fn.jxfZoomy.methods.initSmallImg();
                //初始化左右箭头
                $.fn.jxfZoomy.methods.initArrows();
                //小缩略图（很多张的那个）
                $.fn.jxfZoomy.methods.initSmallListImg();
                //绑定事件
                $.fn.jxfZoomy.methods.bindEvent();
                //初始化大图
                document.getElementById('jxfzoomy-big-img').onload = function () {
                    //初始化小图
                    $.fn.jxfZoomy.methods.initSmallImg();
                    //初始化遮罩
                    $.fn.jxfZoomy.methods.initMask();
                    $.fn.jxfZoomy.methods.bindEvent2();
                }
                //不知道为什么ie浏览器进来没有触发上面的document.getElementById('jxfzoomy-big-img').onload，所以代码点击一下当前的小缩略图
                if (!!window.ActiveXObject || "ActiveXObject" in window){
                    $('.jxfzoomy-active').click();
                }
                //$('.jxfzoomy-active').click();
                return this;
            },
            initBigBox: function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                configPara.$smallBox.css({
                    'width': option.smallBoxW,
                    'height': option.smallBoxH
                });
                configPara.$bigBox.css({
                    'border-width':0,
                    'left': option.smallBoxW + 5,
                    'top': 0
                });
            },
            initSmallImg:function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                if(configPara.$smallImg.width() > configPara.$smallImg.height()){
                    configPara.$smallImg.css({'width':option.smallBoxW ,'height':'auto'});
                }else{
                    configPara.$smallImg.css({'width':'auto','height':option.smallBoxH });
                }
            },
            initArrows:function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                $('<div class="jxfzoomy-thumb-lt">&lt;</div><div class="jxfzoomy-thumb-gt">&gt;</div>')
                .insertBefore(configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-ct'));
                configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-lt,.jxfzoomy-thumb-box .jxfzoomy-thumb-gt')
                .css({
                    'height':option.smallListImgH,
                    'line-height':option.smallListImgH + 'px'
                });
            },
            initSmallListImg:function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                configPara.$container.find('.jxfzoomy-thumb-box').css({
                    'width':option.smallBoxW
                });
                configPara.$container.find('.jxfzoomy-list-img li').css({
                    'width':option.smallListImgW,
                    'height':option.smallListImgH
                });
                configPara.$container.find('.jxfzoomy-list-img li div').css({
                    'width':option.smallListImgW,
                    'height':option.smallListImgH
                });
                configPara.$container.find('.jxfzoomy-list-img li img').css({
                    'max-width':option.smallListImgW,
                    'max-height':option.smallListImgH
                });
                var jqSmallListImg = configPara.$container.find('.jxfzoomy-list-img li');
                var smallListImgSum = jqSmallListImg.length;
                if(smallListImgSum * (option.smallListImgW+2+5) > option.smallBoxW){//+2为边框+5为缩略图间距
                    configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-ct').css({
                        'margin-left':'15px',
                        'width':option.smallBoxW - 35
                    });
                }else{
                    //将所有缩略图居中显示 +2为边框+5为缩略图间距
                    var firstImgMarginleft = (option.smallBoxW - smallListImgSum*(option.smallListImgW+2+5) + 5)/2;
                    $(jqSmallListImg[0]).css('margin-left',firstImgMarginleft);
                    //隐藏所有箭头
                    configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-lt,.jxfzoomy-thumb-box .jxfzoomy-thumb-gt').hide();
                }
                
            },
            initMask : function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                var $bigImgW = configPara.$bigImg.width();
                var $bigImgH = configPara.$bigImg.height();
                configPara.$mask.css({
                    'width': configPara.$smallImg.width() * option.bigBoxW / $bigImgW,
                    'height': configPara.$smallImg.height() * option.bigBoxH / $bigImgH
                });
            },
            bindEvent:function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var option = $.fn.jxfZoomy.option;
                var maskLeft = 0;
                var maskTop = 0;
                //大图和小图的倍数关系
                configPara.$container.find('.jxfzoomy-small-box-move').on('mouseenter', function (event) {
                    configPara.$mask.css('display', 'block');
                    configPara.$bigBox.css({
                        'width': option.bigBoxW,
                        'height': option.bigBoxH,
                        'border-width':1
                    });
                });
                configPara.$container.find('.jxfzoomy-small-box-move').on('mouseleave', function (event) {
                    configPara.$mask.css('display', 'none');
                    // configPara.$bigBox.css('display', 'none');
                    configPara.$bigBox.css({
                        'width': 0,
                        'height': 0,
                        'border-width':0
                    });
                });
                
                //注册最下面的小缩略图点击事件
                configPara.$container.find('.jxfzoomy-list-img li').on('click', function (event) {
                    configPara.$container.find('.jxfzoomy-active').removeClass('jxfzoomy-active');
                    $(this).addClass('jxfzoomy-active');
                    configPara.$smallImg.attr('src',$(this).attr('data-smallImg')); //$(this).data().smallimg IE8取不到值，郁闷
                    configPara.$container.find('.jxfzoomy-big-img').attr('src',$(this).attr('data-bigImg'));
                    
                    $.fn.jxfZoomy.methods.initSmallImg();
                    $.fn.jxfZoomy.methods.initMask();
                });

                //注册左右箭头的点击事件
                var jqul = configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-ct ul');
                configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-lt').on('click', function (event) {
                    jqul.stop().animate({'margin-left':'+='+ option.moveSpeed},200,function(){
                        if(parseInt(jqul.css('margin-left'),10) > 0){
                            jqul.animate({'margin-left':'0'},200);
                        }
                    });
                });
                var jqSmallListImg = configPara.$container.find('.jxfzoomy-list-img li');
                var smallListImgSum = jqSmallListImg.length;
                var minLeft = -1 * (smallListImgSum*(option.smallListImgW+2+5) - configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-ct').width());
                configPara.$container.find('.jxfzoomy-thumb-box .jxfzoomy-thumb-gt').on('click', function (event) {
                    jqul.stop().animate({'margin-left':'-='+ option.moveSpeed},200,function(){
                        if(parseInt(jqul.css('margin-left'),10) < minLeft){
                            jqul.animate({'margin-left':minLeft},200);
                        }
                    });
                });
            },
            bindEvent2:function(){
                var configPara = $.fn.jxfZoomy.methods.configPara;
                var $bigImgW = configPara.$bigImg.width();
                var $bigImgH = configPara.$bigImg.height();
                configPara.$container.find('.jxfzoomy-small-box-move').unbind("mousemove");
                configPara.$container.find('.jxfzoomy-small-box-move').on('mousemove', function (event) {
                    maskLeft = event.clientX - $(this).offset().left - configPara.$mask.width() / 2
                    maskTop = event.clientY - $(this).offset().top - configPara.$mask.height() / 2
                    if (maskLeft > ($(this).width() - configPara.$mask.width())) {
                        maskLeft = $(this).width() - configPara.$mask.width();
                    } else if (maskLeft < 0) {
                        maskLeft = 0;
                    }
                    if (maskTop > ($(this).height() - configPara.$mask.height())) {
                        maskTop = $(this).height() - configPara.$mask.height();
                    } else if (maskTop < 0) {
                        maskTop = 0;
                    }
                    configPara.$mask.css({
                        'left': maskLeft,
                        'top': maskTop
                    });

                    configPara.$bigImg.css({
                        'left': -maskLeft * $bigImgW / configPara.$smallImg.width(),
                        'top': -maskTop * $bigImgH / configPara.$smallImg.height()
                    });
                });
            }
        };
    })(jQuery);