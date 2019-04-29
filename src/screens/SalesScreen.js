import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Title, FAB, Colors } from 'react-native-paper';
import { theme } from '../global';
import { SaleList } from '../components/sales';

class SalesScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  })

  componentDidMount() {
    // this._makeSale();
  }

  _makeSale = () => {
    this.props.navigation.navigate('CreateSaleScreen');
  }

  render() {
    const { sales, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <SaleList sales={sales} />
        </View>
        <FAB
          style={styles.fab}
          medium
          icon="attach-money"
          onPress={this._makeSale}
          label="new sale"
        // color={Colors.green700}
        // label="New Sale"
        />
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
    right: 10,
    bottom: 30,
  }
})

const mapStateToProps = (state) => {
  return {
    sales: state.sales.sales
  }
}

export default connect(mapStateToProps)(SalesScreen);
