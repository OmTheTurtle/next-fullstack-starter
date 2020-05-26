import nextConnect from 'next-connect'
import passport from '../lib/passport'
import session from '../lib/session'

const auth = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: process.env.SESSION_SECRET, // This should be kept securely, preferably in env vars
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  // @ts-ignore
  .use(passport.initialize())
  .use(passport.session())

export default auth
