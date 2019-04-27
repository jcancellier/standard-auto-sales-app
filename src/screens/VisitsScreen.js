import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { theme } from '../global';
import { VisitList } from '../components/visits';

class VisitsScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  })

  render() {
    const { visits } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <VisitList visits={visits} />
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})

const mapStateToProps = (state) => {
  return {
    visits: state.visits.visits
  }
}

export default connect(mapStateToProps)(VisitsScreen);
