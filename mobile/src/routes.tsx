import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="InstitutionsMap" component={InstitutionsMap} />
        <Screen name="InstitutionDetails" component={InstitutionDetails} />
      </Navigator>
    </NavigationContainer>
  );
};