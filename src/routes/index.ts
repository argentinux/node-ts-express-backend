import express from 'express'

function getRoutes() {
  const router = express.Router()

  router.get('/', (_req, res) => {
    res.send('Hello, World')
  })

  return router
}

export { getRoutes }