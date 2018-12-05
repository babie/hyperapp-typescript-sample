import { h, View } from 'hyperapp'
import { Switch, Route } from '@hyperapp/router'
import { Modules as M } from './modules'
import { Components as C } from './components'

export namespace App {
  export const view: View<M.State, M.Actions> = () => (
    <Switch>
      <Route path="/" render={C.Home} />
      <Route path="/about" render={C.About} />
    </Switch>
  )
  export const state = M.state
  export const actions = M.actions

  export type State = M.State
  export type Actions = M.Actions
}
