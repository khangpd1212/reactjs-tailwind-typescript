import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyDGNMqCO74QDHB5Rteq_paTcY0h5MXBAig",
  authDomain: "treeworld-334708.firebaseapp.com",
  projectId: "treeworld-334708",
  storageBucket: "treeworld-334708.appspot.com",
  messagingSenderId: "471610999621",
  appId: "1:471610999621:web:4dbc7ecb6b46d83461f42c",
  measurementId: "G-8P2VQ81D61",
  databaseURL: "https://treeworld-334708-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

export { db }
