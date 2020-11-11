import styles from '../styles/Wheel.module.css'
import ColorItem from '../components/ColorItem'

const ColorItemList = ({
    colors,
    pickerIndex,
    updateColor,
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
    )
}

export default ColorItemList
