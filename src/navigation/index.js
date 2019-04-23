import {
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SaleReceiptScreenPDF from '../screens/SaleReceiptScreenPDF';

// Dashboard options
import CustomersScreen from '../screens/CustomersScreen';

import SalesScreen from '../screens/SalesScreen';
import CreateSaleScreen from '../screens/CreateSaleScreen';
import ChooseCustomerScreen from '../screens/ChooseCustomerScreen';
import ChooseVehicleScreen from '../screens/ChooseVehicleScreen';

import VechiclesScreen from '../screens/VehiclesScreen';

import VisitsScreen from '../screens/VisitsScreen';
// 

import CustomerScreen from '../screens/CustomerScreen';

// Authentication Stack
const AuthStack = createStackNavigator({
	LoginScreen
});

const DashboardStack = createStackNavigator({
	DashboardScreen,
	SaleReceiptScreenPDF
}, {
		headerLayoutPreset: 'left'
	})

const CustomersStack = createStackNavigator({
	CustomersScreen,
	CustomerScreen
}, {
		headerLayoutPreset: 'left'
	})

const SalesStack = createStackNavigator(
	{
		SalesScreen,
		CreateSaleScreen,
		ChooseCustomerScreen,
		ChooseVehicleScreen,
		SaleReceiptScreenPDF
	},
	{
		mode: 'modal'
	}
)

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

