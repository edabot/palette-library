import React, { useState } from 'react'
import styles from '../styles/Wheel.module.css'
import { wheelStyle } from '../utils/utils'
import { ChromePicker } from 'react-color'

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
    const [spinning, setSpinning] = useState(false)

    const addColor = () => {
        let colorList = [...colors]
        colorList.push({ color: '#aaa', position: undefined })
        colorList = sortColors(colorList)
        setColors(colorList)
    }

    const copyColor = (color, position) => {
        let colorList = [...colors]
        colorList.push({ color, position })
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

    const changeSpinning = () => {
        setSpinning(!spinning)
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.wheel}
                style={{
                    background: wheelStyle(colors),
                    animation: spinning ? '' : 'x',
                }}
            >
                <div className={styles.wheelCenter}></div>
            </div>
            <div onClick={changeSpinning} className={styles.spinButton}>
                spin
            </div>

            <div className={styles.colorArea}>
                <div className={styles.colorItemList}>
                    {colors.map((color, index) => {
                        return (
                            <ColorItem
                                color={color.color}
                                position={color.position}
                                index={index}
                                pickerIndex={pickerIndex}
                                key={index}
                                updateColor={updateColor}
                                setPickerIndex={setPickerIndex}
                                copyColor={copyColor}
                            />
                        )
                    })}
                    <div onClick={addColor} className={styles.addColor}>
                        + add color
                    </div>
                </div>
                <div>
                    <ChromePicker
                        color={colors[pickerIndex].color}
                        onChange={handleChangeComplete}
                        disableAlpha
                    />
                </div>
            </div>
        </div>
    )
}

const ColorItem = ({
    color,
    position,
    index,
    pickerIndex,
    copyColor,
    updateColor,
    setPickerIndex,
}) => {
    const handlePositionChange = (e) => {
        updateColor(color, e.target.value, index)
    }

    const handleDivClick = () => {
        setPickerIndex(index)
    }

    const handleCopyColor = () => {
        copyColor(color, position)
    }

    const style = {}

    if (index === pickerIndex) {
        style['border'] = `2px solid #666`
    }

    return (
        <div
            onClick={handleDivClick}
            className={styles.colorItem}
            style={style}
        >
            <div
                className={styles.colorBox}
                style={{
                    backgroundColor: color,
                }}
            ></div>
            <div className={styles.colorHex}>{color}</div>
            <div className={styles.colorInput}>
                <span>position:</span>
                <input
                    value={position}
                    type="number"
                    min="0"
                    max="100"
                    onChange={handlePositionChange}
                />
            </div>
            <button onClick={handleCopyColor}>copy</button>
        </div>
    )
}
