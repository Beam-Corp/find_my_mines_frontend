import type { AppProps } from 'next/app'

import { Container } from '../components/Container'
import '../styles/globals.css'
import ThemeProvider from '../useContext/useThemeContext'
import { SocketContext, socketInstance } from '../utils/socketUtils'
import { useThemeContext } from '../useContext/useThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  // const {themeColor} = useThemeContext()
  return (
    <SocketContext.Provider value={socketInstance}>
      <ThemeProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </SocketContext.Provider>
  )
}
export default MyApp
