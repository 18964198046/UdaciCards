import React, { Component } from 'react'
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet, 
	TouchableOpacity 
} from 'react-native'
import { getDeck } from '../utils/storage'
import { purple, white, green, red } from '../utils/color'


export default class Quiz extends Component {

	state = {
		deck: null,
		correct: 0,
		isAnswer: false,
		questionIndex: 0,
	}

	componentDidMount = () => {
		getDeck(this.props.navigation.state.params.title).then((deck)=>{
			this.setState({
				deck: deck
			})
		})
	}

	render() {

		const { navigation } = this.props
		const { deck, correct, isAnswer, questionIndex } = this.state

		return (

			<View style={styles.container}>
				{
					deck && (deck.questions.length > questionIndex ?

					<View style={styles.container}>

						<Text style={{fontSize:15}}>
							{(questionIndex + 1) + "/" + deck.questions.length }
						</Text>

						<View style={styles.container}>

							<Text style={styles.text}>
								{isAnswer ? 
									deck.questions[questionIndex].answer : 
										deck.questions[questionIndex].question}
							</Text>

							<TouchableOpacity onPress={()=>this.setState({isAnswer: !isAnswer})}>
								<Text style={{color: 'red', fontSize: 20}}>
									{ isAnswer ? 'Question' : 'Answer' }
								</Text>
							</TouchableOpacity>	
						</View>

						<View style={styles.container}>
							<TouchableOpacity 
								style={styles.btn1} 
								onPress={()=>{
									this.setState({
										questionIndex: (deck.questions.length > questionIndex) ?  questionIndex + 1 : questionIndex,
										correct: correct + 1
									})
								}}>
								<Text style={{color: 'white'}}>Correct</Text>
							</TouchableOpacity>	

							<TouchableOpacity 
								style={styles.btn2}
								onPress={()=>{
									this.setState({
										questionIndex: (deck.questions.length > questionIndex) ?  questionIndex + 1 : questionIndex,
									})
								}}>>
								<Text style={{color: 'white'}}>Incorrect</Text>
							</TouchableOpacity>	
						</View>

					</View>

					: 

					<View>

						<Text style={styles.text}>
							{ (correct / deck.questions.length * 100) + "分!"}
						</Text>

					</View>
					)
				}
			</View>
		)
	}
}


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
	},
	text: {
        fontSize: 30,
        textAlign:'center',     
    },
    btn1: {
        backgroundColor: green,
        padding: 20,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        margin: 10
    },

    btn2: {
        backgroundColor: red,
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        margin: 10
    },
})