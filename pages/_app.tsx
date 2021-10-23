import type { AppProps } from 'next/app'

import { Container } from '../components/Container'
import Controller from '../components/Controller'
import '../styles/globals.css'
import ThemeProvider from '../useContext/useThemeContext'
import { useThemeContext } from '../useContext/useThemeContext'
import { SocketContext, socketInstance } from '../utils/socketUtils'

function MyApp({ Component, pageProps }: AppProps) {
  // const {themeColor} = useThemeContext()
  return (
    <SocketContext.Provider value={socketInstance}>
      <ThemeProvider>
        <Container>
          <Controller>
            <Component {...pageProps} />
          </Controller>
        </Container>
      </ThemeProvider>
    </SocketContext.Provider>
  )
}
export default MyApp
