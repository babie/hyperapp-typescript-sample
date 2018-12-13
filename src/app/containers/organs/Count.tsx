import { h } from 'hyperapp'
import { Counter } from '../../modules'

export const Count = (): any => (
  state: Counter.State,
  actions: Counter.Actions
) => (
  <div>
    <h2>{state.count}</h2>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
)
