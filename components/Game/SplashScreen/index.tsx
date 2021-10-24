import { FC } from 'react'

import { Splash, Top, Border, Container, Title, Logo, Bottom } from './SplashScreenStyling'
import { useThemeContext } from '../../../useContext/useThemeContext'

interface SplashScreenProps {
  show: boolean
  mounted: boolean
}

const SplashScreen: FC<SplashScreenProps> = ({ show, mounted }) => {
  const { themeColor } = useThemeContext()
  return (
    <Splash show={show} mounted={mounted} background={themeColor.background}>
      <Border highlight={themeColor.highlight}>
        <Top secondary={themeColor.secondary}/>
        <Container>
          <Title primary={themeColor.primary}>FIND MY MINES</Title>
          <Logo alt="logo" src="/game/bomb.svg" show={show} />
        </Container>
        <Bottom secondary={themeColor.secondary}/>
      </Border>
    </Splash>
  )
}

export default SplashScreen
