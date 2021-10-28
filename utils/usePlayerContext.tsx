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
  role?: string
}
export interface Player extends PlayerInfo {
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
  const setPlayerInfo = useCallback((i: PlayerInfo) => {
    setPlayer((prev) => ({
      ...prev,
      userId: i.userId,
      role: i.role || 'player',
    }))
  }, [])
  const setPlayerCustom = useCallback((c: Customization) => {
    setPlayer((prev) => ({ ...prev, customization: c }))
  }, [])
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
