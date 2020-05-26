import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/core'

import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import useSWR from 'swr'
import { useUser, fetcher } from '../lib/hooks'

function UserList() {
  const { data } = useSWR('/api/users', fetcher)
  const users = data?.users ?? {}
  return (
    <>
      <h2>All users</h2>
      {!!users?.length && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      )}
    </>
  )
}

const Index = () => {
  const [user] = useUser()
  return (
    <>
      <Hero />
      <Main>
        <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
        </Text>

        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon icon='check-circle' color='green.500' />
            <ChakraLink
              isExternal
              href='https://chakra-ui.com'
              flexGrow={1}
              mr={2}
            >
              Chakra UI <Icon name='external-link' mx='2px' />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon icon='check-circle' color='green.500' />
            <ChakraLink
              isExternal
              href='https://nextjs.org'
              flexGrow={1}
              mr={2}
            >
              Next.js <Icon name='external-link' mx='2px' />
            </ChakraLink>
          </ListItem>
        </List>
        {user && <p>Currently logged in as: {JSON.stringify(user)}</p>}
        <UserList />
      </Main>
    </>
  )
}

export default Index
