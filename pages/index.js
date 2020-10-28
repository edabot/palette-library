import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import { palettes } from '../utils/palettes'
import { CSSToFastLED, paletteStringToString, paletteToStyle, updateClipboard, paletteNameConverter } from '../utils/utils'

export default function Home() {
  return (
    <div className={styles.container}>
    <div className={styles.paletteList}>
          {
          palettes.map((palette, index) => {
            return (
              <Palette 
                key={index}
                style={{ backgroundImage: paletteToStyle(palette.data) }} 
                name={palette.name}
                data={palette.data}
/>            );
          })
          }
          <CSSConverter />
          </div>
    </div>
  )
}

const Palette = ({style, name, data}) => {
  const styleValue = JSON.stringify(style, null, 4);
  return (
    <div className={styles.paletteItem}>
      <div className={styles.paletteHeader}>
        <div className={styles.colorname}> {name}</div>
        <CopyButton name={name} data={data}/>
      </div>
      <div className={styles.colorbar} style={style}></div>  
    </div>
  )
};

const CopyButton = ({name, data}) => {
  let result = `// converted for FastLED with gammas (2.6, 2.2, 2.5)\n\nDEFINE_GRADIENT_PALETTE( ${paletteNameConverter(name)} ) {\n${data}};`
  return (
    <button onClick={() => updateClipboard(result)}>copy {name} for FastLED</button>
  )
}

const CSSConverter = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
    const regex = /(?<=deg, )[\s\S]+(?=%\))/g
    const match = e.target.value.match(regex);
    if (match) {
      setResult(CSSToFastLED(match[0]))
    }
  }

  return (
    <div className={styles.converter}>
      <h3>CSS to FastLED Palette conversion</h3>
      <div className={styles.converterRow}>
      <textarea name="message" rows="10" cols="30" value={code} onChange={handleChange} placeholder="put CSS code here" />
        {result &&
          <div className={styles.converterResult}>
          {`// converted for FastLED with gammas (2.6, 2.2, 2.5)
\nDEFINE_GRADIENT_PALETTE( my_new_palette_gp ) {\n`}
            { result }
          {`}`}
          </div>
        }
    
        </div>
    </div>
  )
}
