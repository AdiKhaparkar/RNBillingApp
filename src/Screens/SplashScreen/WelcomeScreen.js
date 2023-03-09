import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { styles } from './Styles'
import { useNavigation } from '@react-navigation/native'
const SplashScreen = () => {
const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MainScreen")
    }, 3000);
  
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My Billing App</Text>
    </View>
  )
}

export default  SplashScreen;