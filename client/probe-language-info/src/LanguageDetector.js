const NAMES = [
  'Latin',
  'Chinese',
  'Arabic',
  'Devanagari',
  'Cyrillic',
  'Bengali/Assamese',
  'Kana',
  'Gurmukhi',
  'Javanese',
  'Hangul',
  'Telugu',
  'Tamil',
  'Malayalam',
  'Burmese',
  'Thai',
  'Sundanese',
  'Kannada',
  'Gujarati',
  'Lao',
  'Odia',
  'Ge-ez',
  'Sinhala',
  'Armenian',
  'Khmer',
  'Greek',
  'Lontara',
  'Hebrew',
  'Tibetan',
  'Georgian',
  'Modern Yi',
  'Mongolian',
  'Tifinagh',
  'Syriac',
  'Thaana',
  'Inuktitut',
  'Cherokee'
]

const CODES = [
  [76, 97, 116, 105, 110],
  [27721, 23383],
  [1575, 1604, 1593, 1585, 1576, 1610, 1577],
  [2342, 2375, 2357, 2344, 2366, 2327, 2352, 2368],
  [1050, 1080, 1088, 1080, 1083, 1080, 1094, 1072],
  [2476, 2494, 2434, 2482, 2494, 32, 47, 32, 2437, 2488, 2478, 2496, 2479, 2492, 2494],
  [20206, 21517],
  [2583, 2625, 2608, 2606, 2625, 2582, 2624],
  [43415, 43438],
  [54620, 44544],
  [3108, 3142, 3122, 3137, 3095, 3137],
  [2980, 2990, 3007, 2996, 3021],
  [3374, 3378, 3375, 3390, 3379, 3330],
  [4121, 4156, 4116, 4154, 4121, 4140],
  [3652, 3607, 3618],
  [7070, 7077, 7060, 7082, 7059],
  [3221, 3240, 3277, 3240, 3233],
  [2711, 2753, 2716, 2736, 2750, 2724, 2752],
  [3749, 3762, 3751],
  [2825, 2852, 2893, 2837, 2867],
  [4877, 4821, 4829],
  [3523, 3538, 3458, 3524, 3517],
  [1344, 1377, 1397, 1400, 1409],
  [6017, 6098, 6040, 6082, 6042],
  [917, 955, 955, 951, 957, 953, 954, 972],
  [6674, 6682, 6664, 6673],
  [1488, 1500, 1508, 1489, 1497, 1514],
  [3926, 3964, 3921, 3851],
  [4325, 4304, 4320, 4311, 4323, 4314, 4312],
  [41352, 41760],
  [6190, 6179, 6185, 6189, 6179, 6191],
  [11612, 11593, 11580, 11593, 11599, 11568, 11606],
  [1808, 1834, 1825, 1821, 1808],
  [1931, 1960, 1928, 1964, 1920, 1960],
  [5123, 5316, 5251, 5198, 5200, 5222],
  [5091, 5043, 5033],
  [55295, 7077]
]

function LanguageDetector () {
  this.names = NAMES
  this.codes = CODES
  this.fontSize = 401
  this.fontFace = 'Verdana'
  this.extraHeigth = 15
  this.res = []
}

LanguageDetector.prototype.detect = function () {
  var c, code, h, height, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, o, p, ref, ref1, ref2, ref3, round, s, w, width
  round = 0
  this.widths = []
  this.heights = []
  this.support = []
  this.test_div = document.createElement('div')
  document.body.appendChild(this.test_div)
  this.test_div.id = 'WritingTest'
  ref = this.codes
  for (i = 0, len = ref.length; i < len; i++) {
    code = ref[i]
    this.height = []
    this.width = []
    this.div = document.createElement('div')
    this.test_div.appendChild(this.div)
    round += 1
    this.div.id = round
    this.div.style.display = 'inline-block'
    for (j = 0, len1 = code.length; j < len1; j++) {
      c = code[j]
      this.div.innerHTML = '<span style = "font-family:' + this.fontFace + '; font-size:' + this.fontSize + 'px;">&#' + c + '</span>'
      this.height.push(document.getElementById(round).clientHeight)
      this.width.push(document.getElementById(round).clientWidth)
    }
    this.div.innerHTML = ''
    for (k = 0, len2 = code.length; k < len2; k++) {
      c = code[k]
      this.div.innerHTML += '<span style = "font-family:' + this.fontFace + '; font-size:' + this.fontSize + 'px;">&#' + c + '</span>'
    }
    this.test_div.innerHTML += this.height + ';' + this.width + '<br>'
    this.heights.push(this.height)
    this.widths.push(this.width)
  }

  // standard width
  // maybe with a circle
  this.tw = this.widths.pop()
  this.sw1 = this.tw[0]
  this.sw2 = this.tw[1]

  // Standard height
  this.sh = this.heights.pop()[0]

  // Check the height
  ref1 = this.heights
  for (l = 0, len3 = ref1.length; l < len3; l++) {
    height = ref1[l]
    this.passed = 0
    for (m = 0, len4 = height.length; m < len4; m++) {
      h = height[m]
      if (h !== this.sh) {
        this.support.push(true)
        this.passed = 1
        break
      }
    }
    if (this.passed === 0) {
      this.support.push(false)
    }
  }

  // Check the width
  this.writing_scripts_index = 0
  ref2 = this.widths
  for (n = 0, len5 = ref2.length; n < len5; n++) {
    width = ref2[n]
    for (o = 0, len6 = width.length; o < len6; o++) {
      w = width[o]
      if (this.support[this.writing_scripts_index] === false) {
        if (w !== this.sw1 && w !== this.sw2) {
          this.support[this.writing_scripts_index] = true
        }
      }
    }
    this.writing_scripts_index += 1
  }

  this.res = []
  this.writing_scripts_index = 0
  ref3 = this.support
  for (p = 0, len7 = ref3.length; p < len7; p++) {
    s = ref3[p]
    this.test_div.innerHTML += this.names[this.writing_scripts_index] + ': ' + s + ' <br>'
    if (s === true) {
      this.res.push(this.names[this.writing_scripts_index])
    }
    this.writing_scripts_index += 1
  }
  this.test_div.remove()
  return this.res
}

module.exports = LanguageDetector
