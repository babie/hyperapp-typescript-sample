import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Helmet } from 'hyperapp-helmet'
import { Counter } from './organs'

export const About = (): any => (_state: any, _actions: any) => (
  <div key="about">
    <Helmet key="about-helmet">
      <title>About</title>
      <meta name="description" content="About Page" />
    </Helmet>
    <h1>About</h1>
    <Counter />
    <div>
      <Link to="/">Home</Link>
    </div>
  </div>
)
