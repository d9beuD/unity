export default () => {
  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = (theme: string) => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-un-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-un-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#switch-theme')
    if (toggle) {
      toggle.addEventListener('click', () => {
        const theme = getStoredTheme()
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setStoredTheme(newTheme)
        setTheme(newTheme)
      })
    }
  })
}