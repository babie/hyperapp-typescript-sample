import { JSDOM } from 'jsdom'

declare var global: any
global.document = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:3000'
})
global.window = global.document.window
global.navigator = { userAgent: 'node.js' }

import { renderToStream } from '@hyperapp/render'
import express from 'express'

import { Html } from './html'

const server = express()

server.use(express.static(__dirname + '/public'))

server.get('/*', (req, res, next) => {
  Html.state.location.pathname = req.path
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  renderToStream(Html.view, Html.state, Html.actions).pipe(res)
  next()
})

server.listen(3000, () => {
  console.log(`Server is running.`)
})
