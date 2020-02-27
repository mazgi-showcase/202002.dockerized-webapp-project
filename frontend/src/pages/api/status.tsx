import { NextApiRequest, NextApiResponse } from 'next'

const API = (req: NextApiRequest, res: NextApiResponse): void => {
  // TODO: return correct status
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end()
}

export default API
