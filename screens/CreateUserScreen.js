import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "./../database/firebase";

function CreateUserScreen(props) {
  const [state, setState] = useState({ name: "", email: "", phone: "" });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      console.log("fill form");
    } else {
      await firebase.db.collection("users").add({
        name: state.name,
        email: state.email,
        phone: state.phone,
      });
      console.log("saved!");
      props.navigation.navigate("UserList");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Name"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Phone"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save User" onPress={() => saveNewUser()}></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default CreateUserScreen;
