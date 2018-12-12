import { h, View } from 'hyperapp'
import { App } from './app'
import { getHelmetNodes } from 'hyperapp-helmet'

const Fragment = ''
export namespace Html {
  export const state = App.state
  export const actions = App.actions
  export const view = (state: any, actions: any) => {
    const helmetNodes = getHelmetNodes(App.view, state, actions)
    return (
      <Fragment>
        <Fragment innerHTML="<!doctype html>" />
        <html lang="ja">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <script src="/index.js" defer />
            {helmetNodes}
          </head>
          <body>
            <div id="app">{App.view}</div>
          </body>
        </html>
      </Fragment>
    )
  }
}
