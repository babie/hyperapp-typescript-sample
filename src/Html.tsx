import { h, View } from 'hyperapp'
import { Modules as M } from './modules'
import { Root as R } from './Root'
import { rewind } from './helmet'

const Fragment = ''
export const Html: View<M.AppState, M.AppActions> = (
  state: M.AppState,
  actions: M.AppActions
) => {
  const helmet = rewind(R.view, state, actions)
  return (
    <Fragment>
      <Fragment innerHTML="<!doctype html>" />
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="/indexxxxx.js" defer />
        </head>
        <body>
          <div id="app">{R.view}</div>
        </body>
      </html>
    </Fragment>
  )
}
