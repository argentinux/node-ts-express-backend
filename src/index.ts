import logger, {LogLevelDesc} from 'loglevel'
import { startServer } from './start'

const port = parseInt(process.env.PORT!) || 3000
const logLevel = process.env.LOG_LEVEL || 'info'

logger.setLevel(logLevel as LogLevelDesc)

startServer(port)