import express, { Request, Response } from 'express'

const healthcheckRouter = express.Router()

healthcheckRouter.get('/_ah/readiness', async (req: Request, res: Response) => {
  res.status(200).send('OK')
})

healthcheckRouter.get('/_ah/liveness', async (req: Request, res: Response) => {
  res.status(200).send('OK')
})

export default healthcheckRouter
