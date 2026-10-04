import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test('should load the admin operational console', async ({ page }) => {
    // Navigate to admin
    await page.goto('/admin');
    
    // Expect the admin sidebar
    await expect(page.locator('aside')).toContainText('Wakeru Admin');
    await expect(page.locator('h1')).toContainText('Operational Console');
  });
  
  test('should load the businesses list in admin', async ({ page }) => {
    await page.goto('/admin/businesses');
    await expect(page.locator('table')).toBeVisible();
  });
  
  test('should load the media moderation queue', async ({ page }) => {
    await page.goto('/admin/media');
    await expect(page.locator('h1')).toContainText('Media Moderation Queue');
  });
});
