import styled from 'styled-components'

import { mainTheme } from '../utils/themeConst'

export const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100vw;

  background-color: ${mainTheme.background};
  padding: 0;

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
