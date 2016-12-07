/**
 * Created by hangyouzi123 on 2016/11/16.
 */
    $(function(){
        erweima();
        banner();
        bannerLeft();
        setWidth();
        printPage();

//book
        var book=document.querySelector('.book');
        var pen=document.querySelector('.pen');
        var juan=document.querySelector('.juan');
        var other=document.querySelector('.other');
        Book(book);
        Book(pen);
        Book(juan);
        Book(other);
        function Book(target){

            var divs=target.children;
            for (var i = 1; i < divs.length; i++) {
                var div = divs[i];
                div.index=i;
                var img=document.createElement('img');
                img.src='../img/'+div.index+'.jpeg';
                $(img).css({width:320,height:320});
                div.appendChild(img);
                $(div).on('mouseenter',function(){
                    $(this).css({boxShadow: '0 0 10px 2px #666'});
                    var son=this.firstElementChild;
                    var img=this.lastElementChild;
                    $(son).css('display','block');
                    animate(son,{'bottom':0,'opacity':0.8});
                    animate(img,{width:350,height:350,marginTop:-10,marginLeft:-10});
                });
                $(div).on('mouseleave',function(){
                    $(this).css({boxShadow: 'none'})
                    var img=this.lastElementChild;
                    var son=this.firstElementChild;
                    animate(img,{width:320,height:320,marginTop:0,marginLeft:0});
                    animate(son,{'bottom':-90,'opacity':0},function(){
                        $(son).css('display','none');
                    });
                });
                //给弹出盒子的p添加动画
                var sonp=div.querySelectorAll('p');
                tabChange(sonp,'shake');
            }
        };

        //返回顶部
        document.onscroll = function () {
            if (scroll().top > 200) {
                $(".go-top").show(100);
                $(".qq").stop().animate({"opacity":1});
                $(".phone").stop().animate({"opacity":1});
            } else {
                $(".go-top").hide(100);
                $(".qq").stop().animate({"opacity":0});
                $(".phone").stop().animate({"opacity":0});
            }
        }
        $(".go-top>a").mouseenter(function () {
            $(this).css("background", "url(../images/gotopd.gif) no-repeat");
        });
        $(".go-top>a").mouseleave(function () {
            $(this).css("background", "url(../images/gotop.png)");
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".go-top>a").fadeIn(1000);
            } else {
                $(".go-top>a").fadeOut(1000);
            }
        });
        $(".go-top").click(function () {
            $('html,body').animate({scrollTop: '0px'}, 800);
        }); //火箭动画停留时间，越小消失的越快~
        //左侧固定栏
        $(".qq").mouseenter(function () {
            $(this).stop().animate({"width":"200px"}).css("background-color","#D62010");
        });
        $(".qq").mouseleave(function () {
            $(this).stop().animate({"width":"45px"}, function () {
                $(this).css("background-color","#DEDEDE")
            });
        });
        $(".phone").mouseenter(function () {
            $(this).stop().animate({"width":"200px"}).css("background-color","#D62010");
        });
        $(".phone").mouseleave(function () {
            $(this).stop().animate({"width":"45px"}, function () {
                $(this).css("background-color","#DEDEDE");
            });
        });

        //鼠标样式
        var stararr = ["#FFFC82", "#f60", "pink", "#C99BDC", "#FFACFC"];
        document.onmousemove = function (e) {
            var left,top;
            var star = document.createElement("div");
            star.className = "star";
            var num = Math.floor(Math.random() * 5);
            star.style.backgroundColor = stararr[num];
            document.body.appendChild(star);
            left= getPageX(e) + Math.random() * 30 - 20;
            top=getPageY(e) + Math.random() * 30 - 20;
            star.style.top = top+ "px";
            star.style.left = left+ "px";
            $(star).animate({
                "width": 0,
                "height": 0
            }, 500, function () {
                $(star).remove();
            });
        };
        function getPageX(e) {
            //获取鼠标针对可视区域的位置
            var x = e.clientX;
            return scroll().left + x-20;

        }
        function getPageY(e) {
            //获取鼠标针对可视区域的位置
            var y = e.clientY;
            return scroll().top + y-20;
        }
        function scroll() {
            return {
                top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
            };
        }
        function animate(tag, obj, fn) {
            clearInterval(tag.timer);
            tag.timer = setInterval(function () {
//            k----属性名----attr
//            obj[k]---属性值----target
                var flag = true;
                for (k in obj) {
                    if (k == "opacity") {
                        var leader = getStyle(tag, k) * 100;
                        var target = obj[k] * 100;
                        var step = (target - leader) / 10;
                        step = target > leader ? Math.ceil(step) : Math.floor(step);
                        leader += step;
                        tag.style[k] = leader / 100;
                    } else if (k == "zIndex") {
                        tag.style.zIndex = obj[k];
                    } else {
                        var leader = parseInt(getStyle(tag, k)) || 0;
                        var target = obj[k];
                        var step = (target - leader) / 10;
                        step = target > leader ? Math.ceil(step) : Math.floor(step);
                        leader += step;
                        tag.style[k] = leader + "px";
                    }
                    if (target != leader) {
                        flag = false;
                    }
                }
                if (flag) {
                    clearInterval(tag.timer);
                    if (typeof fn == "function") {
                        fn();
                    }
                }
            }, 17)
        }
        function getStyle(tag, attr) {
            return tag.currentStyle ? tag.currentStyle[attr] : getComputedStyle(tag, null)[attr];
        }
    })


