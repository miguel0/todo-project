import { initializeApp } from 'firebase';

const config = {
  apiKey: "AIzaSyCeb2oai1mjYDcV5rm7uRa9HB9zKO7FcDA",
  authDomain: "todo-6ddda.firebaseapp.com",
  databaseURL: "https://todo-6ddda.firebaseio.com",
  projectId: "todo-6ddda",
  storageBucket: "todo-6ddda.appspot.com",
  messagingSenderId: "710556968906"
};
const app = initializeApp(config);

export const db = app.database();
export const todosRef = db.ref('tasks');
export const authJS = app.auth();
export const store = app.storage();