# GetStart
安装：npm install waterfall-dt

使用
```
html创建元素节点节点：<div id="wf"></div>

引入
const WaterFall = require('waterfall-dt');
let wf = WaterFall.create({
  el: 'wf', // 绑定的html元素节点id，必传
  width: 300, // 需要显示图片宽度，可不传，默认为232
  gap: 20, // 图片之间间隙，可不传，默认为10
  cols: 4 // 图片排几列，可不传，默认为5
  unit: 'px' // 单位，可不传，默认为px
})

const imgs = [
  {"img":"../img/1.jpg","width":2560,"height":1600},
{"img":"../img/2.jpg","width":1366,"height":768},
{"img":"../img/3.jpg","width":1920,"height":1080},
{"img":"../img/4.jpg","width":1600,"height":2840}]

wf.append(imgs) // 插入图片，瀑布流显示
```

# 注意事项
注意请在用create方法创建wf实例时，保持传入参数格式的一致。imgs是一个图片列表，需要按上述形式传入
如有问题请发送邮件到2284925818@qq.com