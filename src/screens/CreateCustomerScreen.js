import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, Paragraph as StyledText, Button } from 'react-native-paper';
import { theme } from '../global';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { postCustomer } from '../redux/actions/CustomerActions'

class CreateCustomerScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.getParam('name'),
    headerStyle: { backgroundColor: theme.colors.background, borderBottomWidth: 0, zIndex: 0, elevation: 0 },
    headerTitleStyle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.medium,
      fontWeight: 'normal',
      fontSize: 14,
      marginLeft: 16
    },
    header: null
  })

  state = {
    first_name: '',
    last_name: '',
    drivers_license: '',
    dob: '',
    sex: '',
    street: '',
    city: '',
    state: '',
    zipcode: ''
  }

  componentDidMount() {
    // TODO: Remove. Solely for debugging and auto-filling form
    this._autoFillForm();
  }

  _onExit = () => {
    this.props.navigation.goBack();
  }

  _onRegister = () => {
    const newCustomer = this._constructCustomer();
    this.props.postCustomer(newCustomer);
  }

  _constructCustomerObject = () => {

  }

  _constructCustomer = () => {
    const { 
      first_name,
      last_name,
      drivers_license,
      dob,
      sex,
      street,
      city,
      state,
      zipcode
    } = this.state;

    return {
      first_name,
      last_name,
      drivers_license,
      dob,
      issue_date: '11-19-2015',
      expiration_date: '11-19-2020',
      sex,
      street,
      city,
      state,
      zipcode
    }
  }

  // For Debugging
  _autoFillForm = () => {
    this.setState({
      first_name: 'Joshua',
      last_name: 'Cancellier',
      drivers_license: 'agaga',
      dob: '03-12-1997',
      sex: 'm',
      street: '1009 Dawn St',
      city: 'Bakersfield',
      state: 'CA',
      zipcode: '93308'
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this._onExit} style={{ paddingRight: 20, paddingVertical: 10, paddingLeft: 0, justifyContent: 'center' }}>
            <Ionicons name="md-close" size={20} color={theme.colors.text} style={{ paddingLeft: 14 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: theme.fonts.medium, fontSize: 18 }}>New Customer</Text>
        </View>

        <StyledText style={{ paddingLeft: 15, marginBottom: 10 }}>Please fill out all fields below</StyledText>

        <ScrollView>
          <Animatable.View style={styles.bodyContainer}>
            <View style={styles.textInputsContainer} >
              <Animatable.View animation="fadeInRight" delay={100}>
                <TextInput
                  label='First Name'
                  value={this.state.first_name}
                  onChangeText={first_name => this.setState({ first_name })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>


              <Animatable.View animation="fadeInRight" delay={300}>
                <TextInput
                  label='Last Name'
                  value={this.state.last_name}
                  onChangeText={last_name => this.setState({ last_name })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={500}>
                <TextInput
                  label='Drivers License'
                  value={this.state.drivers_license}
                  onChangeText={drivers_license => this.setState({ drivers_license })}
                  style={styles.textInput}
                  mode={'outlined'}

                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={700}>
                <TextInput
                  label='Birth Date'
                  value={this.state.dob}
                  onChangeText={dob => this.setState({ dob })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>

              {/* TODO: remember to send either 'm' or 'f' to server */}
              <Animatable.View animation="fadeInRight" delay={900}>
                <TextInput
                  label='Gender'
                  value={this.state.sex}
                  onChangeText={sex => this.setState({ sex })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={1100}>
                <TextInput
                  label='Street'
                  value={this.state.street}
                  onChangeText={street => this.setState({ street })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={1300}>
                <TextInput
                  label='City'
                  value={this.state.city}
                  onChangeText={city => this.setState({ city })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={1500}>
                <TextInput
                  label='State'
                  value={this.state.state}
                  onChangeText={state => this.setState({ state })}
                  style={styles.textInput}
                  mode={'outlined'}
                  maxLength={2}
                />
              </Animatable.View>

              <Animatable.View animation="fadeInRight" delay={1700}>
                <TextInput
                  label='Zipcode'
                  value={this.state.zipcode}
                  onChangeText={zipcode => this.setState({ zipcode })}
                  style={styles.textInput}
                  mode={'outlined'}
                />
              </Animatable.View>
              <StyledText style={{ paddingLeft: 15, marginBottom: 10, paddingTop: 10 }}>
                By clicking "REGISTER" you agree to the terms and conditions under Standard Auto Sales
            </StyledText>
              <Button
                style={styles.submitButton}
                onPress={this._onRegister}
                mode="contained"
                loading={this.props.isLoading}
              >
                Register!
            </Button>
            </View>
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
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
  },
  textInput: {
    marginBottom: 20
  },
  bodyContainer: {
    flex: 2,
    elevation: 10,
    padding: 10,
    paddingLeft: 15,
  },
  textInputsContainer: {
    paddingRight: 40,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 10
  }
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.customers.isLoadingPostCustomer
  }
}

export default connect(mapStateToProps, {
  postCustomer
})(CreateCustomerScreen);
