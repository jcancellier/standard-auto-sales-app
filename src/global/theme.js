import { DarkTheme, DefaultTheme, Colors } from 'react-native-paper';
import { fonts } from './fonts'

const dark = {
  ...DarkTheme,
  fonts,
  // roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.lightBlue500,
    accent: '#f1c4of'
  }
}

const light = {
  ...DefaultTheme,
  fonts,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.lightBlue500,
    accent: '#f1c4of'
  }
}

const theme = {
  ...dark
};

export { theme };
