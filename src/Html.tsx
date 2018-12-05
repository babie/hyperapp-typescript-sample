import { h, View } from 'hyperapp'
import { App as A } from './App'
import { rewind } from './helmet'

const Fragment = ''
export const Html: View<A.State, A.Actions> = (
  state: A.State,
  actions: A.Actions
) => {
  const helmetChildren = rewind(A.view, state, actions)
  return (
    <Fragment>
      <Fragment innerHTML="<!doctype html>" />
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="/index.js" defer />
          {helmetChildren}
        </head>
        <body>
          <div id="app">{A.view}</div>
        </body>
      </html>
    </Fragment>
  )
}
