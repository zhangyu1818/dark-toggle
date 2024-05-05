export interface Params {
  storage?: Storage
  key: string
}

export type Theme = 'light' | 'dark' | 'system'
export type SubScribeFunction = (isDark: boolean, theme: Theme | null) => void

export interface Return {
  isDark: boolean
  theme: Theme | null
  setTheme: (theme: Theme) => void
  toggle: VoidFunction
  subscribe: (cb: SubScribeFunction) => () => void
}

export const createDarkToggle = (params: Params): Return => {
  const { storage = window.sessionStorage, key } = params

  const listeners: Set<SubScribeFunction> = new Set()

  let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  let currentShouldDark = darkQuery.matches

  let storageTheme = storage.getItem(key) as Theme | null

  let isDark = shouldDark()

  function notify() {
    ;[...listeners].forEach((cb) => cb(isDark, storageTheme))
  }

  function shouldDark() {
    return (
      (currentShouldDark &&
        (storageTheme === null || storageTheme === 'system')) ||
      storageTheme === 'dark'
    )
  }

  function setTheme(theme: Theme) {
    setStorage(theme)
    isDark = shouldDark()
    notify()
  }

  function setStorage(theme: Theme) {
    storage.setItem(key, theme)
    storageTheme = theme
  }

  function toggle() {
    isDark = !isDark

    const next = isDark
      ? currentShouldDark
        ? 'system'
        : 'dark'
      : currentShouldDark
        ? 'light'
        : 'system'

    setStorage(next)

    notify()
  }

  darkQuery.onchange = (e) => {
    const current = storage.getItem(key) as Theme
    if (current === 'system' || current === null) {
      isDark = e.matches
      notify()
    }

    if (e.matches) {
      currentShouldDark = true
    }
  }

  return {
    get isDark() {
      return isDark
    },
    get theme() {
      return storage.getItem(key) as Theme | null
    },
    toggle,
    setTheme,
    subscribe(cb) {
      listeners.add(cb)
      cb(isDark, storageTheme)
      return () => {
        listeners.delete(cb)
      }
    },
  }
}
