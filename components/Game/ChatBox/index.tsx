import React, {
  FC,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useContext,
} from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'
import { useThemeContext } from '../../../useContext/useThemeContext'
import { GameEvents } from '../../../utils/game/game.event'
import { SocketContext } from '../../../utils/socketUtils'
import { usePlayerContext } from '../../../utils/usePlayerContext'
import { Row } from '../../Container'

const ChatBoxContainer = styled.div<{ themeColor: ThemeColorProps }>`
  position: fixed;
  width: 20vw;
  min-width: 250px;
  height: 30vh;
  min-height: 300px;
  border: 5px solid ${({ themeColor }) => themeColor.highlight};
  border-radius: 16px 16px 0 0;
  background: ${({ themeColor }) => themeColor.background};
  color: white;
  right: 20px;
  bottom: 0px;
`

const ChatInputContainer = styled(Row)`
  width: 100%;
`

const ChatInput = styled.input<{}>`
  width: 80%;
`

const SendButton = styled.button<{}>`
  width: 20%;
`
const Header = styled.div`
  position: relative;
  top: 0px;
  margin-bottom: 8px;
  height: 30px;
  color: white;
  font-size: 30px;
  padding: 0 5px 0 5px;
`

const Content = styled.div<{
  themeColor: ThemeColorProps
}>`
  max-height: 232px;
  margin: 0 4px 4px 0;
  padding: 0 5px 0 5px;
  overflow-y: scroll;
  overflow-wrap: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ themeColor }) => themeColor.highlight};
    border-radius: 999px;
  }
`

const Message = styled.div<{
  playerNumber: number
  themeColor: ThemeColorProps
}>`
  padding-top: 10px;
  width: 100%;
  overflow-wrap: break-word;
  color: ${({ playerNumber, themeColor }) =>
    playerNumber === 1 ? themeColor.primary : themeColor.secondary};
`

interface ChatBoxInterface {
  theOpponentName: string
  roomId: string
}

interface MessagePayload {
  roomId: string
  playerNumber: number
  message: string
}

const ChatBox: FC<ChatBoxInterface> = ({ theOpponentName, roomId }) => {
  const { themeColor } = useThemeContext()
  const { playerInfo } = usePlayerContext()
  const socket = useContext(SocketContext)
  const playerNumber = useMemo(() => {
    const id = playerInfo.alias || playerInfo.userId
    return parseInt(id.substring(0, 1))
  }, [playerInfo.userId, playerInfo.alias])

  const [message, setMessage] = useState<string>('')
  const [allMessages, setAllMessages] = useState<MessagePayload[]>([])

  const onSend = useCallback(() => {
    const data = {
      roomId: roomId,
      playerNumber: playerNumber,
      message: message,
    }
    //   setAllMessages([...allMessages, data])
    socket.emit(GameEvents.SEND_MESSAGE, [...allMessages, data])
    setMessage('')
  }, [message, playerNumber, roomId, socket, allMessages])

  const onUpdateFromServer = useCallback((update: MessagePayload[]) => {
    setAllMessages(update)
  }, [])

  useEffect(() => {
    socket.on(GameEvents.ON_SEND_MESSAGE, onUpdateFromServer)
    return () => {
      socket.off(GameEvents.ON_SEND_MESSAGE)
    }
  }, [onUpdateFromServer, socket])

  return (
    <ChatBoxContainer themeColor={themeColor}>
      <Header>CHAT BOX</Header>
      <Content themeColor={themeColor}>
        {!!allMessages.length &&
          allMessages.map((e, index) => {
            return (
              <Message
                key={`${index}-e.id-e.message`}
                playerNumber={e.playerNumber}
                themeColor={themeColor}
              >
                {playerNumber === e.playerNumber
                  ? 'Me: '
                  : `${theOpponentName}: `}
                {e.message}
              </Message>
            )
          })}
      </Content>
      <ChatInputContainer>
        <ChatInput
          name={'message'}
          placeholder="type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={onSend}>Send</SendButton>
      </ChatInputContainer>
    </ChatBoxContainer>
  )
}

export default ChatBox
