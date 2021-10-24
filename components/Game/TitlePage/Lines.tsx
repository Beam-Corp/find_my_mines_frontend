import { FC } from 'react'

interface LinesProps {
    centerColor: string
    sideColor: string
}

const Lines: FC<LinesProps> = ({ centerColor, sideColor }) => {
    return (
        <svg width="170" height="938" viewBox="0 0 170 938" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="85" cy="171" r="18" fill={centerColor}/>
            <rect x="67" width="36" height="130" rx="18" fill={centerColor}/>
            <circle cx="85" cy="617" r="18" fill={centerColor}/>
            <rect x="67" y="446" width="36" height="130" rx="18" fill={centerColor}/>
            <circle cx="85" cy="391" r="18" fill={centerColor}/>
            <rect x="67" y="220" width="36" height="130" rx="18" fill={centerColor}/>
            <circle cx="85" cy="837" r="18" fill={centerColor}/>
            <rect x="67" y="666" width="36" height="130" rx="18" fill={centerColor}/>
            <circle cx="152" cy="99" r="18" transform="rotate(-180 152 99)" fill={sideColor}/>
            <rect x="170" y="270" width="36" height="130" rx="18" transform="rotate(-180 170 270)" fill={sideColor}/>
            <circle cx="18" cy="101" r="18" transform="rotate(-180 18 101)" fill={sideColor}/>
            <rect x="36" y="272" width="36" height="130" rx="18" transform="rotate(-180 36 272)" fill={sideColor}/>
            <circle cx="152" cy="545" r="18" transform="rotate(-180 152 545)" fill={sideColor}/>
            <rect x="170" y="716" width="36" height="130" rx="18" transform="rotate(-180 170 716)" fill={sideColor}/>
            <circle cx="18" cy="547" r="18" transform="rotate(-180 18 547)" fill={sideColor}/>
            <rect x="36" y="718" width="36" height="130" rx="18" transform="rotate(-180 36 718)" fill={sideColor}/>
            <circle cx="152" cy="319" r="18" transform="rotate(-180 152 319)" fill={sideColor}/>
            <rect x="170" y="490" width="36" height="130" rx="18" transform="rotate(-180 170 490)" fill={sideColor}/>
            <circle cx="18" cy="321" r="18" transform="rotate(-180 18 321)" fill={sideColor}/>
            <rect x="36" y="492" width="36" height="130" rx="18" transform="rotate(-180 36 492)" fill={sideColor}/>
            <circle cx="152" cy="765" r="18" transform="rotate(-180 152 765)" fill={sideColor}/>
            <rect x="170" y="936" width="36" height="130" rx="18" transform="rotate(-180 170 936)" fill={sideColor}/>
            <circle cx="18" cy="767" r="18" transform="rotate(-180 18 767)" fill={sideColor}/>
            <rect x="36" y="938" width="36" height="130" rx="18" transform="rotate(-180 36 938)" fill={sideColor}/>
        </svg>
    )
}

export default Lines
