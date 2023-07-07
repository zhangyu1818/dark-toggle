# dark-toggle

Correct dark theme switching logic.

---

The color schema should not be controlled only by JavaScript, and the theme should be restored when the theme and the color schema are consistent.

## install

```shell
pnpm i dark-toggle
```

## usage

```ts
import { createDarkToggle } from 'dark-toggle'

const toggle = createDarkToggle('theme', (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

const btn = document.querySelector('button')!

btn.onclick = toggle
```
