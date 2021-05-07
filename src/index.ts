import './index.less'
import WaterFall from './WaterFall'

type Config = {
  el: string,
  width?: number,
  gap?: number,
  cols?: number,
  unit?: string
}

export function create(config: Config): WaterFall{
  let wf = new WaterFall(config)
  return wf
}