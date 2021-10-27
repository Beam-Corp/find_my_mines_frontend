import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react'

import styled from 'styled-components'

import { Row, Column } from '../Container'
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

interface GameProps {}

const mockGrid = [
  [0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
]

const Game: FC<GameProps> = ({}) => {
  const [time, setTime] = useState<number>(5)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const [playerNumber, setPlayerNumber] = useState<number>(1)

  const [playerTurn, setPlayerTurn] = useState<number>(1)

  const [playerScore, setPlayerScore] = useState<number[]>([0, 0])

  // const [gameOver, setGameOver] = useState<boolean>(false)
  // const [mounted, setMounted] = useState<boolean>(false)

  const startTimer = useCallback(() => {
    const timeout = setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    timeoutRef.current = timeout
    return timeout
  }, [time])

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (time === 5) startTimer()
    setTime(5)
  }, [startTimer, time])

  const clickGrid = useCallback(
    (row: number, column: number) => {
      resetTimer()

      if (playerTurn === 1) {
        setPlayerScore([playerScore[0] + mockGrid[row][column], playerScore[1]])
      } else {
        setPlayerScore([playerScore[0], playerScore[1] + mockGrid[row][column]])
      }
      setPlayerTurn(playerTurn === 1 ? 2 : 1)
    },
    [resetTimer, playerTurn, playerScore]
  )

  useEffect(() => {
    if (time > 0) {
      const timeout = startTimer()
      return () => clearTimeout(timeout)
    } else {
      setPlayerTurn(playerTurn === 1 ? 2 : 1)
      resetTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  // useEffect(() => {
  //   setMounted(true)
  //   setTimeout(() => {
  //     setGameOver(true)
  //   }, 2000)
  //   setTimeout(() => {
  //     setGameOver(false)
  //   }, 6000)
  // }, [])

  return (
    <GameContainer>
      {/* <WinLoseScreen show={gameOver} win={true} mounted={mounted} restartGame={() => {}} toTitle={() => {}}/> */}
      <Timer time={time} isYourTurn={playerTurn === playerNumber} />
      <GameRow>
        <PlayerPanel
          name={'PLAYER 1'}
          id={1}
          score={playerScore[0]}
          isYourTurn={playerTurn === 1}
        />
        <Grid gridData={mockGrid} clickGrid={clickGrid} />
        <PlayerPanel
          name={'PLAYER 2'}
          id={2}
          score={playerScore[1]}
          isYourTurn={playerTurn === 2}
        />
      </GameRow>
    </GameContainer>
  )
}

export default Game
