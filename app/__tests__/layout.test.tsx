import React from 'react';
import { render } from '@testing-library/react-native';
import TabLayout from '../(tabs)/_layout';
import { createTables } from '../utils/database';

// Mock createTables
jest.mock('../utils/database', () => ({
  createTables: jest.fn(),
}));
describe('TabLayout', () => {
  test('renders tabs correctly', () => {
    const { getByText } = render(<TabLayout />);
    
    // Check if tabs are present (the titles in the tabs)
    expect(getByText('Members')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Tasks')).toBeTruthy();
  });

  test('calls createTables on render', () => {
    render(<TabLayout />);
    
    expect(createTables).toHaveBeenCalled();
  });
});
