import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Storage from '../../libs/storage';
import {colors} from '../../res/colors';
import {CoinsDetail} from '../coins/CoinsDetail';
import {FavoritesemptyState} from './FavoritesemptyState';

export const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();

    navigation.addListener('focus', getFavorites);

    return navigation.removeListener('focus', getFavorites);
  }, []);

  const getFavorites = async () => {
    const allKeys = await Storage.instance.getAllKeys();

    const keys = allKeys.filter(key => key.includes('favorite-'));

    const favs = Storage.instance.multiGet(keys);

    setFavorites((await favs).map(fav => JSON.parse(fav[1])));
  };

  const handlePress = item => {
    navigation.navigate('Detail', {item});
  };

  return (
    <View style={styles.container}>
      {!favorites.length ? <FavoritesemptyState /> : null}
      {favorites.length ? (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsDetail item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPearl,
    flex: 1,
  },
});
