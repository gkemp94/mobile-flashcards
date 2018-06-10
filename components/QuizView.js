import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button} from 'native-base';

class QuizView extends React.Component {
    // Mode: 0 - question, 1 - answer, 3 - results
    state = {
        currentCard: 0,
        unansweredQuestions: [],
        answeredQuestions: [],
        correct: 0,
        mode: 0,
    }
    
    static navigationOptions = ({ navigation, screenProps }) => {
        const key = navigation.getParam('title');
        return {
            title: key + ' Quiz',
        }
    };
    
    flipCard() {
        this.setState({
            mode: 1,
        })
    }
    
    answerQuestion(answeredCorrect) {
        this.setState((prevState) => {
            return {
                correct: answeredCorrect ? prevState.correct + 1 : prevState.correct,
                currentCard: prevState.currentCard + 1,
                mode: 0,
            }
        })
    }
    
    resetQuiz() {
        this.setState({
            mode: 0,
            currentCard: 0,
            correct: 0,
        })
    }
    
    render() {
        let decks = this.props.screenProps.decks;
        let title = this.props.navigation.getParam('title');
        let questions = decks[title].questions;
        let { currentCard, mode } = this.state;
        if(currentCard < questions.length) {
            if(mode === 0) {
            return (
                <View>
                    <Text style={styles.header}> Question </Text>
                    <Text style={styles.text}> {questions[currentCard].question} </Text>
                    <Button 
                        block 
                        light 
                        style={{margin: 10}}
                        onPress={() => this.flipCard()}
                      >
                        <Text>View Answer</Text>
                     </Button>
                </View>
                )
            } else if (mode === 1) {
            return (
                <View>
                    <Text style={styles.header}> Answer </Text>
                    <Text style={styles.text}> {questions[currentCard].answer} </Text>
                    <Button 
                        block 
                        success 
                        style={{margin: 10}}
                        onPress={() => this.answerQuestion(true)}
                      >
                        <Text>Correct Answer</Text>
                     </Button>
                     <Button 
                        block 
                        danger 
                        style={{margin: 10}}
                        onPress={() => this.answerQuestion(false)}
                      >
                        <Text>Wrong Answer</Text>
                     </Button>
                </View>
                )
            }

        } else {
            return (
                <View>
                    <Text style={styles.header}> Results </Text>
                    <Text style={styles.text}> {this.state.correct}/{questions.length} Correct </Text>
                    <Button 
                        block 
                        danger 
                        style={{margin: 10}}
                        onPress={() => this.resetQuiz()}
                      >
                        <Text>Reset Quiz</Text>
                     </Button>
                </View>
                )
        }
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
    }
})

export default QuizView;