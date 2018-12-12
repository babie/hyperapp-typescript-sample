import { h } from 'hyperapp'
import { Counter as C } from '../../modules'

export const Counter = (): any => (state: C.State, actions: C.Actions) => (
  <div>
    <h2>{state.count}</h2>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
)
