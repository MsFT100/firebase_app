import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { getTasks } from '../utils/database';
import { router } from 'expo-router';
import Tab from '../(tabs)/tasks';

// Define types for the task and callback function
interface Task {
  id: number;
  location: string;
  name: string;
}

type Callback = (tasks: Task[]) => void;

// Mock the database function
jest.mock('../utils/database', () => ({
  getTasks: jest.fn(),
}));

// Mock router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('Tab', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
  });

  test('renders correctly and displays empty message when no tasks are found', () => {
    (getTasks as jest.Mock).mockImplementationOnce((callback: Callback) => callback([]));

    const { getByText } = render(<Tab />);
    
    expect(getByText('No tasks found')).toBeTruthy(); // Check if empty message is displayed
  });

  test('fetches and displays tasks', async () => {
    const mockTasks: Task[] = [
      { id: 1, location: 'Location A', name: 'Task A' },
      { id: 2, location: 'Location B', name: 'Task B' },
    ];
    (getTasks as jest.Mock).mockImplementationOnce((callback: Callback) => callback(mockTasks));

    const { findAllByText } = render(<Tab />);

    await waitFor(() => {
      expect(getTasks).toHaveBeenCalled();
    });

    const taskNames = await findAllByText(/Task A|Task B/);
    expect(taskNames.length).toBe(mockTasks.length);
  });

  
});
