import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class NewDeckView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "New Deck",
            headerLeft: (
                <Button
                onPress={() => navigation.goBack()}
                title="Cancel"
                color="red"
              />
            ),
            headerRight: (
                <Button
                onPress={() => navigation.goBack()}
                title="Save"
                color="#000"
              />
              
            )
        }
    };
  render() {
    return (
      <View style={styles.container}>
        <Text>New Deck List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewDeckView;