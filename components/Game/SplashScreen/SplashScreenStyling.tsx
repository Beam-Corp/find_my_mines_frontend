import styled, { css, keyframes } from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`
const rotate = keyframes`
  0% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.3% { transform: matrix3d(-0.045, 0.999, 0, 0, -0.999, -0.045, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.61% { transform: matrix3d(-0.928, 0.372, 0, 0, -0.372, -0.928, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.91% { transform: matrix3d(-0.987, -0.163, 0, 0, 0.163, -0.987, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  17.22% { transform: matrix3d(-0.957, -0.289, 0, 0, 0.289, -0.957, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }    
  28.33% { transform: matrix3d(-0.998, -0.065, 0, 0, 0.065, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  39.44% { transform: matrix3d(-1, 0.02, 0, 0, -0.02, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  61.66% { transform: matrix3d(-1, -0.001, 0, 0, 0.001, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }    
  83.98% { transform: matrix3d(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { transform: matrix3d(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
`

export const Splash = styled.div<{ show: boolean, mounted: boolean, theme: ThemeColorProps }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${(props) => (props.theme.background)};
  width: 100%;
  height: 100%;
  display: ${(props) => (props.mounted ? 'initial' : 'none')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: opacity 500ms linear;
  z-index: 100;
`

export const Border = styled.div<{ theme: ThemeColorProps }>`
  position: absolute;
  top: 2%;
  left: 1%;
  bottom: 2%;
  right: 1%;
  border-style: solid;
  border-width: 2px;
  border-radius: 30px;
  border-color: ${(props) => (props.theme.highlight)};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 500ms linear;
`

export const Container = styled.div`
  text-align: center;
`

export const Top = styled.div<{ theme: ThemeColorProps }>`
  ::before {
    content: '';
    background-color: ${(props) => (props.theme.secondary)};
    width: 3vh;
    min-width: 20px;
    height: 3vh;
    min-height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 2%;
    left: 1%;
  }

  ::after {
    content: '';
    background-color: ${(props) => (props.theme.secondary)};
    width: 3vh;
    min-width: 20px;
    height: 3vh;
    min-height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 2%;
    right: 1%;
`

export const Title = styled.h1<{ theme: ThemeColorProps }>`
  margin: 0;
  color: ${(props) => (props.theme.primary)};
  font-size: 8vh;

`
export const Logo = styled.img<{ show: boolean }>`
  height: 25vh;
  width: auto;
  min-height: 75px;
  ${(props) => (props.show ? css`animation: ${rotate} 2000ms linear 500ms 20 both;` : '')}
`

export const Bottom = styled.div<{ theme: ThemeColorProps }>`
  ::before {
    content: '';
    background-color: ${(props) => (props.theme.secondary)};
    width: 3vh;
    min-width: 20px;
    height: 3vh;
    min-height: 20px;
    border-radius: 50%;
    position: absolute;
    bottom: 2%;
    left: 1%;
  }

  ::after {
    content: '';
    background-color: ${(props) => (props.theme.secondary)};
    width: 3vh;
    min-width: 20px;
    height: 3vh;
    min-height: 20px;
    border-radius: 50%;
    position: absolute;
    bottom: 2%;
    right: 1%;
  }
`
