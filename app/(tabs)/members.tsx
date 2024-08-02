import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { getMembers } from '../utils/database';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

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
        style={styles.fab}
        icon="plus"
        onPress={() => router.push("../screens/addMembers") }
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0',
  },
});
