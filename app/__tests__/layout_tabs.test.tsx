// src/app/Layout.test.js
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { createTables } from '../utils/database';
import Layout from '../_layout';

// Mock the createTables function
jest.mock('./utils/database', () => ({
  createTables: jest.fn(),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  it('calls createTables on mount', async () => {
    render(<Layout />);
    
    // Wait for the effect to run
    await screen.findByText(''); // No text to find, just wait for effect

    // Assert createTables was called
    expect(createTables).toHaveBeenCalled();
  });

  // Additional test cases can be added here
});
