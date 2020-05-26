import nextConnect from 'next-connect'
import { PrismaClient, User } from '@prisma/client'
import argon2 from 'argon2'
import auth from '../../middleware/auth'

const db = new PrismaClient()

const handler = nextConnect()

handler
  .get(async (req, res) => {
    // For demo purpose only. You will never have an endpoint which returns all users.
    // Remove this in production
    res.json({ users: await db.user.findMany() })
  })
  .use(auth)
  .post(async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
      return res.status(400).send('Missing fields')
    }
    // Security-wise, you must hash the password before saving it
    const hashedPass = await argon2.hash(password);
    const user = { name, password: hashedPass, email }
    let createdUser: User
    try {
      createdUser = await db.user.create({
        data: { ...user }
      })
    } catch (err) {
      console.error(err)
    }
    req.logIn(createdUser, (err) => {
      if (err) throw err
      // Log the signed up user in
      res.status(201).json({
        user,
      })
    })
  })

export default handler
