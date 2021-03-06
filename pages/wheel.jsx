import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { exportWheel, wheelStyle, wheelStyleFastLed } from '../utils/utils'
import styles from '../styles/Wheel.module.css'
import MultiplePicker from '../components/MultiplePicker'
import ColoritemList from '../components/ColoritemList'
import CopyButton from '../components/CopyButton'
import wheels from '../utils/wheelLibrary'

const defaultColors = [
  {
    color: '#FF0000',
    position: 0,
    leadingEdge: true,
  },
  {
    color: '#00FF00',
    position: 50,
    leadingEdge: true,
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
  const [gap, setGap] = useState(0)

  const addColor = () => {
    let colorList = [...colors]
    colorList.push({ color: '#a0a0a0', position: undefined })
    colorList = sortColors(colorList)
    setColors(colorList)
  }

  const copyColor = (color, position, leadingEdge) => {
    let colorList = [...colors]
    colorList.push({ color, position, leadingEdge })
    colorList = sortColors(colorList)
    setColors(colorList)
  }

  const updateColor = (color, position, leadingEdge, index) => {
    let colorList = [...colors]
    colorList[index] = { color, position: parseInt(position, 10), leadingEdge }
    colorList = sortColors(colorList)
    setColors(colorList)
  }

  const updateEdge = (color, position, leadingEdge, index) => {
    let colorList = [...colors]
    colorList[index] = { color, position, leadingEdge }
    colorList = sortColors(colorList)
    setColors(colorList)
  }

  const deleteColor = (index) => {
    const colorList = [...colors.slice(0, index), ...colors.slice(index + 1)]
    if (pickerIndex === colors.length - 1) {
      setPickerIndex(pickerIndex - 1)
    }
    setColors(colorList)
  }

  const loadWheel = ({ multiple, colorList, gap }) => {
    setMultiple(multiple)
    setColors(colorList)
    if (gap) {
      setGap(gap)
    } else {
      setGap(0)
    }
  }

  const handleChangeComplete = (color) => {
    updateColor(
      color.hex,
      colors[pickerIndex].position,
      colors[pickerIndex].leadingEdge,
      pickerIndex
    )
  }

  const changeSpinning = () => {
    setSpinning(!spinning)
  }

  const handleGapSubmit = (e) => {
    e.preventDefault()
    setGap(parseInt(e.target[0].value, 10))
    e.target.reset()
  }

  const handleExport = () => {
    exportWheel(colors, multiple, gap)
  }

  return (
    <div className={styles.container}>
      <div className={styles.library}>
        <div>
          {wheels.map((wheel) => {
            return (
              <div onClick={() => loadWheel(wheel)} key={wheel.name}>
                {wheel.name}
              </div>
            )
          })}
        </div>
        <div onClick={handleExport}>
          <br />
          export
        </div>
      </div>
      <div className={styles.wheelContainer}>
        <div
          className={styles.wheel}
          style={{
            background: wheelStyle(colors, multiple, gap),
            animation: spinning ? '' : 'x',
          }}
        >
          <div className={styles.wheelCenter} />
        </div>
      </div>
      <div onClick={changeSpinning} className={styles.spinButton}>
        spin ⟳
      </div>
      <MultiplePicker setMultiple={setMultiple} multiple={multiple} />
      <div>
        <form onSubmit={handleGapSubmit}>
          <span>gap:</span>
          <input placeholder={gap} type="number" min="0" max="50" />
        </form>
      </div>
      <div className={styles.colorArea}>
        <ColoritemList
          colors={colors}
          pickerIndex={pickerIndex}
          updateColor={updateColor}
          updateEdge={updateEdge}
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
        <div className={styles.wheelCSS}>{wheelStyle(colors, multiple)}</div>
        <div className={styles.converterResult}>
          <CopyButton
            text="copy FastLED code"
            data={wheelStyleFastLed(colors, multiple, gap)}
          />
          <br />
          {wheelStyleFastLed(colors, multiple, gap)}
        </div>
      </div>
    </div>
  )
}
