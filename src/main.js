

import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Call init.js by importing the Firebase initialization
import db from './firebase/init';  // Import the init.js file (ensure correct path)

// Initialize Vue app
const app = createApp(App);

app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);

// You can now use `db` (Firestore instance) in your components or anywhere in the app
console.log(db); // Optional, to check if db is correctly initialized

app.mount('#app');
