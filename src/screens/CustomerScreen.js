import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../global';

export default class CustomerScreen extends React.Component {

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
  })

  render() {
    return (
      <View>
        <Text>Hello from Customer Screen</Text>
      </View>
    );
  }
}