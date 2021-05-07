type ImgObj = {
  img: string,
  width: number,
  height: number
}

type Config = {
  el: string,
  width?: number,
  gap?: number,
  cols?: number,
  unit?: string
}

const CONFIG_ERROR_INFO = `TypeError: new WaterFall() needs a Object, inner parameters like \n
{
  el: string,
  width?: number,
  gap?: number,
  cols?: number,
  unit?: string
}
, but received \n
`

export default class WaterFall{
  _config: Config = {
    el: '#app',
    width: 232,
    gap: 10,
    cols: 5,
    unit: 'px'
  }
  _isPass: boolean
  _wrapper?: HTMLElement
  _heightArr: number[]
  _leftArr: number[]
  _isFirst: boolean
  _minIndex: number

  constructor(config: Config){
    // 初始化
    this._isPass = false
    this._heightArr = []
    this._leftArr = []
    this._isFirst = true
    this._minIndex = -1
    this._init(config)
  }

  append(imgs: ImgObj[]){
    this._isPass && this._renderList(imgs)
  }

  _init(config: Config){
    try{
      // 校验config是否符合要求
      this._config = this._validate(config)
      this._isPass && this._render()
    }catch(e){
      console.log(e)
    }
  }

  _validate(config: Config): Config{
    let newConfig: Config 
    if(config === undefined || config.el.trim() === '' || config.el === undefined){
      throw new Error(CONFIG_ERROR_INFO + JSON.stringify(config))
    }
    newConfig = {
      el: config.el,
      width: config.width || 232,
      gap: config.gap || 10,
      cols: config.cols || 5,
      unit: config.unit || 'px'
    }
    this._isPass = true
    return newConfig
  }

  _render(): void{
    const { el, width, gap, cols, unit } = this._config

    let waterfall = document.getElementById(el)!
    if(waterfall === null){
      this._isPass = false
      throw new Error('the element\'s id is not exsist, please check out it again!')
    }else{
      // 外层包裹容器
      let wrapper = document.createElement('div')
      wrapper.classList.add('wrapper')
      let wrapperWidth = (width!)*(cols!) + (gap!)*((cols!) - 1)
      wrapper.style.width = wrapperWidth + unit!
      waterfall.appendChild(wrapper)
      this._wrapper = wrapper
    }
  }

  _renderList(imgs: ImgObj[]): void{
    imgs.forEach((item, index)=>{
      this._createItem(item, index)
    })
    this._isFirst = false
  }

  _createItem(item: ImgObj, index: number): void{
    // 图片容器
    let oItem = document.createElement('div')
    // 图片元素
    let oImg = new Image()

    oItem.className = 'wf-item'
    oItem.style.width = this._config.width! + this._config.unit!
    oItem.style.height = (item.height * this._config.width! / item.width) + this._config.unit!
    oImg.src = item.img

    oItem.appendChild(oImg)
    this._wrapper!.appendChild(oItem);

    this._setPosition(oItem, index)

    oImg.style.opacity = '1'
  }

  _setPosition(oItem: HTMLElement, index: number): void{
    let { width, gap, cols, unit } = this._config
    let itemLeft = (index % cols!) * (width! + gap!)
    
    if(index < cols! && this._isFirst){
      oItem.style.top = 0 + unit!
      oItem.style.left = itemLeft + unit!
      this._heightArr.push(oItem.offsetHeight)
      this._leftArr.push(itemLeft)
    } else{
      this._minIndex = this._getMinIndex(this._heightArr)
      oItem.style.top = (this._heightArr[this._minIndex] + gap!) + unit!
      oItem.style.left = this._leftArr[this._minIndex] + unit!
      this._heightArr[this._minIndex] += (oItem.offsetHeight + gap!)
    }
  }

  // 获取高度最小的元素所在的index
  _getMinIndex(arr: number[]): number{
    return [].indexOf.call(arr, <never>Math.min.apply(null, arr))
  }
}