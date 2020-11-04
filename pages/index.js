import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { palettes } from '../utils/palettes'
import {
    CSSToFastLED,
    paletteToStyle,
    updateClipboard,
    paletteNameConverter,
} from '../utils/utils'
import { CopyButton } from '../components/CopyButton'

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <h2>FastLED Palette Stuff</h2>
                <p>
                    This page is a tool I made to help with an LED project that
                    uses palettes for FastLED. You can use the gradients in the
                    library or convert a linear-gradient from CSS to make your
                    own palette. You can make one at{' '}
                    <a href="https://cssgradient.io/">CSS Gradient</a>
                </p>
            </div>
            <div className={styles.paletteList}>
                {palettes.map((palette, index) => {
                    return (
                        <Palette
                            key={index}
                            style={{
                                backgroundImage: paletteToStyle(palette.data),
                            }}
                            name={palette.name}
                            data={palette.data}
                        />
                    )
                })}
            </div>
            <CSSConverter />
        </div>
    )
}

const Palette = ({ style, name, data }) => {
    const styleValue = JSON.stringify(style, null, 4)
    return (
        <div className={styles.paletteItem}>
            <div className={styles.paletteHeader}>
                <div className={styles.colorname}> {name}</div>
                <CopyPalette name={name} data={data} />
            </div>
            <div className={styles.colorbar} style={style}></div>
        </div>
    )
}

const CopyPalette = ({ name, data }) => {
    let convertedData = `// converted for FastLED with gammas (2.6, 2.2, 2.5)\n\nDEFINE_GRADIENT_PALETTE( ${paletteNameConverter(
        name
    )} ) {\n${data}};`
    return <CopyButton text={`copy ${name} for FastLED`} data={convertedData} />
}

const CSSConverter = () => {
    const [code, setCode] = useState('')
    const [result, setResult] = useState('')

    const handleChange = (e) => {
        setCode(e.target.value)
        const regex = /(?<=deg, )[\s\S]+(?=%\))/g
        const match = e.target.value.match(regex)
        if (match) {
            setResult(`// converted for FastLED with gammas (2.6, 2.2, 2.5)
            \nDEFINE_GRADIENT_PALETTE( my_new_palette_gp ) {\n${CSSToFastLED(
                match[0]
            )}};`)
        }
    }

    return (
        <div className={styles.converter}>
            <h3>CSS gradient to FastLED palette conversion</h3>
            <p>Put CSS code here</p>
            <div className={styles.converterRow}>
                <div>
                    <textarea
                        name="message"
                        rows="10"
                        cols="30"
                        value={code}
                        onChange={handleChange}
                        placeholder={`example:\nlinear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);`}
                    />
                </div>
                {result && (
                    <>
                        <div className={styles.converterResult}>{result}</div>
                        <div>
                            <CopyButton
                                text={'copy to clipboard'}
                                data={result}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
