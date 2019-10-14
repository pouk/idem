const FontDetector = require('font-detect')

// incomplete list of popular fonts
const FONT_LIST = [
  'Helvetica',
  'Lucida Grande',
  'Lucida Sans',
  'Tahoma',
  'Arial',
  'Geneva',
  'Monaco',
  'Verdana',
  'Microsoft Sans Serif',
  'Trebuchet MS',
  'Courier New',
  'Times New Roman',
  'Courier',
  'Lucida Bright',
  'Lucida Sans Typewriter',
  'URW Chancery L',
  'Comic Sans MS',
  'Georgia',
  'Palatino Linotype',
  'Lucida Sans Unicode',
  'Times',
  'Century Schoolbook L',
  'URW Gothic L',
  'Franklin Gothic Medium',
  'Lucida Console',
  'Impact',
  'URW Bookman L',
  'Helvetica Neue',
  'Nimbus Sans L',
  'URW Palladio L',
  'Nimbus Mono L',
  'Nimbus Roman No9 L',
  'Arial Black',
  'Sylfaen',
  'MV Boli',
  'Estrangelo Edessa',
  'DejaVu Sans',
  'Liberation Sans',
  'Hiragino Sans GB',
  'Source Han Sans CN Normal',
  'Microsoft YaHei',
  'Wenquanyi Micro Hei',
  'WenQuanYi Zen Hei',
  'ST Heiti',
  'SimHei',
  'WenQuanYi Zen Hei Sharp'
]

function main () {
  const detector = new FontDetector()
  const fonts = FONT_LIST

  return () => {
    const callback = (resolve, reject) => {
      detector.detect(fonts, (err, results) => {
        if (err) return reject(err)

        const list = []

        for (let i = 0; i < results.length; i++) {
          if (results[i]) {
            list.push(fonts[i])
          }
        }

        resolve(list)
      })
    }

    return new Promise(callback)
  }
}

module.exports = main
