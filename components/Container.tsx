import styled from 'styled-components'

import { mainTheme } from '../utils/themeConst'

export const Container = styled.div`
  background-color: ${mainTheme.background};
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100vw;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
