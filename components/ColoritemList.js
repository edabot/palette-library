import styles from '../styles/Wheel.module.css'
import ColorItem from '../components/ColorItem'

const ColorItemList = ({
  colors,
  pickerIndex,
  updateColor,
  updateEdge,
  setPickerIndex,
  copyColor,
  deleteColor,
  addColor,
}) => {
  return (
    <div className={styles.colorItemList}>
      {colors.map((color, index) => {
        return (
          <ColorItem
            color={color.color}
            colorCount={colors.length}
            position={color.position}
            leadingEdge={color.leadingEdge}
            index={index}
            pickerIndex={pickerIndex}
            key={index}
            updateColor={updateColor}
            setPickerIndex={setPickerIndex}
            copyColor={copyColor}
            deleteColor={deleteColor}
            updateEdge={updateEdge}
          />
        )
      })}
      <div onClick={addColor} className={styles.addColor}>
        + add color
      </div>
    </div>
  )
}

export default ColorItemList
