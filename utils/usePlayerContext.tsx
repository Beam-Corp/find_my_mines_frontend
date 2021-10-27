import React from 'react'
import { createContext, useContext, useState } from 'react'

interface Customization {
  color: string
  avatar: string
}
interface PlayerInfo {
  userId: string
  role?: string
}
interface Player extends PlayerInfo {
  customization: Customization
}
interface PlayerContextProps {
  customization: Customization
  playerInfo: PlayerInfo
  setPlayerInfo: (i: PlayerInfo) => void
  setPlayerCustom: (c: Customization) => void
}

const PlayerContext = createContext<PlayerContextProps>(
  {} as PlayerContextProps
)

export const usePlayerContext = () => useContext(PlayerContext)

export const PlayerProvider = ({ ...props }) => {
  const [player, setPlayer] = useState<Player>({} as Player)
  const setPlayerInfo = (i: PlayerInfo) => {
    setPlayer((prev) => ({
      ...prev,
      userId: i.userId,
      role: i.role || 'player',
    }))
  }
  const setPlayerCustom = (c: Customization) => {
    setPlayer((prev) => ({ ...prev, customization: c }))
  }
  const value = {
    customization: player.customization,
    playerInfo: { role: player.role, userId: player.userId },
    setPlayerInfo,
    setPlayerCustom,
  }
  return (
    <PlayerContext.Provider value={value} {...props}></PlayerContext.Provider>
  )
}
