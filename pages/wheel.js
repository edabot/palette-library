import React, { useState } from 'react'
import styles from '../styles/Wheel.module.css'
import { wheelStyle, wheelStyleFastLed } from '../utils/utils'
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
                spin
            </div>
            <MultiplePicker setMultiple={setMultiple} />

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
                                deleteColor={deleteColor}
                            />
                        )
                    })}
                    <div onClick={addColor} className={styles.addColor}>
                        + add color
                    </div>
                </div>
                <div>
                    <ChromePicker
                        color={
                            colors[pickerIndex] ? colors[pickerIndex].color : ''
                        }
                        onChange={handleChangeComplete}
                        disableAlpha
                    />
                </div>
            </div>
            <div>{wheelStyle(colors, multiple)}</div>
            <div className={styles.converterResult}>
                {wheelStyleFastLed(colors, multiple)}
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
    deleteColor,
    setPickerIndex,
}) => {
    const handlePositionChange = (e) => {
        console.log('old')
    }

    const handleDivClick = () => {
        setPickerIndex(index)
    }

    const handleCopyColor = () => {
        copyColor(color, position)
    }
    const handleDeleteColor = () => {
        deleteColor(index)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateColor(color, e.currentTarget[0].value, index)
        e.target.reset()
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
                <form onSubmit={handleSubmit}>
                    <span>position:</span>
                    <input
                        placeholder={position}
                        type="number"
                        min="0"
                        max="100"
                        onChange={handlePositionChange}
                    />
                </form>
            </div>
            <button onClick={handleCopyColor}>copy</button>
            <button onClick={handleDeleteColor}>delete</button>
        </div>
    )
}

const MultiplePicker = ({ setMultiple }) => {
    const handleSelection = (e) => {
        setMultiple(e.target.value)
    }

    return (
        <div className={styles.multiples}>
            <button onClick={handleSelection} value={1}>
                x1
            </button>
            <button onClick={handleSelection} value={2}>
                x2
            </button>
            <button onClick={handleSelection} value={3}>
                x3
            </button>
            <button onClick={handleSelection} value={4}>
                x4
            </button>
            <button onClick={handleSelection} value={5}>
                x5
            </button>
            <button onClick={handleSelection} value={6}>
                x6
            </button>
        </div>
    )
}
