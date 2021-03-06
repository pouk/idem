const Future = require('fluture')

const Trait = require('@pouk/idem-type-trait')

// helpers

const fa2sx = gl => fa => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  return '[' + fa[0] + ', ' + fa[1] + ']'
}

const maxAnisotropy = (gl) => {
  const ext = gl.getExtension('EXT_texture_filter_anisotropic') ||
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
    gl.getExtension('MOZ_EXT_texture_filter_anisotropic')

  if (!ext) return null

  const anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)

  return anisotropy === 0
    ? 2
    : anisotropy
}

const getGL = () => {
  const canvas = document.createElement('canvas')

  try {
    return canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
  } catch (e) {
    return null
  }
}

const getter = () => {
  const gl = getGL()

  if (!gl) {
    return null
  }

  const result = []

  const vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
  const fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'

  const vertexPosBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)

  const vertices = new Float32Array([
    -0.2,
    -0.9,
    0,
    0.4,
    -0.26,
    0,
    0,
    0.732134444,
    0
  ])
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  vertexPosBuffer.itemSize = 3
  vertexPosBuffer.numItems = 3

  const program = gl.createProgram()
  const vshader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vshader, vShaderTemplate)
  gl.compileShader(vshader)

  const fshader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fshader, fShaderTemplate)
  gl.compileShader(fshader)
  gl.attachShader(program, vshader)
  gl.attachShader(program, fshader)
  gl.linkProgram(program)
  gl.useProgram(program)
  program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
  program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
  gl.enableVertexAttribArray(program.vertexPosArray)
  gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
  gl.uniform2f(program.offsetUniform, 1, 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)

  if (gl.canvas != null) {
    result.push(gl.canvas.toDataURL())
  }

  const fa2s = fa2sx(gl)

  result.push('extensions:' + gl.getSupportedExtensions().join(';'))
  result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
  result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
  result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS))
  result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'))
  result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS))
  result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS))
  result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS))
  result.push('webgl max anisotropy:' + maxAnisotropy(gl))
  result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
  result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
  result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
  result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
  result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
  result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE))
  result.push('webgl max varying vectors:' + gl.getParameter(gl.MAX_VARYING_VECTORS))
  result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
  result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
  result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
  result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
  result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS))
  result.push('webgl renderer:' + gl.getParameter(gl.RENDERER))
  result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
  result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS))
  result.push('webgl vendor:' + gl.getParameter(gl.VENDOR))
  result.push('webgl version:' + gl.getParameter(gl.VERSION))

  try {
    // Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
    const extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info')

    if (extensionDebugRendererInfo) {
      result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
      result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
    }
  } catch (e) {
    /* squelch */
  }

  // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
  // First it draws a gradient object with shaders and convers the image to the Base64 string.
  // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
  // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.

  if (!gl.getShaderPrecisionFormat) {
    return result.join('~')
  }

  result.push('webgl vertex shader high float precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision)
  result.push('webgl vertex shader high float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin)
  result.push('webgl vertex shader high float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax)
  result.push('webgl vertex shader medium float precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision)
  result.push('webgl vertex shader medium float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin)
  result.push('webgl vertex shader medium float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax)
  result.push('webgl vertex shader low float precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision)
  result.push('webgl vertex shader low float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin)
  result.push('webgl vertex shader low float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax)
  result.push('webgl fragment shader high float precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision)
  result.push('webgl fragment shader high float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin)
  result.push('webgl fragment shader high float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax)
  result.push('webgl fragment shader medium float precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision)
  result.push('webgl fragment shader medium float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMin)
  result.push('webgl fragment shader medium float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax)
  result.push('webgl fragment shader low float precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision)
  result.push('webgl fragment shader low float precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin)
  result.push('webgl fragment shader low float precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax)
  result.push('webgl vertex shader high int precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision)
  result.push('webgl vertex shader high int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin)
  result.push('webgl vertex shader high int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax)
  result.push('webgl vertex shader medium int precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision)
  result.push('webgl vertex shader medium int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin)
  result.push('webgl vertex shader medium int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax)
  result.push('webgl vertex shader low int precision:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision)
  result.push('webgl vertex shader low int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin)
  result.push('webgl vertex shader low int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax)
  result.push('webgl fragment shader high int precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision)
  result.push('webgl fragment shader high int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin)
  result.push('webgl fragment shader high int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax)
  result.push('webgl fragment shader medium int precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision)
  result.push('webgl fragment shader medium int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin)
  result.push('webgl fragment shader medium int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax)
  result.push('webgl fragment shader low int precision:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision)
  result.push('webgl fragment shader low int precision rangeMin:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin)
  result.push('webgl fragment shader low int precision rangeMax:' + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax)

  return result.join('~')
}

/**
 * Probe to get hardware info
 *
 * @returns {Future<Error|Trait>}
 */

function HardwareInfo () {
  return Future
    .attempt(getter)
    .map(Trait.GenericTrait)
}

// expose probe

module.exports = HardwareInfo
