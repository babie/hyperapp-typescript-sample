import { Counter } from './counter'
import { Locator } from './locator'

export namespace Modules {
  export type AppState = Counter.IState & Locator.IState
  export type AppActions = Counter.IActions & Locator.IActions
  export const state: AppState = { ...Counter.state, ...Locator.state }
  export const actions: AppActions = { ...Counter.actions, ...Locator.actions }
}
