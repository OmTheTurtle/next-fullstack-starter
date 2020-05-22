import { Flex, Heading } from '@chakra-ui/core'

type HeroProps = {
  title?: string
}

export const Hero: React.FC<HeroProps> = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading fontSize="10vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'with-chakra-ui',
}
