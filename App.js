import React from 'react';
import {  
  Text, 
  View, 
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation'
import { purple, white } from './utils/color'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'


export default createBottomTabNavigator({
    Deck: {
        screen: Deck,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Entypo name='book' size={30} color={ tintColor }/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={ tintColor }/>
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56, 
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                white: 0, 
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});
