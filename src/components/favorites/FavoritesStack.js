import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../../res/colors';
import {FavoritesScreen} from './FavoritesScreen';

const Stack = createStackNavigator();

export const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
