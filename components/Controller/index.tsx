import React, { FC, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import styled from 'styled-components'

import { ThemeColorProps } from '../../dto/themeColor.dto'
import { useThemeContext } from '../../useContext/useThemeContext'
import { Row } from '../Container'
import IconToggleButton from '../IconToggleButton'
import ThemeColorButton from './ThemeColorButton'

interface ControllerProps {}

const Player = dynamic(
  () => {
    return import('./player')
  },
  { ssr: false }
)

const ControllerContainer = styled(Row)<{
  hide: boolean
  themeColor: ThemeColorProps
}>`
  position: absolute;

  display: flex;
  justify-content: space-around;

  bottom: 50px;
  left: ${({ hide }) => (!hide ? '0px' : '-248px')};
  padding: 16px 8px 16px 16px;

  width: 320px;

  background: ${({ themeColor }) => themeColor.background};
  border: ${({ themeColor }) => themeColor.secondary} 4px solid;
  border-left: 0px;
  border-radius: 0px 16px 16px 0px;
  backdrop-filter: blur(5px);

  transition: left 500ms;
`

const Controller: FC<ControllerProps> = ({ children }) => {
  const { themeColor } = useThemeContext()

  const [hide, setHide] = useState<boolean>(false)

  return (
    <>
      {children}
      <ControllerContainer themeColor={themeColor} hide={hide}>
        <ThemeColorButton />
        <Player />
        <IconToggleButton
          imagePaths={['/arrowLeft.svg', '/arrowRight.svg']}
          handleToggle={() => setHide(!hide)}
        />
      </ControllerContainer>
    </>
  )
}

export default Controller
