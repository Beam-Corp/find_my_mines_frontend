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
import { generateBlankGrid } from '../../utils/game/gameUtils'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import useWindowDimensions from '../../utils/useDimensions'
import { usePlayerContext } from '../../utils/usePlayerContext'
import { Row, Column } from '../Container'
import ActionButtons from './ActionButtons'
import ChatBox from './ChatBox'
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
  initialTimer: number
  players: string[]
  gridSize: number
  bombNumber: number
}

const mockGrid = [
  [0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
]

const Game: FC<GameProps> = ({
  initialGrid,
  initialTurn,
  initialTimer,
  players,
  gridSize,
  bombNumber,
}) => {
  const socket = useContext(SocketContext)
  const { query } = useRouter()
  const id = useMemo(() => query.id, [query])

  const { width } = useWindowDimensions()
  const isMobile = useMemo<boolean>(() => {
    return width <= mainTheme.breakpoint['md']
  }, [width])

  const { playerInfo } = usePlayerContext()

  const [time, setTime] = useState<number>(initialTimer)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const playerNumber = useMemo(() => {
    const id = playerInfo.alias || playerInfo.userId
    console.log('id:', id)
    return parseInt(id.substring(0, 1))
  }, [playerInfo.userId, playerInfo.alias])

  const [playerTurn, setPlayerTurn] = useState<number>(initialTurn)

  const [playerScore, setPlayerScore] = useState<number[]>([0, 0])

  const [mounted, setMounted] = useState<boolean>(false)
  const [clickNumber, setClickNumber] = useState<number>(0)

  const [gridStatus, setGridStatus] = useState<number[][]>(
    generateBlankGrid(initialGrid.length)
  )

  const [gameResult, setGameResult] = useState<number[]>()

  const [surrenderer, setSurrenderer] = useState<number>()

  const [initialGrids, setInitialGrids] = useState<number[][]>(initialGrid)

  const gridNumber = useMemo(
    () => gridStatus.length * gridStatus.length,
    [gridStatus]
  )

  const [splash, setSplash] = useState<boolean>(true)

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

    setTime(initialTimer)
    if (surrenderer || (gameResult && gameResult.length)) return
    return startTimer()
  }, [startTimer, gameResult, surrenderer, initialTimer])

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

      console.log('grid clicked')

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

    console.log('on time up')

    socket.emit(GameEvents.TIME_UP, {
      roomId: id,
      gridState: gridStatus,
      scoreState: playerScore,
      playerTurn: newPlayerTurn,
      clickNumber: clickNumber,
    })

    setPlayerTurn(newPlayerTurn)
  }, [gridStatus, id, playerNumber, playerScore, socket, clickNumber])

  const onGameEnd = useCallback(() => {
    if (playerScore[0] !== playerScore[1]) {
      setGameResult(playerScore[0] > playerScore[1] ? [1, 0] : [0, 1])
      return
    }
    setGameResult([2, 2])
  }, [playerScore])

  const gameRestart = useCallback(
    ({ fromAdmin = false }) => {
      setMounted(gameResult !== undefined)

      let nextPlayerTurn
      if (surrenderer) nextPlayerTurn = surrenderer === 1 ? 2 : 1
      else if (fromAdmin) nextPlayerTurn = null
      else nextPlayerTurn = playerScore[0] > playerScore[1] ? 1 : 2

      socket.emit(GameEvents.RESTART, {
        roomId: id,
        bombNumber: bombNumber,
        gridSize: gridSize,
        nextPlayerTurn,
      })
    },
    [gameResult, socket, id, bombNumber, gridSize, surrenderer, playerScore]
  )

  const onGameRestartFromAdmin = useCallback(() => {
    if (playerNumber === 1) gameRestart({ fromAdmin: true })
  }, [gameRestart])

  const onGameRestartFromServer = useCallback(
    (update: GameState) => {
      setPlayerScore(update.scoreState)
      setPlayerTurn(update.playerTurn)
      setClickNumber(update.clickNumber)
      setGridStatus(generateBlankGrid(update.gridState.length))
      setInitialGrids(update.gridState)
      setGameResult(undefined)
      setSurrenderer(undefined)
      setClickNumber(0)
      setMounted(false)
      console.log('on restarting game')
    },
    [initialGrid]
  )

  const onUpdateFromServer = useCallback(
    (update: GameState) => {
      if (playerNumber !== playerTurn) {
        setPlayerScore(update.scoreState)
        setPlayerTurn(update.playerTurn)
        setGridStatus(update.gridState)
        setClickNumber(update.clickNumber)
        console.log('on update from server')

        if (playerInfo.userId && update.clickNumber === gridNumber) {
          console.log('on update stat after game ends')
          socket.emit(GameEvents.UPDATE_STATS, {
            roomId: id,
            userId: playerInfo.userId,
            scoreState: update.scoreState,
            playerNumber: playerNumber,
            surrendererNumber: 0,
          })
        }
      }
    },
    [playerNumber, playerTurn, gridNumber, playerInfo, id]
  )

  const onSurrenderFromServer = useCallback(
    (surrender: SurrenderState) => {
      if (playerInfo.userId && surrender.surrenderer) {
        socket.emit(GameEvents.UPDATE_STATS, {
          roomId: id,
          userId: playerInfo.userId,
          scoreState: playerScore,
          playerNumber: playerNumber,
          surrendererNumber: surrender.surrenderer ?? 0,
        })
      }
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
    socket.on(GameEvents.ON_ADMIN_RESTART, onGameRestartFromAdmin)
    return () => {
      socket.off(GameEvents.ON_SELECTED, onUpdateFromServer)
      socket.off(GameEvents.ON_TIME_UP, onUpdateFromServer)
      socket.off(GameEvents.ON_SURRENDER, onSurrenderFromServer)
      socket.off(GameEvents.ON_RESTART, onGameRestartFromServer)
      socket.off(GameEvents.ON_ADMIN_RESTART, onGameRestartFromAdmin)
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
      if (!(gameResult && gameResult.length)) {
        setTime(-1)
        onTimeUp()
      }
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
      <ChatBox
        theOpponentName={players[playerNumber % 2]}
        roomId={typeof id === 'string' ? id : ''}
      />
      {!surrenderer && <ActionButtons onSurrender={surrender} />}
      <WinLoseScreen
        show={!!gameResult || !!surrenderer}
        win={gameResult ? gameResult[playerNumber - 1] : undefined}
        mounted={mounted}
        restartGame={gameRestart}
        playerNumber={playerNumber}
        playerList={players}
        playerScore={playerScore}
        surrenderer={surrenderer}
      />
    </GameContainer>
  )
}

export default Game
