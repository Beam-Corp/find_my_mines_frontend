import { FC } from 'react'

import { Overlay, Container, Window, WinLose } from './WinLoseScreenStyling'

interface WinLoseScreenProps {
    show: boolean
    win: boolean
}

const WinLoseScreen: FC<WinLoseScreenProps> = ({ show, win }) => {
    return (
        <>
            <Overlay show={show} />
            <Container show={show}>
                <Window show={show}>
                    <WinLose>{win ? 'WIN' : 'LOSE'}</WinLose>
                </Window>
            </Container>
        </>
    )
}

export default WinLoseScreen
