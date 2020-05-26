import { Button, Heading, Input, Link, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { useUser } from '../lib/hooks'

export default function SignupPage() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const body = {
      password: e.currentTarget.password.value,
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 201) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg(await res.text())
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <Heading as='h1'>Sign up to Example</Heading>
      {errorMsg && <Text color='tomato'>{errorMsg}</Text>}
      <form onSubmit={onSubmit}>
        <Stack spacing={3} shouldWrapChildren>
          <Input
            variant='outline'
            type='text'
            name='username'
            placeholder='Name'
            isRequired
          />
          <Input
            variant='outline'
            type='text'
            name='email'
            placeholder='Email'
            isRequired
          />
          <Input
            variant='outline'
            type='password'
            name='password'
            placeholder='Password'
            isRequired
          />
          <Input
            variant='outline'
            type='password'
            name='rpassword'
            placeholder='Repeat password'
            isRequired
          />
          <Button type='submit'>Sign up</Button>
          <NextLink href='/login'>
            <Link>I already have an account</Link>
          </NextLink>
        </Stack>
      </form>
    </>
  )
}
