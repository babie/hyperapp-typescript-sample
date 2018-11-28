export namespace Counter {
  export interface IState {
    count: number
  }
  export const state: IState = {
    count: 0
  }

  export interface IActions {
    down: (value: number) => (state: IState) => IState
    up: (value: number) => (state: IState) => IState
  }
  export const actions: IActions = {
    down: (value: number) => (state: IState) =>
      ({ count: state.count - value } as IState),
    up: (value: number) => (state: IState) =>
      ({ count: state.count + value } as IState)
  }
}
