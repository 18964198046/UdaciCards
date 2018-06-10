import React, { Component } from 'react'
import {  
  Text, 
  View, 
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { purple, white } from '../utils/color'
import { saveDeckTitle } from '../utils/storage'


class NewDeck extends Component {

	state = {
		title: null,
	}

	saveTitle = () => {
		saveDeckTitle(this.state.title).then((res)=>{alert("Add Success!")})
	}

	render() {
	    return (
	        <View style={styles.container} >
	            <Text style={styles.text}>What is the title</Text>
	            <Text style={styles.text}>of your new</Text>
	            <Text style={styles.text}>deck?</Text>
	            <TextInput 
	            	placeholder='Deck Title' 
	            	style={styles.input} 
	            	onChangeText={(text)=>this.setState({title: text})}	
	            	value={this.state.title}    
	            />
	            <TouchableOpacity style={styles.btn} onPress={this.saveTitle}> 
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
    btn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 40,
    },
    input: {
        width: 200,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 50,
    },
});

export default NewDeck