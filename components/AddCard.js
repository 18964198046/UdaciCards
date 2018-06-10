import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { getDeck, addCardToDeck } from '../utils/storage'
import { purple } from '../utils/color'

export default class AddCard extends Component {
	
	state = {
		question: "",
		answer: "",
		deck: null,
	}

	componentDidMount = () => {
		getDeck(this.props.navigation.state.params.title).then((deck)=>{
			this.setState({
				deck: deck
			})
		})
	}

	addCard = (title, question, answer, deck) => {

		if(this.isBlank(question)) {
			alert("question is null!");
			return;
		}

		if(this.isBlank(answer)) {
			alert("answer is null!");
			return;
		}

		let newQuestion = {
			question: question, 
			answer: answer,
		}

		let questions = deck.questions.concat(newQuestion);

		addCardToDeck({
			title: title,
			questions: questions, 
		})

		alert("保存成功!")

	}

	isBlank(str) {

		if(str==null || str==undefined) {
			return true
		}

		return str.length0=0 || str.trim().length==0
	}

	render() {

		const { navigation } = this.props
		const { title } = navigation.state.params
		const { question, answer, deck } = this.state

		return (

			<View style={styles.container}>

				<TextInput
					placeholder = 'What is a component?'
					placeholderTextColor = 'grey'
					style = {styles.input}
					onChangeText = {(text)=>this.setState({question: text})}
				/>

				<TextInput
					placeholder = 'Components let you split the UI into independent, reusable piece?'
					placeholderTextColor = 'grey'
					style = {styles.input}
					onChangeText = {(text)=>this.setState({answer: text})}
				/>

				<TouchableOpacity style={styles.btn} onPress={()=>this.addCard(title, question, answer, deck)}>
					<Text style={{color: 'white'}}>Submit</Text>
				</TouchableOpacity>	

			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: 300,
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: '#757575',
		borderRadius: 5,
		marginBottom: 40,
		color: 'black',
	},
	btn: {
        backgroundColor: purple,
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        margin: 10
    },
})