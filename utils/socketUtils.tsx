import { Context, createContext } from 'react'

import { io, Socket } from 'socket.io-client'

export const socketInstance: Socket = io(`http://localhost:8000`)
export const SocketContext: Context<Socket> = createContext(socketInstance)
