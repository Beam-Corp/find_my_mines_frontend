import { createContext } from 'react'

type PlayerContextProps = {
  name: string
  setName: (newName: string) => void
}

export const PlayerContext = createContext<PlayerContextProps>({
  name: 'Player 0',
  setName: (newName) => {},
})
