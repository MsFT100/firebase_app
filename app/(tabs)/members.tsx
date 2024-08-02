import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { getMembers } from '../utils/database';

// Define the Member type
interface Member {
  id: number;
  name: string;
}

export default function Tab() {
  const [members, setMembers] = useState<Member[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchMembers = async () => {
        await getMembers(setMembers);
        console.log(members);
      };
      fetchMembers();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <FAB
        style={styles.addFab}
        icon="plus"
        onPress={() => router.push("../screens/addMembers")}
      />
      <FAB
        style={styles.loginFab}
        icon="account"
        onPress={() => router.push("../screens/Signin")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  memberItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addFab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 80, // Adjusted to place above the login FAB
    backgroundColor: 'white', // Color of the FAB
  },
  loginFab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16, // Position at the bottom right corner
    backgroundColor: '#03dac6', // Color of the FAB
  },
});
