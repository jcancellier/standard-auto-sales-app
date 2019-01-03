import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { theme } from '../global';
import { Title } from 'react-native-paper';

export default class DashboardScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Title>Shaughn Vagner</Title>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  }
})
