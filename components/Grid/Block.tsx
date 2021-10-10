import { FC, useState } from 'react'

import Image from 'next/image'

import styled from 'styled-components'

import { mainTheme } from '../../utils/themeConst'

interface GameBlockProps {
  isOpen: boolean
}

const GameBlock = styled.div<GameBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${mainTheme.spacing(0.4)} ${mainTheme.secondary} solid;
  min-height: ${mainTheme.spacing(12)};
  min-width: ${mainTheme.spacing(12)};
  color: ${mainTheme.secondary};

  background: ${({ isOpen }) => (!isOpen ? mainTheme.secondary : 'none')};

  :hover {
    border-color: ${mainTheme.highlight};
    cursor: pointer;
  }
`

interface BlockProps {
  isBomb: boolean
}

const Block: FC<BlockProps> = ({ isBomb }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <GameBlock onClick={() => setOpen(true)} isOpen={isOpen}>
      {isBomb && isOpen && <Image src="/game/bomb.svg" width={80} height={80} />}
    </GameBlock>
  )
}

export default Block
