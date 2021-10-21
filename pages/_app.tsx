import React, { useState } from 'react'

import type { AppProps } from 'next/app'

import { Container } from '../components/Container'
import Controller from '../components/Controller'
import '../styles/globals.css'
import ThemeProvider from '../useContext/useThemeContext'
import { useThemeContext } from '../useContext/useThemeContext'
import { PlayerContext } from '../utils/playerUtils'
import { SocketContext, socketInstance } from '../utils/socketUtils'

function MyApp({ Component, pageProps }: AppProps) {
  const [name, setName] = useState<string>('')

  return (
    <SocketContext.Provider value={socketInstance}>
      <PlayerContext.Provider value={{ name, setName }}>
        <ThemeProvider>
          <Container>
            <Controller>
              <Component {...pageProps} />
            </Controller>
          </Container>
        </ThemeProvider>
      </PlayerContext.Provider>
    </SocketContext.Provider>
  )
}
export default MyApp
