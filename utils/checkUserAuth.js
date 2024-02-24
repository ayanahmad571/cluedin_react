import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './constants';

const checkUserAuthentication = async (setUser) => {
  const jwtUser = await AsyncStorage.getItem('JWT_USER');

  try {
    const response = await fetch(`${API_BASE_URL}/check_login_status`, {
      method: 'GET', // Or use POST as per your API's requirements
      headers: {
        Authorization: `Bearer ${jwtUser}`,
      },
    });

    if (response.status !== 200) {
      // Token is not valid, user is not logged in
      setUser('');
      return 2;
    } else {
      return 1;
    }
  } catch (error) {
    return 3;
  }
};

export default checkUserAuthentication;
