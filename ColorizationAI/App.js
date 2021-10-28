import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: true,
      dataSource: null,
      loading: true,
      base64: null,
    };
  }

  selectGalleryImage() {
    const options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          base64: response.base64,
        });
        this.goForAxios();
        // console.log(response);
      }
    });
  }

  goBackFunction() {
    this.setState({
      menu: true,
      dataSource: null,
      loading: true,
      base64: null,
    });
  }

  goForAxios() {
    const {base64} = this.state;
    this.setState({menu: false});
    console.log('Starting Request');
    axios
      .request({
        method: 'POST',
        url: 'https://ai-picture-colorizer.p.rapidapi.com/colorize-picture',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'YOUR API KEY HERE',
          'x-rapidapi-host': 'ai-picture-colorizer.p.rapidapi.com',
        },
        data: {
          imageBase64: base64,
          render_factor: '10',
        },
      })

      .then((response) => {
        // console.log('getting data from axios', response.data);
        this.setState({
          loading: false,
          dataSource: response.data.imageBase64,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {loading, dataSource, base64, menu} = this.state;
    return menu ? (
      <View style={styles.container}>
        {
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Image Colorization AI</Text>
            <Text style={styles.subtitle}>Color black and white images!</Text>
          </View>
        }
        {
          <View style={styles.imageContainer}>
            <Image
              source={require('./assets/old-video-camera.png')}
              style={styles.cameraImage}></Image>
          </View>
        }
        {
          <View style={styles.buttonContainer}>
            <Button
              title="Select Image"
              buttonStyle={styles.button}
              titleStyle={{fontSize: 20}}
              onPress={this.selectGalleryImage.bind(this)}></Button>
          </View>
        }
      </View>
    ) : (
      <View style={styles.outputContainer}>
        {
          <Button
            title="Go to Menu"
            buttonStyle={styles.buttonBack}
            onPress={this.goBackFunction.bind(this)}></Button>
        }
        {base64 ? (
          <Image
            style={styles.images}
            source={{
              uri: `data:image/png;base64,${base64}`,
            }}></Image>
        ) : (
          <ProgressBar indeterminate={true} />
        )}
        {loading ? (
          // <CircularProgressbar value={0.66}></CircularProgressbar>
          <ProgressBar indeterminate={true} />
        ) : (
          <Image
            style={styles.images}
            source={{
              uri: `data:image/png;base64,${dataSource}`,
            }}></Image>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff70b8',
    flex: 1,
  },

  images: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 17,
  },
  titleContainer: {
    marginTop: 80,
    marginLeft: 30,
  },

  button: {
    // color: 'black',
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
    // margin: 5,
  },

  buttonBack: {
    width: 100,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonContainer: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end',
    paddingBottom: 70,
  },

  cameraImage: {
    width: 220,
    height: 220,
    // flex: 1,
    // alignItems: 'center',
    // resizeMode: 'contain',
    // margin: 100,
  },

  imageContainer: {
    flex: 1,
    // paddingTop: 50,
    // marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff70b8',
  },
});
