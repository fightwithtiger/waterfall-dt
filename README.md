# GetStart
## step1 install it
`npm install waterfall-dt`

## step2 how to use
first, you need to create a HTMLElemnt or select one that already have in your web page, for example: 
`<div id="wf"></div>`

second, you need to require the module you just install before and then you can easily use it, just like the following:
```JavaScript
//commonJS
const WaterFall = require('waterfall-dt');
let wf = WaterFall.create({
  el: 'wf', // The container's id, must have
  width: 300, // the picture's width, default value is 232
  gap: 20, // the gap between two pictures, default value is 10
  cols: 4 // colums, default value is 5
  unit: 'px' // unit, default value is 'px', only support 'px' and 'rem'
  lazy: false // Indicates whether the image is lazy to load, default valut is false
})

// or es6
// import { create } from 'waterfall-dt'
// let wf = create({
//   el: 'wf', // The container's id, must have
//   width: 300, // the picture's width, default value is 232
//   gap: 20, // the gap between two pictures, default value is 10
//   cols: 4 // colums, default value is 5
//   unit: 'px' // unit, default value is 'px', only support 'px' and 'rem'
//   lazy: false // Indicates whether the image is lazy to load, default valut is false
// })

// you need the imgs'format like this:
const imgs = [
  {"img":"../img/1.jpg","width":2560,"height":1600},
{"img":"../img/2.jpg","width":1366,"height":768},
{"img":"../img/3.jpg","width":1920,"height":1080},
{"img":"../img/4.jpg","width":1600,"height":2840}]

wf.append(imgs) // to show waterfall images
```

## more about lazyload
If you want to use custom lazy-loaded transition images or svgs, you can rewrite lazy to an object with the use parameter set to true and the URL parameter set to the address of the custom image, Here's an example:
```JavaScript
const WaterFall = require('waterfall-dt');
let wf = WaterFall.create({
  el: 'wf',
  lazy: {
    use: true,
    url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2955301104,3476101192&fm=26&gp=0.jpg'
  }
})
```

# Notice
Notice that when creating a wf instance using the create method, keep the format of the incoming parameters consistent. imgs is a list of images that need to be passed in as described above

If you have questions, please send an email to 2284925818@qq.com