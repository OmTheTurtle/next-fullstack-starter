import { Button, Heading, Input, Link, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { useUser } from '../lib/hooks'

export default function LoginPage() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 200) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect email or password. Try better!')
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <Heading as='h1'>Login to Example</Heading>
      {errorMsg && <Text color='tomato'>{errorMsg}</Text>}
      <form onSubmit={onSubmit}>
        <Stack spacing={3} shouldWrapChildren>
          <Input variant='outline' placeholder='email' name='email' />
          <Input
            variant='outline'
            placeholder='password'
            name='password'
            type='password'
          />
          <Button type='submit'>Login</Button>
          <NextLink href='/signup'>
            <Link>I don't have an account</Link>
          </NextLink>
        </Stack>
      </form>
    </>
  )
}
