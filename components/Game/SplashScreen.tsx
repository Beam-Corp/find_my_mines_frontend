import { FC } from 'react'

import styles from '../../styles/SplashScreen.module.css'

interface SplashScreenProps {
  shown: boolean
}

const SplashScreen: FC<SplashScreenProps> = ({ shown }) => {
  return (
    <div className={shown ? styles.overlay : styles.noOverlay}>
      <div className={styles.top} />
      <div className={styles.border}>
        <div className={styles.container}>
          <h1 className={styles.title}>FIND MY MINE</h1>
          <img className={styles.logo} src="game/bomb.svg" alt="Logo" />
        </div>
      </div>
      <div className={styles.bottom} />
    </div>
  )
}

export default SplashScreen
