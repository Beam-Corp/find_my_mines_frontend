import React, { useCallback, useContext, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import Game from '../../components/Game'
import { GameEvents } from '../../utils/game/game.event'
import { useRoomManager } from '../../utils/room/useRoomManager'
import { SocketContext } from '../../utils/socketUtils'
import { usePlayerContext } from '../../utils/usePlayerContext'

export interface GameStartPayload {
  gridState: number[][]
  playerTurn: number
}

const GamePage: NextPage = () => {
  const socket = useContext(SocketContext)
  const { playerInfo } = usePlayerContext()
  const { query } = useRouter()
  const id: string = query.id as string
  const [isRunning, setRunning] = useState<boolean>(false)
  const [initialGrid, setInitialGrid] = useState<number[][]>([])
  const [initialTurn, setInitialTurn] = useState<number>(0)
  const { players } = useRoomManager(
    playerInfo.alias ?? playerInfo.userId,
    id,
    socket
  )

  const onGameStart = useCallback((payload: GameStartPayload) => {
    console.log('start game')

    setInitialGrid(payload.gridState)
    setInitialTurn(payload.playerTurn)
    setRunning(true)
  }, [])

  const onEmitStart = useCallback(() => {
    socket.emit(GameEvents.START, query.id)
  }, [socket, query])

  useEffect(() => {
    socket.once(GameEvents.ON_STARTED, onGameStart)

    return () => {
      socket.off(GameEvents.ON_STARTED, onGameStart)
    }
  }, [onGameStart, socket])
  return (
    <>
      {isRunning ? (
        <Game
          players={players}
          initialGrid={initialGrid}
          initialTurn={initialTurn}
        />
      ) : (
        <button onClick={onEmitStart}>Start Game</button>
      )}
    </>
  )
}

export default GamePage
