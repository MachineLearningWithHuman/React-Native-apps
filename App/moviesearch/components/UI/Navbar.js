import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  state = {};
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/movies.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('find');
              }}>
              <Icon name={'search-outline'} size={30} color={'#fff'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={'#fff'} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainNav: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
