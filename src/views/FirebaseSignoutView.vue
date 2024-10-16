<template>
      <div>
        <h1>Sign out</h1>
        <p>Are you sure you want to sign out?</p>
        <p><button @click="signout">Sign out</button></p>
      </div>
    </template>
    
    <script setup>
    import { getAuth, signOut } from 'firebase/auth'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const auth = getAuth()
    
    const signout = () => {
      signOut(auth)
        .then(() => {
          console.log('Firebase Sign-out Successful!')
          router.push('/login') // Redirect the user to login after signing out
        })
        .catch((error) => {
          console.log('Sign-out error: ', error)
        })
    }
    </script>
    