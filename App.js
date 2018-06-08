import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { getDecks, saveDeckTitle, flushPendingRequests } from './utils/api';
import  DeckList from './components/DeckList';
import NewDeckView from './components/NewDeckView';

const RootStack = createStackNavigator({
  Decks: {
    screen: DeckList,
  },
  NewDeck: {
    screen: NewDeckView,
  }
});

class App extends React.Component {
  state = {
    decks: 0,
  }

  componentDidMount() {
    getDecks().then((results) => {
      this.setState({
        decks: results,
      })
    })
  }

  render() {
    const screenProps = {
      decks: this.state.decks,
    }
    return (
      <RootStack screenProps={screenProps} />
    );
  }
}

export default App