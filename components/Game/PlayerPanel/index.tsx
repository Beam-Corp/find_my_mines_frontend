import { FC } from 'react'

import styled from 'styled-components'

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

const PanelText = styled(TextContainer)<PanelTextProps & { size?: number }>`
  color: ${({ playerID }) =>
    playerID === 1 ? mainTheme.primary : mainTheme.secondary};
  font-size: ${({ size }) => mainTheme.spacing(size || 6)};
  line-height: 90px;
  font-weight: 900;

  border: ${({ playerID, isYourTurn }) => {
      if (!isYourTurn) return mainTheme.background
      if (playerID === 1) return mainTheme.primary
      else return mainTheme.secondary
    }}
    ${mainTheme.spacing(1)} solid;

  padding: 0px ${mainTheme.spacing(2)};
  border-radius: ${mainTheme.spacing(4)};
`

const PlayerPanel: FC<PlayerPanelProps> = ({ name, id, score, isYourTurn }) => {
  return (
    <PanelContainer>
      <PanelText isYourTurn={isYourTurn} playerID={id}>
        {name}
      </PanelText>
      <PanelText playerID={id} size={12}>
        {score}
      </PanelText>
    </PanelContainer>
  )
}

export default PlayerPanel
