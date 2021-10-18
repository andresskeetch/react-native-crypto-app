import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../res/colors';
import {FavoritesemptyState} from './FavoritesemptyState';
export const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesemptyState />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPearl,
    flex: 1,
  },
});
