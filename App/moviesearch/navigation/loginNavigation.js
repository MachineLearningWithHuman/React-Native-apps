import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
import Home from '../components/Login/Home';
import Reset from '../components/Login/Reset';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MainScreen from '../screens/MainScreen';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Details from '../screens/Details';
import Search from '../screens/Search';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Trending from '../screens/Trending';
import GoogleLogin from '../components/Login/Google';
import Video from '../screens/Video';
import {Alert} from 'react-native';

const defaultNavigation = {
  headerStyle: {
    backgroundColor: '#000',
  },

  headerTintColor: '#f00',

  headerTitleStyle: {
    fontWeight: 'bold',
    headerTitleAlign: 'center',
  },
};

const MoviesNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Detail: Details,
    Search: Search,
    Trend: Trending,
    Movie: Movies,
    Tv: Tv,
    Video: Video,
  },
  {
    defaultNavigationOptions: defaultNavigation,
  },
);

const HomeNavigator = createStackNavigator(
  {LogOut: Home},
  {
    defaultNavigationOptions: defaultNavigation,
  },
);

const TrendingNavigator = createStackNavigator(
  {
    Trend: Trending,
    Detail: Details,
  },
  {
    defaultNavigationOptions: defaultNavigation,
  },
);

const MovieNavigator = createStackNavigator(
  {
    Movie: Movies,
    Detail: Details,
  },
  {
    defaultNavigationOptions: defaultNavigation,
  },
);

const TvNavigator = createStackNavigator(
  {
    Tv: Tv,
    Detail: Details,
  },
  {
    defaultNavigationOptions: defaultNavigation,
  },
);

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: MoviesNavigator,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icone name="home" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
  Trending: {
    screen: TrendingNavigator,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icone name="trending-up" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icon name="md-search" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
  Movies: {
    screen: MovieNavigator,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icone name="movie-search" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
  TV: {
    screen: TvNavigator,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icon name="ios-tv-outline" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
  LogOut: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabinfo => {
        return <Icon name="person" size={25} color="#fff" />;
      },
      tabBarOptions: {
        activeTintColor: '#f00',

        style: {
          backgroundColor: 'black',
        },
      },
    },
  },
});

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Google: GoogleLogin,
    Home: BottomTabNavigator,
    Reset: Reset,
    Search: Search,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {},

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const MainNavigator = createSwitchNavigator({
  Auth: RootStack,
  Movies: BottomTabNavigator,
});
export default createAppContainer(MainNavigator);
