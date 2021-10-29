import React, { FC } from 'react'

import styled from 'styled-components'

import { DecoratedBox, TextContainer, Box } from '../../components/Container'
import { useThemeContext } from '../../useContext/useThemeContext'
import { RoomWrapper } from './../room/create'
import { HeadText } from './../room/create'

interface ConcurrentPlayerProps {
  currentPlayerNumber?: number
}

const DotlessBox = styled(Box)`
  height: 37vh;
`

const ConcurrentPlayer: FC<ConcurrentPlayerProps> = ({
  currentPlayerNumber,
}) => {
  const { themeColor } = useThemeContext()
  return (
    <>
      <DotlessBox themeColor={themeColor}>
        <RoomWrapper>
          <HeadText size={6} weight={900} themeColor={themeColor}>
            Concurrent Players
          </HeadText>
          <HeadText size={4} weight={800} themeColor={themeColor}>
            {currentPlayerNumber !== 0 && !currentPlayerNumber
              ? 'loading...'
              : `${currentPlayerNumber} players`}
          </HeadText>
          {/* {roomLists?.map((roomId, index) => (
            <div key={`room-${index}`}>{roomId}</div>
          ))} */}
        </RoomWrapper>
      </DotlessBox>
    </>
  )
}

export default ConcurrentPlayer
