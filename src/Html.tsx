import { h, View } from 'hyperapp'
import { Modules as M } from './modules'
import { Root as R } from './Root'

const Fragment = ''
export const Html: View<M.AppState, M.AppActions> = (
  _state: M.AppState,
  _actions: M.AppActions
) => {
  return (
    <Fragment>
      <Fragment innerHTML="<!doctype html>" />
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="./index.js" defer />
        </head>
        <body>
          <div id="app">{R.view}</div>
        </body>
      </html>
    </Fragment>
  )
}
