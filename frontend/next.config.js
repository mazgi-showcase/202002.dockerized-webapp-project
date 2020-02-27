/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

// See https://nextjs.org/docs/api-reference/next.config.js/introduction
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (phase, { defaultConfig }) => {
  const isDev = phase == PHASE_DEVELOPMENT_SERVER
  const devConfig = isDev
    ? {
        /* development only config options here */
        env: {
          customKey: 'my-value-dev'
        }
      }
    : {}

  const config = {
    ...defaultConfig,
    // See https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    env: {
      customKey: 'my-value'
    },
    // See https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    publicRuntimeConfig: {
      // Will be available on both server and client
      isDev
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
    },
    ...devConfig
  }
  console.log('next.config: %s', JSON.stringify(config, null, 2))
  return config
}
