// src/app/addMembers.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const AddMembersScreen = () => {
  const [name, setName] = useState('');

  const handleAddMember = () => {
    alert(`Member ${name} added!`);
    setName('');
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
