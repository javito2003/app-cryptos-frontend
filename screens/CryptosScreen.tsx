import React from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import Cryptos from '../components/Cryptos'
import useFetch from '../hooks/useFetch'
import ICrypto from '../interfaces/Cryptos'
import { useAppSelector } from '../redux'

const CryptosScreen = () => {
    const cryptos = useAppSelector(state => state.cryptos.cryptos)

    return (
        <SafeAreaView>

            <View style={{ marginHorizontal: 5 }}>
                <FlatList
                    data={cryptos}
                    initialNumToRender={10}
                    renderItem={({ item }) => (
                        <Cryptos crypto={item} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView>
    )
}

export default CryptosScreen