import { h, View } from 'hyperapp'
import { Switch, Route } from '@hyperapp/router'
import { Home, About } from './containers'
import { Counter, Locator } from './modules'

export namespace App {
  export type State = Counter.State & Locator.State
  export type Actions = Counter.Actions & Locator.Actions

  export const state = { ...Counter.state, ...Locator.state }
  export const actions = { ...Counter.actions, ...Locator.actions }
  export const view: View<State, Actions> = () => (
    <Switch>
      <Route path="/" render={Home} />
      <Route path="/about" render={About} />
    </Switch>
  )
}
