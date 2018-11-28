import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Modules } from '../modules'

export const About = (): any => (
  state: Modules.AppState,
  actions: Modules.AppActions
) => (
  <div>
    <h1>About</h1>
    <div>
      <Link to="/">Home</Link>
    </div>
  </div>
)
