import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
global.atob = decode;

const jwtDecodeHelper = (token) => {
  try {
    d
    const decodedToken = jwtDecode(token);
    console.log('Recieved: ', token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return '';
  }
};

export default jwtDecodeHelper;
