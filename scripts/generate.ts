import fs from 'fs-extra'

const apis = [
  'computed',
  'defineComponent',
  'getCurrentInstance',
  'h',
  'inject',
  'isRef',
  'nextTick',
  'onMounted',
  'onUnmounted',
  'provide',
  'reactive',
  'ref',
  'shallowReactive',
  'shallowRef',
  'toRaw',
  'toRef',
  'toRefs',
  'unref',
  'useCssModule',
  'watch',
  'watchEffect',
  // 'effectScope'
]

const packageJSON = fs.readJSONSync('package.json')
packageJSON.exports = {
  '.': {
    import: './index.mjs',
    require: './index.cjs',
  },
}

for (const api of apis) {
  fs.writeFile(`${api}.mjs`, `import { ${api} } from 'vue-demi'\nglobalThis.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.cjs`, `const { ${api} } = require('vue-demi')\nglobalThis.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.d.ts`, `import { ${api} as _${api} } from 'vue-demi'\ndeclare global {\n  const ${api}: typeof _${api}\n}\n`, 'utf-8')
  packageJSON.exports[`./${api}`] = {
    import: `./${api}.mjs`,
    require: `./${api}.cjs`,
  }
}

fs.writeFile('index.mjs', apis.map(api => `import './${api}.mjs'`).join('\n'), 'utf-8')
fs.writeFile('index.cjs', apis.map(api => `require('./${api}.cjs')`).join('\n'), 'utf-8')
fs.writeFile('index.d.ts', apis.map(api => `import './${api}'`).join('\n'), 'utf-8')

fs.writeJSONSync('package.json', packageJSON, { spaces: 2 })
