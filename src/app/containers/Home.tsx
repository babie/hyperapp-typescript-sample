import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Helmet } from 'hyperapp-helmet'
import { Counter } from './organs'

export const Home = (): any => (_state: any, _actions: any) => (
  <div key="home">
    <Helmet key="home-helmet">
      <title>Home</title>
      <meta name="description" content="Home Page" />
    </Helmet>
    <h1>Home</h1>
    <Counter />
    <div>
      <Link to="/about">About</Link>
    </div>
  </div>
)
