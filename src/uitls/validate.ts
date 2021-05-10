import { Config } from '../types/index'
import { 
  ConfigTypeError,
  DomNotFoundError
} from '../errors/index'

function validateConfig(config: Config): boolean{
  if(config === undefined || config.el === undefined){
    throw new ConfigTypeError(JSON.stringify(config))
  }
  if(!document.getElementById(config.el)){
    throw new DomNotFoundError()
  }
  
  return true
}

export {
  validateConfig
}