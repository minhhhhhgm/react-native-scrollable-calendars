import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './Screens/Home';
import Week from './Screens/Week';
import Expand from './Screens/Expand';
import Month from './Screens/Month';

export const Stack = createNativeStackNavigator();

const routes = [
  {title: 'Home', name: 'Home', component: Home},
  {title: 'Week', name: 'Week', component: Week},
  {title: 'Month', name: 'Month', component: Month},
  {title: 'Expand', name: 'Expand', component: Expand},
];

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
            }}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
