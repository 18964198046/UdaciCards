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
import Card from './Card'
import Quiz from './Quiz'
import Cards from './Cards'
import AddCard from './AddCard'
import { setLocalNotification } from '../utils/storage'


export default class Deck extends Component {

    componentDidMount = () => {
      setLocalNotification()
    }

  	render() {
    	return <CardStack style={styles.container} />
 	}
}

const CardStack = createStackNavigator(
  	{
  		Cards: { screen: Cards },
   	 	Card: { screen: Card },
   	 	AddCard: { screen: AddCard },
      Quiz: { screen: Quiz },
  	},
  	{
	    headerMode: 'float',
	    mode: 'card',
	    navigationOptions: {
	    	title: 'udacicards',
	    	headerBackTitle: 'return',
	      	gesturesEnabled: false,
	    },
  	}
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

