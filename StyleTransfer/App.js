import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseImageUser: null,
      styleImageUser: null,
      loading: true,
      dataSource: null,
    };
  }

  selectBaseImage() {
    const options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled Image Picker');
      } else if (response.error) {
        console.log('Error Occured');
      } else if (response.customButton) {
        console.log('User pressed custom Button');
      } else {
        this.setState({
          baseImageUser: response.base64,
        });
      }
    });
  }

  selectStyleImage() {
    const options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled Image Picker');
      } else if (response.error) {
        console.log('Error Occured');
      } else if (response.customButton) {
        console.log('User pressed custom Button');
      } else {
        this.setState({
          styleImageUser: response.base64,
        });
      }
    });
  }

  goForAxios() {
    const {baseImageUser, styleImageUser} = this.state;
    console.log('Starting Request');

    axios
      .request({
        method: 'POST',
        url: 'https://ai-art-maker.p.rapidapi.com/art-remixer-api',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'YOUR API KEY HERE',
          'x-rapidapi-host': 'ai-art-maker.p.rapidapi.com',
        },
        data: {
          base64ContentImage: baseImageUser,
          base64StyleImageList: [styleImageUser],
          focusContent: true,
        },
      })
      .then((response) => {
        console.log('Completed');
        this.setState({
          loading: false,
          dataSource: response.data.base64Image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goBackFunction() {
    this.setState({
      baseImageUser: null,
      styleImageUser: null,
      dataSource: null,
      loading: true,
    });
  }

  render() {
    const {baseImageUser, styleImageUser, loading, dataSource} = this.state;
    return baseImageUser == null || styleImageUser == null ? (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Neural Style Transfer</Text>
          <Text style={styles.subtitle}>Art Style Transfer Generator</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/painting1.png')}
            style={styles.artImage}></Image>
        </View>
        <View style={styles.buttonContainer}>
          {baseImageUser ? (
            <ProgressBar indeterminate={true}></ProgressBar>
          ) : (
            <Button
              title="Select Base Image"
              buttonStyle={styles.button}
              onPress={this.selectBaseImage.bind(this)}></Button>
          )}

          {styleImageUser ? (
            <ProgressBar indeterminate={true}></ProgressBar>
          ) : (
            <Button
              title="Select Style Image"
              buttonStyle={styles.button}
              onPress={this.selectStyleImage.bind(this)}></Button>
          )}
        </View>
      </View>
    ) : (
      <View style={styles.outputContainer}>
        <Button
          title="Go to Menu"
          buttonStyle={styles.buttonBack}
          containerStyle={styles.buttonBackContainer}
          onPress={this.goBackFunction.bind(this)}></Button>
        <Button
          title="Transfer Image"
          buttonStyle={styles.button}
          containerStyle={styles.buttonTransferContainer}
          onPress={this.goForAxios.bind(this)}></Button>
        {baseImageUser ? (
          <Image
            source={{uri: `data:image/png;base64,${baseImageUser}`}}
            style={styles.images}></Image>
        ) : (
          <ProgressBar indeterminate={true}></ProgressBar>
        )}
        {loading ? (
          <ProgressBar indeterminate={true}></ProgressBar>
        ) : (
          <Image
            source={{uri: `data:image/png;base64,${dataSource}`}}
            style={styles.images}></Image>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6adfe6',
    flex: 1,
  },
  titleContainer: {
    marginTop: 80,
    marginLeft: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 17,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
    margin: 5,
  },
  artImage: {
    width: 260,
    height: 260,
  },
  outputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6adfe6',
  },
  buttonBack: {
    width: 150,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonBackContainer: {
    marginTop: 3,
  },
  buttonTransferContainer: {
    margin: 10,
  },
  images: {
    width: 250,
    height: 250,
    resizeMode: 'stretch',
    margin: 2,
  },
});
