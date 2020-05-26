import { Flex, Link, Stack } from '@chakra-ui/core'
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
      <Stack shouldWrapChildren spacing={8} direction='row'>
        <NextLink href='/'>
          <Link>Home</Link>
        </NextLink>
        {user ? (
          <Stack shouldWrapChildren spacing={8} direction='row'>
            <NextLink href='/profile'>
              <Link>Profile</Link>
            </NextLink>
            <Link onClick={handleLogout}>Logout</Link>
          </Stack>
        ) : (
          <Stack shouldWrapChildren spacing={8} direction='row'>
            <NextLink href='/signup'>
              <Link>Sign up</Link>
            </NextLink>
            <NextLink href='/login'>
              <Link>Login</Link>
            </NextLink>
          </Stack>
        )}
      </Stack>
      <DarkModeSwitch />
    </Flex>
  )
}
