import React, { FC } from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../../dto/themeColor.dto'
import { Row } from '../Container'
import MusicButton from './MusicButton'
import ThemeColorButton from './ThemeColorButton'

interface ControllerProps {
  themeColor: ThemeColorProps
  previousThemeColor: ThemeColorProps
}

const ControllerContainer = styled(Row)`
  position: absolute;
  bottom: 50px;
  left: 50px;
  justify-content: space-between;
  width: 10%
`

const Controller: FC<ControllerProps> = ({
  themeColor,
  previousThemeColor,
}) => {
  return (
    <ControllerContainer>
      <MusicButton themeColor={themeColor} />
      <ThemeColorButton />
    </ControllerContainer>
  )
}

export default Controller
