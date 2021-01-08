import React, { useState } from 'react'
import CopyButton from './CopyButton'
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
    const newValue = parseFloat(e.target.value)
    const color = e.target.name
    if (color === 'R') {
      setGammas({ R: newValue, G: gammas.G, B: gammas.B })
    }
    if (color === 'G') {
      setGammas({ R: gammas.R, G: newValue, B: gammas.B })
    }
    if (color === 'B') {
      setGammas({ R: gammas.R, G: gammas.G, B: newValue })
    }
  }

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
            R
            <input
              className={styles.gammaInput}
              value={gammas.R}
              name={'R'}
              onChange={handleGammaChange}
            />
            G
            <input
              className={styles.gammaInput}
              value={gammas.G}
              name={'G'}
              onChange={handleGammaChange}
            />
            B
            <input
              className={styles.gammaInput}
              value={gammas.B}
              name={'B'}
              onChange={handleGammaChange}
            />
          </div>
        </div>
        {result && (
          <>
            <div className={styles.converterResult}>{result}</div>
            <div>
              <CopyButton text={'copy to clipboard'} data={result} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export { CSSConverter }
