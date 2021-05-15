import { Config, ImgObj } from '../types/index'
import { LAZY_LOAD_URL } from '../const/index'
import { validateConfig } from '../uitls/validate'

class WaterFall{
  _config: Config = { el: '#app'} // 传入配置参数
  _isPass: boolean // 是否通过校验
  _dom?: HTMLElement // 传入的dom节点
  _wrapper?: HTMLElement // 图片列表外围容器
  _heightArr: number[] // 记录每列的高度
  _leftArr: number[] // 记录第一行每个图片的左边位置
  _isFirst: boolean // 标识是否为第一行图片
  _minIndex: number
  _n: number // 当前img的数量
  _flag: boolean // 是否懒加载
  _url: string // 懒加载图片的地址
  _fontSize: number

  constructor(config: Config){
    // 初始化
    this._isPass = false
    this._heightArr = []
    this._leftArr = []
    this._isFirst = true
    this._minIndex = -1
    this._n = 0
    this._flag = false
    this._url = LAZY_LOAD_URL
    this._fontSize = 16
    try{
      this._config = this._initConfig(config)
      this._isPass && this._render()
      this._flag = this._isLazyLoad()
    }catch(e){
      // 传入参数有误，校验未通过
      this._isPass = false
      console.log(e)
    }
  }

  // 暴露出去的方法，向容器中添加图片
  append(imgs: ImgObj[]){
    try{
      this._isPass && this._renderList(imgs)
      if(this._flag){
        this._bindEvent()
      }
    }catch(e){
      console.log('Error in rendering images. Please check the format of the list of images passed in')
    }
  }

  // 绑定加载和滚动事件，为图片懒加载而设置
  _bindEvent(){
    let oItems = this._wrapper?.children || new HTMLCollection()
    window.onload = () => {
      this._imgLazyLoad(oItems).bind(this)()
    }
    // 进行节流设置
    let start = Date.now()
    window.addEventListener('scroll', () => {
      let now = Date.now()
      if(now - start > 200){
        this._imgLazyLoad(oItems).bind(this)()
        start = now
      }
    }, false)
  }

  // 初始化config
  _initConfig(config: Config): Config{
    // 校验config是否符合要求
    this._isPass = validateConfig(config)
    return this._setConfig(config)
  }

  _setConfig(config: Config){
    let newConfig: Config
    newConfig = {
      el: config.el,
      width: config.width || 232,
      gap: config.gap || 10,
      cols: config.cols || 5,
      unit: config.unit || 'px',
      lazy: config.lazy || false
    }
    return newConfig
  }

  // 渲染页面，添加wrapper容器
  _render(): void{
    const { el, width, gap, cols, unit } = this._config
    const html = document.getElementsByTagName('html')[0]
    this._fontSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue('font-size'))
    this._dom = document.getElementById(el)!
    // 外层包裹容器
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let wrapperWidth = (width!)*(cols!) + (gap!)*((cols!) - 1)
    wrapper.style.width = wrapperWidth + unit!
    this._dom.appendChild(wrapper)
    this._wrapper = wrapper
  }

  // 渲染图片列表
  _renderList(imgs: ImgObj[]): void{
    imgs.forEach((item, index)=>{
      this._createItem(item, index)
    })
    this._isFirst = false
  }

  // 创造图片的容器和图片元素
  _createItem(item: ImgObj, index: number): void{
    const { lazy } = this._config
    // 图片容器div设置
    let oItem = document.createElement('div')
    oItem.className = 'wf-item'
    oItem.style.width = this._config.width! + this._config.unit!
    oItem.style.height = (item.height * this._config.width! / item.width) + this._config.unit!
    
    // 图片元素
    let oImg = new Image()
    oImg.className = 'wf-img-item'
    // 根据是否懒加载而设置图片的属性
    if(this._flag){
      oImg.src = oImg.className = this._url
      oImg.setAttribute('data-src', item.img)
    }else{
      oImg.src = item.img
    }

    oItem.appendChild(oImg)
    this._wrapper!.appendChild(oItem);
    // 设置图片容器的位置，根据列高度最小值插入原则
    this._setPosition(oItem, index)
    oImg.style.opacity = '1'
  }

  // 判断是否需要进行懒加载
  _isLazyLoad(): boolean{
    const { lazy } = this._config
    if(typeof lazy === 'boolean'){
      return lazy
    }
    if(typeof lazy === 'object'){
      if(lazy.use){
        this._url = lazy.url! || LAZY_LOAD_URL
      }
      return lazy.use
    }
    return false
  }

  // 图片懒加载实现
  _imgLazyLoad(oItems: HTMLCollection){
    let len = Object.keys(oItems).length
    let that = this
    return function(){
      let cHeight = document.documentElement.clientHeight
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      let oItem: HTMLImageElement
      // 当图片顶部小于滚动高度加屏幕高度时表示出现在页面内需要加载图片
      for(let i=that._n;i<len;i++){
        oItem = <HTMLImageElement>oItems[i]
        if(oItem.offsetTop < cHeight + sTop){
          let url = oItem.children[0].getAttribute('data-src')!
          oItem.children[0].setAttribute('src', url)
          oItem.children[0].removeAttribute('data-src')
          that._n++
        }
      }
    }
    
  }

  // 设置图片容器位置
  _setPosition(oItem: HTMLElement, index: number): void{
    let { width, gap, cols, unit } = this._config
    let itemLeft = (index % cols!) * (width! + gap!)
    
    if(index < cols! && this._isFirst){
      // 设置第一行的位置
      oItem.style.top = 0 + unit!
      oItem.style.left = itemLeft + unit!
      // 保存第一行图片的位置信息，用来后面的图片定位使用
      this._heightArr.push(oItem.offsetHeight)
      this._leftArr.push(itemLeft)
      console.log(oItem.offsetHeight)
    } else{
      // 拿到高度最小的列，将图片插入到下面
      this._minIndex = this._getMinIndex(this._heightArr)
      if(this._config.unit === 'rem'){
        oItem.style.top = (this._heightArr[this._minIndex]/this._fontSize + gap!) + unit!
        oItem.style.left = this._leftArr[this._minIndex] + unit!
        this._heightArr[this._minIndex] += (oItem.offsetHeight + gap!*this._fontSize)
      }else{
        oItem.style.top = (this._heightArr[this._minIndex] + gap!) + unit!
        oItem.style.left = this._leftArr[this._minIndex] + unit!
        // 由于插入了一张图片，要更新当前列的高度
        this._heightArr[this._minIndex] += (oItem.offsetHeight + gap!)
      }
    }
  }

  // 获取高度最小的元素所在的index
  _getMinIndex(arr: number[]): number{
    return [].indexOf.call(arr, <never>Math.min.apply(null, arr))
  }
}

export default WaterFall