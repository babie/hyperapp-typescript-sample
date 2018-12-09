import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { App as A } from '../App'
import { Helmet } from 'hyperapp-helmet'

export const About = (): any => (state: A.State, actions: A.Actions) => (
  <div key="about">
    <Helmet key="about-helmet">
      <title>About</title>
      <meta name="description" content="About Page" />
    </Helmet>
    <h1>About</h1>
    <div>
      <Link to="/">Home</Link>
    </div>
  </div>
)
