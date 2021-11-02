import { FC, useCallback, useState } from 'react'

import Image from 'next/image'

import ArrowLeft from '/arrowLeft.svg'
import styled from 'styled-components'

const IconButtonContainer = styled.div`
  position: relative;
  width: 40px;
  cursor: pointer;
`

interface IconToggleButtonProps {
  handleToggle: () => void
  imagePaths: string[]
}

const IconToggleButton: FC<IconToggleButtonProps> = ({
  handleToggle,
  imagePaths,
}) => {
  const [iconIndex, setIconIndex] = useState<number>(0)

  const onToggle = useCallback(() => {
    setIconIndex((prev) => (prev + 1) % imagePaths.length)
    handleToggle()
  }, [handleToggle, imagePaths])

  return (
    <IconButtonContainer onClick={onToggle}>
      <Image
        alt="Find My Mines Icon Button"
        src={imagePaths[iconIndex]}
        width={40}
        height={40}
      />
    </IconButtonContainer>
  )
}

export default IconToggleButton
