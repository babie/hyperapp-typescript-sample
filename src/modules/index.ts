import { Counter } from './counter'
import { Locator } from './locator'

export namespace Modules {
  export type State = Counter.IState & Locator.IState
  export type Actions = Counter.IActions & Locator.IActions
  export const state: State = { ...Counter.state, ...Locator.state }
  export const actions: Actions = { ...Counter.actions, ...Locator.actions }
}
