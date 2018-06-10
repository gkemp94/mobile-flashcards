import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { getDecks, saveDeckTitle, deleteDeck, addCardToDeck } from './utils/api';
import DeckList from './components/DeckList';
import NewDeckView from './components/NewDeckView';
import DeckView from './components/DeckView';
import NewCardView from './components/NewCardView';

const RootStack = createStackNavigator({
  Decks: {
    screen: DeckList,
  },
  NewDeck: {
    screen: NewDeckView,
  },
  Deck: {
    screen: DeckView,
  }, 
  NewCard: {
    screen: NewCardView
  }
});

class App extends React.Component {
  state = {
    decks: [],
  }

  componentDidMount() {
    getDecks().then((results) => {
      this.setState({
        decks: results,
      })
    })
  }
  
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  async saveDeckTitle(title, cb) {
      await saveDeckTitle({ title }).then(() => {
        this.setState((oldState) => {
          oldState.decks[title] = {
            questions: [],
          }
          return oldState;
        })
      });
      cb();
  }
  
  deleteDeck(title) {
    deleteDeck({title})
      .then(() => {
        this.setState((oldState) => {
          oldState.decks[title] = undefined;
          delete oldState.decks[title];
          return oldState;
      })
    })
  }
  
  addCardToDeck({key, card}) {
    return addCardToDeck({title: key, card})
        .then(() => {
          this.setState((oldState) => {
            oldState.decks[key].questions.push(card);
            return oldState;
          })
        })
  }


  render() {
    
    const screenProps = {
      decks: this.state.decks,
      addCardToDeck: ({key, card}) => this.addCardToDeck({key, card}),
      saveDeckTitle: (title,cb) => this.saveDeckTitle(title, cb),
      removeDeck: (title) => this.deleteDeck(title),
    }
    
    return (
      <RootStack screenProps={screenProps} />
    );
  }
}

export default App