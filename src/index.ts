import { app } from 'hyperapp'
import { location } from '@hyperapp/router'

import { Modules as M } from './modules'
import { App as A } from './App'

const container = document.getElementById('app')
let main
if (process.env.NODE_ENV === 'development' && module.hot) {
  main = require('@hyperapp/logger').withLogger(app)(
    M.state,
    M.actions,
    A.view,
    container
  )
} else {
  main = app(M.state, M.actions, A.view, container)
}
const unsubscribe = location.subscribe(main.location)
