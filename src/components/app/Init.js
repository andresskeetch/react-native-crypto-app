import React from 'react';
import {App} from './App';
import {Auth} from './Auth';
import {useAuthStateChange} from '../../hooks/useAuthStateChanged';

export const Init = () => {
  const {user} = useAuthStateChange();

  return user ? <App /> : <Auth />;
};
