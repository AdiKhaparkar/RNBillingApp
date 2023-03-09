import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/Screens/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    //<NavigationContainer>
      <AppNavigator />
    //</NavigationContainer>
  );
};

export default App;
