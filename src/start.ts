import express from 'express'
import logger from 'loglevel'
import { getRoutes } from './routes'
import util from 'util'

import 'express-async-errors'
import { errorHandler } from './middlewares/error'
import { setupCloseOnExit } from './utils'

function startServer(port: number) {
  const app = express()

  app.use('/api', getRoutes())

  app.use(errorHandler)

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`>> Listening on port ${port}`)

      // promisify `close` method
      const originalClose = server.close.bind(server)
      /* @ts-ignore */
      server.close = util.promisify(originalClose)

      // close server
      setupCloseOnExit(server)

      resolve(server)
    })
  })
}

export { startServer }
