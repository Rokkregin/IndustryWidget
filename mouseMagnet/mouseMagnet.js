$.widget('custom.magnet', {
    options: {
        left : 40,
        right : 40,
        top : 40,
        bottom : 40,
        icon : 'mouseMagnet/mouseIcon/mouseCur.png'
    },
    _create: function () {
        this.element.before('<div id="' + this.element[0].id + '_magZone" class="mouseMagnetZone"></div>');
        var magZone = $('#' + this.element[0].id + '_magZone');
        magZone.css('left', (this.element.position().left - this.options.left) + 'px');
        magZone.css('top', (this.element.position().top - this.options.top) + 'px');
        magZone.css('width', (this.element.width() + this.options.left + this.options.right) + 'px');
        magZone.css('height', (this.element.height() + this.options.top + this.options.bottom) + 'px');
        this.element.after('<img id="' + this.element[0].id + '_magCur" src="' + this.options.icon + '" class="mouseMagnetCur mouseMagnetZone">');
        var magCur = $('#' + this.element[0].id + '_magCur');
        magCur.css('visibility', 'hidden');
        magZone.data('options', this.options);
        magZone.data('magCur', magCur);
        magZone.data('magObj', this.element);
        magZone.bind('mousemove', function (event) {
            let curX = 0;
            let curY = 0;
            if(event.offsetX < $('#' + this.id).data('options').left){curX = 3;}
            else if(event.offsetX > ($('#' + this.id).width() - $('#' + this.id).data('options').right)){
                curX = $('#' + this.id).width() - $('#' + this.id).data('options').right - $('#' + this.id).data('options').left - 3;
            }
            else{curX = event.offsetX - $('#' + this.id).data('options').left;}

            if(event.offsetY < $('#' + this.id).data('options').top){curY = 3;}
            else if(event.offsetY > ($('#' + this.id).height() - $('#' + this.id).data('options').bottom)){
                curY = $('#' + this.id).height() - $('#' + this.id).data('options').top - $('#' + this.id).data('options').bottom - 3;
            }
            else{curY = event.offsetY - $('#' + this.id).data('options').top;}
            $('#' + this.id).data('magCur').css('left', (curX + $('#' + this.id).data('magObj').position().left + 'px'));
            $('#' + this.id).data('magCur').css('top', (curY + $('#' + this.id).data('magObj').position().top + 'px'));
        });
        magZone.bind('mouseleave', this._curHide);
        magZone.bind('mouseenter', this._curShow);
        window.removeEventListener('resize', this._curResize);
        window.addEventListener('resize', this._curResize);
        //this._curHide();
        /*if(this.options.value < 0){
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
            },
            'DOMMouseScroll': function (event) {
                if(event.detail > 0){
                    this._leftClick();
                }
                else{
                    this._rightClick();
                }
            },
            'mousewheel': function (event) {
                if(event.originalEvent.wheelDelta > 0){
                    this._leftClick();
                }
                else{
                    this._rightClick();
                }
            }
        });
        this._refresh();*/
    },
    _curHide: function(){
        $('#' + this.id).data('magCur').css('visibility', 'hidden');
    },
    _curShow: function(){
        $('#' + this.id).data('magCur').css('visibility', 'visible');
    },
    detectZoom: function() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    },
    _curResize: function(){
        let zoom = $.custom.magnet().detectZoom();
        if(zoom != 100){
            $('.mouseMagnetCur').css('height', 19 * 100 / zoom + 'px');
            $('.mouseMagnetCur').css('width', 13 * 100 / zoom + 'px');
        }
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
