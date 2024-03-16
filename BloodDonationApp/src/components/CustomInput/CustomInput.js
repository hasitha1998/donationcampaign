import { View, Text,TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput 
      value = {value}
      onChangeText={setValue}
      placeholder={placeholder} 
      style={styles.input}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height:'7%',

        borderColor : '#e8e8e8',
        borderWidth:1,
        borderRadius:5,

        paddingHorizontal:10,
        marginVertical:5,
    },
    input: {
        padding:5,
    },
});

export default CustomInput