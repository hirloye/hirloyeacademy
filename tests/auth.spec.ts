import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test('Admin Login page loads correctly', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Expect the page to have a specific title or heading
    await expect(page.getByText('Admin Portal')).toBeVisible();
    
    // Expect login form elements
    await expect(page.getByPlaceholder('Enter username')).toBeVisible();
    await expect(page.getByPlaceholder('Enter password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('Staff Login page loads correctly', async ({ page }) => {
    await page.goto('/staff');
    
    // Expect the page to have a specific title or heading
    await expect(page.getByText('Staff Portal')).toBeVisible();
    
    // Expect login form elements
    await expect(page.getByPlaceholder('e.g. hly04')).toBeVisible();
    await expect(page.getByPlaceholder('••••')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('Student Login page loads correctly', async ({ page }) => {
    await page.goto('/student-login');
    
    // Expect the page to have a specific title or heading
    await expect(page.getByText('Student Portal')).toBeVisible();
    
    // Expect login form elements
    await expect(page.getByPlaceholder('john.doe')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });
});
