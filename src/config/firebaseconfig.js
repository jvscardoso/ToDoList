import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDk_XHCUqh8aKRwRWQFxgCAYv6eH9HlLeY",
  authDomain: "todolist-a8672.firebaseapp.com",
  projectId: "todolist-a8672",
  storageBucket: "todolist-a8672.appspot.com",
  messagingSenderId: "255906438589",
  appId: "1:255906438589:web:053518171bcca9237186d  4"
}

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export default database;
