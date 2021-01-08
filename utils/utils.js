/* global navigator */
const rgamma = 2.6
const ggamma = 2.2
const bgamma = 2.5

const adjustGamma = (orig, gamma) => {
  const o = orig / 255.0
  const adj = o ** gamma
  let res = Math.floor(adj * 255.0)
  if (orig !== 0 && res === 0) {
    res = 1
  }
  return res
}

const splitValues = (entry, gammas) => {
  const arr = entry.split(' ')
  const position = Math.round(parseInt(arr[1], 10) * 2.55)
  const RGBValues = arr[0]
  let gammaR
  let gammaG
  let gammaB

  if (RGBValues.startsWith('#')) {
    gammaR = adjustGamma(parseInt(RGBValues.substring(1, 3), 16), gammas.R)
    gammaG = adjustGamma(parseInt(RGBValues.substring(3, 5), 16), gammas.G)
    gammaB = adjustGamma(parseInt(RGBValues.substring(5, 7), 16), gammas.B)
  } else {
    const RGB = RGBValues.substring(5).split(',')
    gammaR = adjustGamma(RGB[0], gammas.R)
    gammaG = adjustGamma(RGB[1], gammas.G)
    gammaB = adjustGamma(RGB[2], gammas.B)
  }

  return `${position}, ${gammaR}, ${gammaG}, ${gammaB}`
}

const CSSToFastLED = (string, gammas) => {
  const arr = string.split('%, ')
  const first = arr[0]
  const last = arr[arr.length - 1]

  if (!first.endsWith(' 0')) {
    const newFirst = `${first.substring(0, first.lastIndexOf(' '))}`
    arr.unshift(newFirst)
  }
  if (!last.endsWith('100')) {
    const newLast = `${last.substring(0, last.lastIndexOf(' '))} 100`
    arr.push(newLast)
  }
  let result = ''
  for (let i = 0; i < arr.length; i += 1) {
    result += splitValues(arr[i], gammas)
    if (i < arr.length - 1) {
      result += ','
    }
    result += '\n'
  }
  return result
}

const paletteToStyle = (paletteArray) => {
  let result = 'linear-gradient(90deg'
  for (let i = 0; i < paletteArray.length; i += 4) {
    const percent = Math.trunc(paletteArray[i] / 0.255) / 10
    const ungammaR = adjustGamma(paletteArray[i + 1], 1 / rgamma)
    const ungammaG = adjustGamma(paletteArray[i + 2], 1 / bgamma)
    const ungammaB = adjustGamma(paletteArray[i + 3], 1 / ggamma)
    result += `, rgba(${ungammaR}, ${ungammaG}, ${ungammaB}) ${percent}%`
  }
  return result
}

const paletteToString = (p) => {
  let result = ''
  for (let i = 0; i < p.length; i += 4) {
    result += `${p[i]}, ${p[i + 1]}, ${p[i + 2]}, ${p[i + 3]}`
    if (i < p.length - 4) {
      result += `,\n`
    }
  }
  return result
}

const paletteStringToString = (string) => {
  const p = string.split(',')
  return paletteToString(p)
}

const updateClipboard = (newClip) => {
  navigator.clipboard.writeText(newClip)
}

const multiplyColorArray = (colorArray, multiple) => {
  let newArray = []
  for (let i = 0; i < multiple; i += 1) {
    const newColorArray = [...colorArray].map((c) => {
      return {
        color: c.color,
        position: (c.position + i * 100) / multiple,
        leadingEdge: c.leadingEdge,
      }
    })
    newArray = [...newArray, ...newColorArray]
  }
  return newArray
}

const paletteNameConverter = (name) => {
  return `${name.replace(/\s/g, '_').toLowerCase()}_gp`
}

const wheelStyle = (colorArray, multiple, gap) => {
  let newArray = [...colorArray].filter(
    (x) => typeof x.position !== 'undefined'
  )
  if (gap > 0) {
    const gapAdjustment = (100 - gap) / 100
    newArray = newArray.map((x) => {
      const result = { ...x }
      result.position = x.position * gapAdjustment
      return result
    })
    newArray.push({
      color: '#000000',
      position: 100 - gap,
      leadingEdge: true,
    })
  }

  newArray = multiplyColorArray(newArray, multiple)

  let result = 'conic-gradient('

  for (let i = 0; i < newArray.length; i += 1) {
    const item = newArray[i]
    const nextItem = newArray[i + 1]
    result += `${item.color} ${Math.floor(item.position * 10) / 10}%`
    if (nextItem && nextItem.leadingEdge) {
      result += ` ${Math.floor(nextItem.position * 10) / 10}%, `
    } else if (nextItem) {
      result += `, `
    }
  }

  result += ')'
  return result
}

const processWheelColor = (item, gammas) => {
  const position = Math.round(parseInt(item.position, 10) * 2.55)
  const hex = item.color

  const gammaR = adjustGamma(parseInt(hex.substring(1, 3), 16), gammas.R)
  const gammaG = adjustGamma(parseInt(hex.substring(3, 5), 16), gammas.G)
  const gammaB = adjustGamma(parseInt(hex.substring(5, 7), 16), gammas.B)

  return `${position}, ${gammaR}, ${gammaG}, ${gammaB}`
}

const wheelStyleFastLed = (colorArray, multiple, gap) => {
  let newArray = [...colorArray].filter(
    (x) => typeof x.position !== 'undefined'
  )
  if (gap > 0) {
    const gapAdjustment = (100 - gap) / 100
    newArray = newArray.map((x) => {
      const result = { ...x }
      result.position = x.position * gapAdjustment
      return result
    })
    newArray.push({
      color: '#000000',
      position: 100 - gap,
      leadingEdge: true,
    })
  }

  if (newArray[0].position !== 0) {
    const newFirst = { ...newArray[0], position: 0 }
    newArray.unshift(newFirst)
  }

  newArray = multiplyColorArray(newArray, multiple)

  if (newArray[newArray.length - 1].position !== 100) {
    const newLast = { ...newArray[newArray.length - 1], position: 100 }
    newArray.push(newLast)
  }

  let result = ''
  for (let i = 0; i < newArray.length; i += 1) {
    const thisItem = newArray[i]
    if (i > 0 && thisItem.leadingEdge) {
      const prevItem = newArray[i - 1]
      prevItem.position = thisItem.position
      result += processWheelColor(prevItem, { R: 2.6, G: 2.2, B: 2.5 })
      result += ',\n'
    }
    result += processWheelColor(newArray[i], { R: 2.6, G: 2.2, B: 2.5 })
    if (i < newArray.length - 1) {
      result += ','
    }
    result += '\n'
  }
  return result
}

const exportWheel = (colors, multiple, gap) => {
  const result = {
    name: 'name',
    multiple,
    gap,
    colorList: colors,
  }
  // eslint-disable-next-line
  console.log(JSON.stringify(result, null, 2))
}

export {
  adjustGamma,
  CSSToFastLED,
  exportWheel,
  paletteStringToString,
  paletteToString,
  paletteToStyle,
  updateClipboard,
  paletteNameConverter,
  wheelStyle,
  wheelStyleFastLed,
}
