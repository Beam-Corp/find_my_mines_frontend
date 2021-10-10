import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { SocketContext, socketInstance } from '../utils/socketUtils'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={socketInstance}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  )
}
export default MyApp
