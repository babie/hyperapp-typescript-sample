import { h, View } from 'hyperapp'
import { Switch, Route } from '@hyperapp/router'
import { Home, About } from './containers'
import { Counter, Locator } from './modules'

type State = Counter.State & Locator.State
type Actions = Counter.Actions & Locator.Actions

export namespace App {
  export const view: View<State, Actions> = () => (
    <Switch>
      <Route path="/" render={Home} />
      <Route path="/about" render={About} />
    </Switch>
  )
  export const state = { ...Counter.state, ...Locator.state }
  export const actions = { ...Counter.actions, ...Locator.actions }
}
