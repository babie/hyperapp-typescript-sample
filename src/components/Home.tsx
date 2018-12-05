import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Modules as M } from '../modules'
import { Helmet } from '../helmet'

export const Home = (): any => (state: M.AppState, actions: M.AppActions) => (
  <div key="home">
    <Helmet key="home-helmet">
      <title>Home</title>
      <meta name="description" content="Home Page" />
    </Helmet>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
    <div>
      <Link to="/about">About</Link>
    </div>
  </div>
)
