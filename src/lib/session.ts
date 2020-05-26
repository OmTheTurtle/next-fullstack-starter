import Iron from '@hapi/iron'
import { parse, serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function session({ name, secret, cookie: cookieOpts }) {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const cookie = req.headers?.cookie ? parse(req.headers.cookie) : null
    let unsealed: object
    if (cookie?.[name]) {
      try {
        // the cookie needs to be unsealed using the password `secret`
        unsealed = await Iron.unseal(cookie[name], secret, Iron.defaults)
      } catch (e) {
        // To cookie is invalid, do nothing
      }
    }

    // Initialize the session
    req.session = unsealed || {}

    // We are proxying res.end to commit the session cookie
    const oldEnd = res.end
    res.end = async function resEndProxy(...args: any[]) {
      if (res.finished || res.writableEnded || res.headersSent) return
      // sealing the cookie to be sent to client
      const sealed = await Iron.seal(req.session, secret, Iron.defaults)
      res.setHeader('Set-Cookie', serialize(name, sealed, cookieOpts))
      oldEnd.apply(this, args)
    }

    next()
  }
}
