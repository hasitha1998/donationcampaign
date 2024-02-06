import React, {useState} from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/bloodbag.png';
import CustomInput from '../../components/CustomInput';

const SignInScreen = () => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <CustomInput placeholder="Username" 
      value={username}
       setValue={setUsername}/>
      <CustomInput placeholder="Password"
       value={password} setValue={setPassword}
        secureTextEntry={true}
       />
    </View>
  );
};

const styles = StyleSheet.create({
root: {
alignItems: 'center',
padding: 20,
},
  logo: {
    width: '70%',
    maxWidth: 300, 
    maxHeight: 300,
  },
});

export default SignInScreen;
