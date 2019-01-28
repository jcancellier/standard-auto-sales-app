import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { CustomerList } from '../components/customers';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Title, Headline, Divider, Button, Text, TextInput, Colors, Paragraph } from 'react-native-paper';
import { theme } from '../global';
import NavigationService from '../navigation/navigationService';
import { setSaleCustomer, setSaleVehicle } from '../redux/actions'

class CreateSaleScreen extends Component {

  state = {
    sale_price: '',
    notes: ''
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  })

  _renderCustomerDetailsRow = (heading = '', detail = '', color) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Paragraph style={{ fontFamily: theme.fonts.medium }}>{heading}</Paragraph>
        {detail.length > 0 ?
          <Paragraph
            style={{ fontFamily: theme.fonts.light, color: color ? color : theme.colors.text }}
            color={color ? color : theme.colors.text}
          >
            {detail}
          </Paragraph> : null
        }
      </View>
    );
  }

  _renderAddCustomer = () => {
    const { customer, navigation } = this.props;
    const { first_name, last_name, drivers_license, dob, sex, street, city, zipcode, state } = customer;
    if (Object.keys(customer).length === 0) {
      return (
        <Button style={styles.addDetailsButton} icon='person' onPress={() => navigation.navigate('ChooseCustomerScreen')}>
          Add Customer
        </Button>
      );
    }
    return (
      <View style={{ margin: 10 }}>
        <Title style={{ fontSize: 20, alignSelf: 'center' }}>{`${first_name} ${last_name}`}</Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            {this._renderCustomerDetailsRow('Sex: ', sex === 'm' ? 'Male' : 'Female')}
            {this._renderCustomerDetailsRow('Drivers License: ', drivers_license)}
            {this._renderCustomerDetailsRow('Birth Date: ', dob)}
          </View>
          <View style={{width: 0.2, backgroundColor: theme.colors.surface}}/>
          <View>
            {this._renderCustomerDetailsRow('Address')}
            {this._renderCustomerDetailsRow('', street)}
            {this._renderCustomerDetailsRow('', `${city}, ${state} ${zipcode}`)}
          </View>
        </View>
      </View>
    );
  }

  _renderAddVehicle = () => {
    const { vehicle, navigation } = this.props;

    return (
      <Button style={styles.addDetailsButton} icon='directions-car' onPress={() => navigation.navigate('ChooseVehicleScreen')}>
        Add Vehicle
      </Button>
    );
  }

  _onExit = () => {
    NavigationService.navigate('SalesScreen');
    this.props.setSaleCustomer({});
    this.props.setSaleVehicle({});
  }

  render() {
    const { customers } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={this._onExit} style={{ paddingRight: 20, paddingVertical: 10, paddingLeft: 0, justifyContent: 'center' }}>
                <Ionicons name="md-close" size={20} color={theme.colors.text} style={{ paddingLeft: 14 }} />
              </TouchableOpacity>
              <Text style={{ fontFamily: theme.fonts.medium, fontSize: 18 }}>New Sale</Text>
            </View>
            <View style={styles.content}>
              <View style={{ flex: 4 }}>
                <Divider />
                {this._renderAddCustomer()}
                <Divider />
                {this._renderAddVehicle()}
                <Divider style={{ marginBottom: 25 }} />
              </View>
              <View style={{ flex: 4, justifyContent: 'space-between', marginBottom: 40 }}>
                <KeyboardAvoidingView behavior="padding">
                  <TextInput
                    label='$ Sale Price'
                    value={this.state.sale_price}
                    onChangeText={sale_price => this.setState({ sale_price })}
                    style={{ marginHorizontal: 20, marginBottom: 15 }}
                    mode={'outlined'}
                    keyboardType={'number-pad'}
                  />
                  <TextInput
                    label='Add Notes...'
                    value={this.state.notes}
                    onChangeText={notes => this.setState({ notes })}
                    style={{ marginHorizontal: 20 }}
                    mode={'outlined'}
                  />
                </KeyboardAvoidingView>
                <Button mode="contained" color={Colors.green700} style={{ marginHorizontal: 15, paddingVertical: 10 }} icon="attach-money">Make Sale</Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 35,
    alignItems: 'center'
  },
  content: {
    flex: 8
  },
  addDetailsButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    customer: state.sales.customer,
    vehicle: state.sales.vehicle
  }
}

export default connect(mapStateToProps, {
  setSaleCustomer,
  setSaleVehicle
})(CreateSaleScreen);