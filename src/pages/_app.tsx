import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset, ColorModeProvider, Text, Flex, Box } from '@chakra-ui/core'

import theme from '../theme'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container } from '../components/Container'

const App = ({ Component }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Container>
          <Navbar />
          <Box flex='1'>
            <Component />
          </Box>
          <Footer />
        </Container>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
