import {
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

// Authentication Stack
const AuthStack = createStackNavigator({
	LoginScreen
});

// Main Navigation (Root)
const MainStack = createStackNavigator(
	{
		DashboardScreen
	},
	{
		headerLayoutPreset: 'left'
	}
)

// Controller between AuthStack and MainStack
export const createRootNavigator = (initialLaunch = true) => {
	return createSwitchNavigator(
		{
			AuthStack,
			MainStack
		},
		{
			initialRouteName: initialLaunch ? 'AuthStack' : 'MainStack'
		}
	);
};
