import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Title } from 'react-native-paper';
import { theme } from '../global';

class VisitsScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '',
    headerStyle: { backgroundColor: theme.colors.background, borderBottomWidth: 0, zIndex: 0, elevation: 0 },
    headerTitleStyle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.medium,
      fontWeight: 'normal',
      fontSize: 14,
      marginLeft: 16
    },
    headerLeft: () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
          <Ionicons name="md-close" size={20} color={theme.colors.text} style={{ paddingLeft: 14 }} />
        </TouchableOpacity>
      );
    }
  })

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Title>Visits Screen</Title>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
})

const mapStateToProps = (state) => {
  return {
    visits: state.visits.visits
  }
}

export default connect(mapStateToProps)(VisitsScreen)