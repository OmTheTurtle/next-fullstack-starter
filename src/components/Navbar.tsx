import {
  Flex,
  Link,
  Button
} from '@chakra-ui/core'
import NextLink from 'next/link'
import { useUser } from '../lib/hooks'
import { DarkModeSwitch } from './DarkModeSwitch'

export default function Navbar() {
  const [user, { mutate }] = useUser()

  async function handleLogout() {
    await fetch('/api/logout')
    mutate({ user: null })
  }

  return (
    <Flex
      w='100%'
      px={5}
      py={4}
      justifyContent='space-between'
      alignItems='center'
    >
      <Flex flexDirection='row' justifyContent='center' alignItems='center'>
        <NextLink href='/'>
          <Link>Home</Link>
        </NextLink>
        {user ? (
          <>
            <NextLink href='/profile'>
              <Link>Profile</Link>
            </NextLink>
            <Button onClick={handleLogout} mr={2}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NextLink href='/signup'>
              <Link>Sign up</Link>
            </NextLink>
            <NextLink href='/login'>
              <Link>Login</Link>
            </NextLink>
          </>
        )}
      </Flex>
      <DarkModeSwitch />
    </Flex>
  )
}
