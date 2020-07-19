$.widget('custom.LED', {
    options: {
        value: 0,//value值与color颜色相对应，LED灯显示的颜色为color[value]设定的颜色。当value >= color.length的时候，始终显示color[color.length - 1]设定的颜色
        color: [
            {r: 220, g: 0, b: 0},
            {r: 0, g: 220, b: 0}
        ],
        size: 16,//圆形直径或方形边长
        shape: 'circle',//初步包含circle，square两类形状
        text: ''//初始化时会将this.element里面包含的内容记录下来，或者后面再单独添加
    },
    _create: function () {
        this.options.text = this.element.html();
        this.element.html('');//清理存储原有文字
        this._refresh();
    },
    _refresh: function () {
        if(this.options.value < 0){return;}
        let value = 0;
        if(this.options.value < this.options.color.length){value = this.options.value;}
        else{value = this.options.color.length - 1;}
        let r = this.options.color[value].r;
        let g = this.options.color[value].g;
        let b = this.options.color[value].b;
        if(this.options.shape === 'circle'){
            //this.element.attr('style', '');//清空原有样式表
            this.element.css('width', this.options.size + 'px');
            this.element.css('height', this.options.size + 'px');
            this.element.css('border-radius', (this.options.size / 2) + 'px');
            this.element.css('background', 'radial-gradient(rgb(' + r + ',' + g + ',' + b + ') 25%, rgb(' + (r * 0.25) + ',' + (g * 0.25) + ',' + (b * 0.25) + ')');
        }
        else if(this.options.shape === 'square'){
            this.element.css('width', (this.options.size * 0.6) + 'px');
            this.element.css('height', (this.options.size * 0.6) + 'px');
            this.element.css('border-radius', '0px');
            this.element.css('border-style', 'solid');
            this.element.css('border-width', (this.options.size * 0.2) + 'px');
            this.element.css('border-top-color', 'rgb(' + (r * 0.9) + ',' + (g * 0.9) + ',' + (b * 0.9) + ')');
            this.element.css('border-bottom-color', 'rgb(' + (r * 0.4) + ',' + (g * 0.4) + ',' + (b * 0.4) + ')');
            this.element.css('border-left-color', 'rgb(' + (r * 0.7) + ',' + (g * 0.7) + ',' + (b * 0.7) + ')');
            this.element.css('border-right-color', 'rgb(' + (r * 0.6) + ',' + (g * 0.6) + ',' + (b * 0.6) + ')');
            this.element.css('background', 'rgb(' + r + ',' + g + ',' + b + ')');
        }
        else{}
        this.element.html(this.options.text);
    },
    value: function (value) {
        if(value === undefined){return this.options.value;}
        if(value > -1){this.options.value = value;}
        else{this.options.value = 0;}
        this._refresh();
    },
    color: function () {
        return this.options.color;
    },
    size: function (size) {
        if(size === undefined){return this.options.size;}
        if(size >= 0){this.options.size = size;}
        else{this.options.size = 0;}
        this._refresh();
    },
    shape: function (shape) {
        if(shape === undefined){return this.options.shape;}
        if(shape === 'circle'){this.options.shape = shape;}
        else if(shape === 'square'){this.options.shape = shape;}
        else{this.options.shape = 'circle';}
        this._refresh();
    },
});
