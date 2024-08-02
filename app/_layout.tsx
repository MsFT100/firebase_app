// src/app/index.js
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import { createTables } from './utils/database';

export default function Layout() {
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
    </Stack>
  );
}
