import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
  useContext,
} from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../../dto/themeColor.dto'
import { PlayerContext } from '../../utils/playerUtils'
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
  roomID: string
}

const mockGrid = [
  [0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
]

const Game: FC<GameProps> = ({ roomID }) => {
  const { width } = useWindowDimensions()
  const isMobile = useMemo<boolean>(() => {
    return width <= mainTheme.breakpoint['md']
  }, [width])

  const { name } = useContext(PlayerContext)

  const [time, setTime] = useState<number>(5)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const [playerNumber, setPlayerNumber] = useState<number>(1)

  const [playerTurn, setPlayerTurn] = useState<number>(1)

  const [playerScore, setPlayerScore] = useState<number[]>([0, 0])

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

  return (
    <GameContainer>
      <Timer time={time} isYourTurn={playerTurn === playerNumber} />
      <GameRow>
        {isMobile ? (
          <div>
            <PlayerPanel
              name={name}
              id={1}
              score={playerScore[0]}
              isYourTurn={playerTurn === 1}
            />
            <PlayerPanel
              name={'PLAYER 2'}
              id={2}
              score={playerScore[1]}
              isYourTurn={playerTurn === 2}
            />
          </div>
        ) : (
          <PlayerPanel
            name={name}
            id={1}
            score={playerScore[0]}
            isYourTurn={playerTurn === 1}
          />
        )}
        <Grid gridData={mockGrid} clickGrid={clickGrid} />
        {!isMobile && (
          <PlayerPanel
            name={'PLAYER 2'}
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
