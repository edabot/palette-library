const rgamma = 2.6
const ggamma = 2.2
const bgamma = 2.5

const adjustGamma = (orig, gamma) => {
    var o = orig / 255.0
    var adj = Math.pow(o, gamma)
    var res = Math.floor(adj * 255.0)
    if (orig != 0 && res == 0) {
        res = 1
    }
    return res
}

const splitValues = (entry, gammas) => {
    const arr = entry.split(' ')
    const position = Math.round(parseInt(arr[1]) * 2.55)
    const RGBValues = arr[0]
    let gammaR, gammaG, gammaB

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

    return position + ', ' + gammaR + ', ' + gammaG + ', ' + gammaB
}

const CSSToFastLED = (string, gammas) => {
    let arr = string.split('%, ')
    const first = arr[0]
    const last = arr[arr.length - 1]

    if (!first.endsWith(' 0')) {
        const newFirst = first.substring(0, first.lastIndexOf(' ')) + ' 0'
        arr.unshift(newFirst)
    }
    if (!last.endsWith('100')) {
        const newLast = last.substring(0, last.lastIndexOf(' ')) + ' 100'
        arr.push(newLast)
    }
    let result = ''
    for (let i = 0; i < arr.length; i++) {
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
    for (let i = 0; i < paletteArray.length; i = i + 4) {
        let percent = Math.trunc(paletteArray[i] / 0.255) / 10
        let ungammaR = adjustGamma(paletteArray[i + 1], 1 / rgamma)
        let ungammaG = adjustGamma(paletteArray[i + 2], 1 / bgamma)
        let ungammaB = adjustGamma(paletteArray[i + 3], 1 / ggamma)
        result += `, rgba(${ungammaR}, ${ungammaG}, ${ungammaB}) ${percent}%`
    }
    return result
}

const paletteToString = (p) => {
    let result = ''
    for (let i = 0; i < p.length; i = i + 4) {
        result += `${p[i]}, ${p[i + 1]}, ${p[i + 2]}, ${p[i + 3]}`
        if (i < p.length - 4) {
            result += `,\n`
        }
    }
    return result
}

const paletteStringToString = (string) => {
    console.log(string)
    const p = string.split(',')
    return paletteToString(p)
}

const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
        function () {
            /* clipboard successfully set */
        },
        function () {
            /* clipboard write failed */
        }
    )
}

const paletteNameConverter = (name) => {
    return name.replace(/\s/g, '_').toLowerCase() + '_gp'
}

const wheelStyle = (colorArray) => {
    let result = 'conic-gradient('
    for (let i = 0; i < colorArray.length; i++) {
        const item = colorArray[i]
        const nextItem = colorArray[i + 1]
        result += `${item.color} ${item.position}%`
        if (nextItem) {
            result += ` ${nextItem.position}%, `
        }
    }
    result += ')'
    return result
}

export {
    adjustGamma,
    CSSToFastLED,
    paletteStringToString,
    paletteToString,
    paletteToStyle,
    updateClipboard,
    paletteNameConverter,
    wheelStyle,
}
