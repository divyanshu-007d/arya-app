/**
 * Cadet Mode Container Screen
 * Houses the stack navigation for solo training mode (tabs + WebView)
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CadetStackNavigator from '../../navigation/CadetStackNavigator';

const CadetModeScreen = () => {
  return (
    <View style={styles.container}>
      <CadetStackNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CadetModeScreen;