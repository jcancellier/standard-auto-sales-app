import { DarkTheme } from 'react-native-paper';
import { fonts } from './fonts.js'

const theme = {
  ...DarkTheme,
  fonts,
  roundness: 5,
  colors: {
    ...DarkTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};

export { theme };