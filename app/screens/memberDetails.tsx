// src/app/memberDetails.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const MemberDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member Details</Text>
      <Text>Details of a specific member will be shown here.</Text>
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
  },
});

export default MemberDetailsScreen;
