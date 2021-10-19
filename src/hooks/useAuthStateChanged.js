import {useEffect, useState} from 'react';
import {Auth} from '../libs/auth';

export const useAuthStateChange = () => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = Auth.getInstance().authStateChange(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    initializing,
    user: currentUser,
  };
};
