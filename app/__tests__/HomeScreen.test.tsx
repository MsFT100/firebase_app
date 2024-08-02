import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/Signin'; // adjust path as needed

test('renders home screen and button click', () => {
  render(<HomeScreen />);

  // Check if specific text is present
  expect(screen.getByText(/welcome/i)).toBeTruthy();

  // Simulate button click
  fireEvent.press(screen.getByText('Clear Tasks'));

  // Add assertions for expected outcomes
  expect(screen.queryByText(/task removed/i)).toBeTruthy(); // Adjust this according to your actual outcome
});
