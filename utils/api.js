import { AsyncStorage } from 'react-native';
import { FLASHCARDS_STORAGE_KEY } from './helpers';
import data from './data.json';

export function flushPendingRequests() {
    AsyncStorage.flushGetRequests();
}

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            if(!results) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
                    .then((results) => {
                        return getDecks()
                    })
            } else {
                return JSON.parse(results);
            }
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
    }))
    .catch((e) => {
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

export function deleteDeck({title}) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[title] = undefined;
            delete data[title];
            return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
}