import react, { FC } from 'react'

import styled from 'styled-components'

import { DecoratedBox, TextContainer, Box } from '../../components/Container'
import { useThemeContext } from '../../useContext/useThemeContext'
import { RoomWrapper } from './../room/create'
import { HeadText } from './../room/create'

interface ConcurrentRoomIdProps {
  roomLists?: string[]
}

const DotlessBox = styled(Box)`
  height: 80vh;
`

// height: calc(75vh - 126px);

// const DecoratedWrapper = styled(DecoratedBox)`
//     height: 1000px !important;
//     width: 50% !important;
// `

const ConcurrentRoomId: FC<ConcurrentRoomIdProps> = ({ roomLists }) => {
  const { themeColor } = useThemeContext()
  return (
    <DotlessBox themeColor={themeColor}>
      <RoomWrapper>
        <HeadText size={6} weight={900} themeColor={themeColor}>
          Concurrent Room ID:
        </HeadText>
        <HeadText size={4} weight={800} themeColor={themeColor}>
          {roomLists?.map((roomId, index) => (
            <>
              {console.log(roomId)}
              <div key={`room-${index}`}>{roomId}</div>
            </>
          ))}
        </HeadText>
      </RoomWrapper>
    </DotlessBox>
  )
}

export default ConcurrentRoomId
