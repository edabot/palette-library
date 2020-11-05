import React, { useState, useEffect } from 'react'
import { CopyButton } from './CopyButton'
import { CSSToFastLED } from '../utils/utils'
import styles from '../styles/Home.module.css'

const CSSConverter = () => {
    const [code, setCode] = useState('')
    const [result, setResult] = useState('')
    const [gammas, setGammas] = useState({ R: 2.6, G: 2.2, B: 2.5 })

    const handleChange = (e) => {
        setCode(e.target.value)
        const regex = /(?<=deg, )[\s\S]+(?=%\))/g
        const match = e.target.value.match(regex)
        if (match) {
            setResult(`// converted for FastLED with gammas (${gammas.R}, ${
                gammas.G
            }, ${gammas.B})
          \nDEFINE_GRADIENT_PALETTE( my_new_palette_gp ) {\n${CSSToFastLED(
              match[0],
              gammas
          )}};`)
        }
    }

    const handleGammaChange = (e) => {
        const newValue = parseFloat(e.target.value || 0)
        const color = e.target.name
        setGammas({ ...gammas, [color]: newValue })
    }

    const handleGammaIncrement = (color, value) => {
        const newValue = gammas[color] + value
        setGammas({ ...gammas, [color]: newValue })
    }

    const downHandler = (e) => {
        console.log(gammas)
        debugger
        const color = e.target.name
        if ('RGB'.includes(color)) {
            if (e.key === 'ArrowUp') {
                handleGammaIncrement(color, 0.1)
            }
            if (e.key === 'ArrowDown') {
                handleGammaIncrement(color, -0.1)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler)
        }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return (
        <div className={styles.converter}>
            <h3>CSS gradient to FastLED palette conversion</h3>
            <p>Put CSS code here</p>
            <div className={styles.converterRow}>
                <div className={styles.flexColumn}>
                    <textarea
                        name="message"
                        rows="10"
                        cols="30"
                        value={code}
                        onChange={handleChange}
                        placeholder={`example:\nlinear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);`}
                    />
                    <div>
                        <h4>Gamma values</h4>
                        <GammaInput
                            name={'R'}
                            value={gammas.R}
                            handleGammaChange={handleGammaChange}
                        />
                        <GammaInput
                            name={'G'}
                            value={gammas.G}
                            handleGammaChange={handleGammaChange}
                        />
                        <GammaInput
                            name={'B'}
                            value={gammas.B}
                            handleGammaChange={handleGammaChange}
                        />
                    </div>
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

const GammaInput = ({ name, value, handleGammaChange }) => {
    return (
        <>
            {name}
            <input
                className={styles.gammaInput}
                value={value}
                name={name}
                onChange={handleGammaChange}
            />
        </>
    )
}

export { CSSConverter }
