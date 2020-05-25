import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import { Stack, Input, Button, Link } from '@chakra-ui/core'
import Navbar from '../components/Navbar'

export default function LoginPage() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
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
      setErrorMsg('Incorrect username or password. Try better!')
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <Navbar />
      <h1>Login to Example</h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Input variant='outline' placeholder='username' name='username' />
          <Input variant='outline' placeholder='password' name='password' type='password' />
        </Stack>
        <Button type='submit'>Login</Button>
        <Link href='/'>I don't have an account</Link>
      </form>
    </>
  )
}
