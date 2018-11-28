import { location, LocationState, LocationActions } from '@hyperapp/router'

export namespace Locator {
  export interface IState {
    location: LocationState
  }
  export const state: IState = {
    location: location.state
  }

  export interface IActions {
    location: LocationActions
  }
  export const actions: IActions = {
    location: location.actions
  }
}
