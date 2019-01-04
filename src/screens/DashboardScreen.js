import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { theme } from '../global';
import { Title } from 'react-native-paper';

class DashboardScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    const { user } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Title>{`${user.first_name} ${user.last_name}`}</Title>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.salesperson
  }
}

export default connect(mapStateToProps)(DashboardScreen);