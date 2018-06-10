import React, { Component } from 'react'
import { 
	View, 
	Text, 
	FlatList, 
	StyleSheet, 
	TouchableOpacity,
} from 'react-native'
import uuid from 'uuid'
import { createStackNavigator } from 'react-navigation'
import { getDecks, clearDeck } from '../utils/storage'
import { purple, white, gray, black } from '../utils/color'


export default class Cards extends Component {

	state = {
		decks: []
	}

	componentDidMount = () => {

		getDecks().then((decks)=>{
			this.setState({
				decks: decks
			})
		});
	}

	renderItem = ({ item }) => {
		return item
	}

	render() {

		const { decks } = this.state;

		const data = decks && Object.keys(decks).map((key)=>{
			const deck = decks[key]
			return {
				"title": deck.title,
				"count": deck.questions.length,
				"key": uuid.v4(),
			}
		})

		const {navigation} = this.props

		return (
			<FlatList
				contentContainerStyle={styles.flat}
				data = {data}
				renderItem = {
					({item})=>
					<View style={[styles.container, styles.border]}>
						<TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Card', {item})}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={ styles.cards}>{item.count} cards</Text>
						</TouchableOpacity>
					</View>
				}
			/>
			
		)
	}
}

const styles = StyleSheet.create({
	flat: {	
		margin: 0, 
		justifyContent: 'space-between'
	},
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
   	border: {
   		borderBottomColor: black,
		borderBottomWidth: 1,
   	},
    title: {
        fontSize: 50,
        marginTop: 15
    },
    cards: {
    	fontSize: 25,
    	color: gray,
    	marginBottom: 15,
    }
});