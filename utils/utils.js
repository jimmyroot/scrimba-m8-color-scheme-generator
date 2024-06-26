const randomHexVal = () => {
    let hex = ''
    for (let i = 0; i <= 2; i++) {
        let val = Math.floor(Math.random() * 255).toString(16)
        if (val.length < 2) val = '0' + val
        hex += val
    }
    return hex
}

const hexToHSL = hex => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;

    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }

    // Then to HSL
    r /= 255
    g /= 255
    b /= 255
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0
  
    if (delta == 0)
      h = 0
    else if (cmax == r)
      h = ((g - b) / delta) % 6
    else if (cmax == g)
      h = (b - r) / delta + 2
    else
      h = (r - g) / delta + 4
  
    h = Math.round(h * 60)
  
    if (h < 0)
      h += 360
  
    l = (cmax + cmin) / 2
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return [ h, s, l ]
}

const isLowContrast = ( hex, baseLum ) => {
    const [ hue, sat, lum ] = hexToHSL(hex)
    const contrastRatio = (lum + 0.05) / (baseLum + 0.05)
    if (contrastRatio < 0.73) {
        if (hue >= 45 && hue <= 185) {
            if (sat < 38) { 
                return false
            } else if (lum < 49) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    } else {
        return true
    }
}

const toggleSpinner = () => {
  const swatches = document.querySelector('.section-swatches')
  const app = document.querySelector('#app')
  if (swatches) swatches.classList.toggle('faded')
  app.classList.toggle('spinner')  
}

const scrollToTop = () => {
  document.querySelector('#app').scrollTo({
    top: 0,
    behaviour: 'smooth'
  })
}

export { randomHexVal, isLowContrast, toggleSpinner, scrollToTop }