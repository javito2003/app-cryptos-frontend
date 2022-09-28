import React from 'react'
import { CompositeNavigationProp, NavigationContainer as Container, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// SCREENS
import HomeScreen from '../screens/Home'
import SignInScreen from '../screens/SignIn';
import CryptosScreen from '../screens/CryptosScreen'

// redux
import { useAppDispatch } from '../redux/store';
import { ActionCryptos } from '../redux';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';

type RootStack = {
  Home: undefined,
  Cryptos: undefined
}

type AuthStack = {
  Login: undefined
}

type MainNavigation = {
  Main: NavigatorScreenParams<RootStack>
  Auth: NavigatorScreenParams<AuthStack>
}

export interface INavigation {
  navigation: NativeStackNavigationProp<MainNavigation>
  
}

export type Roots = NativeStackScreenProps<RootStack, 'Home', 'RootStack'>

const Stack = createNativeStackNavigator<RootStack>()
const StackAuth = createNativeStackNavigator<AuthStack>()
const StackMain = createNativeStackNavigator()

const NavigationContainer = () => {
  return (
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Cryptos' component={CryptosScreen} />
    </Stack.Navigator>
  )
}

const AuthNavigation = () => {
  return (
    <StackAuth.Navigator>
      <StackAuth.Screen name='Login' component={SignInScreen} />
    </StackAuth.Navigator>
  )
}

const MainNavigation = () => {
  const dispatch = useAppDispatch()
  dispatch(ActionCryptos.getCryptos() as any)
  return (
    <Container>
      <StackMain.Navigator screenOptions={{ headerShown: false }}>
        <StackMain.Screen name='Main' component={NavigationContainer} />
        <StackMain.Screen name='Auth' component={AuthNavigation} />
      </StackMain.Navigator>
    </Container>
  )
}

export default MainNavigation