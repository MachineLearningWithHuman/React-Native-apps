import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import List from '../components/UI/List';
import {TrendingMovieTv} from '../components/services/services';
import {Button, Icon} from 'react-native-elements';
const Trending = ({navigation}) => {
  const [trendingAll, setTrendingAll] = useState();
  const [trendingWeek, setTrendingWeek] = useState();
  const [trendingMovieAll, setTrendingMovieAll] = useState();
  const [trendingMovieWeek, setTrendingMovieWeek] = useState();
  const [trendingTvAll, setTrendingTvAll] = useState();
  const [trendingTvWeek, setTrendingTvWeek] = useState();
  const [trendingPeopleAll, setTrendingPeopleAll] = useState();
  const [trendingPeopleWeek, setTrendingPeopleWeek] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      TrendingMovieTv('day', 'all'),
      TrendingMovieTv('week', 'all'),
      TrendingMovieTv('day', 'movie'),
      TrendingMovieTv('week', 'movie'),
      TrendingMovieTv('day', 'tv'),
      TrendingMovieTv('week', 'tv'),
      TrendingMovieTv('day', 'person'),
      TrendingMovieTv('week', 'person'),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          allData,
          allDataWeek,
          movieData,
          movieDataWeek,
          tvData,
          tvDataWeek,
          personData,
          personDataWeek,
        ]) => {
          setTrendingAll(allData),
            setTrendingWeek(allDataWeek),
            setTrendingMovieAll(movieData),
            setTrendingMovieWeek(movieDataWeek),
            setTrendingTvAll(tvData),
            setTrendingTvWeek(tvDataWeek),
            setTrendingPeopleAll(personData),
            setTrendingPeopleWeek(personDataWeek);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            {/* Recommended Movies */}
            {trendingAll && (
              <View style={styles.carousel}>
                <List
                  title={'Trending Today(All Types of Media)'}
                  content={trendingAll}
                  navigation={navigation}
                />
              </View>
            )}
            {/* Recommended Movies */}
            {trendingWeek && (
              <View style={styles.carousel}>
                <List
                  title={'Trending This Week(All Types of Media)'}
                  content={trendingWeek}
                  navigation={navigation}
                />
              </View>
            )}
            {/* Recommended Movies */}
            {trendingMovieAll && (
              <View style={styles.carousel}>
                <List
                  title={'Trending Today(Movies)'}
                  content={trendingMovieAll}
                  navigation={navigation}
                />
              </View>
            )}
            {/* Recommended Movies */}
            {trendingMovieWeek && (
              <View style={styles.carousel}>
                <List
                  title={'Trending This Week(Movies)'}
                  content={trendingMovieWeek}
                  navigation={navigation}
                />
              </View>
            )}
            {/* Recommended Movies */}
            {trendingTvAll && (
              <View style={styles.carousel}>
                <List
                  title={'Trending Today(TV)'}
                  content={trendingTvAll}
                  navigation={navigation}
                />
              </View>
            )}
            {/* Recommended Movies */}
            {trendingTvWeek && (
              <View style={styles.carousel}>
                <List
                  title={'Trending This Week(TV)'}
                  content={trendingTvWeek}
                  navigation={navigation}
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
      <View style={{flex: 1, justifyContent: 'center'}}>
        {!loaded && <ActivityIndicator size="large" />}
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

Trending.navigationOptions = ({navigation}) => ({
  title: 'Trending',
  headerTitleAlign: 'space-between',
  headerLeft: () => (
    <Button
      buttonStyle={{
        padding: 10,
        marginRight: 20,
        backgroundColor: '#000',
      }}
      icon={<Icon name="home" size={28} color="white" />}
      onPress={() => {
        navigation.navigate('Main');
      }}
    />
  ),
});

export default Trending;
