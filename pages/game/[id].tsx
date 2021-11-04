import React, { useCallback, useContext, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox, TextContainer } from '../../components/Container'
import Game from '../../components/Game'
import WelcomeTutorial from '../../components/Game/WelcomeTutorial'
import WinLoseScreen from '../../components/Game/WinLoseScreen'
import { InlineInput, Input, InlineInputSmall } from '../../components/Inputs'
import { ThemeColorProps } from '../../dto/themeColor.dto'
import styles from '../../styles/Home.module.css'
import { useThemeContext } from '../../useContext/useThemeContext'
import { GameEvents } from '../../utils/game/game.event'
import { useRoomManager } from '../../utils/room/useRoomManager'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import { usePlayerContext } from '../../utils/usePlayerContext'
import { HeadText } from '../room/create'

export const RoomWrapper = styled.div`
  margin: 20px 0 0 0;
  min-width: 594px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const RoomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Clickable = styled.span<{
  themeColor: ThemeColorProps
}>`
  position: relative;
  left: 3.55em;
  bottom: 1em;
  padding-inline-start: 3.5em;
  /* padding-bottom:0.2em; */
  color: #b537f2;
  font-size: 40px;
  font-weight: 900;
  transition: color 0.5s;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
              supported by Chrome, Edge, Opera and Firefox */
  &:hover {
    transition: 0.5s;
    color: ${({ themeColor }) => themeColor.secondary};
    border-color: ${({ themeColor }) => themeColor.secondary};
    cursor: pointer;
  }
  &:not(:hover) {
    transition: 0.5s;
    color: ${({ themeColor }) => themeColor.primary};
    border-color: ${({ themeColor }) => themeColor.primary};
    cursor: none;
  }
`

export interface GameStartPayload {
  gridState: number[][]
  playerTurn: number
}

const GamePage: NextPage = () => {
  const socket = useContext(SocketContext)
  const { playerInfo } = usePlayerContext()
  const theme = useThemeContext()
  const { query } = useRouter()
  const id: string = query.id as string
  const [isRunning, setRunning] = useState<boolean>(false)
  const [initialGrid, setInitialGrid] = useState<number[][]>([])
  const [initialTurn, setInitialTurn] = useState<number>(0)

  const [initialTimer, setInitialTimer] = useState<number>(10)
  const [bombNumber, setBombNumberTemp] = useState<number>(11)
  const [gridSize, setGridSize] = useState<number>(6)

  const [openTutorial, setOpenTutorial] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const { players, isOpponentLeft } = useRoomManager(
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
    socket.emit(GameEvents.START, {
      roomId: query.id,
      bombNumber: bombNumber,
      gridSize: gridSize,
    })
  }, [socket, query, bombNumber, gridSize])

  const onCloseTutorial = useCallback(() => {
    setOpenTutorial(false)
  }, [])

  useEffect(() => {
    socket.once(GameEvents.ON_STARTED, onGameStart)

    return () => {
      socket.off(GameEvents.ON_STARTED, onGameStart)
    }
  }, [onGameStart, socket])

  const increment = useCallback(
    (state: string) => {
      if (state == 'bombNumber' && bombNumber + 1 <= Math.pow(gridSize, 2))
        setBombNumberTemp((prev) => prev + 1)
      else if (state == 'gridSize' && gridSize <= 5)
        setGridSize((prev) => prev + 1)
      else if (state == 'initialTimer') setInitialTimer((prev) => prev + 1)
      else return
    },
    [bombNumber, gridSize]
  )

  const decrement = useCallback(
    (state: string) => {
      if (state == 'bombNumber' && bombNumber >= 1)
        setBombNumberTemp((prev) => prev - 1)
      else if (
        state == 'gridSize' &&
        gridSize >= 3 &&
        bombNumber <= Math.pow(gridSize - 1, 2)
      )
        setGridSize((prev) => prev - 1)
      else if (state == 'initialTimer' && initialTimer >= 2)
        setInitialTimer((prev) => prev - 1)
      else return
    },
    [bombNumber, gridSize, initialTimer]
  )
  useEffect(() => {
    setOpenTutorial(true)
    setMounted(true)
  }, [])

  return (
    <>
      {isRunning ? (
        <>
          <Game
            players={players}
            initialGrid={initialGrid}
            initialTurn={initialTurn}
            initialTimer={initialTimer}
            bombNumber={bombNumber}
            gridSize={gridSize}
          />
          <WinLoseScreen
            show={isOpponentLeft}
            mounted={isOpponentLeft}
            win={1}
            playerNumber={0}
            playerList={players}
            playerScore={[0, 0]}
            surrenderer={3}
          />
        </>
      ) : (
        <>
          <HeadText size={9} weight={900} themeColor={theme.themeColor}>
            Room {query.id}
          </HeadText>
          <DecoratedBox>
            {(playerInfo.alias ?? playerInfo.userId)[0] === '1' ? (
              <>
                <div>
                  <InlineInputSmall
                    name={'bomb'}
                    value={bombNumber}
                    onChange={(e) => setBombNumberTemp(e.target.valueAsNumber)}
                    label="BOMBS"
                  />
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => increment('bombNumber')}
                  >
                    +
                  </Clickable>
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => decrement('bombNumber')}
                  >
                    -
                  </Clickable>
                </div>
                <div>
                  <InlineInputSmall
                    name={'timer'}
                    value={initialTimer}
                    onChange={(e) => setInitialTimer(e.target.valueAsNumber)}
                    label="TIMER"
                  />
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => increment('initialTimer')}
                  >
                    +
                  </Clickable>
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => decrement('initialTimer')}
                  >
                    -
                  </Clickable>
                </div>
                <div>
                  <InlineInputSmall
                    name={'board'}
                    value={gridSize}
                    onChange={(e) => setGridSize(e.target.valueAsNumber)}
                    label="BOARD SIZE"
                  />
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => increment('gridSize')}
                  >
                    +
                  </Clickable>
                  <Clickable
                    themeColor={theme.themeColor}
                    onClick={(e) => decrement('gridSize')}
                  >
                    -
                  </Clickable>
                </div>
                <RoomButtonContainer>
                  <Button
                    themeColor={theme.themeColor}
                    size="s"
                    color={mainTheme.primary}
                    onClick={onEmitStart}
                  >
                    Start Game
                  </Button>
                </RoomButtonContainer>
              </>
            ) : (
              <HeadText size={5} weight={700} themeColor={theme.themeColor}>
                Wait for the host to start
              </HeadText>
            )}
          </DecoratedBox>
        </>
      )}
      <WelcomeTutorial
        show={openTutorial}
        mounted={mounted}
        clickOverlay={onCloseTutorial}
      />
    </>
  )
}

export default GamePage
