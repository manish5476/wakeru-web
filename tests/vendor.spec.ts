import { test, expect } from '@playwright/test';

test.describe('Vendor Flow', () => {
  test('should load the vendor dashboard', async ({ page }) => {
    // Navigate to vendor dashboard
    await page.goto('/vendor');
    
    // Expect the sidebar and title
    await expect(page.locator('aside')).toContainText('Vendor Portal');
    
    // Wait for the business list to resolve
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });
  
  test('should navigate to business details', async ({ page }) => {
    await page.goto('/vendor/businesses/test-id');
    // Basic check for the editor tabs
    await expect(page.locator('body')).toContainText('Vendor Portal');
  });
});
