import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {colors} from '../../res/colors';

export const CoinsDetail = ({item, onPress}) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    }
    return require('../../assets/arrow_down.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.price}>{item.price_usd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.arrowImage} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 3,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    fontSize: 14,
    marginRight: 12,
    color: colors.white,
  },
  price: {
    fontSize: 14,
    color: colors.white,
  },
  percentText: {
    fontSize: 12,
    color: colors.white,
    marginRight: 8,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
});
