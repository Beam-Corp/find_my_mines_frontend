import React, { FC } from 'react'
import styled from 'styled-components'
import { Button } from '../../Button'
import { useThemeContext } from '../../../useContext/useThemeContext'

const SurrenderButton = styled.button`
        position: absolute;
        right: 30px;
        padding: 10px 15px;
        color: gray;
        background-color: darkgray;
        border-radius: 15px;
        font-size: 20px;
        border: transparent;
        &:hover {
            transition: 0.5s;
            color: white;
        }
        &:not(:hover) {
            transition: 0.5s;
            color: gray;
          }
    `

interface ActionButton {
    setGameResult: (result: "WIN" | "LOSE" | "DRAW") => void
}

const ActionButtons:FC<ActionButton> = ({setGameResult}) => {
    const surrenderModal = () => {

    }
    
    const handleClick = () => {
        setGameResult("LOSE")
    }

    return (
        <>

        <SurrenderButton onClick={handleClick}>
            Surrender
        </SurrenderButton>
        </>
    )
}

export default ActionButtons