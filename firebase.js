import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYARyZHJP7wKoWa-JZguwVmdQM1o7LSyg',
  projectId: 'kanban-board-app-5825e',
  storageBucket: 'kanban-board-app-5825e.appspot.com',
  messagingSenderId: '393152847375',
  appId: '1:393152847375:android:128d82f912e37809c10d7a',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, auth, firestore};
