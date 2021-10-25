import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
  useContext,
} from 'react'

import { useRouter } from 'next/router'

import styled from 'styled-components'

import { ThemeColorProps } from '../../dto/themeColor.dto'
import { GameEvents, GameState } from '../../utils/game/game.event'
import { PlayerContext } from '../../utils/playerUtils'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import useWindowDimensions from '../../utils/useDimensions'
import { Row, Column } from '../Container'
import Grid from './Grid'
import PlayerPanel from './PlayerPanel'
import Timer from './Timer'

const GameContainer = styled(Column)`
  width: 100%;
`

const GameRow = styled(Row)`
  justify-content: space-evenly;
`

interface GameProps {
  initialGrid: number[][]
  initialTurn: number
  players: string[]
}

const mockGrid = [
  [0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
]

const blankGrid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]

const Game: FC<GameProps> = ({ initialGrid, initialTurn, players }) => {
  const socket = useContext(SocketContext)
  const { query } = useRouter()
  const id = useMemo(() => query.id, [query])

  const { width } = useWindowDimensions()
  const isMobile = useMemo<boolean>(() => {
    return width <= mainTheme.breakpoint['md']
  }, [width])

  const { name } = useContext(PlayerContext)

  const [time, setTime] = useState<number>(5)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const playerNumber = useMemo(() => parseInt(name.substring(0, 1)), [name])

  const [playerTurn, setPlayerTurn] = useState<number>(initialTurn)

  const [playerScore, setPlayerScore] = useState<number[]>([0, 0])

  const gridData = useMemo(() => initialGrid, [initialGrid])
  const [gridStatus, setGridStatus] = useState<number[][]>(blankGrid)

  const startTimer = useCallback(() => {
    const timeout = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)
    timeoutRef.current = timeout
    return timeout
  }, [])

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }

    setTime(5)
    return startTimer()
  }, [startTimer])

  const clickGrid = useCallback(
    (row: number, column: number) => {
      const newPlayerScore =
        playerTurn === 1
          ? [playerScore[0] + gridData[row][column], playerScore[1]]
          : [playerScore[0], playerScore[1] + gridData[row][column]]

      let newGridStatus = gridStatus
      newGridStatus[row][column] = 1

      const newPlayerTurn = playerNumber === 1 ? 2 : 1

      setPlayerScore(newPlayerScore)
      setGridStatus(newGridStatus)
      setPlayerTurn(newPlayerTurn)

      socket.emit(GameEvents.SELECT_BLOCK, {
        roomId: id,
        gridState: newGridStatus,
        scoreState: newPlayerScore,
        playerTurn: newPlayerTurn,
      })
    },
    [playerTurn, playerScore, gridData, gridStatus, playerNumber, socket, id]
  )

  const onTimeUp = useCallback(() => {
    const newPlayerTurn = playerNumber === 1 ? 2 : 1
    setPlayerTurn((prev) => (prev === 1 ? 2 : 1))

    socket.emit(GameEvents.TIME_UP, {
      roomId: id,
      gridState: gridStatus,
      scoreState: playerScore,
      playerTurn: newPlayerTurn,
    })
  }, [gridStatus, id, playerNumber, playerScore, socket])

  const onUpdateFromServer = useCallback(
    (update: GameState) => {
      if (playerNumber === update.playerTurn) {
        setPlayerScore(update.scoreState)
        setPlayerTurn(update.playerTurn)
        setGridStatus(update.gridState)
      }
    },
    [playerNumber]
  )

  useEffect(() => {
    if (time === 0 && playerTurn === playerNumber) {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
      onTimeUp()
    }
  }, [time, onTimeUp, playerTurn, playerNumber])

  useEffect(() => {
    if (playerTurn === playerNumber) {
      const timeout = resetTimer()
      return () => {
        clearInterval(timeout)
      }
    } else {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
    }
  }, [playerNumber, playerTurn, resetTimer])

  useEffect(() => {
    socket.on(GameEvents.ON_SELECTED, onUpdateFromServer)
    socket.on(GameEvents.ON_TIME_UP, onUpdateFromServer)
    return () => {
      socket.off(GameEvents.ON_SELECTED, onUpdateFromServer)
      socket.off(GameEvents.ON_TIME_UP, onUpdateFromServer)
    }
  }, [onUpdateFromServer, socket])

  return (
    <GameContainer>
      <Timer time={time} isYourTurn={playerTurn === playerNumber} />
      <GameRow>
        {isMobile ? (
          <div>
            <PlayerPanel
              name={players[0]}
              id={1}
              score={playerScore[0]}
              isYourTurn={playerTurn === 1}
            />
            <PlayerPanel
              name={players[1]}
              id={2}
              score={playerScore[1]}
              isYourTurn={playerTurn === 2}
            />
          </div>
        ) : (
          <PlayerPanel
            name={players[0]}
            id={1}
            score={playerScore[0]}
            isYourTurn={playerTurn === 1}
          />
        )}
        <Grid
          gridData={gridData}
          clickGrid={clickGrid}
          gridStatus={gridStatus}
          isYourTurn={playerTurn === playerNumber}
        />
        {!isMobile && (
          <PlayerPanel
            name={players[1]}
            id={2}
            score={playerScore[1]}
            isYourTurn={playerTurn === 2}
          />
        )}
      </GameRow>
    </GameContainer>
  )
}

export default Game
