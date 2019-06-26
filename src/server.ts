const isProd = process.env.NODE_ENV === 'production'
import { start } from '@google-cloud/profiler'
if (isProd) {
  start().catch()
}
import compression from 'compression'
import * as dotenv from 'dotenv'
import express, {
  Application,
  ErrorRequestHandler,
  Request,
  RequestHandler,
  Response,
} from 'express'
import log4js from 'log4js'
import morgan from 'morgan'
import { Z_DEFAULT_COMPRESSION } from 'zlib'
import healthcheckRouter from './routes/healthcheck.route'

dotenv.config()

log4js.configure({
  appenders: { out: { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'all' } },
})
const log = log4js.getLogger('server.ts')

const bootstrap = async () => {
  const app: Application = express()
  app.set('trust proxy', true)
  app.use(morgan('combined'))
  app.use(compression({ level: Z_DEFAULT_COMPRESSION }))

  /**
   * Your routes and middlewares go here
   */

  app.use('/', healthcheckRouter)

  /**
   * End of your routes and middlewares go here
   */
  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: RequestHandler,
    ) => {
      log.error(err)
    },
  )

  const port = process.env.PORT || 8080

  log.info(`isProduction: ${isProd}`)

  app.listen(port, () => {
    log.info(`Server started on port ${port}!`)
  })
}

const time = Date.now()
bootstrap()
  .then(res => {
    log.info(`Took ${Date.now() - time}ms to bootstrap the server`)
  })
  .catch(e => log.error(e))
