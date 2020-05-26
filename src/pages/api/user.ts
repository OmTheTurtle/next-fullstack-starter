import { PrismaClient } from '@prisma/client'
import nextConnect from 'next-connect'

import auth from '../../middleware/auth'

const handler = nextConnect()
const db = new PrismaClient()

handler
  .use(auth)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    if (req.user) {
      const { id, name, email } = req.user
      res.json({ user: { id, name, email } })
    } else {
      res.json(null)
    }
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .delete(async (req, res) => {
    await db.user.delete({ where: { id: req.user.id } })
    req.logOut()
    res.status(204).end()
  })

export default handler
