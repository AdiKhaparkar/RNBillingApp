import { StyleSheet } from 'react-native'
import { THEME_COLOR } from '../../Common/Colors'

export const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:THEME_COLOR
},
logo:{
    color:"#fff",
    fontWeight:"800",
    fontSize:30
}
})