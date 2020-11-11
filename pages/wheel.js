import React, { useState } from 'react'
import styles from '../styles/Wheel.module.css'
import { wheelStyle, wheelStyleFastLed } from '../utils/utils'
import { ChromePicker } from 'react-color'
import MultiplePicker from '../components/MultiplePicker'
import ColoritemList from '../components/ColoritemList'
import CopyButton from '../components/CopyButton'

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
    const [multiple, setMultiple] = useState(2)

    const addColor = () => {
        let colorList = [...colors]
        colorList.push({ color: '#a0a0a0', position: undefined })
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
        colorList[index] = { color, position: parseInt(position) }
        colorList = sortColors(colorList)
        setColors(colorList)
    }

    const deleteColor = (index) => {
        let colorList = [...colors.slice(0, index), ...colors.slice(index + 1)]
        if (pickerIndex === colors.length - 1) {
            setPickerIndex(pickerIndex - 1)
        }
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
                    background: wheelStyle(colors, multiple),
                    animation: spinning ? '' : 'x',
                }}
            >
                <div className={styles.wheelCenter}></div>
            </div>
            <div onClick={changeSpinning} className={styles.spinButton}>
                spin ↺
            </div>
            <MultiplePicker setMultiple={setMultiple} multiple={multiple} />

            <div className={styles.colorArea}>
                <ColoritemList
                    colors={colors}
                    pickerIndex={pickerIndex}
                    updateColor={updateColor}
                    setPickerIndex={setPickerIndex}
                    copyColor={copyColor}
                    deleteColor={deleteColor}
                    addColor={addColor}
                />
                <ChromePicker
                    color={colors[pickerIndex] ? colors[pickerIndex].color : ''}
                    onChange={handleChangeComplete}
                    disableAlpha
                />
            </div>
            <div className={styles.wheelCodes}>
                <div className={styles.wheelCSS}>
                    {wheelStyle(colors, multiple)}
                </div>
                <div className={styles.converterResult}>
                    {wheelStyleFastLed(colors, multiple, true)}
                    <CopyButton
                        text={'copy FastLED code'}
                        data={wheelStyleFastLed(colors, multiple, true)}
                    />
                </div>
            </div>
        </div>
    )
}
