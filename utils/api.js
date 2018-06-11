import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

import data from "./data.json";

const FLASHCARDS_STORAGE_KEY = "@MobileFlashcards:Flashcards";
const NOTIFICATION_KEY = "@MobileFlashcards:Notifications";

export function flushPendingRequests() {
	AsyncStorage.flushGetRequests();
}

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			if(!results) {
				AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
					.then(() => {
						return getDecks();
					});
			} else {
				return JSON.parse(results);
			}
		});
}

export function getDeck({ key }) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			return JSON.parse(results)[key];
		}).catch((e) => {
			console.error(e);
		});
}

export function saveDeckTitle({ title }) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
		.catch((e) => {
			console.error(e);
		});
}

export function addCardToDeck({ title, card }) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results);
			data[title].questions.push(card);
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
		});
}

export function deleteDeck({title}) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results);
			data[title] = undefined;
			delete data[title];
			return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
		});
}


function createNotification () {
	return {
		title: "Time to Practice Decks!",
		body: "It's time to practice your flashcards",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: "high",
			sticky: false,
			vibrate: true,
		}
	};
}

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function toggleNotification() {
	return AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((notificationsActivated) => {
			if (notificationsActivated) {
				return Notifications.cancelAllScheduledNotificationsAsync()
					.then(() => {
						return AsyncStorage.setItem(
							NOTIFICATION_KEY, 
							JSON.stringify(false)).then(() => {
							return {
								info: "Notifications Deactivated"
							};
						});
					});
			} else {
				return Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === "granted") {
							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(20);
							tomorrow.setMinutes(0);

							return Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: "day",
								}).then(() => {
								return AsyncStorage.setItem(
									NOTIFICATION_KEY, 
									JSON.stringify(true)).then(() => {
									return {
										info: "Notifications Activated"
									};
								}); 
							});

						} else {
							return {
								info: "Permissions Not Granted"
							};
						}
  
					});
			}
		});
	/*
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              return AsyncStorage.setItem(
                    NOTIFICATION_KEY, 
                    JSON.stringify(true)).then(() => {
                        return {
                            info: "Notifications Activated"
                        }
                    })
            } else {
                return {
                    info: "We don't have permissions to notify you :("
                }
            }
          })
      } else {
          return Notifications.cancelAllScheduledNotificationsAsync()
            .then(() => {
                return AsyncStorage.setItem(
                    NOTIFICATION_KEY, 
                    JSON.stringify(false)).then(() => {
                        return {
                            info: "Notifications Removed"
                        }
                    })
            })
      }
    })
    */
}