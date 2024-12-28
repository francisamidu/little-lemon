import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('Little Lemon Restaurant', () => {
  test('renders page title correctly', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement.textContent).toBe('Little Lemon');
  });

  test('renders booking form correctly', () => {
    render(<App />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();

    const dateInput = screen.getByLabelText(/date/i);
    expect(dateInput).toBeInTheDocument();

    const timeInput = screen.getByLabelText(/time/i);
    expect(timeInput).toBeInTheDocument();

    const guestsInput = screen.getByLabelText(/guests/i);
    expect(guestsInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { type: 'submit' });
    expect(submitButton).toBeInTheDocument();
  });

  test('validates name field', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Name is required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates date field', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Date is required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates time field', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Time is required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates guests field - empty', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Please enter a valid number of guests');
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates guests field - invalid input (text)', async () => {
    render(<App />);
    const guestsInput = screen.getByLabelText(/guests/i);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.type(guestsInput, 'abc'); 
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Please enter a valid number of guests');
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates guests field - invalid input (negative number)', async () => {
    render(<App />);
    const guestsInput = screen.getByLabelText(/guests/i);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.type(guestsInput, '-1'); 
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Please enter a valid number of guests');
    expect(errorMessage).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/guests/i);
    const submitButton = screen.getByRole('button', { type: 'submit' });

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(dateInput, '2024-12-31'); 
    userEvent.type(timeInput, '19:00');
    userEvent.type(guestsInput, '2');

    userEvent.click(submitButton);

    // **Assuming successful submission, check if the form is cleared**
    expect(nameInput.value).toBe('');
    expect(dateInput.value).toBe('');
    expect(timeInput.value).toBe('');
    expect(guestsInput.value).toBe(''); 
  });

});