<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <label for="role">Select Role:</label>
    <select v-model="role" id="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { db } from '../firebase/init'
import { doc, setDoc } from 'firebase/firestore' // Import Firestore methods

const email = ref('')
const password = ref('')
const role = ref('user') // Default to "user" role
const router = useRouter()
const auth = getAuth()

const register = async () => {
  try {
    // Register user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Save user info, including role, to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role.value // Save the selected role in Firestore
    })

    console.log('Firebase Register Successful, User role saved!')
    router.push('/FireLogin') // Redirect to login or another page
  } catch (error) {
    console.log('Error registering:', error.message)
  }
}
</script>
