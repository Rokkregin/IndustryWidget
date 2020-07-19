$('#testLED').LED();

$('#testSwitch').switch();
$('#testSwitch').switch('iconList',
    ['./Switch/icons/2-switch-on.png','./Switch/icons/2-switch-off.png']);


$('#test8Switch').switch();
let switch8List = [
    './Switch/icons/8-switch-0.png',
    './Switch/icons/8-switch-1.png',
    './Switch/icons/8-switch-2.png',
    './Switch/icons/8-switch-3.png',
    './Switch/icons/8-switch-4.png',
    './Switch/icons/8-switch-5.png',
    './Switch/icons/8-switch-6.png',
    './Switch/icons/8-switch-7.png',
];
$('#test8Switch').switch('iconList', switch8List);
$('#test8Switch').switch('size', [200, 200]);
$('#test8Switch').switch('type', 'loop');