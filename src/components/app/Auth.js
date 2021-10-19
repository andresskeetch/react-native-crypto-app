import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {colors} from '../../res/colors';
import useLoginUser from '../../hooks/useLogin';

export const Auth = () => {
  const {handleLoginGoogle} = useLoginUser();
  return (
    <View style={styles.container}>
      <Pressable style={styles.btnGoogle} onPress={handleLoginGoogle}>
        <Text style={styles.btnText}>Iniciar con Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackPearl,
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGoogle: {
    backgroundColor: colors.picton,
    padding: 16,
    margin: 16,
  },
  btnText: {
    color: colors.white,
    alignSelf: 'center',
  },
});
