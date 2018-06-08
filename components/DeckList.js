import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class DeckList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "My Decks",
            headerRight: (
                <Button
                onPress={() => navigation.navigate('NewDeck')}
                title="Info"
                color="#fff"
              />
            )
        }
    };

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.screenProps)}</Text>
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

export default DeckList;