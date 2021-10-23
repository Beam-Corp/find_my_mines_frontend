import React, { FC } from 'react'

import Image from 'next/image'

interface MusicButtonProps {}

const MusicButton: FC<MusicButtonProps> = () => {
  return (
    <Image
      alt="music"
      src="/game/music.png"
      width={50}
      height={50}
      onClick={() => {}}
    />
  )
}

export default MusicButton
