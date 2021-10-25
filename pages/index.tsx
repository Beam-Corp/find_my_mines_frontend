import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'

import TitlePage from '../components/Game/TitlePage'
import GameStatDisplay from '../components/GameStatDisplay'

import { SocketContext } from '../utils/socketUtils'
import SplashScreen from '../components/Game/SplashScreen'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find My Mines</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameStatDisplay />
      <TitlePage />
    </>
  )
}

export default Home
