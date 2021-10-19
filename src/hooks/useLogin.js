import {useState} from 'react';
import {Auth} from '../libs/auth';

const useLoginUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const handleLoginGoogle = async () => {
    console.log('open');
    setLoading(true);
    try {
      await Auth.getInstance().handleLoginGoogle();
      setSuccess(true);
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }

    setLoading(false);
  };

  return {
    handleLoginGoogle,
    isLoading,
    isSuccess,
  };
};

export default useLoginUser;
