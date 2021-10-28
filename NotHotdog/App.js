import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/model.tflite';
var labelsFile = 'models/labels.txt';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showResult: false,
      recognitions: null,
      source: null,
    };
    tflite.loadModel({model: modelFile, labels: labelsFile}, (err, res) => {
      if (err) console.log(err);
      else console.log(res);
    });
  }
  selectGalleryImage() {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker error');
      } else if (response.customButton) {
        console.log('User tapped custom button');
      } else {
        this.setState({
          source: {uri: response.uri},
        });
        tflite.runModelOnImage(
          {
            path: response.path,
            imageMean: 128,
            imageStd: 128,
            numResults: 2,
            threshold: 0.05,
          },
          (err, res) => {
            if (err) console.log(err);
            else {
              console.log(res[res.length - 1]);
              this.setState({recognitions: res[res.length - 1]});
            }
          },
        );
      }
    });
  }

  takeImage() {
    const options = {};
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker error');
      } else if (response.customButton) {
        console.log('User tapped custom button');
      } else {
        this.setState({
          source: {uri: response.uri},
        });
        tflite.runModelOnImage(
          {
            path: response.path,
            imageMean: 128,
            imageStd: 128,
            numResults: 2,
            threshold: 0.05,
          },
          (err, res) => {
            if (err) console.log(err);
            else {
              console.log(res[res.length - 1]);
              this.setState({recognitions: res[res.length - 1]});
            }
          },
        );
      }
    });
  }

  render() {
    const {recognitions, source} = this.state;
    return (
      <LinearGradient
        colors={['#dd3e54', '#dd3e09']}
        style={styles.linearGradient}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Not Hotdog</Text>
          <Text style={styles.subtitle}>Seafood Startup</Text>
        </View>
        <View style={styles.outputContainer}>
          {recognitions ? (
            <View>
              <Image source={source} style={styles.hotdogImage}></Image>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 25,
                }}>
                {recognitions['label'] +
                  ' - ' +
                  (recognitions['confidence'] * 100).toFixed(0) +
                  '%'}
              </Text>
            </View>
          ) : (
            <Image
              source={require('./assets/hotdog.png')}
              style={styles.hotdogImage}></Image>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Camera Roll"
            titleStyle={{fontSize: 20}}
            buttonStyle={styles.button}
            containerStyle={{margin: 5}}
            onPress={this.selectGalleryImage.bind(this)}></Button>
          <Button
            title="Take a Photo"
            titleStyle={{fontSize: 20}}
            buttonStyle={styles.button}
            containerStyle={{margin: 5}}
            onPress={this.takeImage.bind(this)}></Button>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 70,
    marginLeft: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  outputContainer: {
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
  },
  hotdogImage: {
    width: 270,
    height: 270,
  },
});
