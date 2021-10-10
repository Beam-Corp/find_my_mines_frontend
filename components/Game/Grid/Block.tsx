import { FC, useState } from 'react'

import Image from 'next/image'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'

interface GameBlockProps {
  isOpen: boolean
}

const GameBlock = styled.div<GameBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${mainTheme.spacing(0.4)} ${mainTheme.secondary} solid;
  min-height: ${mainTheme.spacing(10)};
  min-width: ${mainTheme.spacing(10)};
  color: ${mainTheme.secondary};

  background: ${({ isOpen }) => (!isOpen ? mainTheme.secondary : 'none')};

  :hover {
    border-color: ${({ isOpen }) => (!isOpen ? mainTheme.highlight : mainTheme.secondary)};
    background: ${({ isOpen }) => (!isOpen ? mainTheme.highlight : 'none')};
    cursor: ${({ isOpen }) => (!isOpen ? 'pointer' : 'default')};
  }
`

interface BlockProps {
  isBomb: boolean
}

const Block: FC<BlockProps> = ({ isBomb }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <GameBlock onClick={() => setOpen(true)} isOpen={isOpen}>
      {isBomb && isOpen && <Image src="/game/bomb.svg" width={60} height={60} />}
    </GameBlock>
  )
}

export default Block
