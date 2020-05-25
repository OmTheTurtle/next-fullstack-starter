/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "http" {
  interface IncomingMessage {
    session: any
    user: any
    logOut: () => void
    logIn: (user: any, err: Function) => void
  }
}
