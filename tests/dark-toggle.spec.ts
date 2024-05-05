import { test, expect, type BrowserContext, type Page } from '@playwright/test'

const setup = () => {
  let context: BrowserContext

  let page: Page

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('/')
  })

  test.afterAll(async () => {
    await context.close()
  })

  return {
    get page() {
      return page
    },
  }
}

test.describe('(prefer-color-schema:light)', () => {
  const context = setup()

  test('theme should be system setting or light', async () => {
    await expect(context.page.locator('html')).not.toHaveClass('dark')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('')
  })

  test('clicking the button switches to dark theme', async () => {
    await context.page.click('button')
    await expect(context.page.locator('html')).toHaveClass('dark')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('dark')
  })

  test('clicking the button again switches back to system theme', async () => {
    await context.page.click('button') // dark
    await context.page.click('button') // light
    await expect(context.page.locator('html')).not.toHaveClass('dark')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')
  })
})

test.describe('(prefer-color-schema:dark)', () => {
  test.use({ colorScheme: 'dark' })

  const context = setup()

  test('theme should be system setting or dark', async () => {
    await expect(context.page.locator('html')).not.toHaveClass('light')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('')
  })

  test('clicking the button switches to light theme', async () => {
    await context.page.click('button')
    await expect(context.page.locator('html')).toHaveClass('light')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('light')
  })

  test('clicking the button again switches back to system theme', async () => {
    await context.page.click('button')
    await context.page.click('button')
    await expect(context.page.locator('html')).not.toHaveClass('light')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')
  })
})

test.describe('(prefer-color-schema:light) auto switch to dark', () => {
  const context = setup()

  test('default theme should auto switch', async () => {
    await context.page.emulateMedia({ colorScheme: 'dark' })

    await expect(context.page.locator('html')).toHaveClass('dark')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('')
  })

  test('changed theme should not auto switch', async () => {
    await context.page.click('button')
    await expect(context.page.locator('html')).toHaveClass('dark')

    await context.page.emulateMedia({ colorScheme: 'light' })

    await expect(context.page.locator('html')).toHaveClass('dark')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('dark')
  })

  test('system theme should auto switch', async () => {
    await context.page.click('button') // dark
    await context.page.click('button') // light -> system

    await expect(context.page.locator('html')).toHaveClass('light')
    let themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')

    await context.page.emulateMedia({ colorScheme: 'dark' })

    await expect(context.page.locator('html')).toHaveClass('dark')
    themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')
  })
})

test.describe('(prefer-color-schema:dark) auto switch to light', () => {
  test.use({ colorScheme: 'dark' })

  const context = setup()

  test('default theme should auto switch', async () => {
    await context.page.emulateMedia({ colorScheme: 'light' })

    await expect(context.page.locator('html')).toHaveClass('light')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('')
  })

  test('changed theme should not auto switch', async () => {
    await context.page.click('button')
    await expect(context.page.locator('html')).toHaveClass('light')

    await context.page.emulateMedia({ colorScheme: 'dark' })

    await expect(context.page.locator('html')).toHaveClass('light')
    const themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('light')
  })

  test('system theme should auto switch', async () => {
    await context.page.click('button') // light
    await context.page.click('button') // dark -> system

    await expect(context.page.locator('html')).toHaveClass('dark')
    let themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')

    await context.page.emulateMedia({ colorScheme: 'light' })

    await expect(context.page.locator('html')).toHaveClass('light')
    themeAttribute = await context.page
      .locator('html')
      .getAttribute('data-theme')
    expect(themeAttribute).toBe('system')
  })
})
