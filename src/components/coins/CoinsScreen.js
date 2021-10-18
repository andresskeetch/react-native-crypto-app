import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Http} from '../../libs/http';
import {CoinsDetail} from './CoinsDetail';
import {colors} from '../../res/colors';
import {CoinsSearch} from './CoinsSearch';

export const CoinsScreen = ({navigation}) => {
  const [currencies, setCurrencies] = useState([]);
  const [allCurrencies, setAllCurrencies] = useState([]);
  useEffect(() => {
    Http.instance.get('https://api.coinlore.net/api/tickers/').then(request => {
      setCurrencies(request.data);
      setAllCurrencies(request.data);
    });
  }, []);

  const onPressItem = item => {
    navigation.navigate('Detail', {item});
  };

  const handleSearch = query => {
    const filterCurrencies = allCurrencies.filter(
      currency =>
        currency.name.toLowerCase().includes(query.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(query.toLowerCase()),
    );

    setCurrencies(filterCurrencies);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      <FlatList
        data={currencies}
        maxToRenderPerBatch={5}
        pagingEnabled={true}
        renderItem={({item}) => {
          return <CoinsDetail item={item} onPress={() => onPressItem(item)} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});
