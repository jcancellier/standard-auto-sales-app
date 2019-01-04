import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Text, Headline, Title, Card, TextInput, Button, Caption, Subheading } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { theme } from '../global';
import { loginWithUserIdAndLastName } from '../redux/actions';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    lastName: '',
    salespersonId: ''
  }

  _verifyForm = () => {
    if (this.state.lastName.length == 0) {
      alert('Must enter a last name');
      return false;
    }
    if (this.state.salespersonId == 0) {
      alert('Must enter a Salesperson ID')
      return false;
    }
    return true;
  }

  _login = () => {
    if (this._verifyForm())
      this.props.loginWithUserIdAndLastName(this.state.salespersonId, this.state.lastName);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animatable.View animation="fadeIn" style={styles.container}>
          <Animatable.View
            style={styles.headerContainer}
            animation="fadeInRight"
          >

            <Animatable.Image
              animation="pulse"
              iterationCount={2}
              delay={1800}
              source={require('../../assets/images/car.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
            <Subheading style={styles.logoText}>
              Standard Auto Sales
            </Subheading>
          </Animatable.View>

          <Animatable.View style={styles.bodyContainer} animation="fadeInRight" delay={800}>
            <Text style={styles.loginText}>Employee Login</Text>
            <TextInput
              label='Last Name'
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
              style={styles.textInput}
              mode={'outlined'}
            />
            <TextInput
              label='Salesperson ID'
              value={this.state.salespersonId}
              onChangeText={salespersonId => this.setState({ salespersonId })}
              style={styles.textInput}
              mode={'outlined'}
              keyboardType="number-pad"
            />
            <Button
              style={styles.loginButton}
              onPress={this._login}
              mode="contained"
              uppercase={false}
              loading={this.props.isLoading}
            >
              Login
            </Button>
          </Animatable.View>
        </Animatable.View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background
  },
  headerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  bodyContainer: {
    flex: 2,
    elevation: 10,
    padding: 10,
  },
  headerIcon: {
    flex: 0.5,
    height: undefined,
    width: undefined,
  },
  logoText: {
    fontFamily: 'cereal-bold',
    alignSelf: 'center'
  },
  loginText: {
    fontSize: 30,
    fontFamily: 'cereal-medium',
    paddingBottom: 10
  },
  textInput: {
    marginBottom: 15
  },
  loginButton: {
    marginTop: 30
  }
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoggingIn
  }
}

export default connect(mapStateToProps, {
  loginWithUserIdAndLastName
})(LoginScreen)
