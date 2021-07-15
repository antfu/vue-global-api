import fs from 'fs-extra'

const lifecycle = [
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onDeactivated',
  'onErrorCaptured',
  'onMounted',
  'onServerPrefetch',
  'onUnmounted',
  'onUpdated',
]

const reactivity = [
  'computed',
  'customRef',
  'isReadonly',
  'isRef',
  'markRaw',
  'reactive',
  'readonly',
  'ref',
  'shallowReactive',
  'shallowReadonly',
  'shallowRef',
  'toRaw',
  'toRef',
  'toRefs',
  'triggerRef',
  'unref',
  'watch',
  'watchEffect',
]

const component = [
  'defineComponent',
  'getCurrentInstance',
  'h',
  'inject',
  'nextTick',
  'provide',
  'useCssModule',
]

const apis = [
  ...lifecycle,
  ...reactivity,
  ...component,
]

const collections = {
  index: apis,
  lifecycle,
  component,
  reactivity,
}

const packageJSON = fs.readJSONSync('package.json')
packageJSON.exports = {}

for (const api of apis) {
  fs.writeFile(`${api}.mjs`, `import { ${api} } from 'vue-demi'\nglobalThis.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.cjs`, `const { ${api} } = require('vue-demi')\nglobalThis.${api} = ${api}\n`, 'utf-8')
  fs.writeFile(`${api}.d.ts`, `import { ${api} as _${api} } from 'vue-demi'\ndeclare global {\n  const ${api}: typeof _${api}\n}\n`, 'utf-8')
  packageJSON.exports[`./${api}`] = {
    import: `./${api}.mjs`,
    require: `./${api}.cjs`,
  }
}

for (const [name, collection] of Object.entries(collections)) {
  fs.writeFile(`${name}.mjs`, collection.map(api => `import './${api}.mjs'`).join('\n'), 'utf-8')
  fs.writeFile(`${name}.cjs`, collection.map(api => `require('./${api}.cjs')`).join('\n'), 'utf-8')
  fs.writeFile(`${name}.d.ts`, collection.map(api => `import './${api}'`).join('\n'), 'utf-8')

  let entry = `./${name}`
  if (name === 'index')
    entry = '.'

  packageJSON.exports[entry] = {
    import: `./${name}.mjs`,
    require: `./${name}.cjs`,
  }
}

fs.writeJSONSync('package.json', packageJSON, { spaces: 2 })
