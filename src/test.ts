import {create} from './index'
const imgs = require('../mock/imgs')

let wf = create({
  el: 'wf',
  width: 14,
  gap: .5,
  unit: 'rem',
})
wf.append(imgs)
wf.append(imgs)