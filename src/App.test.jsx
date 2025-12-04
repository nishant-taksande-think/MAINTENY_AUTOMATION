import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './app';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  describe('Initial Render', () => {
    it('should render the registration form with all components', () => {
      expect(screen.getByText('User Registration')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('country-input')).toBeInTheDocument();
      expect(screen.getByTestId('terms-checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('should have empty initial form values', () => {
      expect(screen.getByTestId('email-input')).toHaveValue('');
      expect(screen.getByTestId('terms-checkbox')).not.toBeChecked();
    });
  });

  describe('TextField Component - Email Validation', () => {
    it('should accept valid email input', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    it('should show error for invalid email format', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'invalid-email');
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should clear error when valid email is entered', async () => {
      const emailInput = screen.getByTestId('email-input');
      
      await userEvent.type(emailInput, 'invalid');
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
      
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'valid@email.com');
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    it('should handle special characters in email', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'user+test@example.co.uk');
      
      expect(emailInput).toHaveValue('user+test@example.co.uk');
    });
  });

  describe('Autocomplete Component - Country Selection', () => {
    it('should allow country selection from dropdown', async () => {
      const countryInput = screen.getByTestId('country-input');
      
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'Canada');
      
      const option = await screen.findByText('Canada');
      fireEvent.click(option);
      
      await waitFor(() => {
        expect(countryInput).toHaveValue('Canada');
      });
    });

    it('should filter countries based on input', async () => {
      const countryInput = screen.getByTestId('country-input');
      
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'United');
      
      expect(await screen.findByText('United States')).toBeInTheDocument();
      expect(await screen.findByText('United Kingdom')).toBeInTheDocument();
    });

    it('should handle clearing country selection', async () => {
      const countryInput = screen.getByTestId('country-input');
      
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'Japan');
      
      const option = await screen.findByText('Japan');
      fireEvent.click(option);
      
      await waitFor(() => {
        expect(countryInput).toHaveValue('Japan');
      });
      
      await userEvent.clear(countryInput);
      expect(countryInput).toHaveValue('');
    });
  });

  describe('Checkbox Component - Terms Acceptance', () => {
    it('should toggle checkbox on click', async () => {
      const checkbox = screen.getByTestId('terms-checkbox');
      
      expect(checkbox).not.toBeChecked();
      
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      
      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('should be keyboard accessible', async () => {
      const checkbox = screen.getByTestId('terms-checkbox');
      checkbox.focus();
      
      await userEvent.keyboard(' ');
      expect(checkbox).toBeChecked();
      
      await userEvent.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Form Validation', () => {
    it('should show all validation errors when submitting empty form', async () => {
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Country is required')).toBeInTheDocument();
        expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
      });
    });

    it('should only show specific validation errors for incomplete fields', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'test@example.com');
      
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(screen.getByText('Country is required')).toBeInTheDocument();
        expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit successfully with valid data', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'test@example.com');
      
      const countryInput = screen.getByTestId('country-input');
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'Canada');
      const countryOption = await screen.findByText('Canada');
      fireEvent.click(countryOption);
      
      const checkbox = screen.getByTestId('terms-checkbox');
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('success-alert')).toBeInTheDocument();
        expect(screen.getByTestId('submitted-email')).toHaveTextContent('test@example.com');
        expect(screen.getByTestId('submitted-country')).toHaveTextContent('Canada');
      });
    });

    it('should allow resetting form after successful submission', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'test@example.com');
      
      const countryInput = screen.getByTestId('country-input');
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'India');
      const countryOption = await screen.findByText('India');
      fireEvent.click(countryOption);
      
      const checkbox = screen.getByTestId('terms-checkbox');
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('success-alert')).toBeInTheDocument();
      });
      
      const resetButton = screen.getByTestId('reset-button');
      await userEvent.click(resetButton);
      
      await waitFor(() => {
        expect(screen.getByText('User Registration')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toHaveValue('');
        expect(screen.getByTestId('terms-checkbox')).not.toBeChecked();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid input changes', async () => {
      const emailInput = screen.getByTestId('email-input');
      
      await userEvent.type(emailInput, 'test');
      await userEvent.type(emailInput, '@');
      await userEvent.type(emailInput, 'example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should prevent form submission with invalid email even if other fields are valid', async () => {
      const emailInput = screen.getByTestId('email-input');
      await userEvent.type(emailInput, 'invalid-email');
      
      const countryInput = screen.getByTestId('country-input');
      fireEvent.click(countryInput);
      await userEvent.type(countryInput, 'France');
      const countryOption = await screen.findByText('France');
      fireEvent.click(countryOption);
      
      const checkbox = screen.getByTestId('terms-checkbox');
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.queryByTestId('success-alert')).not.toBeInTheDocument();
      });
    });
  });
});