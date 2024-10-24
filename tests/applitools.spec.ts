import { test } from '@playwright/test';
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  VisualGridRunner,
  BrowserType,
  Eyes,
  Target,
  AccessibilityLevel,
  AccessibilityGuidelinesVersion,
  AccessibilityRegionType,
} from '@applitools/eyes-playwright';

let Runner: EyesRunner;
let Config: Configuration;
let Batch: BatchInfo;

test.beforeAll(async () => {
  Runner = new VisualGridRunner({ testConcurrency: 1 });
  Batch = new BatchInfo({ name: 'Visual Testing Comparison' });

  Config = new Configuration();
  Config.setBatch(Batch);

  // Minimale Konfiguration
  Config.addBrowsers({ name: BrowserType.CHROME, width: 1200, height: 800 });

  Config.setAccessibilityValidation({
    level: AccessibilityLevel.AA,
    guidelinesVersion: AccessibilityGuidelinesVersion.WCAG_2_1,
  });
});

test.describe('Visual Testing Comparison: Applitools Advantages', () => {
  let eyes: Eyes;

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);
    try {
      await eyes.open(page, 'Demo App', test.info().title, { width: 1200, height: 800 });
    } catch {
      console.error('Error opening eyes');
    }
  });

  test('should capture homepage with AI-powered analysis', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    await eyes.check('Home Page - With AI Analysis', Target.window().fully());
  });

  test('should handle A/B testing with multiple baselines', async ({ page }) => {
    await page.goto('http://localhost:5173/ab-test');
    await page.waitForLoadState('networkidle');

    // Variant A with dedicated baseline
    const configA = new Configuration(Config);
    configA.setBaselineEnvName('Variant-A');
    await eyes.setConfiguration(configA);
    await eyes.check('A/B Test - Variant A', Target.window().fully());

    // Variant B with dedicated baseline
    const configB = new Configuration(Config);
    configB.setBaselineEnvName('Variant-B');
    await eyes.setConfiguration(configB);
    await eyes.check('A/B Test - Variant B', Target.window().fully());
  });

  test('should validate accessibility with WCAG guidelines', async ({ page }) => {
    await page.goto('http://localhost:5173/accessibility');
    await page.waitForLoadState('networkidle');

    await eyes.check(
      'Accessibility Validation',
      Target.window()
        .fully()
        .accessibilityRegion(
          { selector: '.poor-contrast-text' },
          AccessibilityRegionType.RegularText
        )
    );
  });

  test('should handle dynamic content with AI matching', async ({ page }) => {
    await page.goto('http://localhost:5173/dynamic-content');
    await page.waitForLoadState('networkidle');

    await eyes.check('Dynamic Content - Initial', Target.window().fully());
    await page.waitForTimeout(2000);
    await eyes.check('Dynamic Content - After Update', Target.window().fully());
  });

  test('should test form states with smart region matching', async ({ page }) => {
    await page.goto('http://localhost:5173/login-form');
    await page.waitForLoadState('networkidle');

    await eyes.check('Login Form - Empty', Target.window().fully());

    await page.fill('input[type="text"]', 'testuser');
    await page.fill('input[type="password"]', 'password');
    await eyes.check('Login Form - Filled', Target.window().fully());
  });

  test('should verify responsive design with exact layout matching', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    await eyes.check('Responsive - Desktop', Target.window().fully());

    await page.setViewportSize({ width: 768, height: 1024 });
    await eyes.check('Responsive - Tablet', Target.window().fully());

    await page.setViewportSize({ width: 375, height: 667 });
    await eyes.check('Responsive - Mobile', Target.window().fully());
  });

  test('should demonstrate advanced layout testing capabilities', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Warte explizit auf die Elemente
    await page.waitForSelector('.feature-card', { state: 'visible' });

    await eyes.check(
      'Advanced Layout Analysis',
      Target.window()
        .fully()
        // Prüfe das Layout der Feature-Cards
        .region({ selector: '.features' })
        // Floating-Region für die Navigation
        .floatingRegion({
          region: { selector: '.nav-links' },
          maxUpOffset: 10,
          maxDownOffset: 10,
          maxLeftOffset: 10,
          maxRightOffset: 10,
        })
        // Ignoriere dynamische Hover-Effekte
        .ignoreRegions('.feature-card:hover')
    );

    // Optional: Teste auch das Layout nach einer Interaktion
    await page.hover('.feature-card:first-child');
    await eyes.check(
      'Layout After Interaction',
      Target.window().fully().region({ selector: '.features' })
    );
  });

  test.afterEach(async () => {
    try {
      await eyes?.close(false);
    } catch {
      // Silent error handling
    }
  });
});

test.afterAll(async () => {
  try {
    await Runner.getAllTestResults(false).then(() => {});
  } catch {
    console.error('Error in test execution');
  }
});
