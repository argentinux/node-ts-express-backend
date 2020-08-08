import logger from 'loglevel'

const signalEvents = [
  {name: 'exit'},   // app close 
  {name: 'SIGINT'}, // CTRL + C
  {name: 'SIGURS1'}, // KILL PID
  {name: 'SIGURS2'}, // rs nodemon
  {name: 'uncaughtException'}, // other exceptions
]

// ensure to close app
function setupCloseOnExit(server) {
  async function exitHandler() {
    await server 
    .close()  // because promisify can use then
    .then(() => {
      logger.info('Server closed sucessfully')
    })
    .catch(() => {
      logger.warn('Failed to close server!')
    })
    .finally( () => {
      process.exit()
    })
  }

  signalEvents.forEach(signal => {
    process.on(signal.name, exitHandler)
  })
}

export { setupCloseOnExit }