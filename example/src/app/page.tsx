'use client'

import { useDarkToggle } from 'dark-toggle/react'

export default function Home() {
  const { isDark, theme, toggle } = useDarkToggle()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>isDark: {`${isDark}`}</p>
      <p>theme: {theme}</p>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
}
