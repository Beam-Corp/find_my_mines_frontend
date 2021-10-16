import { FC } from 'react'

import { Splash, Top, Border, Container, Title, Logo, Bottom } from './SplashScreenStyling'

interface SplashScreenProps {
  show: boolean
}

const SplashScreen: FC<SplashScreenProps> = ({ show }) => {
  return (
    <Splash show={show}>
      <Border>
        <Top />
        <Container>
          <Title>FIND MY MINES</Title>
          <Logo alt="logo" src="/game/bomb.svg" show={show} />
        </Container>
        <Bottom />
      </Border>
    </Splash>
  )
}

export default SplashScreen
