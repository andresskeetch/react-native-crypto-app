import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);

      return true;
    } catch (e) {
      console.log('Error set storage', e);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('Error get storage', e);

      throw e;
    }
  };

  multiGet = async key => {
    try {
      return await AsyncStorage.multiGet(key);
    } catch (e) {
      console.log('Error multiGet storage', e);

      throw e;
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('Error getAllKeys storage', e);

      throw e;
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.log('Error remove storage', e);

      throw e;
    }
  };
}

export default Storage;
