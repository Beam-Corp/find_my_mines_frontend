import styled from 'styled-components'

import Lines from './Lines'
import { TextContainer } from '../../Container'

export const TitleContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10vh;
`

export const LeftLine = styled(Lines)`
    position: fixed;
    top: -17%;
    left: 5%;
    transform: rotate(180deg);

    @media (max-width: 1200px) {
        display: none;
    }
`

export const RightLine = styled(Lines)`
    position: fixed;
    bottom: -17%;
    right: 5%;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

export const TitleText = styled(TextContainer)<{ color: string }>`
    color: ${(props) => (props.color)};
    font-size: 8vh;
    font-weight: 700;
    margin-bottom: 5vh;
`

export const TitleButton = styled.button<{ color: string, hoverColor: string}>`
    width: 25%;
    height: 10%;
    border-style: solid;
    border-width: 5px;
    border-radius: 35px;
    border-color: ${(props) => (props.color)};
    color: ${(props) => (props.color)};
    background-color: transparent;
    font-size: 3vh;
    font-weight: 700;
    margin: 1vh 0px;

    :hover {
        border-color: ${(props) => (props.hoverColor)};
        color: ${(props) => (props.hoverColor)};
    }
`