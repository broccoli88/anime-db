import { defineStore } from "pinia";
import db from '../firebase/db'
import { collection, onSnapshot, query, setDoc, doc, deleteDoc } from "firebase/firestore";
import { ref } from 'vue'


export const useFirestoreStore = defineStore('firestoreStore', () => {

    const savedAnimeList = ref([])
    const savedAnimeRef = collection(db, 'saved-anime')

    const saveAnime = async (animeObj) => {
        const animeId = animeObj._id
        try {
            await setDoc(doc(savedAnimeRef, animeId), animeObj)

        } catch (e) {
            console.error('Error adding doc: ', e)
        }
    }

    const retrieveSavedAnime = async () => {
        const q = query(savedAnimeRef)
        onSnapshot(q, (querySnapshot) => {
            savedAnimeList.value = []
            querySnapshot.forEach(doc => {
                savedAnimeList.value.push(doc.data())
            })
        })
    }


    const deleteSavedAnime = async (animeId) => {
        await deleteDoc(doc(savedAnimeRef, animeId))

    }

    return { savedAnimeList, saveAnime, retrieveSavedAnime, deleteSavedAnime }
})