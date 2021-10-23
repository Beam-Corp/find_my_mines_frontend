import styled, { useTheme } from 'styled-components'

import { mainTheme } from '../utils/themeConst'
import { ThemeColorProps } from '../dto/themeColor.dto'

export const Container = styled.div<{}>`
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
export const Box = styled.div`
  padding: 27px 21px;
  border: 5px solid ${mainTheme.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background-color: transparent;
`
export const Dot = styled.div`
  height: 36px;
  width: 36px;
  background-color: ${mainTheme.secondary};
  border-radius: 50%;
`
export const DecoratedBox: React.FunctionComponent = ({ children }) => {
  const theme = useTheme()
  return (
    <Box>
      <div style={{ width: '100%', display: 'flex' }}>
        <Dot />
      </div>
      {children}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Dot />
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

