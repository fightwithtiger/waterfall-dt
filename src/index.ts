import './style/index.less'
import WaterFall from './waterfall/WaterFall'

import { Config } from './types/index'

function create(config: Config): WaterFall{
  let wf = new WaterFall(config)
  return wf
}

export {
  create
}