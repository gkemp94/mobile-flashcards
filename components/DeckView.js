import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Button } from 'native-base';

class DeckView extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const key = navigation.getParam('key');
        return {
            title: key,
            headerRight: (
            <Button
              transparent style={{marginTop: 6}}
              onPress={() => {
                navigation.goBack();
                screenProps.removeDeck(key); 
              }}
            >
              <Icon name='trash' style={{color: 'red'}}/>
            </Button>
            )
        }
    };

  render() {
    const { decks } = this.props.screenProps;
    const key = this.props.navigation.getParam('key');
    const deck = decks[key];
    if(deck) {
        return (
      <View>
      <Text style={styles.header}>No. Cards: {deck.questions.length} </Text>
        <Button 
            block 
            light 
            style={{margin: 10}}
            onPress={() => this.props.navigation.navigate('NewCard', {key})}
        >
        <Text>Create a New Question</Text>
        </Button>
        <Button 
            block 
            light 
            style={{margin: 10}}
            onPress={() => this.props.navigation.navigate('Quiz', {title: key})}
        >
        <Text>Start a Quiz</Text>
        </Button>
      </View>
    );
    } else {
        return (
            <View> 
                <Text> Deck Not Found </Text>
            </View>
            )
    }
    
  }
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
    }
})

export default DeckView;