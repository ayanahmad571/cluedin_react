import React, {createContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './pages/LoginPage';
import OTPVerify from './pages/OTPVerify';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Logout from './pages/Logout';
import {API_BASE_URL} from './utils/constants';
import AuthContext from './utils/AuthContext'; // Import the AuthContext from your file
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBarRealComponent from './utils/TopBarRealComponent';

// Create an AuthProvider component
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user has a JWT_USER token in AsyncStorage
        const jwtUser = await AsyncStorage.getItem('JWT_USER');
        console.log('User Store at APP Level', jwtUser);
        if (jwtUser !== null && jwtUser !== '') {
          // Token exists, send a request to validate it
          const response = await fetch(`${API_BASE_URL}/check_login_status`, {
            method: 'GET', // Or use POST as per your API's requirements
            headers: {
              Authorization: `Bearer ${jwtUser}`,
            },
          });

          if (response.status === 200) {
            // Token is valid, user is logged in
            setUser(jwtUser);
          } else if (response.status === 500) {
            // Server is down, display a message to the user
            // You can navigate to an error screen if needed
            // For now, just set JWT_USER to an empty string
            setUser('');
          } else {
            // Token is expired or other error, user is not logged in
            // Set JWT_USER to an empty string
            setUser('');
          }
        } else {
          // Token doesn't exist or is an empty string, user is not logged in
          setUser('');
        }
      } catch (error) {
        // Network error or other issues, user is not logged in
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {isLoading ? (
        // Render a SplashScreen or Loading component
        <SplashScreen />
      ) : user ? (
        // User is logged in
        <LoggedInComponents />
      ) : (
        // User is not logged in
        <NotLoggedInComponents />
      )}
    </AuthContext.Provider>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInComponents = () => (
  <Tab.Navigator
    initialRouteName="Home" // Set the initial route name to "Home"
    backBehavior="initialRoute" // Set the back behavior to initialRou
    screenOptions={{
      headerTitle: () => <TopBarRealComponent />,
      headerStyle: {
        backgroundColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
      },
      tabBarStyle: {
        backgroundColor: 'black',
      },
      tabBarLabelStyle: {
        color: 'white',
        fontSize: 12,
      },
      headerTitleAlign: 'center',
    }}>
    {/* <Tab.Screen name="LeaderBoard" component={Home} /> */}
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Logout" component={Logout} />
  </Tab.Navigator>
);

const NotLoggedInComponents = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'black', // Change the background color
      },
      headerTintColor: 'white', // Set the text color to white
      headerTitle: 'Clued In', // Set the title text to your company title
      headerTitleStyle: {
        fontSize: 24, // Customize the font size
        fontWeight: 'bold', // Customize the font weight
        color: 'white', // Set the text color to white
      },
      headerTitleAlign: 'center', // Center align the title
    }}>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Verify OTP" component={OTPVerify} />
    {/* Add more screens for not-logged-in users */}
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider />
    </NavigationContainer>
  );
};

export default App;
