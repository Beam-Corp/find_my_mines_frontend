import styled, { css, keyframes } from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'

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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  pointer-events: ${({ show }: { show: boolean }) => (show ? 'auto' : 'none')};
  opacity: ${({ show }: { show: boolean }) => (show ? '0.5' : '0')};
  transition: opacity 300ms linear;
`

export const Container = styled.div`
  opacity: ${({ show }: { show: boolean }) => (show ? '1' : '0')};
  transition: opacity 250ms linear;
  pointer-events: ${({ show }: { show: boolean }) => (show ? 'auto' : 'none')};
`

export const Window = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${mainTheme.primary};
  background-color: ${mainTheme.background};
  width: 45%;
  height: 45%;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ show }: { show: boolean }) => (show ? css`animation: ${enlarge} 250ms ease-out forwards;` : css`animation: ${minimize} 250ms ease-out forwards;`)}
`

export const WinLose = styled.h1`
  color: ${mainTheme.highlight};
  margin: 0;
  font-size: 15vw;
  padding-bottom: 3.5vh;

  ::before {
    content: '';
    background-color: ${mainTheme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    top: 6%;
    left: 4%;
  }

  ::after {
    content: '';
    background-color: ${mainTheme.secondary};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    bottom: 6%;
    right: 4%;
  }
`

export const RestartBtn = styled.button`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20%;
  height: 10%;
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${mainTheme.primary};
  background-color: ${mainTheme.background};
  color: ${mainTheme.secondary};
  font-size: 5vh;
  animation: ${showBtn} 250ms linear forwards;

  :hover {
    border-color: ${mainTheme.highlight};
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
`

export const TitleBtn = styled.button`
  position: fixed;
  top: 82%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20%;
  height: 10%;
  border-style: solid;
  border-width: 5px;
  border-radius: 30px;
  border-color: ${mainTheme.primary};
  background-color: ${mainTheme.background};
  color: ${mainTheme.secondary};
  font-size: 5vh;
  animation: ${showBtn} 250ms linear forwards;

  :hover {
    border-color: ${mainTheme.highlight};
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
`



