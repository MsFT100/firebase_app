import { View, StyleSheet, FlatList, Text } from 'react-native';
import { getTasks } from '../utils/database';
import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router';

// Define the Task type
interface Task {
  id: number;
  location: string;
  name: string;
}

export default function Tab() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks(setTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks found</Text>}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push("../screens/addTasks")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  taskItem: {
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
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: '#888',
  },
});
