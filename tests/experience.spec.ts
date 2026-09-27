import { test, expect } from '@playwright/test'

test('object studio supports configuration, keyboard rotation, pause and reset', async ({
  page,
}) => {
  await page.goto('/#/labs')
  const studio = page.locator('.object-studio')
  const stage = studio.locator('.object-stage')
  await stage.scrollIntoViewIfNeeded()
  await expect(stage).toHaveAttribute('data-renderer', /ready|fallback/, {
    timeout: 20000,
  })
  await studio.getByRole('button', { name: 'Facet', exact: true }).click()
  await studio.getByRole('button', { name: 'Chrome', exact: true }).click()
  await expect(stage).toHaveAttribute('data-shape', 'Facet')
  await expect(stage).toHaveAttribute('data-finish', 'Chrome')
  await studio.getByRole('slider').fill('80')
  await expect(studio.getByRole('slider')).toHaveValue('80')
  await studio.getByRole('button', { name: 'Rotate object left' }).focus()
  await page.keyboard.press('Enter')
  await studio.getByRole('button', { name: 'Pause spin' }).click()
  await expect(
    studio.getByRole('button', { name: 'Resume spin' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await studio.getByRole('button', { name: 'Reset object' }).click()
  await expect(stage).toHaveAttribute('data-shape', 'Knot')
  await expect(stage).toHaveAttribute('data-finish', 'Crimson')
  await expect(studio.getByRole('slider')).toHaveValue('25')
})

test('particle field and editable typography respond to controls', async ({
  page,
}) => {
  await page.goto('/#/labs')
  const field = page.locator('.particle-experiment')
  await field.getByRole('button', { name: 'Wave', exact: true }).click()
  await expect(field.locator('.particle-stage')).toHaveAttribute(
    'data-form',
    'Wave',
  )
  await field.getByRole('button', { name: 'Send a pulse' }).click()
  await expect(field.locator('.particle-stage')).toHaveAttribute(
    'data-pulse',
    '1',
  )
  await field.getByRole('button', { name: 'Pause field' }).click()
  await expect(
    field.getByRole('button', { name: 'Resume field' }),
  ).toBeVisible()
  const type = page.locator('.type-experiment')
  await type.getByRole('textbox').fill('client demo')
  await expect(type.getByRole('img', { name: 'CLIENT DEMO' })).toBeVisible()
  await type.getByRole('button', { name: 'Stretch', exact: true }).click()
  await expect(type.locator('.type-stage')).toHaveClass(/type-stretch/)
  await type.getByRole('slider').fill('1.5')
  await expect(type.getByRole('slider')).toHaveValue('1.5')
})

test('scroll story chapter controls work with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const story = page.getByRole('region', {
    name: 'Our approach to interactive experiences',
  })
  await story.getByRole('button', { name: '03 Stay.' }).click()
  await expect(story.locator('.story-scene')).toHaveAttribute(
    'data-chapter',
    '2',
  )
  await expect(story.getByRole('heading')).toHaveText(
    'Build a world worth spending time in.',
  )
  await story.getByRole('button', { name: '01 Feel.' }).click()
  await expect(story.locator('.story-scene')).toHaveAttribute(
    'data-chapter',
    '0',
  )
})
