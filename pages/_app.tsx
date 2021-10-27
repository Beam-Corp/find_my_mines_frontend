import React, { useState } from 'react'

import type { AppProps } from 'next/app'

import { Container } from '../components/Container'
import Controller from '../components/Controller'
import '../styles/globals.css'
import ThemeProvider from '../useContext/useThemeContext'
import { SocketContext, socketInstance } from '../utils/socketUtils'
import { PlayerProvider } from '../utils/usePlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={socketInstance}>
      <PlayerProvider>
        <ThemeProvider>
          <Container>
            <Controller>
              <Component {...pageProps} />
            </Controller>
          </Container>
        </ThemeProvider>
      </PlayerProvider>
    </SocketContext.Provider>
  )
}
export default MyApp