//二维码
function erweima() {
    var node = document.getElementById("node_small");
    var er = document.getElementById("er");
    node.onmouseover = function () {
        er.className = "show erweima";
    };
    node.onmouseout = function () {
        er.className = "hide erweima";
    }
}
//导航
function banner() {
    var banner = document.querySelector('.bannerMiddle');
    var imgBox = document.querySelector('.imgBox');
    var points = document.querySelectorAll('.points li');
    var W = banner.offsetWidth;
    var index = 1;
    var timer = setInterval(turn, 4000);
    banner.addEventListener('mouseenter', function () {

        clearInterval(timer);
        setPointsT();
    })

    banner.addEventListener('mouseleave', function () {
        timer = setInterval(turn, 4000);
    })
    var setTranslateX = function (x) {
        imgBox.style.transform = "translateX(" + x + "px)";
        imgBox.style.webkitTransform = "translateX(" + x + "px)";
    }

    function addTransition() {
        imgBox.style.transition = "all 0.4s";
        imgBox.style.webkitTransition = "all 0.4s";
    }

    function removeTransition() {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }

    function turn() {
        index++;
        var left = -index * W;
        addTransition();
        setTranslateX(left);

    };

    public.addTransitionEnd(imgBox, function () {
        if (index >= 9) {
            index = 1;
        }
        if (index <= 0) {
            index = 8;
        }
        var left = -index * W;
        removeTransition();
        setTranslateX(left);
        setPoints(index);

    });
    // --------------------------------角标同步--------------------------
    var l = points.length
    function setPoints(index) {
        for (var i = 0;i < l; i++) {
            var point = points[i];
            point.classList.remove('current');
        }
        points[index - 1].classList.add('current');
    }

    function setPointsT() {
        for (var i = 0;i < l; i++) {
            var point = points[i];
           point.index=i;
            point.onclick=function(){
                index=this.index;
                turn();
            }
        }
    }
}
//导航文字动画
function bannerLeft(){
    var bannerLeft=document.querySelector('.bannerLeft');
    var ele=bannerLeft.getElementsByTagName('span');
    aAnimation(ele);
}

//a的动画
function aAnimation(eles){
    var l=eles.length;
    for(var i=0;i<l;i++) {
       var ele=eles[i];
        ele.addEventListener('mouseenter',function(){
            this.className='animated tada';
        });
            ele.addEventListener('click',function(){
                this.className='animated rubberBand';
            });
        ele.addEventListener('mouseleave',function(){
            this.className='animated';
        })
    }
}
//设置产品模块导航的宽度
function setWidth() {

    var nav = $('.product-tabs');

    var lis = $('.product-tabs li');
    var w = 0;

    lis.each(function (index, el) {

        w += $(el).width();
    })

    nav.width(w);
}

//tab动画
function printPage(){
    var printPage =document.getElementsByClassName('printPage')
    tabChange(printPage,'bounce','current');
}


function tabChange(target,anClass,current){
    var divs=target;
    current=current||'';
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var dClass= div.className;

        div.addEventListener('mouseover',function(){
            this.className=dClass+ ' animated '+current+' '+anClass;
        });
        div.addEventListener('mouseout',function(){
            this.className=dClass + anClass +' animated';

        })

    }
}

var public={
    addTransitionEnd:function(box,callback){
        //    判断用户传递是否是一个对象
        if(box&&typeof(box)=='object'){
            //   到此 box是可用的
            //    给box 绑定 事件
            box.addEventListener('transitionEnd',function(){
                // 如果callback存在则执行
                callback&&callback();
            });

            box.addEventListener('webkitTransitionEnd',function(){
                // 如果callback存在则执行
                callback&&callback();
            });

        }
    },


}