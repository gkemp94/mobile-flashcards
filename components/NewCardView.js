import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Item, Input, Label, Button} from 'native-base';

class NewCardView extends React.Component {
  state = {
    question: "",
    answer: "",
    error: "",
  }
  static navigationOptions = ({ navigation }) => {
      return {
          title: "Adding Card to " + navigation.getParam('key') + " Deck",
      }
  };
  
  addCard() {
    let { question, answer} = this.state;
    if(question && answer) {
      let key = this.props.navigation.getParam('key');
      let card = { question, answer };
      this.props.screenProps.addCardToDeck({ key, card }).then(() => {
        this.setState({question: "", answer: "", error: ""});
      })
    }
  }
  addCardAndReturn() {
    this.addCard();
    this.props.navigation.goBack();
  }
  
  render() {
    return (
      <View>
          <Form>
            <Item stackedLabel>
              <Label>Question</Label>
              <Input
                value={this.state.question}
                onChangeText={(question) => this.setState({question})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Answer</Label>
              <Input
                value={this.state.answer}
                onChangeText={(answer) => this.setState({answer})}
              />
            </Item>
          </Form>
          <Button 
            block 
            light 
            style={{margin: 10}}
            onPress={() => this.addCard()}
          >
            <Text>Add to Deck & Create New Card</Text>
          </Button>
                    <Button 
            block 
            light 
            style={{margin: 10}}
            onPress={() => this.addCardAndReturn()}
          >
            <Text>Add to Deck & Go Back to Deck</Text>
          </Button>
          <Text style={{color: '#e53935',textAlign: 'center'}}>{this.state.error}</Text>
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

export default NewCardView;