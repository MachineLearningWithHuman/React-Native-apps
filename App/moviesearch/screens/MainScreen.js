import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../components/services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/UI/List';
import Error from '../components/UI/Error';
import {Text} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const dimentions = Dimensions.get('screen');
const image = require('../assets/images/logo1.jpg');
const MainScreen = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
          return subscriber;
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  if (initializing) return null;

  if (!user) {
    return navigation.navigate('Login');
  }

  return (
    <react.Fragment>
      {/* Upcoming Movies */}
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimentions.height / 1.5}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {/* Popular Movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                title={'Popular Movies'}
                content={popularMovies}
                navigation={navigation}
              />
            </View>
          )}
          {/* Popular TV Shows */}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                title={'Popular TV Shows'}
                content={popularTv}
                navigation={navigation}
              />
            </View>
          )}
          {/* Family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                title={'Family Movies'}
                content={familyMovies}
                navigation={navigation}
              />
            </View>
          )}
          {/* Documentary Movies */}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                title={'Documentary Movies'}
                content={documentaryMovies}
                navigation={navigation}
              />
            </View>
          )}
        </ScrollView>
      )}
      <View style={{flex: 1, justifyContent: 'center'}}>
        {!loaded && <ActivityIndicator size="large" />}
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {error && <Error />}
      </View>
    </react.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MainScreen.navigationOptions = ({navigation}) => ({
  title: 'MovieBuzz',

  headerTitleAlign: 'center',
  headerLeft: () => (
    <View style={{flex: 1}}>
      <Image style={{width: 30, height: 30, margin: 20}} source={image} />
    </View>
  ),

  headerRight: () => (
    <View style={{flex: 1}}>
      <Button
        buttonStyle={{
          padding: 15,
          marginRight: 20,
          backgroundColor: 'transparent',
        }}
        icon={<Icon name="search-outline" size={28} color="#fff" />}
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
    </View>
  ),
});

export default MainScreen;
