// src/app/addTasks.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const AddTasksScreen = () => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    alert(`Task ${task} added!`);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Tasks</Text>
      <TextInput
        label="Enter task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
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
  input: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default AddTasksScreen;
