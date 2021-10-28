import React, {useState, useEffect} from 'react';
//import VideoPlayer from 'react-native-video-controls';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {
  getMovies,
  getMovieRecommendation,
  getSimilarMovie,
  getTv,
  getTvRecommendation,
  getSimilarTv,
} from '../components/services/services';
import StarRating from 'react-native-star-rating';
import List from '../components/UI/List';
import PlayButton from '../components/UI/PlayButton';
import Video from './Video';
import dateFormat from 'dateformat';
const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;
const Details = props => {
  const {navigation} = props;
  const item = navigation.state.params.item;
  const id = navigation.state.params.item.id;

  const [movieDetail, setMovieDetail] = useState();
  const [tvDetail, setTvDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [tvloaded, setTvLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendationMovie, setRecommendationMovie] = useState();
  const [recommenderLoaded, setRecommenderLoaded] = useState(false);
  const [recommendationTv, setRecommendationTv] = useState();
  const [recommenderLoadedTv, setRecommenderLoadedTv] = useState(false);
  const [similarMovie, setSimilarMovie] = useState();
  const [similarLoaded, setSimilarLoaded] = useState(false);
  const [similarTv, setSimilarTv] = useState();
  const [similarLoadedTv, setSimilarLoadedTv] = useState(false);

  useEffect(() => {
    getMovies(id).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    getTv(id).then(tvData => {
      setTvDetail(tvData);
      setTvLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    getMovieRecommendation(id).then(RecommendationData => {
      setRecommendationMovie(RecommendationData);
      setRecommenderLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    getTvRecommendation(id).then(RecommendationData => {
      setRecommendationTv(RecommendationData);
      setRecommenderLoadedTv(true);
    });
  }, [id]);

  useEffect(() => {
    getSimilarMovie(id).then(SimilarData => {
      setSimilarMovie(SimilarData);
      setSimilarLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    getSimilarTv(id).then(SimilarData => {
      setSimilarTv(SimilarData);
      setSimilarLoadedTv(true);
    });
  }, [id]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && item.title && (
        <View style={{backgroundColor: '#000'}}>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
            {/* Recommended Movies */}
            {recommendationMovie &&
              recommendationMovie.length > 0 &&
              recommenderLoaded && (
                <View style={styles.carousel}>
                  <List
                    title={'Recommendation based upon this Movies'}
                    content={recommendationMovie}
                    navigation={navigation}
                  />
                </View>
              )}
            {/*Similar Movies */}
            {similarMovie && similarMovie.length > 0 && similarLoaded && (
              <View style={styles.carousel}>
                <List
                  title={`Movies Similar to ${movieDetail.title}`}
                  content={similarMovie}
                  navigation={navigation}
                />
              </View>
            )}
          </ScrollView>
          <Modal animationType="fade" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}

      {tvloaded && !item.title && (
        <View style={{backgroundColor: '#000'}}>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                tvDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        tvDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>

              <Text style={styles.movieTitle}>{tvDetail.name}</Text>
              {tvDetail.genres && (
                <View style={styles.genresContainer}>
                  {tvDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={tvDetail.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{tvDetail.overview}</Text>

              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(tvDetail.first_air_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
            {/* Recommended Movies */}
            {recommendationTv &&
              recommendationTv.length > 0 &&
              recommenderLoadedTv && (
                <View style={styles.carousel}>
                  <List
                    title={'Recommendation based upon this Tv Series'}
                    content={recommendationTv}
                    navigation={navigation}
                  />
                </View>
              )}
            {/*Similar Movies */}
            {similarTv && similarTv.length > 0 && similarLoadedTv && (
              <View style={styles.carousel}>
                <List
                  title={`Tv Series Similar to ${tvDetail.name}`}
                  content={similarTv}
                  navigation={navigation}
                />
              </View>
            )}
          </ScrollView>
          <Modal animationType="fade" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        {!loaded && <ActivityIndicator size="large" />}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  overview: {
    padding: 15,
    color: 'white',
    fontSize: 15,
  },
  release: {
    fontWeight: 'bold',
    color: 'white',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Details.navigationOptions = ({navigation}) => ({
  title: 'Details',
  headerTitleAlign: 'center',
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

export default Details;
