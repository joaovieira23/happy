import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';

import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import InstitutionData from './pages/CreateInstitution/InstitutionData';
import Header from './components/Header';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F2F5F5' } }}>
        <Screen
          name="InstitutionsMap"
          component={InstitutionsMap}
        />

        <Screen
          name="InstitutionDetails"
          component={InstitutionDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Instituto" />
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />

        <Screen
          name="InstitutionData"
          component={InstitutionData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};