import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveData = async(key:string, value: any) => {
    try {
        console.log(value)
        await AsyncStorage.setItem(`@${key}`, value)
    } catch (error) {
        console.log(error);
    }
}

export const getData = async(key: string, type?: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`)
        if(type === 'string') {
            return jsonValue != null ? jsonValue : null
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.log(error);
    }
}