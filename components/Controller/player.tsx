import React, { useState, useEffect, useRef, useCallback } from 'react'

import Image from 'next/image'

import BGSong from '../../public/audioClips/Waterworld - Map.mp3'
import MusicNote from '../../public/music.png'
import NoMusicNote from '../../public/nomusic.png'
import VercelIcon from '../../public/vercel.svg'
import styles from '../../styles/Home.module.css'

const useAudio = () => {
  const [audio, setAudio] = useState(new Audio(BGSong))
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState(audio.volume)
  const toggle = useCallback(() => {
    setPlaying((prev) => !prev)
  }, [])

  const changeVolume = (vol: number) => {
    setVolume(vol)
  }

  useEffect(() => {
    audio.volume = volume
  }, [audio, volume])

  useEffect(() => {
    if (playing) {
      audio.play()
    } else audio.pause()
  }, [playing, audio])

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      audio.play()
      console.log('looping')
    })
    return () => {
      audio.removeEventListener('ended', () => {
        audio.currentTime = 0
        audio.play()
        console.log('looping')
      })
    }
  }, [audio])

  return { playing, toggle, changeVolume }
}

var MusicIcon = MusicNote

const getImage = (playing: boolean) => {
  playing ? (MusicIcon = MusicNote) : (MusicIcon = NoMusicNote)
  return MusicIcon
}

const Player = () => {
  const { playing, toggle, changeVolume } = useAudio()

  const [volume, setVolume] = useState(1)

  return (
    <div className={styles.slidecontainer}>
      {/* Music: <button onClick={toggle}>{playing ? "On" : "Off"}</button> */}
      <span className={styles.img}>
        <Image
          onClick={toggle}
          src={getImage(playing)}
          width={34}
          height={34}
          alt="Music"
        />
      </span>
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={(event) => {
          setVolume(parseFloat(event.target.value))
          changeVolume(parseFloat((volume ** 2).toFixed(3)))
        }}
      />
    </div>
  )
}

export default Player
