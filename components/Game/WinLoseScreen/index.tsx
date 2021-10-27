import { FC } from 'react'

import { Overlay, Container, Window, WinLose, Button } from './WinLoseScreenStyling'

interface WinLoseScreenProps {
    show: boolean
    win: boolean
    mounted: boolean
    restartGame: () => void
    toTitle: () => void
}

const WinLoseScreen: FC<WinLoseScreenProps> = ({ show, win, mounted, restartGame, toTitle }) => {
    return (
        <>
            <Overlay show={show} mounted={mounted}/>
            <Container show={show} mounted={mounted}>
                <Window show={show}>
                    <WinLose>{win ? 'WIN' : 'LOSE'}</WinLose>
                </Window>
                <Button onClick={restartGame} top={'70%'}>Restart</Button>
                <Button onClick={toTitle} top={'82%'}>Title</Button>
            </Container>
        </>
    )
}

export default WinLoseScreen
