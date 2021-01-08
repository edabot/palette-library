import React, { useState } from 'react'
import { updateClipboard } from '../utils/utils'
import styles from '../styles/CopyButton.module.css'

const CopyButton = ({ text, data }) => {
  const [clicked, setClicked] = useState(false)

  const HandleClick = () => {
    updateClipboard(data)
    setClicked(true)
    setTimeout(() => setClicked(false), 3000)
  }

  return (
    <button
      className={`${styles.copybutton} ${clicked ? styles.clicked : ''}`}
      onClick={() => HandleClick()}
    >
      {clicked && 'copied'}
      {!clicked && text}
    </button>
  )
}

export default CopyButton
