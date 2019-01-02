import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/redux/store';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading, Font, Asset } from 'expo';
import { createRootNavigator } from './src/navigation'
import { theme } from './src/global';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'cereal-black': require('./assets/fonts/AirbnbCereal-Black.ttf'),
        'cereal-bold': require('./assets/fonts/AirbnbCereal-Bold.ttf'),
        'cereal-book': require('./assets/fonts/AirbnbCereal-Book.ttf'),
        'cereal-extra-bold': require('./assets/fonts/AirbnbCereal-ExtraBold.ttf'),
        'cereal-light': require('./assets/fonts/AirbnbCereal-Light.ttf'),
        'cereal-medium': require('./assets/fonts/AirbnbCereal-Medium.ttf'),
      }),
      Asset.loadAsync([
        require('./assets/images/car.png')
      ])
    ]);
  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _renderRootNavigator() {
    const RootNav = createRootNavigator(true);
    return <RootNav />;
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PaperProvider theme={theme}>
            {this._renderRootNavigator()}
          </ PaperProvider>
        </Provider>
      )
    }
  }
}
