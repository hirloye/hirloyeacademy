import { test, expect } from '@playwright/test';

test.describe('Usability & Smoke Tests', () => {
  test('Landing page loads properly', async ({ page }) => {
    await page.goto('/');
    
    // Check if main heading or logo is present
    await expect(page.getByText(/Hirloye/i).first()).toBeVisible();
    
    // Check main navigation links in the header/footer
    // We'll just ensure there's at least one link on the page
    const links = page.locator('a').first();
    await expect(links).toBeVisible();
    
    // Ensure footer is visible
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Portals navigation from landing page', async ({ page }) => {
    await page.goto('/');
    
    // Check if there are login buttons for portals
    const loginLink = page.getByRole('link', { name: /login/i }).first();
    if (await loginLink.isVisible()) {
        await expect(loginLink).toHaveAttribute('href', /.*login.*/);
    }
  });
});
