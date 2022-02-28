import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

function UsersList(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // get users
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      // add user to temp users var + id
      querySnapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      // update users state
      setUsers(users);
    });
  }, []);
  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailsScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
}

export default UsersList;
