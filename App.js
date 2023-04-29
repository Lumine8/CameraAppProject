/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Fragment, Component, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default function App(){
  
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [resultUri, setResultUri] = useState('')

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("No Gallery Access!");
      return;
    }
    //Allow editing after taking the image from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Explore the result
    // console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      setResultUri(result.assets[0].uri);
      
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("No Camera Access!");
      return;
    }

    //Allow editing after taking the picture
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Explore the result
    // console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      // console.log(result.assets[0].uri);
      setResultUri(result.assets[0].uri)
    }
  }
  const finallyOcr = async(urioutput) => {
    console.log(urioutput)
    const resultFromUri = await MlkitOcr.detectFromUri(urioutput);
    console.log(resultFromUri)
  }

  return (
    <View style={styles.container}>

      <Text style={{color:'black',fontSize:20}}>Preview Image</Text>
      <View>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            
            style={styles.previewImage}
          />
        }
      </View>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.button} onPress={showImagePicker}><Text style={styles.buttonText}>Select from gallery</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openCamera}><Text style={styles.buttonText}>Open camera</Text></TouchableOpacity>

      </View>
      <TouchableOpacity style={{marginTop:15}} onPress={()=>{
        console.log(String(resultUri))
      }}><Text style={{color:'black',fontSize:20}}>Continue</Text></TouchableOpacity>      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  
    button: {
      marginHorizontal: 5,
      backgroundColor: '#5A5A5A',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#4A4A4A',
      fontWeight: 'bold',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textTransform: 'uppercase',
    },
  
    previewImage: {
      width: 350,
      height: 450,
      borderRadius: 10,
      marginTop: 20,
      borderWidth: 3,
      borderColor: '#5A5A5A',
    },
  });
  