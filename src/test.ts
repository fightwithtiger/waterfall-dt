import { create } from './index'
const imgs = require('../mock/imgs')

let wf = create({
  el: 'wf',
})
wf.append(imgs)
wf.append(imgs)