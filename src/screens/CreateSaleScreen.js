import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  Title,
  Headline,
  Divider,
  Button,
  Text,
  TextInput,
  Colors,
  Paragraph,
  IconButton,
  Portal,
  Dialog,
} from 'react-native-paper';
import { theme } from '../global';
import NavigationService from '../navigation/navigationService';
import {
  setSaleCustomer,
  setSaleVehicle,
  postSale,
  setConfirmSaleDialogVisible
} from '../redux/actions'
import { fonts } from '../global/fonts';

class CreateSaleScreen extends Component {

  state = {
    sale_price: '',
    notes: '',
    confirmSaleDialogVisible: false
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  })

  _renderCustomerDetailsRow = (heading = '', detail = '', color) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Paragraph style={{ fontFamily: theme.fonts.medium }}>{heading}</Paragraph>
        {
          <Paragraph
            style={{ fontFamily: theme.fonts.light, color: color ? color : theme.colors.text }}
            color={color ? color : theme.colors.text}
          >
            {detail}
          </Paragraph>
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Title style={{ fontSize: 21, alignSelf: 'center' }}>{`${first_name} ${last_name}`}</Title>
          <IconButton
            icon="edit"
            color={Colors.red700}
            size={20}
            onPress={() => navigation.navigate('ChooseCustomerScreen')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            {this._renderCustomerDetailsRow('Sex: ', sex.toUpperCase() === 'M' ? 'Male' : 'Female')}
            {this._renderCustomerDetailsRow('Drivers License: ', drivers_license)}
            {this._renderCustomerDetailsRow('Birth Date: ', dob)}
          </View>
          <View style={{ width: 0.2, backgroundColor: theme.colors.surface }} />
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
    const {
      maker,
      year,
      odo_reading,
      vin,
      date_received,
      invoice_price,
      testdrives
    } = vehicle;

    if (Object.keys(vehicle).length === 0) {
      return (
        <Button style={styles.addDetailsButton} icon='directions-car' onPress={() => navigation.navigate('ChooseVehicleScreen')}>
          Add Vehicle
        </Button>
      );
    }
    return (
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Title style={{ fontSize: 21, alignSelf: 'center' }}>{`${maker.make} ${maker.model}`}</Title>
          <IconButton
            icon="edit"
            color={Colors.red700}
            size={20}
            onPress={() => navigation.navigate('ChooseVehicleScreen')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            {this._renderCustomerDetailsRow('Year: ', year)}
            {this._renderCustomerDetailsRow('Odometer: ', `${odo_reading} miles`)}
            {this._renderCustomerDetailsRow('VIN: ', vin)}
          </View>
          <View style={{ width: 0.2, backgroundColor: theme.colors.surface }} />
          <View>
            {this._renderCustomerDetailsRow('Received: ', date_received)}
            {this._renderCustomerDetailsRow('Listing Price: ', "$" + invoice_price)}
            {this._renderCustomerDetailsRow('Test Drives: ', testdrives.length)}
          </View>
        </View>
      </View>
    );
  }

  _renderConfirmSaleDialog = () => {
    if (!this.props.confirmSaleDialogVisible)
      return;

    let isProfit = this.state.sale_price - this.props.vehicle.invoice_price >= 0;
    return (
      <Portal>
        <Dialog
          visible={this.props.confirmSaleDialogVisible}
          onDismiss={this._hideConfirmSaleDialog}
          dismissable={false}
        >
          <Dialog.Title>Confirm Sale?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Original Price: ${this.props.vehicle.invoice_price}</Paragraph>
            <Paragraph style={{ fontFamily: fonts.medium, color: isProfit ? Colors.green500 : Colors.red500 }}>Sale Price:        ${this.state.sale_price}</Paragraph>
            <Paragraph>.</Paragraph>
            <Paragraph>.</Paragraph>
            <Paragraph>.</Paragraph>
            {
              !isProfit ?
                <Paragraph style={{ fontFamily: fonts.regular }}>With this purchase you will be generating a deficit of: </Paragraph>
                :
                <Paragraph style={{ fontFamily: fonts.regular }}>With this purchase you will be generating a profit of: </Paragraph>
            }
            {
              !isProfit ?
                <Paragraph style={{ color: Colors.red500 }}>${this.props.vehicle.invoice_price - this.state.sale_price}</Paragraph>
                :
                <Paragraph style={{ color: Colors.green500 }}>${this.state.sale_price - this.props.vehicle.invoice_price}</Paragraph>

            }
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideConfirmSaleDialog} color={Colors.red400}>Go Back</Button>
            <Button loading={this.props.isPostingSale} onPress={this._onConfirmConfirmSaleDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  _onExit = () => {
    let goBackFromCreateSaleScreen = this.props.navigation.getParam('goBackFromCreateSaleScreen', 'DashboardScreen')
    NavigationService.navigate(goBackFromCreateSaleScreen);
    this.props.setSaleCustomer({});
    this.props.setSaleVehicle({});
  }

  _constructSale = () => {
    const { customer, vehicle, salesperson } = this.props;

    const maxOdoReading = vehicle.odo_reading + 100;
    const minOdoReading = vehicle.odo_reading;

    let d = new Date();

    return {
      customer_id: customer.id,
      salesperson_id: salesperson.id,
      vehicle_id: vehicle.id,
      date: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
      sale_price: this.state.sale_price,
      odo_reading: Math.floor(Math.random() * (maxOdoReading - minOdoReading)) + minOdoReading
    }
  }

  _showConfirmSaleDialog = () => {
    if (Object.getOwnPropertyNames(this.props.customer).length === 0) {
      alert('Must select a customer')
      return;
    }
    this.props.setConfirmSaleDialogVisible(true);
  }

  _onConfirmConfirmSaleDialog = () => {
    const sale = this._constructSale();
    this.props.postSale(sale);
  }

  _hideConfirmSaleDialog = () => {
    this.props.setConfirmSaleDialogVisible(false);
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
              <View style={{ flex: 6 }}>
                <Divider />
                {this._renderAddCustomer()}
                <Divider />
                {this._renderAddVehicle()}
                <Divider />
              </View>
              <View style={{ flex: 4, justifyContent: 'center', marginBottom: 20 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 3, justifyContent: 'center' }}>
                  <TextInput
                    label='$ Sale Price'
                    value={this.state.sale_price}
                    onChangeText={sale_price => this.setState({ sale_price })}
                    style={{ marginHorizontal: 20, marginBottom: 15 }}
                    mode={'outlined'}
                    keyboardType={'number-pad'}
                  />
                </KeyboardAvoidingView>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Button
                    mode="contained"
                    color={Colors.green700}
                    style={{ marginHorizontal: 15 }}
                    icon="attach-money"
                    onPress={this._showConfirmSaleDialog}
                  >
                    Make Sale
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this._renderConfirmSaleDialog()}
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
    vehicle: state.sales.vehicle,
    salesperson: state.auth.salesperson,
    sales: state.sales.sales,
    isPostingSale: state.sales.isLoadingPostSale,
    confirmSaleDialogVisible: state.sales.confirmSaleDialogVisible
  }
}

export default connect(mapStateToProps, {
  setSaleCustomer,
  setSaleVehicle,
  postSale,
  setConfirmSaleDialogVisible
})(CreateSaleScreen);
