import type { AppProps } from 'next/app'

import { Container } from '../components/Container'
import '../styles/globals.css'
import { SocketContext, socketInstance } from '../utils/socketUtils'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={socketInstance}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </SocketContext.Provider>
  )
}
export default MyApp
