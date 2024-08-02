import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useIsFocused } from '@react-navigation/native';
import Tab from '../(tabs)/members';
import { getMembers } from '../utils/database';
import { router } from 'expo-router';

// Define types for the member and callback function
interface Member {
  id: number;
  name: string;
}

type Callback = (members: Member[]) => void;

// Mock the database function
jest.mock('../utils/database', () => ({
  getMembers: jest.fn(),
}));

// Mock useIsFocused
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

// Mock router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('Tab', () => {
  beforeEach(() => {
    (useIsFocused as jest.Mock).mockReturnValue(true); // Mock the hook to return true (screen is focused)
  });

 

  test('fetches and displays members on focus', async () => {
    const mockMembers: Member[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    (getMembers as jest.Mock).mockImplementationOnce((callback: Callback) => callback(mockMembers));

    const { findAllByText } = render(<Tab />);
    
    await waitFor(() => {
      expect(getMembers).toHaveBeenCalled();
    });

    const memberNames = await findAllByText(/John Doe|Jane Smith/);
    expect(memberNames.length).toBe(mockMembers.length);
  });

 
});

