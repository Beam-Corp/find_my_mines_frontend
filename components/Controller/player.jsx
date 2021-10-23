import React, { useState, useEffect, useRef } from "react";
import BGSong from "../../public/audioClips/Waterworld - Map.mp3";
import MusicNote from "../../public/music.png";
import NoMusicNote from "../../public/nomusic.png";
import Image from 'next/image';
import VercelIcon from "../../public/vercel.svg";
import styles from '../../styles/Home.module.css';

const useAudio = url => {
  const [audio] = useState(new Audio(BGSong));
  const [playing, setPlaying] = useState(false);
  const [volume] = useState(audio.volume);
  const toggle = () => {
    setPlaying(!playing);
    return false;
  }

  const changeVolume = (vol) => {
    audio.volume = vol;
  }

  useEffect(() => {
      if(playing) {
        audio.play();
      } else audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
      console.log('looping');
    });
    return () => {
      audio.removeEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
        console.log('looping');
      });
    };
  }, []);

  return [playing, toggle, changeVolume];

};

var MusicIcon = MusicNote;

const getImage = playing => {
  playing ? MusicIcon = MusicNote : MusicIcon = NoMusicNote;
  return MusicIcon;
}


const Player = ({ url }) => {
  const [playing, toggle, changeVolume] = useAudio(url);

  const[volume, setVolume] = useState(1);

  const finalVolume = volume**2;


  return (
    <div className = {styles.slidecontainer}>
      {/* Music: <button onClick={toggle}>{playing ? "On" : "Off"}</button> */}
      <span className = {styles.img}>
      <Image onClick={toggle} src= {getImage(playing)} width={34} height={34} alt="Music"/>
      </span>
      <input className = {styles.slider}
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
            changeVolume(finalVolume.toFixed(3));
          }}
      />

    </div>
    
  );
};

export default Player;

