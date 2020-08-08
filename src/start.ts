import express from 'express'
import logger from 'loglevel'
import {getRoutes} from './routes'

function startServer(port: number) {
  const app = express()

  app.use('/api', getRoutes())

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`>> Listening on port ${port}`)
      resolve(server)
    })
  })

}

export {startServer}