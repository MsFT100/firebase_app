// AddMembersScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddMembersScreen from '../screens/addMembers';
import { addMember } from '../utils/database';

// Mock the addMember function
jest.mock('../utils/database', () => ({
  addMember: jest.fn((name, callback) => callback(true)), // Mock successful addition
}));

describe('AddMembersScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<AddMembersScreen />);
    expect(getByText('Add Members')).toBeTruthy();
    expect(getByLabelText('Enter member name')).toBeTruthy();
    expect(getByText('Add Member')).toBeTruthy();
  });

  

  
});
