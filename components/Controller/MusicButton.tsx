import React, {FC} from 'react'
import Image from 'next/image'
import { ThemeColorProps } from '../../dto/themeColor.dto'

interface MusicButtonProps {
    themeColor: ThemeColorProps
}

const MusicButton: FC<MusicButtonProps> = ({themeColor}) => {
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