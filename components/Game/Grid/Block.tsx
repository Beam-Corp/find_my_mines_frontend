import { FC, useCallback, useState } from 'react'

import Image from 'next/image'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import {ThemeColorProps} from '../../../dto/themeColor.dto'

interface GameBlockProps {
  isOpen: boolean
  themeColor: ThemeColorProps
}

const GameBlock = styled.div<GameBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${mainTheme.spacing(0.4)} ${({ themeColor }) => themeColor.secondary}
    solid;
  min-height: ${mainTheme.spacing(10)};
  min-width: ${mainTheme.spacing(10)};
  color: ${({themeColor}) => themeColor.secondary};

  background: ${({ isOpen, themeColor }) =>
    !isOpen ? themeColor.secondary : 'none'};

  :hover {
    border-color: ${({ isOpen, themeColor }) =>
      !isOpen ? themeColor.highlight : themeColor.secondary};
    background: ${({ isOpen, themeColor }) =>
      !isOpen ? themeColor.highlight : 'none'};
    cursor: ${({ isOpen }) => (!isOpen ? 'pointer' : 'default')};
  }
`

interface BlockProps {
  isBomb: boolean
  coordinate: [number, number]
  clickGrid: (row: number, column: number) => void
  themeColor: ThemeColorProps
}

const Block: FC<BlockProps> = ({ isBomb, clickGrid, coordinate, themeColor }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    setOpen(true)
    clickGrid(...coordinate)
  }, [clickGrid, coordinate])

  return (
    <GameBlock
      onClick={() => handleClick()}
      isOpen={isOpen}
      themeColor={themeColor}
    >
      {isBomb && isOpen && (
        <Image alt="bomb" src="/game/bomb.svg" width={60} height={60} />
      )}
    </GameBlock>
  )
}

export default Block
