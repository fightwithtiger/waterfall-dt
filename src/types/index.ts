type Config = {
  el: string,
  width?: number,
  gap?: number,
  cols?: number,
  unit?: string,
  lazy?: boolean | {
    use: boolean,
    url?: string
  }
}

type ImgObj = {
  img: string,
  width: number,
  height: number
}

type lazyObj = {
  use: boolean,
  url?: string
}

export {
  Config,
  ImgObj,
  lazyObj
}