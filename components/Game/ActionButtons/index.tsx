import React, { FC } from 'react'

import styled from 'styled-components'

import { useThemeContext } from '../../../useContext/useThemeContext'
import { Button } from '../../Button'

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
  // setGameResult: (result: "WIN" | "LOSE" | "DRAW") => void
  onSurrender: () => void
}

const ActionButtons: FC<ActionButton> = ({ onSurrender }) => {
  const surrenderModal = () => {}

  const handleClick = () => {
    // setGameResult("LOSE")
    onSurrender()
  }

  return (
    <>
      <SurrenderButton onClick={handleClick}>Surrender</SurrenderButton>
    </>
  )
}

export default ActionButtons
