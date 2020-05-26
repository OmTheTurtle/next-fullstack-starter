import { Button } from '@chakra-ui/core'
import Router from 'next/router'
import { useEffect } from 'react'

import { useUser } from '../lib/hooks'

export default function ProfilePage() {
  const [user, { loading, mutate }] = useUser()

  async function handleDeleteProfile() {
    const res = await fetch(`/api/user`, {
      method: 'DELETE',
    })

    if (res.status === 204) {
      mutate({ user: null })
      Router.replace('/')
    }
  }

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user) Router.replace('/login')
  }, [user, loading])

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your profile: {JSON.stringify(user)}</p>
          <Button color='tomato' onClick={handleDeleteProfile}>
            Delete profile
          </Button>
        </>
      )}
    </>
  )
}
