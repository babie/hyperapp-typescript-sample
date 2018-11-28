import { h, View } from 'hyperapp'
import { Switch, Route } from '@hyperapp/router'
import { Modules as M } from './modules'
import { Components as C } from './components'

const view: View<M.AppState, M.AppActions> = () => (
  <Switch>
    <Route path="/" render={C.Home} />
    <Route path="/about" render={C.About} />
  </Switch>
)

export const Root = {
  view
}
