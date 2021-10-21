import React, { useCallback, useContext, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import Game from '../../components/Game'
import { GameEvents } from '../../utils/game/game.event'
import { PlayerContext } from '../../utils/playerUtils'
import { useRoomManager } from '../../utils/room/useRoomManager'
import { SocketContext } from '../../utils/socketUtils'

const Home: NextPage = () => {
  const socket = useContext(SocketContext)
  const { name } = useContext(PlayerContext)
  const { query } = useRouter()
  const id: string = query.id as string
  const [isRunning, setRunning] = useState<boolean>(false)

  const { players } = useRoomManager(name, id, socket)

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
        <Game players={players} />
      ) : (
        <button onClick={onEmitStart}>Start Game</button>
      )}
    </>
  )
}

export default Home
