import React, { FC } from 'react'

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
}

const WinLoseScreen: FC<WinLoseScreenProps> = ({
  show,
  win,
  mounted,
  restartGame,
  surrenderer,
  playerNumber,
}) => {
  const { themeColor } = useThemeContext()

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
    switch (win) {
      case 2: {
        gameResult = 'DRAW'
        break
      }
      case 1: {
        gameResult = 'YOU WIN'
        break
      }
      case 0: {
        gameResult = 'YOU LOSE'
        break
      }
    }
    return <WinLose theme={themeColor}>{gameResult}</WinLose>
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
