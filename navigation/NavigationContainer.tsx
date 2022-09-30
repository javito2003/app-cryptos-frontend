import React from 'react'
import { NavigationContainer as Container, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Button } from 'react-native-paper';

// SCREENS
import HomeScreen from '../screens/Home'
import SignInScreen from '../screens/SignIn';
import CryptosScreen from '../screens/CryptosScreen'
import SignUpScreen from '../screens/SignUpScreen';

// redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ActionCryptos, ActionUser } from '../redux';

type RootStack = {
  Home: undefined,
  Cryptos: undefined
}

type AuthStack = {
  Login: undefined
  SignUp: undefined
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
  const { isLogged } = useAppSelector(store => store.user)
  return (
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name='Home' component={HomeScreen} options={{
          headerRight: () => isLogged && (<Ionicons size={28} name='options-outline' />)
        }}
      />
      <Stack.Screen name='Cryptos' component={CryptosScreen} />
    </Stack.Navigator>
  )
}

const AuthNavigation = () => {
  return (
    <StackAuth.Navigator>
      <StackAuth.Screen name='Login' component={SignInScreen} />
      <StackAuth.Screen name='SignUp' component={SignUpScreen} />
    </StackAuth.Navigator>
  )
}

const MainNavigation = () => {
  const { isLogged } = useAppSelector(store => store.user)
  const dispatch = useAppDispatch()
  dispatch(ActionCryptos.getCryptos() as any)
  dispatch(ActionUser.checkLogged() as any)
  return (
    <Container>
      <StackMain.Navigator screenOptions={{ headerShown: false }}>
        <StackMain.Screen name='Main' component={NavigationContainer} />
        {
          !isLogged
          && <StackMain.Screen name='Auth' component={AuthNavigation} />
        }
      </StackMain.Navigator>
    </Container>
  )
}

export default MainNavigation