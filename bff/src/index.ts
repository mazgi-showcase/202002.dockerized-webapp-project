import Config from 'config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

const start = async (): Promise<void> => {
  const config = await Config.getConfig()

  const app = express()
  app.set('port', config.server.port)
  // CORS
  app.use(
    cors({
      origin: config.server.origins,
      credentials: !config.server.origins.includes('*')
    })
  )
  // Parse cookie for authentication
  app.use(cookieParser())

  app.listen(app.get('port'), () => {
    console.log(
      `⚡ App is running at :%d in %s mode`,
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop' + '\n')
  })
}
start()
