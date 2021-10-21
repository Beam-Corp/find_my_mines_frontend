import React, { useCallback, useContext, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import Game from '../../components/Game'
import { GameEvents } from '../../utils/game/game.event'
import { SocketContext } from '../../utils/socketUtils'

const Home: NextPage = () => {
  const socket = useContext(SocketContext)
  const { query } = useRouter()
  const [isRunning, setRunning] = useState<boolean>(false)
  const onGameStart = useCallback(() => {
    console.log('start game')
    setRunning(true)
  }, [])

  const onEmitStart = useCallback(() => {
    socket.emit(GameEvents.START, query.id)
  }, [socket, query])

  useEffect(() => {
    socket.once(GameEvents.ON_STARTED, onGameStart)
  }, [onGameStart, socket])

  return (
    <>
      {isRunning ? (
        <Game roomID={query.id as string} />
      ) : (
        <button onClick={onEmitStart}>Start Game</button>
      )}
    </>
  )
}

export default Home
