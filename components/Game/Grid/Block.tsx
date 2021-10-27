import { FC, useCallback, useContext, useState } from 'react'

import Image from 'next/image'

import styled from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'
import { ThemeContext } from '../../../useContext/useThemeContext'
import { mainTheme } from '../../../utils/themeConst'

interface GameBlockProps {
  isOpen: boolean
  themeColor: ThemeColorProps
  isYourTurn: boolean
}

const GameBlock = styled.div<GameBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${mainTheme.spacing(0.4)} ${({ themeColor }) => themeColor.secondary}
    solid;
  min-height: ${mainTheme.spacing(10)};
  min-width: ${mainTheme.spacing(10)};
  color: ${({ themeColor }) => themeColor.secondary};

  background: ${({ isOpen, themeColor }) =>
    !isOpen ? themeColor.secondary : 'none'};

  :hover {
    border-color: ${({ isOpen, isYourTurn, themeColor }) =>
      !isOpen && isYourTurn ? themeColor.highlight : themeColor.secondary};
    background: ${({ isOpen, isYourTurn, themeColor }) =>
      !isOpen
        ? isYourTurn
          ? themeColor.highlight
          : themeColor.secondary
        : 'none'};
    cursor: ${({ isOpen, isYourTurn }) =>
      !isOpen && isYourTurn ? 'pointer' : 'default'};
  }
`

interface BlockProps {
  isBomb: boolean
  isOpen: boolean
  isYourTurn: boolean
  coordinate: [number, number]
  clickGrid: (row: number, column: number) => void
  themeColor: ThemeColorProps
}

const Block: FC<BlockProps> = ({
  isBomb,
  isOpen,
  isYourTurn,
  clickGrid,
  coordinate,
}) => {
  const handleClick = useCallback(() => {
    clickGrid(...coordinate)
  }, [clickGrid, coordinate])

  const { themeColor } = useContext(ThemeContext)

  return (
    <GameBlock
      onClick={() => (!isOpen && isYourTurn ? handleClick() : {})}
      isOpen={isOpen}
      isYourTurn={isYourTurn}
      themeColor={themeColor}
    >
      {isBomb && isOpen && (
        <Image alt="bomb" src="/game/bomb.svg" width={60} height={60} />
      )}
    </GameBlock>
  )
}

export default Block
