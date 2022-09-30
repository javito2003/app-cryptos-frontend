import React, { useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { TextInput, Button, Text, Portal, Dialog, Paragraph } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { INavigation } from '../navigation/NavigationContainer'
import {IUser} from '../interfaces/User'
import customFetch from '../utils/customFetch'

interface IUserInput {
  name: string
  email: string
  password: string
}

const SignUpScreen = ({ navigation }: INavigation) => {
  const [showPass, setShowPass] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const [ type, setType ] = useState<boolean | null>(null)
  const [ messageRegister, setMessageRegister ] = useState("")
  const { control, handleSubmit, formState: { errors } } = useForm<IUserInput>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async(data: IUserInput) => {
    Keyboard.dismiss()
    let { body, error } = await customFetch<IUser>({ method: "POST", url: "/user/register", body: data })
    if (!error) {
      setType(true)
      setShowModal(true)
      setMessageRegister("User created")
      
      setTimeout(() => {
        setShowModal(false)
        setType(null)
        setMessageRegister("")
        navigation.goBack()
      }, 3000)
    } else {
      setType(false)
      setShowModal(true)
      setMessageRegister(typeof body === 'string' ? body : "Error to create user")
      setTimeout(() => {
        setShowModal(false)
        setType(null)
        setMessageRegister("")
      }, 3000)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <Controller
          control={control}
          rules={{
            min: {
              value: 5,
              message: "5 characters min"
            },
            max: {
              value: 10,
              message: "10 character max"
            },
            required: {
              value: true,
              message: "Name is required"
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput autoCapitalize='none' value={value} onChangeText={onChange} onBlur={onBlur} mode='outlined' label="Username" placeholder='example' />
          )}
          name='name'

        />
        {errors.name && <Text style={{ color: "#eb4034" }}>*{errors.name.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email is required"
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email should be valid"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoComplete='email' value={value} onChangeText={onChange} onBlur={onBlur} mode='outlined' label="Email" placeholder='example@example.com' />
          )}
          name='email'

        />
        {errors.email && <Text style={{ color: "#eb4034" }}>*{errors.email.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Password is required"
            },
            minLength: {
              value: 5,
              message: "Min 5 characters"
            },
            maxLength: {
              value: 15,
              message: "Max 15 characters"
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput value={value} onChangeText={onChange} onBlur={onBlur} mode='outlined' label="Password" placeholder='**********' secureTextEntry={!showPass} right={<TextInput.Icon onPress={() => setShowPass(!showPass)} icon={!showPass ? 'eye' : 'eye-off'} />} />
          )}
          name='password'

        />
        {errors.password && <Text style={{ color: "#eb4034" }}>*{errors.password.message}</Text>}

        <Button style={{ marginTop: 20 }} onPress={handleSubmit(onSubmit)} mode='elevated'>Sign Up</Button>
        <Button style={{ marginTop: 20 }} onPress={() => navigation.goBack()} mode='text'>Sign In</Button>
      </View>

      <Portal>
        <Dialog visible={showModal}>
            <Dialog.Title style={{ textAlign: 'center', color: type === false ? "#eb4034" : 'green' }}>{ type === false ? 'Error!' : 'Success!' }</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={{ textAlign: 'center' }}>{messageRegister}</Paragraph>
              {
                type === true
                && <Paragraph style={{ textAlign: 'center' }}>Redirecting to Login Page in 3s</Paragraph>
              }
            </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default SignUpScreen