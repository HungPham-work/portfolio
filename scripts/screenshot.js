import { chromium } from 'playwright';

const URL = process.env.APP_URL || 'http://localhost:4321';

const browser = await chromium.launch({
  headless: true
});

const viewports = [
  {
    name: 'desktop',
    width: 1440,
    height: 900
  },
  {
    name: 'tablet',
    width: 768,
    height: 1024
  },
  {
    name: 'mobile',
    width: 390,
    height: 844
  }
];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: {
      width: vp.width,
      height: vp.height
    }
  });

  await page.goto(URL, {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(2000);

  await page.screenshot({
    path: `review-${vp.name}.png`,
    fullPage: true
  });

  await page.close();

  console.log(`Saved review-${vp.name}.png`);
}

await browser.close();