import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import { palettes } from './palettes'
import { CSSToFastLED, paletteStringToString, paletteToStyle, updateClipboard, paletteNameConverter } from './utils'

export default function Home() {
  return (
    <div className={styles.container}>
    <table>
        <tbody>
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
    </tbody>
    </table>
    </div>
  )
}

const Palette = ({style, name, data}) => {
  const styleValue = JSON.stringify(style, null, 4);
  return (
    <>
    <tr>
      <td><div className={styles.colorname}> {name}</div></td>
      </tr>
      <tr>
        <td><div className={styles.colorbar} style={style}></div></td>
        </tr><tr>
        <CopyButton name={name} data={data}/>
      </tr>
      </>
  )
};

const CopyButton = ({name, data}) => {
  let result = `// converted for FastLED with gammas (2.6, 2.2, 2.5)\n\nDEFINE_GRADIENT_PALETTE( ${paletteNameConverter(name)} ) {\n${data}};`
  return (
    <button onClick={() => updateClipboard(result)}>copy for FastLED</button>
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
    <>
      <textarea name="message" rows="10" cols="30" value={code} onChange={handleChange} placeholder="put CSS code here" />
      <br />
      <span style={{whiteSpace: 'pre-line'}}>
        {result && paletteStringToString(result)}
      </span>
    </>
  )
}
