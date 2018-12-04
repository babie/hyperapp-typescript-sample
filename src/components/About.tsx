import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Modules } from '../modules'
import { Helmet } from '../helmet'

export const About = (): any => (
  state: Modules.AppState,
  actions: Modules.AppActions
) => (
  <div key="about">
    <Helmet key="about-helmet">
      <title>About!</title>
    </Helmet>
    <h1>About</h1>
    <div>
      <Link to="/">Home</Link>
    </div>
  </div>
)
