import React from 'react'
import { View, StyleSheet, TouchableOpacity,} from 'react-native'

type TProps = {
    children: JSX.Element,
    onPress: () => void
}

const CardCrypto = ({ children, onPress }: TProps) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: '#000',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

})

export default CardCrypto