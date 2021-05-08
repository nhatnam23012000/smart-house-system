import React, { Component} from "react";
import { 
    View, Text, StyleSheet, 
  } from "react-native";
import Dashboard from './navigation/dashboard';
import Homepage from './navigation/homepage';
import firebase from "firebase/app";
import "firebase/auth"
import apiKeys from "./config/keys"

export default class App extends Component {
  constructor(props){
    super(props); //call constructor of parent class, must have
    this.state = {
      isLoaded: true,
      isAuthenticationReady: false,
      isAuthenticated: false
    }
    //load firebase
    if(!firebase.apps.length){
      firebase.initializeApp(apiKeys.firebaseConfig)
      firebase.auth().onAuthStateChanged((user) => {
      this.setState({isAuthenticationReady: true});
      // if we have user then pass it into the value here
      this.setState({isAuthenticated:!!user});
      })
    }
    else{
      firebase.app();
    }    
    
    
    
  }
  render() {
    return (
      <View style={styles.container}>
        {/* show according to user logged in or not */}
        {(this.state.isAuthenticated) ? <Dashboard/> : <Homepage/>} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

