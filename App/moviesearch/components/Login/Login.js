import React, {useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const submitEmailHandler = () => {
    //runs on submit and sets the state to nothing.
    setEmail('');
  };

  const submitPwdHandler = () => {
    //runs on submit and sets the state to nothing.
    setPassword('');
  };

  const login = async () => {
    setShowLoading(true);
    try {
      const doLogin = await auth().signInWithEmailAndPassword(email, password);
      setShowLoading(false);
      if (doLogin.user) {
        navigation.navigate('Home');
      }
    } catch (e) {
      setShowLoading(false);
      Alert.alert(e.message);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
              }}>
              <Text style={{fontSize: 28, height: 50, color: '#f00'}}>
                Please Login!
              </Text>
            </View>
            <View style={styles.subContainer}>
              <Input
                style={styles.textInput}
                placeholder="Your Email"
                leftIcon={<Icon name="mail" size={24} />}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <View style={styles.subContainer}>
              <Input
                style={styles.textInput}
                placeholder="Your Password"
                leftIcon={<Icon name="lock" size={24} />}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <View style={styles.subContainer}>
              <Button
                style={styles.textInput}
                icon={<Icon name="input" size={15} color="#f00" />}
                title="Login"
                onPress={() => login()}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Forgot Password?</Text>
            </View>
            <View style={styles.subContainer}>
              <Button
                style={styles.textInput}
                icon={<Icon name="refresh" size={15} color="white" />}
                title="Reset Password"
                onPress={() => {
                  navigation.navigate('Reset');
                }}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Not a user?</Text>
            </View>
            <View style={styles.subContainer}>
              <Button
                style={{...styles.textInput, color: 'white'}}
                icon={<Icon name="check-circle" size={15} color="white" />}
                title="Register"
                onPress={() => {
                  navigation.navigate('Register');
                }}
              />
            </View>
          </ScrollView>
          {showLoading && (
            <View style={styles.activity}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </View>
    </DismissKeyboard>
  );
}

Login.navigationOptions = ({navigation}) => ({
  title: 'Login',
  headerShown: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  formContainer: {
    height: 400,
    padding: 20,
    backgroundColor: '#000',
  },
  subContainer: {
    marginBottom: 20,
    padding: 5,
    backgroundColor: '#000',
    color: 'white',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18,
    margin: 5,
    width: 200,
    color: 'white',
  },
});
