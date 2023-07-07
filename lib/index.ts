export const createDarkToggle = (
  key: string,
  onChange: (dark: boolean) => void,
) => {
  const storageTheme = localStorage.getItem(key)

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  let currentShouldDark = darkQuery.matches

  let isDark =
    (currentShouldDark && (storageTheme === null || storageTheme === 'auto')) ||
    storageTheme === 'dark'

  onChange(isDark)

  function toggle() {
    isDark = !isDark
    const next = isDark
      ? currentShouldDark
        ? 'auto'
        : 'dark'
      : currentShouldDark
      ? 'light'
      : 'auto'

    localStorage.setItem(key, next)

    onChange(isDark)
  }

  darkQuery.onchange = (e) => {
    const current = localStorage.getItem(key)
    if (current === 'auto' || current === null) {
      isDark = e.matches
      onChange(isDark)
    }

    if (e.matches) {
      currentShouldDark = true
    }
  }

  return toggle
}
