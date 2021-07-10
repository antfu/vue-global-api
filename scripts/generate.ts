import fs from 'fs-extra'

const apis = [
  'ref',
  'computed',
  'reactive',
  'watch',
  'watchEffect',
  'getCurrentInstance',
  'inject',
  'provide',
  'defineComponent',
  'nextTick',
  'onMounted',
  'onUnmounted',
  // 'effectScope'
]

const packageJSON = fs.readJSONSync('package.json')
packageJSON.exports = {
  '.': {
    import: './index.esm.js',
    require: './index.cjs.js',
  },
}

for (const api of apis) {
  fs.writeFile(`${api}.esm.js`, `import { ${api} } from 'vue-demi'\nglobal.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.cjs.js`, `const { ${api} } = require('vue-demi')\nglobal.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.d.ts`, `import { ${api} as _${api} } from 'vue-demi'\ndeclare global {\n  const ${api}: typeof _${api}\n}\n`, 'utf-8')
  packageJSON.exports[`./${api}`] = {
    import: `./${api}.esm.js`,
    require: `./${api}.cjs.js`,
  }
}

fs.writeFile('index.esm.js', apis.map(api => `import './${api}'`).join('\n'), 'utf-8')
fs.writeFile('index.cjs.js', apis.map(api => `require('./${api}')`).join('\n'), 'utf-8')
fs.writeFile('index.d.ts', apis.map(api => `import './${api}'`).join('\n'), 'utf-8')

fs.writeJSONSync('package.json', packageJSON, { spaces: 2 })
