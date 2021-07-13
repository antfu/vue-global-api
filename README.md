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

Then import `vue-global-api` in your main entry to register the global apis 

```ts
// main.js
import 'vue-global-api'
```

And enjoy :)

> If using eslint, you may need to turn off [`no-undef`](https://eslint.org/docs/rules/no-undef) to prevent eslint errors.

## Customization

By default, importing `vue-global-api` will register [common composition apis](https://github.com/antfu/vue-global-api/blob/main/scripts/generate.ts) to the global object. If you want to have fine-grain control, use submodule per api:

```ts
// only register `ref` and `computed` as global APIs
import 'vue-global-api/ref'
import 'vue-global-api/computed'
```

## CDN Usage

If you want to have global api work in CDN, you don't actually need this package. All you need to do is:

```ts
Object.assign(window, Vue)
```

## Motivation

In [the latest `<script setup>`](https://github.com/vuejs/rfcs/pull/227), compile time macros like `defineProps` and `defineEmits` are now available globally without the need to import them from `vue`. So, as your components are likely to rely on composition APIs like `ref` and `computed`, why don't we just have them available globally as well?


## License

MIT License © 2021 [Anthony Fu](https://github.com/antfu)
