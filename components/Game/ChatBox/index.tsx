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
import IconToggleButton from '../../IconToggleButton'

const ChatBoxContainer = styled.div<{
  isOpen: boolean
  themeColor: ThemeColorProps
}>`
  position: fixed;
  right: 20px;
  bottom: ${({ isOpen }) => (isOpen ? '0px' : 'calc(-30vh - 28px)')};

  width: 20vw;
  min-width: 250px;
  height: 30vh;
  min-height: 300px;

  border: 5px solid ${({ themeColor }) => themeColor.highlight};
  border-radius: 16px 16px 0 0;
  border-bottom-width: 0px;

  display: flex;
  flex-direction: column;

  background: ${({ themeColor }) => themeColor.background};
  color: white;

  transition: bottom 500ms;
`

const ChatInputContainer = styled(Row)`
  width: 100%;
  height: 12%;

  flex: 1;
`

const ChatInput = styled.input<{ themeColor: ThemeColorProps }>`
  width: 80%;
  background: ${({ themeColor }) => themeColor.background};
  border: 2px solid ${({ themeColor }) => themeColor.highlight};
  border-radius: 0px;

  color: white;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(255, 255, 255, 0.7);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.7);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(255, 255, 255, 0.7);
  }
`

const SendButton = styled.button<{ themeColor: ThemeColorProps }>`
  width: 20%;
  background: ${({ themeColor }) => themeColor.background};
  border: 2px solid ${({ themeColor }) => themeColor.highlight};
  border-radius: 0px;

  color: white;
`
const Header = styled.div<{ themeColor: ThemeColorProps }>`
  border-bottom: 2px solid ${({ themeColor }) => themeColor.highlight};
  height: 15%;
  width: 100%;
  color: white;
  font-size: 30px;
  padding: 0 8px 0 8px;

  display: flex;
  justify-content: space-between;
`

const Content = styled.div<{
  themeColor: ThemeColorProps
}>`
  height: 70%;
  max-height: 70%;
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
  padding: 5px 0px;
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

  const [isOpen, setOpen] = useState<boolean>(true)

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
    <ChatBoxContainer themeColor={themeColor} isOpen={isOpen}>
      <Header themeColor={themeColor}>
        <div>CHAT BOX</div>
        <IconToggleButton
          imagePaths={['/arrowDown.svg', '/arrowUp.svg']}
          handleToggle={() => setOpen(!isOpen)}
        />
      </Header>
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
          themeColor={themeColor}
        />
        <SendButton onClick={onSend} themeColor={themeColor}>
          Send
        </SendButton>
      </ChatInputContainer>
    </ChatBoxContainer>
  )
}

export default ChatBox
