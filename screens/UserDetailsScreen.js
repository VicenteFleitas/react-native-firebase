import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

function UserDetailsScreen(props) {
  const inititalState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
  const [user, setUser] = useState(inititalState);
  const [loading, setLoading] = useState(true);
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ id: doc.id, ...user });
    setLoading(false);
  };
  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UserList");
  };

  const updateUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(inititalState);
    props.navigation.navigate("UserList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove the user", "Are you sure?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  //
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Name"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Phone"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="#19ac52"
          title="Update User"
          onPress={() => updateUser()}
        ></Button>
      </View>
      <View>
        <Button
          color="#e37399"
          title="Delete User"
          onPress={() => openConfirmationAlert()}
        ></Button>
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

export default UserDetailsScreen;
