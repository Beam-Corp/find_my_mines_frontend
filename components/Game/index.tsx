import React, { FC, useCallback, useEffect, useState, useRef } from 'react'

import Grid from './Grid'
import Timer from './Timer'

interface GameProps {}

const Game: FC<GameProps> = ({}) => {
  const mockGrid = [
    [0, 2, 0, 0, 0, 2],
    [0, 0, 2, 0, 0, 2],
    [0, 2, 0, 2, 0, 2],
    [2, 0, 0, 2, 0, 2],
    [0, 2, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
  ]

  const [time, setTime] = useState<number>(5)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const [playerNumber, setPlayerNumber] = useState<number>(1)

  const [playerTurn, setPlayerTurn] = useState<number>(1)

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setTime(5)
  }

  const clickGrid = useCallback(
    (row: number, column: number) => {
      resetTimer()
    },
    [resetTimer]
  )

  useEffect(() => {
    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
      timeoutRef.current = timeout

      return () => clearTimeout(timeout)
    }
  }, [time])

  return (
    <>
      <Timer time={time} isYourTurn={playerTurn === playerNumber} />
      <Grid gridData={mockGrid} clickGrid={clickGrid} />
    </>
  )
}

export default Game
