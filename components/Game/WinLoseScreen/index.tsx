import React, { FC, useMemo } from 'react'

import Link from 'next/link'

import { useThemeContext } from '../../../useContext/useThemeContext'
import {
  Overlay,
  Container,
  Window,
  WinLose,
  Button,
} from './WinLoseScreenStyling'

interface WinLoseScreenProps {
  show: boolean
  win: number | undefined
  mounted: boolean
  restartGame?: () => void
  surrenderer: number | undefined
  playerNumber: number
  playerList: string[]
  playerScore: number[]
}

const WinLoseScreen: FC<WinLoseScreenProps> = ({
  show,
  win,
  mounted,
  restartGame,
  surrenderer,
  playerNumber,
  playerList,
  playerScore,
}) => {
  const { themeColor } = useThemeContext()

  const playerIndex = useMemo(() => playerNumber - 1, [playerNumber])

  const GameResult = () => {
    if (surrenderer) {
      return (
        <WinLose theme={themeColor}>
          {surrenderer === 2
            ? 'The Opponent Has Disconnected'
            : playerNumber === surrenderer
            ? 'You Have Surrendered'
            : 'The Opponent Has Surrendered'}
        </WinLose>
      )
    }
    let gameResult
    let winner
    switch (win) {
      case 2: {
        gameResult = 'DRAW'
        winner = 'None'
        break
      }
      case 1: {
        gameResult = 'YOU WIN'
        winner = playerList[playerIndex]
        break
      }
      case 0: {
        gameResult = 'YOU LOSE'
        winner = playerList[(playerIndex + 1) % 2]
        break
      }
    }

    return (
      <WinLose theme={themeColor}>
        {gameResult}
        <br />
        Winner: {winner}
        <br />
        Score: {playerScore[playerIndex]}-{playerScore[(playerIndex + 1) % 2]}
      </WinLose>
    )
  }

  return (
    <>
      <Overlay show={show} mounted={mounted} />
      <Container show={show} mounted={mounted}>
        <Window show={show} theme={themeColor}>
          {/* <WinLose>{win === 2 ? 'DRAW' : !!win ? 'WIN' : 'LOSE'}</WinLose> */}
          <GameResult />
        </Window>
        {restartGame && (
          <Button theme={themeColor} onClick={restartGame} top={'70%'}>
            Restart
          </Button>
        )}
        <Link href="/" passHref>
          <Button theme={themeColor} top={'82%'}>
            Title
          </Button>
        </Link>
      </Container>
    </>
  )
}

export default WinLoseScreen
