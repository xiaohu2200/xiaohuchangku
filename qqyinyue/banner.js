+function ($) {
//基于jquery的轮播插件
$.fn.extend({

    banner: function (options) {

      if (!($.isArray(options.imgs) && options.imgs.length > 0)) {
        //如果没有图片数据

        //创建自定义错误信息, 返回一个错误对象
        var error = new Error('imgs必须是一个数组且有一个元素');

        //抛出自定义错误信息，throw会终止函数执行
        throw error.message;
      }

      //默认配置
      var opt = {
        //是否自动轮播
        autoplay: true,

        //每个3s轮播一张图片
        duration: 3000,

        //悬浮是否停止自动轮播, true: 停止, false：不停止
        hover: true,

        //是否可点击图片索引切换图片
        clickable: true,

        //轮播图片
        imgs: [],

        //图片滑动时间
        time: 300,

        //是开启左右切换图片
        isHasArrow: true
      };

      //options: 配置
      options = $.extend(opt, options);

      //控制图片滑动时间比自动轮播图片时间小
      if (options.duration <= options.time + 1000) {
        throw new Error('自动轮播图片时间必须比图片滑动时间至少多1秒').message;
      }

      //将最后一张图片添加到opt.imgs数组开头位置
      options.imgs.unshift(options.imgs.slice(-1)[0]);

      //保存当前轮播图片的下标
      var index = 0;

      //保存定时器序号
      var timer = null;

      //创建轮播图片
      //获取展示轮播图片盒子的宽度
      var width = this.width();

      var $div = $('<div class="banner"></div>');

      //轮播图片ul
      var $list = $('<ul class="list"></ul>');

      //创建轮播索引ul
      var $index = $('<ul class="indexs"></ul>');

      $.each(options.imgs, function (i, v) {
        var $li = $('<li><img class="auto-img" src="' + v + '" alt=""></li>');
        $li.width(width);
        $list.append($li);

        if (i > 0) {
          var $indexLi = $('<li class="' + (i == 1 ? 'active' : '') + '"></li>');
          $index.append($indexLi);
        }

      })

      $list.css({
        width: width * opt.imgs.length + 'px',
        left: -width + 'px'
      });

       // 上一张
       function prevImg() {
        if ($list.position().left % width != 0) {
          return;
        }

        //上一张
        index--;

        console.log(index);
        
        if (index == -1) {
          index = options.imgs.length - 2;
        }

        $index.find('li').eq(index).addClass('active').siblings().removeClass('active');

        $list.animate({
          left: -width * (index == options.imgs.length - 2 ? 0 : (index + 1)) + 'px'
        }, options.time, function () {
          if (index == options.imgs.length - 2) {
            $(this).css({
              left: -width * (options.imgs.length - 1) + 'px'
            })
          }
        })
        }

      //下一张
      function nextImg() {
        if ($list.position().left % width != 0) {
          return;
        }

        //下一张
        index++;

        if (index == options.imgs.length - 1) {
          index = 0;
          $list.css({left: '0px'});
        }

        $index.find('li').eq(index).addClass('active').siblings().removeClass('active');

        $list.animate({
          left: -width * (index + 1) + 'px'
        }, options.time)
      }


      //创建左右箭头
      if (options.isHasArrow) {
        console.log('a')
        var $arrow = $('<div class="arrow">' +
            '<div class="arr left" data-direction="prev"></div>' +
            '<div class="arr right" data-direction="next"></div>' +
          '</div>');

        //左右切换图片
        $arrow.on({'click': function () {

          //获取移动方向
          var direction = $(this).data('direction');

          

          if (direction == 'prev') {
            
            prevImg();

          } else if (direction == 'next') {

            nextImg();
          }

        }}, '.arr')

        $div.append($arrow);
      }

      $div.append($list).append($index)

      this.append($div);


      //点击索引切换图片
      if (options.clickable) {
        //bind: 不支持事件委托
        //on: 支持事件委托
        $index.on({'click': function () {
        
          //当前索引是否激活
          if ($(this).hasClass('active')) {
            return;
          }

          $(this).addClass('active').siblings().removeClass('active');

          //获取下标
          index = $(this).index();
          $list.animate({
            left: -width * (index + 1) + 'px'
          }, options.time)

        }}, 'li');



      }

      //自动播放
      function autoplay() {
        if (options.autoplay) {
          timer = setInterval(function () {
            nextImg();
          }, options.duration)
        }
      }

      autoplay();
      

      //悬浮是否停止自动轮播
      if (options.hover) {
        $div.hover(function () {
          //停止定时器
          clearInterval(timer);
          timer = null;
        }, function () {
          autoplay();
        })
      }

      
    }

})

}(jQuery);

