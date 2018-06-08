import { AsyncStorage } from 'react-native';
import FLASHCARDS_STORAGE_KEY from './helpers';

export function flushPendingRequests() {
    AsyncStorage.flushGetRequests();
}

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
      .then((results) => {
          return JSON.parse(results);
        }).catch((e) => {
            console.error(e);
        });
}

export function getDeck({ key }) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)[key]
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
    })).catch((e) => {
        console.error(e);
    })
}

export function addCardToDeck({ title, card }) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[title].questions.push(card);
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
}