import styled, { css, keyframes } from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'
import { enlarge, minimize } from '../WinLoseScreen/WinLoseScreenStyling'

const blink = keyframes`
    0% {
        opacity: 0.1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0.1;
    }
`

export const WTOverlay = styled.div<{ show: boolean; mounted: boolean }>`
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  display: ${(props) => (props.mounted ? 'initial' : 'none')};
  opacity: ${(props) => (props.show ? '0.5' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: opacity 300ms linear;
  z-index: 1;
`

export const WTContainer = styled.div<{ show: boolean; mounted: boolean }>`
  z-index: 999;
  position: absolute;

  display: ${(props) => (props.mounted ? 'flex' : 'none')};
  flex-direction: column;

  align-items: center;

  width: 100vw;
  height: 100vh;

  opacity: ${(props) => (props.show ? '1' : '0')};
  /* pointer-events: ${(props) => (props.show ? 'auto' : 'none')}; */

  pointer-events: none;

  transition: opacity 250ms linear;
  z-index: 1;
`

export const WTWindow = styled.div<{ show: boolean; theme: ThemeColorProps }>`
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.background};

  padding: 32px;

  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.show
      ? css`
          animation: ${enlarge} 250ms ease-out forwards;
        `
      : css`
          animation: ${minimize} 250ms ease-out forwards;
        `}

  ::before {
    content: '';
    background-color: ${({ theme }) => theme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    top: 4%;
    left: 2%;
  }

  ::after {
    content: '';
    background-color: ${({ theme }) => theme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    bottom: 4%;
    right: 2%;
  }
`

export const Div1 = styled.div`
  width: 100%;
  text-align: center;
`

export const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`

export const Div3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  vertical-align: middle;
`

export const WelcomeText = styled.h2<{ theme: ThemeColorProps }>`
  /* position: fixed;
  z-index: 100;
  top: 5%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%); */
  margin: 16px 0px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.highlight};
  font-size: 80px;
`

export const HowToPlayText = styled.h2<{ theme: ThemeColorProps }>`
  color: ${({ theme }) => theme.primary};
  font-size: 48px;
  margin-top: 0;
  margin-bottom: 25px;
`

export const RuleText = styled.h3<{}>`
  color: white;
  font-size: 32px;
  margin: 10px 0;
`

export const BottomText = styled.h3<{ left: string; color: string }>`
  color: ${({ color }) => color};
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: ${({ left }) => left};
`

export const Bomb = styled.img<{}>`
  height: 100px;
`

export const ReturnText = styled.h4<{}>`
  color: #ffffff;
  font-size: 32px;

  width: 100%;
  text-align: center;
  animation: ${blink} 1600ms ease-in infinite;
  pointer-events: none;
`
