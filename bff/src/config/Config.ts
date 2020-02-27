import * as fs from 'fs'
import { ConfigType } from './ConfigType'
import getConfigFromGCS from './getConfigFromGCS'
import getConfigFromS3 from './getConfigFromS3'
import getConfigFromURI from './getConfigFromURI'

/**
 * Global configuration object.
 *
 * Initialized when only process startup.
 * The configurations are based on `default.json` and that override by other data sources you defined via environment variables.
 */
class Config {
  private static config: ConfigType | null = null
  private static async loadConfig(): Promise<ConfigType> {
    const isDevelopment = 'development' == process.env.NODE_ENV
    let privateKey = process.env.BFF_PRIVATE_KEY_PEM_STRING
    let publicKey = process.env.BFF_PUBLIC_KEY_PEM_STRING

    // load default config from the file.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let defaultConfig = require('./default.json')

    if (isDevelopment) {
      // load development config and keypair from the files that mounted by docker-compose.
      privateKey =
        privateKey || fs.readFileSync('/data/config/bff/key.pem', 'utf8')
      publicKey =
        publicKey || fs.readFileSync('/data/config/bff/pubkey.pem', 'utf8')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const devConfig = require('/data/config/bff/config.json')
      defaultConfig = { ...defaultConfig, ...devConfig }
    }

    const [configFromURI, configFromS3, configFromGCS] = await Promise.all([
      getConfigFromURI,
      getConfigFromS3,
      getConfigFromGCS
    ])

    const configMerged = {
      isDevelopment,
      privateKey,
      publicKey,
      ...defaultConfig,
      ...configFromURI,
      ...configFromS3,
      ...configFromGCS
    }

    console.log(
      `💽 Loaded the configuration: version: %s, baseVersion: %s`,
      configMerged.version,
      configMerged.baseVersion
    )

    if (isDevelopment) {
      // for TypeORM CLI
      fs.writeFileSync(
        'ormconfig.json',
        JSON.stringify(configMerged.db, null, 2)
      )
    }

    return Object.freeze(configMerged)
  }
  static async getConfig(): Promise<ConfigType> {
    if (!this.config) {
      this.config = await this.loadConfig()
    }
    return this.config
  }
}

export default Config
