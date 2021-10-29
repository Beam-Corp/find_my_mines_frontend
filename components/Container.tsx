import styled, { useTheme } from 'styled-components'

import { ThemeColorProps } from '../dto/themeColor.dto'
import { ThemeContext, useThemeContext } from '../useContext/useThemeContext'
import { mainTheme } from '../utils/themeConst'

export const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100vw;

  padding: 0;
  background-color: ${mainTheme.background};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Box = styled.div<{themeColor: ThemeColorProps}>`
  padding: 27px 21px;
  border: 5px solid ${({themeColor}) => themeColor.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background-color: transparent;
`
export const Dot = styled.div<{themeColor: ThemeColorProps}>`
  height: 36px;
  width: 36px;
  background-color: ${({themeColor}) => themeColor.secondary};
  border-radius: 50%;
`
export const BoxWrapper = styled.div`
  margin: 20px 0 0 0;
  min-width: 594px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const DecoratedBox: React.FunctionComponent = ({ children }) => {
  const {themeColor} = useThemeContext()
  return (
    <Box themeColor={themeColor}>
      <div style={{ width: '100%', display: 'flex' }}>
        <Dot themeColor={themeColor}/>
      </div>
      <BoxWrapper>{children}</BoxWrapper>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Dot themeColor={themeColor} />
      </div>
    </Box>
  )
}

export const TextContainer = styled.div<{
  size?: number
  weight?: number
}>`
  font-size: ${({ size }) => mainTheme.spacing(size || 8)};
  text-align: center;
  font-weight: ${({ weight }) => weight};
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

// background-color: ${({themeColor}) => themeColor.background};
// background-color: ${mainTheme.background};
