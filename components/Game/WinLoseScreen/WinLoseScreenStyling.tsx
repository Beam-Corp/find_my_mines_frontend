import styled, { css, keyframes } from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'

const enlarge = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) scale(0.3);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 1;
  }
`

const minimize = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) scale(0.3);
    opacity: 0;
  }
`

const showBtn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const Overlay = styled.div<{ show: boolean, mounted: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  display: ${(props) => (props.mounted ? 'initial' : 'none')};
  opacity: ${(props) => (props.show ? '0.5' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: opacity 300ms linear;
`

export const Container = styled.div<{ show: boolean, mounted: boolean }>`
  display: ${(props) => (props.mounted ? 'initial' : 'none')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: opacity 250ms linear;
`

export const Window = styled.div<{ show: boolean, theme: ThemeColorProps }>`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${({theme}) => theme.primary};
  background-color: ${({theme}) => theme.background};
  width: 45%;
  height: 45%;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.show ? css`animation: ${enlarge} 250ms ease-out forwards;` : css`animation: ${minimize} 250ms ease-out forwards;`)}
`

export const WinLose = styled.h1<{theme: ThemeColorProps}>`
  color: ${({theme}) => theme.highlight};
  margin: 0;
  font-size: 15vw;
  padding-bottom: 3.5vh;

  ::before {
    content: '';
    background-color: ${({theme}) => theme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    top: 6%;
    left: 4%;
  }

  ::after {
    content: '';
    background-color: ${({theme}) => theme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    bottom: 6%;
    right: 4%;
  }
`

export const Button = styled.button<{ top: string, theme: ThemeColorProps }>`
  position: fixed;
  top: ${(props) => (props.top)};
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20%;
  height: 10%;
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${({theme}) => theme.primary};
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.secondary};
  font-size: 5vh;
  animation: ${showBtn} 250ms linear forwards;

  :hover {
    border-color: ${({theme}) => theme.highlight};
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
`

 



