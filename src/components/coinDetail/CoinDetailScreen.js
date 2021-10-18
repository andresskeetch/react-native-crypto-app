import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import {Http} from '../../libs/http';
import Storage from '../../libs/storage';
import {colors} from '../../res/colors';
import {CoinMarketItem} from './CoinMarketItem';

export const CoinDetailScreen = ({route, navigation}) => {
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const {item: coin} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: coin.symbol,
    });

    getMarkets(coin.id);
    getFavorite();
  }, []);

  const getSymbolIcon = symbol => {
    if (symbol) {
      return `https://c1.coinlore.com/img/16x16/${symbol
        .toLowerCase()
        .replace(' ', '-')}.png`;
    }
  };

  const getMarkets = coinId => {
    Http.instance
      .get(`https://api.coinlore.net/api/coin/markets/?id=${coinId}`)
      .then(request => {
        setMarkets(request);
      });
  };

  const getSections = () => {
    const data = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return data;
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`;

      const coinSaved = await Storage.instance.get(key);
      if (coinSaved) {
        setFavorite(true);
      }
    } catch (e) {
      console.log('Get favorite error', e);
    }
  };
  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coinStr = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, coinStr);

    if (stored) {
      setFavorite(true);
    }
  };

  const removeFavorite = async () => {
    const key = `favorite-${coin.id}`;

    Alert.alert(
      `Remove From Favorites `,
      `Are you sure that you want to remove ${coin.name} from you favorites?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: async () => {
            const stored = await Storage.instance.remove(key);

            if (stored) {
              setFavorite(false);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImage}
            source={{uri: getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.favoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Text style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </Text>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        data={markets}
        style={styles.list}
        horizontal={true}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    color: colors.white,
    padding: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
  },
  titleText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
    color: colors.white,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
    padding: 8,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  favoriteText: {
    color: colors.white,
  },
});
