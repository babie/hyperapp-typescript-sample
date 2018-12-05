require('jsdom-global')('', {
  url: 'http:/localhost:3000'
})
import { renderToStream } from '@hyperapp/render'
import express from 'express'

import { Modules as M } from './modules'
import { Html } from './Html'

const server = express()

server.use(express.static('dist'))

server.get('/*', (req, res, next) => {
  M.state.location.pathname = req.path
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  renderToStream(Html, M.state, M.actions).pipe(res)
  next()
})

server
  .listen(3000, () => {
    console.log(`Server is running.`)
  })
  .on('error', console.error)
