import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, ListItem, Text, Icon, Button, Body, Right } from 'native-base';

class DeckList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "My Decks",
            headerRight: (
            <Button
              transparent style={{marginTop: 6}}
              onPress={() => navigation.navigate('NewDeck')}
            >
              <Icon name='add' style={{color: 'black'}}/>
            </Button>
            )
        }
    };

  render() {
    const { decks } = this.props.screenProps;
    const deckKeys = Object.keys(decks);
    return (
      <View>
      <ScrollView>
        <List>
          {deckKeys.map((key) => {
            return (
              <ListItem 
                key={key}
                onPress={() => this.props.navigation.navigate('Deck', {key})}
              >
                <Body>
                  <Text>{key}</Text>
                  <Text note> {decks[key].questions.length} cards </Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
          })}
        </List>
      </ScrollView>
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