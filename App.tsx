import NavigationContainer from './navigation/NavigationContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { useState } from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
 
async function fetchFonts() {
  await Font.loadAsync({
    'inter-light': require('./assets/fonts/Inter-Light.ttf'),
    'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
    'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
    'inter-black': require('./assets/fonts/Inter-Black.ttf')
  })
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  if (!loaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setLoaded(true)} onError={e => console.log(e)} />
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer />
      </SafeAreaProvider>
    </Provider>
  );
}


