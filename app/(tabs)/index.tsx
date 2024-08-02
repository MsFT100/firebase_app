import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { getTasks } from '../utils/database';

export default function Tab() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
    getTasks(setTasks);
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {tasks.map(task => (
          <Marker
            key={task.id}
            coordinate={{ latitude: parseFloat(task.location.split(',')[0]), longitude: parseFloat(task.location.split(',')[1]) }}
            title={task.name}
            description={task.location}
          />
        ))}
      </MapView>
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
  });
