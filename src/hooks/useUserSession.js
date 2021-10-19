import {Auth} from '../libs/auth';

export const useUserSession = () => {
  Auth.getInstance();
  return {
    hasSession: false,
    user: {},
  };
};
