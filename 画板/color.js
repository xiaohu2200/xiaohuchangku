 function ColorBlock(options, selector) {

      //selector: 颜色块的id
      this.selector = selector;

      this.options = options;

      //红绿蓝
      this.red = options.red.value;
      this.green = options.green.value;
      this.blue = options.blue.value;

      //保存红绿蓝元素id
      this.keys = Object.keys(options);

    }

    //获取id元素
    ColorBlock.prototype.getId = function (id) {
      return document.getElementById(id);
    }

    //绑定事件
    ColorBlock.prototype.event = function (type, fn) {
      for (var i = 0; i < this.keys.length; i++) {
        this.getId(this.keys[i])['on' + type] = fn;
      }
    }

    //初始化色值
    ColorBlock.prototype.initColor = function () {
      //修改显示色值的元素文本内容
      //遍历this.options
      for (var k in this.options) {
        this.getId(this.options[k].key).textContent = this.options[k].value;
        this.getId(k).value = this.options[k].value;

        //修改红绿蓝的色值
        this[k] = this.options[k].value;
      }

      //设置颜色块的颜色
      this.getId(this.selector).style.backgroundColor = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
    }

    //初始化
    ColorBlock.prototype.init = function () {
      var self = this;

      //初始化色值
      this.initColor();

      //绑定事件
      this.event('input', function () {
        //获取当前元素的id
        var id = this.getAttribute('id');

        //获取颜色项
        var colorItem = self.options[id];
        // console.log('colorItem ==> ', colorItem);

        //将当前滑条的值赋值给显示颜色值的元素
        self.getId(colorItem.key).textContent = this.value;

        //修改红绿蓝的色值
        self[id] = this.value;

        console.log('self[' + id + '] ==> ', self[id]);

        //动态修改颜色块的颜色
        self.getId(self.selector).style.backgroundColor = 'rgb(' + self.red + ',' + self.green + ',' + self.blue +
          ')';
        
        banner.draw('#canvas','rgb('+colorBlock.red+','+colorBlock.green+','+colorBlock.blue+')',10);
      });
      
      
    }