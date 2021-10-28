import React, { useCallback, useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

import Axios from 'axios'

import { client } from './axiosClient'

interface Customization {
  color: string
  avatar: string
}
interface PlayerInfo {
  userId: string
  alias?: string
  role?: string
}
export interface Player extends PlayerInfo {
  customization: Customization
}
interface PlayerContextProps {
  customization: Customization
  playerInfo: PlayerInfo
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

const PlayerContext = createContext<PlayerContextProps>(
  {} as PlayerContextProps
)

export const usePlayerContext = () => useContext(PlayerContext)

export const PlayerProvider = ({ ...props }) => {
  const [player, setPlayer] = useState<Player>({} as Player)
  useEffect(() => {
    const source = Axios.CancelToken.source()
    client
      .get<Player>('/auth/verify', { cancelToken: source.token })
      .then(({ data }) => {
        setPlayer(data)
      })
      .catch((err) => {
        if (Axios.isCancel(err)) console.log('cancelled')
      })
    return () => {
      source.cancel()
    }
  }, [])
  const value = {
    customization: player.customization,
    playerInfo: { role: player.role, userId: player.userId },
    setPlayer,
  }
  return (
    <PlayerContext.Provider value={value} {...props}></PlayerContext.Provider>
  )
}
