import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import {colors} from '../../res/colors';

export const CoinsSearch = ({onChange}) => {
  const [query, setQuery] = useState('');
  const handleText = text => {
    setQuery(text);
    onChange(text);
  };
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        placeholder="Search coin ..."
        value={query}
        onChangeText={handleText}
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: colors.white,
  },
  textInputAndroid: {
    borderWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
