import React, { useState } from 'react'
import styles from '../styles/Wheel.module.css'
import { wheelStyle } from '../utils/utils'
import { HuePicker, ChromePicker } from 'react-color'

const defaultColors = [
    {
        color: '#FF0000',
        position: 0,
    },
    {
        color: '#00FF00',
        position: 50,
    },
]

const sortColors = (colors) => {
    return colors.sort((a, b) => a.position - b.position)
}

export default function Wheel() {
    const [colors, setColors] = useState(defaultColors)
    const [pickerIndex, setPickerIndex] = useState(0)

    const addColor = () => {
        let colorList = [...colors]
        colorList.push({ color: '#aaa', position: undefined })
        colorList = sortColors(colorList)
        setColors(colorList)
    }
    const updateColor = (color, position, index) => {
        let colorList = [...colors]
        colorList[index] = { color, position }
        colorList = sortColors(colorList)
        setColors(colorList)
    }

    const handleChangeComplete = (color) => {
        updateColor(color.hex, colors[pickerIndex].position, pickerIndex)
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.wheel}
                style={{ background: wheelStyle(colors) }}
            >
                <div className={styles.wheelCenter}></div>
            </div>
            <div onClick={addColor}>add color</div>

            {colors.map((color, index) => {
                return (
                    <ColorItem
                        color={color.color}
                        position={color.position}
                        index={index}
                        key={index}
                        updateColor={updateColor}
                        setPickerIndex={setPickerIndex}
                    />
                )
            })}
            <ChromePicker
                color={colors[pickerIndex].color}
                onChange={handleChangeComplete}
                disableAlpha
            />
        </div>
    )
}

const ColorItem = ({ color, position, index, updateColor, setPickerIndex }) => {
    const handlePositionChange = (e) => {
        updateColor(color, e.target.value, index)
    }

    const handleDivClick = () => {
        setPickerIndex(index)
    }

    return (
        <div onClick={handleDivClick}>
            <div
                style={{
                    backgroundColor: color,
                }}
            >
                {color}
            </div>
            position:
            <input
                value={position}
                type="number"
                min="0"
                max="100"
                onChange={handlePositionChange}
            />
        </div>
    )
}
