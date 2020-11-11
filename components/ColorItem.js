import styles from '../styles/Wheel.module.css'

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
            <div className={styles.colorItemProperties}>
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
            </div>
            <div>
                <button
                    className={styles.colorItemButton}
                    onClick={handleCopyColor}
                >
                    copy
                </button>
                <button
                    className={styles.colorItemButton}
                    onClick={handleDeleteColor}
                >
                    delete
                </button>
            </div>
        </div>
    )
}

export default ColorItem
