import React, {createContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenPage from './pages/SplashScreen';
import Home from './pages/Home';
import Logout from './pages/Logout';
import HelpPage from './pages/HelpPage';
import LeaderboardPage from './pages/LeaderboardPage';
import {API_BASE_URL} from './utils/constants';
import AuthContext from './utils/AuthContext'; // Import the AuthContext from your file
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBarRealComponent from './utils/TopBarRealComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import NotLoggedInComponents from './page_helper/NotLoggedInComps';

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
        setUser('');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
    SplashScreen.hide();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {isLoading ? (
        // Render a SplashScreenPage or Loading component
        <SplashScreenPage />
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

const Tab = createBottomTabNavigator();

const LoggedInComponents = () => (
  <Tab.Navigator
    initialRouteName="Home" // Set the initial route name to "Home"
    backBehavior="initialRoute" // Set the back behavior to initialRou
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        const iconCol = focused ? '#1098F7' : 'white';

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'Leaderboard') {
          iconName = focused ? 'globe' : 'globe';
        } else if (route.name === 'Help') {
          iconName = focused ? 'help-outline' : 'help';
        } else {

        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size}  style={{color: iconCol}}  />;
      },
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
    })}>
    {/* <Tab.Screen name="LeaderBoard" component={Home} /> */}
    <Tab.Screen name="Leaderboard" component={LeaderboardPage} />
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Help" component={HelpPage} />
    <Tab.Screen name="Settings" component={Logout} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider />
    </NavigationContainer>
  );
};

export default App;
