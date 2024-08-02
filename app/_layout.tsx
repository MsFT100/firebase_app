import { Stack } from 'expo-router/stack';


export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="addMembers" options={{ title: 'Add Members' }} />
      <Stack.Screen name="addTasks" options={{ title: 'Add Tasks' }} />
      <Stack.Screen name="memberDetails" options={{ title: 'Member Details' }} />
      <Stack.Screen name="itemDetails" options={{ title: 'Item Details' }} />
    </Stack>
  );
}
