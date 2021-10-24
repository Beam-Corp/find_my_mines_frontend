import Link from 'next/link'

import { useThemeContext } from '../../../useContext/useThemeContext'
import { TitleContainer, LeftLine, RightLine, TitleText, TitleButton } from './TitlePageStyling'

const TitlePage = () => {
    const { themeColor } = useThemeContext()
    return (
        <TitleContainer>
            <LeftLine centerColor={themeColor.highlight} sideColor={themeColor.primary}/>
            <TitleText color={themeColor.primary}>Find My Mines</TitleText>
            <Link href='/room/create' passHref>
                <TitleButton color={themeColor.primary} hoverColor={themeColor.secondary}>CREATE GAME ROOM</TitleButton>
            </Link>
            <Link href='/room/join' passHref>
                <TitleButton color={themeColor.primary} hoverColor={themeColor.secondary}>JOIN GAME ROOM</TitleButton>
            </Link>
            <RightLine centerColor={themeColor.secondary} sideColor={themeColor.primary}/>
        </TitleContainer>
    )
}

export default TitlePage
