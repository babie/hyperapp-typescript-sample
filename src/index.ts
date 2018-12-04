import { app } from 'hyperapp'
import { location } from '@hyperapp/router'

import { Modules as M } from './modules'
import { Root as R } from './Root'

const container = document.getElementById('app')
let main
if (process.env.NODE_ENV === 'development' && module.hot) {
  main = require('@hyperapp/logger').withLogger(app)(
    M.state,
    M.actions,
    R.view,
    container
  )
} else {
  main = app(M.state, M.actions, R.view, container)
}
const unsubscribe = location.subscribe(main.location)
