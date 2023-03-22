import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../../theme'
import { HeaderLeft, HeaderTitle } from '../../components/Header'
import Landing from '../../pages/Landing'
import Login from '../../pages/Login'
import Register from '../../pages/Register'

export type LoginStackParamList = {
	Landing: undefined;
	Login: undefined;
	Register: undefined;
};

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator<LoginStackParamList>()

const navigationProps = {
	headerTintColor: 'white',
	headerStyle: { backgroundColor: colors.darkPurple },
	headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const LoginNavigator = () => (
	<Stack.Navigator
		initialRouteName="Landing"
		headerMode="screen"
		screenOptions={navigationProps}
	>
		<Stack.Screen
			name="Landing"
			component={Landing}
			options={() => ({
				title: 'Landing',
				headerShown: false,
			})}
		/>
		<Stack.Screen
			name="Login"
			component={Login}
			options={() => ({
				title: 'Login',
				headerTitle: () => <HeaderTitle />,
			})}
		/>
		<Stack.Screen
			name="Register"
			component={Register}
			options={() => ({
				title: 'Register',
				headerTitle: () => <HeaderTitle />,
			})}
		/>
	</Stack.Navigator>
)
