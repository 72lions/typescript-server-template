import axios from 'axios'
import express, { Request, Response } from 'express'

interface HelloWorldResponse {
  msg: string
}

const helloWorldRouter = express.Router()

helloWorldRouter.get('/hello', async (req: Request, res: Response) => {
  const response = await axios.get<HelloWorldResponse>(
    'http://www.mocky.io/v2/5d1466082f00005024c4f06f',
  )
  res.status(200).send(response.data.msg)
})

export default helloWorldRouter
