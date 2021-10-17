import styled from 'styled-components'

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

export const TextContainer = styled.div<{ size?: number }>`
  font-size: ${({ size }) => mainTheme.spacing(size || 8)};
  text-align: center;
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

