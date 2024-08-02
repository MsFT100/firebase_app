import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import MapView from 'react-native-maps';
import Tab from '../(tabs)/index';
import { clearTasks, getTasks } from '../utils/database';

// Define types for the task and callback functions
interface Task {
  id: number;
  latitude: number;
  longitude: number;
  location: string;
  name: string;
}

type Callback = (tasks: Task[]) => void;

// Mock the database functions
jest.mock('../utils/database', () => ({
  getTasks: jest.fn(),
  clearTasks: jest.fn(),
}));

// Mock MapView component
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: any) => <View {...props} />,
    Marker: (props: any) => <View {...props} />,
  };
});

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Tab', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Tab />);
    
    expect(getByText('Clear Tasks')).toBeTruthy();
  });

  test('fetches and displays tasks on focus', async () => {
    const mockTasks: Task[] = [
      { id: 1, latitude: 37.78825, longitude: -122.4324, location: 'Location 1', name: 'Task 1' },
      { id: 2, latitude: 37.78825, longitude: -122.4324, location: 'Location 2', name: 'Task 2' },
    ];
    (getTasks as jest.Mock).mockImplementationOnce((callback: Callback) => callback(mockTasks));

    const { findAllByTestId } = render(<Tab />);
    
    await waitFor(() => {
      expect(getTasks).toHaveBeenCalled();
    });
    
    // Assuming we use test IDs or other means to verify markers, adjust accordingly
    const markers = await findAllByTestId('marker');
    expect(markers.length).toBe(mockTasks.length);
  });

  test('clears tasks and shows alert', async () => {
    (clearTasks as jest.Mock).mockImplementationOnce((callback: () => void) => callback());
    
    const { getByText } = render(<Tab />);
    
    fireEvent.press(getByText('Clear Tasks'));
    
    await waitFor(() => {
      expect(clearTasks).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'All tasks have been cleared');
    });
  });
});
