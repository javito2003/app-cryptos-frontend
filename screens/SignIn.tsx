import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { IAuthParam } from '../interfaces/User'
import { INavigation } from '../navigation/NavigationContainer'
import { ActionUser, useAppDispatch } from '../redux'
import customFetch from '../utils/customFetch'

const SignInScreen = ({ navigation }: INavigation) => {
  const dispatch = useAppDispatch()
  const [ user, setUser ] = React.useState({ email: "", password: "" })

  const handleSubmit = async() => {
    let { body, error } = await customFetch<IAuthParam>({ method: "POST", url: "/user/login", body: user })
    if(!error) {
      dispatch(ActionUser.AuthSuccess(body) as any)
    } else {
      console.log(body)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <TextInput autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoComplete='email' value={ user.email } onChangeText={e => setUser({...user, email: e})} mode='outlined' label="Email" placeholder='example@example.com' />
        <TextInput value={ user.password } onChangeText={e => setUser({...user, password: e})}  mode='outlined' label="Password" placeholder='**********' secureTextEntry={true} />
        <Button style={{ marginTop: 20 }} onPress={handleSubmit} mode='elevated'>Sign In</Button>
        <Button style={{ marginTop: 20 }} onPress={() => navigation.navigate('Auth', { screen: "SignUp" })} mode='text'>Sign Up</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default SignInScreen