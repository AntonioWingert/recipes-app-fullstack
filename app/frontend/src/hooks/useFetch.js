import { useState } from 'react';
import { requestData } from '../api/requests';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (endpoint) => {
    setIsLoading(true);
    try {
      const data = await requestData(endpoint);
      return data;
    } catch (error) {
      throw new Error(`Ocorreu um erro, por favor tente novamente mais tarde. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    Error, isLoading, makeFetch,
  };
}

export default useFetch;
