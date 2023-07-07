import { createDarkToggle } from '../lib'

const toggle = createDarkToggle('theme', (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

const btn = document.querySelector('button')!

btn.onclick = toggle
