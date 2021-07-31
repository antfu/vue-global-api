# vue-global-api

Use Vue Composition API globally

<a href='https://www.npmjs.com/package/vue-global-api'>
<img src='https://img.shields.io/npm/v/vue-global-api?color=222&label='>
</a>

<br>
<br>

Instead of import APIs from `vue` in every file,

```html
<script setup>
import { ref, computed, watch } from 'vue'

const counter = ref(0)

const doubled = computed(() => counter.value * 2)

watch(doubled, (v) => {
  console.log('New value: ' + v)
})
</script>
```

Now you can directly use them everywhere (with TypeScript support!)

```html
<script setup>
const counter = ref(0)

const doubled = computed(() => counter.value * 2)

watch(doubled, (v) => {
  console.log('New value: ' + v)
})
</script>
```

## Installation

```bash
npm i vue-global-api
```

Then import `vue-global-api` in your main entry to register the global apis **before any usages**

```ts
// main.js
import 'vue-global-api'
```

And enjoy :)

## Customization

By default, importing `vue-global-api` will register [all common composition apis](https://github.com/antfu/vue-global-api/blob/main/scripts/generate.ts) to the global object. If you want to have fine-grain control, use submodule per API:

```ts
// only register `ref` and `computed` as global APIs
import 'vue-global-api/ref'
import 'vue-global-api/computed'
```

### Collections

We have provided a few sub-set collections if you want to control the global API registration by their type.

```ts
// register all reactivity apis (`ref`, `computed`, `watch`, etc.)
import 'vue-global-api/reactivity'
// register all lifecycle hooks (`onMounted`, `onUpdated`, `onUnmounted`, etc.)
import 'vue-global-api/lifecycle'
// register component apis (`inject`, `provide`, `h`, etc.)
import 'vue-global-api/component'
```

## CDN Usage

If you want to have global api work in CDN, you don't actually need this package. All you need to do is:

```ts
Object.assign(window, Vue)
```

## Motivation

In [the latest `<script setup>`](https://github.com/vuejs/rfcs/pull/227), compile time macros like `defineProps` and `defineEmits` are now available globally without the need to import them from `vue`. So, as your components are likely to rely on composition APIs like `ref` and `computed`, why don't we just have them available globally as well?

## ESLint

If you use ESLint it'll complain about you using undefined variables. This package provides the ESLint config presets to solve it.

Extend in your ESLint config:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'vue-global-api'
  ]
};
```

It also provides the same collections and single API options for fine-grain control.

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    // collections
    'vue-global-api/reactivity',
    'vue-global-api/lifecycle',
    'vue-global-api/component',
    // single apis
    'vue-global-api/ref',
    'vue-global-api/toRef',
  ]
};
```

## License

MIT License © 2021 [Anthony Fu](https://github.com/antfu)
