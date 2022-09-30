import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'
import { INavigation } from '../navigation/NavigationContainer';
import { useAppSelector } from '../redux';

import CardCrypto from '../components/CardCrypto'


const HomeScreen = ({ navigation }: INavigation) => {
  const { isLogged } = useAppSelector(store => store.user)
  const [ userCryptos, setUserCryptos ] = React.useState([])
  const travelToCryptos = () => {
    navigation.navigate('Main', {
      screen: "Cryptos"
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        userCryptos.length ? (
          <View style={styles.cryptoContainer}>
            <Text>sda</Text>
          </View>
        ) : null
      }
        <View style={styles.cryptosContainer}>
        {
          !isLogged
          &&
            <CardCrypto onPress={() => navigation.navigate('Auth', { screen: "Login" })}>
              <View style={styles.containerAdd}>
                  <Ionicons name='log-in-outline' size={32} color="#000" />
                  <Text style={{...styles.fontCrypto, color: "#000"}}>Sign In</Text>
              </View>
            </CardCrypto>
        }
            <CardCrypto onPress={travelToCryptos}>
              <View style={styles.containerAdd}>
                  <Ionicons name='add-circle' size={32} color="#aaa" />
                  <Text style={styles.fontCrypto}>Show All Cryptos</Text>
              </View>
            </CardCrypto>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  cryptoContainer: {
    height: '40%',
    backgroundColor: "#15459E"
  },
  cryptosContainer: {
    height: '60%',
    padding: 30
  },
  
  containerAdd: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fontCrypto: {
    flex: 1,
    fontFamily: 'inter-bold',
    fontSize: 20,
    color: "#aaa",
    textAlign: 'center'
  }
});

export default HomeScreen