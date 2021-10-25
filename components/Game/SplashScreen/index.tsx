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
    <Splash show={show} mounted={mounted} theme={themeColor}>
      <Border theme={themeColor}>
        <Top theme={themeColor}/>
        <Container>
          <Title theme={themeColor}>FIND MY MINES</Title>
          <Logo alt="logo" src="/game/bomb.svg" show={show} />
        </Container>
        <Bottom theme={themeColor}/>
      </Border>
    </Splash>
  )
}

export default SplashScreen
