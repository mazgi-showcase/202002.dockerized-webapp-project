import S3 from 'aws-sdk/clients/s3'

async function getConfigFromS3(): Promise<{}> {
  const accessKeyId = process.env.BFF_CONFIG_CREADENTIALS_AMAZON_S3_ACCESS_KEY
  const secretAccessKey =
    process.env.BFF_CONFIG_CREADENTIALS_AMAZON_S3_SECRET_ACCESS_KEY
  const Bucket = process.env.BFF_CONFIG_SOURCE_AMAZON_S3_BUCKET
  const Key = process.env.BFF_CONFIG_SOURCE_AMAZON_S3_PATHNAME
  if (!accessKeyId || !secretAccessKey || !Bucket || !Key) {
    return Object()
  }
  console.log(`get config from s3://${Bucket}/${Key}`)

  const s3 = new S3({
    logger: console,
    accessKeyId,
    secretAccessKey,
    maxRetries: 1,
    httpOptions: {
      timeout: 10 * 1000
    },
    params: {
      Bucket,
      Key
    }
  })
  const response = await s3
    .getObject(error => {
      if (error) {
        console.log(`cannot config from s3: `, error)
        throw error
      }
    })
    .promise()
  // TODO:
  const config = JSON.parse(response.Body!.toString())
  return config
}

export default getConfigFromS3
