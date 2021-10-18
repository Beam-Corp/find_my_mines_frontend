import { FC } from 'react'

import { Overlay, Container, Window, WinLose, RestartBtn, TitleBtn } from './WinLoseScreenStyling'

interface WinLoseScreenProps {
    show: boolean
    win: boolean
    restartGame: () => void
    toTitle: () => void
}

const WinLoseScreen: FC<WinLoseScreenProps> = ({ show, win, restartGame, toTitle }) => {
    return (
        <>
            <Overlay show={show} />
            <Container show={show}>
                <Window show={show}>
                    <WinLose>{win ? 'WIN' : 'LOSE'}</WinLose>
                </Window>
                <RestartBtn onClick={restartGame}>Restart</RestartBtn>
                <TitleBtn onClick={toTitle}>Title</TitleBtn>
            </Container>
        </>
    )
}

export default WinLoseScreen
