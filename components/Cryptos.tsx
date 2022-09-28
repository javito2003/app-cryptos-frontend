import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import ICrypto from '../interfaces/Cryptos'
import CardCrypto from './CardCrypto'

interface IProps {
    crypto: ICrypto
}

const Cryptos = ({ crypto }: IProps) => {
    if (crypto) {
        return (
            <CardCrypto onPress={() => { }}>
                <>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: crypto.image }} style={{ width: 40, height: 40 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.title}>{crypto.symbol.toUpperCase()}</Text>
                            <Text style={styles.price}>{crypto.name}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.small}>${crypto.current_price || 0}</Text>
                        {
                            crypto.market_cap_change_percentage_24h > 0
                                ? <Text style={{ ...styles.small, ...styles.percentSuccess }}>+{crypto.market_cap_change_percentage_24h.toFixed(2)}%</Text>
                                : <Text style={{ ...styles.small, ...styles.percentRed }}>{crypto.market_cap_change_percentage_24h.toFixed(2)}%</Text>
                        }

                    </View>
                </>
            </CardCrypto>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: 'inter-medium'
    },
    small: {
        fontSize: 15,
        fontFamily: 'inter-light',
    },
    price: {
        fontSize: 15,
        color: "#ccc",
        fontFamily: 'inter-bold',
    },
    percentSuccess: {
        color: "green"
    },
    percentRed: {
        color: 'red'
    },
})

export default Cryptos