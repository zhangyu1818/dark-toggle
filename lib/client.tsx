'use client'

import React from 'react'
import { createDarkToggle, type Return } from './index'

declare global {
  interface Window {
    darkToggle: Return
  }
}

const serverDefault: Return = {
  isDark: false,
  theme: null,
  toggle: () => {},
  setTheme: () => {},
  subscribe: () => () => {},
}

const isServer = typeof window === 'undefined'
const context = React.createContext<Return>(serverDefault)

export interface DarkToggleProviderProps {
  children: React.ReactNode
}

export const DarkToggleScript = () => {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `const createDarkToggle=${createDarkToggle.toString()};window.darkToggle=createDarkToggle({key:"theme"});window.darkToggle.subscribe((isDark,theme)=>{document.documentElement.classList.add(isDark?"dark":"light");document.documentElement.classList.remove(isDark?"light":"dark");document.documentElement.setAttribute("data-theme",theme||"")});`,
      }}
    />
  )
}

export const DarkToggleProvider = (props: DarkToggleProviderProps) => {
  const [isDark, setIsDark] = React.useState(serverDefault.isDark)
  const [theme, setTheme] = React.useState(serverDefault.theme)

  React.useEffect(() => {
    return window.darkToggle.subscribe((isDark, theme) => {
      setIsDark(isDark)
      setTheme(theme)
    })
  }, [])

  if (isServer) {
    return props.children
  }

  return (
    <context.Provider
      value={{
        ...window.darkToggle,
        isDark,
        theme,
      }}
    >
      {props.children}
    </context.Provider>
  )
}

export const useDarkToggle = () => {
  return React.useContext(context)
}
