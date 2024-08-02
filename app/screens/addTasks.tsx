import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct package
import { assignTask, getMembers, Member } from '../utils/database';
import { useIsFocused } from '@react-navigation/native';

const predefinedLocations = [
  { label: 'Nairobi', latitude: -1.286389, longitude: 36.817223 },
  { label: 'Mombasa', latitude: -4.043477, longitude: 39.668206 },
  { label: 'Kisumu', latitude: -0.091702, longitude: 34.767956 },
  // Add more locations as needed
];

const AddTasksScreen = () => {
  const [task, setTask] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMembers((members: Member[]) => {
        setMembers(members);
      });
    }
    
  }, [isFocused]);

  const handleAddTask = () => {
    if (selectedMemberId && selectedLocation) {
      const locationData = predefinedLocations.find(
        (location) => location.label === selectedLocation
      );

      if (locationData) {
        const { latitude, longitude, label: location } = locationData;
        assignTask(selectedMemberId, latitude, longitude, location, 'Task Description', (result: any) => {
          Alert.alert('Success', 'Task assigned to member!');
          console.log(latitude, longitude, location);
          setTask('');
          setSelectedMemberId(null);
          setSelectedLocation(null);
        });
      } else {
        Alert.alert('Error', 'Selected location not found');
      }
    } else {
      Alert.alert('Error', 'Please select a member and location');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Tasks</Text>
      <Picker
        selectedValue={selectedMemberId}
        onValueChange={(itemValue) => setSelectedMemberId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Member" value={null} />
        {members.map((member) => (
          <Picker.Item key={member.id} label={member.name} value={member.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Location" value={null} />
        {predefinedLocations.map((location) => (
          <Picker.Item key={location.label} label={location.label} value={location.label} />
        ))}
      </Picker>
      <Button mode="contained" onPress={handleAddTask} style={styles.button}>
        Add Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default AddTasksScreen;
