import passport from 'passport'
import { Strategy } from 'passport-local'
import { NextApiRequest } from 'next'
import { PrismaClient, User } from '@prisma/client'
import argon2 from 'argon2'

const db = new PrismaClient()

passport.serializeUser(function (user: User, done) {
  // serialize the username into session
  done(null, user.id)
})

passport.deserializeUser(async function (req: NextApiRequest, id: number, done: Function) {
  // deserialize the username back into user object
  const user = await db.user.findOne({ where: { id }})
  done(null, user)
})

passport.use(
  new Strategy(
    { passReqToCallback: true, usernameField: 'email', },
    async (req, email, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = await db.user.findOne({ where: { email } })
      // Security-wise, if you hashed the password earlier, you must verify it

      if (!user || !(await argon2.verify(user.password, password))) {
        done(null, null)
      } else {
        done(null, user)
      }
    }
  )
)

export default passport
