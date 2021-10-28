import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {discoverMovies} from '../components/services/services';
import Card from '../components/UI/Card';
import Error from '../components/UI/Error';
const Movies = ({navigation}) => {
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    discoverMovies().then(movieData => {
      setSearchResults(movieData);
      setLoaded(true);
    });
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </SafeAreaView>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {!loaded && <ActivityIndicator size="large" />}
      </View>
      {/* Error */}
      <View style={{flex: 1, justifyContent: 'center'}}>
        {error && <Error />}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
});

Movies.navigationOptions = ({navigation}) => ({
  title: 'Movies',
  headerTitleAlign: 'space-between',
  headerLeft: () => (
    <Button
      buttonStyle={{
        padding: 10,
        marginRight: 20,
        backgroundColor: '#000',
      }}
      icon={<Icon name="home" size={24} color="white" />}
      onPress={() => {
        navigation.navigate('Main');
      }}
    />
  ),
});

export default Movies;
