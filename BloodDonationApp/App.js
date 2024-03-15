

import react from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/screens/home/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <HomeScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
