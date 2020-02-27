import * as fs from 'fs'
import { Storage } from '@google-cloud/storage'

async function getConfigFromGCS(): Promise<{}> {
  const rawCredentials =
    process.env.BFF_CONFIG_CREADENTIALS_GOOGLE_CLOUD_STORAGE
  const bucket = process.env.BFF_CONFIG_SOURCE_GOOGLE_CLOUD_STORAGE_BUCKET
  const pathname = process.env.BFF_CONFIG_SOURCE_GOOGLE_CLOUD_STORAGE_PATHNAME
  if (!rawCredentials || !bucket || !pathname) {
    return Object()
  }
  console.log(`get config from gs://${bucket}/${pathname}`)

  const credentials = JSON.parse(rawCredentials)
  const storage = new Storage({ credentials })
  const destination = `${process.cwd()}/tmp/config.gcs.json`
  await storage
    .bucket(bucket)
    .file(`/${pathname}`)
    .download({ destination })

  const rawConfig = fs.readFileSync(destination, 'utf8')
  const config = JSON.parse(rawConfig)
  return config
}

export default getConfigFromGCS
