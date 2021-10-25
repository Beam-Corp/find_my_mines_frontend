import React, { FC } from 'react'

import dynamic from 'next/dynamic'

import styled from 'styled-components'

import { ThemeColorProps } from '../../dto/themeColor.dto'
import { Row } from '../Container'
import ThemeColorButton from './ThemeColorButton'

interface ControllerProps {}

const Player = dynamic(
  () => {
    return import('./player')
  },
  { ssr: false }
)

const ControllerContainer = styled(Row)`
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: 30%;
`

const Controller: FC<ControllerProps> = ({ children }) => {
  return (
    <>
      {children}
      <ControllerContainer>
        <ThemeColorButton />
        <Player url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      </ControllerContainer>
    </>
  )
}

export default Controller
