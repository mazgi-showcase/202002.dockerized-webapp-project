import Config from 'config'
import express from 'express'

describe('App', () => {
  test('should be the same port to config', async () => {
    const config = await Config.getConfig()
    const app = express()
    app.set('port', config.server.port)
    expect(app.get('port')).toBe(config.server.port)
  })
})
