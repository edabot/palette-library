import styles from '../styles/Wheel.module.css'

const MultiplePicker = ({ setMultiple, multiple }) => {
    const handleSelection = (e) => {
        setMultiple(e.target.value)
    }

    return (
        <div className={styles.multiples}>
            {[1, 2, 3, 4, 5, 6, 7].map((x) => (
                <MultiplePickerItem
                    handleSelection={handleSelection}
                    selected={x == multiple}
                    value={x}
                    key={x}
                />
            ))}
        </div>
    )
}

const MultiplePickerItem = ({ handleSelection, selected, value }) => {
    let style = {}

    if (selected) {
        style = {
            border: `2px solid #666`,
            'background-color': 'lightgreen',
            'font-weight': '700',
        }
    }

    return (
        <button
            onClick={handleSelection}
            value={value}
            className={styles.multipleButton}
            style={style}
        >
            x{value}
        </button>
    )
}

export default MultiplePicker
