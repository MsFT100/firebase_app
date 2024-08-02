import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { clearTasks, getTasks } from '../utils/database';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

// Define the Task type
interface Task {
  id: number;
  latitude: number;
  longitude: number;
  location: string;
  name: string;
}

export default function Tab() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();

  const fetchTasks = async () => {
    try {
      await getTasks((fetchedTasks: Task[]) => {
        console.log("Fetched tasks:", fetchedTasks); // Debug log
        setTasks(fetchedTasks);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTasks(); // Fetch data when the screen is focused
    }
  }, [isFocused]);

  const handleClearTasks = async () => {
    try {
      await clearTasks(() => {
        Alert.alert('Success', 'All tasks have been cleared');
        fetchTasks(); // Fetch updated tasks after clearing
      });
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {tasks.map(task => (
          <Marker
            key={task.id}
            coordinate={{ latitude: task.latitude, longitude: task.longitude }}
            title={task.name}
            description={task.location}
          />
        ))}
      </MapView>
      <Button mode="contained" onPress={handleClearTasks} style={styles.button}>
        Clear Tasks
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
});
