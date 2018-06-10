import React from 'react';
import { Text, View } from 'react-native';
import { Form, Item, Input, Label, Button} from 'native-base';

class NewDeckView extends React.Component {
  state = {
    title: "",
    error: "",
  }
  
  static navigationOptions = ({ navigation }) => {
      return {
          title: "New Deck",
      }
  };
  
  handleSubmit() {
    const keys = Object.keys(this.props.screenProps.decks);
    
    if (keys.indexOf(this.state.title) > 0) {
      this.setState({
        error: "Deck already exists, please choose unique name."
      })
    } else if(this.state.title) {
      let { title } = this.state;
      this.props.screenProps.saveDeckTitle(title, () => {
        this.setState({title: ""});
        this.props.navigation.navigate('Deck', {key: title})
      });
    } else {
      this.setState({error: "Please Enter A Title."})
    }

  }
  
  render() {
    return (
      <View>
          <Form>
            <Item stackedLabel>
              <Label>Title of Deck</Label>
              <Input
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
              />
            </Item>
          </Form>
          <Button 
            block 
            light 
            style={{margin: 10}}
            onPress={() => this.handleSubmit()}
          >
            <Text>Create New Deck</Text>
          </Button>
          <Text style={{color: '#e53935',textAlign: 'center'}}>{this.state.error}</Text>
      </View>
    );
  }
}

export default NewDeckView;