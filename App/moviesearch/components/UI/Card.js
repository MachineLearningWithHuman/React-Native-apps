import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate({
            routeName: 'Detail',
            params: {item: item},
          })
        }>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeholderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;

export default Card;
