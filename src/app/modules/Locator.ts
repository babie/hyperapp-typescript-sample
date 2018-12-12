import { location, LocationState, LocationActions } from '@hyperapp/router'

export namespace Locator {
  export interface State {
    location: LocationState
  }
  export const state: State = {
    location: location.state
  }

  export interface Actions {
    location: LocationActions
  }
  export const actions: Actions = {
    location: location.actions
  }
}
