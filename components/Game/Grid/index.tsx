import React, { FC } from 'react'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import { Row } from '../../Container'
import Block from './Block'
import { ThemeColorProps } from '../../../dto/themeColor.dto'

const GridContainer = styled.div<{themeColor: ThemeColorProps}>`
  border: ${mainTheme.spacing(0.2)} ${({themeColor}) => themeColor.secondary} solid;
  min-height: ${mainTheme.spacing(12)};
  min-width: ${mainTheme.spacing(12)};
`

interface GridProps {
  gridData: number[][]
  clickGrid: (row: number, column: number) => void
  themeColor: ThemeColorProps
}

const Grid: FC<GridProps> = ({ gridData, clickGrid, themeColor }) => {
  return (
    <GridContainer themeColor={themeColor}>
      {gridData.map((gridRow, row) => (
        <Row key={`GridRow-${row}`}>
          {gridRow.map((block, column) => {
            const isBomb: boolean = block > 0
            return (
              <Block
                key={`Block-${row}-${column}`}
                coordinate={[row, column]}
                isBomb={isBomb}
                clickGrid={clickGrid}
                themeColor={themeColor}
              />
            )
          })}
        </Row>
      ))}
    </GridContainer>
  )
}

export default Grid
