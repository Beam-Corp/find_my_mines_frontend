import { FC } from 'react'

import { Overlay, NoOverlay, Top, Border, Container, Title, Logo, Bottom  } from './SplashScreenStyling'

interface SplashScreenProps {
  shown: boolean
}

const SplashScreen: FC<SplashScreenProps> = ({ shown }) => {
  const Splash = shown ? Overlay : NoOverlay

  return (
    <Splash>
      <Top />
      <Border>
        <Container>
          <Title>FIND MY MINE</Title>
          <Logo alt="logo" src="/game/bomb.svg" />
        </Container>
      </Border>
      <Bottom />
    </Splash>
  )
}

export default SplashScreen
