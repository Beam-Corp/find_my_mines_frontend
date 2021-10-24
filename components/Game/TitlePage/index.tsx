import Lines from './Lines'
import { useThemeContext } from '../../../useContext/useThemeContext'

const TitlePage = () => {
    const { themeColor } = useThemeContext()
    return (
        <div>
            <Lines centerColor={themeColor.primary} sideColor={themeColor.secondary}/>
        </div>
    )
}

export default TitlePage
