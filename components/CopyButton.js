import React, { useState } from 'react'
import { updateClipboard } from '../utils/utils'

const CopyButton = ({ text, data }) => {
    const [clicked, setClicked] = useState(false)

    const HandleClick = () => {
        updateClipboard(data)
        setClicked(true)
        setTimeout(() => setClicked(false), 3000)
    }

    return (
        <button onClick={() => HandleClick()}>
            {clicked && 'copied'}
            {!clicked && text}
        </button>
    )
}

export { CopyButton }
