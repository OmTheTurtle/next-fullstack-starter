/// <reference types="next" />
/// <reference types="next/types/global" />

import { User } from '@prisma/client'

declare module "http" {
  interface IncomingMessage {
    session: any
    user: User
    logOut: () => void
    logIn: (user: User, err: Function) => void
  }
}
