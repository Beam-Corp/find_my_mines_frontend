import React, { FC } from 'react'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import { Row } from '../../Container'
import Block from './Block'

const GridContainer = styled.div`
  border: ${mainTheme.spacing(0.2)} ${mainTheme.secondary} solid;
  min-height: ${mainTheme.spacing(12)};
  min-width: ${mainTheme.spacing(12)};
`

interface GridProps {
  gridData: number[][]
}

const Grid: FC<GridProps> = ({ gridData }) => {
  return (
    <GridContainer>
      {gridData.map((gridRow, row) => (
        <Row key={`GridRow-${row}`}>
          {gridRow.map((block, column) => {
            const isBomb: boolean = block >= 2
            return <Block key={`Block-${row}-${column}`} isBomb={isBomb} />
          })}
        </Row>
      ))}
    </GridContainer>
  )
}

export default Grid
