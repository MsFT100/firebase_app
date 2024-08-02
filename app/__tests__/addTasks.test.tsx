import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AddTasksScreen from '../screens/addTasks';
import { assignTask, getMembers } from '../utils/database';

// Mock the database functions
jest.mock('../utils/database', () => ({
  assignTask: jest.fn(),
  getMembers: jest.fn(),
}));

// Mock Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('AddTasksScreen', () => {
  const mockMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
    (getMembers as jest.Mock).mockImplementation((callback: (members: typeof mockMembers) => void) => callback(mockMembers));
  });

  test('renders correctly', () => {
    const { getByText, getByLabelText } = render(<AddTasksScreen />);
    
    expect(getByText('Add Tasks')).toBeTruthy(); // Check if title is rendered
    expect(getByLabelText('Select Member')).toBeTruthy(); // Check if member picker is rendered
    expect(getByLabelText('Select Location')).toBeTruthy(); // Check if location picker is rendered
    expect(getByText('Add Task')).toBeTruthy(); // Check if button is rendered
  });

  test('shows error alert if member or location is not selected', () => {
    const { getByText } = render(<AddTasksScreen />);

    fireEvent.press(getByText('Add Task'));

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please select a member and location');
  });

  test('shows error alert if location is not found', async () => {
    const { getByText, getByLabelText } = render(<AddTasksScreen />);
    
    fireEvent.changeText(getByLabelText('Select Member'), '1');
    fireEvent.changeText(getByLabelText('Select Location'), 'Unknown Location');
    
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Selected location not found');
    });
  });

  test('shows success alert and clears inputs on successful task assignment', async () => {
    const { getByText, getByLabelText } = render(<AddTasksScreen />);
    
    fireEvent.changeText(getByLabelText('Select Member'), '1');
    fireEvent.changeText(getByLabelText('Select Location'), 'Nairobi');

    (assignTask as jest.Mock).mockImplementation((memberId, latitude, longitude, location, description, callback) => callback({ success: true }));
    
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Task assigned to member!');
    });

    expect(getByLabelText('Select Member').props.value).toBe(''); // Check if member picker is cleared
    expect(getByLabelText('Select Location').props.value).toBe(''); // Check if location picker is cleared
  });
});
