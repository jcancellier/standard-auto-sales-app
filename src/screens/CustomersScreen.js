import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Constants } from 'expo';
import { CustomerList } from '../components/customers';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Title, Headline } from 'react-native-paper';
import { theme } from '../global';


class CustomersScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  })

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <CustomerList customers={this.props.customers} />
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  subContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    margin: 15,
    marginTop: 0
  },
  header: {
    flex: 2
  },
  content: {
    flex: 8
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.medium
  }
})

const mapStateToProps = (state) => {
  return {
    customers: state.customers.customers
  }
}

export default connect(mapStateToProps)(CustomersScreen);