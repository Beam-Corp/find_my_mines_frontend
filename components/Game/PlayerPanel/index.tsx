import { FC } from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'
import { useThemeContext } from '../../../useContext/useThemeContext'
import { mainTheme } from '../../../utils/themeConst'
import { Column, TextContainer } from '../../Container'

interface PanelTextProps {
  playerID: number
  isYourTurn?: boolean
}

interface PlayerPanelProps {
  name: string
  id: number
  score: number
  isYourTurn: boolean
}

const PanelContainer = styled(Column)``

const PanelText = styled(TextContainer)<
  PanelTextProps & { size?: number; themeColor: ThemeColorProps }
>`
  color: ${({ playerID, themeColor }) =>
    playerID === 1 ? themeColor.primary : themeColor.secondary};
  font-size: ${({ size }) => mainTheme.spacing(size || 6)};
  line-height: 90px;
  font-weight: 900;

  border: ${({ playerID, isYourTurn, themeColor }) => {
      if (!isYourTurn) return themeColor.background
      if (playerID === 1) return themeColor.primary
      else return themeColor.secondary
    }}
    ${mainTheme.spacing(1)} solid;

  padding: 0px ${mainTheme.spacing(2)};
  border-radius: ${mainTheme.spacing(4)};
`

const PlayerPanel: FC<PlayerPanelProps> = ({
  name,
  id,
  score,
  isYourTurn,
}) => {
  const {themeColor} = useThemeContext()
  return (
    <PanelContainer>
      <PanelText isYourTurn={isYourTurn} playerID={id} themeColor={themeColor}>
        {name}
      </PanelText>
      <PanelText playerID={id} size={12} themeColor={themeColor}>
        {score}
      </PanelText>
    </PanelContainer>
  )
}

export default PlayerPanel
