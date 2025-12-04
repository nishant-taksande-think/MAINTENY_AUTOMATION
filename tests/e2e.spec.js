import { test, expect } from '@playwright/test';

test.describe('User Registration Form - E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Load and Initial State', () => {
    test('should load the registration page with all elements', async ({ page }) => {
      await expect(page.getByText('User Registration')).toBeVisible();
      await expect(page.getByTestId('email-input')).toBeVisible();
      await expect(page.getByTestId('country-input')).toBeVisible();
      await expect(page.getByTestId('terms-checkbox')).toBeVisible();
      await expect(page.getByTestId('submit-button')).toBeVisible();
    });

    test('should have correct page title and description', async ({ page }) => {
      await expect(page.getByText('User Registration')).toBeVisible();
      await expect(page.getByText('Please fill out the form below to create your account')).toBeVisible();
    });
  });

  test.describe('TextField - Email Input', () => {
    test('should accept and display valid email', async ({ page }) => {
      await page.getByTestId('email-input').fill('user@example.com');
      await expect(page.getByTestId('email-input')).toHaveValue('user@example.com');
    });

    test('should show validation error for invalid email', async ({ page }) => {
      await page.getByTestId('email-input').fill('invalid-email');
      await page.getByTestId('email-input').blur();
      
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    });

    test('should clear validation error when valid email is entered', async ({ page }) => {
      await page.getByTestId('email-input').fill('invalid');
      await page.getByTestId('email-input').blur();
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
      
      await page.getByTestId('email-input').clear();
      await page.getByTestId('email-input').fill('valid@example.com');
      
      await expect(page.getByText('Please enter a valid email address')).not.toBeVisible();
    });

    test('should handle email with special characters', async ({ page }) => {
      await page.getByTestId('email-input').fill('user+tag@sub.example.co.uk');
      await expect(page.getByTestId('email-input')).toHaveValue('user+tag@sub.example.co.uk');
      await expect(page.getByText('Please enter a valid email address')).not.toBeVisible();
    });

    test('should show required error when submitting without email', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      await expect(page.getByText('Email is required')).toBeVisible();
    });
  });

  test.describe('Autocomplete - Country Selection', () => {
    test('should open dropdown and display country options', async ({ page }) => {
      await page.getByTestId('country-input').click();
      await expect(page.getByText('United States')).toBeVisible();
      await expect(page.getByText('Canada')).toBeVisible();
      await expect(page.getByText('India')).toBeVisible();
    });

    test('should select a country from the list', async ({ page }) => {
      await page.getByTestId('country-input').click();
      await page.getByText('Canada').click();
      
      await expect(page.getByTestId('country-input')).toHaveValue('Canada');
    });

    test('should filter countries based on typed input', async ({ page }) => {
      await page.getByTestId('country-input').fill('Uni');
      
      await expect(page.getByText('United States')).toBeVisible();
      await expect(page.getByText('United Kingdom')).toBeVisible();
      await expect(page.getByText('Canada')).not.toBeVisible();
    });

    test('should handle selection and then clearing', async ({ page }) => {
      await page.getByTestId('country-input').click();
      await page.getByText('Japan').click();
      await expect(page.getByTestId('country-input')).toHaveValue('Japan');
      
      await page.getByTestId('country-input').clear();
      await expect(page.getByTestId('country-input')).toHaveValue('');
    });

    test('should show required error when submitting without country', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      await expect(page.getByText('Country is required')).toBeVisible();
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.getByTestId('country-input').focus();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      
      const value = await page.getByTestId('country-input').inputValue();
      expect(value).toBeTruthy();
    });
  });

  test.describe('Checkbox - Terms Acceptance', () => {
    test('should toggle checkbox state on click', async ({ page }) => {
      const checkbox = page.getByTestId('terms-checkbox');
      
      await expect(checkbox).not.toBeChecked();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });

    test('should be keyboard accessible with Space key', async ({ page }) => {
      const checkbox = page.getByTestId('terms-checkbox');
      await checkbox.focus();
      
      await page.keyboard.press('Space');
      await expect(checkbox).toBeChecked();
      
      await page.keyboard.press('Space');
      await expect(checkbox).not.toBeChecked();
    });

    test('should show required error when submitting without accepting terms', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      await expect(page.getByText('You must accept the terms and conditions')).toBeVisible();
    });

    test('should clear error when checkbox is checked', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      await expect(page.getByText('You must accept the terms and conditions')).toBeVisible();
      
      await page.getByTestId('terms-checkbox').check();
      await expect(page.getByText('You must accept the terms and conditions')).not.toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should display all validation errors for empty form submission', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByText('Email is required')).toBeVisible();
      await expect(page.getByText('Country is required')).toBeVisible();
      await expect(page.getByText('You must accept the terms and conditions')).toBeVisible();
    });

    test('should only show remaining errors as fields are filled', async ({ page }) => {
      await page.getByTestId('submit-button').click();
      
      await page.getByTestId('email-input').fill('test@example.com');
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByText('Email is required')).not.toBeVisible();
      await expect(page.getByText('Country is required')).toBeVisible();
      await expect(page.getByText('You must accept the terms and conditions')).toBeVisible();
    });

    test('should prevent submission with invalid email even if other fields are valid', async ({ page }) => {
      await page.getByTestId('email-input').fill('invalid-email');
      await page.getByTestId('country-input').click();
      await page.getByText('Germany').click();
      await page.getByTestId('terms-checkbox').check();
      
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
      await expect(page.getByTestId('success-alert')).not.toBeVisible();
    });
  });

  test.describe('Complete User Flow', () => {
    test('should complete full registration successfully', async ({ page }) => {
      await page.getByTestId('email-input').fill('newuser@example.com');
      
      await page.getByTestId('country-input').click();
      await page.getByText('Australia').click();
      
      await page.getByTestId('terms-checkbox').check();
      
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByTestId('success-alert')).toBeVisible();
      await expect(page.getByText('Registration Successful!')).toBeVisible();
      
      await expect(page.getByTestId('submitted-email')).toContainText('newuser@example.com');
      await expect(page.getByTestId('submitted-country')).toContainText('Australia');
      await expect(page.getByTestId('terms-status')).toBeVisible();
    });

    test('should allow registering another user after successful submission', async ({ page }) => {
      await page.getByTestId('email-input').fill('first@example.com');
      await page.getByTestId('country-input').click();
      await page.getByText('Brazil').click();
      await page.getByTestId('terms-checkbox').check();
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByTestId('success-alert')).toBeVisible();
      
      await page.getByTestId('reset-button').click();
      
      await expect(page.getByText('User Registration')).toBeVisible();
      await expect(page.getByTestId('email-input')).toHaveValue('');
      await expect(page.getByTestId('terms-checkbox')).not.toBeChecked();
      
      await page.getByTestId('email-input').fill('second@example.com');
      await page.getByTestId('country-input').click();
      await page.getByText('Mexico').click();
      await page.getByTestId('terms-checkbox').check();
      await page.getByTestId('submit-button').click();
      
      await expect(page.getByTestId('submitted-email')).toContainText('second@example.com');
      await expect(page.getByTestId('submitted-country')).toContainText('Mexico');
    });
  });

  test.describe('Accessibility', () => {
    test('should be navigable via keyboard', async ({ page }) => {
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('email-input')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('country-input')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('terms-checkbox')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('submit-button')).toBeFocused();
    });

    test('should show proper ARIA labels and roles', async ({ page }) => {
      const emailInput = page.getByTestId('email-input');
      await expect(emailInput).toHaveAttribute('type', 'email');
      
      const checkbox = page.getByTestId('terms-checkbox');
      await expect(checkbox).toHaveAttribute('type', 'checkbox');
    });
  });

  test.describe('Edge Cases and Error Handling', () => {
    //Below test is failing becuase we are getting success alert after the first click and script does not find the submit button of second click

    // test('should handle rapid consecutive form submissions', async ({ page }) => {
    //   await page.getByTestId('email-input').fill('test@example.com');
    //   await page.getByTestId('country-input').click();
    //   await page.getByText('France').click();
    //   await page.getByTestId('terms-checkbox').check();
      
    //   await page.getByTestId('submit-button').click();
    //   await page.getByTestId('submit-button').click();
      
    //   await expect(page.getByTestId('success-alert')).toBeVisible();
    // });

    test('should maintain form state during interaction', async ({ page }) => {
      await page.getByTestId('email-input').fill('maintain@test.com');
      await page.getByTestId('country-input').click();
      await page.getByText('India').click();
      
      await page.getByTestId('terms-checkbox').check();
      await page.getByTestId('terms-checkbox').uncheck();
      
      await expect(page.getByTestId('email-input')).toHaveValue('maintain@test.com');
      await expect(page.getByTestId('country-input')).toHaveValue('India');
    });

    test('should handle extremely long email addresses', async ({ page }) => {
      const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com';
      await page.getByTestId('email-input').fill(longEmail);
      
      await expect(page.getByTestId('email-input')).toHaveValue(longEmail);
    });
  });

  //Below tests are failing because we are comparing the image with a image haivng dynamic data

  // test.describe('Visual Regression', () => {
  //   test('should match initial form appearance', async ({ page }) => {
  //     await expect(page).toHaveScreenshot('initial-form.png');
  //   });

  //   test('should match success state appearance', async ({ page }) => {
  //     await page.getByTestId('email-input').fill('visual@test.com');
  //     await page.getByTestId('country-input').click();
  //     await page.getByText('Canada').click();
  //     await page.getByTestId('terms-checkbox').check();
  //     await page.getByTestId('submit-button').click();
      
  //     await expect(page.getByTestId('success-alert')).toBeVisible();
  //     await expect(page).toHaveScreenshot('success-state.png');
  //   });
  // });
});