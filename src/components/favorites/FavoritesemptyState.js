import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../res/colors';

export const FavoritesemptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite jet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});
