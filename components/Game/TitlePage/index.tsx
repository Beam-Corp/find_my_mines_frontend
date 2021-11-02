import Link from 'next/link'

import { useThemeContext } from '../../../useContext/useThemeContext'
import { usePlayerContext } from '../../../utils/usePlayerContext'
import {
  TitleContainer,
  LeftLine,
  RightLine,
  TitleText,
  TitleButton,
} from './TitlePageStyling'

const TitlePage = () => {
  const { themeColor } = useThemeContext()
  const { onLogout, playerInfo } = usePlayerContext()
  return (
    <TitleContainer>
      <LeftLine
        centerColor={themeColor.highlight}
        sideColor={themeColor.primary}
      />
      <TitleText color={themeColor.primary}>Find My Mines</TitleText>
      <Link href="/room/create" passHref>
        <TitleButton
          color={themeColor.primary}
          hoverColor={themeColor.secondary}
        >
          CREATE GAME ROOM
        </TitleButton>
      </Link>
      <Link href="/room/join" passHref>
        <TitleButton
          color={themeColor.primary}
          hoverColor={themeColor.secondary}
        >
          JOIN GAME ROOM
        </TitleButton>
      </Link>
      <Link href="/auth" passHref>
        <TitleButton
          color={themeColor.primary}
          hoverColor={themeColor.secondary}
        >
          LOGIN
        </TitleButton>
      </Link>
      {playerInfo.userId && (
        <TitleButton
          color={themeColor.primary}
          hoverColor={themeColor.secondary}
          onClick={onLogout}
        >
          LOGOUT
        </TitleButton>
      )}
      <RightLine
        centerColor={themeColor.secondary}
        sideColor={themeColor.primary}
      />
    </TitleContainer>
  )
}

export default TitlePage
