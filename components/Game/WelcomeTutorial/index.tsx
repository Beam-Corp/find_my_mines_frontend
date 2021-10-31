import { FC } from 'react'

import { useThemeContext } from '../../../useContext/useThemeContext'
import { WTOverlay, WTContainer, WTWindow, WelcomeText, Div1, Div2, Div3, HowToPlayText, RuleText, Bomb, BottomText, ReturnText } from './WelcomeTutorialStyling'

interface WelcomeTutorialProps {
    show: boolean
    mounted: boolean
    clickOverlay: () => void
}

const WelcomeTutorial: FC<WelcomeTutorialProps> = ({ show, mounted, clickOverlay }) => {
    const { themeColor } = useThemeContext()

    return (
        <>
            <WTOverlay show={show} mounted={mounted} onClick={clickOverlay} />
            <WTContainer show={show} mounted={mounted}>
                <WelcomeText theme={themeColor}>Welcome to Find My Mines</WelcomeText>
                <WTWindow show={show} theme={themeColor}>
                    <Div1>
                        <HowToPlayText theme={themeColor}>
                            HOW TO PLAY
                        </HowToPlayText>
                    </Div1>
                    <Div2>
                        <RuleText>1. Two players alternate turns selecting a grid to open</RuleText>
                        <RuleText>2. Bombs are randomly assigned to the grids</RuleText>
                        <RuleText>3. A turn end once a grid is selected OR timer runs out</RuleText>
                        <RuleText>4. Game ends once all bombs are revealed</RuleText>
                    </Div2>
                    <Div3>
                        <Bomb src='/game/bomb.svg' alt='bomb'/>
                        <BottomText left={'15px'} color={'white'}>= 1 pts</BottomText>
                        <BottomText left={'100px'} color={themeColor.highlight}>Player with the most pts wins</BottomText>
                    </Div3>
                </WTWindow>
                <ReturnText>Click here to continue</ReturnText>
            </WTContainer>
        </>
    )
}

export default WelcomeTutorial
