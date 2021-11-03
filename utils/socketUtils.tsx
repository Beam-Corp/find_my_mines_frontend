import { Context, createContext } from 'react'

import getConfig from 'next/config'

import { io, Socket } from 'socket.io-client'

const { publicRuntimeConfig } = getConfig()

export const socketInstance: Socket = io(publicRuntimeConfig.apiUrl)
export const SocketContext: Context<Socket> = createContext(socketInstance)
