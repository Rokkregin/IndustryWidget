$.widget('custom.switch', {
    options: {
        action: 'on',//启用自动的点击动作处理off关闭
        type: 'recipe',//loop是循环型，多个开关项之间为0-1-2-0-1-2，recipe是往复型，0-1-2-1-0-1-2
        value: 0,//value决定了当前开关显示状态，会与鼠标动作绑定
        iconList: [
            './Switch/icons/2-switch-on.png',
            './Switch/icons/2-switch-mid.png',
            './Switch/icons/2-switch-off.png'
        ],//这个Array里面放置显示的icon，实际控件显示的图片是iconList[value]
        size:[80, 40]
    },
    _reverse: false,
    _create: function () {
        if(this.options.value < 0){
            this.options.value = 0;
        }
        this.element.switchLeftClick = this._leftClick();
        this.element.bind('contextmenu', function(){return false;});//屏蔽默认右键动作
        this.element.bind('dragstart',function(){return false;});//屏蔽拖动动作
        this._on(this.element, {
            'mouseup': function (event) {
                if(event.which === 1){this._leftClick();}//左键
                else if(event.which === 3){this._rightClick();}//右键
                else{}
            }
        });
        this._refresh();
    },
    _refresh: function(){
        this.element.css('width', this.options.size[0] + 'px');
        this.element.css('height', this.options.size[1] + 'px');
        this.element.html('<img src="' + this.options.iconList[this.options.value] + '" style="width: 100%;height: 100%"/>');
    },
    _leftClick: function(){
        let count = this.options.iconList.length;
        if(this.options.action === 'on'){
            if(this.options.type === 'loop'){
                this.options.value = (this.options.value + 1) % count;
            }
            else if(this.options.type === 'recipe'){
                if(this._reverse){
                    if(this.options.value == 0){
                        this._reverse = false;
                        this.options.value += 1;
                    }
                    else{
                        this.options.value -= 1;
                    }
                }
                else{
                    if(this.options.value == (count - 1)){
                        this._reverse = true;
                        this.options.value -= 1;
                    }
                    else{
                        this.options.value += 1;
                    }
                }
            }
            else{}
        }
        this._refresh();
    },
    _rightClick: function(){
        let count = this.options.iconList.length;
        if(this.options.action === 'on'){
            if(this.options.type === 'loop'){
                this.options.value = (this.options.value - 1) % count;
                this.options.value < 0 ? this.options.value += count : this.options.value;
            }
            else if(this.options.type === 'recipe'){
                if(this._reverse){
                    if(this.options.value == (count - 1)){
                        this._reverse = false;
                        this.options.value -= 1;
                    }
                    else{
                        this.options.value += 1;
                    }
                }
                else{
                    if(this.options.value == 0){
                        this._reverse = true;
                        this.options.value += 1;
                    }
                    else{
                        this.options.value -= 1;
                    }
                }
            }
            else{}
        }
        this._refresh();
    },
    action: function (value) {
        if(value === undefined){return this.options.action;}
        if(value === 'on' || value === 'off'){this.options.action = value;}
    },
    type: function (value) {
        if(value === undefined){return this.options.type;}
        if(value === 'loop' || value === 'recipe'){this.options.type = value;}
    },
    value: function (value) {
        if(value === undefined){return this.options.value;}
        if(value < 0){this.options.value = 0;}
        else{this.options.value = value % this.options.iconList.length;}
        this._refresh();
    },
    size: function (value) {
        if(value === undefined){return this.options.size;}
        if(value.length == 2){
            this.options.size = value;
            this._refresh();
        }
    },
    iconList: function (value) {
        if(value === undefined){return this.options.iconList;}
        if(value.length > 0){
            this.options.iconList = value;
            this._refresh();
        }
    },
});
