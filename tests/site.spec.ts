import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  '/',
  '/work',
  '/work/forma',
  '/work/offscript',
  '/work/noma',
  '/work/signal',
  '/studio',
  '/labs',
  '/openings',
  '/openings/brand-designer',
  '/openings/creative-developer',
  '/openings/motion-designer',
  '/shop',
  '/contact',
  '/privacy',
]

test('all pages render without errors, missing headings, or horizontal overflow', async ({
  page,
}) => {
  test.setTimeout(90_000)
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  for (const route of routes) {
    await page.goto(`/#${route}`)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('OUTSIDE THE FRAME')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      `overflow on ${route}`,
    ).toBeTruthy()
    await expect(page).toHaveTitle(/Mainframe/)
  }
  expect(errors).toEqual([])
})

test('navigation, filters, case studies, back, and recovery work', async ({
  page,
  isMobile,
}) => {
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: 'Menu +' }).click()
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Work', exact: true })
    .click()
  await expect(page).toHaveURL(/#\/work$/)
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.getByRole('button', { name: 'Digital' }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await page.locator('.project-card').first().click()
  await expect(page.locator('h1')).toContainText('Offscript')
  await expect(page.locator('main')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/#\/work$/)
  await page.goto('/#/missing-page')
  await expect(page.getByText('404 / OUTSIDE THE FRAME')).toBeVisible()
  await page.getByRole('link', { name: 'Back to Mainframe' }).click()
  await expect(page.locator('h1')).toContainText('Made to')
})

test('shop selection persists, filters, removes, and builds an enquiry', async ({
  page,
}) => {
  await page.goto('/#/shop')
  await page.getByRole('button', { name: 'Add to selection' }).first().click()
  await expect(page.locator('.selection-panel')).toContainText('Stay Open')
  const href = await page
    .getByRole('link', { name: 'Enquire by email' })
    .getAttribute('href')
  expect(decodeURIComponent(href!)).toContain('Stay Open — Edition 001')
  await page.reload()
  await expect(
    page.getByRole('button', { name: 'Saved to your selection' }),
  ).toHaveCount(1)
  await page.getByRole('button', { name: 'Objects', exact: true }).click()
  await expect(page.locator('.product-card')).toHaveCount(2)
  await page.getByRole('button', { name: 'All objects', exact: true }).click()
  await page.getByRole('button', { name: 'Saved to your selection' }).click()
  await expect(
    page.getByRole('link', { name: 'Enquire by email' }),
  ).toHaveCount(0)
})

test('invalid local preferences recover without breaking the site', async ({
  page,
}) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.setItem('mainframe-selection', '["unknown-product"]')
    localStorage.setItem('mainframe-motion', '{broken')
  })
  await page.goto('/#/shop')
  await page.reload()
  await expect(page.locator('.selection-panel')).toContainText(
    'YOUR SELECTION / 0',
  )
  await expect(page.locator('h1')).toBeVisible()
})

test('Labs controls update the experiment and reset', async ({ page }) => {
  await page.goto('/#/labs')
  await page.getByRole('button', { name: 'bloom', exact: true }).click()
  await expect(page.locator('.lab-canvas .sculpture')).toHaveClass(/bloom/)
  await page.getByLabel(/TEMPO/).fill('1.7')
  await page.getByLabel(/COLOR SHIFT/).fill('180')
  await expect(page.locator('.lab-canvas .sculpture')).toHaveAttribute(
    'style',
    /180deg/,
  )
  await page.getByRole('button', { name: 'Pause motion' }).click()
  await expect(page.locator('.lab-canvas')).toHaveClass(/is-paused/)
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.getByLabel(/TEMPO/)).toHaveValue('1')
  await expect(page.getByLabel(/COLOR SHIFT/)).toHaveValue('0')
  await expect(page.locator('.lab-canvas .sculpture')).toHaveClass(/orbit/)
})

test('enquiry validates, prepares correct email, and invalidates edited drafts', async ({
  page,
}) => {
  await page.goto('/#/contact?service=Brand%20identity')
  await expect(page.getByLabel('I’m interested in')).toHaveValue(
    'Brand identity',
  )
  await page.getByRole('button', { name: 'Prepare my enquiry' }).click()
  await expect(page.locator('.form-success')).toHaveCount(0)
  await page.getByLabel('Your name').fill('Alex Morgan')
  await page
    .getByLabel('Email address', { exact: false })
    .fill('alex@example.com')
  await page
    .getByLabel('A little about your project')
    .fill('We are launching a new identity and website this year.')
  await page.getByRole('button', { name: 'Prepare my enquiry' }).click()
  await expect(page.getByText('Your brief is ready.')).toBeVisible()
  const draft = await page
    .getByRole('link', { name: 'Open email draft' })
    .getAttribute('href')
  expect(decodeURIComponent(draft!)).toContain('Alex Morgan')
  expect(decodeURIComponent(draft!)).toContain('Brand identity')
  expect(decodeURIComponent(draft!)).toContain('alex@example.com')
  await page.getByLabel('Your name').fill('Taylor')
  await expect(page.locator('.form-success')).toHaveCount(0)
})

test('motion preferences persist and operating system preference wins', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Motion on/ }).click()
  await expect(page.locator('html')).toHaveClass(/motion-off/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/motion-off/)
  await page.getByRole('button', { name: /Motion off/ }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(
    await page
      .locator('.orbital-object')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
})

test('mobile menu closes with Escape and keyboard focus returns', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Mobile menu only')
  await page.goto('/')
  await page.getByRole('button', { name: 'Menu +' }).click()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Menu +' })).toBeFocused()
})

for (const route of [
  '/',
  '/work',
  '/work/forma',
  '/work/offscript',
  '/work/noma',
  '/work/signal',
  '/studio',
  '/labs',
  '/shop',
  '/contact',
  '/openings',
  '/openings/creative-developer',
  '/privacy',
]) {
  test(`accessibility checks: ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`/#${route}`)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
