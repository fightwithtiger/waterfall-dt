import { 
  CONFIG_ERROR_INFO, 
  DOM_NOT_FOUND_INFO 
} from '../const/index'

class ConfigTypeError extends Error{
  constructor(info: string=''){
    const message = CONFIG_ERROR_INFO + info
    super(message)
  }
}

class DomNotFoundError extends Error{
  constructor(info: string=''){
    const message = DOM_NOT_FOUND_INFO + info
    super(message)
  }
}

export {
  ConfigTypeError,
  DomNotFoundError
}