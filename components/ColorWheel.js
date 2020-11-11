import styles from '../styles/Wheel.module.css'
import { wheelStyle } from '../utils/utils'

const ColorWheel = (style, changeSpinning) => {
    return (
        <>
            <div className={styles.wheel} style={style}>
                <div className={styles.wheelCenter}></div>
            </div>
            <div onClick={changeSpinning} className={styles.spinButton}>
                spin ↺
            </div>
        </>
    )
}

export default ColorWheel
