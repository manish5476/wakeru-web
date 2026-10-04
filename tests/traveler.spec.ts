import { test, expect } from '@playwright/test';

test.describe('Traveler Flow', () => {
  test('should load the traveler discovery page', async ({ page }) => {
    // Navigate to the discovery page
    await page.goto('/discover');
    
    // Expect the page title and basic structure
    await expect(page.locator('h1')).toContainText('Explore Destinations');
    
    // Wait for the businesses to load (or the empty state)
    // Since this hits an API, it might show "No local options" or cards
    const noOptions = page.locator('text=No local options found nearby');
    const cards = page.locator('.max-w-7xl > .grid > a');
    
    await Promise.race([
      expect(noOptions).toBeVisible(),
      expect(cards.first()).toBeVisible()
    ]);
  });
  
  test('should allow navigation to bookings', async ({ page }) => {
    await page.goto('/bookings');
    await expect(page.locator('h1')).toContainText('My Bookings');
  });
});
