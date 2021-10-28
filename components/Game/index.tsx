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
import {
  GameEvents,
  GameState,
  SurrenderState,
} from '../../utils/game/game.event'
import { genearateBlankGrid } from '../../utils/game/gameUtils'
import { PlayerContext } from '../../utils/playerUtils'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import useWindowDimensions from '../../utils/useDimensions'
import { Row, Column } from '../Container'
import ActionButtons from './ActionButtons'
import Grid from './Grid'
import PlayerPanel from './PlayerPanel'
import Timer from './Timer'
import WinLoseScreen from './WinLoseScreen'

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

  const [mounted, setMounted] = useState<boolean>(false)
  const [clickNumber, setClickNumber] = useState<number>(0)

  const [gridStatus, setGridStatus] = useState<number[][]>(
    genearateBlankGrid(6)
  )

  const [gameResult, setGameResult] = useState<number[]>()

  const [surrenderer, setSurrenderer] = useState<number>()

  const [initialGrids, setInitialGrids] = useState<number[][]>(initialGrid)

  const gridNumber = gridStatus.length * gridStatus[0].length

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
    if (surrenderer || (gameResult && gameResult.length)) return
    return startTimer()
  }, [startTimer, gameResult, surrenderer])

  const clickGrid = useCallback(
    (row: number, column: number) => {
      const newPlayerScore =
        playerTurn === 1
          ? [playerScore[0] + initialGrids[row][column], playerScore[1]]
          : [playerScore[0], playerScore[1] + initialGrids[row][column]]

      let newGridStatus = gridStatus
      newGridStatus[row][column] = 1

      const newPlayerTurn = playerNumber === 1 ? 2 : 1
      const newClickNumber = clickNumber + 1

      setPlayerScore(newPlayerScore)
      setGridStatus(newGridStatus)
      setPlayerTurn(newPlayerTurn)
      setClickNumber(newClickNumber)

      socket.emit(GameEvents.SELECT_BLOCK, {
        roomId: id,
        gridState: newGridStatus,
        scoreState: newPlayerScore,
        playerTurn: newPlayerTurn,
        clickNumber: newClickNumber,
      })
    },
    [
      playerTurn,
      playerScore,
      initialGrids,
      gridStatus,
      playerNumber,
      socket,
      id,
      clickNumber,
    ]
  )

  const surrender = useCallback(() => {
    setSurrenderer(playerNumber)

    socket.emit(GameEvents.SURRENDER, {
      roomId: id,
      surrenderer: playerNumber,
    })
  }, [playerNumber, id, socket])

  const onTimeUp = useCallback(() => {
    const newPlayerTurn = playerNumber === 1 ? 2 : 1
    setPlayerTurn(newPlayerTurn)

    socket.emit(GameEvents.TIME_UP, {
      roomId: id,
      gridState: gridStatus,
      scoreState: playerScore,
      playerTurn: newPlayerTurn,
      clickNumber: clickNumber,
    })
  }, [gridStatus, id, playerNumber, playerScore, socket, clickNumber])

  const onGameEnd = useCallback(() => {
    if (playerScore[0] !== playerScore[1]) {
      setGameResult(playerScore[0] > playerScore[1] ? [1, 0] : [0, 1])
      return
    }
    setGameResult([2, 2])
  }, [playerScore])

  const gameRestart = useCallback(() => {
    setMounted(gameResult !== undefined)
    socket.emit(GameEvents.RESTART, id)
  }, [id, socket, gameResult])

  const onGameRestartFromServer = useCallback((update: GameState) => {
    setPlayerScore(update.scoreState)
    setPlayerTurn(update.playerTurn)
    setInitialGrids(update.gridState)
    setClickNumber(update.clickNumber)
    setGridStatus(genearateBlankGrid(6))
    setGameResult(undefined)
    setSurrenderer(undefined)
    setClickNumber(0)
    setMounted(false)
    console.log('on restarting game')
  }, [])

  const onUpdateFromServer = useCallback(
    (update: GameState) => {
      if (playerNumber !== playerTurn) {
        setPlayerScore(update.scoreState)
        setPlayerTurn(update.playerTurn)
        setGridStatus(update.gridState)
        setClickNumber(update.clickNumber)
      }
    },
    [playerNumber, playerTurn]
  )

  const onSurrenderFromServer = useCallback(
    (surrender: SurrenderState) => {
      if (surrender.surrenderer) {
        setSurrenderer(surrender.surrenderer)
        setMounted(true)
        console.log(`player ${playerNumber} has surrendered`)
      }
    },
    [playerNumber]
  )

  useEffect(() => {
    if (clickNumber === gridNumber) {
      onGameEnd()
      setMounted(true)
    }
  }, [clickNumber, gridNumber, onGameEnd])

  useEffect(() => {
    socket.on(GameEvents.ON_SELECTED, onUpdateFromServer)
    socket.on(GameEvents.ON_TIME_UP, onUpdateFromServer)
    socket.on(GameEvents.ON_SURRENDER, onSurrenderFromServer)
    socket.on(GameEvents.ON_RESTART, onGameRestartFromServer)
    return () => {
      socket.off(GameEvents.ON_SELECTED, onUpdateFromServer)
      socket.off(GameEvents.ON_TIME_UP, onUpdateFromServer)
      socket.off(GameEvents.ON_SURRENDER, onSurrenderFromServer)
      socket.off(GameEvents.ON_RESTART, onGameRestartFromServer)
    }
  }, [
    onUpdateFromServer,
    socket,
    onSurrenderFromServer,
    onGameRestartFromServer,
  ])

  useEffect(() => {
    if (time === 0 && playerTurn === playerNumber) {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
      if (!(gameResult && gameResult.length)) onTimeUp()
    }
  }, [time, onTimeUp, playerTurn, playerNumber, gameResult])

  useEffect(() => {
    if (playerTurn === playerNumber) {
      const timeout = resetTimer()
      return () => {
        timeout ? clearInterval(timeout) : null
      }
    } else {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
    }
  }, [playerNumber, playerTurn, resetTimer])

  useEffect(() => {
    setMounted(true)
  }, [])

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
          gridData={initialGrids}
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
      {!surrenderer && <ActionButtons onSurrender={surrender} />}
      <WinLoseScreen
        show={!!gameResult || !!surrenderer}
        win={gameResult ? gameResult[playerNumber - 1] : undefined}
        mounted={mounted}
        restartGame={gameRestart}
        toTitle={() => {}}
        playerNumber={playerNumber}
        surrenderer={surrenderer}
      />
    </GameContainer>
  )
}

export default Game
