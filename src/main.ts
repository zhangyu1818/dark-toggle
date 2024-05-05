import { createDarkToggle } from '../lib'

const darkToggle = createDarkToggle({
  key: 'theme',
})

darkToggle.subscribe((dark, theme) => {
  if (dark) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
  document.documentElement.setAttribute('data-theme', theme ?? '')
})

const btn = document.querySelector('button')!

btn.onclick = darkToggle.toggle
