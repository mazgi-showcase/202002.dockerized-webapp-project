import { ConnectionOptions } from 'typeorm'

export type ConfigType = {
  version: string
  baseVersion: string
  isDevelopment: boolean
  privateKey: string
  publicKey: string
  db: ConnectionOptions
  redis: {
    host: string
    port: number
  }
  server: {
    port: number
    origins: string[]
  }
}
