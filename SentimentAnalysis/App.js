import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      loading: true,
      output: null,
      probability: null,
    };
  }

  goForAxios = () => {
    const {input} = this.state;

    axios
      .request({
        method: 'POST',
        url: 'https://sentiment-analysis4.p.rapidapi.com/reviews',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'YOUR API KEY HERE',
          'x-rapidapi-host': 'sentiment-analysis4.p.rapidapi.com',
        },
        data: {
          text: input,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          output: response.data.label,
          probability: response.data.scope,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {loading, probability, output} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find Sentiment</Text>
          <Text style={styles.subtitle}>Sentiment Analysis Detector</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter text to perform Sentiment Analysis"
            onChangeText={(value) => this.setState({input: value})}></Input>
          <View style={styles.buttonContainer}>
            <Button
              title="Find Sentiment"
              buttonStyle={styles.button}
              titleStyle={{fontSize: 20}}
              onPress={this.goForAxios}></Button>
          </View>
          {loading ? (
            <Text></Text>
          ) : (
            <View style={styles.output}>
              <Text style={{fontSize: 18}}>{output + '-' + probability}</Text>
            </View>
          )}
          <View style={styles.imageContainer}>
            <Image
              source={require('./assets/drama.png')}
              style={styles.dramaImage}></Image>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d15c',
  },
  titleContainer: {
    marginTop: 70,
    marginLeft: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 90,
  },
  imageContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  dramaImage: {
    width: 170,
    height: 170,
  },
  output: {
    // fontSize: 29,
    alignItems: 'center',
  },
});
