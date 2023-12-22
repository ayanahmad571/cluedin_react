import React, { useEffect, useState } from 'react';
import Home from '../pages/Home';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBarRealComponent from '../utils/TopBarRealComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CLUEDIN_DARK_SCHEME, CLUEDIN_THEME } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewLoginUsername from './NewLoginUsername';

const Tab = createBottomTabNavigator();


const LoggedInComponents = () => {
  const [isNewLogin, setIsNewLogin] = useState(false);

  const checkNewLogin = async () => {
    const NEW_LOGIN = await AsyncStorage.getItem('NEW_LOGIN');
    console.log('User NEW_LOGIN at APP Level', NEW_LOGIN);
    if (NEW_LOGIN !== null && NEW_LOGIN === 'yes') {
      await AsyncStorage.setItem('NEW_LOGIN', '');
      setIsNewLogin(true);
    }
  };

  useEffect(() => {
    checkNewLogin();
  }, []);

  return isNewLogin ? (
    <NewLoginUsername setIsNewLogin={setIsNewLogin} />
  ) : (
    <Tab.Navigator
      initialRouteName="Home" // Set the initial route name to "Home"
      backBehavior="initialRoute" // Set the back behavior to initialRou
      screenOptions={({route}) => ({
        // unmountOnBlur: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const iconCol = focused ? CLUEDIN_THEME.orange : CLUEDIN_THEME.white;

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
          return (
            <Ionicons name={iconName} size={size} style={{color: iconCol}} />
          );
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        headerStyle: {
          backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
        },
        headerTintColor: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
        headerTitleStyle: {
          fontSize: 20, // Customize the font size
          fontWeight: '500', // Customize the font weight
          color: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
        },
        tabBarStyle: {
          backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
        },
        tabBarLabelStyle: {
          color: CLUEDIN_DARK_SCHEME.header_background_text,
          fontSize: 12,
        },
        headerTitleAlign: 'center',
      })}>
      {/* <Tab.Screen name="LeaderBoard" component={Home} /> */}
      <Tab.Screen name="Leaderboard" component={LeaderboardPage} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Help" component={HelpPage} />
      <Tab.Screen name="Settings" component={SettingsPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default LoggedInComponents;
