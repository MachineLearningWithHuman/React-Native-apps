import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount() {
    const {count} = this.state;
    this.setState({count: count + 1});
  }

  render() {
    const {count} = this.state;
    return (
      <View style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tutorial App</Text>
        </View>
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{count}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Press Me"
            buttonStyle={styles.button}
            onPress={this.incrementCount.bind(this)}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  titleContainer: {
    paddingTop: 100,
    paddingLeft: 30,
  },
  title: {
    fontSize: 30,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },

  outputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  outputText: {
    fontSize: 30,
  },
});
