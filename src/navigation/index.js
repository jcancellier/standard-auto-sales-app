import {
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

import CustomersScreen from '../screens/CustomersScreen';
import SalesScreen from '../screens/SalesScreen';
import VechiclesScreen from '../screens/VehiclesScreen';
import VisitsScreen from '../screens/VisitsScreen';

import CustomerScreen from '../screens/CustomerScreen';

// Authentication Stack
const AuthStack = createStackNavigator({
	LoginScreen
});

const DashboardStack = createStackNavigator({
	DashboardScreen
},{
	headerLayoutPreset: 'left'
})

const CustomersStack = createStackNavigator({
	CustomersScreen,
	CustomerScreen
}, {
	headerLayoutPreset: 'left'
})

const SalesStack = createStackNavigator({
	SalesScreen
})

const VehiclesStack = createStackNavigator({
	VechiclesScreen
})

const VisitsStack = createStackNavigator({
	VisitsScreen
})

// Main Navigation (Root)
const MainStack = createStackNavigator(
	{
		DashboardStack,
		CustomersStack,
		SalesStack,
		VehiclesStack,
		VisitsStack
	},
	{
		headerLayoutPreset: 'left',
		headerMode: 'none',
		// mode: 'modal'
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
