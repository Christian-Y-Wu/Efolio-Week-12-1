<template>
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="signin">Sign in via Firebase</button></p>
    </template>
    
    <script setup>
    import { ref } from 'vue'
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { getFirestore, doc, getDoc } from 'firebase/firestore'
    
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const auth = getAuth()
    const db = getFirestore()
    
    const signin = async () => {
      try {
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        
        // Fetch user role from Firestore
        const userDocRef = doc(db, 'users', user.uid) // assuming 'users' collection has user documents with roles
        const userDoc = await getDoc(userDocRef)
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          const userRole = userData.role // assuming 'role' is stored in user document
          
          // Redirect or perform actions based on the role
          if (userRole === 'admin') {
            console.log('Signed in as Admin')
            router.push('/admin-dashboard')
          } else if (userRole === 'user') {
            console.log('Signed in as User')
            router.push('/user-dashboard')
          } else {
            console.log('Role not recognized')
          }
        } else {
          console.log('No user data found!')
        }
      } catch (error) {
        console.log('Error signing in:', error.message)
      }
    }
    </script>
