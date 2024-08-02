import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../screens/Signin';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, Auth, User } from 'firebase/auth';

// Mock Firebase
jest.mock('firebase/auth', () => {
  const actualAuth = jest.requireActual('firebase/auth');
  return {
    ...actualAuth,
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  };
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AuthScreen when user is not authenticated', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback(null));
    const { getByText } = render(<App />);
    
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Need an account? Sign Up')).toBeTruthy();
  });

  test('renders AuthenticatedScreen when user is authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback({ email: 'test@example.com' } as User));
    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Welcome')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
    });
  });

  test('handles successful sign up', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback(null));
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { email: 'test@example.com' } as User });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
    });
  });

  test('handles successful sign in', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback(null));
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { email: 'test@example.com' } as User });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
    });
  });

  test('handles sign out', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback({ email: 'test@example.com' } as User));
    (signOut as jest.Mock).mockResolvedValue({});

    const { getByText } = render(<App />);

    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  test('shows error messages for invalid input', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback(null));
    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Email is required.')).toBeTruthy();
      expect(getByText('Password is required.')).toBeTruthy();
    });
  });

  test('shows error message for wrong credentials', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth: Auth, callback: (user: User | null) => void) => callback(null));
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: 'auth/wrong-password',
    });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Wrong password.')).toBeTruthy();
    });
  });
});
