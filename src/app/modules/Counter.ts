export namespace Counter {
  export interface State {
    count: number
  }
  export const state: State = {
    count: 0
  }

  export interface Actions {
    down: (value: number) => (state: State) => State
    up: (value: number) => (state: State) => State
  }
  export const actions: Actions = {
    down: (value: number) => (state: State) =>
      ({ count: state.count - value } as State),
    up: (value: number) => (state: State) =>
      ({ count: state.count + value } as State)
  }
}
