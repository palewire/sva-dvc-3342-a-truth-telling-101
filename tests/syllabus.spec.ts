import { expect, test } from '@playwright/test';

test('shows the SVA course facts without artwork in the hero', async ({ page }) => {
  await page.goto('./');

  await expect(page).toHaveTitle(
    'Truth-Telling 101: Artists Meet Data Journalism | SVA Continuing Education'
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Fall 2026 syllabus/
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Truth-Telling 101:\s*Artists Meet Data Journalism/
  );
  await expect(page.locator('.hero')).toContainText('DVC-3342-A');
  await expect(page.locator('.hero')).toContainText('Oct. 5–Nov. 9, 2026');
  await expect(page.locator('.hero')).toContainText('6:30–9:30 p.m.');
  await expect(page.locator('.hero')).toContainText('In person');
  await expect(page.locator('.hero')).toContainText('Ben Welsh');
  await expect(page.locator('.hero img, .hero svg, .hero canvas')).toHaveCount(0);
  await expect(page.locator('.site-nav')).toHaveCount(0);
  await expect(page.locator('.hero-official')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Official SVA course listing/ })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('CUNY');
});

test('links the instructor photo to the bio page', async ({ page }) => {
  await page.goto('./');

  const photoLink = page.locator('.instructor-avatar');
  await expect(photoLink).toHaveAttribute('href', 'https://palewi.re/who-is-ben-welsh/');
  await expect(photoLink.locator('img')).toHaveAttribute('src', /\/ben-welsh\.jpg$/);
  await expect(page.locator('.instructor-affiliation')).toHaveText(
    'News Applications Editor, Reuters'
  );
  await expect(
    page.locator('.instructor-details > p:not(.instructor-affiliation)')
  ).toHaveText(
    'I am a reporter, editor and computer programmer with more than 20 years of journalism experience. You contact me at b@palewi.re.'
  );
  await expect(
    page.locator('.instructor-details a[href="mailto:b@palewi.re"]')
  ).toHaveText('b@palewi.re');
});

test('lists all six unpublished class dates as plain text', async ({ page }) => {
  await page.goto('./');

  const dates = [
    ['2026-10-05', 'Monday, Oct. 5'],
    ['2026-10-12', 'Monday, Oct. 12'],
    ['2026-10-19', 'Monday, Oct. 19'],
    ['2026-10-26', 'Monday, Oct. 26'],
    ['2026-11-02', 'Monday, Nov. 2'],
    ['2026-11-09', 'Monday, Nov. 9']
  ];
  const weeks = page.locator('.week-card');
  await expect(weeks).toHaveCount(dates.length);

  for (const [index, [date, label]] of dates.entries()) {
    const week = weeks.nth(index);
    await expect(week.locator('time')).toHaveAttribute('datetime', date);
    await expect(week.locator('time')).toHaveText(label);
    await expect(week.locator('.week-topic')).toHaveText('To be announced');
    await expect(week.locator('a')).toHaveCount(0);
  }
  await expect(page.locator('a[href*="/weeks/"]')).toHaveCount(0);
});

test('names the three booked guests without assigning dates', async ({ page }) => {
  await page.goto('./');

  const speakers = [
    [
      'Caitlin Ostroff',
      'The Wall Street Journal',
      'https://www.wsj.com/news/author/caitlin-ostroff'
    ],
    ['Haidee Chu', 'The City Reporter', 'https://www.thecityreporter.nyc/author/haidee/'],
    ['Bianca Pallaro', 'The New York Times', 'https://www.nytimes.com/by/bianca-pallaro']
  ];
  const cards = page.locator('.speaker-card');
  await expect(cards).toHaveCount(speakers.length);

  for (const [index, [name, newsroom, url]] of speakers.entries()) {
    const card = cards.nth(index);
    await expect(card).toHaveAttribute('href', url);
    await expect(card.getByRole('heading', { name })).toBeVisible();
    await expect(card.locator('.speaker-info p')).toHaveText(newsroom);
    await expect(card.locator('.portrait-initials')).toHaveCount(0);
    if (name === 'Caitlin Ostroff') {
      await expect(card.locator('img')).toHaveAttribute(
        'src',
        /\/speakers\/caitlin-ostroff\.jpg$/
      );
    } else if (name === 'Haidee Chu') {
      await expect(card.locator('img')).toHaveAttribute(
        'src',
        /\/speakers\/haidee-chu\.jpg$/
      );
    } else if (name === 'Bianca Pallaro') {
      await expect(card.locator('img')).toHaveAttribute(
        'src',
        /\/speakers\/bianca-pallaro\.png$/
      );
    } else {
      await expect(card.locator('img')).toHaveCount(0);
    }
  }
  await expect(page.locator('.guests-section')).toContainText(
    "Three of the city's best data reporters will join our class to share how they turn data into impactful journalism."
  );
});

test('fits a phone screen and supports the keyboard skip link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator('.week-card')).toHaveCount(6);
  await expect(page.locator('.speaker-card')).toHaveCount(3);

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('prints the syllabus in black on white without navigation or portrait blocks', async ({
  page
}) => {
  await page.goto('./');
  await page.emulateMedia({ media: 'print' });

  await expect(page.locator('.site-nav')).toBeHidden();
  await expect(page.locator('.hero-official')).toBeHidden();
  for (const portrait of await page.locator('.speaker-portrait').all()) {
    await expect(portrait).toBeHidden();
  }
  await expect(page.locator('.week-card')).toHaveCount(6);
  expect(
    await page
      .locator('.hero')
      .evaluate((element) => getComputedStyle(element).backgroundColor)
  ).toBe('rgb(255, 255, 255)');
  expect(
    await page.locator('.hero h1').evaluate((element) => getComputedStyle(element).color)
  ).toBe('rgb(0, 0, 0)');
  expect(
    await page
      .locator('.schedule-section .section-kicker')
      .evaluate((element) => getComputedStyle(element).color)
  ).toBe('rgb(0, 0, 0)');
});
