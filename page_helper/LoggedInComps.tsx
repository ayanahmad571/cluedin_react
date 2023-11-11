import React from 'react';
import Home from '../pages/Home';
import Logout from '../pages/Logout';
import HelpPage from '../pages/HelpPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopBarRealComponent from '../utils/TopBarRealComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const LoggedInComponents = () => (
  <Tab.Navigator
    initialRouteName="Home" // Set the initial route name to "Home"
    backBehavior="initialRoute" // Set the back behavior to initialRou
    screenOptions={({route}) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({focused, color, size}) => {
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
        return (
          <Ionicons name={iconName} size={size} style={{color: iconCol}} />
        );
      },
      // eslint-disable-next-line react/no-unstable-nested-components
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

export default LoggedInComponents;
