import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation'
import { purple, white, gray } from '../utils/color'


export default class Card extends Component {
	
	render() {

		const { navigation } = this.props
		const { title, count } = navigation.state.params.item

		return (
			<View style={styles.container}>

				<View style={{alignItems: 'center'}}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.cards}>{count} cards</Text>
				</View>
				
				<View>

					<TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('AddCard', {title: title})}> 
		                <Text style={{color: 'white'}}>Add Card</Text> 
		            </TouchableOpacity>
		            
		            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Quiz', {title: title})}> 
		                <Text style={{color: 'white'}}>Start Quiz</Text> 
		            </TouchableOpacity>

	            </View>

			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'space-around', 
		alignItems: 'center',
	},
	title: {
        fontSize: 40,
    },
    cards: {
    	fontSize: 25,
    	color: gray,
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

