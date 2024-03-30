import React from 'react';
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native';
import Options from './Option';

const CommentsScreen = () => {

  return (
    <View style={styles.container}>   
      <Options/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FBEEC1',
  },
});

export default CommentsScreen;