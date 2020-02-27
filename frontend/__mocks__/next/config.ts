// This mock function is important when using Jest with Next.js.
// See https://spectrum.chat/next-js/general/how-to-setup-jest-tests-to-use-publicruntimeconfig~27f8cee1-d4a4-4b68-bb62-ea6562a77544
export default (): {} => ({
  env: {},
  publicRuntimeConfig: {},
  serverRuntimeConfig: {}
})
