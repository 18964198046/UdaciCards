import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'


export const DECKS_STORAGE_KEY = 'UdaciCards:Decks'

export const DECKS_NOTIFICATION_KEY = 'UdaciCards: Notifications'

const info =	
	{
	  React: {
	    title: 'React',
	    questions: [
	      {
	        question: 'What is React?',
	        answer: 'A library for managing user interfaces'
	      },
	      {
	        question: 'Where do you make Ajax requests in React?',
	        answer: 'The componentDidMount lifecycle event'
	      }
	    ]
	  },
	  JavaScript: {
	    title: 'JavaScript',
	    questions: [
	      {
	        question: 'What is a closure?',
	        answer: 'The combination of a function and the lexical environment within which that function was declared.'
	      }
	    ]
	  }
	}	

export function getDecks() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
			.then((decks) => {
			return JSON.parse(decks)
		}
	)
}

export function getDeck(title) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((decks) => {
			return JSON.parse(decks)[title];	
		}
	)
}

export function saveDeckTitle({title}) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title: title,
			questions: []
		}
	}))
}

export function addCardToDeck({title, questions}) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]: {
			questions: questions
		}
	}))
}

export function clearDeck() {
	return AsyncStorage.clear('UdaciCards:Decks',function(err) {
	  	if (err) {
	  	}
	});
}


export function clearLocalNotification () {
	return AsyncStorage.removeItem(DECKS_NOTIFICATION_KEY)
				.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
	AsyncStorage.getItem(DECKS_NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data)=>{
			if (data===null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if(status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()
							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(20)
							tomorrow.setMintutes(0)
							
							Notifications.scheduleLocalNotificationsAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',

								}
							)

							AsyncStorage.setItem(DECKS_NOTIFICATION_KEY, JSON.stringify(true ))

						}
					}
				)
			}
		}
	)
}

function createNotification () {
	return {
		title: "Finish your test!",
		today: "👋 Don't forget to finish you test today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

