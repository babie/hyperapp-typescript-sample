import { app } from 'hyperapp'
import { location } from '@hyperapp/router'

import { App } from './app'

const container = document.getElementById('app')
let main
if (process.env.NODE_ENV === 'development' && module.hot) {
  main = require('@hyperapp/logger').withLogger(app)(
    App.state,
    App.actions,
    App.view,
    container
  )
} else {
  main = app(App.state, App.actions, App.view, container)
}
const unsubscribe = location.subscribe(main.location)
