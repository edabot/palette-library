import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Home.module.css'
import palettes from '../utils/palettes'
import { paletteToStyle, paletteNameConverter } from '../utils/utils'
import CopyButton from '../components/CopyButton'
import { CSSConverter } from '../components/CSSConverter'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2>FastLED Palette Stuff</h2>
        <p>
          This page is a tool I made to help with an LED project that uses
          palettes for FastLED. You can use the gradients in the library or
          convert a linear-gradient from CSS to make your own palette. You can
          make one at 
          <a href="https://cssgradient.io/">CSS Gradient</a>
        </p>
      </div>
      <div className={styles.paletteList}>
        {palettes.map((palette) => {
          return (
            <Palette
              key={palette.name}
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
  return (
    <div className={styles.paletteItem}>
      <div className={styles.paletteHeader}>
        <div className={styles.colorname}>{name}</div>
        <CopyPalette name={name} data={data} />
      </div>
      <div className={styles.colorbar} style={style} />
    </div>
  )
}

Palette.propTypes = {
  style: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const CopyPalette = ({ name, data }) => {
  const convertedData = `// converted for FastLED with gammas (2.6, 2.2, 2.5)\n\nDEFINE_GRADIENT_PALETTE( ${paletteNameConverter(
    name
  )} ) {\n${data}};`
  return <CopyButton text={`copy ${name} for FastLED`} data={convertedData} />
}

CopyPalette.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}