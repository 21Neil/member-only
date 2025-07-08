import { Router } from 'express'
import { getDeleteMessage, getMessageView, postNewMessage } from '../controllers/messageController.js'

const messageRouter = new Router()

messageRouter.get('/', getMessageView)
messageRouter.post('/new', postNewMessage)
messageRouter.get('/delete/:id', getDeleteMessage)

export default messageRouter
