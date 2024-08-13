import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { auth } from '../firebase';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home'); // Navigate to Home screen on successful login
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Urban Art Gallery</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, backgroundColor: '#fff' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});

export default LoginScreen;
