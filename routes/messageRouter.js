import { Router } from 'express'
import { getMessageView, postNewMessage } from '../controllers/messageController.js'

const messageRouter = new Router()

messageRouter.get('/', getMessageView)
messageRouter.post('/new', postNewMessage)

export default messageRouter
