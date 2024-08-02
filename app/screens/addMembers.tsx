import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { addMember } from '../utils/database';

const AddMembersScreen = () => {
  const [name, setName] = useState('');

  const handleAddMember = () => {
    if (name.trim()) {
      addMember(name, (result) => {
        Alert.alert('Success', `Member ${name} added!`);
        setName('');
      });
    } else {
      Alert.alert('Error', 'Please enter a valid name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Members</Text>
      <TextInput
        label="Enter member name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddMember} style={styles.button}>
        Add Member
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

export default AddMembersScreen;
